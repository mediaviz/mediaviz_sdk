# MediaViz SDK Generator — Specification

## Overview

A Python utility that reads YAML endpoint specifications from the `mediaviz_intelligence_hub` repo and generates versioned, framework-specific SDK libraries. Each generated SDK wraps API endpoints as native functions and bundles a copy of the OAuth auth wrapper for authenticated requests. Source files are resolved from local sibling directories (with planned GitHub-clone support via `github_sources.py`).

## Architecture

```
mediaviz_sdk/
  generate.py              # CLI entrypoint
  github_sources.py        # Source path resolution (local now, GitHub later)
  generators/
    __init__.py             # Framework registry + discovery
    base.py                 # Abstract base generator class
    javascript_browser.py   # Browser JS generator (UMD via Rollup)
    javascript_node.py      # Node.js generator (ESM)
    php.py                  # PHP generator
  resolver.py              # Reads ref-list YAML, resolves refs, outputs flattened YAML
  versioning.py            # Version auto-increment logic
  sdk/                     # Static output directory
    v{major}.{minor}.{iteration}/  # Current version (only one active at a time)
      resolved_*.yaml      # Flattened endpoint snapshot
      javascript/
      php/
      tests/
    archive/               # Previous versions moved here on new generation
      v1.0.0/
      v1.0.1/
      ...
```

## Components

### 1. Resolver (`resolver.py`)

Reads a ref-list YAML file (e.g., `top_endpoints.yaml`), follows each `$ref` into controller YAML files, extracts the matching endpoint by `id`, and writes a single flattened YAML file. During flattening, path placeholders with type converters (e.g. `{directory:path}`) are normalized to `{directory}`, and any corresponding params are promoted to `in: path`.

