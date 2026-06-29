# Test Generator Specification

## Purpose

A utility that reads the same YAML endpoint/controller specifications used by the SDK generators and produces a framework-specific test suite. Every SDK framework (javascript, php, python, java, future additions) must pass this generated test suite after each generation. The test suite validates **contracts only** — correct function/method existence, correct signatures, correct HTTP method, correct URL construction, correct parameter handling — without hitting any server or mocking HTTP responses.

## Inputs

Same as the SDK generator:
- `endpoints`: resolved endpoint list (output of `resolve_refs()`)
- `output_dir`: path to the generated SDK for the target framework (e.g. `output/v2/javascript/`)

The test generator reads the resolved endpoints and the generated SDK source files to produce tests.

## Output

```
output/v{N}/tests/{framework}/
```

One test file per controller, plus a shared fixtures/helpers file. The test runner config file is also generated (e.g. `jest.config.js`, `phpunit.xml`).

### Output structure (javascript example)
```
output/v2/tests/javascript/
  package.json          # devDependencies: jest, @babel/...
  jest.config.js
  helpers.js            # SpyOAuthClient, assertion utilities
  keywords.test.js      # tests for Keywords controller
  authentication.test.js
  ...
```

### Output structure (php example)
```
output/v2/tests/php/
  composer.json          # require-dev: phpunit
  phpunit.xml
  helpers.php            # SpyOAuthClient, assertion utilities
  KeywordsTest.php
  AuthenticationTest.php
  ...
```

## Contract Test Categories

For every non-hidden endpoint, the following assertions are generated:

### 1. Export/existence

The function or method exists and is callable.

- **JS**: `typeof getKeywordUser === 'function'`
- **PHP**: `method_exists(Keywords::class, 'getKeywordUser')`

### 2. HTTP method correctness

The generated function passes the correct HTTP method string to the underlying transport.

Uses a **SpyOAuthClient** (for auth endpoints) or **SpyFetch/SpyCurl** (for unauth endpoints) that records the method string passed to it.

- Auth endpoint example: spy captures the second arg to `client.request(path, 'GET', ...)` and asserts `=== 'GET'`.
- Unauth endpoint example: spy captures the `method` key from the fetch options object.

### 3. URL path construction

Given known input values for path parameters, the constructed URL matches the expected pattern from the YAML spec.

- For `path: "/api/v1/keyword/list/{keywordListId}"` with `keywordListId=42`:
  - JS: assert path === `/api/v1/keyword/list/42`
  - PHP: assert path === `/api/v1/keyword/list/42`

Path params are URL-encoded. Test values are chosen to exercise encoding (e.g. a string param gets `"hello world"` to verify `hello%20world`).

### 4. Query parameter construction

For endpoints with query params, given known input values:
- Query params appear in the URL query string with correct keys
- Omitted optional params do not appear in the URL
- Key names match the YAML `name` field (snake_case), not the camelCase param name

### 5. Request body construction

For endpoints with a structured `request_body`:
- The body is serialized (JSON) containing all declared field keys
- Field keys in the serialized body use the YAML snake_case names, not camelCase

For endpoints with an unstructured `request_body` (string like `"array of collection IDs"`):
- The function accepts a body parameter and passes it through

### 6. Auth routing

- Auth-required endpoints: function calls `client.request(...)` (OAuthClient)
- Auth-none endpoints: function calls `fetch()`/`curl_init()` (direct HTTP)

The spy records which transport was used. Assert the correct one was invoked.

### 7. Function signature shape

Verify the function accepts the expected number/names of parameters:
- Auth endpoints: `client`, `accessToken`, `refreshToken`, then path params, then optional body/query
- Unauth endpoints: `baseUrl`, then path params, then body params

For typed languages (PHP, Java, Python): verify parameter types match YAML `type` field.

### 8. Error class existence

Verify the error module exports all expected error classes:
- `ApiError` / `ApiException`
- `ValidationError` / `ValidationException`
- `NotFoundError` / `NotFoundException`
- `RateLimitError` / `RateLimitException`
- `ServerError` / `ServerException`

## SpyOAuthClient Design

A minimal class that records calls instead of making real requests.

```
SpyOAuthClient:
  calls: list of {path, method, accessToken, refreshToken, body?}

  request(path, method, accessToken, refreshToken, body=None):
    self.calls.append({path, method, accessToken, refreshToken, body})
    return stub response

  last_call() -> most recent call dict
  reset() -> clear calls
```

For unauth endpoints, a similar spy replaces `fetch` (JS) or intercepts `curl_init` (PHP) to capture the outgoing request details.

### JS spy strategy

- SpyOAuthClient: class with `.request()` that records args
- For unauth functions: they call `fetch()` — the test file sets `globalThis.fetch` to a spy that records the URL, method, headers, and body, then returns a stub Response

### PHP spy strategy

