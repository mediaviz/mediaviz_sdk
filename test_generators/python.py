from __future__ import annotations
import os
import re
import subprocess
import sys

from naming import header_to_param, snake_to_pascal
from .base import BaseTestGenerator, TestResult


def _pascal_to_snake(name: str) -> str:
    s = re.sub('([A-Z]+)([A-Z][a-z])', r'\1_\2', name)
    s = re.sub('([a-z0-9])([A-Z])', r'\1_\2', s)
    return s.lower()


class PythonTestGenerator(BaseTestGenerator):
    framework_name = "python"
    _sdk_dir: str | None = None  # captured in generate(), used by run() to install deps

    snake_to_pascal = staticmethod(snake_to_pascal)
    header_to_param = staticmethod(header_to_param)

    def generate(self, endpoints: list[dict], sdk_dir: str, test_dir: str) -> None:
        self._sdk_dir = sdk_dir
        os.makedirs(test_dir, exist_ok=True)
        self.emit_helpers(test_dir, sdk_dir)
        self.emit_conftest(test_dir, sdk_dir)
        self.emit_pytest_config(test_dir)
        self.emit_errors_test(test_dir)
        groups = {_pascal_to_snake(k): v for k, v in self.group_by_controller(endpoints).items()}
        for controller, eps in groups.items():
            self.emit_controller_test(controller, eps, test_dir)

    def run(self, test_dir: str) -> TestResult:
        deps = _read_dependencies(self._sdk_dir) if self._sdk_dir else []
        if deps:
            subprocess.run(
                [sys.executable, "-m", "pip", "install", "--quiet", *deps],
                check=True,
            )
        result = subprocess.run(
            [sys.executable, "-m", "pytest", "-v"],
            cwd=test_dir,
            capture_output=True,
            text=True,
        )
        output = result.stdout + result.stderr
        passed, failed, total = _parse_pytest_counts(output)
        return TestResult(
            success=result.returncode == 0,
            total=total,
            passed=passed,
            failed=failed,
            output=output,
        )

    # ── file emitters ─────────────────────────────────────────────────────────

    def emit_helpers(self, test_dir: str, sdk_dir: str) -> None:
        lines = [
            "from __future__ import annotations",
            "import sys",
            f"sys.path.insert(0, {repr(sdk_dir)})",
            "",
            "from oauth_sdk import OAuthClient",
            "",
            "",
            "class _FakeResponse:",
            "    data: dict = {}",
            "    updated_tokens = None",
            "",
            "",
            "class SpyOAuthClient(OAuthClient):",
            "    def __init__(self) -> None:",
            "        self.calls: list[dict] = []",
            "",
            "    def request(self, url: str, method: str, access_token: str, refresh_token: str, body=None, on_refresh_success=None) -> _FakeResponse:",
            "        self.calls.append({'url': url, 'method': method, 'access_token': access_token, 'refresh_token': refresh_token, 'body': body})",
            "        return _FakeResponse()",
            "",
            "    def last_call(self) -> dict | None:",
            "        return self.calls[-1] if self.calls else None",
            "",
            "    def reset(self) -> None:",
            "        self.calls.clear()",
        ]
        with open(os.path.join(test_dir, "test_helpers.py"), "w") as f:
            f.write("\n".join(lines) + "\n")

    def emit_conftest(self, test_dir: str, sdk_dir: str) -> None:
        lines = [
            "from __future__ import annotations",
            "import sys",
            f"sys.path.insert(0, {repr(sdk_dir)})",
            "",
            "import pytest",
            "from mediaviz_sdk import MediaVizClient",
            "from test_helpers import SpyOAuthClient",
            "",
            "",
            "@pytest.fixture",
            "def spy_client() -> SpyOAuthClient:",
            "    return SpyOAuthClient()",
            "",
            "",
            "@pytest.fixture",
            "def mv_client(spy_client: SpyOAuthClient) -> MediaVizClient:",
            "    mv = MediaVizClient(client_id='test', client_secret='test', base_url='https://api.test.com')",
            "    mv._tracking_client._inner = spy_client",
            "    mv._access_token = 'access_token'",
            "    mv._refresh_token = 'refresh_token'",
            "    for key in mv._hosts:",
            "        mv._hosts[key] = 'https://upload.example.com'",
            "    return mv",
        ]
        with open(os.path.join(test_dir, "conftest.py"), "w") as f:
            f.write("\n".join(lines) + "\n")

    def emit_pytest_config(self, test_dir: str) -> None:
        content = (
            "[tool.pytest.ini_options]\n"
            'testpaths = ["."]\n'
        )
        with open(os.path.join(test_dir, "pyproject.toml"), "w") as f:
            f.write(content)

    def emit_errors_test(self, test_dir: str) -> None:
        error_cases = [
            ("validation", 422, "ValidationError"),
            ("not_found", 404, "NotFoundError"),
            ("rate_limit", 429, "RateLimitError"),
            ("server_error", 500, "ServerError"),
            ("generic_api", 400, "ApiError"),
        ]
        lines = [
            "from __future__ import annotations",
            "import pytest",
            "from mediaviz_sdk.errors import handle_response, ApiError, ValidationError, NotFoundError, RateLimitError, ServerError",
            "",
        ]
        for test_id, status, cls in error_cases:
            lines += [
                f"def test_error_{test_id}():",
                f"    with pytest.raises({cls}):",
                f'        handle_response(\'{{"detail": "err"}}\', {status}, {{}})',
                "",
            ]
        with open(os.path.join(test_dir, "test_errors.py"), "w") as f:
            f.write("\n".join(lines) + "\n")

    def emit_controller_test(self, controller: str, endpoints: list[dict], test_dir: str) -> None:
        has_httpx = any(not self._uses_oauth_client(ep) for ep in endpoints)
        lines = [
            "from __future__ import annotations",
            "import pytest",
        ]
        if has_httpx:
            lines.append("import httpx")
        lines += [
            "",
            "",
        ]
        if has_httpx:
            lines += [
                "class _MockClient:",
                "    def __init__(self):",
                "        self.recorded: list[dict] = []",
                "    def __enter__(self): return self",
                "    def __exit__(self, *a): pass",
                "    def request(self, method, url, **kw):",
                "        self.recorded.append({'method': method, 'url': url})",
                "        class _R:",
                "            text = '{}'",
                "            status_code = 200",
                "            headers: dict = {}",
                "        return _R()",
                "",
                "",
            ]

        for ep in endpoints:
            lines.extend(self._emit_existence_test(ep, controller))
            if self._uses_oauth_client(ep):
                lines.extend(self._emit_method_test_auth(ep, controller))
                lines.extend(self._emit_path_test_auth(ep, controller))
                query_params = [p for p in ep.get("params", []) if p.get("in") == "query"]
                if query_params:
                    lines.extend(self._emit_query_test_auth(ep, controller))
                if ep.get("request_body"):
                    lines.extend(self._emit_body_test_auth(ep, controller))
            else:
                lines.extend(self._emit_method_test_httpx(ep, controller))
                lines.extend(self._emit_path_test_httpx(ep, controller))

        with open(os.path.join(test_dir, f"test_{controller}.py"), "w") as f:
            f.write("\n".join(lines) + "\n")

    # ── per-assertion emitters ────────────────────────────────────────────────

    def _emit_existence_test(self, ep: dict, controller: str) -> list[str]:
        func_name = ep.get("function_name", ep["id"])
        return [
            f"def test_{ep['id']}_exists(mv_client):",
            f"    assert callable(getattr(mv_client.{controller}, {repr(func_name)}, None))",
            "",
        ]

    def _emit_method_test_auth(self, ep: dict, controller: str) -> list[str]:
        func_name = ep.get("function_name", ep["id"])
        call_args = self._build_call_args(ep, ep.get("params", []))
        return [
            f"def test_{ep['id']}_http_method(mv_client, spy_client):",
            f"    spy_client.reset()",
            f"    mv_client.{controller}.{func_name}({call_args})",
            f"    assert spy_client.last_call()['method'] == {repr(ep['method'])}",
            "",
        ]

    def _emit_path_test_auth(self, ep: dict, controller: str) -> list[str]:
        func_name = ep.get("function_name", ep["id"])
        params = ep.get("params", [])
        path_params = [p for p in params if p.get("in") == "path"]
        expected_path = self.build_expected_path(ep["path"], params) if path_params else ep["path"]
        call_args = self._build_call_args(ep, params, encoding=True)
        return [
            f"def test_{ep['id']}_path(mv_client, spy_client):",
            f"    spy_client.reset()",
            f"    mv_client.{controller}.{func_name}({call_args})",
            f"    assert {repr(expected_path)} in spy_client.last_call()['url']",
            "",
        ]

    def _emit_query_test_auth(self, ep: dict, controller: str) -> list[str]:
        func_name = ep.get("function_name", ep["id"])
        params = ep.get("params", [])
        query_params = [p for p in params if p.get("in") == "query"]
        call_args = self._build_call_args(ep, params)
        lines = [
            f"def test_{ep['id']}_query_params(mv_client, spy_client):",
            f"    spy_client.reset()",
            f"    mv_client.{controller}.{func_name}({call_args})",
            f"    url = spy_client.last_call()['url']",
        ]
        for qp in query_params:
            lines.append(f"    assert {repr(qp['name'] + '=')} in url")
        lines.append("")
        return lines

    def _emit_body_test_auth(self, ep: dict, controller: str) -> list[str]:
        func_name = ep.get("function_name", ep["id"])
        request_body = ep.get("request_body")
        call_args = self._build_call_args(ep, ep.get("params", []))
        shape = self._body_shape(request_body)
        lines = [
            f"def test_{ep['id']}_request_body(mv_client, spy_client):",
            f"    spy_client.reset()",
            f"    mv_client.{controller}.{func_name}({call_args})",
            f"    body = spy_client.last_call()['body']",
        ]
        if shape == "scalar":
            lines.append("    assert body is not None")
        elif shape == "expanded":
            for key in self._expanded_top_level_keys(self._expanded_fields(request_body)):
                lines.append(f"    assert {repr(key)} in body")
        elif shape == "flat_dict":
            for field in request_body:
                if not field.startswith("_"):
                    lines.append(f"    assert {repr(field)} in body")
        else:
            lines.append("    assert body is not None")
        lines.append("")
        return lines

    def _emit_method_test_httpx(self, ep: dict, controller: str) -> list[str]:
        func_name = ep.get("function_name", ep["id"])
        call_args = self._build_call_args(ep, ep.get("params", []))
        return [
            f"def test_{ep['id']}_http_method(mv_client, monkeypatch):",
            f"    _mc = _MockClient()",
            f"    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)",
            f"    mv_client.{controller}.{func_name}({call_args})",
            f"    assert _mc.recorded[0]['method'] == {repr(ep['method'])}",
            "",
        ]

    def _emit_path_test_httpx(self, ep: dict, controller: str) -> list[str]:
        func_name = ep.get("function_name", ep["id"])
        params = ep.get("params", [])
        path_params = [p for p in params if p.get("in") == "path"]
        expected_path = self.build_expected_path(ep["path"], params) if path_params else ep["path"]
        call_args = self._build_call_args(ep, params, encoding=True)
        return [
            f"def test_{ep['id']}_path(mv_client, monkeypatch):",
            f"    _mc = _MockClient()",
            f"    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)",
            f"    mv_client.{controller}.{func_name}({call_args})",
            f"    assert {repr(expected_path)} in _mc.recorded[0]['url']",
            "",
        ]

    # ── helpers ───────────────────────────────────────────────────────────────

    def _uses_oauth_client(self, ep: dict) -> bool:
        return ep.get("auth") == "required" and not ep.get("api_host")

    def _build_call_args(self, ep: dict, params: list[dict], encoding: bool = False) -> str:
        path_params = [p for p in params if p.get("in") == "path"]
        query_params = [p for p in params if p.get("in") == "query"]
        header_params = [p for p in params if p.get("in") == "header"]
        is_alt_host = bool(ep.get("api_host"))
        request_body = ep.get("request_body")

        parts: list[str] = []

        for p in path_params:
            val = self.test_value_for_type(p.get("type", "string"), encoding=encoding)
            parts.append(_py_literal(val))

        if is_alt_host:
            for p in (h for h in header_params if h.get("required")):
                parts.append(_py_literal(self.test_value_for_type("string")))

        shape = self._body_shape(request_body)
        kwargs_only = False
        if shape == "scalar":
            parts.append(_py_literal(self.test_value_for_type(request_body.get("type", "string"))))
        elif shape == "expanded":
            ordered = self._order_expanded_fields(self._expanded_fields(request_body))
            kwargs_only = bool(ordered) and not any(f.get("required") for f in ordered)
            for f in ordered:
                t = "array" if f.get("kind") == "list" else f.get("type", "string")
                val = _py_literal(self.test_value_for_type(t))
                parts.append(f"{f['name']}={val}" if kwargs_only else val)
        elif shape == "flat_dict":
            for field, val_spec in request_body.items():
                if field.startswith("_"):
                    continue
                val_type = val_spec.get("type", "string") if isinstance(val_spec, dict) else "string"
                parts.append(_py_literal(self.test_value_for_type(val_type)))
        elif request_body is not None:
            parts.append("{}")

        if is_alt_host:
            for p in (h for h in header_params if not h.get("required")):
                val = _py_literal(self.test_value_for_type("string"))
                param = self.header_to_param(p["name"])
                parts.append(f"{param}={val}" if kwargs_only else val)

        for p in query_params:
            val = _py_literal(self.test_value_for_type(p.get("type", "string")))
            parts.append(f"{p['name']}={val}" if kwargs_only else val)

        return ", ".join(parts)


