from __future__ import annotations
import json
import os
import re
from .base import BaseGenerator


class JavaScriptBrowserGenerator(BaseGenerator):
    framework_name = "javascript"

    def generate(self, endpoints: list[dict], output_dir: str) -> None:
        os.makedirs(output_dir, exist_ok=True)
        self.emit_errors_file(output_dir)
        groups = self.group_by_controller(endpoints)
        controller_files = []
        for controller, eps in groups.items():
            filename = controller.lower() + ".js"
            self.emit_controller_file(controller, eps, os.path.join(output_dir, filename))
            controller_files.append(filename)
        reexport_files = self.reexport_all_modules(output_dir)
        self.emit_barrel_index(controller_files, output_dir, extra_files=reexport_files)
        self.emit_rollup_config(output_dir)
        self.emit_package_json(output_dir)

    def copy_module(self, module_name: str, module_root: str, output_dir: str) -> None:
        self._copy_module_files(module_root, "javascript", module_name, output_dir)

    def discover_module_exports(self, module_name: str, module_path: str) -> list[str]:
        entry = self._find_js_entry(module_path)
        if not entry or not os.path.isfile(entry):
            return []
        content = open(entry).read()
        m = re.search(r'module\.exports\s*=\s*\{([^}]+)\}', content)
        if not m:
            return []
        return [name.strip() for name in m.group(1).split(',') if name.strip()]

    def emit_reexports(self, module_name: str, exports: list[str], output_dir: str) -> str | None:
        if not exports:
            return None
        filename = f"_{module_name}.js"
        entry_rel = self._find_js_entry_relative(module_name, os.path.join(output_dir, module_name))
        names = ", ".join(exports)
        lines = [
            "// Auto-generated — do not edit",
            f"import _{module_name} from './{entry_rel}';",
            f"export const {{ {names} }} = _{module_name};",
            "",
        ]
        with open(os.path.join(output_dir, filename), "w") as f:
            f.write("\n".join(lines))
        return filename

    def _find_js_entry(self, module_path: str) -> str | None:
        pkg_json = os.path.join(module_path, "package.json")
        if os.path.isfile(pkg_json):
            pkg = json.load(open(pkg_json))
            main = pkg.get("main", "index.js")
            return os.path.join(module_path, main)
        for candidate in ("src/index.js", "index.js"):
            path = os.path.join(module_path, candidate)
            if os.path.isfile(path):
                return path
        return None

    def _find_js_entry_relative(self, module_name: str, module_path: str) -> str:
        pkg_json = os.path.join(module_path, "package.json")
        if os.path.isfile(pkg_json):
            pkg = json.load(open(pkg_json))
            return f"{module_name}/{pkg.get('main', 'index.js')}"
        for candidate in ("src/index.js", "index.js"):
            if os.path.isfile(os.path.join(module_path, candidate)):
                return f"{module_name}/{candidate}"
        return f"{module_name}/index.js"

    def _oauth_import_path(self) -> str:
        """Return the import path for OAuthClient used by controller files."""
        for mod in self._copied_modules:
            if mod["name"] == "oauth":
                return "_oauth.js"
        return "oauth/index.js"

    def emit_errors_file(self, output_dir: str) -> None:
        lines = [
            "// Auto-generated — do not edit",
            "",
            "export class ApiError extends Error {",
            "  constructor(message, status, requestId, body) {",
            "    super(message);",
            "    this.name = 'ApiError';",
            "    this.status = status;",
            "    this.requestId = requestId;",
            "    this.body = body;",
            "  }",
            "}",
            "",
            "export class ValidationError extends ApiError {",
            "  constructor(body, status, requestId) {",
            "    const detail = body.detail ?? [];",
            "    const message = Array.isArray(detail)",
            "      ? detail.map(d => `${d.loc.join('.')}: ${d.msg}`).join('; ')",
            "      : String(detail);",
            "    super(message, status, requestId, body);",
            "    this.name = 'ValidationError';",
            "    this.fieldErrors = Array.isArray(detail)",
            "      ? detail.map(d => ({ loc: d.loc, msg: d.msg, type: d.type }))",
            "      : [];",
            "  }",
            "}",
            "",
            "export class NotFoundError extends ApiError {",
            "  constructor(body, status, requestId) {",
            "    super(body.detail ?? 'Resource not found', status, requestId, body);",
            "    this.name = 'NotFoundError';",
            "  }",
            "}",
            "",
            "export class RateLimitError extends ApiError {",
            "  constructor(body, status, requestId, headers) {",
            "    super(body.detail ?? 'Rate limited', status, requestId, body);",
            "    this.name = 'RateLimitError';",
            "    this.retryAfter = parseInt(headers.get('retry-after') ?? '', 10) || null;",
            "  }",
            "}",
            "",
            "export class ServerError extends ApiError {",
            "  constructor(body, status, requestId) {",
            "    super(body.detail ?? 'Internal server error', status, requestId, body);",
            "    this.name = 'ServerError';",
            "  }",
            "}",
            "",
            "export async function handleResponse(response) {",
            "  const requestId = response.headers.get('x-request-id');",
            "",
            "  if (response.ok) {",
            "    return response.status === 204 ? null : response.json();",
            "  }",
            "",
            "  let body;",
            "  try {",
            "    body = await response.json();",
            "  } catch {",
            "    body = { detail: response.statusText };",
            "  }",
            "",
            "  switch (response.status) {",
            "    case 422:",
            "      throw new ValidationError(body, response.status, requestId);",
            "    case 404:",
            "      throw new NotFoundError(body, response.status, requestId);",
            "    case 429:",
            "      throw new RateLimitError(body, response.status, requestId, response.headers);",
            "    default:",
            "      if (response.status >= 500) {",
            "        throw new ServerError(body, response.status, requestId);",
            "      }",
            "      throw new ApiError(",
            "        body.detail ?? 'Unknown error',",
            "        response.status,",
            "        requestId,",
            "        body",
            "      );",
            "  }",
            "}",
            "",
        ]
        with open(os.path.join(output_dir, "errors.js"), "w") as f:
            f.write("\n".join(lines))

    def emit_controller_file(self, controller: str, endpoints: list[dict], filepath: str) -> None:
        needs_oauth = any(ep.get("auth") == "required" and not ep.get("api_host") for ep in endpoints)
        needs_errors = any(ep.get("auth") != "required" or ep.get("api_host") for ep in endpoints)
        lines = []
        if needs_oauth:
            lines += [f"import {{ OAuthClient }} from './{self._oauth_import_path()}';"]
        if needs_errors:
            lines += ["import { handleResponse } from './errors.js';"]
        if needs_oauth or needs_errors:
            lines.append("")
        for ep in endpoints:
            lines.extend(self._emit_function(ep))
            lines.append("")
        with open(filepath, "w") as f:
            f.write("\n".join(lines))

    def emit_barrel_index(self, controller_files: list[str], output_dir: str, extra_files: list[str] | None = None) -> None:
        lines = ["export * from './errors.js';"]
        for f in sorted(extra_files or []):
            lines.append(f"export * from './{f}';")
        lines += [f"export * from './{f}';" for f in sorted(controller_files)]
        with open(os.path.join(output_dir, "index.js"), "w") as f:
            f.write("\n".join(lines) + "\n")

    def emit_rollup_config(self, output_dir: str) -> None:
        content = (
            "import resolve from '@rollup/plugin-node-resolve';\n"
            "import commonjs from '@rollup/plugin-commonjs';\n\n"
            "export default {\n"
            "  input: 'index.js',\n"
            "  output: [\n"
            "    { file: 'dist/sdk.cjs', format: 'cjs', exports: 'named' },\n"
            "    { file: 'dist/sdk.esm.js', format: 'es' },\n"
            "    { file: 'dist/sdk.umd.js', format: 'umd', name: 'MediaVizSdk', exports: 'named' },\n"
            "  ],\n"
            "  plugins: [resolve(), commonjs()],\n"
            "};\n"
        )
        with open(os.path.join(output_dir, "rollup.config.js"), "w") as f:
            f.write(content)

    def emit_package_json(self, output_dir: str) -> None:
        config = {
            "name": "@mediaviz/sdk",
            "version": "0.1.0",
            "type": "module",
            "main": "./dist/sdk.cjs",
            "module": "./dist/sdk.esm.js",
            "browser": "./dist/sdk.umd.js",
            "exports": {
                ".": {
                    "browser": "./dist/sdk.umd.js",
                    "import": "./dist/sdk.esm.js",
                    "require": "./dist/sdk.cjs",
                    "default": "./dist/sdk.cjs",
                },
            },
            "scripts": {
                "build": "rollup -c",
            },
            "devDependencies": {
                "rollup": "^4.0.0",
                "@rollup/plugin-node-resolve": "^16.0.0",
                "@rollup/plugin-commonjs": "^29.0.0",
            },
        }
        with open(os.path.join(output_dir, "package.json"), "w") as f:
            json.dump(config, f, indent=2)
            f.write("\n")

    # ── internal ──────────────────────────────────────────────────────────────

    def _emit_function(self, ep: dict) -> list[str]:
        func_name = self.snake_to_camel(ep["function_name"])
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        query_params = [p for p in ep["params"] if p["in"] == "query"]
        header_params = [p for p in ep["params"] if p["in"] == "header"]
        if ep.get("api_host"):
            return self._emit_alt_host_fn(func_name, ep, path_params, query_params, header_params)
        if ep.get("auth") == "required":
            return self._emit_auth_fn(func_name, ep, path_params, query_params)
        return self._emit_unauth_fn(func_name, ep, path_params, query_params)

    def _path_template(self, path: str, path_params: list[dict]) -> str:
        result = path
        for p in path_params:
            camel = self.snake_to_camel(p["name"])
            result = result.replace("{" + p["name"] + "}", f"${{encodeURIComponent({camel})}}")
        return f"`{result}`"

    def _emit_auth_fn(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict]) -> list[str]:
        path_args = [self.snake_to_camel(p["name"]) for p in path_params]
        request_body = ep.get("request_body")

        sig_parts = ["client", "accessToken", "refreshToken"] + path_args
        if isinstance(request_body, dict) and self._is_model_body(request_body):
            sig_parts.append("body")
        elif isinstance(request_body, dict):
            fields = self._flatten_body(request_body)
            param_names = [camel for _, camel in fields]
            sig_parts.append("{ " + ", ".join(param_names) + " }")
        elif request_body:
            sig_parts.append("body = {}")
        if query_params:
            q_names = [self.snake_to_camel(p["name"]) for p in query_params]
            sig_parts.append("{ " + ", ".join(q_names) + " } = {}")

        lines = [f"export async function {func_name}({', '.join(sig_parts)}) {{"]
        tmpl = self._path_template(ep["path"], path_params)

        if query_params:
            lines.append(f"  let path = {tmpl};")
            lines.append("  const query = new URLSearchParams();")
            for p in query_params:
                camel = self.snake_to_camel(p["name"])
                lines.append(f"  if ({camel} !== undefined) query.set('{p['name']}', {camel});")
            lines.append("  const qs = query.toString();")
            lines.append("  if (qs) path += '?' + qs;")
        else:
            lines.append(f"  const path = {tmpl};")

        if isinstance(request_body, dict) and self._is_model_body(request_body):
            lines.append(f"  const {{ data }} = await client.request(path, '{ep['method']}', accessToken, refreshToken, JSON.stringify(body));")
        elif isinstance(request_body, dict):
            fields = self._flatten_body(request_body)
            field_strs = []
            for snake_key, camel_param in fields:
                if snake_key == camel_param:
                    field_strs.append(camel_param)
                else:
                    field_strs.append(f"{snake_key}: {camel_param}")
            body_arg = "{ " + ", ".join(field_strs) + " }"
            lines.append(f"  const {{ data }} = await client.request(path, '{ep['method']}', accessToken, refreshToken, JSON.stringify({body_arg}));")
        elif request_body:
            lines.append(f"  const {{ data }} = await client.request(path, '{ep['method']}', accessToken, refreshToken, JSON.stringify(body));")
        else:
            lines.append(f"  const {{ data }} = await client.request(path, '{ep['method']}', accessToken, refreshToken);")
        lines.append("  return data;")
        lines.append("}")
        return lines

    def _emit_unauth_fn(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict]) -> list[str]:
        method = ep["method"]
        path_args = [self.snake_to_camel(p["name"]) for p in path_params]
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"
        is_form = content_type == "application/x-www-form-urlencoded"

        if isinstance(request_body, dict) and self._is_model_body(request_body):
            sig_parts = ["baseUrl"] + path_args + ["body"]
            lines = [f"export async function {func_name}({', '.join(sig_parts)}) {{"]
            tmpl = self._path_template(ep["path"], path_params)
            lines.append(f"  const resp = await fetch(baseUrl + {tmpl}, {{")
            lines.append(f"    method: '{method}',")
            lines.append(f"    headers: {{ 'Content-Type': '{content_type}' }},")
            if is_form:
                lines.append("    body: new URLSearchParams(body).toString(),")
            else:
                lines.append("    body: JSON.stringify(body),")
            lines.append("  });")
            lines.append("  return handleResponse(resp);")
        elif isinstance(request_body, dict):
            fields = self._flatten_body(request_body)
            param_names = [camel for _, camel in fields]
            sig_parts = ["baseUrl"] + path_args + ["{ " + ", ".join(param_names) + " }"]
            lines = [f"export async function {func_name}({', '.join(sig_parts)}) {{"]
            tmpl = self._path_template(ep["path"], path_params)
            lines.append(f"  const resp = await fetch(baseUrl + {tmpl}, {{")
            lines.append(f"    method: '{method}',")
            lines.append(f"    headers: {{ 'Content-Type': '{content_type}' }},")
            field_strs = []
            for snake_key, camel_param in fields:
                if snake_key == camel_param:
                    field_strs.append(f"      {camel_param}")
                else:
                    field_strs.append(f"      {snake_key}: {camel_param}")
            if is_form:
                lines.append("    body: new URLSearchParams({")
            else:
                lines.append("    body: JSON.stringify({")
            lines.append(",\n".join(field_strs))
            lines.append("    }).toString(),") if is_form else lines.append("    }),")
            lines.append("  });")
            lines.append("  return handleResponse(resp);")
        elif request_body:
            # Dynamic/unstructured body string
            sig_parts = ["baseUrl"] + path_args + ["body = {}"]
            lines = [f"export async function {func_name}({', '.join(sig_parts)}) {{"]
            tmpl = self._path_template(ep["path"], path_params)
            lines.append(f"  const resp = await fetch(baseUrl + {tmpl}, {{")
            lines.append(f"    method: '{method}',")
            lines.append(f"    headers: {{ 'Content-Type': '{content_type}' }},")
            if is_form:
                lines.append("    body: new URLSearchParams(body).toString(),")
            else:
                lines.append("    body: JSON.stringify(body),")
            lines.append("  });")
            lines.append("  return handleResponse(resp);")
        else:
            # No body — GET or DELETE
            sig_parts = ["baseUrl"] + path_args
            if query_params:
                q_names = [self.snake_to_camel(p["name"]) for p in query_params]
                sig_parts.append("{ " + ", ".join(q_names) + " } = {}")
            lines = [f"export async function {func_name}({', '.join(sig_parts)}) {{"]
            tmpl = self._path_template(ep["path"], path_params)
            if query_params:
                lines.append(f"  let path = {tmpl};")
                lines.append("  const query = new URLSearchParams();")
                for p in query_params:
                    camel = self.snake_to_camel(p["name"])
                    lines.append(f"  if ({camel} !== undefined) query.set('{p['name']}', {camel});")
                lines.append("  const qs = query.toString();")
                lines.append("  if (qs) path += '?' + qs;")
                lines.append(f"  const resp = await fetch(baseUrl + path, {{ method: '{method}' }});")
            else:
                lines.append(f"  const resp = await fetch(baseUrl + {tmpl}, {{ method: '{method}' }});")
            lines.append("  return handleResponse(resp);")

        lines.append("}")
        return lines

    def _emit_alt_host_fn(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict], header_params: list[dict]) -> list[str]:
        """Emit function for endpoints on a non-default API host (e.g. photo_upload)."""
        method = ep["method"]
        path_args = [self.snake_to_camel(p["name"]) for p in path_params]
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"

        required_headers = [p for p in header_params if p.get("required")]
        optional_headers = [p for p in header_params if not p.get("required")]

        sig_parts = ["baseUrl", "accessToken"] + path_args
        for p in required_headers:
            sig_parts.append(self.header_to_param(p["name"]))
        if isinstance(request_body, dict) and self._is_model_body(request_body):
            sig_parts.append("body")
        elif isinstance(request_body, dict):
            fields = self._flatten_body(request_body)
            sig_parts.append("{ " + ", ".join(camel for _, camel in fields) + " }")
        elif request_body:
            sig_parts.append("body = {}")
        if optional_headers:
            opt_names = [self.header_to_param(p["name"]) for p in optional_headers]
            sig_parts.append("{ " + ", ".join(opt_names) + " } = {}")
        if query_params:
            q_names = [self.snake_to_camel(p["name"]) for p in query_params]
            sig_parts.append("{ " + ", ".join(q_names) + " } = {}")

        lines = [f"export async function {func_name}({', '.join(sig_parts)}) {{"]
        tmpl = self._path_template(ep["path"], path_params)

        # Build headers object
        lines.append("  const headers = {")
        lines.append(f"    'Content-Type': '{content_type}',")
        lines.append("    'Authorization': accessToken,")
        for p in required_headers:
            param = self.header_to_param(p["name"])
            lines.append(f"    '{p['name']}': {param},")
        lines.append("  };")
        if optional_headers:
            for p in optional_headers:
                param = self.header_to_param(p["name"])
                lines.append(f"  if ({param} !== undefined) headers['{p['name']}'] = {param};")

        # Build path with query params
        if query_params:
            lines.append(f"  let path = {tmpl};")
            lines.append("  const query = new URLSearchParams();")
            for p in query_params:
                camel = self.snake_to_camel(p["name"])
                lines.append(f"  if ({camel} !== undefined) query.set('{p['name']}', {camel});")
            lines.append("  const qs = query.toString();")
            lines.append("  if (qs) path += '?' + qs;")
            fetch_url = "baseUrl + path"
        else:
            fetch_url = f"baseUrl + {tmpl}"

        # Build fetch call
        if isinstance(request_body, dict) and self._is_model_body(request_body):
            body_str = "JSON.stringify(body)"
        elif isinstance(request_body, dict):
            fields = self._flatten_body(request_body)
            field_strs = []
            for snake_key, camel_param in fields:
                if snake_key == camel_param:
                    field_strs.append(camel_param)
                else:
                    field_strs.append(f"{snake_key}: {camel_param}")
            body_str = "JSON.stringify({ " + ", ".join(field_strs) + " })"
        elif request_body:
            body_str = "JSON.stringify(body)"
        else:
            body_str = None

        lines.append(f"  const resp = await fetch({fetch_url}, {{")
        lines.append(f"    method: '{method}',")
        lines.append("    headers,")
        if body_str:
            lines.append(f"    body: {body_str},")
        lines.append("  });")
        lines.append("  return handleResponse(resp);")
        lines.append("}")
        return lines

    def _is_model_body(self, body: dict) -> bool:
        """Check if request_body uses the _model convention (body IS the model, not wrapped)."""
        return list(body.keys()) == ["_model"]

    def _flatten_body(self, body: dict) -> list[tuple[str, str]]:
        """Extract field names from request_body schema, returning [(snake_key, camelKey), ...]."""
        fields: list[tuple[str, str]] = []
        for field_name in body:
            camel = self.snake_to_camel(field_name)
            fields.append((field_name, camel))
        return fields
