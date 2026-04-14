import os
import tempfile
import pytest
from test_generators.javascript import JavaScriptTestGenerator


@pytest.fixture
def gen():
    return JavaScriptTestGenerator()


@pytest.fixture
def tmp(tmp_path):
    return str(tmp_path)


class TestEmitHelpers:
    def test_creates_helpers_js(self, gen, tmp):
        gen.emit_helpers(tmp)
        assert os.path.isfile(os.path.join(tmp, "helpers.js"))

    def test_spy_oauth_client_class_present(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.js")).read()
        assert "class SpyOAuthClient" in content

    def test_spy_oauth_client_request_method(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.js")).read()
        assert "request(" in content
        assert "this.calls.push" in content

    def test_spy_oauth_client_last_call(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.js")).read()
        assert "last_call()" in content

    def test_spy_oauth_client_reset(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.js")).read()
        assert "reset()" in content

    def test_make_spy_fetch_exported(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.js")).read()
        assert "export function makeSpyFetch" in content

    def test_spy_fetch_records_url_and_method(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.js")).read()
        assert "url" in content
        assert "method" in content
        assert "calls.push" in content

    def test_spy_fetch_returns_stub_response(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.js")).read()
        assert "stubResponse" in content
        assert "ok: true" in content

    def test_helpers_exported_with_export_keyword(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.js")).read()
        assert "export class SpyOAuthClient" in content
        assert "export function makeSpyFetch" in content


class TestEmitErrorsTest:
    def test_creates_errors_test_js(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_errors_test(sdk_dir, test_dir)
        assert os.path.isfile(os.path.join(test_dir, "errors.test.js"))

    def test_all_five_error_classes_present(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_errors_test(sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "errors.test.js")).read()
        for cls in ["ApiError", "ValidationError", "NotFoundError", "RateLimitError", "ServerError"]:
            assert cls in content

    def test_instanceof_error_asserted(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_errors_test(sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "errors.test.js")).read()
        assert "instanceof Error" in content


class TestEmitControllerTest:
    AUTH_ENDPOINT = {
        "id": "get_keyword_user",
        "function_name": "get_keyword_user",
        "controller": "Keywords",
        "method": "GET",
        "path": "/api/v1/keyword/{keywordId}",
        "auth": "required",
        "params": [{"name": "keywordId", "in": "path", "type": "integer"}],
    }
    UNAUTH_ENDPOINT = {
        "id": "create_account",
        "function_name": "create_account",
        "controller": "Auth",
        "method": "POST",
        "path": "/api/v1/auth/register",
        "auth": "none",
        "params": [],
        "request_body": {"email": {"type": "string"}, "password": {"type": "string"}},
    }

    def test_creates_test_file(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        assert os.path.isfile(os.path.join(test_dir, "keywords.test.js"))

    def test_existence_assertion_present(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "keywords.test.js")).read()
        assert "typeof keywords.getKeywordUser" in content
        assert "'function'" in content

    def test_http_method_assertion_present(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "keywords.test.js")).read()
        assert "'GET'" in content
        assert "method" in content

    def test_auth_endpoint_uses_spy_oauth_client(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "keywords.test.js")).read()
        assert "SpyOAuthClient" in content

    def test_unauth_endpoint_uses_spy_fetch(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Auth", [self.UNAUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "auth.test.js")).read()
        assert "makeSpyFetch" in content
        assert "globalThis.fetch" in content

    def test_body_fields_asserted_for_post(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Auth", [self.UNAUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "auth.test.js")).read()
        assert "email" in content
        assert "password" in content
        assert "toHaveProperty" in content

    def test_path_construction_asserted(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "keywords.test.js")).read()
        assert "toContain" in content
        assert "/api/v1/keyword/" in content

    def test_describe_and_it_blocks_present(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "keywords.test.js")).read()
        assert "describe('Keywords'" in content
        assert "it('getKeywordUser" in content

    def test_auth_routing_spy_calls_length_asserted(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "keywords.test.js")).read()
        assert "spy.calls.length" in content
        assert ".toBe(1)" in content

    def test_integer_path_param_uses_42(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "keywords.test.js")).read()
        # integer test value is 42 per spec
        assert "42" in content

    def test_query_params_asserted(self, gen, tmp):
        ep = {
            "id": "search_keywords",
            "function_name": "search_keywords",
            "controller": "Keywords",
            "method": "GET",
            "path": "/api/v1/keyword/search",
            "auth": "required",
            "params": [
                {"name": "query_text", "in": "query", "type": "string"},
                {"name": "page_size", "in": "query", "type": "integer"},
            ],
        }
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [ep], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "keywords.test.js")).read()
        assert "query_text=" in content
        assert "page_size=" in content

    def test_unstructured_body_uses_be_defined(self, gen, tmp):
        ep = {
            "id": "bulk_add",
            "function_name": "bulk_add",
            "controller": "Collections",
            "method": "POST",
            "path": "/api/v1/collection/bulk",
            "auth": "none",
            "params": [],
            "request_body": "array of collection IDs",
        }
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Collections", [ep], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "collections.test.js")).read()
        assert "toBeDefined()" in content
        assert "toHaveProperty" not in content

    def test_no_params_endpoint_generates_existence_and_method(self, gen, tmp):
        ep = {
            "id": "get_status",
            "function_name": "get_status",
            "controller": "Health",
            "method": "GET",
            "path": "/api/v1/health",
            "auth": "none",
            "params": [],
        }
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Health", [ep], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "health.test.js")).read()
        assert "typeof health.getStatus" in content
        assert "'GET'" in content