# ── module-level helpers ──────────────────────────────────────────────────────

def _py_literal(value: object) -> str:
    if isinstance(value, bool):
        return "True" if value else "False"
    if isinstance(value, (str, list, dict, float, int)):
        return repr(value)
    return str(value)


def _read_dependencies(sdk_dir: str) -> list[str]:
    """Return the generated package's declared runtime deps from its pyproject.toml.

    Single source of truth for what the test env needs — avoids hardcoding deps
    in CI. Uses stdlib tomllib (3.11+); falls back to a literal-array regex on
    older interpreters where tomllib is unavailable.
    """
    path = os.path.join(sdk_dir, "pyproject.toml")
    if not os.path.exists(path):
        return []
    try:
        import tomllib
        with open(path, "rb") as f:
            return tomllib.load(f).get("project", {}).get("dependencies", [])
    except ModuleNotFoundError:
        pass
    with open(path) as f:
        m = re.search(r"dependencies\s*=\s*\[(.*?)\]", f.read(), re.DOTALL)
    # Extract each quoted entry wholesale — never split on commas, which also
    # appear inside version specifiers (e.g. "httpx>=0.27,<1").
    return re.findall(r"""['"]([^'"]+)['"]""", m.group(1)) if m else []


def _parse_pytest_counts(output: str) -> tuple[int, int, int]:
    passed = failed = 0
    m = re.search(r"(\d+) passed", output)
    if m:
        passed = int(m.group(1))
    m_fail = re.search(r"(\d+) failed", output)
    if m_fail:
        failed += int(m_fail.group(1))
    m_err = re.search(r"(\d+) error", output)
    if m_err:
        failed += int(m_err.group(1))
    return passed, failed, passed + failed
