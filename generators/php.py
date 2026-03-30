import json
import os
from .base import BaseGenerator

_TYPE_MAP = {"string": "string", "integer": "int", "boolean": "bool", "number": "float"}


def _php_type(t) -> str:
    return _TYPE_MAP.get(str(t).lower() if t else "", "mixed")


class PhpGenerator(BaseGenerator):
    framework_name = "php"

    def generate(self, endpoints: list[dict], output_dir: str) -> None:
        os.makedirs(output_dir, exist_ok=True)
        self.emit_errors_file(output_dir)
        groups = self.group_by_controller(endpoints)
        for controller, eps in groups.items():
            class_name = self.snake_to_pascal(controller) if "_" in controller else controller
            filename = class_name + ".php"
            self.emit_controller_file(class_name, eps, os.path.join(output_dir, filename))
        self.emit_autoload_config(output_dir)

    def copy_auth_wrapper(self, oauth_sdk_root: str, output_dir: str) -> None:
        self._copy_oauth(oauth_sdk_root, "php", output_dir)

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
        needs_auth = any(ep.get("auth") == "required" for ep in endpoints)
        needs_errors = any(ep.get("auth") != "required" for ep in endpoints)
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

    def emit_autoload_config(self, output_dir: str) -> None:
        config = {
            "name": "mediaviz/sdk",
            "autoload": {
                "psr-4": {"MediaVizSdk\\": "./"}
            }
        }
        with open(os.path.join(output_dir, "composer.json"), "w") as f:
            json.dump(config, f, indent=2)
            f.write("\n")

    # ── internal ──────────────────────────────────────────────────────────────

    def _emit_method(self, ep: dict) -> list[str]:
        func_name = self.snake_to_camel(ep["id"])
        path_params = [p for p in ep["params"] if p["in"] == "path"]
        query_params = [p for p in ep["params"] if p["in"] == "query"]
        if ep.get("auth") == "required":
            return self._emit_auth_method(func_name, ep, path_params, query_params)
        return self._emit_unauth_method(func_name, ep, path_params, query_params)

    def _emit_auth_method(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict]) -> list[str]:
        sig_parts = ["string $accessToken", "string $refreshToken"]
        for p in path_params:
            sig_parts.append(f"{_php_type(p.get('type'))} ${self.snake_to_camel(p['name'])}")
        for p in query_params:
            t = _php_type(p.get("type"))
            camel = self.snake_to_camel(p["name"])
            sig_parts.append(f"?{t} ${camel} = null")

        if len(sig_parts) > 2:
            indent = "        "
            sig = f"    public function {func_name}(\n"
            sig += ",\n".join(f"{indent}{s}" for s in sig_parts)
            sig += f"\n    ): \\OAuthSdk\\AuthenticatedResponse {{"
            lines = [sig]
        else:
            lines = [f"    public function {func_name}({', '.join(sig_parts)}): \\OAuthSdk\\AuthenticatedResponse {{"]

        lines.extend(self._build_path(ep["path"], path_params, query_params, "auth"))
        lines.append(f"        return $this->client->request($path, '{ep['method']}', $accessToken, $refreshToken);")
        lines.append("    }")
        return lines

    def _emit_unauth_method(self, func_name: str, ep: dict, path_params: list[dict], query_params: list[dict]) -> list[str]:
        method = ep["method"]
        request_body = ep.get("request_body")
        sig_parts = ["string $baseUrl"]
        for p in path_params:
            sig_parts.append(f"{_php_type(p.get('type'))} ${self.snake_to_camel(p['name'])}")

        if isinstance(request_body, dict):
            flat_params, body_groups = self._flatten_body(request_body)
            for param in flat_params:
                sig_parts.append(f"mixed ${param}")
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
            for group_key, fields in body_groups:
                field_entries = []
                for snake_key, camel_param in fields:
                    field_entries.append(f"'{snake_key}' => ${camel_param}")
                lines.append(f"            '{group_key}' => [{', '.join(field_entries)}],")
            lines.append("        ];")
            lines.extend(self._curl_post(method))
        elif request_body:
            sig_parts.append("array $body = []")
            lines = [f"    public function {func_name}({', '.join(sig_parts)}): mixed {{"]
            lines.extend(self._build_path(ep["path"], path_params, [], "unauth"))
            lines.append("        $body = $body;")
            lines.extend(self._curl_post(method))
        else:
            for p in query_params:
                t = _php_type(p.get("type"))
                camel = self.snake_to_camel(p["name"])
                sig_parts.append(f"?{t} ${camel} = null")
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

    def _build_path(self, path: str, path_params: list[dict], query_params: list[dict], mode: str) -> list[str]:
        result = path
        for p in path_params:
            camel = self.snake_to_camel(p["name"])
            result = result.replace("{" + p["name"] + "}", f'" . urlencode(${camel}) . "')
        # Clean up leading/trailing concatenation artifacts
        php_path = f'"{result}"'
        php_path = php_path.replace('""', "")
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

    def _curl_post(self, method: str) -> list[str]:
        return [
            "        $ch = curl_init();",
            "        curl_setopt($ch, CURLOPT_URL, $baseUrl . $path);",
            "        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);",
            f"        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '{method}');",
            "        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));",
            "        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);",
            "        curl_setopt($ch, CURLOPT_HEADER, true);",
            "        $raw = curl_exec($ch);",
            "        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);",
            "        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);",
            "        curl_close($ch);",
            "        $headers = self::parseHeaders(substr($raw, 0, $headerSize));",
            "        $body = substr($raw, $headerSize);",
            "        return handleResponse($body, $statusCode, $headers);",
        ]

    def _flatten_body(self, body: dict) -> tuple[list[str], list[tuple[str, list[tuple[str, str]]]]]:
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
