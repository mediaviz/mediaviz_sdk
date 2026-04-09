from __future__ import annotations
import json
import os
import re
from .base import BaseGenerator

_TYPE_MAP = {"string": "string", "integer": "int", "boolean": "bool", "number": "float"}


def _php_type(t) -> str:
    return _TYPE_MAP.get(str(t).lower() if t else "", "mixed")

def _php_nullable(t: str) -> str:
    """Wrap type as nullable. `mixed` already includes null in PHP 8+."""
    return t if t == "mixed" else f"?{t}"


class PhpGenerator(BaseGenerator):
    framework_name = "php"

    def generate(self, endpoints: list[dict], output_dir: str) -> None:
        os.makedirs(output_dir, exist_ok=True)
        self.emit_errors_file(output_dir)
        groups = self.group_by_controller(endpoints)
        for controller, eps in groups.items():
            class_name = self.snake_to_pascal(controller)
            filename = class_name + ".php"
            self.emit_controller_file(class_name, eps, os.path.join(output_dir, filename))
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

    def emit_controller_file(self, class_name: str, endpoints: list[dict], filepath: str) -> None:
        needs_auth = any(ep.get("auth") == "required" and not ep.get("api_host") for ep in endpoints)
        needs_errors = any(ep.get("auth") != "required" or ep.get("api_host") for ep in endpoints)
        lines = ["<?php", "declare(strict_types=1);", "namespace MediaVizSdk;", ""]
        if needs_errors:
            lines.append("require_once __DIR__ . '/Exceptions.php';")
            lines.append("")
        if needs_auth:
            lines.append("class " + class_name + " {")
            lines.append(r"    private \OAuthSdk\OAuthClient $client;")
            lines.append("")
            lines.append(r"    public function __construct(\OAuthSdk\OAuthClient $client) {")
            lines.append("        $this->client = $client;")
            lines.append("    }")
        else:
            lines.append("class " + class_name + " {")
        for ep in endpoints:
            lines.append("")
            lines.extend(self._emit_method(ep))
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
        sig_parts = ["string $accessToken", "string $refreshToken"]
        for p in path_params:
            sig_parts.append(f"{_php_type(p.get('type'))} ${self.snake_to_camel(p['name'])}")

        body_fields = []
        has_generic_body = False
        is_model = isinstance(request_body, dict) and self._is_model_body(request_body)
        if is_model:
            sig_parts.append("array $body")
        elif isinstance(request_body, dict):
            body_fields = self._flatten_body(request_body)
            for _, camel_param in body_fields:
                sig_parts.append(f"mixed ${camel_param}")
        elif request_body:
            has_generic_body = True
            sig_parts.append("array $body = []")

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
        else:
            lines = [f"    public function {func_name}({', '.join(sig_parts)}): mixed {{"]

        lines.extend(self._build_path(ep["path"], path_params, query_params, "auth"))

        if is_model:
            lines.append(f"        return $this->client->request($path, '{ep['method']}', $accessToken, $refreshToken, $body)->data;")
        elif body_fields:
            lines.append("        $body = [")
            for snake_key, camel_param in body_fields:
                lines.append(f"            '{snake_key}' => ${camel_param},")
            lines.append("        ];")
            lines.append(f"        return $this->client->request($path, '{ep['method']}', $accessToken, $refreshToken, $body)->data;")
        elif has_generic_body:
            lines.append(f"        return $this->client->request($path, '{ep['method']}', $accessToken, $refreshToken, $body)->data;")
        else:
            lines.append(f"        return $this->client->request($path, '{ep['method']}', $accessToken, $refreshToken)->data;")
        lines.append("    }")
        return lines

    def _emit_unauth_method(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict]) -> list[str]:
        method = ep["method"]
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"
        sig_parts = ["string $baseUrl"]
        for p in path_params:
            sig_parts.append(f"{_php_type(p.get('type'))} ${self.snake_to_camel(p['name'])}")

        if isinstance(request_body, dict) and self._is_model_body(request_body):
            sig_parts.append("array $body")
            if len(sig_parts) > 1:
                indent = "        "
                sig = f"    public function {func_name}(\n"
                sig += ",\n".join(f"{indent}{s}" for s in sig_parts)
                sig += "\n    ): mixed {"
            else:
                sig = f"    public function {func_name}({', '.join(sig_parts)}): mixed {{"
            lines = [sig]
            lines.extend(self._build_path(ep["path"], path_params, [], "unauth"))
            lines.extend(self._curl_post(method, content_type))
        elif isinstance(request_body, dict):
            fields = self._flatten_body(request_body)
            for _, camel_param in fields:
                sig_parts.append(f"mixed ${camel_param}")
            if len(sig_parts) > 1:
                indent = "        "
                sig = f"    public function {func_name}(\n"
                sig += ",\n".join(f"{indent}{s}" for s in sig_parts)
                sig += "\n    ): mixed {"
            else:
                sig = f"    public function {func_name}({', '.join(sig_parts)}): mixed {{"
            lines = [sig]
            lines.extend(self._build_path(ep["path"], path_params, [], "unauth"))
            lines.append("        $body = [")
            for snake_key, camel_param in fields:
                lines.append(f"            '{snake_key}' => ${camel_param},")
            lines.append("        ];")
            lines.extend(self._curl_post(method, content_type))
        elif request_body:
            sig_parts.append("array $body = []")
            lines = [f"    public function {func_name}({', '.join(sig_parts)}): mixed {{"]
            lines.extend(self._build_path(ep["path"], path_params, [], "unauth"))
            lines.append("        $body = $body;")
            lines.extend(self._curl_post(method, content_type))
        else:
            for p in query_params:
                t = _php_type(p.get("type"))
                camel = self.snake_to_camel(p["name"])
                sig_parts.append(f"{_php_nullable(t)} ${camel} = null")
            lines = [f"    public function {func_name}({', '.join(sig_parts)}): mixed {{"]
            lines.extend(self._build_path(ep["path"], path_params, query_params, "unauth"))
            lines.append(f"        $ch = curl_init($baseUrl . $path);")
            lines.append(f"        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);")
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
        request_body = ep.get("request_body")
        content_type = ep.get("content_type") or "application/json"

        required_headers = [p for p in header_params if p.get("required")]
        optional_headers = [p for p in header_params if not p.get("required")]

        sig_parts = ["string $baseUrl", "string $accessToken"]
        for p in path_params:
            sig_parts.append(f"{_php_type(p.get('type'))} ${self.snake_to_camel(p['name'])}")
        for p in required_headers:
            sig_parts.append(f"string ${self.header_to_param(p['name'])}")

        body_fields = []
        is_model = isinstance(request_body, dict) and self._is_model_body(request_body)
        if is_model:
            sig_parts.append("array $body")
        elif isinstance(request_body, dict):
            body_fields = self._flatten_body(request_body)
            for _, camel_param in body_fields:
                sig_parts.append(f"mixed ${camel_param}")
        elif request_body:
            sig_parts.append("array $body = []")

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
        if is_model:
            pass  # $body already set from param
        elif body_fields:
            lines.append("        $body = [")
            for snake_key, camel_param in body_fields:
                lines.append(f"            '{snake_key}' => ${camel_param},")
            lines.append("        ];")

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
