from __future__ import annotations
import json
import os
import re
from .base import BaseGenerator
from naming import snake_to_camel as _snake_to_camel

_TYPE_MAP = {
    "string": "string", "integer": "int", "boolean": "bool", "number": "float",
    "str": "string", "int": "int", "bool": "bool", "float": "float",
    "datetime": "string", "emailstr": "string", "any": "mixed",
}


def _php_type(t) -> str:
    return _TYPE_MAP.get(str(t).lower() if t else "", "mixed")

def _php_nullable(t: str) -> str:
    """Wrap type as nullable. `mixed` already includes null in PHP 8+."""
    return t if t == "mixed" else f"?{t}"


class PhpGenerator(BaseGenerator):
    framework_name = "php"

    def generate(self, endpoints: list[dict], output_dir: str, composites: list[dict] | None = None, utilities: list[dict] | None = None) -> None:
        os.makedirs(output_dir, exist_ok=True)
        self.emit_errors_file(output_dir)
        groups = self.group_by_controller(endpoints)
        comp_groups = self.group_composites_by_controller(composites)
        all_groups = {}
        all_comp_groups = {}
        for controller, eps in groups.items():
            class_name = self.snake_to_pascal(controller)
            filename = class_name + ".php"
            comps = comp_groups.pop(controller, [])
            self.emit_controller_file(class_name, eps, os.path.join(output_dir, filename), composites=comps)
            all_groups[controller] = eps
            if comps:
                all_comp_groups[controller] = comps
        for controller, comps in comp_groups.items():
            class_name = self.snake_to_pascal(controller)
            filename = class_name + ".php"
            self.emit_controller_file(class_name, [], os.path.join(output_dir, filename), composites=comps)
            all_comp_groups[controller] = comps
        alt_hosts = self.collect_alt_hosts(endpoints, composites)
        self.emit_client_class(all_groups, all_comp_groups, alt_hosts, output_dir, utilities=utilities)
        reexport_files = self.reexport_all_modules(output_dir)
        self.emit_autoload_config(output_dir, reexport_files=reexport_files)

    def copy_module(self, module_name: str, module_root: str, output_dir: str) -> None:
        dst = self._copy_module_files(module_root, "php", module_name, output_dir)
        self._split_types_file(dst)

    def discover_module_exports(self, module_name: str, module_path: str) -> list[dict]:
        composer = os.path.join(module_path, "composer.json")
        if not os.path.isfile(composer):
            return []
        config = json.load(open(composer))
        psr4 = config.get("autoload", {}).get("psr-4", {})
        if not psr4:
            return []
        exports = []
        for namespace, src_dir in psr4.items():
            src_path = os.path.join(module_path, src_dir)
            if not os.path.isdir(src_path):
                continue
            for fname in sorted(os.listdir(src_path)):
                if not fname.endswith(".php"):
                    continue
                content = open(os.path.join(src_path, fname)).read()
                for m in re.finditer(
                    r'((?:(?:readonly|final|abstract)\s+)*)(class|enum|interface)\s+(\w+)',
                    content,
                ):
                    modifiers = m.group(1).strip()
                    psr4_match = fname == m.group(3) + ".php"
                    exports.append({
                        "name": m.group(3),
                        "kind": m.group(2),
                        "fqcn": namespace.rstrip("\\") + "\\" + m.group(3),
                        "modifiers": modifiers,
                        "file": os.path.join(src_path, fname),
                        "psr4": psr4_match,
                    })
        return exports

    def emit_reexports(self, module_name: str, exports: list[dict], output_dir: str) -> str | None:
        if not exports:
            return None
        filename = f"_{module_name}.php"
        lines = ["<?php", "// Auto-generated — do not edit", "namespace MediaVizSdk;", ""]
        for exp in exports:
            fqcn = "\\" + exp["fqcn"]
            needs_alias = "final" in exp.get("modifiers", "") or "readonly" in exp.get("modifiers", "")
            if exp["kind"] == "class":
                if needs_alias:
                    lines.append(f"\\class_alias({fqcn}::class, 'MediaVizSdk\\\\{exp['name']}');")
                else:
                    lines.append(f"class {exp['name']} extends {fqcn} {{}}")
            elif exp["kind"] == "interface":
                lines.append(f"interface {exp['name']} extends {fqcn} {{}}")
            elif exp["kind"] == "enum":
                lines.append(f"\\class_alias({fqcn}::class, 'MediaVizSdk\\\\{exp['name']}');")
        lines.append("")
        with open(os.path.join(output_dir, filename), "w") as f:
            f.write("\n".join(lines))
        return filename

    def emit_errors_file(self, output_dir: str) -> None:
        lines = [
            "<?php",
            "declare(strict_types=1);",
            "namespace MediaVizSdk;",
            "",
            "class ApiException extends \\Exception {",
            "    public function __construct(",
            "        string $message,",
            "        public readonly int $status,",
            "        public readonly ?string $requestId,",
            "        public readonly mixed $body,",
            "    ) {",
            "        parent::__construct($message, $status);",
            "    }",
            "}",
            "",
            "class ValidationException extends ApiException {",
            "    /** @var array<array{loc: string[], msg: string, type: string}> */",
            "    public readonly array $fieldErrors;",
            "",
            "    public function __construct(array $body, int $status, ?string $requestId) {",
            "        $detail = $body['detail'] ?? [];",
            "        if (is_array($detail) && isset($detail[0])) {",
            "            $message = implode('; ', array_map(",
            "                fn($d) => implode('.', $d['loc']) . ': ' . $d['msg'],",
            "                $detail",
            "            ));",
            "            $this->fieldErrors = array_map(",
            "                fn($d) => ['loc' => $d['loc'], 'msg' => $d['msg'], 'type' => $d['type']],",
            "                $detail",
            "            );",
            "        } else {",
            "            $message = is_string($detail) ? $detail : 'Validation failed';",
            "            $this->fieldErrors = [];",
            "        }",
            "        parent::__construct($message, $status, $requestId, $body);",
            "    }",
            "}",
            "",
            "class NotFoundException extends ApiException {",
            "    public function __construct(array $body, int $status, ?string $requestId) {",
            "        parent::__construct($body['detail'] ?? 'Resource not found', $status, $requestId, $body);",
            "    }",
            "}",
            "",
            "class RateLimitException extends ApiException {",
            "    public function __construct(",
            "        array $body,",
            "        int $status,",
            "        ?string $requestId,",
            "        public readonly ?int $retryAfter,",
            "    ) {",
            "        parent::__construct($body['detail'] ?? 'Rate limited', $status, $requestId, $body);",
            "    }",
            "}",
            "",
            "class ServerException extends ApiException {",
            "    public function __construct(array $body, int $status, ?string $requestId) {",
            "        parent::__construct($body['detail'] ?? 'Internal server error', $status, $requestId, $body);",
            "    }",
            "}",
            "",
            "function handleResponse(string $rawResponse, int $statusCode, array $headers): mixed {",
            "    $requestId = $headers['x-request-id'] ?? null;",
            "    $body = json_decode($rawResponse, true) ?? [];",
            "",
            "    if ($statusCode >= 200 && $statusCode < 300) {",
            "        return $body;",
            "    }",
            "",
            "    match(true) {",
            "        $statusCode === 422",
            "            => throw new ValidationException($body, $statusCode, $requestId),",
            "        $statusCode === 404",
            "            => throw new NotFoundException($body, $statusCode, $requestId),",
            "        $statusCode === 429",
            "            => throw new RateLimitException($body, $statusCode, $requestId, isset($headers['retry-after']) ? (int)$headers['retry-after'] : null),",
            "        $statusCode >= 500",
            "            => throw new ServerException($body, $statusCode, $requestId),",
            "        default",
            "            => throw new ApiException($body['detail'] ?? 'Unknown error', $statusCode, $requestId, $body),",
            "    };",
            "}",
            "",
        ]
        with open(os.path.join(output_dir, "Exceptions.php"), "w") as f:
            f.write("\n".join(lines))

    def emit_controller_file(self, class_name: str, endpoints: list[dict], filepath: str, composites: list[dict] | None = None) -> None:
        needs_errors = any(ep.get("auth") != "required" or ep.get("api_host") for ep in endpoints)
        for comp in (composites or []):
            for step in comp.get("steps", []):
                ep = step.get("endpoint", {})
                if ep.get("auth") != "required" or ep.get("api_host"):
                    needs_errors = True
        lines = ["<?php", "declare(strict_types=1);", "namespace MediaVizSdk;", ""]
        if needs_errors:
            lines.append("require_once __DIR__ . '/Exceptions.php';")
            lines.append("")
        # collect cache property names from composites
        cache_props = []
        for comp in (composites or []):
            for step in comp.get("steps", []):
                if step.get("cache", {}).get("enabled"):
                    cache_props.append(step["step_id"])

        lines.append("class " + class_name + " {")
        lines.append("    private object $ctx;")
        for prop in cache_props:
            lines.append(f"    private array $_{prop}Cache = [];")
        lines.append("")
        lines.append("    public function __construct(object $ctx) {")
        lines.append("        $this->ctx = $ctx;")
        lines.append("    }")
        for ep in endpoints:
            lines.append("")
            lines.extend(self._emit_method(ep))
        for comp in (composites or []):
            lines.append("")
            lines.extend(self._emit_composite_method(comp))
        if needs_errors:
            lines.append("")
            lines.append("    private static function parseHeaders(string $raw): array {")
            lines.append("        $headers = [];")
            lines.append("        foreach (explode(\"\\r\\n\", $raw) as $line) {")
            lines.append("            $parts = explode(':', $line, 2);")
            lines.append("            if (count($parts) === 2) {")
            lines.append("                $headers[strtolower(trim($parts[0]))] = trim($parts[1]);")
            lines.append("            }")
            lines.append("        }")
            lines.append("        return $headers;")
            lines.append("    }")
        lines.append("}")
        lines.append("")
        with open(filepath, "w") as f:
            f.write("\n".join(lines))

    @staticmethod
    def _to_prop_name(name: str) -> str:
        camel = _snake_to_camel(name)
        if not camel:
            return camel
        i = 0
        while i < len(camel) and camel[i].isupper():
            i += 1
        if i > 1:
            return camel[:i - 1].lower() + camel[i - 1:]
        return camel[0].lower() + camel[1:]

    def emit_client_class(self, groups: dict, comp_groups: dict, alt_hosts: set[str], output_dir: str, utilities: list[dict] | None = None) -> None:
        """Generate MediaVizClient.php — the top-level SDK client class."""
        controllers = []
        for controller in sorted(set(list(groups.keys()) + list(comp_groups.keys()))):
            class_name = self.snake_to_pascal(controller)
            prop_name = self._to_prop_name(controller)
            controllers.append((prop_name, class_name))

        host_keys = sorted(self.snake_to_camel(h) for h in alt_hosts)
        host_env_vars = {self.snake_to_camel(h): f"MEDIAVIZ_{h.upper()}_URL" for h in alt_hosts}

        lines = [
            "<?php",
            "declare(strict_types=1);",
            "namespace MediaVizSdk;",
            "",
        ]

        # _Context class
        lines.append("class _Context {")
        lines.append("    public object $client;")
        lines.append("    private MediaVizClient $_mv;")
        lines.append("")
        lines.append("    public function __construct(MediaVizClient $mv) {")
        lines.append("        $this->_mv = $mv;")
        lines.append("        $this->client = $mv->getTrackingClient();")
        lines.append("    }")
        lines.append("")
        lines.append("    public function __get(string $name): mixed {")
        lines.append("        return match($name) {")
        lines.append("            'accessToken' => $this->_mv->getAccessToken(),")
        lines.append("            'refreshToken' => $this->_mv->getRefreshToken(),")
        lines.append("            'baseUrl' => $this->_mv->getBaseUrl(),")
        lines.append("            default => null,")
        lines.append("        };")
        lines.append("    }")
        lines.append("")
        lines.append("    public function requireHost(string $key): string {")
        lines.append("        $url = $this->_mv->getHost($key);")
        lines.append("        if ($url === null) throw new \\RuntimeException(\"Host '{$key}' not configured.\");")
        lines.append("        return $url;")
        lines.append("    }")
        lines.append("")
        lines.append("    public function requireTokens(): void {")
        lines.append("        if ($this->_mv->getAccessToken() === null) {")
        lines.append("            throw new \\RuntimeException('Not authenticated. Call authenticate(), handleCallback(), or setTokens() first.');")
        lines.append("        }")
        lines.append("    }")
        lines.append("}")
        lines.append("")

        # _Utils class (from utilities/*.yaml) — emitted before _TokenTrackingClient so the
        # MediaVizClient field declaration references a known class.
        utils_emitted = self._emit_utils_class_php(lines, utilities)

        # _TokenTrackingClient
        lines.append("class _TokenTrackingClient {")
        lines.append("    private MediaVizClient $mv;")
        lines.append("    private object $inner;")
        lines.append("")
        lines.append("    public function __construct(MediaVizClient $mv, object $inner) {")
        lines.append("        $this->mv = $mv;")
        lines.append("        $this->inner = $inner;")
        lines.append("    }")
        lines.append("")
        lines.append("    public function request(string $url, string $method, string $accessToken, string $refreshToken, mixed $body = null): mixed {")
        lines.append("        $result = $this->inner->request($url, $method, $accessToken, $refreshToken, $body);")
        lines.append("        if (isset($result->updatedTokens) && $result->updatedTokens !== null) {")
        lines.append("            $this->mv->setTokens($result->updatedTokens->accessToken, $result->updatedTokens->refreshToken);")
        lines.append("            $cb = $this->mv->getOnTokenRefresh();")
        lines.append("            if ($cb !== null) ($cb)($result->updatedTokens);")
        lines.append("        }")
        lines.append("        return $result;")
        lines.append("    }")
        lines.append("")
        lines.append("    public function __call(string $method, array $args): mixed {")
        lines.append("        return $this->inner->$method(...$args);")
        lines.append("    }")
        lines.append("}")
        lines.append("")

        # MediaVizClient class
        lines.append("class MediaVizClient {")
        lines.append("    private array $config;")
        lines.append("    private array $hosts;")
        lines.append("    private ?string $accessToken;")
        lines.append("    private ?string $refreshToken;")
        lines.append("    private ?\\Closure $onTokenRefresh;")
        lines.append("    private object $oauthClient;")
        lines.append("    private _TokenTrackingClient $trackingClient;")
        lines.append("")
        for prop, cls in controllers:
            lines.append(f"    public readonly {cls} ${prop};")
        if utils_emitted:
            lines.append("    public readonly _Utils $utils;")
        lines.append("")

        # Constructor
        lines.append("    public function __construct(array $config = []) {")
        lines.append("        $this->config = [")
        lines.append("            'clientId' => $config['clientId'] ?? (getenv('MEDIAVIZ_CLIENT_ID') ?: null),")
        lines.append("            'clientSecret' => $config['clientSecret'] ?? (getenv('MEDIAVIZ_CLIENT_SECRET') ?: null),")
        lines.append("            'baseUrl' => $config['baseUrl'] ?? (getenv('MEDIAVIZ_BASE_URL') ?: 'https://api.mediaviz.com'),")
        lines.append("            'redirectUri' => $config['redirectUri'] ?? (getenv('MEDIAVIZ_REDIRECT_URI') ?: null),")
        lines.append("        ];")
        lines.append("        $this->hosts = [")
        for hk in host_keys:
            env_var = host_env_vars.get(hk, f"MEDIAVIZ_{hk.upper()}_URL")
            lines.append(f"            '{hk}' => $config['hosts']['{hk}'] ?? (getenv('{env_var}') ?: null),")
        lines.append("        ] + ($config['hosts'] ?? []);")
        lines.append("        $this->accessToken = $config['accessToken'] ?? null;")
        lines.append("        $this->refreshToken = $config['refreshToken'] ?? null;")
        lines.append("        $this->onTokenRefresh = $config['onTokenRefresh'] ?? null;")
        lines.append("")
        lines.append("        $this->oauthClient = new \\OAuthSdk\\OAuthClient(")
        lines.append("            new \\OAuthSdk\\OAuthClientConfig(")
        lines.append("                clientId: $this->config['clientId'],")
        lines.append("                clientSecret: $this->config['clientSecret'],")
        lines.append("                baseUrl: $this->config['baseUrl'],")
        lines.append("                redirectUri: $this->config['redirectUri'],")
        lines.append("            )")
        lines.append("        );")
        lines.append("        $this->trackingClient = new _TokenTrackingClient($this, $this->oauthClient);")
        lines.append("")
        lines.append("        $ctx = new _Context($this);")
        for prop, cls in controllers:
            lines.append(f"        $this->{prop} = new {cls}($ctx);")
        if utils_emitted:
            lines.append("        $this->utils = new _Utils($this);")
        lines.append("    }")

        # authenticate
        lines.append("")
        lines.append("    public function authenticate(): mixed {")
        lines.append("        $tokens = $this->oauthClient->getClientCredentialsToken();")
        lines.append("        $this->accessToken = $tokens->accessToken;")
        lines.append("        $this->refreshToken = $tokens->refreshToken ?? null;")
        lines.append("        return $tokens;")
        lines.append("    }")

        # getAuthorizationUrl
        lines.append("")
        lines.append("    public function getAuthorizationUrl(?string $state = null): mixed {")
        lines.append("        return $this->oauthClient->generateAuthorizationUrl($state);")
        lines.append("    }")

        # handleCallback
        lines.append("")
        lines.append("    public function handleCallback(string $code, string $codeVerifier): mixed {")
        lines.append("        $tokens = $this->oauthClient->exchangeCode($code, $codeVerifier);")
        lines.append("        $this->accessToken = $tokens->accessToken;")
        lines.append("        $this->refreshToken = $tokens->refreshToken;")
        lines.append("        return $tokens;")
        lines.append("    }")

        # setTokens
        lines.append("")
        lines.append("    public function setTokens(string $accessToken, string $refreshToken): void {")
        lines.append("        $this->accessToken = $accessToken;")
        lines.append("        $this->refreshToken = $refreshToken;")
        lines.append("    }")

        # getters
        lines.append("")
        lines.append("    public function getAccessToken(): ?string { return $this->accessToken; }")
        lines.append("    public function getRefreshToken(): ?string { return $this->refreshToken; }")
        lines.append("    public function getBaseUrl(): string { return $this->config['baseUrl']; }")
        lines.append("    public function getHost(string $key): ?string { return $this->hosts[$key] ?? null; }")
        lines.append("    public function getTrackingClient(): _TokenTrackingClient { return $this->trackingClient; }")
        lines.append("    public function getOnTokenRefresh(): ?\\Closure { return $this->onTokenRefresh; }")
        if utils_emitted:
            lines.append("    public function getOAuthClient(): object { return $this->oauthClient; }")
        lines.append("}")
        lines.append("")

        with open(os.path.join(output_dir, "MediaVizClient.php"), "w") as f:
            f.write("\n".join(lines))

    def _emit_utils_class_php(self, lines: list[str], utilities: list[dict] | None) -> bool:
        """Emit a `_Utils` class; returns True if utilities were present and emitted."""
        if not utilities or not any(m.get("utilities") for m in utilities):
            return False
        lines.append("class _Utils {")
        lines.append("    private MediaVizClient $_mv;")
        lines.append("    public function __construct(MediaVizClient $mv) { $this->_mv = $mv; }")
        for module in utilities:
            source_module = module["source_module"]
            inner_expr = self._php_inner_expr(source_module)
            for util in module["utilities"]:
                fn_name = util["function_name"]["php"]
                target = util["target"]["php"]
                sig_parts = []
                call_parts = []
                for p in util["params"]:
                    var = "$" + self.snake_to_camel(p["name"])
                    sig_parts.append(f"{_php_type(p.get('type'))} {var}")
                    call_parts.append(var)
                sig = ", ".join(sig_parts)
                call = ", ".join(call_parts)
                lines.append(f"    public function {fn_name}({sig}): mixed {{")
                if util.get("requires_tokens"):
                    lines.append("        if ($this->_mv->getAccessToken() === null) {")
                    lines.append("            throw new \\RuntimeException('Not authenticated. Call authenticate(), handleCallback(), or setTokens() first.');")
                    lines.append("        }")
                lines.append(f"        return {inner_expr}->{target}({call});")
                lines.append("    }")
        lines.append("}")
        lines.append("")
        return True

    @staticmethod
    def _php_inner_expr(source_module: str) -> str:
        if source_module == "oauth":
            return "$this->_mv->getOAuthClient()"
        raise ValueError(f"Unsupported utilities source_module: {source_module!r}")

    def emit_autoload_config(self, output_dir: str, reexport_files: list[str] | None = None) -> None:
        config = {
            "name": "mediaviz/sdk",
            "require": {},
            "autoload": {
                "psr-4": {"MediaVizSdk\\": "./"}
            },
        }
        for mod in self._copied_modules:
            composer_path = os.path.join(mod["path"], "composer.json")
            if not os.path.isfile(composer_path):
                continue
            mod_config = json.load(open(composer_path))
            for ns, src in mod_config.get("autoload", {}).get("psr-4", {}).items():
                config["autoload"]["psr-4"][ns] = f"./{mod['name']}/{src}"
            for f in mod_config.get("autoload", {}).get("files", []):
                config["autoload"].setdefault("files", []).append(f"./{mod['name']}/{f}")
            for pkg, constraint in mod_config.get("require", {}).items():
                if pkg not in config["require"]:
                    config["require"][pkg] = constraint
        if not config["require"]:
            del config["require"]
        config["autoload"].setdefault("files", []).append("./Exceptions.php")
        config["autoload"]["files"].append("./MediaVizClient.php")
        if reexport_files:
            for f in reexport_files:
                config["autoload"].setdefault("files", []).append(f"./{f}")
        with open(os.path.join(output_dir, "composer.json"), "w") as f:
            json.dump(config, f, indent=2)
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

    def _emit_auth_method(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict]) -> list[str]:
        request_body = ep.get("request_body")
        sig_parts = []
        for p in path_params:
            sig_parts.append(f"{_php_type(p.get('type'))} ${self.snake_to_camel(p['name'])}")

        sig_parts.extend(self._php_body_sig_tokens(request_body))

        for p in query_params:
            t = _php_type(p.get("type"))
            camel = self.snake_to_camel(p["name"])
            sig_parts.append(f"{_php_nullable(t)} ${camel} = null")

        if len(sig_parts) > 2:
            indent = "        "
            sig = f"    public function {func_name}(\n"
            sig += ",\n".join(f"{indent}{s}" for s in sig_parts)
            sig += f"\n    ): mixed {{"
            lines = [sig]
        elif sig_parts:
            lines = [f"    public function {func_name}({', '.join(sig_parts)}): mixed {{"]
        else:
            lines = [f"    public function {func_name}(): mixed {{"]

        lines.append("        $this->ctx->requireTokens();")
        lines.extend(self._build_path(ep["path"], path_params, query_params, "auth"))

        preamble, body_expr = self._php_body_build(request_body, "application/json", "        ")
        lines.extend(preamble)
        if body_expr is None:
            lines.append(f"        return $this->ctx->client->request($path, '{ep['method']}', $this->ctx->accessToken, $this->ctx->refreshToken)->data;")
        else:
            lines.append(f"        return $this->ctx->client->request($path, '{ep['method']}', $this->ctx->accessToken, $this->ctx->refreshToken, {body_expr})->data;")
        lines.append("    }")
        return lines

    def _emit_unauth_method(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict]) -> list[str]:
        method = ep["method"]
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"
        sig_parts = []
        for p in path_params:
            sig_parts.append(f"{_php_type(p.get('type'))} ${self.snake_to_camel(p['name'])}")

        if request_body:
            sig_parts.extend(self._php_body_sig_tokens(request_body))
            if len(sig_parts) > 1:
                indent = "        "
                sig = f"    public function {func_name}(\n"
                sig += ",\n".join(f"{indent}{s}" for s in sig_parts)
                sig += "\n    ): mixed {"
            elif sig_parts:
                sig = f"    public function {func_name}({', '.join(sig_parts)}): mixed {{"
            else:
                sig = f"    public function {func_name}(): mixed {{"
            lines = [sig]
            lines.append("        $baseUrl = $this->ctx->baseUrl;")
            lines.extend(self._build_path(ep["path"], path_params, [], "unauth"))
            preamble, _ = self._php_body_build(request_body, content_type, "        ")
            lines.extend(preamble)
            lines.extend(self._curl_post(method, content_type))
        else:
            for p in query_params:
                t = _php_type(p.get("type"))
                camel = self.snake_to_camel(p["name"])
                sig_parts.append(f"{_php_nullable(t)} ${camel} = null")
            if sig_parts:
                lines = [f"    public function {func_name}({', '.join(sig_parts)}): mixed {{"]
            else:
                lines = [f"    public function {func_name}(): mixed {{"]
            lines.append("        $baseUrl = $this->ctx->baseUrl;")
            lines.extend(self._build_path(ep["path"], path_params, query_params, "unauth"))
            lines.append("        $ch = curl_init($baseUrl . $path);")
            lines.append("        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);")
            lines.append(f"        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '{method}');")
            lines.append("        curl_setopt($ch, CURLOPT_HEADER, true);")
            lines.append("        $raw = curl_exec($ch);")
            lines.append("        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);")
            lines.append("        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);")
            lines.append("        curl_close($ch);")
            lines.append("        $headers = self::parseHeaders(substr($raw, 0, $headerSize));")
            lines.append("        $body = substr($raw, $headerSize);")
            lines.append("        return handleResponse($body, $statusCode, $headers);")

        lines.append("    }")
        return lines

    def _emit_alt_host_method(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict], header_params: list[dict]) -> list[str]:
        """Emit method for endpoints on a non-default API host (e.g. photo_upload)."""
        method = ep["method"]
        api_host = ep["api_host"]
        host_key = self.snake_to_camel(api_host)
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"

        required_headers = [p for p in header_params if p.get("required")]
        optional_headers = [p for p in header_params if not p.get("required")]

        sig_parts = []
        for p in path_params:
            sig_parts.append(f"{_php_type(p.get('type'))} ${self.snake_to_camel(p['name'])}")
        for p in required_headers:
            sig_parts.append(f"string ${self.header_to_param(p['name'])}")

        sig_parts.extend(self._php_body_sig_tokens(request_body))

        for p in optional_headers:
            sig_parts.append(f"?string ${self.header_to_param(p['name'])} = null")
        for p in query_params:
            t = _php_type(p.get("type"))
            sig_parts.append(f"{_php_nullable(t)} ${self.snake_to_camel(p['name'])} = null")

        indent = "        "
        sig = f"    public function {func_name}(\n"
        sig += ",\n".join(f"{indent}{s}" for s in sig_parts)
        sig += "\n    ): mixed {"
        lines = [sig]

        lines.append("        $this->ctx->requireTokens();")
        lines.append(f"        $baseUrl = $this->ctx->requireHost('{host_key}');")
        lines.append("        $accessToken = $this->ctx->accessToken;")
        lines.extend(self._build_path(ep["path"], path_params, query_params, "unauth"))

        # Build headers array
        lines.append("        $headers = [")
        lines.append(f"            'Content-Type: {content_type}',")
        lines.append("            'Authorization: ' . $accessToken,")
        for p in required_headers:
            param = self.header_to_param(p["name"])
            lines.append(f"            '{p['name']}: ' . ${param},")
        lines.append("        ];")
        for p in optional_headers:
            param = self.header_to_param(p["name"])
            lines.append(f"        if (${param} !== null) $headers[] = '{p['name']}: ' . ${param};")

        # Build body
        preamble, _ = self._php_body_build(request_body, content_type, "        ")
        lines.extend(preamble)

        # cURL call
        lines.append("        $ch = curl_init();")
        lines.append("        curl_setopt($ch, CURLOPT_URL, $baseUrl . $path);")
        lines.append("        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);")
        lines.append(f"        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '{method}');")
        if request_body:
            if content_type == "application/x-www-form-urlencoded":
                lines.append("        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($body));")
            else:
                lines.append("        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));")
        lines.append("        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);")
        lines.append("        curl_setopt($ch, CURLOPT_HEADER, true);")
        lines.append("        $raw = curl_exec($ch);")
        lines.append("        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);")
        lines.append("        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);")
        lines.append("        curl_close($ch);")
        lines.append("        $headers = self::parseHeaders(substr($raw, 0, $headerSize));")
        lines.append("        $body = substr($raw, $headerSize);")
        lines.append("        return handleResponse($body, $statusCode, $headers);")
        lines.append("    }")
        return lines

    def _build_path(self, path: str, path_params: list[dict], query_params: list[dict], mode: str) -> list[str]:
        result = path
        for p in path_params:
            camel = self.snake_to_camel(p["name"])
            result = result.replace("{" + p["name"] + "}", f'" . rawurlencode((string)${camel}) . "')
        # Clean up leading/trailing concatenation artifacts
        php_path = f'"{result}"'
        php_path = php_path.replace(' . ""', "").replace('"" . ', "")
        if query_params:
            lines = [f"        $path = {php_path};"]
            lines.append("        $query = [];")
            for p in query_params:
                camel = self.snake_to_camel(p["name"])
                lines.append(f"        if (${camel} !== null) $query['{p['name']}'] = ${camel};")
            lines.append("        if ($query) $path .= '?' . http_build_query($query);")
        else:
            lines = [f"        $path = {php_path};"]
        return lines

    def _curl_post(self, method: str, content_type: str = "application/json") -> list[str]:
        if content_type == "application/x-www-form-urlencoded":
            encode_line = "        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($body));"
        else:
            encode_line = "        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));"
        return [
            "        $ch = curl_init();",
            "        curl_setopt($ch, CURLOPT_URL, $baseUrl . $path);",
            "        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);",
            f"        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '{method}');",
            encode_line,
            f"        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: {content_type}']);",
            "        curl_setopt($ch, CURLOPT_HEADER, true);",
            "        $raw = curl_exec($ch);",
            "        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);",
            "        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);",
            "        curl_close($ch);",
            "        $headers = self::parseHeaders(substr($raw, 0, $headerSize));",
            "        $body = substr($raw, $headerSize);",
            "        return handleResponse($body, $statusCode, $headers);",
        ]

    # ── composites ─────────────────────────────────────────────────────────

    def _emit_composite_method(self, comp: dict) -> list[str]:
        func_name = self.snake_to_camel(comp["function_name"])
        params = comp.get("params", [])
        steps = comp.get("steps", [])

        sig_parts = []
        for p in params:
            php_t = _php_type(p.get("type"))
            if php_t == "mixed" and p.get("type") == "list":
                php_t = "array"
            sig_parts.append(f"{php_t} ${self.snake_to_camel(p['name'])}")

        indent8 = "        "
        if sig_parts:
            sig = f"    public function {func_name}(\n"
            sig += ",\n".join(f"{indent8}{s}" for s in sig_parts)
            sig += "\n    ): array {"
        else:
            sig = f"    public function {func_name}(): array {{"
        lines = [sig]
        lines.append("        $this->ctx->requireTokens();")

        for step in steps:
            lines.append("")
            ep = step["endpoint"]
            step_id = step["step_id"]
            execution = step.get("execution", "once")
            cache = step.get("cache", {})
            input_map = step.get("input_map", {})
            output_as = step.get("output_as")
            on_error = step.get("on_error", "abort")

            if execution == "once":
                lines.extend(self._emit_php_once_step(step_id, ep, input_map, output_as, cache, comp))
            elif execution == "for_each":
                lines.extend(self._emit_php_foreach_step(
                    step_id, ep, input_map, output_as, on_error,
                    step["for_each_over"], step["for_each_as"], comp,
                ))

        returns = comp.get("returns")
        if returns:
            lines.append("")
            ret_var = self._resolve_php_expr(returns, comp)
            last_step = steps[-1] if steps else None
            if last_step and last_step.get("on_error") == "collect":
                lines.append(f"        return ['results' => {ret_var}, 'errors' => ${(last_step.get('output_as') or last_step['step_id'])}Errors];")
            else:
                lines.append(f"        return {ret_var};")

        lines.append("    }")
        return lines

    def _emit_php_once_step(self, step_id: str, ep: dict, input_map: dict, output_as: str | None, cache: dict, comp: dict) -> list[str]:
        lines = []
        var = output_as or step_id
        cache_enabled = cache.get("enabled", False)

        if cache_enabled:
            cache_key_expr = self._resolve_php_expr(cache["key"], comp)
            lines.append(f"        $_cacheKey = (string){cache_key_expr};")
            lines.append(f"        if (isset($this->_{step_id}Cache[$_cacheKey])) {{")
            lines.append(f"            ${var} = $this->_{step_id}Cache[$_cacheKey];")
            lines.append("        } else {")
            indent = "            "
        else:
            indent = "        "

        if ep.get("auth") == "required" and not ep.get("api_host"):
            lines.extend(self._emit_php_call_auth(ep, input_map, var, comp, indent))
        else:
            lines.extend(self._emit_php_inline_curl(ep, input_map, var, comp, indent))

        if cache_enabled:
            lines.append(f"            $this->_{step_id}Cache[$_cacheKey] = ${var};")
            lines.append("        }")

        return lines

    def _emit_php_call_auth(self, ep: dict, input_map: dict, var: str, comp: dict, indent: str) -> list[str]:
        lines = []
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        path = ep["path"]
        for p in path_params:
            mapped = input_map.get(p["name"], "'undefined'")
            val = self._resolve_php_expr(mapped, comp)
            path = path.replace("{" + p["name"] + "}", f'" . rawurlencode((string){val}) . "')
        php_path = f'"{path}"'
        php_path = php_path.replace(' . ""', "").replace('"" . ', "")
        lines.append(f"{indent}$_path = {php_path};")
        lines.append(f"{indent}${var} = $this->ctx->client->request($_path, '{ep['method']}', $this->ctx->accessToken, $this->ctx->refreshToken)->data;")
        return lines

    def _emit_php_inline_curl(self, ep: dict, input_map: dict, var: str, comp: dict, indent: str, loop_var: str | None = None) -> list[str]:
        lines = []
        method = ep["method"]
        api_host = ep.get("api_host")
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        header_params = [p for p in ep["params"] if p["in"] == "header"]
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"

        # resolve base URL from context
        if api_host:
            host_key = self.snake_to_camel(api_host)
            lines.append(f"{indent}$_baseUrl = $this->ctx->requireHost('{host_key}');")
        else:
            lines.append(f"{indent}$_baseUrl = $this->ctx->baseUrl;")

        path = ep["path"]
        for p in path_params:
            mapped = input_map.get(p["name"], "'undefined'")
            val = self._resolve_php_expr_loop(mapped, comp, loop_var) if loop_var else self._resolve_php_expr(mapped, comp)
            path = path.replace("{" + p["name"] + "}", f'" . rawurlencode((string){val}) . "')
        php_path = f'"{path}"'
        php_path = php_path.replace(' . ""', "").replace('"" . ', "")

        lines.append(f"{indent}$_headers = [")
        lines.append(f"{indent}    'Content-Type: {content_type}',")
        lines.append(f"{indent}    'Authorization: ' . $this->ctx->accessToken,")
        for p in header_params:
            if p.get("required"):
                mapped = input_map.get(p["name"])
                if mapped:
                    val = self._resolve_php_expr_loop(mapped, comp, loop_var) if loop_var else self._resolve_php_expr(mapped, comp)
                    lines.append(f"{indent}    '{p['name']}: ' . {val},")
        lines.append(f"{indent}];")
        for p in header_params:
            if not p.get("required"):
                mapped = input_map.get(p["name"])
                if mapped:
                    val = self._resolve_php_expr_loop(mapped, comp, loop_var) if loop_var else self._resolve_php_expr(mapped, comp)
                    lines.append(f"{indent}if ({self._optional_check_expr(val)}) $_headers[] = '{p['name']}: ' . {val};")

        if self._body_shape(request_body) == "flat_dict":
            fields = self._flatten_body(request_body)
            lines.append(f"{indent}$_body = [")
            for snake_key, _ in fields:
                mapped = input_map.get(snake_key)
                if mapped:
                    val = self._resolve_php_expr_loop(mapped, comp, loop_var) if loop_var else self._resolve_php_expr(mapped, comp)
                    lines.append(f"{indent}    '{snake_key}' => {val},")
            lines.append(f"{indent}];")

        lines.append(f"{indent}$_ch = curl_init();")
        lines.append(f"{indent}curl_setopt($_ch, CURLOPT_URL, $_baseUrl . {php_path});")
        lines.append(f"{indent}curl_setopt($_ch, CURLOPT_RETURNTRANSFER, true);")
        lines.append(f"{indent}curl_setopt($_ch, CURLOPT_CUSTOMREQUEST, '{method}');")
        if request_body:
            lines.append(f"{indent}curl_setopt($_ch, CURLOPT_POSTFIELDS, json_encode($_body));")
        lines.append(f"{indent}curl_setopt($_ch, CURLOPT_HTTPHEADER, $_headers);")
        lines.append(f"{indent}curl_setopt($_ch, CURLOPT_HEADER, true);")
        lines.append(f"{indent}$_raw = curl_exec($_ch);")
        lines.append(f"{indent}$_statusCode = curl_getinfo($_ch, CURLINFO_HTTP_CODE);")
        lines.append(f"{indent}$_headerSize = curl_getinfo($_ch, CURLINFO_HEADER_SIZE);")
        lines.append(f"{indent}curl_close($_ch);")
        lines.append(f"{indent}$_respHeaders = self::parseHeaders(substr($_raw, 0, $_headerSize));")
        lines.append(f"{indent}$_respBody = substr($_raw, $_headerSize);")
        lines.append(f"{indent}${var} = handleResponse($_respBody, $_statusCode, $_respHeaders);")
        return lines

    def _emit_php_foreach_step(self, step_id: str, ep: dict, input_map: dict, output_as: str | None, on_error: str, for_each_over: str, for_each_as: str, comp: dict) -> list[str]:
        lines = []
        var = output_as or step_id
        arr_expr = self._resolve_php_expr(for_each_over, comp)
        item = for_each_as

        lines.append(f"        ${var} = [];")
        if on_error == "collect":
            lines.append(f"        ${var}Errors = [];")
        lines.append(f"        foreach ({arr_expr} as $_index => ${item}) {{")

        if on_error in ("collect", "continue"):
            lines.append("            try {")
            inner_indent = "                "
        else:
            inner_indent = "            "

        if ep.get("api_host"):
            # inline curl, push result
            curl_lines = self._emit_php_inline_curl(ep, input_map, "_result", comp, inner_indent, loop_var=item)
            lines.extend(curl_lines)
            lines.append(f"{inner_indent}${var}[] = $_result;")
        elif ep.get("auth") == "required":
            auth_lines = self._emit_php_call_auth_loop(ep, input_map, var, comp, inner_indent, item)
            lines.extend(auth_lines)
        else:
            curl_lines = self._emit_php_inline_curl(ep, input_map, "_result", comp, inner_indent, loop_var=item)
            lines.extend(curl_lines)
            lines.append(f"{inner_indent}${var}[] = $_result;")

        if on_error == "collect":
            lines.append("            } catch (\\Exception $_err) {")
            lines.append(f"                ${var}Errors[] = ['index' => $_index, 'error' => $_err->getMessage()];")
            lines.append("            }")
        elif on_error == "continue":
            lines.append("            } catch (\\Exception $_err) {")
            lines.append("                // skip failed item")
            lines.append("            }")

        lines.append("        }")
        return lines

    def _emit_php_call_auth_loop(self, ep: dict, input_map: dict, results_var: str, comp: dict, indent: str, loop_var: str) -> list[str]:
        lines = []
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        path = ep["path"]
        for p in path_params:
            mapped = input_map.get(p["name"], "'undefined'")
            val = self._resolve_php_expr_loop(mapped, comp, loop_var)
            path = path.replace("{" + p["name"] + "}", f'" . rawurlencode((string){val}) . "')
        php_path = f'"{path}"'
        php_path = php_path.replace(' . ""', "").replace('"" . ', "")
        lines.append(f"{indent}$_path = {php_path};")
        lines.append(f"{indent}${results_var}[] = $this->ctx->client->request($_path, '{ep['method']}', $this->ctx->accessToken, $this->ctx->refreshToken)->data;")
        return lines

    def _optional_check_expr(self, expr: str) -> str:
        return f"({expr} ?? null) !== null"

    def _resolve_php_expr(self, expr: str, comp: dict) -> str:
        if expr.startswith("params."):
            param_name = expr.split(".", 1)[1]
            parts = param_name.split(".", 1)
            if len(parts) == 2:
                return f"${self.snake_to_camel(parts[0])}['{parts[1]}']"
            return f"${self.snake_to_camel(param_name)}"
        if expr.startswith("steps."):
            parts = expr.split(".", 2)
            if len(parts) == 2:
                return f"${parts[1]}"
            return f"${parts[1]}['{parts[2]}']"
        return f"'{expr}'"

    def _resolve_php_expr_loop(self, expr: str, comp: dict, loop_var: str | None) -> str:
        if loop_var and expr == f"{loop_var}._index":
            return "$_index"
        if loop_var and expr.startswith(f"{loop_var}."):
            prop = expr.split(".", 1)[1]
            return f"${loop_var}['{prop}']"
        return self._resolve_php_expr(expr, comp)

    def _flatten_body(self, body: dict) -> list[tuple[str, str]]:
        """Extract field names from a legacy flat-dict request_body, returning [(snake_key, camelKey), ...]."""
        fields: list[tuple[str, str]] = []
        for field_name in body:
            camel = self.snake_to_camel(field_name)
            fields.append((field_name, camel))
        return fields

    # ── expanded-body signature + serialization helpers ───────────────────────

    def _php_body_sig_tokens(self, request_body) -> list[str]:
        """Return PHP signature tokens for body params given a resolved request_body."""
        shape = self._body_shape(request_body)
        if shape is None:
            return []
        if shape == "scalar":
            name = request_body["param_name"]
            t = _php_type(request_body["type"])
            return [f"{t} ${name}"]
        if shape == "expanded":
            ordered = self._order_expanded_fields(self._expanded_fields(request_body))
            tokens = []
            for f in ordered:
                camel = f["name"]
                t = "array" if f.get("kind") == "list" else _php_type(f.get("type"))
                if f.get("required"):
                    tokens.append(f"{t} ${camel}")
                elif t == "mixed":
                    tokens.append(f"mixed ${camel} = null")
                else:
                    tokens.append(f"?{t} ${camel} = null")
            return tokens
        if shape == "flat_dict":
            fields = self._flatten_body(request_body)
            return [f"mixed ${camel}" for _, camel in fields]
        if shape == "generic":
            return ["array $body = []"]
        return []

    def _php_body_build(self, request_body, content_type: str, indent: str) -> tuple[list[str], str | None]:
        """Return (preamble_lines, body_expr) for assembling the PHP request body.

        Preamble sets up `$body` when appropriate; body_expr is the PHP expression
        to pass to the underlying request/curl call (typically `$body`).
        """
        shape = self._body_shape(request_body)
        if shape is None:
            return [], None
        if shape == "scalar":
            name = request_body["param_name"]
            return [f"{indent}$body = ${name};"], "$body"
        if shape == "expanded":
            fields = self._expanded_fields(request_body)
            tree = self._group_fields_by_path(fields)
            rendered = self._render_object_tree_php(tree, indent)
            rendered[0] = f"{indent}$body = " + rendered[0].lstrip()
            rendered[-1] = rendered[-1] + ";"
            return rendered, "$body"
        if shape == "flat_dict":
            fields = self._flatten_body(request_body)
            lines = [f"{indent}$body = ["]
            for snake_key, camel in fields:
                lines.append(f"{indent}    '{snake_key}' => ${camel},")
            lines.append(f"{indent}];")
            return lines, "$body"
        if shape == "generic":
            return [], "$body"
        return [], None

    def _render_object_tree_php(self, tree: dict, base_indent: str) -> list[str]:
        """Recursively render a field-path tree as a multi-line array_filter([...]) PHP literal."""
        inner = base_indent + "    "
        lines = [base_indent + "array_filter(["]
        for key, node in tree.items():
            if "_leaf" in node:
                f = node["_leaf"]
                lines.append(f"{inner}'{key}' => ${f['name']},")
            else:
                sub = self._render_object_tree_php(node, inner)
                lines.append(f"{inner}'{key}' => " + sub[0].lstrip())
                lines.extend(sub[1:-1])
                lines.append(sub[-1] + ",")
        lines.append(base_indent + "], fn($v) => $v !== null)")
        return lines

    def _split_types_file(self, module_path: str) -> None:
        """Split a monolithic Types.php into one file per class (PSR-4)."""
        composer_path = os.path.join(module_path, "composer.json")
        if not os.path.isfile(composer_path):
            return
        config = json.load(open(composer_path))
        psr4 = config.get("autoload", {}).get("psr-4", {})
        if not psr4:
            return

        for namespace, src_dir in psr4.items():
            types_path = os.path.join(module_path, src_dir, "Types.php")
            if not os.path.isfile(types_path):
                continue
            content = open(types_path).read()

            # Parse individual class blocks
            pattern = re.compile(
                r'((?:/\*\*[\s\S]*?\*/\s*)?'          # optional docblock
                r'(?:(?:readonly|final|abstract)\s+)*'  # modifiers
                r'(?:class|enum|interface)\s+\w+'       # declaration
                r'[\s\S]*?\n\})',                        # body through closing brace
            )
            classes = pattern.findall(content)
            if not classes:
                continue

            src_path = os.path.join(module_path, src_dir)
            ns = namespace.rstrip("\\")

            for class_block in classes:
                name_match = re.search(r'(?:class|enum|interface)\s+(\w+)', class_block)
                if not name_match:
                    continue
                class_name = name_match.group(1)
                file_content = (
                    "<?php\n\n"
                    "declare(strict_types=1);\n\n"
                    f"namespace {ns};\n\n"
                    f"{class_block}\n"
                )
                with open(os.path.join(src_path, f"{class_name}.php"), "w") as f:
                    f.write(file_content)

            os.remove(types_path)

            # Remove Types.php from composer.json files array
            files = config.get("autoload", {}).get("files", [])
            types_ref = f"{src_dir}Types.php"
            files = [f for f in files if f != types_ref]
            if files:
                config["autoload"]["files"] = files
            else:
                config["autoload"].pop("files", None)
            with open(composer_path, "w") as f:
                json.dump(config, f, indent=4)
                f.write("\n")
