# MediaViz SDK Generator — Specification

## Overview

A Python utility that reads YAML endpoint specifications from the `mediaviz_docs` repo and generates versioned, framework-specific SDK libraries. Each generated SDK wraps API endpoints as native functions and bundles a copy of the OAuth auth wrapper for authenticated requests.

## Architecture

```
mediaviz_sdk/
  generate.py              # CLI entrypoint
  generators/
    __init__.py             # Framework registry + discovery
    base.py                 # Abstract base generator class
    javascript_browser.py   # Browser JS generator (UMD via Rollup)
    javascript_node.py      # Node.js generator (ESM)
    php.py                  # PHP generator
  resolver.py              # Reads ref-list YAML, resolves refs, outputs flattened YAML
  versioning.py            # Version auto-increment logic
  output/
    javascript/
      v1/
      v2/
      ...
    nodeJS/
      v1/
      ...
    php/
      v1/
      ...
```

## Components

### 1. Resolver (`resolver.py`)

Reads a ref-list YAML file (e.g., `top_endpoints.yaml`), follows each `$ref` into controller YAML files, extracts the matching endpoint by `id`, and writes a single flattened YAML file.

**Input:** Path to a ref-list YAML, path to the controllers directory.

**Output:** A flattened YAML file written to `output/resolved/v{N}_{ref_list_name}.yaml` using the same auto-incremented version as the SDK output.

**Flattened YAML structure:**
```yaml
version: 3
source: top_endpoints.yaml
resolved_at: "2026-03-28T12:00:00Z"
endpoints:
  - id: get_photos_sort
    controller: Photos
    base_path: /api/v1
    method: GET
    path: "/api/v1/photos/{table_name}/sort/{sortOrder}/"
    summary: "..."
    auth: required
    params:
      - name: table_name
        in: path
        type: string
        required: true
      - name: sortOrder
        in: path
        type: string
        required: true
      - name: limit
        in: query
        type: integer
        required: false
      - name: last_id
        in: query
        type: integer
        required: false
    request_body: null
    response: null
    content_type: null
    tags: [top]
  - ...
```

### 2. Versioning (`versioning.py`)

Scans the `output/` directory for existing version directories per framework and globally.

**Logic:**
- Look at `output/resolved/` for existing `v{N}_*.yaml` files to determine the current global version.
- If no versions exist, start at `v1`.
- Otherwise, increment the highest existing version number by 1.
- The same version number is used for both the resolved YAML and all framework outputs in a single run.

### 3. Base Generator (`generators/base.py`)

Abstract base class that all framework generators extend.

```python
class BaseGenerator(ABC):
    framework_name: str          # e.g., "javascript", "nodeJS", "php"
    oauth_sdk_source: str        # path to OAuth SDK source for this framework

    @abstractmethod
    def generate(self, endpoints: list[dict], output_dir: str) -> None:
        """Generate SDK files from resolved endpoints into output_dir."""

    @abstractmethod
    def copy_auth_wrapper(self, output_dir: str) -> None:
        """Copy OAuth SDK source files into output_dir."""

    def group_by_controller(self, endpoints: list[dict]) -> dict[str, list[dict]]:
        """Group endpoints by controller name. Shared utility."""
```

Each generator is responsible for:
- Grouping endpoints by controller into separate output files
- Converting endpoint `id` (snake_case) to the framework's naming convention
- Generating function signatures with path params as required args, query params as optional args, request_body fields as individual args
- Interpolating path parameters into the URL string
- Routing `auth: required` endpoints through the OAuth client's `request()` method
- Routing `auth: none` endpoints through a simple unauthenticated HTTP call
- Generating a barrel/index file that re-exports all controller modules
- Copying the OAuth auth wrapper source files into the output directory

### 4. Framework Registry (`generators/__init__.py`)

Auto-discovers generator classes from the `generators/` directory. Each generator module exposes a class that extends `BaseGenerator`. The registry maps `framework_name` to the generator class.

This allows adding a new framework by dropping a single file into `generators/` — no changes to orchestration code required.

### 5. CLI Entrypoint (`generate.py`)

```
python generate.py \
  --endpoints ../mediaviz_docs/api-docs/top_endpoints.yaml \
  --controllers ../mediaviz_docs/api-docs/controllers/ \
  --oauth-sdk ../oauth_library/sdk/ \
  --frameworks javascript,nodeJS,php \
  --output ./output/
```

**Flags:**
| Flag | Required | Description |
|------|----------|-------------|
| `--endpoints` | yes | Path to ref-list YAML file |
| `--controllers` | yes | Path to controllers directory |
| `--oauth-sdk` | yes | Path to OAuth SDK root (contains `javascript/`, `php/`, `python/` subdirectories) |
| `--frameworks` | no | Comma-separated list of frameworks to generate. Default: all registered. |
| `--output` | no | Output root directory. Default: `./output/` |

