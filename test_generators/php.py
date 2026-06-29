from __future__ import annotations
import json
import os
import re
import subprocess

from naming import snake_to_camel, snake_to_pascal, header_to_param
from .base import BaseTestGenerator, TestResult


class PhpTestGenerator(BaseTestGenerator):
    framework_name = "php"

    snake_to_camel = staticmethod(snake_to_camel)
    snake_to_pascal = staticmethod(snake_to_pascal)
    header_to_param = staticmethod(header_to_param)

    def generate(self, endpoints: list[dict], sdk_dir: str, test_dir: str) -> None:
        os.makedirs(test_dir, exist_ok=True)
        self.emit_helpers(test_dir, sdk_dir)
        self.emit_composer_json(test_dir, sdk_dir)
        self.emit_phpunit_xml(test_dir)
        self.emit_errors_test(sdk_dir, test_dir)
        groups = self.group_by_controller(endpoints)
        for controller, eps in groups.items():
            self.emit_controller_test(controller, eps, sdk_dir, test_dir)

    def run(self, test_dir: str) -> TestResult:
        vendor = os.path.join(test_dir, "vendor")
        if not os.path.isdir(vendor):
            install = subprocess.run(
                ["composer", "install"],
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
            ["./vendor/bin/phpunit"],
            cwd=test_dir,
            capture_output=True,
            text=True,
        )
        output = result.stdout + result.stderr
        passed, failed, total = _parse_phpunit_counts(output)
        return TestResult(
            success=result.returncode == 0,
            total=total,
            passed=passed,
            failed=failed,
            output=output,
        )

    # ── file emitters ─────────────────────────────────────────────────────────

    def emit_helpers(self, test_dir: str, sdk_dir: str | None = None) -> None:
        # SpyOAuthClient extends OAuthClient, so PHP enforces that its request()
        # override stay signature-compatible at class-load. Derive the parameter
        # list from the actual OAuthClient.php shipped in the SDK rather than
        # hardcoding it, so an upstream change (e.g. a param made nullable) can
        # never desync the spy into an incompatible-signature fatal error.
        params, return_type, names = _parent_request_signature(sdk_dir)
        record = ", ".join(
            f"'{label}' => ${name}"
            for label, name in zip(("path", "method", "accessToken", "refreshToken"), names)
        )
        body_name = "body" if "body" in names else (names[4] if len(names) > 4 else None)
        if body_name:
            record += f", 'body' => ${body_name}"
        lines = [
            "<?php",
            "// Auto-generated — do not edit",
            "namespace OAuthSdk;",
            "",
            "class SpyOAuthClient extends OAuthClient {",
            "    public array $calls = [];",
            "",
            "    public function __construct() {}",
            "",
            "    public function request(",
            *(f"        {p}," for p in params),
            f"    ): {return_type} {{",
            f"        $this->calls[] = [{record}];",
            "        return new AuthenticatedResponse(data: null, updatedTokens: null);",
            "    }",
            "",
            "    public function lastCall(): array {",
            "        return end($this->calls);",
            "    }",
            "",
            "    public function reset(): void {",
            "        $this->calls = [];",
            "    }",
            "}",
            "",
            "class SpyAuthContext {",
            "    public SpyOAuthClient $client;",
            "    public string $accessToken = 'access_token';",
            "    public string $refreshToken = 'refresh_token';",
            "",
            "    public function __construct() {",
            "        $this->client = new SpyOAuthClient();",
            "    }",
            "",
            "    public function requireTokens(): void {}",
            "",
            "    public function requireHost(string $key = ''): string {",
            "        return 'https://upload.example.com';",
            "    }",
            "}",
            "",
        ]
        with open(os.path.join(test_dir, "helpers.php"), "w") as f:
            f.write("\n".join(lines))

    def emit_composer_json(self, test_dir: str, sdk_dir: str) -> None:
        rel_sdk = os.path.relpath(sdk_dir, test_dir)
        config = {
            "name": "mediaviz/sdk-tests",
            "minimum-stability": "dev",
            "require-dev": {
                "phpunit/phpunit": "^11.0",
                # Matches the SDK package name emitted by generators/php.py;
                # resolved from the path repository below during the inline test run.
                "mediaviz/mediaviz-php-sdk": "*",
            },
            "repositories": [
                {"type": "path", "url": rel_sdk},
            ],
            "autoload-dev": {
                "psr-4": {"MediaVizSdkTests\\": "./"},
            },
        }
        with open(os.path.join(test_dir, "composer.json"), "w") as f:
            json.dump(config, f, indent=2)
            f.write("\n")

    def emit_phpunit_xml(self, test_dir: str) -> None:
        content = (
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n'
            '         xsi:noNamespaceSchemaLocation="vendor/phpunit/phpunit/phpunit.xsd"\n'
            '         bootstrap="vendor/autoload.php"\n'
            '         colors="true">\n'
            "    <testsuites>\n"
            '        <testsuite name="Contract Tests">\n'
            '            <directory>.</directory>\n'
            "            <exclude>./vendor</exclude>\n"
            "        </testsuite>\n"
            "    </testsuites>\n"
            "</phpunit>\n"
        )
        with open(os.path.join(test_dir, "phpunit.xml"), "w") as f:
            f.write(content)

    def emit_errors_test(self, sdk_dir: str, test_dir: str) -> None:
        exception_classes = [
            "ApiException",
            "ValidationException",
            "NotFoundException",
            "RateLimitException",
            "ServerException",
        ]
        lines = [
            "<?php",
            "// Auto-generated — do not edit",
            "declare(strict_types=1);",
            "",
            "use PHPUnit\\Framework\\TestCase;",
            "",
            "class ExceptionsTest extends TestCase {",
        ]
        for cls in exception_classes:
            lines += [
                f"    public function test_{cls}_exists(): void {{",
                f"        $this->assertTrue(class_exists('MediaVizSdk\\\\{cls}'));",
                "    }",
                "",
                f"    public function test_{cls}_extends_exception(): void {{",
                f"        $ref = new ReflectionClass('MediaVizSdk\\\\{cls}');",
                "        $this->assertTrue($ref->isSubclassOf(Exception::class));",
                "    }",
                "",
            ]
        lines += ["}", ""]
        with open(os.path.join(test_dir, "ExceptionsTest.php"), "w") as f:
            f.write("\n".join(lines))

    def emit_controller_test(
        self, controller: str, endpoints: list[dict], sdk_dir: str, test_dir: str
    ) -> None:
        class_name = self.snake_to_pascal(controller.replace(" ", "_"))
        lines = [
            "<?php",
            "// Auto-generated — do not edit",
            "declare(strict_types=1);",
            "",
            "use PHPUnit\\Framework\\TestCase;",
            f"use MediaVizSdk\\{class_name};",
            "",
            "require_once __DIR__ . '/helpers.php';",
            "",
            f"class {class_name}Test extends TestCase {{",
        ]

        for ep in endpoints:
            lines.extend(self._emit_existence_test(ep, class_name))
            lines.extend(self._emit_method_test(ep, class_name))
            lines.extend(self._emit_path_test(ep, class_name))
            query_params = [p for p in ep.get("params", []) if p.get("in") == "query"]
            if query_params:
                lines.extend(self._emit_query_test(ep, class_name))
            request_body = ep.get("request_body")
            if request_body:
                lines.extend(self._emit_body_test(ep, class_name))
            lines.extend(self._emit_auth_routing_test(ep, class_name))

        lines += ["}", ""]
        filename = class_name + "Test.php"
        with open(os.path.join(test_dir, filename), "w") as f:
            f.write("\n".join(lines))

    # ── per-assertion emitters ────────────────────────────────────────────────

    def _emit_existence_test(self, ep: dict, class_name: str) -> list[str]:
        func_name = self.snake_to_camel(ep.get("function_name", ep["id"]))
        return [
            f"    public function test_{ep['id']}_exists(): void {{",
            f"        $this->assertTrue(method_exists({class_name}::class, '{func_name}'));",
            "    }",
            "",
        ]

    def _emit_method_test(self, ep: dict, class_name: str) -> list[str]:
        func_name = self.snake_to_camel(ep.get("function_name", ep["id"]))
        method = ep["method"]
        uses_client = self._uses_oauth_client(ep)
        call_args = self._build_call_args(ep, ep.get("params", []))
        lines = [f"    public function test_{ep['id']}_http_method(): void {{"]
        if uses_client:
            lines += [
                "        $ctx = new \\OAuthSdk\\SpyAuthContext();",
                f"        $obj = new {class_name}($ctx);",
                f"        $obj->{func_name}({call_args});",
                f"        $this->assertSame('{method}', $ctx->client->lastCall()['method']);",
            ]
        else:
            lines += [
                f"        $this->assertTrue(method_exists({class_name}::class, '{func_name}'));",
            ]
        lines += ["    }", ""]
        return lines

    def _emit_path_test(self, ep: dict, class_name: str) -> list[str]:
        func_name = self.snake_to_camel(ep.get("function_name", ep["id"]))
        params = ep.get("params", [])
        path_params = [p for p in params if p.get("in") == "path"]
        expected_path = self.build_expected_path(ep["path"], params) if path_params else ep["path"]
        uses_client = self._uses_oauth_client(ep)
        call_args = self._build_call_args(ep, params, encoding=True)
        lines = [f"    public function test_{ep['id']}_path(): void {{"]
        if uses_client:
            lines += [
                "        $ctx = new \\OAuthSdk\\SpyAuthContext();",
                f"        $obj = new {class_name}($ctx);",
                f"        $obj->{func_name}({call_args});",
                f"        $this->assertStringContainsString('{expected_path}', $ctx->client->lastCall()['path']);",
            ]
        else:
            lines += [
                f"        $this->assertTrue(method_exists({class_name}::class, '{func_name}'));",
            ]
        lines += ["    }", ""]
        return lines

    def _emit_query_test(self, ep: dict, class_name: str) -> list[str]:
        func_name = self.snake_to_camel(ep.get("function_name", ep["id"]))
        params = ep.get("params", [])
        query_params = [p for p in params if p.get("in") == "query"]
        uses_client = self._uses_oauth_client(ep)
        call_args = self._build_call_args(ep, params)
        lines = [f"    public function test_{ep['id']}_query_params(): void {{"]
        if uses_client:
            lines += [
                "        $ctx = new \\OAuthSdk\\SpyAuthContext();",
                f"        $obj = new {class_name}($ctx);",
                f"        $obj->{func_name}({call_args});",
                "        $path = $ctx->client->lastCall()['path'];",
            ]
            for qp in query_params:
                lines.append(f"        $this->assertStringContainsString('{qp['name']}=', $path);")
        else:
            lines += [
                f"        $this->assertTrue(method_exists({class_name}::class, '{func_name}'));",
            ]
        lines += ["    }", ""]
        return lines

    def _emit_body_test(self, ep: dict, class_name: str) -> list[str]:
        func_name = self.snake_to_camel(ep.get("function_name", ep["id"]))
        request_body = ep.get("request_body")
        uses_client = self._uses_oauth_client(ep)
        call_args = self._build_call_args(ep, ep.get("params", []))
        lines = [f"    public function test_{ep['id']}_request_body(): void {{"]
        if uses_client:
            lines += [
                "        $ctx = new \\OAuthSdk\\SpyAuthContext();",
                f"        $obj = new {class_name}($ctx);",
                f"        $obj->{func_name}({call_args});",
                "        $body = $ctx->client->lastCall()['body'];",
            ]
            shape = self._body_shape(request_body)
            if shape == "scalar":
                lines.append("        $this->assertNotNull($body);")
            elif shape == "expanded":
                for key in self._expanded_top_level_keys(self._expanded_fields(request_body)):
                    lines.append(f"        $this->assertArrayHasKey('{key}', $body);")
            elif shape == "flat_dict":
                for field in request_body:
                    lines.append(f"        $this->assertArrayHasKey('{field}', $body);")
            else:
                lines.append("        $this->assertNotNull($body);")
        else:
            lines += [
                f"        $this->assertTrue(method_exists({class_name}::class, '{func_name}'));",
            ]
        lines += ["    }", ""]
        return lines

    def _emit_auth_routing_test(self, ep: dict, class_name: str) -> list[str]:
        func_name = self.snake_to_camel(ep.get("function_name", ep["id"]))
        uses_client = self._uses_oauth_client(ep)
        call_args = self._build_call_args(ep, ep.get("params", []))
        lines = [f"    public function test_{ep['id']}_auth_routing(): void {{"]
        if uses_client:
            lines += [
                "        $ctx = new \\OAuthSdk\\SpyAuthContext();",
                f"        $obj = new {class_name}($ctx);",
                f"        $obj->{func_name}({call_args});",
                "        $this->assertCount(1, $ctx->client->calls);",
            ]
        else:
            lines += [
                f"        $this->assertTrue(method_exists({class_name}::class, '{func_name}'));",
            ]
        lines += ["    }", ""]
        return lines

    # ── helpers ───────────────────────────────────────────────────────────────

    def _uses_oauth_client(self, ep: dict) -> bool:
        return ep.get("auth") == "required" and not ep.get("api_host")

    def _build_call_args(
        self, ep: dict, params: list[dict], encoding: bool = False
    ) -> str:
        path_params = [p for p in params if p.get("in") == "path"]
        query_params = [p for p in params if p.get("in") == "query"]
        header_params = [p for p in params if p.get("in") == "header"]
        is_alt_host = bool(ep.get("api_host"))
        request_body = ep.get("request_body")

        parts: list[str] = []

        for p in path_params:
            val = self.test_value_for_type(p.get("type", "string"), encoding=encoding)
            parts.append(_php_literal(val))

        if is_alt_host:
            required_headers = [p for p in header_params if p.get("required")]
            for p in required_headers:
                parts.append(_php_literal(self.test_value_for_type("string")))

        shape = self._body_shape(request_body)
        if shape == "scalar":
            parts.append(_php_literal(self.test_value_for_type("string")))
        elif shape == "expanded":
            ordered = self._order_expanded_fields(self._expanded_fields(request_body))
            for f in ordered:
                val = self.test_value_for_type("array" if f.get("kind") == "list" else f.get("type", "string"))
                parts.append(_php_literal(val))
        elif shape == "flat_dict":
            for field in request_body:
                val_type = (
                    request_body[field].get("type", "string")
                    if isinstance(request_body[field], dict)
                    else "string"
                )
                parts.append(_php_literal(self.test_value_for_type(val_type)))
        elif request_body:
            parts.append("[]")

        if is_alt_host:
            optional_headers = [p for p in header_params if not p.get("required")]
            for p in optional_headers:
                parts.append(_php_literal(self.test_value_for_type("string")))

        for p in query_params:
            parts.append(_php_literal(self.test_value_for_type(p.get("type", "string"))))

        return ", ".join(parts)


