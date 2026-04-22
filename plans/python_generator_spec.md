# Python SDK Generator Spec

## Scope
Add a Python SDK generator to the `mediaviz_sdk` package. It must implement the `BaseGenerator` contract (`generators/base.py`) exactly as `generators/php.py` and `generators/javascript_browser.py` do, producing a fully generated, installable Python package per resolved endpoint/composite spec. A paired `test_generators/python.py` generates and runs a pytest suite against the emitted SDK.

The generator is auto-discovered via `generators/__init__.discover_generators` by virtue of subclassing `BaseGenerator` and setting `framework_name`.

## Stack
- **Runtime**: Python 3.12 target.
- **HTTP**: `httpx` throughout (sync `httpx.Client`). Not `requests`. Rationale: the in-tree `oauth_sdk` is httpx-based; introducing `requests` would mean two HTTP libraries in one SDK and a re-implementation of token refresh. `httpx` also leaves the door open for a future async variant via `httpx.AsyncClient` without changing dependencies.
- **Sync only** for this version. Async variant is out of scope.
- **Typing**: moderate — typed parameters and path/query signatures; responses typed as `dict[str, Any]` (no TypedDict/dataclass generation). `from __future__ import annotations` in every emitted file.

## Output layout
`framework_name = "python"`. For a given version `vX.Y.Z` and output root `sdk/vX.Y.Z/python/`:

```
sdk/vX.Y.Z/python/
  pyproject.toml
  mediaviz_sdk/
    __init__.py          # top-level re-exports (MediaVizClient, errors, oauth_sdk names)
    client.py            # MediaVizClient, _Context, _TokenTrackingClient
    errors.py            # ApiError + subclasses + handle_response
    projects.py          # one file per controller (snake_case)
    photos.py
    ...
  oauth_sdk/             # copied in-tree as a sibling package, stripped of its own pyproject.toml
    __init__.py
    _client.py
    _errors.py
    _http.py
    _pkce.py
    _types.py
```

Both `mediaviz_sdk/` and `oauth_sdk/` are declared as packages in `pyproject.toml`. `oauth_sdk` is imported absolutely (`from oauth_sdk import OAuthClient`) to match the copy-as-sibling pattern used by the PHP and JS generators.

## Generator: `generators/python.py`

### Class
```python
class PythonGenerator(BaseGenerator):
    framework_name = "python"
```

### Method mapping to `BaseGenerator`
- `generate(endpoints, output_dir, composites)` — creates `mediaviz_sdk/`, emits `errors.py`, one file per controller, `client.py`, `__init__.py` with re-exports, and `pyproject.toml` at `output_dir/`.
- `copy_module(module_name, module_root, output_dir)` — delegates to `_copy_module_files(module_root, "python", module_name, output_dir)`. After copying, removes any `pyproject.toml`, `setup.py`, `setup.cfg`, `tests/`, `dist/`, `__pycache__/` inside the copied tree to satisfy "no package metadata".
- `discover_module_exports(module_name, module_path)` — reads the module's `__init__.py`, extracts names from `__all__` if present, else from top-level `from ._X import Y`/`from ._X import *` and `import _X`. Each export: `{"name": str, "source": "oauth_sdk._client" | ..., "kind": "class" | "function" | "constant"}`.
- `emit_reexports(module_name, exports, output_dir)` — returns `None` for nested modules. Re-exports are written into `mediaviz_sdk/__init__.py` directly by `generate()` after `reexport_all_modules()` collects exports. (Base class expects a filename for barrel inclusion; Python uses the package `__init__.py` so we return `None` and manage the barrel ourselves.)
- `emit_client_class(groups, comp_groups, alt_hosts, output_dir)` — emits `mediaviz_sdk/client.py`.
- `_optional_check_expr(expr)` — returns `f"{expr} is not None"`.

### Type mapping
| YAML type      | Python type |
|----------------|-------------|
| `string`, `str`, `datetime`, `emailstr` | `str` |
| `integer`, `int` | `int` |
| `number`, `float` | `float` |
| `boolean`, `bool` | `bool` |
| `list`, `array` | `list` |
| `any`, `Dict`, `dict` | `Any` |

Nullable wrapping: `T | None` (PEP 604, requires `from __future__ import annotations` or 3.10+; 3.12 runtime-safe).
Return type for all request methods: `dict[str, Any]` (response JSON passed through). Client `authenticate`/`handle_callback`/`get_authorization_url` return the oauth_sdk types verbatim.

### Naming
- Method names: snake_case directly from `ep["function_name"]` (no `snake_to_camel` call).
- Class names for controllers: `snake_to_pascal(controller)` → e.g. `Projects`, `Photos`.
- Client property names: snake_case controller name directly.
- Header param names: `header_to_param(header)` (same helper as PHP/JS).
- File names: snake_case controller (matches YAML already).

### Controller file structure
```python
from __future__ import annotations
from typing import Any
import httpx

from .errors import handle_response

class Projects:
    def __init__(self, ctx):
        self._ctx = ctx

    def create_project(self, name: str, description: str | None = None) -> dict[str, Any]:
        ...
```

