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
  sdk_files/               # Static output directory
    v{N}/                  # Current version (only one active at a time)
      resolved_*.yaml      # Flattened endpoint snapshot
      javascript/
      php/
      tests/
    archive/               # Previous versions moved here on new generation
      v1/
      v2/
      ...
```

## Components

### 1. Resolver (`resolver.py`)

Reads a ref-list YAML file (e.g., `top_endpoints.yaml`), follows each `$ref` into controller YAML files, extracts the matching endpoint by `id`, and writes a single flattened YAML file. During flattening, path placeholders with type converters (e.g. `{directory:path}`) are normalized to `{directory}`, and any corresponding params are promoted to `in: path`.

**Input:** Path to a ref-list YAML, path to the controllers directory.

**Output:** A flattened YAML file written to `sdk_files/v{N}/resolved_{ref_list_name}.yaml`, packaged alongside the generated SDK files.

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

Scans `sdk_files/` for existing `v{N}` directories to determine the next version.

**Logic:**
- Look at `sdk_files/` for existing `v{N}` directories (ignores `archive/`).
- If no version directories exist, start at `v1`.
- Otherwise, increment the highest existing version number by 1.
- The same version number is used for the resolved YAML and all framework outputs in a single run.

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
  --frameworks javascript,nodeJS,php
```

**Flags:**
| Flag | Required | Description |
|------|----------|-------------|
| `--endpoints` | yes | Path to ref-list YAML file |
| `--controllers` | yes | Path to controllers directory |
| `--oauth-sdk` | yes | Path to OAuth SDK root (contains `javascript/`, `php/`, `python/` subdirectories) |
| `--frameworks` | no | Comma-separated list of frameworks to generate. Default: all registered. |

Output is always written to `./sdk_files/` (static, not configurable).

**Run sequence:**
1. Determine next version number by scanning `sdk_files/` for `v{N}` directories
2. Archive all existing `sdk_files/v{N}` directories to `sdk_files/archive/v{N}`
3. Resolve endpoints via `resolver.py`, write flattened YAML to `sdk_files/v{N}/resolved_{name}.yaml`
4. For each requested framework:
   a. Instantiate generator
   b. Create `sdk_files/v{N}/{framework}/`
   c. Call `copy_auth_wrapper()` to bundle OAuth SDK source
   d. Call `generate()` to emit SDK files
5. Print summary: version number, frameworks generated, file counts

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

**Unauthenticated endpoint example (JS, JSON body):**
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

**Unauthenticated endpoint example (JS, form-urlencoded body):**

When an endpoint's `content_type` is `application/x-www-form-urlencoded`, the generator uses `URLSearchParams` (JS) or `http_build_query` (PHP) instead of JSON serialization:
```javascript
export async function getAccessTokenLogin(baseUrl, { username, password }) {
  const resp = await fetch(baseUrl + `/api/v1/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username, password }).toString(),
  });
  return handleResponse(resp);
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

Copied into `sdk_files/v{N}/{framework}/oauth/` directly from the source OAuth SDK for that framework.

## Naming Conventions per Framework

| Framework | Function names | File names | Class names |
|-----------|---------------|------------|-------------|
| javascript (browser) | camelCase | lowercase controller name `.js` | n/a (module functions) |
| nodeJS | camelCase | lowercase controller name `.js` | n/a (module functions) |
| php | camelCase | PascalCase controller name `.php` | PascalCase controller name |

Snake_case endpoint `id` → framework convention is handled by each generator.

### Filename Normalization

Spaces in controller names are replaced with underscores in `group_by_controller()` (base class) before any framework-specific naming is applied. This ensures generated filenames never contain spaces. For example, a controller named "Curated Albums" produces `curated_albums.js` (JS) or `CuratedAlbums.php` (PHP).

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
- Previous version directories are archived to `sdk_files/archive/` when a new version is generated. Archived versions are never modified or deleted.
- The resolved YAML is the source of truth for what was generated in a given version — it is an immutable snapshot, packaged inside the version directory.
- No runtime dependencies beyond the bundled OAuth SDK and the language's standard HTTP primitives (`fetch` for JS, `curl` for PHP).
