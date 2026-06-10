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
  utilities_resolver.py    # Reads api_docs/utilities YAML, validates, outputs flattened snapshot
  versioning.py            # Version auto-increment logic
  sdk/                     # Public SDK output (default destination)
    v{major}.{minor}.{iteration}/  # Current version (only one active at a time)
      resolved_*.yaml      # Flattened endpoint / composite / utility snapshots
      javascript/
      php/
      python/
      tests/
    archive/               # Previous versions moved here on new generation
      v1.0.0/
      v1.0.1/
      ...
  admin-sdk/               # Admin SDK output (--admin --destination-dir admin-sdk)
    v{major}.{minor}.{iteration}/
      javascript/          # JS only — published privately to npm as @mediaviz/admin-sdk
    archive/
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
- Serializing query params with array values as repeated keys (`?k=a&k=b`), not comma-joined or bracket-indexed: JS uses `URLSearchParams.append` per element; Python uses `urlencode(_q, doseq=True)` and stores list values as-is in `_q`; PHP iterates manually with `rawurlencode($k) . '=' . rawurlencode($v)` per element since `http_build_query` would emit `k[0]=...`. For params declared with a list-style type in the YAML (`list`, `array`, `List[...]`), all three frameworks normalize a scalar argument to a 1-element list before serialization so callers can pass either a single value or a list (Python: `value if isinstance(value, (list, tuple)) else [value]`; JS/PHP wrap non-arrays equivalently)
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
| Hand-authored flow YAMLs | `../mediaviz_intelligence_hub/common_flows/sdk_endpoints/` | `imaige/mediaviz_intelligence_hub` → `common_flows/sdk_endpoints/` |
| Generated endpoint registries | `../mediaviz_intelligence_hub/api_docs/endpoint_list/` | `imaige/mediaviz_intelligence_hub` → `api_docs/endpoint_list/` |
| Utilities | `../mediaviz_intelligence_hub/api_docs/utilities/` | `imaige/mediaviz_intelligence_hub` → `api_docs/utilities/` |
| OAuth SDK | `../oauth_library/sdk/` | `imaige/oauth_library` → `sdk/` |

**Key functions:**
- `fetch_sources(branch)` — context manager yielding `SourcePaths(controllers_dir, oauth_sdk_root, flows_dir, endpoint_list_dir, schemas_path, utilities_dir)`. `utilities_dir` is permissive (missing dir → resolver returns an empty list, no error).
- `resolve_flow_path(flow_name, flows_dir, endpoint_list_dir)` — returns path to `{flow_name}.yaml` from the first directory containing it (flows_dir wins on collision); exits with the union of available flow names if not found

### 6. CLI Entrypoint (`generate.py`)

```
python generate.py --endpoints basic_sdk_flow_endpoints
python generate.py --endpoints getting_started_sdk_endpoints --branch feature/new-api --frameworks javascript
```

**Flags:**
| Flag | Required | Description |
|------|----------|-------------|
| `--endpoints` | yes | Flow name resolved against `common_flows/sdk_endpoints/` first, then `api_docs/endpoint_list/` (e.g., `basic_sdk_flow_endpoints`, `all_endpoints`). Refs containing `#` are resolved as endpoints; refs without `#` are resolved as composite files. |
| `--branch` | no | Git branch to use for all source repos. Falls back to `main` if branch not found. Currently accepted but unused in local mode. |
| `--frameworks` | no | Comma-separated list of frameworks to generate. Default: all registered. |
| `--destination-dir` | no | Output folder name in package root. Created if it doesn't exist. Default: `sdk`. |
| `--minor-version` | no | Increment the minor version number and reset iteration to 0. Mutually exclusive with `--major-version`. |
| `--major-version` | no | Increment the major version number and reset minor + iteration to 0. Mutually exclusive with `--minor-version`. |

Output is written to the folder specified by `--destination-dir` (default `./sdk/`). Versioning and archiving behavior is identical regardless of destination.