**Run sequence:**
1. Determine next version number via `versioning.py`
2. Resolve endpoints via `resolver.py`, write flattened YAML to `output/resolved/v{N}_{name}.yaml`
3. For each requested framework:
   a. Instantiate generator
   b. Create `output/{framework}/v{N}/`
   c. Call `copy_auth_wrapper()` to bundle OAuth SDK source
   d. Call `generate()` to emit SDK files
4. Print summary: version number, frameworks generated, file counts

## Generated SDK Shape

### Per-Controller File

Each controller gets its own file (e.g., `photos.js`, `Photos.php`). Functions within map 1:1 to endpoints.

**JavaScript (browser) example — `photos.js`:**
```javascript
import { OAuthClient } from './oauth/index.js';

export function getPhotosSort(client, accessToken, refreshToken, tableName, sortOrder, { limit, lastId } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(tableName)}/sort/${encodeURIComponent(sortOrder)}/`;
  const query = new URLSearchParams();
  if (limit !== undefined) query.set('limit', limit);
  if (lastId !== undefined) query.set('last_id', lastId);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotos(client, accessToken, refreshToken, tableName) {
  const path = `/api/v1/photos/${encodeURIComponent(tableName)}/`;
  return client.request(path, 'GET', accessToken, refreshToken);
}
// ...
```

**JavaScript (Node.js) example — same code, ESM module format.** The Rollup build step in the browser variant produces UMD from it.

**PHP example — `Photos.php`:**
```php
<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Photos {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getPhotosSort(
        string $accessToken,
        string $refreshToken,
        string $tableName,
        string $sortOrder,
        ?int $limit = null,
        ?int $lastId = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . urlencode($tableName) . "/sort/" . urlencode($sortOrder) . "/";
        $query = [];
        if ($limit !== null) $query['limit'] = $limit;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
    // ...
}
```

**Unauthenticated endpoint example (JS):**
```javascript
export async function createUsersNewCompany(baseUrl, { name, email, password, accountType, companyId, profilePicture, companyName }) {
  const resp = await fetch(baseUrl + '/api/v1/users/new_company', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: { name, email, password, account_type: accountType, company_id: companyId, profile_picture: profilePicture },
      company: { name: companyName }
    })
  });
  return resp.json();
}
```

### Barrel/Index File

Each version directory gets an index file that re-exports all controller modules:

```javascript
// index.js
export * from './photos.js';
export * from './projects.js';
export * from './users.js';
// ...
```

### Bundled Auth Wrapper

Copied into `output/{framework}/v{N}/oauth/` directly from the source OAuth SDK for that framework.

## Naming Conventions per Framework

| Framework | Function names | File names | Class names |
|-----------|---------------|------------|-------------|
| javascript (browser) | camelCase | lowercase controller name `.js` | n/a (module functions) |
| nodeJS | camelCase | lowercase controller name `.js` | n/a (module functions) |
| php | camelCase | PascalCase controller name `.php` | PascalCase controller name |

Snake_case endpoint `id` → framework convention is handled by each generator.

## Error Handling

Each generated SDK includes a standalone error-handling module emitted alongside the controller files. Auth endpoints delegate to the OAuth client (which handles its own errors); error handling applies to unauthenticated endpoints only.

### Error Module Files

| Framework | File | Contents |
|-----------|------|----------|
| javascript (browser) | `errors.js` | ES module with error classes + `handleResponse()` |
| nodeJS | `errors.js` | Same as browser |
| php | `Exceptions.php` | Namespaced exception classes + `handleResponse()` function |

### FastAPI Error Envelope

The API returns errors using FastAPI's default structure:

- **Non-422 errors:** `{"detail": "Human-readable message"}`
- **422 validation errors:** `{"detail": [{"type": "...", "loc": ["body", "field"], "msg": "...", "input": {...}, "url": "..."}]}`

All responses include an `x-request-id` header for tracing.

### Error Hierarchy

| Class (JS) / Exception (PHP) | Thrown on | Key fields |
|-------------------------------|-----------|------------|
| `ApiError` / `ApiException` | Any non-2xx not matched below | `message`, `status`, `requestId`, `body` |
| `ValidationError` / `ValidationException` | 422 | `fieldErrors` (parsed from `detail` array) |
| `NotFoundError` / `NotFoundException` | 404 | — |
| `RateLimitError` / `RateLimitException` | 429 | `retryAfter` (from `retry-after` header) |
| `ServerError` / `ServerException` | 5xx | — |

### Generator Responsibilities

- `generate()` calls `emit_errors_file(output_dir)` to write the error module
- Barrel/index file re-exports the error classes (JS only)
- Unauthenticated functions call `handleResponse(resp)` instead of directly returning `resp.json()` / `json_decode()`
- Auth functions are unchanged — the OAuth client handles errors internally

### Reference

Full error class implementations and consumer usage examples are in `errors.md`.

## Constraints

- All generated code is read-only by convention. Manual edits go into a separate layer (not covered by this spec).
- The generator never modifies or deletes previous version directories.
- The resolved YAML is the source of truth for what was generated in a given version — it is an immutable snapshot.
- No runtime dependencies beyond the bundled OAuth SDK and the language's standard HTTP primitives (`fetch` for JS, `curl` for PHP).
