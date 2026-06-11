from __future__ import annotations
import json
import os
import re
import shutil
import subprocess
from .base import BaseGenerator
from naming import snake_to_camel as _snake_to_camel
from utilities_resolver import collect_framework_imports, indent_body

# Reserved words that cannot be used as JS parameter names in strict/module mode.
_JS_RESERVED = {
    "break", "case", "catch", "class", "const", "continue", "debugger", "default",
    "delete", "do", "else", "enum", "export", "extends", "false", "finally", "for",
    "function", "if", "import", "in", "instanceof", "new", "null", "return", "super",
    "switch", "this", "throw", "true", "try", "typeof", "var", "void", "while", "with",
    "yield", "let", "static", "implements", "interface", "package", "private",
    "protected", "public", "await",
}


def _js_safe(name: str) -> str:
    """Escape JS reserved words by appending an underscore suffix."""
    return name + "_" if name in _JS_RESERVED else name


class JavaScriptBrowserGenerator(BaseGenerator):
    framework_name = "javascript"

    def generate(self, endpoints: list[dict], output_dir: str, composites: list[dict] | None = None, utilities: list[dict] | None = None, admin: bool = False, schemas: dict | None = None) -> None:
        os.makedirs(output_dir, exist_ok=True)
        self._schemas = schemas or {}
        self.emit_errors_file(output_dir)
        groups = self.group_by_controller(endpoints)
        comp_groups = self.group_composites_by_controller(composites)
        controller_files = []
        all_groups = {}
        all_comp_groups = {}
        for controller, eps in groups.items():
            filename = controller.lower() + ".js"
            comps = comp_groups.pop(controller, [])
            self.emit_controller_file(controller, eps, os.path.join(output_dir, filename), composites=comps)
            controller_files.append(filename)
            all_groups[controller] = eps
            if comps:
                all_comp_groups[controller] = comps
        # composites targeting controllers with no regular endpoints
        for controller, comps in comp_groups.items():
            filename = controller.lower() + ".js"
            self.emit_controller_file(controller, [], os.path.join(output_dir, filename), composites=comps)
            controller_files.append(filename)
            all_comp_groups[controller] = comps
        alt_hosts = self.collect_alt_hosts(endpoints, composites)
        self.emit_client_class(all_groups, all_comp_groups, alt_hosts, output_dir, utilities=utilities)
        reexport_files = self.reexport_all_modules(output_dir)
        self.emit_barrel_index(controller_files, output_dir, extra_files=reexport_files)
        self.emit_rollup_config(output_dir)
        self.emit_package_json(output_dir, admin=admin)
        from .licenses import emit_license
        emit_license(output_dir)
        self.build_dist(output_dir)
        self.emit_dts_file(endpoints, composites, utilities, output_dir, admin=admin)
        self.prune_package_json_for_publish(output_dir)

    def emit_dts_file(self, endpoints: list[dict], composites: list[dict] | None, utilities: list[dict] | None, output_dir: str, admin: bool = False) -> None:
        """Write the consolidated TypeScript declarations and type-check them.

        Lives in dist/ alongside the Rollup bundle so the package's `types` field
        resolves to it. The type-check uses the locally-installed tsc (pulled in
        as a devDependency by build_dist's npm install, then stripped before
        publish); when tsc is unavailable (e.g. a dev run with no npm) it is
        skipped, mirroring build_dist's npm-not-found behaviour.
        """
        from .typescript_dts import build_dts
        dts = build_dts(self, endpoints, composites, utilities, self._schemas, admin=admin)
        dist_dir = os.path.join(output_dir, "dist")
        os.makedirs(dist_dir, exist_ok=True)
        dts_path = os.path.join(dist_dir, "sdk.d.ts")
        with open(dts_path, "w") as f:
            f.write(dts)
        self._typecheck_dts(output_dir, dts_path)
        print(f"  [javascript] types emitted → {dts_path}")

    def _typecheck_dts(self, output_dir: str, dts_path: str) -> None:
        tsc = os.path.join(output_dir, "node_modules", ".bin", "tsc")
        if not os.path.isfile(tsc):
            print(f"  [javascript] tsc not installed — skipping .d.ts type-check for {output_dir}")
            return
        result = subprocess.run(
            [tsc, "--noEmit", "--strict", "--skipLibCheck", dts_path],
            cwd=output_dir, capture_output=True, text=True,
        )
        if result.returncode != 0:
            raise RuntimeError(f"sdk.d.ts failed type-check:\n{result.stdout}{result.stderr}")

    def build_dist(self, output_dir: str) -> None:
        npm = shutil.which("npm")
        if not npm:
            print(f"  [javascript] npm not found on PATH — skipping dist build for {output_dir}")
            return
        for cmd in (["npm", "install", "--no-audit", "--no-fund"], ["npm", "run", "build"]):
            result = subprocess.run(cmd, cwd=output_dir, capture_output=True, text=True)
            if result.returncode != 0:
                print(f"  [javascript] {' '.join(cmd)} failed in {output_dir}:")
                print(result.stdout + result.stderr)
                return
        print(f"  [javascript] dist built → {os.path.join(output_dir, 'dist')}")

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

    def emit_controller_file(self, controller: str, endpoints: list[dict], filepath: str, composites: list[dict] | None = None) -> None:
        needs_errors = any(ep.get("auth") != "required" or ep.get("api_host") for ep in endpoints)
        needs_strip = any(self._body_shape(ep.get("request_body")) == "expanded" for ep in endpoints)
        for comp in (composites or []):
            for step in comp.get("steps", []):
                if self._body_shape(step.get("endpoint", {}).get("request_body")) == "expanded":
                    needs_strip = True
        # cross-controller imports needed by composites
        cross_imports: dict[str, list[str]] = {}  # filename -> [class_names]
        for comp in (composites or []):
            for step in comp.get("steps", []):
                ep = step.get("endpoint", {})
                if ep.get("auth") != "required" or ep.get("api_host"):
                    needs_errors = True
                step_ctrl = ep.get("controller", "").replace(" ", "_")
                if step_ctrl and step_ctrl != controller and ep.get("auth") == "required" and not ep.get("api_host"):
                    cls = self.snake_to_pascal(step_ctrl)
                    js_file = step_ctrl.lower() + ".js"
                    cross_imports.setdefault(js_file, []).append(cls)
        class_name = self.snake_to_pascal(controller)
        lines = []
        if needs_errors:
            lines += ["import { handleResponse } from './errors.js';"]
        for js_file, cls_list in sorted(cross_imports.items()):
            lines.append(f"import {{ {', '.join(sorted(set(cls_list)))} }} from './{js_file}';")
        if needs_errors or cross_imports:
            lines.append("")
        if needs_strip:
            lines.append("function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }")
            lines.append("")
        # detect if any composite uses caching
        has_caches = any(
            s.get("cache", {}).get("enabled")
            for comp in (composites or [])
            for s in comp.get("steps", [])
        )

        lines.append(f"export class {class_name} {{")
        if has_caches:
            lines.append("  constructor(ctx) { this._ctx = ctx; this._caches = {}; }")
        else:
            lines.append("  constructor(ctx) { this._ctx = ctx; }")

        for ep in endpoints:
            lines.append("")
            lines.extend(self._emit_method(ep))
        for comp in (composites or []):
            lines.append("")
            lines.extend(self._emit_composite_method(comp, sibling_eps=endpoints))
        lines.append("}")
        lines.append("")
        with open(filepath, "w") as f:
            f.write("\n".join(lines))

    @staticmethod
    def _to_prop_name(name: str) -> str:
        """Convert controller name to camelCase property name (first char always lowercase)."""
        camel = _snake_to_camel(name)
        if not camel:
            return camel
        # Lowercase leading uppercase run: "AIModelCredits" -> "aiModelCredits", "OAuth" -> "oAuth"
        i = 0
        while i < len(camel) and camel[i].isupper():
            i += 1
        if i > 1:
            return camel[:i - 1].lower() + camel[i - 1:]
        return camel[0].lower() + camel[1:]

    def emit_client_class(self, groups: dict, comp_groups: dict, alt_hosts: set[str], output_dir: str, utilities: list[dict] | None = None) -> None:
        """Generate MediaViz.js — the top-level SDK client class."""
        # Build controller info: [(prop_name, class_name, js_filename)]
        controllers = []
        for controller in sorted(set(list(groups.keys()) + list(comp_groups.keys()))):
            class_name = self.snake_to_pascal(controller)
            filename = controller.lower() + ".js"
            prop_name = self._to_prop_name(controller)
            controllers.append((prop_name, class_name, filename))

        # Build host keys from alt_hosts set
        host_keys = sorted(self.snake_to_camel(h) for h in alt_hosts)
        host_env_vars = {self.snake_to_camel(h): f"MEDIAVIZ_{h.upper()}_URL" for h in alt_hosts}

        lines = [
            "// Auto-generated — do not edit",
            f"import {{ OAuthClient }} from './{self._oauth_import_path()}';",
        ]
        for stmt in collect_framework_imports(utilities, "javascript"):
            lines.append(stmt)
        for prop, cls, fname in controllers:
            lines.append(f"import {{ {cls} }} from './{fname}';")
        lines.append("")

        # _env helper
        lines.append("function _env(key) {")
        lines.append("  if (typeof process !== 'undefined' && process.env) return process.env[key];")
        lines.append("  return undefined;")
        lines.append("}")
        lines.append("")

        # _Context class
        lines.append("class _Context {")
        lines.append("  constructor(mv) { this._mv = mv; }")
        lines.append("  get client() { return this._mv._oauthClient; }")
        lines.append("  get accessToken() { return this._mv._accessToken; }")
        lines.append("  get refreshToken() { return this._mv._refreshToken; }")
        lines.append("  get baseUrl() { return this._mv._config.baseUrl; }")
        lines.append("  get hosts() { return this._mv._hosts; }")
        if self._has_utilities(utilities):
            lines.append("  get utils() { return this._mv.utils; }")
        lines.append("  requireHost(key) {")
        lines.append("    const url = this._mv._hosts[key];")
        lines.append("    if (!url) throw new Error(`Host '${key}' not configured. Pass hosts.${key} in MediaViz constructor or set the corresponding env var.`);")
        lines.append("    return url;")
        lines.append("  }")
        lines.append("  requireTokens() {")
        lines.append("    if (!this._mv._accessToken) throw new Error('Not authenticated. Call authenticate(), handleCallback(), or setTokens() first.');")
        lines.append("  }")
        lines.append("}")
        lines.append("")

        # _TokenTrackingClient class
        # Persists rotated tokens via the OAuth client's onRefreshSuccess callback
        # so they are saved the moment refresh resolves — before the retry. If the
        # retry throws (server hiccup, JSON parse error), the new pair is preserved
        # and the next call uses it. Without this, single-use refresh-token rotation
        # (RFC 6749 §6) would lock the caller out on any retry failure.
        lines.append("class _TokenTrackingClient {")
        lines.append("  constructor(mv, inner) { this._mv = mv; this._inner = inner; }")
        lines.append("  async request(url, method, accessToken, refreshToken, body) {")
        lines.append("    const onRefreshSuccess = (newTokens) => {")
        lines.append("      this._mv._accessToken = newTokens.access_token;")
        lines.append("      this._mv._refreshToken = newTokens.refresh_token;")
        lines.append("      if (this._mv._onTokenRefresh) this._mv._onTokenRefresh(newTokens);")
        lines.append("    };")
        lines.append("    return this._inner.request(url, method, accessToken, refreshToken, body, onRefreshSuccess);")
        lines.append("  }")
        lines.append("}")
        lines.append("")

        # _Utils class (from utilities/*.yaml)
        self._emit_utils_class_js(lines, utilities)

        # MediaViz class
        lines.append("export class MediaViz {")
        lines.append("  constructor(config = {}) {")
        lines.append("    this._config = {")
        lines.append("      clientId: config.clientId ?? _env('MEDIAVIZ_CLIENT_ID'),")
        lines.append("      clientSecret: config.clientSecret ?? _env('MEDIAVIZ_CLIENT_SECRET'),")
        lines.append("      baseUrl: config.baseUrl ?? _env('MEDIAVIZ_BASE_URL') ?? 'https://api.mediaviz.ai',")
        lines.append("      redirectUri: config.redirectUri ?? _env('MEDIAVIZ_REDIRECT_URI'),")
        lines.append("    };")

        # hosts
        lines.append("    this._hosts = {")
        for hk in host_keys:
            env_var = host_env_vars.get(hk, f"MEDIAVIZ_{hk.upper()}_URL")
            # Find the original alt_host name to build the env var correctly
            lines.append(f"      {hk}: config.hosts?.{hk} ?? _env('{env_var}'),")
        lines.append("      ...(config.hosts || {}),")
        lines.append("    };")

        lines.append("    this._accessToken = config.accessToken ?? null;")
        lines.append("    this._refreshToken = config.refreshToken ?? null;")
        lines.append("    this._onTokenRefresh = config.onTokenRefresh ?? null;")
        lines.append("")
        lines.append("    const _inner = new OAuthClient({")
        lines.append("      clientId: this._config.clientId,")
        lines.append("      clientSecret: this._config.clientSecret,")
        lines.append("      baseUrl: this._config.baseUrl,")
        lines.append("      redirectUri: this._config.redirectUri,")
        lines.append("    });")
        lines.append("    this._oauthClient = new _TokenTrackingClient(this, _inner);")
        lines.append("")
        lines.append("    const _ctx = new _Context(this);")
        for prop, cls, _ in controllers:
            lines.append(f"    this.{prop} = new {cls}(_ctx);")
        if self._has_utilities(utilities):
            lines.append("    this.utils = new _Utils(this);")
        lines.append("  }")

        # authenticate (client credentials)
        lines.append("")
        lines.append("  async authenticate() {")
        lines.append("    const tokens = await this._oauthClient._inner.getClientCredentialsToken();")
        lines.append("    this._accessToken = tokens.access_token;")
        lines.append("    this._refreshToken = tokens.refresh_token ?? null;")
        lines.append("    return tokens;")
        lines.append("  }")

        # getAuthorizationUrl (PKCE)
        lines.append("")
        lines.append("  async getAuthorizationUrl(state) {")
        lines.append("    return this._oauthClient._inner.generateAuthorizationUrl(state);")
        lines.append("  }")

        # handleCallback
        lines.append("")
        lines.append("  async handleCallback(code, codeVerifier) {")
        lines.append("    const tokens = await this._oauthClient._inner.exchangeCode(code, codeVerifier);")
        lines.append("    this._accessToken = tokens.access_token;")
        lines.append("    this._refreshToken = tokens.refresh_token;")
        lines.append("    return tokens;")
        lines.append("  }")

        # setTokens
        lines.append("")
        lines.append("  setTokens(accessToken, refreshToken) {")
        lines.append("    this._accessToken = accessToken;")
        lines.append("    this._refreshToken = refreshToken;")
        lines.append("  }")

        # getters
        lines.append("")
        lines.append("  get accessToken() { return this._accessToken; }")
        lines.append("  get refreshToken() { return this._refreshToken; }")

        lines.append("}")
        lines.append("")

        with open(os.path.join(output_dir, "MediaViz.js"), "w") as f:
            f.write("\n".join(lines))

    @staticmethod
    def _has_utilities(utilities: list[dict] | None) -> bool:
        return bool(utilities) and any(m.get("utilities") for m in utilities)

    def _emit_utils_class_js(self, lines: list[str], utilities: list[dict] | None) -> None:
        if not self._has_utilities(utilities):
            return
        lines.append("class _Utils {")
        lines.append("  constructor(mv) { this._mv = mv; }")
        for module in utilities:
            for util in module["utilities"]:
                fn_name = util["function_name"]["javascript"]
                param_names = [_js_safe(_snake_to_camel(p["name"])) for p in util["params"]]
                params = ", ".join(param_names)
                async_kw = "async " if (util.get("async") or {}).get("javascript") else ""
                lines.append(f"  {async_kw}{fn_name}({params}) {{")
                if util.get("requires_tokens"):
                    lines.append("    if (!this._mv._accessToken) throw new Error('Not authenticated. Call authenticate(), handleCallback(), or setTokens() first.');")
                if "snippet_body" in util:
                    lines.extend(indent_body(util["snippet_body"]["javascript"], "    "))
                else:
                    inner_expr = self._js_inner_expr(module["source_module"])
                    target = util["target"]["javascript"]
                    lines.append(f"    return {inner_expr}.{target}({params});")
                lines.append("  }")
        lines.append("}")
        lines.append("")

    @staticmethod
    def _js_inner_expr(source_module: str) -> str:
        if source_module == "oauth":
            return "this._mv._oauthClient._inner"
        raise ValueError(f"Unsupported utilities source_module: {source_module!r}")

    def emit_barrel_index(self, controller_files: list[str], output_dir: str, extra_files: list[str] | None = None) -> None:
        lines = ["export { MediaViz } from './MediaViz.js';"]
        lines.append("export * from './errors.js';")
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

    def emit_package_json(self, output_dir: str, admin: bool = False) -> None:
        from .licenses import extract_sdk_version
        config = {
            "name": "@mediaviz/admin-sdk" if admin else "@mediaviz/sdk",
            "version": extract_sdk_version(output_dir),
            "description": (
                "MediaViz JavaScript Admin SDK — auto-generated full endpoint client (private)."
                if admin else
                "MediaViz JavaScript SDK — auto-generated public endpoint client."
            ),
            "license": "MIT",
            "repository": {
                "type": "git",
                "url": "https://github.com/mediaviz/mediaviz_sdk",
            },
            "type": "module",
            "main": "./dist/sdk.cjs",
            "module": "./dist/sdk.esm.js",
            "browser": "./dist/sdk.umd.js",
            "types": "./dist/sdk.d.ts",
            "exports": {
                # `types` must be the first condition so TypeScript resolves it
                # ahead of the runtime entries.
                ".": {
                    "types": "./dist/sdk.d.ts",
                    "browser": "./dist/sdk.umd.js",
                    "import": "./dist/sdk.esm.js",
                    "require": "./dist/sdk.cjs",
                    "default": "./dist/sdk.cjs",
                },
            },
            "files": ["dist", "LICENSE", "README.md"],
            "publishConfig": {
                "access": "restricted" if admin else "public",
            },
            "scripts": {
                "build": "rollup -c",
            },
            "optionalDependencies": {
                "sharp": "^0.33.0",
            },
            "devDependencies": {
                "rollup": "^4.0.0",
                "@rollup/plugin-node-resolve": "^16.0.0",
                "@rollup/plugin-commonjs": "^29.0.0",
                # Installed for the generator's sdk.d.ts type-check; stripped from
                # the published manifest by prune_package_json_for_publish.
                "typescript": "^5.4.0",
            },
        }
        with open(os.path.join(output_dir, "package.json"), "w") as f:
            json.dump(config, f, indent=2)
            f.write("\n")

    def prune_package_json_for_publish(self, output_dir: str) -> None:
        """Strip build-only fields after dist is built; consumers never need rollup or the build script."""
        pkg_path = os.path.join(output_dir, "package.json")
        if not os.path.isfile(pkg_path):
            return
        pkg = json.load(open(pkg_path))
        pkg.pop("scripts", None)
        pkg.pop("devDependencies", None)
        with open(pkg_path, "w") as f:
            json.dump(pkg, f, indent=2)
            f.write("\n")

    # ── internal ──────────────────────────────────────────────────────────────

    def _emit_method(self, ep: dict) -> list[str]:
        func_name = self.snake_to_camel(ep["function_name"])
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        query_params = [p for p in ep["params"] if p["in"] == "query"]
        header_params = [p for p in ep["params"] if p["in"] == "header"]
        if ep.get("api_host"):
            return self._emit_alt_host_method(func_name, ep, path_params, query_params, header_params)
        if ep.get("auth") == "required":
            return self._emit_auth_method(func_name, ep, path_params, query_params)
        return self._emit_unauth_method(func_name, ep, path_params, query_params)

    def _path_template(self, path: str, path_params: list[dict]) -> str:
        result = path
        for p in path_params:
            camel = self.snake_to_camel(p["name"])
            result = result.replace("{" + p["name"] + "}", f"${{encodeURIComponent({camel})}}")
        return f"`{result}`"

    def _emit_auth_method(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict]) -> list[str]:
        path_args = [self.snake_to_camel(p["name"]) for p in path_params]
        request_body = ep.get("request_body")

        sig_parts = list(path_args)
        sig_parts.extend(self._js_body_sig_tokens(request_body))
        if query_params:
            q_names = [self.snake_to_camel(p["name"]) for p in query_params]
            sig_parts.append("{ " + ", ".join(q_names) + " } = {}")

        lines = [f"  async {func_name}({', '.join(sig_parts)}) {{"]
        lines.append("    this._ctx.requireTokens();")
        tmpl = self._path_template(ep["path"], path_params)

        if query_params:
            lines.append(f"    let path = {tmpl};")
            lines.append("    const query = new URLSearchParams();")
            for p in query_params:
                camel = self.snake_to_camel(p["name"])
                lines.append(f"    if ({camel} !== undefined) (Array.isArray({camel}) ? {camel} : [{camel}]).forEach(v => query.append('{p['name']}', v));")
            lines.append("    const qs = query.toString();")
            lines.append("    if (qs) path += '?' + qs;")
        else:
            lines.append(f"    const path = {tmpl};")

        preamble, body_expr = self._js_body_build(request_body, "application/json", "    ", serialize=False)
        lines.extend(preamble)
        if body_expr is None:
            lines.append(f"    const {{ data }} = await this._ctx.client.request(path, '{ep['method']}', this._ctx.accessToken, this._ctx.refreshToken);")
        else:
            lines.append(f"    const {{ data }} = await this._ctx.client.request(path, '{ep['method']}', this._ctx.accessToken, this._ctx.refreshToken, {body_expr});")
        lines.append("    return data;")
        lines.append("  }")
        return lines

    def _emit_unauth_method(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict]) -> list[str]:
        method = ep["method"]
        path_args = [self.snake_to_camel(p["name"]) for p in path_params]
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"

        sig_parts = list(path_args)
        sig_parts.extend(self._js_body_sig_tokens(request_body))
        if query_params:
            q_names = [self.snake_to_camel(p["name"]) for p in query_params]
            sig_parts.append("{ " + ", ".join(q_names) + " } = {}")

        lines = [f"  async {func_name}({', '.join(sig_parts)}) {{"]
        tmpl = self._path_template(ep["path"], path_params)

        if query_params:
            lines.append(f"    let path = {tmpl};")
            lines.append("    const query = new URLSearchParams();")
            for p in query_params:
                camel = self.snake_to_camel(p["name"])
                lines.append(f"    if ({camel} !== undefined) (Array.isArray({camel}) ? {camel} : [{camel}]).forEach(v => query.append('{p['name']}', v));")
            lines.append("    const qs = query.toString();")
            lines.append("    if (qs) path += '?' + qs;")
            url_expr = "this._ctx.baseUrl + path"
        else:
            url_expr = f"this._ctx.baseUrl + {tmpl}"

        if request_body:
            preamble, body_expr = self._js_body_build(request_body, content_type, "    ")
            lines.extend(preamble)
            lines.append(f"    const resp = await fetch({url_expr}, {{")
            lines.append(f"      method: '{method}',")
            lines.append(f"      headers: {{ 'Content-Type': '{content_type}' }},")
            lines.append(f"      body: {body_expr},")
            lines.append("    });")
        else:
            lines.append(f"    const resp = await fetch({url_expr}, {{ method: '{method}' }});")

        lines.append("    return handleResponse(resp);")
        lines.append("  }")
        return lines

    def _emit_alt_host_method(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict], header_params: list[dict]) -> list[str]:
        """Emit method for endpoints on a non-default API host (e.g. photo_upload)."""
        method = ep["method"]
        api_host = ep["api_host"]
        host_key = self.snake_to_camel(api_host)
        path_args = [self.snake_to_camel(p["name"]) for p in path_params]
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"

        required_headers = [p for p in header_params if p.get("required")]
        optional_headers = [p for p in header_params if not p.get("required")]

        sig_parts = list(path_args)
        for p in required_headers:
            sig_parts.append(self.header_to_param(p["name"]))
        sig_parts.extend(self._js_body_sig_tokens(request_body))
        if optional_headers:
            opt_names = [self.header_to_param(p["name"]) for p in optional_headers]
            sig_parts.append("{ " + ", ".join(opt_names) + " } = {}")
        if query_params:
            q_names = [self.snake_to_camel(p["name"]) for p in query_params]
            sig_parts.append("{ " + ", ".join(q_names) + " } = {}")

        lines = [f"  async {func_name}({', '.join(sig_parts)}) {{"]
        lines.append("    this._ctx.requireTokens();")
        lines.append(f"    const baseUrl = this._ctx.requireHost('{host_key}');")
        tmpl = self._path_template(ep["path"], path_params)

        # Build headers object
        lines.append("    const headers = {")
        lines.append(f"      'Content-Type': '{content_type}',")
        lines.append("      'Authorization': this._ctx.accessToken,")
        for p in required_headers:
            param = self.header_to_param(p["name"])
            lines.append(f"      '{p['name']}': {param},")
        lines.append("    };")
        if optional_headers:
            for p in optional_headers:
                param = self.header_to_param(p["name"])
                lines.append(f"    if ({param} !== undefined) headers['{p['name']}'] = {param};")

        # Build path with query params
        if query_params:
            lines.append(f"    let path = {tmpl};")
            lines.append("    const query = new URLSearchParams();")
            for p in query_params:
                camel = self.snake_to_camel(p["name"])
                lines.append(f"    if ({camel} !== undefined) (Array.isArray({camel}) ? {camel} : [{camel}]).forEach(v => query.append('{p['name']}', v));")
            lines.append("    const qs = query.toString();")
            lines.append("    if (qs) path += '?' + qs;")
            fetch_url = "baseUrl + path"
        else:
            fetch_url = f"baseUrl + {tmpl}"

        # Build fetch call
        preamble, body_str = self._js_body_build(request_body, content_type, "    ")
        lines.extend(preamble)

        lines.append(f"    const resp = await fetch({fetch_url}, {{")
        lines.append(f"      method: '{method}',")
        lines.append("      headers,")
        if body_str:
            lines.append(f"      body: {body_str},")
        lines.append("    });")
        lines.append("    return handleResponse(resp);")
        lines.append("  }")
        return lines

    # ── composites ─────────────────────────────────────────────────────────

    def _emit_composite_method(self, comp: dict, sibling_eps: list[dict] | None = None) -> list[str]:
        func_name = self.snake_to_camel(comp["function_name"])
        params = comp.get("params", [])
        steps = comp.get("steps", [])

        sig_parts = []
        for p in params:
            sig_parts.append(self.snake_to_camel(p["name"]))

        lines = [f"  async {func_name}({', '.join(sig_parts)}) {{"]
        lines.append("    this._ctx.requireTokens();")

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
                    lines.extend(self._emit_composite_once_utility_step(step_id, util, input_map, output_as, cache, comp))
                elif execution == "for_each":
                    lines.extend(self._emit_composite_foreach_utility_step(
                        step_id, util, input_map, output_as, on_error,
                        step["for_each_over"], step["for_each_as"], comp,
                    ))
                continue

            ep = step["endpoint"]
            if execution == "once":
                lines.extend(self._emit_composite_once_step(step_id, ep, input_map, output_as, cache, comp, sibling_eps))
            elif execution == "for_each":
                for_each_over = step["for_each_over"]
                for_each_as = step["for_each_as"]
                lines.extend(self._emit_composite_foreach_step(
                    step_id, ep, input_map, output_as, on_error,
                    for_each_over, for_each_as, comp,
                ))

        # return statement
        returns = comp.get("returns")
        if returns:
            lines.append("")
            ret_var = self._resolve_js_expr(returns, comp)
            last_step = steps[-1] if steps else None
            if last_step and last_step.get("on_error") == "collect":
                lines.append(f"    return {{ results: {ret_var}, errors: {ret_var}Errors }};")
            else:
                lines.append(f"    return {ret_var};")

        lines.append("  }")
        return lines

    def _emit_composite_once_step(self, step_id: str, ep: dict, input_map: dict, output_as: str | None, cache: dict, comp: dict, sibling_eps: list[dict] | None = None) -> list[str]:
        lines = []
        var = output_as or step_id
        cache_enabled = cache.get("enabled", False)

        if cache_enabled:
            cache_key_expr = self._resolve_js_cache_key(cache["key"], comp)
            cache_name = f"_{step_id}"
            lines.append(f"    if (!this._caches['{cache_name}']) this._caches['{cache_name}'] = new Map();")
            lines.append(f"    const _cacheKey_{step_id} = {cache_key_expr};")
            lines.append(f"    let {var} = this._caches['{cache_name}'].get(_cacheKey_{step_id});")
            lines.append(f"    if ({var} === undefined) {{")
            indent = "      "
            needs_decl = False
        else:
            indent = "    "
            needs_decl = True

        step_ctrl = ep.get("controller", "").replace(" ", "_")
        comp_ctrl = comp.get("controller", "").replace(" ", "_")
        if step_ctrl == comp_ctrl and sibling_eps:
            sibling = next((e for e in sibling_eps if e["function_name"] == ep["function_name"]), None)
            if not sibling:
                raise ValueError(f"Composite step references '{ep['function_name']}' on {comp_ctrl} but no sibling endpoint found")
            method_name = self.snake_to_camel(sibling["function_name"])
            call_args = self._build_sibling_call_args(sibling, input_map, comp)
            decl = "const " if needs_decl else ""
            lines.append(f"{indent}{decl}{var} = await this.{method_name}({call_args});")
        elif ep.get("auth") == "required" and not ep.get("api_host"):
            lines.extend(self._emit_call_auth_endpoint(ep, input_map, var, comp, indent, declare=needs_decl))
        else:
            lines.extend(self._emit_call_alt_host_endpoint(ep, input_map, var, comp, indent, declare=needs_decl))

        if cache_enabled:
            lines.append(f"      this._caches['{cache_name}'].set(_cacheKey_{step_id}, {var});")
            lines.append("    }")

        return lines

    def _build_sibling_call_args(self, ep: dict, input_map: dict, comp: dict) -> str:
        """Build argument list for calling a sibling method, matching its signature order."""
        args: list[str] = []
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        query_params = [p for p in ep["params"] if p["in"] == "query"]
        header_params = [p for p in ep["params"] if p["in"] == "header"]
        request_body = ep.get("request_body")

        resolve = lambda mapped: self._resolve_js_expr(mapped, comp) if mapped else "undefined"

        if ep.get("api_host"):
            # alt-host signature: path, required headers, body, optional headers
            for p in path_params:
                args.append(resolve(input_map.get(p["name"])))
            for p in header_params:
                if p.get("required"):
                    args.append(resolve(input_map.get(p["name"])))
            if self._body_shape(request_body) == "flat_dict":
                fields = self._flatten_body(request_body)
                parts = []
                for snake_key, camel_key in fields:
                    val = resolve(input_map.get(snake_key))
                    parts.append(f"{_js_safe(camel_key)}: {val}")
                args.append("{ " + ", ".join(parts) + " }")
            opt = [p for p in header_params if not p.get("required")]
            if opt:
                parts = []
                for p in opt:
                    mapped = input_map.get(p["name"])
                    if mapped:
                        parts.append(f"{self.header_to_param(p['name'])}: {resolve(mapped)}")
                if parts:
                    args.append("{ " + ", ".join(parts) + " }")
        elif ep.get("auth") == "required":
            # auth signature: path, body, query
            for p in path_params:
                args.append(resolve(input_map.get(p["name"])))
            if self._body_shape(request_body) == "flat_dict":
                fields = self._flatten_body(request_body)
                parts = []
                for snake_key, camel_key in fields:
                    val = resolve(input_map.get(snake_key))
                    parts.append(f"{_js_safe(camel_key)}: {val}")
                args.append("{ " + ", ".join(parts) + " }")
            if query_params:
                parts = []
                for p in query_params:
                    mapped = input_map.get(p["name"])
                    if mapped:
                        parts.append(f"{self.snake_to_camel(p['name'])}: {resolve(mapped)}")
                if parts:
                    args.append("{ " + ", ".join(parts) + " }")

        return ", ".join(args)

    def _emit_call_auth_endpoint(self, ep: dict, input_map: dict, var: str, comp: dict, indent: str, declare: bool = False) -> list[str]:
        """Emit a call to an auth endpoint via the context's client."""
        lines = []
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        query_params = [p for p in ep["params"] if p["in"] == "query"]

        # Build the path inline
        path = ep["path"]
        for p in path_params:
            mapped = input_map.get(p["name"], "undefined")
            val = self._resolve_js_expr(mapped, comp)
            path = path.replace("{" + p["name"] + "}", f"${{encodeURIComponent({val})}}")
        path_str = f"`{path}`"

        # Query params
        if query_params:
            lines.append(f"{indent}let _path = {path_str};")
            lines.append(f"{indent}const _q = new URLSearchParams();")
            for p in query_params:
                mapped = input_map.get(p["name"])
                if mapped:
                    val = self._resolve_js_expr(mapped, comp)
                    lines.append(f"{indent}if ({self._optional_check_expr(val)}) (Array.isArray({val}) ? {val} : [{val}]).forEach(v => _q.append('{p['name']}', v));")
            lines.append(f"{indent}const _qs = _q.toString();")
            lines.append(f"{indent}if (_qs) _path += '?' + _qs;")
            path_ref = "_path"
        else:
            path_ref = path_str

        decl = "const " if declare else ""
        lines.append(f"{indent}{decl}{var} = (await this._ctx.client.request({path_ref}, '{ep['method']}', this._ctx.accessToken, this._ctx.refreshToken)).data;")
        return lines

    def _emit_call_alt_host_endpoint(self, ep: dict, input_map: dict, var: str, comp: dict, indent: str, declare: bool = False) -> list[str]:
        """Emit an inline fetch call for alt-host endpoints (photo_upload, etc.)."""
        lines = []
        method = ep["method"]
        api_host = ep.get("api_host", "")
        host_key = self.snake_to_camel(api_host)
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        header_params = [p for p in ep["params"] if p["in"] == "header"]
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"

        # resolve host
        lines.append(f"{indent}const _baseUrl_{var} = this._ctx.requireHost('{host_key}');")

        # build path
        path = ep["path"]
        for p in path_params:
            mapped = input_map.get(p["name"], "undefined")
            val = self._resolve_js_expr(mapped, comp)
            path = path.replace("{" + p["name"] + "}", f"${{encodeURIComponent({val})}}")
        path_str = f"`{path}`"

        # build headers
        lines.append(f"{indent}const _headers_{var} = {{")
        lines.append(f"{indent}  'Content-Type': '{content_type}',")
        lines.append(f"{indent}  'Authorization': this._ctx.accessToken,")
        for p in header_params:
            if p.get("required"):
                mapped = input_map.get(p["name"])
                if mapped:
                    val = self._resolve_js_expr(mapped, comp)
                    lines.append(f"{indent}  '{p['name']}': String({val}),")
        lines.append(f"{indent}}};")
        # optional headers
        for p in header_params:
            if not p.get("required"):
                mapped = input_map.get(p["name"])
                if mapped:
                    val = self._resolve_js_expr(mapped, comp)
                    lines.append(f"{indent}if ({self._optional_check_expr(val)}) _headers_{var}['{p['name']}'] = String({val});")

        # build body
        body_str = None
        if self._body_shape(request_body) == "flat_dict":
            fields = self._flatten_body(request_body)
            field_strs = []
            for snake_key, _ in fields:
                mapped = input_map.get(snake_key)
                if mapped:
                    val = self._resolve_js_expr(mapped, comp)
                    field_strs.append(f"{snake_key}: {val}")
            body_str = "JSON.stringify({ " + ", ".join(field_strs) + " })"

        lines.append(f"{indent}const _resp_{var} = await fetch(_baseUrl_{var} + {path_str}, {{")
        lines.append(f"{indent}  method: '{method}',")
        lines.append(f"{indent}  headers: _headers_{var},")
        if body_str:
            lines.append(f"{indent}  body: {body_str},")
        lines.append(f"{indent}}});")
        decl = "const " if declare else ""
        lines.append(f"{indent}{decl}{var} = await handleResponse(_resp_{var});")
        return lines

    def _emit_composite_foreach_step(self, step_id: str, ep: dict, input_map: dict, output_as: str | None, on_error: str, for_each_over: str, for_each_as: str, comp: dict) -> list[str]:
        lines = []
        var = output_as or step_id
        arr_expr = self._resolve_js_expr(for_each_over, comp)
        item = for_each_as

        lines.append(f"    const {var} = [];")
        if on_error == "collect":
            lines.append(f"    const {var}Errors = [];")
        lines.append(f"    for (let _index = 0; _index < {arr_expr}.length; _index++) {{")
        lines.append(f"      const {item} = {arr_expr}[_index];")

        if on_error in ("collect", "continue"):
            lines.append("      try {")
            inner_indent = "        "
        else:
            inner_indent = "      "

        if ep.get("api_host"):
            lines.extend(self._emit_inline_foreach_fetch(ep, input_map, var, comp, item, inner_indent))
        elif ep.get("auth") == "required":
            lines.extend(self._emit_inline_foreach_call(ep, input_map, var, comp, item, inner_indent))
        else:
            lines.extend(self._emit_inline_foreach_fetch(ep, input_map, var, comp, item, inner_indent))

        if on_error == "collect":
            lines.append("      } catch (_err) {")
            lines.append(f"        {var}Errors.push({{ index: _index, error: _err }});")
            lines.append("      }")
        elif on_error == "continue":
            lines.append("      } catch (_err) {")
            lines.append("        // skip failed item")
            lines.append("      }")

        lines.append("    }")
        return lines

    def _emit_composite_once_utility_step(self, step_id: str, util: dict, input_map: dict, output_as: str | None, cache: dict, comp: dict) -> list[str]:
        lines: list[str] = []
        var = output_as or step_id
        cache_enabled = cache.get("enabled", False)
        if cache_enabled:
            cache_key_expr = self._resolve_js_cache_key(cache["key"], comp)
            cache_name = f"_{step_id}"
            lines.append(f"    if (!this._caches['{cache_name}']) this._caches['{cache_name}'] = new Map();")
            lines.append(f"    const _cacheKey_{step_id} = {cache_key_expr};")
            lines.append(f"    let {var} = this._caches['{cache_name}'].get(_cacheKey_{step_id});")
            lines.append(f"    if ({var} === undefined) {{")
            call = self._js_utility_call(util, input_map, comp, loop_var=None)
            lines.append(f"      {var} = {call};")
            lines.append(f"      this._caches['{cache_name}'].set(_cacheKey_{step_id}, {var});")
            lines.append("    }")
        else:
            call = self._js_utility_call(util, input_map, comp, loop_var=None)
            lines.append(f"    const {var} = {call};")
        return lines

    def _emit_composite_foreach_utility_step(self, step_id: str, util: dict, input_map: dict, output_as: str | None, on_error: str, for_each_over: str, for_each_as: str, comp: dict) -> list[str]:
        lines: list[str] = []
        var = output_as or step_id
        arr_expr = self._resolve_js_expr(for_each_over, comp)
        item = for_each_as
        lines.append(f"    const {var} = [];")
        if on_error == "collect":
            lines.append(f"    const {var}Errors = [];")
        lines.append(f"    for (let _index = 0; _index < {arr_expr}.length; _index++) {{")
        lines.append(f"      const {item} = {arr_expr}[_index];")
        if on_error in ("collect", "continue"):
            lines.append("      try {")
            inner = "        "
        else:
            inner = "      "
        call = self._js_utility_call(util, input_map, comp, loop_var=item)
        lines.append(f"{inner}{var}.push({call});")
        if on_error == "collect":
            lines.append("      } catch (_err) {")
            lines.append(f"        {var}Errors.push({{ index: _index, error: _err }});")
            lines.append("      }")
        elif on_error == "continue":
            lines.append("      } catch (_err) {")
            lines.append("        // skip failed item")
            lines.append("      }")
        lines.append("    }")
        return lines

    def _js_utility_call(self, util: dict, input_map: dict, comp: dict, loop_var: str | None) -> str:
        fn_name = util["function_name"]["javascript"]
        is_async = bool((util.get("async") or {}).get("javascript"))
        args = []
        for p in util["params"]:
            mapped = input_map.get(p["name"])
            if mapped is None:
                args.append("undefined")
                continue
            if loop_var:
                args.append(self._resolve_js_expr_loop(mapped, comp, loop_var))
            else:
                args.append(self._resolve_js_expr(mapped, comp))
        await_kw = "await " if is_async else ""
        return f"{await_kw}this._ctx.utils.{fn_name}({', '.join(args)})"

    def _emit_inline_foreach_fetch(self, ep: dict, input_map: dict, results_var: str, comp: dict, item: str, indent: str) -> list[str]:
        """Inline a fetch call inside a for_each loop body."""
        lines = []
        method = ep["method"]
        api_host = ep.get("api_host")
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        header_params = [p for p in ep["params"] if p["in"] == "header"]
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"

        # resolve base URL
        if api_host:
            host_key = self.snake_to_camel(api_host)
            base_expr = f"this._ctx.requireHost('{host_key}')"
        else:
            base_expr = "this._ctx.baseUrl"

        path = ep["path"]
        for p in path_params:
            mapped = input_map.get(p["name"], "undefined")
            val = self._resolve_js_expr_loop(mapped, comp, item)
            path = path.replace("{" + p["name"] + "}", f"${{encodeURIComponent({val})}}")
        path_str = f"`{path}`"

        lines.append(f"{indent}const _hdrs = {{")
        lines.append(f"{indent}  'Content-Type': '{content_type}',")
        lines.append(f"{indent}  'Authorization': this._ctx.accessToken,")
        for p in header_params:
            if p.get("required"):
                mapped = input_map.get(p["name"])
                if mapped:
                    val = self._resolve_js_expr_loop(mapped, comp, item)
                    lines.append(f"{indent}  '{p['name']}': String({val}),")
        lines.append(f"{indent}}};")
        for p in header_params:
            if not p.get("required"):
                mapped = input_map.get(p["name"])
                if mapped:
                    val = self._resolve_js_expr_loop(mapped, comp, item)
                    lines.append(f"{indent}if ({self._optional_check_expr(val)}) _hdrs['{p['name']}'] = String({val});")

        body_str = None
        if self._body_shape(request_body) == "flat_dict":
            fields = self._flatten_body(request_body)
            field_strs = []
            for snake_key, _ in fields:
                mapped = input_map.get(snake_key)
                if mapped:
                    val = self._resolve_js_expr_loop(mapped, comp, item)
                    field_strs.append(f"{snake_key}: {val}")
            body_str = "JSON.stringify({ " + ", ".join(field_strs) + " })"

        lines.append(f"{indent}const _resp = await fetch({base_expr} + {path_str}, {{")
        lines.append(f"{indent}  method: '{method}',")
        lines.append(f"{indent}  headers: _hdrs,")
        if body_str:
            lines.append(f"{indent}  body: {body_str},")
        lines.append(f"{indent}}});")
        lines.append(f"{indent}{results_var}.push(await handleResponse(_resp));")
        return lines

    def _emit_inline_foreach_call(self, ep: dict, input_map: dict, results_var: str, comp: dict, item: str, indent: str) -> list[str]:
        """Emit an inline auth request inside a for_each loop."""
        lines = []
        path_params = [p for p in ep["params"] if p["in"] == "path"]

        path = ep["path"]
        for p in path_params:
            mapped = input_map.get(p["name"], "undefined")
            val = self._resolve_js_expr_loop(mapped, comp, item)
            path = path.replace("{" + p["name"] + "}", f"${{encodeURIComponent({val})}}")
        path_str = f"`{path}`"

        lines.append(f"{indent}{results_var}.push((await this._ctx.client.request({path_str}, '{ep['method']}', this._ctx.accessToken, this._ctx.refreshToken)).data);")
        return lines

    def _optional_check_expr(self, expr: str) -> str:
        return f"{expr} !== undefined"

    def _resolve_js_expr(self, expr: str, comp: dict) -> str:
        """Convert dot-path expression to JS variable reference."""
        if expr.startswith("params."):
            param_name = expr.split(".", 1)[1]
            parts = param_name.split(".", 1)
            if len(parts) == 2:
                return f"{self.snake_to_camel(parts[0])}.{self.snake_to_camel(parts[1])}"
            return self.snake_to_camel(param_name)
        if expr.startswith("steps."):
            parts = expr.split(".", 2)
            if len(parts) == 2:
                return parts[1]  # steps.template -> template
            return f"{parts[1]}.{parts[2]}"  # steps.template.bucket_name -> template.bucket_name
        return expr

    def _resolve_js_cache_key(self, expr: str, comp: dict) -> str:
        """Convert template cache-key string with {placeholders} to a JS template literal."""
        spans = re.split(r"\{([^}]+)\}", expr)
        if len(spans) == 1:
            raise ValueError(f"cache key must contain {{...}} placeholder: {expr!r}")
        out = []
        for i, span in enumerate(spans):
            if i % 2 == 0:
                out.append(span.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${"))
            else:
                out.append("${" + self._resolve_js_expr(span, comp) + "}")
        return "`" + "".join(out) + "`"

    def _resolve_js_expr_loop(self, expr: str, comp: dict, loop_var: str) -> str:
        """Convert dot-path expression to JS variable reference inside a for_each loop."""
        if expr == f"{loop_var}._index":
            return "_index"
        if expr.startswith(f"{loop_var}."):
            prop = expr.split(".", 1)[1]
            return f"{loop_var}.{self.snake_to_camel(prop)}"
        return self._resolve_js_expr(expr, comp)

    def _flatten_body(self, body: dict) -> list[tuple[str, str]]:
        """Extract field names from a legacy flat-dict request_body, returning [(snake_key, camelKey), ...]."""
        fields: list[tuple[str, str]] = []
        for field_name in body:
            camel = self.snake_to_camel(field_name)
            fields.append((field_name, camel))
        return fields

    # ── expanded-body signature + serialization helpers ───────────────────────

    def _js_body_sig_tokens(self, request_body) -> list[str]:
        """Return JS signature tokens for body params given a resolved request_body."""
        shape = self._body_shape(request_body)
        if shape is None:
            return []
        if shape == "scalar":
            return [_js_safe(request_body["param_name"])]
        if shape == "expanded":
            ordered = self._order_expanded_fields(self._expanded_fields(request_body))
            # All-optional expanded body → destructured options bag, so callers
            # can pass { field: value } instead of counting positional `undefined`s.
            if ordered and not any(f.get("required") for f in ordered):
                parts = []
                for f in ordered:
                    camel = f["name"]
                    safe = _js_safe(camel)
                    parts.append(camel if camel == safe else f"{camel}: {safe}")
                return ["{ " + ", ".join(parts) + " } = {}"]
            tokens = []
            for f in ordered:
                name = _js_safe(f["name"])
                if f.get("required"):
                    tokens.append(name)
                else:
                    tokens.append(f"{name} = undefined")
            return tokens
        if shape == "flat_dict":
            camels = [_js_safe(self.snake_to_camel(k)) for k in request_body.keys()]
            return ["{ " + ", ".join(camels) + " }"]
        if shape == "generic":
            return ["body = {}"]
        return []

    def _js_body_build(self, request_body, content_type: str, indent: str, *, serialize: bool = True) -> tuple[list[str], str | None]:
        """Return (preamble_lines, body_expr) for emitting the HTTP request body.

        body_expr is the JS expression to assign to fetch's `body:` field (or pass as
        the request payload); None if there is no body.

        When serialize=True (default, for native fetch call sites): JSON content is
        wrapped in JSON.stringify(...), form content in new URLSearchParams(...).toString().
        When serialize=False (for OAuth client.request call sites — auth path): returns
        the raw object/identifier expression, since the OAuth client serializes once
        on its own. Pass serialize=False at any auth-path call site that adds body
        support in the future, or the OAuth layer will double-encode.
        """
        shape = self._body_shape(request_body)
        if shape is None:
            return [], None
        is_form = content_type == "application/x-www-form-urlencoded"
        assert not (is_form and not serialize), "form-encoded body cannot flow through client.request"

        if shape == "scalar":
            name = _js_safe(request_body["param_name"])
            if is_form:
                return [], f"new URLSearchParams({name}).toString()"
            if not serialize:
                return [], name
            return [], f"JSON.stringify({name})"

        if shape == "expanded":
            fields = self._expanded_fields(request_body)
            lines = self._render_object_tree_js(self._group_fields_by_path(fields), indent)
            lines[0] = f"{indent}const body = " + lines[0].lstrip()
            lines[-1] = lines[-1] + ";"
            if is_form:
                return lines, "new URLSearchParams(body).toString()"
            if not serialize:
                return lines, "body"
            return lines, "JSON.stringify(body)"

        if shape == "flat_dict":
            fields = self._flatten_body(request_body)
            parts = []
            for snake, camel in fields:
                safe = _js_safe(camel)
                if snake == safe:
                    parts.append(safe)
                else:
                    parts.append(f"{snake}: {safe}")
            obj = "{ " + ", ".join(parts) + " }"
            if is_form:
                return [], f"new URLSearchParams({obj}).toString()"
            if not serialize:
                return [], obj
            return [], f"JSON.stringify({obj})"

        if shape == "generic":
            if is_form:
                return [], "new URLSearchParams(body).toString()"
            if not serialize:
                return [], "body"
            return [], "JSON.stringify(body)"

        return [], None

    def _render_object_tree_js(self, tree: dict, base_indent: str) -> list[str]:
        """Recursively render a field-path tree as a multi-line stripUndef(...) JS literal."""
        inner = base_indent + "  "
        lines = [base_indent + "stripUndef({"]
        for key, node in tree.items():
            if "_leaf" in node:
                f = node["_leaf"]
                lines.append(f"{inner}{key}: {_js_safe(f['name'])},")
            else:
                sub = self._render_object_tree_js(node, inner)
                lines.append(f"{inner}{key}: " + sub[0].lstrip())
                lines.extend(sub[1:-1])
                lines.append(sub[-1] + ",")
        lines.append(base_indent + "})")
        return lines