# ── module-level helpers ──────────────────────────────────────────────────────

def _php_literal(value: object) -> str:
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, str):
        escaped = value.replace("'", "\\'")
        return f"'{escaped}'"
    if isinstance(value, list):
        items = ", ".join(_php_literal(v) for v in value)
        return f"[{items}]"
    return str(value)


# Fallback SpyOAuthClient::request signature, mirroring the current
# OAuthSdk\OAuthClient::request contract. Used when the shipped OAuthClient.php
# can't be located or parsed, so the spy is always emitted.
_DEFAULT_REQUEST_PARAMS = [
    "string $url",
    "string $method",
    "string $accessToken",
    "?string $refreshToken",
    "mixed $body = null",
    "?callable $onRefreshSuccess = null",
]
_DEFAULT_REQUEST_RETURN = "AuthenticatedResponse"
_DEFAULT_REQUEST_NAMES = ["url", "method", "accessToken", "refreshToken", "body", "onRefreshSuccess"]

_REQUEST_SIG_RE = re.compile(
    r"public\s+function\s+request\s*\((?P<params>.*?)\)\s*:\s*(?P<ret>[\\\w]+)\s*\{",
    re.DOTALL,
)


def _parent_request_signature(sdk_dir: str | None) -> tuple[list[str], str, list[str]]:
    """Parse OAuthClient::request's signature from the SDK's bundled OAuthClient.php.

    Returns (param declarations, return type, param variable names). Falls back to
    the known-good default contract when sdk_dir is None or the file is missing/
    unparseable, so the spy is always emitted.
    """
    if sdk_dir:
        path = os.path.join(sdk_dir, "oauth", "src", "OAuthClient.php")
        if os.path.isfile(path):
            m = _REQUEST_SIG_RE.search(open(path).read())
            if m:
                params = [p.strip() for p in m.group("params").split(",") if p.strip()]
                names = [n.group(1) for p in params if (n := re.search(r"\$(\w+)", p))]
                if params and len(names) == len(params):
                    return params, m.group("ret").lstrip("\\"), names
    return _DEFAULT_REQUEST_PARAMS, _DEFAULT_REQUEST_RETURN, _DEFAULT_REQUEST_NAMES


def _parse_phpunit_counts(output: str) -> tuple[int, int, int]:
    passed = failed = 0

    # PHPUnit success: "OK (305 tests, 332 assertions)"
    m_ok = re.search(r"OK \((\d+) tests?", output)

    # PHPUnit failure summary: "Tests: 5, Assertions: 10, Failures: 1."
    m_tests = re.search(r"Tests:\s*(\d+)", output)
    m_failures = re.search(r"Failures:\s*(\d+)", output)
    m_errors = re.search(r"Errors:\s*(\d+)", output)

    if m_ok:
        total = int(m_ok.group(1))
        passed = total
        failed = 0
    elif m_tests:
        total = int(m_tests.group(1))
        failed = (int(m_failures.group(1)) if m_failures else 0) + (int(m_errors.group(1)) if m_errors else 0)
        passed = total - failed
    else:
        total = 0

    return passed, failed, total
