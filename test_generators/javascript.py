from __future__ import annotations
import json
import os
import subprocess

from naming import snake_to_camel, snake_to_pascal, header_to_param  # noqa: F401
from .base import BaseTestGenerator, TestResult


class JavaScriptTestGenerator(BaseTestGenerator):
    framework_name = "javascript"

    snake_to_camel = staticmethod(snake_to_camel)
    snake_to_pascal = staticmethod(snake_to_pascal)
    header_to_param = staticmethod(header_to_param)

    def generate(self, endpoints: list[dict], sdk_dir: str, test_dir: str) -> None:
        os.makedirs(test_dir, exist_ok=True)
        self.emit_package_json(test_dir, sdk_dir)
        self.emit_jest_config(test_dir)
        self.emit_helpers(test_dir)
        self.emit_errors_test(sdk_dir, test_dir)
        groups = self.group_by_controller(endpoints)
        for controller, eps in groups.items():
            self.emit_controller_test(controller, eps, sdk_dir, test_dir)

    def run(self, test_dir: str) -> TestResult:
        node_modules = os.path.join(test_dir, "node_modules")
        if not os.path.isdir(node_modules):
            install = subprocess.run(
                ["npm", "install"],
                cwd=test_dir,
                capture_output=True,
                text=True,
            )
            if install.returncode != 0:
                return TestResult(
                    success=False,
                    total=0,
                    passed=0,
                    failed=0,
                    output=install.stdout + install.stderr,
                )

        result = subprocess.run(
            ["npx", "jest", "--no-coverage"],
            cwd=test_dir,
            capture_output=True,
            text=True,
        )
        output = result.stdout + result.stderr
        passed, failed, total = _parse_jest_counts(output)
        return TestResult(
            success=result.returncode == 0,
            total=total,
            passed=passed,
            failed=failed,
            output=output,
        )

    # ── file emitters ─────────────────────────────────────────────────────────

    def emit_package_json(self, test_dir: str, sdk_dir: str) -> None:
        rel_sdk = os.path.relpath(sdk_dir, test_dir)
        config = {
            "name": "mediaviz-sdk-tests",
            "version": "1.0.0",
            "private": True,
            "type": "module",
            "scripts": {"test": "jest"},
            "devDependencies": {
                "jest": "^29.0.0",
                "@babel/core": "^7.0.0",
                "@babel/preset-env": "^7.0.0",
                "babel-jest": "^29.0.0",
            },
            "_sdk_dir": rel_sdk,
        }
        with open(os.path.join(test_dir, "package.json"), "w") as f:
            json.dump(config, f, indent=2)
            f.write("\n")

    def emit_jest_config(self, test_dir: str) -> None:
        content = (
            "export default {\n"
            "  transform: { '^.+\\\\.js$': 'babel-jest' },\n"
            "  testEnvironment: 'node',\n"
            "  moduleNameMapper: { '^(\\\\.{1,2}/.*)\\\\.js$': '$1' },\n"
            "};\n"
        )
        with open(os.path.join(test_dir, "jest.config.js"), "w") as f:
            f.write(content)
        babel = (
            "export default {\n"
            "  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],\n"
            "};\n"
        )
        with open(os.path.join(test_dir, "babel.config.js"), "w") as f:
            f.write(babel)

    def emit_helpers(self, test_dir: str) -> None:
        lines = [
            "// Auto-generated — do not edit",
            "",
            "export class SpyOAuthClient {",
            "  constructor() { this.calls = []; }",
            "",
            "  request(path, method, accessToken, refreshToken, body) {",
            "    this.calls.push({ path, method, accessToken, refreshToken, body });",
            "    return Promise.resolve({ data: null });",
            "  }",
            "",
            "  last_call() { return this.calls[this.calls.length - 1]; }",
            "  reset() { this.calls = []; }",
            "}",
            "",
            "export function makeSpyFetch() {",
            "  const calls = [];",
            "  const spy = (url, options = {}) => {",
            "    calls.push({ url, method: (options.method || 'GET'), headers: options.headers, body: options.body });",
            "    const stubResponse = {",
            "      ok: true,",
            "      status: 200,",
            "      headers: { get: () => null },",
            "      json: () => Promise.resolve({}),",
            "    };",
            "    return Promise.resolve(stubResponse);",
            "  };",
            "  spy.calls = calls;",
            "  spy.last_call = () => calls[calls.length - 1];",
            "  spy.reset = () => { calls.length = 0; };",
            "  return spy;",
            "}",
            "",
        ]
        with open(os.path.join(test_dir, "helpers.js"), "w") as f:
            f.write("\n".join(lines))

    def emit_errors_test(self, sdk_dir: str, test_dir: str) -> None:
        rel = os.path.relpath(os.path.join(sdk_dir, "errors.js"), test_dir)
        error_classes = ["ApiError", "ValidationError", "NotFoundError", "RateLimitError", "ServerError"]
        imports = ", ".join(error_classes)
        lines = [
            "// Auto-generated — do not edit",
            f"import {{ {imports} }} from '{rel}';",
            "",
            "describe('errors module', () => {",
        ]
        for cls in error_classes:
            arg4 = "{ get: () => null }" if cls == "RateLimitError" else "{}"
            lines += [
                f"  it('{cls} exists and is a constructor', () => {{",
                f"    expect(typeof {cls}).toBe('function');",
                f"    const e = new {cls}('msg', 500, 'rid', {arg4});",
                f"    expect(e instanceof Error).toBe(true);",
                "  });",
                "",
            ]
        lines += ["});", ""]
        with open(os.path.join(test_dir, "errors.test.js"), "w") as f:
            f.write("\n".join(lines))

    def emit_controller_test(
        self, controller: str, endpoints: list[dict], sdk_dir: str, test_dir: str
    ) -> None:
        func_names = [self.snake_to_camel(ep["function_name"]) for ep in endpoints]
        imports_str = ", ".join(func_names)
        rel_sdk = os.path.relpath(os.path.join(sdk_dir, controller.lower() + ".js"), test_dir)
        rel_helpers = "./helpers.js"

        lines = [
            "// Auto-generated — do not edit",
            f"import {{ {imports_str} }} from '{rel_sdk}';",
            f"import {{ SpyOAuthClient, makeSpyFetch }} from '{rel_helpers}';",
            "",
        ]

        lines.append(f"describe('{controller}', () => {{")

        for ep in endpoints:
            func_name = self.snake_to_camel(ep["function_name"])
            params = ep.get("params", [])
            lines.extend(self._emit_existence_test(func_name))
            lines.extend(self._emit_method_test(ep, func_name, params))
            lines.extend(self._emit_path_test(ep, func_name, params))
            query_params = [p for p in params if p.get("in") == "query"]
            if query_params:
                lines.extend(self._emit_query_test(ep, func_name, params))
            request_body = ep.get("request_body")
            if request_body:
                lines.extend(self._emit_body_test(ep, func_name, params))
            lines.extend(self._emit_auth_routing_test(ep, func_name, params))

        lines += ["});", ""]
        filename = controller.lower() + ".test.js"
        with open(os.path.join(test_dir, filename), "w") as f:
            f.write("\n".join(lines))

    # ── per-assertion emitters ────────────────────────────────────────────────

    def _emit_existence_test(self, func_name: str) -> list[str]:
        return [
            f"  it('{func_name} — exists', () => {{",
            f"    expect(typeof {func_name}).toBe('function');",
            "  });",
            "",
        ]

    def _uses_oauth_client(self, ep: dict) -> bool:
        return ep.get("auth") == "required" and not ep.get("api_host")

    def _emit_method_test(self, ep: dict, func_name: str, params: list[dict]) -> list[str]:
        method = ep["method"]
        uses_client = self._uses_oauth_client(ep)
        call_args = self._build_call_args(ep, params, spy_name="spy")
        lines = [f"  it('{func_name} — HTTP method is {method}', async () => {{"]
        if uses_client:
            lines += [
                "    const spy = new SpyOAuthClient();",
                f"    await {func_name}({call_args});",
                f"    expect(spy.last_call().method).toBe('{method}');",
            ]
        else:
            lines += [
                "    const spy = makeSpyFetch();",
                "    globalThis.fetch = spy;",
                f"    await {func_name}({call_args});",
                f"    expect(spy.last_call().method).toBe('{method}');",
            ]
        lines += ["  });", ""]
        return lines

    def _emit_path_test(self, ep: dict, func_name: str, params: list[dict]) -> list[str]:
        path_params = [p for p in params if p.get("in") == "path"]
        if not path_params:
            expected_path = ep["path"]
        else:
            expected_path = self.build_expected_path(ep["path"], params)
        uses_client = self._uses_oauth_client(ep)
        call_args = self._build_call_args(ep, params, spy_name="spy", encoding=True)
        lines = [f"  it('{func_name} — path construction', async () => {{"]
        if uses_client:
            lines += [
                "    const spy = new SpyOAuthClient();",
                f"    await {func_name}({call_args});",
                f"    expect(spy.last_call().path).toContain('{expected_path}');",
            ]
        else:
            lines += [
                "    const spy = makeSpyFetch();",
                "    globalThis.fetch = spy;",
                f"    await {func_name}({call_args});",
                f"    expect(spy.last_call().url).toContain('{expected_path}');",
            ]
        lines += ["  });", ""]
        return lines

    def _emit_query_test(self, ep: dict, func_name: str, params: list[dict]) -> list[str]:
        query_params = [p for p in params if p.get("in") == "query"]
        uses_client = self._uses_oauth_client(ep)
        call_args = self._build_call_args(ep, params, spy_name="spy")
        lines = [f"  it('{func_name} — query params', async () => {{"]
        if uses_client:
            lines += [
                "    const spy = new SpyOAuthClient();",
                f"    await {func_name}({call_args});",
                "    const path = spy.last_call().path;",
            ]
            for qp in query_params:
                lines.append(f"    expect(path).toContain('{qp['name']}=');")
        else:
            lines += [
                "    const spy = makeSpyFetch();",
                "    globalThis.fetch = spy;",
                f"    await {func_name}({call_args});",
                "    const url = spy.last_call().url;",
            ]
            for qp in query_params:
                lines.append(f"    expect(url).toContain('{qp['name']}=');")
        lines += ["  });", ""]
        return lines

    def _emit_body_test(self, ep: dict, func_name: str, params: list[dict]) -> list[str]:
        request_body = ep.get("request_body")
        uses_client = self._uses_oauth_client(ep)
        content_type = ep.get("content_type") or "application/json"
        is_form = content_type == "application/x-www-form-urlencoded"
        call_args = self._build_call_args(ep, params, spy_name="spy")
        lines = [f"  it('{func_name} — request body', async () => {{"]
        if uses_client:
            lines += [
                "    const spy = new SpyOAuthClient();",
                f"    await {func_name}({call_args});",
                "    const body = spy.last_call().body;",
            ]
        elif is_form:
            lines += [
                "    const spy = makeSpyFetch();",
                "    globalThis.fetch = spy;",
                f"    await {func_name}({call_args});",
                "    const body = Object.fromEntries(new URLSearchParams(spy.last_call().body));",
            ]
        else:
            lines += [
                "    const spy = makeSpyFetch();",
                "    globalThis.fetch = spy;",
                f"    await {func_name}({call_args});",
                "    const body = JSON.parse(spy.last_call().body);",
            ]
        if isinstance(request_body, dict) and self._is_model_body(request_body):
            lines.append("    expect(body).toBeDefined();")
        elif isinstance(request_body, dict):
            for field in request_body:
                lines.append(f"    expect(body).toHaveProperty('{field}');")
        else:
            lines.append("    expect(body).toBeDefined();")
        lines += ["  });", ""]
        return lines

    def _emit_auth_routing_test(self, ep: dict, func_name: str, params: list[dict]) -> list[str]:
        uses_client = self._uses_oauth_client(ep)
        call_args = self._build_call_args(ep, params, spy_name="spy")
        lines = [f"  it('{func_name} — auth routing', async () => {{"]
        if uses_client:
            lines += [
                "    const spy = new SpyOAuthClient();",
                f"    await {func_name}({call_args});",
                "    expect(spy.calls.length).toBe(1);",
            ]
        else:
            lines += [
                "    const spy = makeSpyFetch();",
                "    globalThis.fetch = spy;",
                f"    await {func_name}({call_args});",
                "    expect(spy.calls.length).toBe(1);",
            ]
        lines += ["  });", ""]
        return lines

    # ── helpers ───────────────────────────────────────────────────────────────

    def _build_call_args(
        self, ep: dict, params: list[dict], spy_name: str = "spy", encoding: bool = False
    ) -> str:
        """Build a comma-separated argument string for calling the function under test."""
        is_auth = ep.get("auth") == "required"
        is_alt_host = bool(ep.get("api_host"))
        path_params = [p for p in params if p.get("in") == "path"]
        query_params = [p for p in params if p.get("in") == "query"]
        header_params = [p for p in params if p.get("in") == "header"]
        request_body = ep.get("request_body")

        parts: list[str] = []
        if is_alt_host:
            parts += ["'https://upload.example.com'", "'access_token'"]
        elif is_auth:
            parts += [spy_name, "'access_token'", "'refresh_token'"]
        else:
            parts.append("'https://api.example.com'")

        for p in path_params:
            val = self.test_value_for_type(p.get("type", "string"), encoding=encoding)
            parts.append(_js_literal(val))

        if is_alt_host:
            required_headers = [p for p in header_params if p.get("required")]
            for p in required_headers:
                parts.append(_js_literal(self.test_value_for_type("string")))

        if isinstance(request_body, dict) and self._is_model_body(request_body):
            parts.append("{ Model: 'test_value' }")
        elif isinstance(request_body, dict):
            field_parts = []
            for field in request_body:
                camel = self.snake_to_camel(field)
                val = self.test_value_for_type(request_body[field].get("type", "string") if isinstance(request_body[field], dict) else "string")
                field_parts.append(f"{camel}: {_js_literal(val)}")
            parts.append("{ " + ", ".join(field_parts) + " }")
        elif request_body:
            parts.append("{}")

        if is_alt_host:
            optional_headers = [p for p in header_params if not p.get("required")]
            if optional_headers:
                oh_parts = []
                for p in optional_headers:
                    param = self.header_to_param(p["name"])
                    oh_parts.append(f"{param}: {_js_literal(self.test_value_for_type('string'))}")
                parts.append("{ " + ", ".join(oh_parts) + " }")

        if query_params:
            q_parts = []
            for p in query_params:
                camel = self.snake_to_camel(p["name"])
                val = self.test_value_for_type(p.get("type", "string"))
                q_parts.append(f"{camel}: {_js_literal(val)}")
            parts.append("{ " + ", ".join(q_parts) + " }")

        return ", ".join(parts)


# ── module-level helpers ──────────────────────────────────────────────────────

def _js_literal(value: object) -> str:
    """Convert a Python value to its JS literal string."""
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, str):
        return f"'{value}'"
    if isinstance(value, list):
        items = ", ".join(_js_literal(v) for v in value)
        return f"[{items}]"
    return str(value)


def _parse_jest_counts(output: str) -> tuple[int, int, int]:
    """Parse jest output for (passed, failed, total) test counts."""
    import re
    passed = failed = 0
    m_pass = re.search(r"(\d+) passed", output)
    m_fail = re.search(r"(\d+) failed", output)
    if m_pass:
        passed = int(m_pass.group(1))
    if m_fail:
        failed = int(m_fail.group(1))
    return passed, failed, passed + failed