### Auth vs unauth vs alt-host method shapes
Mirror the PHP generator's three code paths:

- **Auth (`ep["auth"] == "required"`, no `api_host`)**: call `self._ctx.client.request(path, method, access_token, refresh_token, body)` and return `.data`. The `_ctx.client` is the `_TokenTrackingClient` wrapping the `OAuthClient`.
- **Unauth (no `api_host`, no auth)**: build URL from `self._ctx.base_url + path`; use `httpx.Client()` inline with a `with` block; call `handle_response(resp.text, resp.status_code, dict(resp.headers))`.
- **Alt-host (`api_host` set)**: require auth tokens, resolve base URL via `self._ctx.require_host(host_key)`, use `httpx.Client()` inline with `Authorization` header built from the current access token and any custom required/optional headers.

### Body serialization
Implements the four shapes from `BaseGenerator._body_shape`:
- `None` → no body.
- `"scalar"` → `body = <param_name>`.
- `"expanded"` → nested `dict` literal built via `_render_object_tree_python`, with `{k: v for k, v in {...}.items() if v is not None}` comprehension to drop nulls (matches PHP `array_filter`).
- `"flat_dict"` → `body = {"snake_key": camel_param, ...}`.
- `"generic"` → passthrough `body` param.

Signature helpers:
- `_python_body_sig_tokens(request_body) -> list[str]` — returns `["name: type", "name: type | None = None", ...]` in required-first order for the `def` signature.
- `_python_body_build(request_body, content_type, indent) -> (preamble_lines, body_expr)` — mirrors the PHP helper, using Python dict literals and comprehensions.

### Composites
Same structure as PHP `_emit_composite_method`:
- `once` step → call `self._ctx.client.request(...)` (auth) or inline `httpx.Client()` (unauth/alt-host).
- `for_each` step → `for _index, item in enumerate(<array_expr>):` with optional `try/except` for `on_error in ("collect", "continue")`. Collects errors as `{"index": _index, "error": str(e)}`.
- Step cache → `self._<step_id>_cache: dict[str, Any]` instance attr, keyed by `str(<cache_key>)`.
- Returns → dict `{"results": ..., "errors": ...}` for `collect`, raw value otherwise.

Expression resolution (parallel to `_resolve_php_expr`):
- `params.foo` → `foo` (the Python param name)
- `params.foo.bar` → `foo["bar"]`
- `steps.name` → `name` (local var from prior step)
- `steps.name.key` → `name["key"]`
- literals → `repr(expr)` (single-quoted strings)

### Client class (`client.py`)
Structure mirrors `MediaVizClient.php`:

```python
class _Context:
    def __init__(self, mv: "MediaVizClient"):
        self._mv = mv
        self.client = mv._tracking_client  # _TokenTrackingClient

    @property
    def access_token(self) -> str | None: return self._mv._access_token
    @property
    def refresh_token(self) -> str | None: return self._mv._refresh_token
    @property
    def base_url(self) -> str: return self._mv._config["base_url"]

    def require_host(self, key: str) -> str: ...
    def require_tokens(self) -> None: ...

class _TokenTrackingClient:
    def __init__(self, mv, inner): ...
    def request(self, url, method, access_token, refresh_token, body=None):
        result = self._inner.request(url, method, access_token, refresh_token, body)
        if result.updated_tokens is not None:
            self._mv.set_tokens(result.updated_tokens.access_token, result.updated_tokens.refresh_token)
            if self._mv._on_token_refresh: self._mv._on_token_refresh(result.updated_tokens)
        return result

    def __getattr__(self, name):  # passthrough
        return getattr(self._inner, name)

class MediaVizClient:
    def __init__(self, *,
                 client_id: str | None = None,
                 client_secret: str | None = None,
                 base_url: str | None = None,
                 redirect_uri: str | None = None,
                 hosts: dict[str, str] | None = None,
                 access_token: str | None = None,
                 refresh_token: str | None = None,
                 on_token_refresh=None):
        # env fallback: MEDIAVIZ_CLIENT_ID, MEDIAVIZ_CLIENT_SECRET, MEDIAVIZ_BASE_URL, MEDIAVIZ_REDIRECT_URI
        # per-host env: MEDIAVIZ_<HOST>_URL
        ...
        self.projects = Projects(ctx)
        self.photos = Photos(ctx)
        ...

    def authenticate(self) -> TokenResponse: ...
    def get_authorization_url(self, state: str | None = None) -> AuthorizationUrlResult: ...
    def handle_callback(self, code: str, code_verifier: str) -> TokenResponse: ...
    def set_tokens(self, access_token: str, refresh_token: str) -> None: ...
```

Accepts both keyword-arg construction and a single `dict` config via `**config` unpacking by the user (no special-case handling; plain kwargs).

Host env vars: `MEDIAVIZ_<HOST_UPPER>_URL`. `hosts` kwarg overrides env; env overrides default (`None`).

### Errors (`errors.py`)
Pythonic names, mirroring the PHP hierarchy:

