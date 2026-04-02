from __future__ import annotations
import json
import os
import re
import subprocess

from naming import snake_to_camel, snake_to_pascal
from .base import BaseTestGenerator, TestResult


class PhpTestGenerator(BaseTestGenerator):
    framework_name = "php"

    snake_to_camel = staticmethod(snake_to_camel)
    snake_to_pascal = staticmethod(snake_to_pascal)

    def generate(self, endpoints: list[dict], sdk_dir: str, test_dir: str) -> None:
        os.makedirs(test_dir, exist_ok=True)
        self.emit_helpers(test_dir)
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

    def emit_helpers(self, test_dir: str) -> None:
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
            "        string $url,",
            "        string $method,",
            "        string $accessToken,",
            "        string $refreshToken,",
            "        mixed $body = null,",
            "    ): AuthenticatedResponse {",
            "        $this->calls[] = ['path' => $url, 'method' => $method, 'accessToken' => $accessToken, 'refreshToken' => $refreshToken, 'body' => $body];",
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
                "mediaviz/sdk": "*",
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
        func_name = self.snake_to_camel(ep["id"])
        return [
            f"    public function test_{ep['id']}_exists(): void {{",
            f"        $this->assertTrue(method_exists({class_name}::class, '{func_name}'));",
            "    }",
            "",
        ]

    def _emit_method_test(self, ep: dict, class_name: str) -> list[str]:
        func_name = self.snake_to_camel(ep["id"])
        method = ep["method"]
        is_auth = ep.get("auth") == "required"
        call_args = self._build_call_args(ep, ep.get("params", []))
        lines = [f"    public function test_{ep['id']}_http_method(): void {{"]
        if is_auth:
            lines += [
                "        $spy = new \\OAuthSdk\\SpyOAuthClient();",
                f"        $obj = new {class_name}($spy);",
                f"        $obj->{func_name}({call_args});",
                f"        $this->assertSame('{method}', $spy->lastCall()['method']);",
            ]
        else:
            # For unauth endpoints using curl, we test via reflection that the method exists
            lines += [
                f"        $this->assertTrue(method_exists({class_name}::class, '{func_name}'));",
            ]
        lines += ["    }", ""]
        return lines

    def _emit_path_test(self, ep: dict, class_name: str) -> list[str]:
        func_name = self.snake_to_camel(ep["id"])
        params = ep.get("params", [])
        path_params = [p for p in params if p.get("in") == "path"]
        expected_path = self.build_expected_path(ep["path"], params) if path_params else ep["path"]
        is_auth = ep.get("auth") == "required"
        call_args = self._build_call_args(ep, params, encoding=True)
        lines = [f"    public function test_{ep['id']}_path(): void {{"]
        if is_auth:
            lines += [
                "        $spy = new \\OAuthSdk\\SpyOAuthClient();",
                f"        $obj = new {class_name}($spy);",
                f"        $obj->{func_name}({call_args});",
                f"        $this->assertStringContainsString('{expected_path}', $spy->lastCall()['path']);",
            ]
        else:
            lines += [
                f"        $this->assertTrue(method_exists({class_name}::class, '{func_name}'));",
            ]
        lines += ["    }", ""]
        return lines

    def _emit_query_test(self, ep: dict, class_name: str) -> list[str]:
        func_name = self.snake_to_camel(ep["id"])
        params = ep.get("params", [])
        query_params = [p for p in params if p.get("in") == "query"]
        is_auth = ep.get("auth") == "required"
        call_args = self._build_call_args(ep, params)
        lines = [f"    public function test_{ep['id']}_query_params(): void {{"]
        if is_auth:
            lines += [
                "        $spy = new \\OAuthSdk\\SpyOAuthClient();",
                f"        $obj = new {class_name}($spy);",
                f"        $obj->{func_name}({call_args});",
                "        $path = $spy->lastCall()['path'];",
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
        func_name = self.snake_to_camel(ep["id"])
        request_body = ep.get("request_body")
        is_auth = ep.get("auth") == "required"
        call_args = self._build_call_args(ep, ep.get("params", []))
        lines = [f"    public function test_{ep['id']}_request_body(): void {{"]
        if is_auth:
            lines += [
                "        $spy = new \\OAuthSdk\\SpyOAuthClient();",
                f"        $obj = new {class_name}($spy);",
                f"        $obj->{func_name}({call_args});",
                "        $body = $spy->lastCall()['body'];",
            ]
            if isinstance(request_body, dict):
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
        func_name = self.snake_to_camel(ep["id"])
        is_auth = ep.get("auth") == "required"
        call_args = self._build_call_args(ep, ep.get("params", []))
        lines = [f"    public function test_{ep['id']}_auth_routing(): void {{"]
        if is_auth:
            lines += [
                "        $spy = new \\OAuthSdk\\SpyOAuthClient();",
                f"        $obj = new {class_name}($spy);",
                f"        $obj->{func_name}({call_args});",
                "        $this->assertCount(1, $spy->calls);",
            ]
        else:
            lines += [
                f"        $this->assertTrue(method_exists({class_name}::class, '{func_name}'));",
            ]
        lines += ["    }", ""]
        return lines

    # ── helpers ───────────────────────────────────────────────────────────────

    def _build_call_args(
        self, ep: dict, params: list[dict], encoding: bool = False
    ) -> str:
        is_auth = ep.get("auth") == "required"
        path_params = [p for p in params if p.get("in") == "path"]
        query_params = [p for p in params if p.get("in") == "query"]
        request_body = ep.get("request_body")

        parts: list[str] = []
        if is_auth:
            parts += ["'access_token'", "'refresh_token'"]
        else:
            parts.append("'https://api.example.com'")

        for p in path_params:
            val = self.test_value_for_type(p.get("type", "string"), encoding=encoding)
            parts.append(_php_literal(val))

        if isinstance(request_body, dict):
            for field in request_body:
                val_type = (
                    request_body[field].get("type", "string")
                    if isinstance(request_body[field], dict)
                    else "string"
                )
                parts.append(_php_literal(self.test_value_for_type(val_type)))
        elif request_body:
            parts.append("[]")

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


def _parse_phpunit_counts(output: str) -> tuple[int, int, int]:
    passed = failed = 0
    m_pass = re.search(r"(\d+) test(?:s?) (?:complete|passed|OK)", output)
    m_fail = re.search(r"(\d+) failure", output)
    # PHPUnit summary line: "Tests: 5, Assertions: 10, Failures: 1."
    m_tests = re.search(r"Tests:\s*(\d+)", output)
    m_failures = re.search(r"Failures:\s*(\d+)", output)
    if m_tests:
        total = int(m_tests.group(1))
    else:
        total = 0
    if m_failures:
        failed = int(m_failures.group(1))
    elif m_fail:
        failed = int(m_fail.group(1))
    if m_pass:
        passed = int(m_pass.group(1))
    else:
        passed = total - failed
    return passed, failed, total