- SpyOAuthClient: class implementing the same interface, records calls
- For unauth functions: they use `curl_init` — test uses `namespace MediaVizSdk;` function override or a thin wrapper. Alternatively, since contract tests focus on the constructed path/body, the test can instantiate the class, call the method with a spy client, and inspect recorded args
- **Signature is derived, not hardcoded.** `SpyOAuthClient extends OAuthClient`, so PHP enforces at class-load that its `request()` override stay signature-compatible (a parameter may not be *narrower* than the parent's). `PhpTestGenerator.emit_helpers` parses the `request(...)` parameter list and return type straight from the SDK's bundled `oauth/src/OAuthClient.php` and emits the spy to match exactly, falling back to the known-good default contract if that file is missing/unparseable. This prevents the spy from desyncing when the upstream OAuth library changes the signature — e.g. making `?string $refreshToken` nullable previously broke the build with a fatal `Declaration … must be compatible` error.

## Test Value Generation

For each parameter type, deterministic test values:
- `string` -> `"test_value"` (or `"hello world"` when testing URL encoding)
- `integer` / `int` -> `42`
- `boolean` / `bool` -> `true`
- `number` / `float` -> `3.14`
- `array` -> `["item1", "item2"]`

These are hardcoded per-type, not randomized. Every test run produces identical results.

## Integration with generate.py

The test generation and execution is **automatic** — no flag required. Every invocation of `generate.py` will:

1. Resolve endpoints (existing)
2. Generate SDK for each framework (existing)
3. **Generate test suite** for each framework into `output/v{N}/tests/{framework}/`
4. **Run tests** for each framework
5. Print test results summary at the top of output — failures listed first with framework name, test name, and assertion detail so they are easily found and remedied

### Execution flow addition to `main()`:

```python
for framework in requested:
    # ... existing SDK generation ...

    # generate tests
    test_gen = test_registry[framework]()
    test_dir = os.path.join(output_dir, f"v{version}", "tests", framework)
    os.makedirs(test_dir, exist_ok=True)
    test_gen.generate(endpoints, fw_dir, test_dir)

    # run tests
    result = test_gen.run(test_dir)
    results[framework] = result

# print summary — failures first
print_test_summary(results)
```

## Test Generator Architecture

Mirrors the SDK generator architecture:

```
test_generators/
  __init__.py            # discover_test_generators() -> {framework: class}
  base.py                # BaseTestGenerator (ABC)
  javascript.py          # JavaScriptTestGenerator
  php.py                 # PhpTestGenerator
```

### BaseTestGenerator (ABC)

```python
class BaseTestGenerator(ABC):
    framework_name: str

    @abstractmethod
    def generate(self, endpoints: list[dict], sdk_dir: str, test_dir: str) -> None:
        """Generate test files from resolved endpoints."""

    @abstractmethod
    def run(self, test_dir: str) -> TestResult:
        """Execute the generated tests. Return TestResult."""

    def group_by_controller(self, endpoints):
        # reuse from BaseGenerator or shared util
```

### TestResult

```python
@dataclass
class TestResult:
    success: bool
    total: int
    passed: int
    failed: int
    output: str  # raw test runner stdout/stderr
```

## Framework-specific test runner requirements

### JavaScript
- Test runner: Jest (or Vitest — either works, Jest is more universal)
- Generated `package.json` with `jest` + `@babel/preset-env` (for ESM support)
- Tests run via `npx jest` subprocess
- `npm install` runs first if `node_modules/` doesn't exist

### PHP
- Test runner: PHPUnit
- Generated `composer.json` with `phpunit/phpunit` in require-dev
- Tests run via `./vendor/bin/phpunit` subprocess
- `composer install` runs first if `vendor/` doesn't exist

### Python (future)
- Test runner: pytest
- Generated test files are `test_*.py`
- Tests run via `python -m pytest` subprocess

### Java (future)
- Test runner: JUnit 5
- Generated via Maven/Gradle with `junit-jupiter` dependency

## Naming Conventions

### Controller name → class/identifier name

Controller names from the YAML specs may contain spaces (e.g. `"Curated Albums"`) or mixed formatting. Object-oriented languages (PHP, Java, Python, C#, etc.) require valid identifiers for class names — no spaces, no special characters.

**Rule:** Before deriving a class name, normalize the controller name by replacing spaces with underscores, then apply `snake_to_pascal()`. This applies to both the SDK generator (class file emission) and the test generator (test class/file emission).

```python
class_name = snake_to_pascal(controller.replace(" ", "_"))
# "Curated Albums" → "curated_albums" → "CuratedAlbums"
# "keywords"       → "keywords"       → "Keywords"
# "custom_albums"  → "custom_albums"  → "CustomAlbums"
```

This normalization must be applied consistently in:
1. **SDK generators** — the emitted class name and filename
2. **Test generators** — the test class name, filename, and `use`/`import` statements

Languages like JavaScript that use bare functions (not classes) for controllers may not need this, but any OOP language must apply it.

## Edge Cases

- **Hidden endpoints**: skipped (not tested, not generated)
- **Endpoints with no params**: test only existence, method, and auth routing
- **Unstructured request_body** (string value like `"array of collection IDs"`): test that a body param exists and is passed through, don't assert field structure
- **Endpoints with both path and query params**: test path interpolation and query string separately
- **URL encoding**: at least one test per path-param endpoint uses a value requiring encoding
- **Missing `params` key**: treat as empty list (some endpoints have no `params` key in YAML)
