import os
from .base import BaseGenerator


class JavaScriptBrowserGenerator(BaseGenerator):
    framework_name = "javascript"

    def generate(self, endpoints: list[dict], output_dir: str) -> None:
        os.makedirs(output_dir, exist_ok=True)
        groups = self.group_by_controller(endpoints)
        controller_files = []
        for controller, eps in groups.items():
            filename = controller.lower() + ".js"
            self.emit_controller_file(controller, eps, os.path.join(output_dir, filename))
            controller_files.append(filename)
        self.emit_barrel_index(controller_files, output_dir)
        self.emit_rollup_config(output_dir)

    def copy_auth_wrapper(self, oauth_sdk_root: str, output_dir: str) -> None:
        self._copy_oauth(oauth_sdk_root, "javascript", output_dir)

    def emit_controller_file(self, controller: str, endpoints: list[dict], filepath: str) -> None:
        needs_oauth = any(ep.get("auth") == "required" for ep in endpoints)
        lines = []
        if needs_oauth:
            lines += ["import { OAuthClient } from './oauth/index.js';", ""]
        for ep in endpoints:
            lines.extend(self._emit_function(ep))
            lines.append("")
        with open(filepath, "w") as f:
            f.write("\n".join(lines))

    def emit_barrel_index(self, controller_files: list[str], output_dir: str) -> None:
        lines = [f"export * from './{f}';" for f in sorted(controller_files)]
        with open(os.path.join(output_dir, "index.js"), "w") as f:
            f.write("\n".join(lines) + "\n")

    def emit_rollup_config(self, output_dir: str) -> None:
        content = (
            "import resolve from '@rollup/plugin-node-resolve';\n\n"
            "export default {\n"
            "  input: 'index.js',\n"
            "  output: {\n"
            "    file: 'dist/mediaviz-sdk.umd.js',\n"
            "    format: 'umd',\n"
            "    name: 'MediaVizSdk',\n"
            "  },\n"
            "  plugins: [resolve()],\n"
            "};\n"
        )
        with open(os.path.join(output_dir, "rollup.config.js"), "w") as f:
            f.write(content)

    # ── internal ──────────────────────────────────────────────────────────────

    def _emit_function(self, ep: dict) -> list[str]:
        func_name = self.snake_to_camel(ep["id"])
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        query_params = [p for p in ep["params"] if p["in"] == "query"]
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
        sig_parts = ["client", "accessToken", "refreshToken"] + path_args
        if query_params:
            q_names = [self.snake_to_camel(p["name"]) for p in query_params]
            sig_parts.append("{ " + ", ".join(q_names) + " } = {}")

        lines = [f"export function {func_name}({', '.join(sig_parts)}) {{"]
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

        lines.append(f"  return client.request(path, '{ep['method']}', accessToken, refreshToken);")
        lines.append("}")
        return lines

    def _emit_unauth_fn(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict]) -> list[str]:
        method = ep["method"]
        path_args = [self.snake_to_camel(p["name"]) for p in path_params]
        request_body = ep.get("request_body")

        if isinstance(request_body, dict):
            flat_params, body_groups = self._flatten_body(request_body)
            sig_parts = ["baseUrl"] + path_args + ["{ " + ", ".join(flat_params) + " }"]
            lines = [f"export async function {func_name}({', '.join(sig_parts)}) {{"]
            tmpl = self._path_template(ep["path"], path_params)
            lines.append(f"  const resp = await fetch(baseUrl + {tmpl}, {{")
            lines.append(f"    method: '{method}',")
            lines.append("    headers: { 'Content-Type': 'application/json' },")
            lines.append("    body: JSON.stringify({")
            for i, (group_key, fields) in enumerate(body_groups):
                field_strs = []
                for snake_key, camel_param in fields:
                    field_strs.append(camel_param if snake_key == camel_param else f"{snake_key}: {camel_param}")
                comma = "," if i < len(body_groups) - 1 else ""
                lines.append(f"      {group_key}: {{ {', '.join(field_strs)} }}{comma}")
            lines.append("    }),")
            lines.append("  });")
            lines.append("  return resp.json();")
        elif request_body:
            # Dynamic/unstructured body string
            sig_parts = ["baseUrl"] + path_args + ["body = {}"]
            lines = [f"export async function {func_name}({', '.join(sig_parts)}) {{"]
            tmpl = self._path_template(ep["path"], path_params)
            lines.append(f"  const resp = await fetch(baseUrl + {tmpl}, {{")
            lines.append(f"    method: '{method}',")
            lines.append("    headers: { 'Content-Type': 'application/json' },")
            lines.append("    body: JSON.stringify(body),")
            lines.append("  });")
            lines.append("  return resp.json();")
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
            lines.append("  return resp.json();")

        lines.append("}")
        return lines

    def _flatten_body(self, body: dict) -> tuple[list[str], list[tuple[str, list[tuple[str, str]]]]]:
        """Flatten nested body dict; disambiguate colliding field names with group prefix."""
        used: set[str] = set()
        flat_params: list[str] = []
        body_groups: list[tuple[str, list[tuple[str, str]]]] = []

        for group_key, fields in body.items():
            if not isinstance(fields, dict):
                continue
            group_fields: list[tuple[str, str]] = []
            for field_name in fields:
                camel = self.snake_to_camel(field_name)
                if camel in used:
                    group_camel = self.snake_to_camel(group_key)
                    camel = group_camel + camel[0].upper() + camel[1:]
                used.add(camel)
                flat_params.append(camel)
                group_fields.append((field_name, camel))
            body_groups.append((group_key, group_fields))

        return flat_params, body_groups