**Input:** Path to a ref-list YAML. Optionally, a controllers base directory for resolving `$ref` file paths (when refs point to files outside the ref-list YAML's directory).

**Output:** A flattened YAML file written to `sdk/v{major}.{minor}.{iteration}/resolved_{ref_list_name}.yaml`, packaged alongside the generated SDK files.

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

Scans `sdk/` for existing `v{major}.{minor}.{iteration}` directories to determine the next version.

**Logic:**
- Look at `sdk/` for existing `v{major}.{minor}.{iteration}` directories (ignores `archive/`).
- If no version directories exist, start at `v1.0.0`.
- Otherwise, determine the bump type (`iteration`, `minor`, or `major`) from CLI flags and increment accordingly:
  - `iteration` (default): increment the iteration number (e.g., `1.0.2` → `1.0.3`)
  - `minor` (`--minor-version`): increment the minor number, reset iteration to 0 (e.g., `1.2.5` → `1.3.0`)
  - `major` (`--major-version`): increment the major number, reset minor and iteration to 0 (e.g., `2.1.3` → `3.0.0`)
- The same version number is used for the resolved YAML and all framework outputs in a single run.

**Functions:**
- `get_next_version(output_dir, bump="iteration")` — returns `(major, minor, iteration)` tuple
- `version_str(major, minor, iteration)` — returns `"major.minor.iteration"` string

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
- Generating function signatures with path params as required args, query params as optional args, and schema-expanded request_body fields as individual unary params (required first, then optional)
- Interpolating path parameters into the URL string
- Routing `auth: required` endpoints through the OAuth client's `request()` method
- Routing `auth: none` endpoints through a simple unauthenticated HTTP call
- Reassembling expanded body fields back into the original nested object shape on the wire (stripping undefined/null), driven by the `orig_path` carried on each leaf
- Generating a barrel/index file that re-exports all controller modules
- Copying the OAuth auth wrapper source files into the output directory
- Implementing `_optional_check_expr(expr)` — returns a framework-idiomatic boolean expression for "this optional field is present and non-null." Used by the base emission logic whenever generated code must guard against absent keys/properties on composite parameter objects (e.g. PHP: `($expr ?? null) !== null`, JS: `expr !== undefined`)

**Request-body expansion** (`resolver.expand_model_body`):
Schema-ref request bodies (`$ref: "api_schemas.yaml#TypeName"`) are resolved against `api_schemas.yaml` at generate time:
- `extends` chains are merged parent-first, child keys overlaying on collision
- Nested schema fields are flattened recursively with camelCase prefixing (`user.name` → `userName`)
- `List[X]` / `list[x]` fields stay a single array param — never flattened
- Types not defined in `schemas:` (e.g. `EmailStr`) fall back to a single scalar param named after the model type
JS reserved keywords used as param names (e.g. `private`) are escaped with a trailing underscore (`private_`); the body reassembly preserves the original snake_case key.

### 4. Framework Registry (`generators/__init__.py`)

Auto-discovers generator classes from the `generators/` directory. Each generator module exposes a class that extends `BaseGenerator`. The registry maps `framework_name` to the generator class.

This allows adding a new framework by dropping a single file into `generators/` — no changes to orchestration code required.

### 5. Source Resolution (`github_sources.py`)

Encapsulates source path resolution. Currently resolves against local sibling directories (`../mediaviz_intelligence_hub`, `../oauth_library`); designed to be swapped to shallow-clone from GitHub repos when ready.

**Source mapping:**
| Source | Local path | GitHub target (future) |
|--------|-----------|----------------------|
| Controllers | `../mediaviz_intelligence_hub/api_docs/` | `imaige/mediaviz_intelligence_hub` → `api_docs/` |
| Schemas | `../mediaviz_intelligence_hub/api_docs/api_schemas.yaml` | same repo, same path |
| Flow YAML files | `../mediaviz_intelligence_hub/common_flows/sdk_endpoints/` | `imaige/mediaviz_intelligence_hub` → `common_flows/sdk_endpoints/` |
| OAuth SDK | `../oauth_library/sdk/` | `imaige/oauth_library` → `sdk/` |

**Key functions:**
- `fetch_sources(branch)` — context manager yielding `SourcePaths(controllers_dir, oauth_sdk_root, flows_dir, schemas_path)`
- `resolve_flow_path(flow_name, flows_dir)` — returns path to `{flow_name}.yaml`, exits with available flows if not found

### 6. CLI Entrypoint (`generate.py`)

```
python generate.py --endpoints basic_sdk_flow_endpoints
python generate.py --endpoints getting_started_sdk_endpoints --branch feature/new-api --frameworks javascript
```

**Flags:**
| Flag | Required | Description |
|------|----------|-------------|
| `--endpoints` | yes | Flow name in `common_flows/sdk_endpoints/` (e.g., `basic_sdk_flow_endpoints`). Refs containing `#` are resolved as endpoints; refs without `#` are resolved as composite files. |
| `--branch` | no | Git branch to use for all source repos. Falls back to `main` if branch not found. Currently accepted but unused in local mode. |
| `--frameworks` | no | Comma-separated list of frameworks to generate. Default: all registered. |
| `--destination-dir` | no | Output folder name in package root. Created if it doesn't exist. Default: `sdk`. |
| `--minor-version` | no | Increment the minor version number and reset iteration to 0. Mutually exclusive with `--major-version`. |
| `--major-version` | no | Increment the major version number and reset minor + iteration to 0. Mutually exclusive with `--minor-version`. |

Output is written to the folder specified by `--destination-dir` (default `./sdk/`). Versioning and archiving behavior is identical regardless of destination.

**Run sequence:**
1. Resolve source paths via `fetch_sources(branch)` — yields controllers dir, OAuth SDK root, and flows dir
2. Resolve flow name to YAML path via `resolve_flow_path()` — fails with available flows if not found
3. Determine next version number by scanning `sdk/` for `v{major}.{minor}.{iteration}` directories, applying the requested bump type
4. Archive all existing `sdk/v*` directories to `sdk/archive/`
5. Resolve refs: endpoint refs (contain `#`) are resolved into flattened endpoints; composite refs (no `#`) are collected as file paths
6. If composites are present, resolve composite files and validate that every composite step endpoint exists in the endpoint list (fail if not)
7. For each requested framework:
   a. Instantiate generator
   b. Create `sdk/v{ver}/{framework}/`
   c. Call `copy_auth_wrapper()` to bundle OAuth SDK source
   d. Call `generate()` to emit SDK files
5. Print summary: version number, frameworks generated, file counts

## Generated SDK Shape

### Client Class (`MediaViz.js` / `MediaVizClient.php`)

The SDK entry point is a single client class. All OAuth setup, token lifecycle, and host routing is handled internally. Users interact with controller namespaces on the client instance.

**JavaScript usage:**
```javascript
import { MediaViz } from '@mediaviz/sdk';

// Client credentials (server-to-server)
const mv = new MediaViz({ onTokenRefresh: (t) => saveTokens(t) });
await mv.authenticate();
const photos = await mv.photos.getAllProjectPhotoIds(tableName, { limit: 10 });
await mv.photoUpload.uploadPhoto(projectTableName, companyId, userId, 0, photo);

// PKCE (browser)
const mv = new MediaViz({ redirectUri: 'https://app.com/cb' });
const { url, codeVerifier } = await mv.getAuthorizationUrl();
// ...after redirect callback...
await mv.handleCallback(code, codeVerifier);
const photos = await mv.photos.getAllProjectPhotoIds(tableName);

// Seed with existing tokens
const mv = new MediaViz({ accessToken: saved.at, refreshToken: saved.rt });
```

**PHP usage:**
```php
$mv = new \MediaVizSdk\MediaVizClient(['onTokenRefresh' => fn($t) => saveTokens($t)]);
$mv->authenticate();
$photos = $mv->photos->getAllProjectPhotoIds($tableName, limit: 10);
```

**Constructor config (all optional):**
| Key | Env var fallback | Description |
|-----|------------------|-------------|
| `clientId` | `MEDIAVIZ_CLIENT_ID` | OAuth client ID |
| `clientSecret` | `MEDIAVIZ_CLIENT_SECRET` | OAuth client secret |
| `baseUrl` | `MEDIAVIZ_BASE_URL` | API base URL (default: `https://api.mediaviz.com`) |
| `redirectUri` | `MEDIAVIZ_REDIRECT_URI` | PKCE redirect URI |
| `hosts.photoUpload` | `MEDIAVIZ_PHOTO_UPLOAD_URL` | Alt-host URL for photo upload service |
| `accessToken` | — | Seed access token |
| `refreshToken` | — | Seed refresh token |
| `onTokenRefresh` | — | Callback `(tokens) => void` fired on automatic token refresh |

**Auth lifecycle methods:**
| Method | Purpose |
|--------|---------|
| `authenticate()` | Client credentials grant — gets tokens automatically |
| `getAuthorizationUrl(state?)` | Returns `{ url, state, codeVerifier }` for PKCE redirect |
| `handleCallback(code, codeVerifier)` | Exchanges auth code for tokens after PKCE redirect |
| `setTokens(accessToken, refreshToken)` | Manually seed tokens |

**Token refresh:** A `_TokenTrackingClient` proxy wraps `OAuthClient` and intercepts `request()` responses. When the OAuth client auto-refreshes on 401, the proxy updates the stored tokens and fires the `onTokenRefresh` callback.

### Per-Controller File

Each controller gets its own file (e.g., `photos.js`, `Photos.php`) exporting a class. Methods map 1:1 to endpoints. All auth, token, and host resolution is handled via an internal `_Context` object — user-facing method signatures contain only business parameters.

**JavaScript example — `photos.js`:**
```javascript
export class Photos {
  constructor(ctx) { this._ctx = ctx; }

  async getAllProjectPhotoIds(tableName, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
```

**PHP example — `Photos.php`:**
```php
class Photos {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getAllProjectPhotoIds(
        string $tableName,
        ?string $ascOrDesc = null,
        ?int $lastId = null,
        ?int $limit = null
    ): mixed {
        $this->ctx->requireTokens();
        // ...path, query, request...
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
```

**Alt-host endpoints** resolve their base URL from context instead of requiring user input:
```javascript
async uploadPhotoToMediaviz(bucketName, photoIndex, ...) {
  this._ctx.requireTokens();
  const baseUrl = this._ctx.requireHost('photoUpload');
  // ...fetch(baseUrl + path, ...)
}
```

Alt-host endpoints use direct `fetch` (JS) / `curl` (PHP) with `this._ctx.accessToken` in the `Authorization` header. They do **not** go through the OAuth client's `request()` method, so there is no automatic 401-retry/token-refresh for these calls. This is intentional: alt-host services (e.g., the photo upload service) are separate from the core API and may not support the same token refresh flow.

**Unauthenticated endpoints** use `this._ctx.baseUrl` and do not call `requireTokens()`.

### Barrel/Index File

Re-exports the `MediaViz` class and all controller classes:

```javascript
export { MediaViz } from './MediaViz.js';
export * from './errors.js';
export * from './photos.js';
export * from './projects.js';
// ...
```

### Bundled Auth Wrapper

Copied into `sdk/v{ver}/{framework}/oauth/` directly from the source OAuth SDK for that framework.

**PHP PSR-4 normalization:** After copying, the PHP generator splits any multi-class `Types.php` into individual files (one class per file, e.g. `OAuthClientConfig.php`, `TokenResponse.php`) to match PSR-4 autoloading conventions. The `files` autoload entry for `Types.php` is removed from `composer.json` since PSR-4 handles discovery.

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

## Composite Functions

Composites are multi-step SDK functions that chain 2+ endpoint calls, with intermediate data flow and optional caching. They are defined in YAML config files in the `api_docs/composites/` directory and referenced via a ref-list (`composites.yaml`).

### Config Format (`api_docs/composites/*.yaml`)

```yaml
id: composite_upload_photo
function_name: upload_photo
summary: "Fetch upload template (cached per project), then upload a single photo"
controller: PhotoUpload        # groups into photoupload.js / Photoupload.php
auth: required
params:                        # top-level args the caller passes
  - name: project_table_name
    type: str
    required: true
  - name: photo_index
    type: int
    required: true
  - name: photo
    type: object
    required: true
steps:
  - step_id: get_template
    ref: "controllers/project.yaml#endpoint_id"
    execution: once
    cache:
      enabled: true
      key: "params.project_table_name"
    input_map:
      project_table_name: "params.project_table_name"
    output_as: template
  - step_id: upload
    ref: "photo_upload/photo_upload.yaml#post_upload_photo"
    execution: once
    output_as: upload_result
    input_map:
      x-bucket-name: "steps.template.bucket_name"
      x-photo-index: "params.photo_index"
      x-title: "params.photo.title"
      file_content: "params.photo.file_content"
returns: "steps.upload_result"
```

### Key Schema Fields

| Field | Purpose |
|---|---|
| `steps[].ref` | Points to existing endpoint (same format as top_endpoints refs) |
| `steps[].execution` | `once` or `for_each` |
| `steps[].cache` | Static/module-level cache — `key` is a dot-path expression for the cache key |
| `steps[].input_map` | Maps endpoint params to dot-path expressions: `params.*`, `params.<obj>.<prop>`, `steps.<id>.*` |
| `steps[].output_as` | Name to store step response under for later steps |
| `steps[].on_error` | `abort` (throw), `continue` (skip), `collect` (accumulate errors alongside results) |

### Resolver

`resolve_composites()` reads the composites ref-list, resolves each step's endpoint `ref` through the existing `parse_ref()` + controller lookup, and embeds the flattened endpoint data inline into each step. The resolved output is written to `resolved_composites.yaml`.

### Generator Behavior

- **Grouping:** Composites declare a `controller` field and are appended to that controller's output file
- **Cross-controller imports:** If a composite step calls an endpoint from a different controller, the generator adds the necessary import (JS) or inlines the call (PHP)
- **Once steps — same-controller:** When a step's endpoint belongs to the same controller as the composite, the generated code delegates to the sibling method (e.g., `this.uploadPhotoToMediaviz(...)`) with `input_map` values mapped to the method's positional signature. Generation fails if the sibling endpoint is missing from the endpoint list. If cache is enabled, the step is still wrapped in a static `Map` (JS) or instance-property array (PHP)
- **Once steps — cross-controller:** Inlined via the context's `client.request()` (auth endpoints) or direct `fetch`/`curl` (alt-host endpoints)
- **For-each steps:** Loop over the array. Inline the HTTP call when intermediate data flow requires it (e.g., passing cached template values as headers). Otherwise call the generated function
- **On-error modes:** `abort` throws immediately; `collect` wraps in try/catch and returns `{ results, errors }`
- **Nested param expressions:** `params.<obj>.<prop>` resolves to property access (JS: `obj.prop`, PHP: `$obj['prop']`)
- **Alt-host endpoints:** When a composite includes alt-host steps, `baseUrl` is added to the function signature

### Inclusion

Composites are listed in the same ref-list YAML as endpoints. Refs containing `#` are endpoints; refs without `#` are composite file paths:

```yaml
refs:
  - ref: "controllers/project.yaml#get_get_project_prelim_model_request_template"
  - ref: "photo_upload/photo_upload.yaml#post_upload_photo"
  - ref: "composites/upload_photos.yaml"
```

No separate CLI flag is needed — composites are included by adding them to the `--endpoints` ref-list.

### Endpoint Validation

Every endpoint referenced by a composite's steps must also be present in the same ref-list as an endpoint ref. If any step references an endpoint not in the list, generation aborts with an error listing each missing endpoint by composite ID, step ID, and endpoint ID. This prevents silent inconsistencies where the SDK contains composite functions that call endpoints not included in the build.

## Constraints

- All generated code is read-only by convention. Manual edits go into a separate layer (not covered by this spec).
- Previous version directories are archived to `sdk/archive/` when a new version is generated. Archived versions are never modified or deleted.
- When adding a new framework generator, the project `.gitignore` must be updated to ignore that framework's dependency/install directories (e.g., `node_modules/` for JS, `vendor/` for PHP). This prevents committed generated SDKs from including third-party dependency trees.
- The resolved YAML is the source of truth for what was generated in a given version — it is an immutable snapshot, packaged inside the version directory.
- No runtime dependencies beyond the bundled OAuth SDK and the language's standard HTTP primitives (`fetch` for JS, `curl` for PHP).