**Run sequence:**
1. Resolve source paths via `fetch_sources(branch)` — yields controllers dir, OAuth SDK root, flows dir, and endpoint-list dir
2. Resolve flow name to YAML path via `resolve_flow_path()` — searches flows dir then endpoint-list dir; fails with available flows if not found
3. Determine next version number by scanning `sdk/` for `v{major}.{minor}.{iteration}` directories, applying the requested bump type
4. Archive all existing `sdk/v*` directories to `sdk/archive/`
5. Resolve refs: endpoint refs (contain `#`) are resolved into flattened endpoints; composite refs (no `#`) are collected as file paths
6. If composites are present, resolve composite files and validate that every composite step endpoint exists in the endpoint list (fail if not)
7. For each requested framework:
   a. Instantiate generator
   b. Create `sdk/v{ver}/{framework}/`
   c. Call `copy_auth_wrapper()` to bundle OAuth SDK source
   d. Call `generate()` to emit SDK files
8. Print summary: version number, frameworks generated, file counts

**Failure recovery:** Steps 5–7 are wrapped in a single try/except. If any step raises (e.g., a composite cache-key validation error, a generator crash), the partial `sdk/v{ver}/` directory is removed and any version archived in step 4 is moved back to `sdk/` from `sdk/archive/`, restoring the pre-run state. The process then exits non-zero with the error. This guarantees the working tree never ends up with the previous version archived and only a malformed/partial new version present.

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
| `baseUrl` | `MEDIAVIZ_BASE_URL` | API base URL (default: `https://api.mediaviz.ai`) |
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

**Token refresh:** A `_TokenTrackingClient` proxy wraps `OAuthClient`. When `request()` is called, the proxy passes an `onRefreshSuccess` (PHP/JS) / `on_refresh_success` (Python) callback to the inner OAuth client. On a 401-triggered refresh, the OAuth client invokes that callback synchronously the moment the rotated tokens arrive — **before** the retry. The callback updates the stored tokens via `setTokens()` and fires the user's `onTokenRefresh` hook. This is required because the upstream OAuth server enforces single-use refresh-token rotation per RFC 6749 §6: the old refresh token is deleted server-side the instant the rotation succeeds, so if the retry then throws (server hiccup, JSON parse error, etc.) the new pair must already be persisted — otherwise the caller is locked out and every subsequent refresh attempt returns 400 `invalid_grant`.

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
    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
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

Alt-host endpoints use direct `fetch` (JS) / `curl` (PHP) / `httpx` (Python) with `Bearer ${accessToken}` in the `Authorization` header — matching the RFC 7235 scheme used uniformly across the SDK, including the OAuth-client path. They do **not** go through the OAuth client's `request()` method, so there is no automatic 401-retry/token-refresh for these calls. This is intentional: alt-host services (e.g., the photo upload service) are separate from the core API and may not support the same token refresh flow.

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
      key: "upload_template:{params.project_table_name}"
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
| `steps[].ref` | Points to an existing endpoint (`controllers/<file>.yaml#<endpoint_id>`) or utility (`utilities/<module>.yaml#<util_id>`). Utility steps are auto-included from `api_docs/utilities/` — no separate ref-list enumeration is required. |
| `steps[].execution` | `once` or `for_each` (supported for both endpoint and utility steps) |
| `steps[].cache` | Static/module-level cache — `key` is a template string with `{...}` placeholders, e.g. `"upload_template:{params.project_table_name}"`. Each placeholder is a dot-path expression (`params.*`, `params.<obj>.<prop>`, `steps.<id>.*`); literals between placeholders namespace the entry for self-describing keys. Bare dot-paths (no `{}`) are rejected at composite-resolve time. Supported for both endpoint and utility steps; evaluated verbatim (no content hashing). |
| `steps[].input_map` | Maps endpoint params or utility params to dot-path expressions: `params.*`, `params.<obj>.<prop>`, `steps.<id>.*`. For utility steps, the keys are utility param names (canonical snake_case from the utility YAML) and the call is positional in declaration order. |
| `steps[].output_as` | Name to store step response under for later steps |
| `steps[].on_error` | `abort` (throw), `continue` (skip), `collect` (accumulate errors alongside results) — supported for both endpoint and utility steps |

