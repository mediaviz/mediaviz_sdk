from __future__ import annotations
import os
import re
import shutil
import textwrap
from .base import BaseGenerator
from utilities_resolver import collect_framework_imports, indent_body

def _pascal_to_snake(name: str) -> str:
    s = re.sub('([A-Z]+)([A-Z][a-z])', r'\1_\2', name)
    s = re.sub('([a-z0-9])([A-Z])', r'\1_\2', s)
    return s.lower()


_TYPE_MAP: dict[str, str] = {
    "string": "str",
    "str": "str",
    "integer": "int",
    "int": "int",
    "number": "float",
    "float": "float",
    "boolean": "bool",
    "bool": "bool",
    "list": "list",
    "array": "list",
    "any": "Any",
    "dict": "Any",
    "Dict": "Any",
    "datetime": "str",
    "emailstr": "str",
    "EmailStr": "str",
}


def _python_type(t) -> str:
    return _TYPE_MAP.get(str(t).lower() if t else "", "Any")


def _python_nullable(t: str) -> str:
    return f"{t} | None"


def _is_list_type(t) -> bool:
    if not t:
        return False
    s = str(t).strip().lower()
    return s in ("list", "array") or s.startswith("list[")


class PythonGenerator(BaseGenerator):
    framework_name = "python"

    # Use "oauth_sdk" so the copied package is importable as `from oauth_sdk import ...`
    def copy_auth_wrapper(self, oauth_sdk_root: str, output_dir: str) -> None:
        self.copy_module("oauth_sdk", oauth_sdk_root, output_dir)

    # ── BaseGenerator contract ────────────────────────────────────────────────

    def generate(self, endpoints: list[dict], output_dir: str, composites: list[dict] | None = None, utilities: list[dict] | None = None) -> None:
        pkg_dir = os.path.join(output_dir, "mediaviz_sdk")
        os.makedirs(pkg_dir, exist_ok=True)

        self.emit_errors_file(pkg_dir)

        raw_groups = self.group_by_controller(endpoints)
        raw_comp_groups = self.group_composites_by_controller(composites)
        groups = {_pascal_to_snake(k): v for k, v in raw_groups.items()}
        comp_groups = {_pascal_to_snake(k): v for k, v in raw_comp_groups.items()}
        all_groups: dict[str, list[dict]] = {}
        all_comp_groups: dict[str, list[dict]] = {}

        for controller, eps in groups.items():
            comps = comp_groups.pop(controller, [])
            self.emit_controller_file(controller, eps, os.path.join(pkg_dir, f"{controller}.py"), composites=comps)
            all_groups[controller] = eps
            if comps:
                all_comp_groups[controller] = comps

        for controller, comps in comp_groups.items():
            self.emit_controller_file(controller, [], os.path.join(pkg_dir, f"{controller}.py"), composites=comps)
            all_comp_groups[controller] = comps

        alt_hosts = self.collect_alt_hosts(endpoints, composites)
        self.emit_client_class(all_groups, all_comp_groups, alt_hosts, output_dir, utilities=utilities)
        self.emit_pyproject_toml(output_dir)
        self.reexport_all_modules(output_dir)  # Python: emit_reexports returns None; no-op here
        self.emit_init_file(pkg_dir)

    def copy_module(self, module_name: str, module_root: str, output_dir: str) -> None:
        # The Python OAuth SDK keeps the package at module_root/python/module_name/
        # Copy that inner package dir directly so it's a flat sibling.
        inner_src = os.path.join(module_root, "python", module_name)
        dst = os.path.join(output_dir, module_name)
        if os.path.isdir(inner_src):
            shutil.copytree(inner_src, dst, dirs_exist_ok=True)
            self._copied_modules.append({"name": module_name, "path": dst})
        else:
            dst = self._copy_module_files(module_root, "python", module_name, output_dir)
        # Strip __pycache__ recursively
        for root_dir, dirs, _ in os.walk(dst, topdown=False):
            for d in list(dirs):
                if d == "__pycache__":
                    shutil.rmtree(os.path.join(root_dir, d))
        for fname in ("pyproject.toml", "setup.py", "setup.cfg"):
            p = os.path.join(dst, fname)
            if os.path.isfile(p):
                os.remove(p)
        tests_dir = os.path.join(dst, "tests")
        if os.path.isdir(tests_dir):
            shutil.rmtree(tests_dir)

    def discover_module_exports(self, module_name: str, module_path: str) -> list[dict]:
        init_path = os.path.join(module_path, "__init__.py")
        if not os.path.isfile(init_path):
            return []
        content = open(init_path).read()

        # Prefer __all__
        m = re.search(r'__all__\s*=\s*\[([^\]]+)\]', content, re.DOTALL)
        if m:
            raw = m.group(1)
            names = [n.strip().strip("'\"") for n in raw.split(",")]
            return [{"name": n, "source": module_name, "kind": "class"} for n in names if n]

        # Fall back to top-level `from ._X import Y, Z`
        exports = []
        for fm in re.finditer(r'^from\s+\.(\w+)\s+import\s+(.+)', content, re.MULTILINE):
            submod = fm.group(1)
            imports_str = fm.group(2).strip()
            if imports_str == "*":
                continue
            for name in imports_str.split(","):
                name = name.strip()
                if name:
                    exports.append({"name": name, "source": f"{module_name}.{submod}", "kind": "class"})
        return exports

    def emit_reexports(self, module_name: str, exports: list, output_dir: str) -> str | None:
        # Python re-exports are written into mediaviz_sdk/__init__.py directly
        return None

    def _optional_check_expr(self, expr: str) -> str:
        return f"{expr} is not None"

    def emit_client_class(self, groups: dict, comp_groups: dict, alt_hosts: set[str], output_dir: str, utilities: list[dict] | None = None) -> None:
        pkg_dir = os.path.join(output_dir, "mediaviz_sdk")
        controllers = []
        for controller in sorted(set(list(groups.keys()) + list(comp_groups.keys()))):
            class_name = self.snake_to_pascal(controller)
            controllers.append((controller, class_name))

        host_keys = sorted(self.snake_to_camel(h) for h in alt_hosts)
        host_env_vars = {self.snake_to_camel(h): f"MEDIAVIZ_{h.upper()}_URL" for h in alt_hosts}

        lines: list[str] = [
            "from __future__ import annotations",
            "import os",
            "from typing import Any",
            "",
            "from oauth_sdk import OAuthClient, OAuthClientConfig",
        ]
        for stmt in collect_framework_imports(utilities, "python"):
            lines.append(stmt)
        for ctrl, cls in controllers:
            lines.append(f"from .{ctrl} import {cls}")
        lines += ["", ""]

        has_utils = bool(utilities) and any(m.get("utilities") for m in utilities)

        # _Context
        lines += [
            "class _Context:",
            "    def __init__(self, mv: \"MediaVizClient\") -> None:",
            "        self._mv = mv",
            "        self.client = mv._tracking_client",
            "",
            "    @property",
            "    def access_token(self) -> str | None: return self._mv._access_token",
            "    @property",
            "    def refresh_token(self) -> str | None: return self._mv._refresh_token",
            "    @property",
            "    def base_url(self) -> str: return self._mv._config['base_url']",
            "",
        ]
        if has_utils:
            lines += [
                "    @property",
                "    def utils(self) -> \"_Utils\": return self._mv.utils",
                "",
            ]
        lines += [
            "    def require_host(self, key: str) -> str:",
            "        url = self._mv._hosts.get(key)",
            "        if url is None:",
            "            raise RuntimeError(f\"Host '{key}' not configured.\")",
            "        return url",
            "",
            "    def require_tokens(self) -> None:",
            "        if self._mv._access_token is None:",
            "            raise RuntimeError(",
            "                'Not authenticated. Call authenticate(), handle_callback(), or set_tokens() first.'",
            "            )",
            "",
            "",
        ]

        # _TokenTrackingClient
        # Persists rotated tokens via the OAuth client's on_refresh_success callback
        # so they are saved the moment refresh resolves — before the retry. If the
        # retry raises (server hiccup, JSON parse error), the new pair is preserved
        # and the next call uses it. Without this, single-use refresh-token rotation
        # (RFC 6749 §6) would lock the caller out on any retry failure.
        lines += [
            "class _TokenTrackingClient:",
            "    def __init__(self, mv: \"MediaVizClient\", inner: Any) -> None:",
            "        self._mv = mv",
            "        self._inner = inner",
            "",
            "    def request(self, url: str, method: str, access_token: str, refresh_token: str, body: Any = None) -> Any:",
            "        def _on_refresh_success(new_tokens: Any) -> None:",
            "            self._mv.set_tokens(new_tokens.access_token, new_tokens.refresh_token)",
            "            if self._mv._on_token_refresh:",
            "                self._mv._on_token_refresh(new_tokens)",
            "        return self._inner.request(",
            "            url, method, access_token, refresh_token, body,",
            "            on_refresh_success=_on_refresh_success,",
            "        )",
            "",
            "    def __getattr__(self, name: str) -> Any:",
            "        return getattr(self._inner, name)",
            "",
            "",
        ]

        # _Utils class (from utilities/*.yaml)
        utils_emitted = self._emit_utils_class_py(lines, utilities)

        # MediaVizClient
        lines += [
            "class MediaVizClient:",
            "    def __init__(",
            "        self,",
            "        *,",
            "        client_id: str | None = None,",
            "        client_secret: str | None = None,",
            "        base_url: str | None = None,",
            "        redirect_uri: str | None = None,",
            "        hosts: dict[str, str] | None = None,",
            "        access_token: str | None = None,",
            "        refresh_token: str | None = None,",
            "        on_token_refresh=None,",
            "    ) -> None:",
            "        self._config = {",
            "            'client_id': client_id or os.environ.get('MEDIAVIZ_CLIENT_ID'),",
            "            'client_secret': client_secret or os.environ.get('MEDIAVIZ_CLIENT_SECRET'),",
            "            'base_url': base_url or os.environ.get('MEDIAVIZ_BASE_URL') or 'https://api.mediaviz.ai',",
            "            'redirect_uri': redirect_uri or os.environ.get('MEDIAVIZ_REDIRECT_URI'),",
            "        }",
        ]

        if host_keys:
            lines.append("        _h = hosts or {}")
            lines.append("        self._hosts: dict[str, str | None] = {")
            for hk in host_keys:
                env_var = host_env_vars.get(hk, f"MEDIAVIZ_{hk.upper()}_URL")
                lines.append(f"            '{hk}': _h.get('{hk}') or os.environ.get('{env_var}'),")
            lines.append("        }")
            lines.append("        self._hosts.update(_h)")
        else:
            lines.append("        self._hosts: dict[str, str | None] = dict(hosts or {})")

        lines += [
            "        self._access_token: str | None = access_token",
            "        self._refresh_token: str | None = refresh_token",
            "        self._on_token_refresh = on_token_refresh",
            "",
            "        _inner = OAuthClient(OAuthClientConfig(",
            "            base_url=self._config['base_url'],",
            "            client_id=self._config['client_id'] or '',",
            "            client_secret=self._config['client_secret'] or '',",
            "            redirect_uri=self._config['redirect_uri'] or '',",
            "        ))",
            "        self._tracking_client = _TokenTrackingClient(self, _inner)",
            "",
            "        _ctx = _Context(self)",
        ]
        for ctrl, cls in controllers:
            lines.append(f"        self.{ctrl} = {cls}(_ctx)")
        if utils_emitted:
            lines.append("        self.utils = _Utils(self)")

        lines += [
            "",
            "    def authenticate(self) -> Any:",
            "        tokens = self._tracking_client._inner.get_client_credentials_token()",
            "        self._access_token = tokens.access_token",
            "        self._refresh_token = getattr(tokens, 'refresh_token', None)",
            "        return tokens",
            "",
            "    def get_authorization_url(self, state: str | None = None) -> Any:",
            "        return self._tracking_client._inner.generate_authorization_url(state)",
            "",
            "    def handle_callback(self, code: str, code_verifier: str) -> Any:",
            "        tokens = self._tracking_client._inner.exchange_code(code, code_verifier)",
            "        self._access_token = tokens.access_token",
            "        self._refresh_token = tokens.refresh_token",
            "        return tokens",
            "",
            "    def set_tokens(self, access_token: str, refresh_token: str) -> None:",
            "        self._access_token = access_token",
            "        self._refresh_token = refresh_token",
            "",
        ]

        with open(os.path.join(pkg_dir, "client.py"), "w") as f:
            f.write("\n".join(lines))

    def _emit_utils_class_py(self, lines: list[str], utilities: list[dict] | None) -> bool:
        """Append a `_Utils` class to *lines*. Returns True if utilities were present."""
        if not utilities or not any(m.get("utilities") for m in utilities):
            return False
        lines += [
            "class _Utils:",
            "    def __init__(self, mv: \"MediaVizClient\") -> None:",
            "        self._mv = mv",
            "",
        ]
        for module in utilities:
            for util in module["utilities"]:
                fn_name = util["function_name"]["python"]
                sig_parts = ["self"]
                call_parts = []
                for p in util["params"]:
                    t = _python_type(p.get("type"))
                    if p.get("required", True):
                        sig_parts.append(f"{p['name']}: {t}")
                    else:
                        sig_parts.append(f"{p['name']}: {_python_nullable(t)} = None")
                    call_parts.append(p["name"])
                sig = ", ".join(sig_parts)
                lines.append(f"    def {fn_name}({sig}) -> Any:")
                if util.get("requires_tokens"):
                    lines.append("        if self._mv._access_token is None:")
                    lines.append("            raise RuntimeError('Not authenticated. Call authenticate(), handle_callback(), or set_tokens() first.')")
                if "snippet_body" in util:
                    lines.extend(indent_body(util["snippet_body"]["python"], "        "))
                else:
                    inner_expr = self._py_inner_expr(module["source_module"])
                    target = util["target"]["python"]
                    call = ", ".join(call_parts)
                    lines.append(f"        return {inner_expr}.{target}({call})")
                lines.append("")
        lines += ["", ""]
        return True

    @staticmethod
    def _py_inner_expr(source_module: str) -> str:
        if source_module == "oauth":
            return "self._mv._tracking_client._inner"
        raise ValueError(f"Unsupported utilities source_module: {source_module!r}")

    # ── errors ────────────────────────────────────────────────────────────────

    def emit_errors_file(self, pkg_dir: str) -> None:
        content = textwrap.dedent("""\
            from __future__ import annotations
            import json
            from typing import Any


            class ApiError(Exception):
                def __init__(self, message: str, status: int, request_id: str | None, body: Any) -> None:
                    super().__init__(message)
                    self.status = status
                    self.request_id = request_id
                    self.body = body


            class ValidationError(ApiError):
                field_errors: list[dict]

                def __init__(self, body: Any, status: int, request_id: str | None) -> None:
                    detail = body.get("detail", []) if isinstance(body, dict) else []
                    if isinstance(detail, list) and detail:
                        message = "; ".join(
                            ".".join(str(loc) for loc in d.get("loc", [])) + ": " + d.get("msg", "")
                            for d in detail
                        )
                        self.field_errors = [
                            {"loc": d.get("loc", []), "msg": d.get("msg", ""), "type": d.get("type", "")}
                            for d in detail
                        ]
                    else:
                        message = detail if isinstance(detail, str) else "Validation failed"
                        self.field_errors = []
                    super().__init__(message, status, request_id, body)


            class NotFoundError(ApiError):
                def __init__(self, body: Any, status: int, request_id: str | None) -> None:
                    detail = body.get("detail", "Resource not found") if isinstance(body, dict) else "Resource not found"
                    super().__init__(detail, status, request_id, body)


            class RateLimitError(ApiError):
                retry_after: int | None

                def __init__(self, body: Any, status: int, request_id: str | None, retry_after: int | None) -> None:
                    detail = body.get("detail", "Rate limited") if isinstance(body, dict) else "Rate limited"
                    self.retry_after = retry_after
                    super().__init__(detail, status, request_id, body)


            class ServerError(ApiError):
                def __init__(self, body: Any, status: int, request_id: str | None) -> None:
                    detail = body.get("detail", "Internal server error") if isinstance(body, dict) else "Internal server error"
                    super().__init__(detail, status, request_id, body)


            def handle_response(raw: str, status: int, headers: dict[str, str]) -> Any:
                request_id = headers.get("x-request-id")
                body: Any = json.loads(raw) if raw else {}
                if 200 <= status < 300:
                    return body
                if status == 422:
                    raise ValidationError(body, status, request_id)
                if status == 404:
                    raise NotFoundError(body, status, request_id)
                if status == 429:
                    retry_after = int(headers["retry-after"]) if "retry-after" in headers else None
                    raise RateLimitError(body, status, request_id, retry_after)
                if status >= 500:
                    raise ServerError(body, status, request_id)
                detail = body.get("detail", "Unknown error") if isinstance(body, dict) else "Unknown error"
                raise ApiError(detail, status, request_id, body)
        """)
        with open(os.path.join(pkg_dir, "errors.py"), "w") as f:
            f.write(content)

    # ── controller emission ───────────────────────────────────────────────────

    def emit_controller_file(
        self,
        controller: str,
        endpoints: list[dict],
        filepath: str,
        composites: list[dict] | None = None,
    ) -> None:
        class_name = self.snake_to_pascal(controller)

        cache_props = [
            step["step_id"]
            for comp in (composites or [])
            for step in comp.get("steps", [])
            if step.get("cache", {}).get("enabled")
        ]

        lines: list[str] = [
            "from __future__ import annotations",
            "from typing import Any",
            "from urllib.parse import quote, urlencode",
            "import httpx",
            "",
            "from .errors import handle_response",
            "",
            "",
            f"class {class_name}:",
            "    def __init__(self, ctx) -> None:",
            "        self._ctx = ctx",
        ]
        for prop in cache_props:
            lines.append(f"        self._{prop}_cache: dict[str, Any] = {{}}")

        for ep in endpoints:
            lines.append("")
            lines.extend(self._emit_method(ep))

        for comp in (composites or []):
            lines.append("")
            lines.extend(self._emit_composite_method(comp))

        lines.append("")
        with open(filepath, "w") as f:
            f.write("\n".join(lines))

    def emit_init_file(self, pkg_dir: str) -> None:
        oauth_exports: list[dict] = []
        for mod in self._copied_modules:
            if mod["name"] == "oauth_sdk":
                oauth_exports = self.discover_module_exports(mod["name"], mod["path"])
                break

        lines: list[str] = [
            "from __future__ import annotations",
            "",
            "from .client import MediaVizClient",
            "from .errors import ApiError, ValidationError, NotFoundError, RateLimitError, ServerError",
        ]
        if oauth_exports:
            names = ", ".join(e["name"] for e in oauth_exports)
            lines.append(f"from oauth_sdk import {names}")
        lines.append("")
        lines.append("__all__ = [")
        lines.append("    'MediaVizClient',")
        lines.append("    'ApiError', 'ValidationError', 'NotFoundError', 'RateLimitError', 'ServerError',")
        for e in oauth_exports:
            lines.append(f"    '{e['name']}',")
        lines.append("]")
        lines.append("")
        with open(os.path.join(pkg_dir, "__init__.py"), "w") as f:
            f.write("\n".join(lines))

    def emit_pyproject_toml(self, output_dir: str) -> None:
        m = re.search(r'v(\d+\.\d+\.\d+)', output_dir)
        version = m.group(1) if m else "0.1.0"
        content = (
            f'[project]\n'
            f'name = "mediaviz-sdk"\n'
            f'version = "{version}"\n'
            f'requires-python = ">=3.12"\n'
            f'dependencies = ["httpx>=0.27"]\n'
            f'\n'
            f'[build-system]\n'
            f'requires = ["setuptools>=68"]\n'
            f'build-backend = "setuptools.build_meta"\n'
            f'\n'
            f'[tool.setuptools]\n'
            f'packages = ["mediaviz_sdk", "oauth_sdk"]\n'
        )
        with open(os.path.join(output_dir, "pyproject.toml"), "w") as f:
            f.write(content)

    # ── method emission ───────────────────────────────────────────────────────

    def _emit_method(self, ep: dict) -> list[str]:
        func_name = ep["function_name"]
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        query_params = [p for p in ep["params"] if p["in"] == "query"]
        header_params = [p for p in ep["params"] if p["in"] == "header"]
        if ep.get("api_host"):
            return self._emit_alt_host_method(func_name, ep, path_params, query_params, header_params)
        if ep.get("auth") == "required":
            return self._emit_auth_method(func_name, ep, path_params, query_params)
        return self._emit_unauth_method(func_name, ep, path_params, query_params)

    def _emit_auth_method(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict]) -> list[str]:
        request_body = ep.get("request_body")
        sig_parts = [f"{p['name']}: {_python_type(p.get('type'))}" for p in path_params]
        sig_parts.extend(self._python_body_sig_tokens(request_body))
        sig_parts.extend(
            f"{p['name']}: {_python_nullable(_python_type(p.get('type')))} = None"
            for p in query_params
        )
        lines = [self._method_def("    ", func_name, sig_parts, "dict[str, Any]")]
        lines.append("        self._ctx.require_tokens()")
        lines.extend(self._build_path(ep["path"], path_params, query_params, "auth"))
        preamble, body_expr = self._python_body_build(request_body, "application/json", "        ")
        lines.extend(preamble)
        if body_expr is None:
            lines.append(f"        return self._ctx.client.request(path, '{ep['method']}', self._ctx.access_token, self._ctx.refresh_token).data")
        else:
            lines.append(f"        return self._ctx.client.request(path, '{ep['method']}', self._ctx.access_token, self._ctx.refresh_token, {body_expr}).data")
        return lines

    def _emit_unauth_method(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict]) -> list[str]:
        method = ep["method"]
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"
        sig_parts = [f"{p['name']}: {_python_type(p.get('type'))}" for p in path_params]
        sig_parts.extend(self._python_body_sig_tokens(request_body))
        sig_parts.extend(
            f"{p['name']}: {_python_nullable(_python_type(p.get('type')))} = None"
            for p in query_params
        )
        lines = [self._method_def("    ", func_name, sig_parts, "dict[str, Any]")]
        lines.extend(self._build_path(ep["path"], path_params, query_params, "unauth"))
        preamble, body_expr = self._python_body_build(request_body, content_type, "        ")
        lines.extend(preamble)
        lines.append("        with httpx.Client() as _client:")
        if body_expr is not None:
            kwarg = "data" if content_type == "application/x-www-form-urlencoded" else "json"
            lines.append(f"            _resp = _client.request('{method}', self._ctx.base_url + path, {kwarg}={body_expr})")
        else:
            lines.append(f"            _resp = _client.request('{method}', self._ctx.base_url + path)")
        lines.append("        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))")
        return lines

    def _emit_alt_host_method(
        self,
        func_name: str,
        ep: dict,
        path_params: list[dict],
        query_params: list[dict],
        header_params: list[dict],
    ) -> list[str]:
        method = ep["method"]
        host_key = self.snake_to_camel(ep["api_host"])
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"
        required_hdrs = [p for p in header_params if p.get("required")]
        optional_hdrs = [p for p in header_params if not p.get("required")]

        sig_parts = [f"{p['name']}: {_python_type(p.get('type'))}" for p in path_params]
        sig_parts.extend(f"{self.header_to_param(p['name'])}: str" for p in required_hdrs)
        sig_parts.extend(self._python_body_sig_tokens(request_body))
        sig_parts.extend(f"{self.header_to_param(p['name'])}: str | None = None" for p in optional_hdrs)
        sig_parts.extend(
            f"{p['name']}: {_python_nullable(_python_type(p.get('type')))} = None"
            for p in query_params
        )

        lines = [self._method_def("    ", func_name, sig_parts, "dict[str, Any]")]
        lines.append("        self._ctx.require_tokens()")
        lines.append(f"        _base_url = self._ctx.require_host('{host_key}')")
        lines.extend(self._build_path(ep["path"], path_params, query_params, "alt_host"))

        lines.append("        _headers = {")
        lines.append(f"            'Content-Type': '{content_type}',")
        lines.append("            'Authorization': f'Bearer {self._ctx.access_token}',")
        for p in required_hdrs:
            param = self.header_to_param(p["name"])
            lines.append(f"            '{p['name']}': {param},")
        lines.append("        }")
        for p in optional_hdrs:
            param = self.header_to_param(p["name"])
            lines.append(f"        if {param} is not None:")
            lines.append(f"            _headers['{p['name']}'] = {param}")

        preamble, body_expr = self._python_body_build(request_body, content_type, "        ")
        lines.extend(preamble)
        lines.append("        with httpx.Client() as _client:")
        if body_expr is not None:
            kwarg = "data" if content_type == "application/x-www-form-urlencoded" else "json"
            lines.append(f"            _resp = _client.request('{method}', _base_url + path, {kwarg}={body_expr}, headers=_headers)")
        else:
            lines.append(f"            _resp = _client.request('{method}', _base_url + path, headers=_headers)")
        lines.append("        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))")
        return lines

    # ── composite emission ────────────────────────────────────────────────────

    def _emit_composite_method(self, comp: dict) -> list[str]:
        func_name = comp["function_name"]
        params = comp.get("params", [])
        steps = comp.get("steps", [])

        sig_parts = []
        for p in params:
            t = "list" if p.get("type") in ("list", "array") else _python_type(p.get("type"))
            sig_parts.append(f"{p['name']}: {t}")

        lines = [self._method_def("    ", func_name, sig_parts, "dict[str, Any]")]
        lines.append("        self._ctx.require_tokens()")

        for step in steps:
            lines.append("")
            step_id = step["step_id"]
            execution = step.get("execution", "once")
            cache = step.get("cache", {})
            input_map = step.get("input_map", {})
            output_as = step.get("output_as")
            on_error = step.get("on_error", "abort")

            if "utility" in step:
                util = step["utility"]
                if execution == "once":
                    lines.extend(self._emit_python_once_utility_step(step_id, util, input_map, output_as, cache, comp))
                elif execution == "for_each":
                    lines.extend(self._emit_python_foreach_utility_step(
                        step_id, util, input_map, output_as, on_error,
                        step["for_each_over"], step["for_each_as"], comp,
                    ))
                continue

            ep = step["endpoint"]
            if execution == "once":
                lines.extend(self._emit_python_once_step(step_id, ep, input_map, output_as, cache, comp))
            elif execution == "for_each":
                lines.extend(self._emit_python_foreach_step(
                    step_id, ep, input_map, output_as, on_error,
                    step["for_each_over"], step["for_each_as"], comp,
                ))

        returns = comp.get("returns")
        if returns:
            lines.append("")
            ret_var = self._resolve_python_expr(returns, comp)
            last_step = steps[-1] if steps else None
            if last_step and last_step.get("on_error") == "collect":
                err_var = (last_step.get("output_as") or last_step["step_id"]) + "_errors"
                lines.append(f"        return {{'results': {ret_var}, 'errors': {err_var}}}")
            else:
                lines.append(f"        return {ret_var}")

        return lines

    def _emit_python_once_utility_step(
        self,
        step_id: str,
        util: dict,
        input_map: dict,
        output_as: str | None,
        cache: dict,
        comp: dict,
    ) -> list[str]:
        lines: list[str] = []
        var = output_as or step_id
        cache_enabled = cache.get("enabled", False)
        if cache_enabled:
            cache_key_expr = self._resolve_python_cache_key(cache["key"], comp)
            lines.append(f"        _cache_key = {cache_key_expr}")
            lines.append(f"        if _cache_key in self._{step_id}_cache:")
            lines.append(f"            {var} = self._{step_id}_cache[_cache_key]")
            lines.append(f"        else:")
            indent = "            "
        else:
            indent = "        "
        lines.append(f"{indent}{var} = {self._python_utility_call(util, input_map, comp, loop_var=None)}")
        if cache_enabled:
            lines.append(f"            self._{step_id}_cache[_cache_key] = {var}")
        return lines

    def _emit_python_foreach_utility_step(
        self,
        step_id: str,
        util: dict,
        input_map: dict,
        output_as: str | None,
        on_error: str,
        for_each_over: str,
        for_each_as: str,
        comp: dict,
    ) -> list[str]:
        lines: list[str] = []
        var = output_as or step_id
        arr_expr = self._resolve_python_expr(for_each_over, comp)
        item = for_each_as
        lines.append(f"        {var}: list = []")
        if on_error == "collect":
            lines.append(f"        {var}_errors: list = []")
        lines.append(f"        for _index, {item} in enumerate({arr_expr}):")
        if on_error in ("collect", "continue"):
            lines.append("            try:")
            inner = "                "
        else:
            inner = "            "
        call = self._python_utility_call(util, input_map, comp, loop_var=item)
        lines.append(f"{inner}{var}.append({call})")
        if on_error == "collect":
            lines.append("            except Exception as _err:")
            lines.append(f"                {var}_errors.append({{'index': _index, 'error': str(_err)}})")
        elif on_error == "continue":
            lines.append("            except Exception:")
            lines.append("                pass")
        return lines

    def _python_utility_call(self, util: dict, input_map: dict, comp: dict, loop_var: str | None) -> str:
        fn_name = util["function_name"]["python"]
        args = []
        for p in util["params"]:
            mapped = input_map.get(p["name"])
            if mapped is None:
                args.append("None")
                continue
            if loop_var:
                args.append(self._resolve_python_expr_loop(mapped, comp, loop_var))
            else:
                args.append(self._resolve_python_expr(mapped, comp))
        return f"self._ctx.utils.{fn_name}({', '.join(args)})"

    def _emit_python_once_step(
        self,
        step_id: str,
        ep: dict,
        input_map: dict,
        output_as: str | None,
        cache: dict,
        comp: dict,
    ) -> list[str]:
        lines: list[str] = []
        var = output_as or step_id
        cache_enabled = cache.get("enabled", False)

        if cache_enabled:
            cache_key_expr = self._resolve_python_cache_key(cache["key"], comp)
            lines.append(f"        _cache_key = {cache_key_expr}")
            lines.append(f"        if _cache_key in self._{step_id}_cache:")
            lines.append(f"            {var} = self._{step_id}_cache[_cache_key]")
            lines.append(f"        else:")
            indent = "            "
        else:
            indent = "        "

        if ep.get("auth") == "required" and not ep.get("api_host"):
            lines.extend(self._emit_python_call_auth(ep, input_map, var, comp, indent))
        else:
            lines.extend(self._emit_python_inline_httpx(ep, input_map, var, comp, indent))

        if cache_enabled:
            lines.append(f"            self._{step_id}_cache[_cache_key] = {var}")

        return lines

    def _emit_python_foreach_step(
        self,
        step_id: str,
        ep: dict,
        input_map: dict,
        output_as: str | None,
        on_error: str,
        for_each_over: str,
        for_each_as: str,
        comp: dict,
    ) -> list[str]:
        lines: list[str] = []
        var = output_as or step_id
        arr_expr = self._resolve_python_expr(for_each_over, comp)
        item = for_each_as

        lines.append(f"        {var}: list = []")
        if on_error == "collect":
            lines.append(f"        {var}_errors: list = []")
        lines.append(f"        for _index, {item} in enumerate({arr_expr}):")

        if on_error in ("collect", "continue"):
            lines.append("            try:")
            inner = "                "
        else:
            inner = "            "

        if ep.get("api_host"):
            lines.extend(self._emit_python_inline_httpx(ep, input_map, "_result", comp, inner, loop_var=item))
            lines.append(f"{inner}{var}.append(_result)")
        elif ep.get("auth") == "required":
            lines.extend(self._emit_python_call_auth_loop(ep, input_map, var, comp, inner, item))
        else:
            lines.extend(self._emit_python_inline_httpx(ep, input_map, "_result", comp, inner, loop_var=item))
            lines.append(f"{inner}{var}.append(_result)")

        if on_error == "collect":
            lines.append("            except Exception as _err:")
            lines.append(f"                {var}_errors.append({{'index': _index, 'error': str(_err)}})")
        elif on_error == "continue":
            lines.append("            except Exception:")
            lines.append("                pass")

        return lines

    def _emit_python_call_auth(self, ep: dict, input_map: dict, var: str, comp: dict, indent: str) -> list[str]:
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        py_path = self._build_composite_path(ep["path"], path_params, input_map, comp, None)
        return [
            f"{indent}_path = {py_path}",
            f"{indent}{var} = self._ctx.client.request(_path, '{ep['method']}', self._ctx.access_token, self._ctx.refresh_token).data",
        ]

    def _emit_python_call_auth_loop(self, ep: dict, input_map: dict, results_var: str, comp: dict, indent: str, loop_var: str) -> list[str]:
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        py_path = self._build_composite_path(ep["path"], path_params, input_map, comp, loop_var)
        return [
            f"{indent}_path = {py_path}",
            f"{indent}{results_var}.append(self._ctx.client.request(_path, '{ep['method']}', self._ctx.access_token, self._ctx.refresh_token).data)",
        ]

    def _emit_python_inline_httpx(
        self,
        ep: dict,
        input_map: dict,
        var: str,
        comp: dict,
        indent: str,
        loop_var: str | None = None,
    ) -> list[str]:
        lines: list[str] = []
        method = ep["method"]
        api_host = ep.get("api_host")
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        header_params = [p for p in ep["params"] if p["in"] == "header"]
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"

        if api_host:
            host_key = self.snake_to_camel(api_host)
            lines.append(f"{indent}_base_url = self._ctx.require_host('{host_key}')")
        else:
            lines.append(f"{indent}_base_url = self._ctx.base_url")

        py_path = self._build_composite_path(ep["path"], path_params, input_map, comp, loop_var)

        lines.append(f"{indent}_headers = {{")
        lines.append(f"{indent}    'Content-Type': '{content_type}',")
        lines.append(f"{indent}    'Authorization': f'Bearer {{self._ctx.access_token}}',")
        for p in header_params:
            if p.get("required"):
                mapped = input_map.get(p["name"])
                if mapped:
                    val = self._resolve_python_expr_loop(mapped, comp, loop_var) if loop_var else self._resolve_python_expr(mapped, comp)
                    lines.append(f"{indent}    '{p['name']}': {val},")
        lines.append(f"{indent}}}")
        for p in header_params:
            if not p.get("required"):
                mapped = input_map.get(p["name"])
                if mapped:
                    val = self._resolve_python_expr_loop(mapped, comp, loop_var) if loop_var else self._resolve_python_expr(mapped, comp)
                    lines.append(f"{indent}if {self._optional_check_expr(val)}:")
                    lines.append(f"{indent}    _headers['{p['name']}'] = {val}")

        body_kwarg = ""
        if self._body_shape(request_body) == "flat_dict":
            fields = [k for k in request_body if not k.startswith("_")]
            lines.append(f"{indent}_body = {{")
            for k in fields:
                mapped = input_map.get(k)
                if mapped:
                    val = self._resolve_python_expr_loop(mapped, comp, loop_var) if loop_var else self._resolve_python_expr(mapped, comp)
                    lines.append(f"{indent}    '{k}': {val},")
            lines.append(f"{indent}}}")
            kwarg = "data" if content_type == "application/x-www-form-urlencoded" else "json"
            body_kwarg = f", {kwarg}=_body"

        lines.append(f"{indent}with httpx.Client() as _c:")
        lines.append(f"{indent}    _resp = _c.request('{method}', _base_url + {py_path}, headers=_headers{body_kwarg})")
        lines.append(f"{indent}{var} = handle_response(_resp.text, _resp.status_code, dict(_resp.headers))")
        return lines

    # ── expression resolvers ──────────────────────────────────────────────────

    def _resolve_python_expr(self, expr: str, comp: dict) -> str:
        if expr.startswith("params."):
            param_name = expr.split(".", 1)[1]
            parts = param_name.split(".", 1)
            if len(parts) == 2:
                return f"{parts[0]}['{parts[1]}']"
            return parts[0]
        if expr.startswith("steps."):
            parts = expr.split(".", 2)
            if len(parts) == 2:
                return parts[1]
            return f"{parts[1]}['{parts[2]}']"
        return repr(expr)

    def _resolve_python_cache_key(self, expr: str, comp: dict) -> str:
        spans = re.split(r"\{([^}]+)\}", expr)
        if len(spans) == 1:
            raise ValueError(f"cache key must contain {{...}} placeholder: {expr!r}")
        out = []
        for i, span in enumerate(spans):
            if i % 2 == 0:
                out.append(span.replace("{", "{{").replace("}", "}}"))
            else:
                out.append("{" + self._resolve_python_expr(span, comp) + "}")
        return 'f"' + "".join(out) + '"'

    def _resolve_python_expr_loop(self, expr: str, comp: dict, loop_var: str | None) -> str:
        if loop_var and expr == f"{loop_var}._index":
            return "_index"
        if loop_var and expr.startswith(f"{loop_var}."):
            prop = expr.split(".", 1)[1]
            return f"{loop_var}['{prop}']"
        return self._resolve_python_expr(expr, comp)

    # ── path helpers ──────────────────────────────────────────────────────────

    def _build_path(self, path: str, path_params: list[dict], query_params: list[dict], mode: str) -> list[str]:
        py_path = self._py_path_expr(path, [p["name"] for p in path_params])
        if query_params:
            lines = [f"        path = {py_path}"]
            lines.append("        _q: dict[str, Any] = {}")
            for p in query_params:
                lines.append(f"        if {p['name']} is not None:")
                if _is_list_type(p.get("type")):
                    lines.append(f"            _q['{p['name']}'] = {p['name']} if isinstance({p['name']}, (list, tuple)) else [{p['name']}]")
                else:
                    lines.append(f"            _q['{p['name']}'] = {p['name']}")
            lines.append("        if _q:")
            lines.append("            path += '?' + urlencode(_q, doseq=True)")
        else:
            lines = [f"        path = {py_path}"]
        return lines

    def _build_composite_path(self, path: str, path_params: list[dict], input_map: dict, comp: dict, loop_var: str | None) -> str:
        result = path
        for p in path_params:
            mapped = input_map.get(p["name"], repr("undefined"))
            val = self._resolve_python_expr_loop(mapped, comp, loop_var) if loop_var else self._resolve_python_expr(mapped, comp)
            result = result.replace("{" + p["name"] + "}", f"' + quote(str({val}), safe='') + '")
        py_path = f"'{result}'"
        py_path = py_path.replace("'' + ", "").replace(" + ''", "")
        return py_path

    def _py_path_expr(self, path: str, param_names: list[str]) -> str:
        result = path
        for name in param_names:
            result = result.replace("{" + name + "}", f"' + quote(str({name}), safe='') + '")
        py_path = f"'{result}'"
        py_path = py_path.replace("'' + ", "").replace(" + ''", "")
        return py_path

    # ── body helpers ──────────────────────────────────────────────────────────

    def _python_body_sig_tokens(self, request_body) -> list[str]:
        shape = self._body_shape(request_body)
        if shape is None:
            return []
        if shape == "scalar":
            name = request_body["param_name"]
            t = _python_type(request_body.get("type"))
            return [f"{name}: {t}"]
        if shape == "expanded":
            ordered = self._order_expanded_fields(self._expanded_fields(request_body))
            tokens = []
            # All-optional expanded body → force keyword-only so callers can't
            # accidentally pass a value into the wrong positional slot.
            if ordered and not any(f.get("required") for f in ordered):
                tokens.append("*")
            for f in ordered:
                name = f["name"]
                t = "list" if f.get("kind") == "list" else _python_type(f.get("type"))
                if f.get("required"):
                    tokens.append(f"{name}: {t}")
                else:
                    tokens.append(f"{name}: {_python_nullable(t)} = None")
            return tokens
        if shape == "flat_dict":
            fields = self._flatten_body(request_body)
            return [f"{camel}: Any" for _, camel in fields]
        if shape == "generic":
            return ["body: dict | None = None"]
        return []

    def _python_body_build(self, request_body, content_type: str, indent: str) -> tuple[list[str], str | None]:
        shape = self._body_shape(request_body)
        if shape is None:
            return [], None
        if shape == "scalar":
            name = request_body["param_name"]
            return [f"{indent}body = {name}"], "body"
        if shape == "expanded":
            fields = self._expanded_fields(request_body)
            tree = self._group_fields_by_path(fields)
            rendered = self._render_object_tree_python(tree, indent)
            rendered[0] = f"{indent}body = " + rendered[0].lstrip()
            return rendered, "body"
        if shape == "flat_dict":
            fields = self._flatten_body(request_body)
            lines = [f"{indent}body = {{"]
            for snake_key, camel in fields:
                lines.append(f"{indent}    '{snake_key}': {camel},")
            lines.append(f"{indent}}}")
            return lines, "body"
        if shape == "generic":
            return [], "body"
        return [], None

    def _render_object_tree_python(self, tree: dict, base_indent: str) -> list[str]:
        inner = base_indent + "    "
        lines = [base_indent + "{k: v for k, v in {"]
        for key, node in tree.items():
            if "_leaf" in node:
                f = node["_leaf"]
                lines.append(f"{inner}'{key}': {f['name']},")
            else:
                sub = self._render_object_tree_python(node, inner)
                lines.append(f"{inner}'{key}': " + sub[0].lstrip())
                lines.extend(sub[1:-1])
                lines.append(sub[-1] + ",")
        lines.append(base_indent + "}.items() if v is not None}")
        return lines

    def _flatten_body(self, body: dict) -> list[tuple[str, str]]:
        return [(k, self.snake_to_camel(k)) for k in body if not k.startswith("_")]

    # ── signature helper ──────────────────────────────────────────────────────

    def _method_def(self, class_indent: str, name: str, sig_parts: list[str], return_type: str) -> str:
        if not sig_parts:
            return f"{class_indent}def {name}(self) -> {return_type}:"
        single = f"{class_indent}def {name}(self, {', '.join(sig_parts)}) -> {return_type}:"
        if len(single) <= 100:
            return single
        inner = class_indent + "    "
        lines_out = [f"{class_indent}def {name}(", f"{inner}self,"]
        for p in sig_parts:
            lines_out.append(f"{inner}{p},")
        lines_out.append(f"{class_indent}) -> {return_type}:")
        return "\n".join(lines_out)