```python
class ApiError(Exception):
    def __init__(self, message: str, status: int, request_id: str | None, body: Any): ...

class ValidationError(ApiError):
    field_errors: list[dict]  # {"loc": [...], "msg": str, "type": str}

class NotFoundError(ApiError): ...
class RateLimitError(ApiError):
    retry_after: int | None

class ServerError(ApiError): ...

def handle_response(raw: str, status: int, headers: dict[str, str]) -> Any:
    # 422 → ValidationError; 404 → NotFoundError; 429 → RateLimitError;
    # >=500 → ServerError; else ApiError; 2xx → parsed JSON
    ...
```

All unauth and alt-host methods call `handle_response` directly. Auth methods rely on `OAuthClient.request`'s own error propagation (`OAuthError`) — same as PHP/JS, which propagate the OAuth SDK's native errors for auth'd calls.

### `__init__.py` re-exports (top-level `mediaviz_sdk/__init__.py`)
```python
from .client import MediaVizClient
from .errors import ApiError, ValidationError, NotFoundError, RateLimitError, ServerError
# auto-generated from oauth_sdk discovery:
from oauth_sdk import OAuthClient, OAuthError, ...

__all__ = [...]
```

### `pyproject.toml` (PEP 621, setuptools backend)
```toml
[project]
name = "mediaviz-sdk"
version = "<generated>"
requires-python = ">=3.12"
dependencies = ["httpx>=0.27"]

[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[tool.setuptools]
packages = ["mediaviz_sdk", "oauth_sdk"]
```

Version string: taken from the generator's framework output path (`v1.0.2` → `1.0.2`). Generator does not need to hit `versioning.py` directly; `generate.py` already invokes the generator with the versioned `fw_dir`, so we parse the trailing `vX.Y.Z` segment from `output_dir`.

## Test generator: `test_generators/python.py`

### Class
```python
class PythonTestGenerator(BaseTestGenerator):
    framework_name = "python"
```

### Files emitted into `test_dir/`
- `conftest.py` — fixtures: `spy_client` (a `SpyOAuthClient`), `mv_client` (a `MediaVizClient` wired to the spy).
- `test_helpers.py` — `SpyOAuthClient` subclass of `oauth_sdk.OAuthClient` with `__init__(self): self.calls = []` (no real HTTP) and a `request()` override that records `(url, method, access_token, refresh_token, body)` and returns a canned `AuthenticatedResponse(data={}, updated_tokens=None)`.
- `test_errors.py` — asserts each error class maps from the right status code.
- `test_<controller>.py` — one test per endpoint asserting the spy recorded the expected URL (with path/query substitution per `TEST_VALUES` / `ENCODING_TEST_VALUES`), method, and body shape. For unauth and alt-host endpoints, uses `httpx.MockTransport` passed via `httpx.Client(transport=...)` — test wires transport by patching `httpx.Client` for the duration of the call (via `monkeypatch` fixture).
- `pyproject.toml` — lists `pytest`, `httpx` as deps; `[tool.pytest.ini_options] testpaths = ["."]`; declares sibling `mediaviz_sdk` and `oauth_sdk` packages via a `[tool.setuptools]` section pointing at `../<sdk_dir>`.
  - Alternative (simpler): emit a `conftest.py` that does `sys.path.insert(0, "<sdk_dir>")` so tests import the generated package directly without install. Preferred, to match PHP's `composer.json` path-autoload approach.

### `run(test_dir)`
Runs `python -m pytest -v` via `subprocess`, parses pytest's summary line (`X passed`, `Y failed`, `Z errors`) for `TestResult`. Returns `success = (returncode == 0)`.

### Test value generation
Use the `TEST_VALUES` / `ENCODING_TEST_VALUES` maps already in `test_generators/base.py`. For `request_body`:
- `scalar` → test value for the type.
- `expanded` → build a nested dict from `orig_path` keyed to test values; required-first positional args plus any non-None optional kwargs.
- `flat_dict` → `{snake_key: test_value}`.
- `generic` → `{"body": "test"}`.

## Integration points (unchanged)
- `generate.py` — no changes. `discover_generators()` picks up `PythonGenerator` by class discovery. Same for `discover_test_generators()`.
- `naming.py` — uses the existing `snake_to_pascal`, `header_to_param` helpers. Does not use `snake_to_camel` for method names (Python stays snake_case).

## Acceptance criteria
1. `python generate.py --endpoints basic_sdk_flow_endpoints --frameworks python` succeeds and emits a syntactically valid package under `sdk/vX.Y.Z/python/`.
2. `python -m pip install -e sdk/vX.Y.Z/python` installs cleanly into a fresh venv.
3. `python -c "from mediaviz_sdk import MediaVizClient; MediaVizClient(client_id='x', client_secret='y')"` runs without error.
4. Generated test suite runs via `PythonTestGenerator.run` and reports `success=True` on the happy path.
5. Matches JS/PHP parity: every endpoint in the YAML is represented as a method with the same signature shape (path → required → body → optional).
6. Works for composites: both `once` and `for_each` steps, including `on_error` variants and step caching.
7. No `requests` import anywhere in the generated output. No async code.