### Resolver

`resolve_composites()` / `resolve_composite_files()` read each composite, then dispatch every step's `ref` through `_resolve_step()`:

- Endpoint refs (`controllers/<file>.yaml#<id>`) are resolved against the controller YAML and the flattened endpoint is embedded inline as `step["endpoint"]`.
- Utility refs (`utilities/<module>.yaml#<id>`) are resolved against the pre-loaded utilities list (the module name is derived from the YAML basename) and the full utility dict — including `snippet_body.<fw>`, `function_name.<fw>`, `params`, and any `async`/`imports` flags — is embedded inline as `step["utility"]`. Generators distinguish the two by which key is present.

The resolved output (`resolved_composites.yaml`) is self-contained: the utility snippet bodies are embedded into each step that references them, so the snapshot can be replayed without consulting `resolved_utilities.yaml` or the source `utilities/` directory.

`validate_composite_endpoints()` enforces that every endpoint step's `id` is present in the resolved `--endpoints` list. Utility steps are skipped — utilities are auto-discovered (`load_utilities(sources.utilities_dir)` in `generate.py`) and are not subject to the endpoint-ref-list enumeration rule.

### Generator Behavior

- **Grouping:** Composites declare a `controller` field and are appended to that controller's output file
- **Cross-controller imports:** If a composite step calls an endpoint from a different controller, the generator adds the necessary import (JS) or inlines the call (PHP)
- **Once steps — same-controller:** When a step's endpoint belongs to the same controller as the composite, the generated code delegates to the sibling method (e.g., `this.uploadPhotoToMediaviz(...)`) with `input_map` values mapped to the method's positional signature. Generation fails if the sibling endpoint is missing from the endpoint list. If cache is enabled, the step is still wrapped in a static `Map` (JS) or instance-property array (PHP)
- **Once steps — cross-controller:** Inlined via the context's `client.request()` (auth endpoints) or direct `fetch`/`curl` (alt-host endpoints)
- **Utility steps:** Detected by `step["utility"]` being present. Emitted as a positional call through the `_Context.utils` accessor — `self._ctx.utils.<fn>(...)` in Python, `$this->ctx->utils-><fn>(...)` in PHP, `this._ctx.utils.<fn>(...)` in JS. JS wraps the call in `await` when the utility's `async.javascript` flag is set. Argument order follows the utility's `params` declaration; each arg is the resolved `input_map[paramName]` dot-path expression (or the framework's null literal if no mapping is supplied). `_Context.utils` is only emitted when at least one utility is registered — composites without utility steps see no surface-area change.
- **For-each steps:** Loop over the array. For endpoint steps, inline the HTTP call when intermediate data flow requires it (e.g., passing cached template values as headers); otherwise call the generated function. For utility steps, the same loop scaffolding wraps a per-iteration positional call through `_ctx.utils`.
- **On-error modes:** `abort` throws immediately; `collect` wraps in try/catch and returns `{ results, errors }`. Both apply identically to endpoint and utility steps.
- **Cache:** Same wrapping shape for both endpoint and utility steps (static `Map` per step in JS, instance-property array in PHP, instance dict in Python). The cache key is the verbatim evaluation of `cache.key` — no content hashing — so utility-step caching is only safe when the key fully identifies the output (e.g. keying a derivation by `params.project_id`).
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

## Utilities

Utilities are non-endpoint helper functions exposed on the generated client under a `utils` namespace (`mv.utils.<name>(...)` in JS/Python, `$mv->utils-><name>(...)` in PHP). They are defined in YAML under `mediaviz_intelligence_hub/api_docs/utilities/` (one file per source module) so they sit alongside controllers/composites and can eventually be referenced from composite step refs.

A utility comes in one of two forms, chosen per-utility:

- **`target` form** — pass-through wrapper around a method on a bundled module client (e.g. the OAuth SDK's `decodeAccessToken`). The emitted method body is `return <inner>.<target>(...)`. Today only `source_module: oauth` has a registered inner expression.
- **`snippets` form** — standalone implementation. Each framework points at a snippet file containing the method body, and the resolver inlines the body verbatim (re-indented). Optional `imports` and `async` fields control the surrounding emission. The `source_module` is informational under this form (no `_inner_expr` lookup).

`target` and `snippets` are mutually exclusive; exactly one must be present.

### Config Format (`api_docs/utilities/*.yaml`)

```yaml
source_module: photos
utilities:
  # snippets form — standalone implementation per framework
  - id: downscale_photos
    description: "Resize an image to fit within max_dimension while preserving aspect ratio."
    function_name:
      javascript: downscalePhotos
      php: downscalePhotos
      python: downscale_photos
    params:
      - { name: image_bytes,   type: bytes, required: true }
      - { name: max_dimension, type: int,   required: true }
    snippets:                    # paths relative to this YAML file
      python:     snippets/photos/downscale_photos.py
      php:        snippets/photos/downscale_photos.php
      javascript: snippets/photos/downscale_photos.js
    imports:                     # optional, hoisted to the top of the client file
      python:
        - "from PIL import Image"
        - "from io import BytesIO"
    async:                       # optional, prefixes the method declaration
      javascript: true

  # target form — pass-through wrapper around an inner-client method
  - id: decode_access_token
    target:
      javascript: decodeAccessToken
      php: decodeAccessToken
      python: decode_access_token
    function_name:
      javascript: decodeAccessToken
      php: decodeAccessToken
      python: decode_access_token
    params:
      - { name: access_token, type: str, required: true }
    requires_tokens: false
```

### Key Schema Fields

| Field | Purpose |
|---|---|
| `source_module` | Module name. For `target`-form utilities this must match a registered inner expression (today: `oauth`). For `snippets`-form utilities it is informational. |
| `function_name.<fw>` | Public method name on `mv.utils`, per framework. |
| `target.<fw>` | (target form) Method name on the underlying module client, per framework. |
| `snippets.<fw>` | (snippets form) Path to a body file, **relative to the YAML file's directory**. All three frameworks (`javascript`, `php`, `python`) must be present. |
| `imports.<fw>` | (optional) List of statements hoisted to the top of the generated client file (`client.py`, `MediaVizClient.php`, `MediaViz.js`). Deduplicated across all utilities. |
| `async.<fw>` | (optional, boolean) When true, the emitted method declaration is prefixed with the framework's async keyword. Today only `javascript` honors this; PHP/Python ignore it. |
| `params[].name/type/required` | Same `{name, type, required}` shape as endpoint params. |
| `requires_tokens` | Prepend the standard "not authenticated" guard used by controllers (applies to both forms). |

### Snippet File Conventions

- **Zero-indent**: write the body at column 0; the generator re-indents each non-empty line to the per-framework body indent (8 spaces for Python/PHP, 4 spaces for JS browser). Blank lines stay blank (no trailing whitespace).
- **No signature**: do not include `def`/`function`/`public function`. The generator emits the signature from `function_name` and `params`. The snippet is the body only.
- **Parameter naming**: snippets reference the parameter names that the generator emits in the signature. Python uses the YAML name verbatim (snake_case). PHP and JS camelCase the YAML name (so `image_bytes` becomes `$imageBytes` in PHP, `imageBytes` in JS).
- **Return statement**: the snippet is responsible for its own `return`. The generator does not append one in snippet form.
- **Async**: when `async.javascript: true`, the snippet may use `await` freely. PHP/Python remain sync.

### Resolver (`utilities_resolver.py`)

`load_utilities(utilities_dir)` walks `*.yaml`, validates each utility, and resolves snippet paths to absolute file paths relative to the YAML directory. The YAML's `source_module` value must match the filename basename (e.g. `photos.yaml` must declare `source_module: photos`); a mismatch raises `ValueError` and aborts generation, because composite utility refs derive `source_module` from the filename and a mismatch would silently unreference the module. Snippet bodies are read at resolve time and stored under `snippet_body.<fw>` so the in-memory dict and the `resolved_utilities.yaml` snapshot are self-contained. Validation failures raise `ValueError` so generation aborts before emitting a broken SDK. `load_utilities` returns `[]` (no error) when the utilities directory does not exist, which keeps old `mediaviz_intelligence_hub` branches without utilities buildable.

Helpers exported to generators:
- `collect_framework_imports(modules, framework)` — deduplicated list of import statements across all utilities for one framework.
- `indent_body(body, indent)` — re-indent each non-empty line; empty lines stay empty.

### Generator Behavior

Each generator receives the utilities list as a kwarg on `generate()` / `emit_client_class()` and emits a small `_Utils` class next to the existing `_Context` / `_TokenTrackingClient` helpers. Per-utility emission:

- **`target` form**: `return <inner_expr>.<target>(<params>)` (`self._mv._tracking_client._inner` in Python, `$this->_mv->getOAuthClient()` in PHP, `this._mv._oauthClient._inner` in JS).
- **`snippets` form**: the loaded `snippet_body.<fw>` is re-indented and inlined as the method body. No trailing `return` is added.

Constructor wiring adds `this.utils = new _Utils(this)` (or the equivalent); field declaration is added in PHP (`public readonly _Utils $utils;`). Utility-declared `imports.<fw>` are hoisted to the top of the generated client file. When the utilities list is empty, no `_Utils` class and no extra imports are emitted.

### Shipped Utilities

#### `photos.downscale_photos(image_bytes, max_dimension)`

Resizes an image to fit within `max_dimension` while preserving aspect ratio, **re-encodes as JPEG (quality 90)**, and returns the JPEG bytes. JPEG output is intentional across all three frameworks so callers get the same on-the-wire format regardless of runtime — input PNG/WebP transparency is flattened.

- **Python** — PIL: `ImageOps.exif_transpose` → `Image.resize(..., LANCZOS)` → `convert("RGB")` → `save(format="JPEG", quality=90)`. Returns `bytes`.
- **PHP** — GD: `imagecreatefromstring` → `imagecopyresampled` → `imagejpeg(..., 90)`. Returns `string` (raw JPEG bytes).
- **JavaScript** — dual-runtime. The snippet detects browser vs Node at call time:
  - **Browser** path (renderer process / web app): `createImageBitmap(blob, { imageOrientation: 'from-image' })` + `OffscreenCanvas` (or `<canvas>`), then `canvas.convertToBlob({ type: 'image/jpeg', quality: 0.9 })` or `canvas.toBlob(...)`. The resulting Blob is converted to `Uint8Array`.
  - **Node** path (Electron main process, server-side): lazy-loads `sharp` via an indirect-specifier dynamic `import()` — `const _sharpSpec = 'sharp'; (await import(_sharpSpec)).default` — so rollup/webpack do not statically resolve `sharp` when bundling for the browser. Pipeline: `.rotate().resize({ width: maxDimension, height: maxDimension, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 90 }).toBuffer()`.
  - Both JS paths return `Uint8Array`. If the Node path is invoked without `sharp` installed, the snippet throws a clear error: `"downscalePhotos requires 'sharp' when running in Node.js. Install it: npm install sharp"`.

`sharp` is declared in the generated `package.json` `optionalDependencies` (`emit_package_json` in `generators/javascript_browser.py`). Browser-only consumers can `npm install --no-optional` or ignore it; Node/Electron consumers install `sharp` normally.

## Constraints

- All generated code is read-only by convention. Manual edits go into a separate layer (not covered by this spec).
- Previous version directories are archived to `sdk/archive/` when a new version is generated. Archived versions are never modified or deleted.
- When adding a new framework generator, the project `.gitignore` must be updated to ignore that framework's dependency/install directories (e.g., `node_modules/` for JS, `vendor/` for PHP). This prevents committed generated SDKs from including third-party dependency trees.
- The resolved YAML is the source of truth for what was generated in a given version — it is an immutable snapshot, packaged inside the version directory.

## CI / Automation Pipeline

Three-repo propagation chain wired with GitHub Actions: `mediaviz_external_api` → `mediaviz_intelligence_hub` → `mediaviz_sdk`. Branches dev/qa/main are mirrored end-to-end.

### Triggers
- **`mediaviz_external_api/.github/workflows/docker-image.yml`** (modified)
  - `notify_downstream` job: on push to dev/qa/main after `build_and_publish` succeeds, sends `repository_dispatch` event `api-updated` to `mediaviz_intelligence_hub` with `{branch, sha, release_version}`.
  - `verify_hub` + `verify_sdk` jobs: on PR to dev/qa/main, run the full downstream chain inside the same workflow run using artifacts to ship hub output into the SDK gen. No commits in verify mode.
- **`mediaviz_intelligence_hub/.github/workflows/update-intelligence-hub.yml`** (new)
  - Triggered by `repository_dispatch: api-updated` (propagate mode) or `pull_request: [dev, qa, main]` (verify mode).
  - Propagate mode: checks out external_api at the dispatched SHA, runs `run_pipeline.py`, commits regenerated `api_docs/` + `mediaviz_api_endpoints_scanned.json` to the matching branch, then dispatches `hub-updated` to `mediaviz_sdk`.
  - Verify mode: runs the pipeline against the PR's base branch; failures fail the PR check; no commit.
- **`mediaviz_sdk/.github/workflows/update-sdk.yml`** (new)
  - Triggered by `repository_dispatch: hub-updated` (propagate mode) or `pull_request: [dev, qa, main]` (verify mode).
  - Propagate mode: checks out hub + oauth_library at the matching branch, runs `python generate.py --endpoints all_endpoints` (with `--minor-version` only when `branch == main`), commits regenerated `sdk/` to the branch.
  - Verify mode: runs the generator (which runs the test suite); failures fail the PR check; no commit.

### Auth
A single GitHub App `mediaviz-pipeline-bot` installed on all four repos (`mediaviz_external_api`, `mediaviz_intelligence_hub`, `mediaviz_sdk`, `oauth_library`) in the `imaige` org. Permissions: `contents: write`, `metadata: read`, `actions: write` (for `repository_dispatch`). Secrets `MEDIAVIZ_PIPELINE_BOT_APP_ID` and `MEDIAVIZ_PIPELINE_BOT_PRIVATE_KEY` are referenced by `actions/create-github-app-token@v1` in each workflow that needs to push or dispatch.

### Loop prevention
The hub and SDK propagate workflows trigger only on `repository_dispatch` (not `push`), so the bot's auto-commit cannot re-fire them. Manual direct pushes to hub/sdk dev/qa/main therefore do not regenerate; direct edits must go through PRs.

### Version-bump rule
`update-sdk.yml` passes `--minor-version` to `generate.py` only when `mode == propagate AND branch == main`. dev/qa propagate runs use the default iteration bump. Verify-mode runs never bump (no commit happens).

### Path resolution in CI
`actions/checkout` with `path: <sibling_name>` replicates the local sibling layout (`$GITHUB_WORKSPACE/{mediaviz_external_api,mediaviz_intelligence_hub,mediaviz_sdk,oauth_library}`), so `github_sources._CODE_ROOT = dirname(dirname(__file__))` and the hub scripts' `../mediaviz_external_api/...` defaults work without any generator-script changes.
- No runtime dependencies beyond the bundled OAuth SDK and the language's standard HTTP primitives (`fetch` for JS, `curl` for PHP).

## Publishing

After the SDK is regenerated and committed by `update-sdk.yml` propagate mode, the workflow publishes **two parallel JS packages** to npm on every dev/qa/main run (`@mediaviz/sdk` public + `@mediaviz/admin-sdk` private), and the PHP package to Packagist on main runs only.

### Endpoint set
The CI workflow runs `python generate.py` twice per propagate run:
- **Public** — no `--endpoints` argument, so the generator uses its default of `public_sdk_endpoints` (the public-facing endpoint subset that excludes admin/system endpoints — `../mediaviz_intelligence_hub/api_docs/endpoint_list/public_sdk_endpoints.yaml`). Outputs to `sdk/`.
- **Admin** — `--frameworks javascript --destination-dir admin-sdk --admin`. The `--admin` flag implies `--endpoints all_endpoints` (no need to pass it explicitly). Outputs to `admin-sdk/`. JS-only; PHP/Python skipped because the admin variant ships only to npm. The independent `--destination-dir` means `sdk/` and `admin-sdk/` each maintain their own version history (independent `archive/` subdirs, independent `versioning.get_next_version` state), so a generator failure in one path does not corrupt the other.

Resolution rule for `--endpoints`: if unset, it's `all_endpoints` when `--admin` is set, else `public_sdk_endpoints`. Explicit `--endpoints X` always wins, so a manual run can still build any flow into either dir.

### npm — `@mediaviz/sdk` (public)
Single package on npmjs.com, branch-mapped dist-tags (`dev`, `qa`, `latest`). `package.json` (emitted by `generators/javascript_browser.py:emit_package_json`) carries: live SDK version (extracted from output dir via regex), `license: MIT`, `repository`, `publishConfig.access: public`, and `files: ["dist", "LICENSE", "README.md"]` so only the pre-built Rollup bundles ship — the framework source files are inputs to the build, not part of the consumer payload.

The Rollup build toolchain (`scripts.build` + the `rollup`/`@rollup/plugin-*` `devDependencies`) is needed only to produce the dist bundles, so `generate()` calls `prune_package_json_for_publish` immediately after `build_dist`: it removes `scripts` and `devDependencies` from the manifest before publish, leaving the published `package.json` with no build-only fields. `optionalDependencies` (`sharp`) is preserved as a real runtime optional dep. Net effect: a consumer running `npm install @mediaviz/sdk` pulls only the dist bundles + `sharp` (optional) — never Rollup.

Auth via **npm Trusted Publishing** (OIDC). The workflow declares `permissions: id-token: write` and runs `npm publish --access public --tag <branch-tag> --provenance` from `sdk/v*/javascript/`. No long-lived `NPM_TOKEN` exists. npm verifies the GitHub-issued OIDC token against the trusted publisher config registered at the npm package level (org=mediaviz, repo=mediaviz_sdk, workflow=update-sdk.yml).

### npm — `@mediaviz/admin-sdk` (private)
JS-only sibling package. Same generator code path as the public package — the only difference is that `generate.py --admin` flips `emit_package_json`'s name to `@mediaviz/admin-sdk`, `publishConfig.access` to `restricted`, and the description to "MediaViz JavaScript Admin SDK — auto-generated full endpoint client (private)". Same dist-tag scheme (`dev`/`qa`/`latest`), same Trusted Publishing flow. Published with `--access restricted` so the package stays private even on main; consumers must be members of the `mediaviz` org (or invited as collaborators on the package) to install.

The admin package requires its **own** trusted-publisher entry at the npm package level (separate from `@mediaviz/sdk`). Bootstrap is identical to the public package: one manual `npm publish --access restricted` from a laptop with a temporary classic token, then register the trusted publisher, then revoke the token. After that the workflow OIDC flow takes over.

### Packagist — `mediaviz/sdk`
Packagist publishes from the root of a git repo, so the PHP SDK lives in a dedicated companion repo `mediaviz/mediaviz_php_sdk` rather than under `mediaviz_sdk/sdk/v*/php/`. On main propagate runs only, the workflow:
1. Checks out `mediaviz_php_sdk` with the GitHub App token.
2. `rsync`s the freshly-generated `sdk/v*/php/` contents over the php-sdk repo (excluding `.git`).
3. Commits, tags `vX.Y.Z`, pushes tag + main.
4. POSTs to `https://packagist.org/api/update-package` (auth: `PACKAGIST_USERNAME` + `PACKAGIST_API_TOKEN` secrets) to force a refresh.

`composer.json` (emitted by `generators/php.py:emit_autoload_config`) carries: `name: mediaviz/sdk`, `type: library`, `license: MIT`, live `version` (same regex pattern as JS), `description`, and the PSR-4 + files autoload entries.

### LICENSE
Shared MIT text and version-extraction helper live in `generators/licenses.py`. The JS, PHP, and Python generators all call `emit_license(output_dir)` at the end of their `generate()` flow, so every framework directory ships a `LICENSE` file alongside its manifest.
