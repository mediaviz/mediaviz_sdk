import os
import pytest
from test_generators.php import PhpTestGenerator


@pytest.fixture
def gen():
    return PhpTestGenerator()


@pytest.fixture
def tmp(tmp_path):
    return str(tmp_path)


class TestEmitHelpers:
    def test_creates_helpers_php(self, gen, tmp):
        gen.emit_helpers(tmp)
        assert os.path.isfile(os.path.join(tmp, "helpers.php"))

    def test_spy_oauth_client_class_declared(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.php")).read()
        assert "class SpyOAuthClient" in content

    def test_spy_oauth_client_extends_oauth_client(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.php")).read()
        assert "SpyOAuthClient extends OAuthClient" in content

    def test_spy_has_calls_array(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.php")).read()
        assert "public array $calls" in content

    def test_spy_request_method_present(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.php")).read()
        assert "public function request(" in content

    def test_spy_request_records_calls(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.php")).read()
        assert "$this->calls[]" in content
        assert "compact(" in content

    def test_spy_request_captures_path_method_tokens(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.php")).read()
        assert "'path'" in content
        assert "'method'" in content
        assert "'accessToken'" in content
        assert "'refreshToken'" in content

    def test_spy_last_call_method_present(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.php")).read()
        assert "public function lastCall()" in content

    def test_spy_reset_method_present(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.php")).read()
        assert "public function reset()" in content
        assert "$this->calls = []" in content

    def test_in_oauth_sdk_namespace(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.php")).read()
        assert "namespace OAuthSdk;" in content

    def test_php_opening_tag(self, gen, tmp):
        gen.emit_helpers(tmp)
        content = open(os.path.join(tmp, "helpers.php")).read()
        assert content.startswith("<?php")


class TestEmitErrorsTest:
    def test_creates_exceptions_test_php(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_errors_test(sdk_dir, test_dir)
        assert os.path.isfile(os.path.join(test_dir, "ExceptionsTest.php"))

    def test_all_five_exception_classes_present(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_errors_test(sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "ExceptionsTest.php")).read()
        for cls in ["ApiException", "ValidationException", "NotFoundException", "RateLimitException", "ServerException"]:
            assert cls in content

    def test_class_exists_asserted(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_errors_test(sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "ExceptionsTest.php")).read()
        assert "class_exists(" in content

    def test_extends_exception_asserted(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_errors_test(sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "ExceptionsTest.php")).read()
        assert "isSubclassOf" in content
        assert "Exception::class" in content

    def test_extends_test_case(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_errors_test(sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "ExceptionsTest.php")).read()
        assert "ExceptionsTest extends TestCase" in content

    def test_php_opening_tag(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_errors_test(sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "ExceptionsTest.php")).read()
        assert content.startswith("<?php")


class TestEmitControllerTest:
    AUTH_ENDPOINT = {
        "id": "get_keyword_user",
        "controller": "Keywords",
        "method": "GET",
        "path": "/api/v1/keyword/{keywordId}",
        "auth": "required",
        "params": [{"name": "keywordId", "in": "path", "type": "integer"}],
    }
    UNAUTH_ENDPOINT = {
        "id": "create_account",
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
        assert os.path.isfile(os.path.join(test_dir, "KeywordsTest.php"))

    def test_existence_assertion_present(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "KeywordsTest.php")).read()
        assert "method_exists" in content
        assert "getKeywordUser" in content

    def test_http_method_assertion_present(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "KeywordsTest.php")).read()
        assert "'GET'" in content
        assert "lastCall()['method']" in content

    def test_auth_endpoint_uses_spy_oauth_client(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "KeywordsTest.php")).read()
        assert "SpyOAuthClient" in content

    def test_auth_routing_asserts_spy_call_count(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "KeywordsTest.php")).read()
        assert "assertCount(1, $spy->calls)" in content

    def test_path_construction_asserted(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "KeywordsTest.php")).read()
        assert "assertStringContainsString" in content
        assert "/api/v1/keyword/" in content

    def test_body_fields_asserted_for_post(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        # Auth POST with request_body to hit the body assertion path
        ep = {
            "id": "create_keyword",
            "controller": "Keywords",
            "method": "POST",
            "path": "/api/v1/keyword",
            "auth": "required",
            "params": [],
            "request_body": {"name": {"type": "string"}, "value": {"type": "integer"}},
        }
        gen.emit_controller_test("Keywords", [ep], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "KeywordsTest.php")).read()
        assert "assertArrayHasKey" in content
        assert "'name'" in content
        assert "'value'" in content

    def test_file_extends_test_case(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        gen.emit_controller_test("Keywords", [self.AUTH_ENDPOINT], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "KeywordsTest.php")).read()
        assert "KeywordsTest extends TestCase" in content

    def test_query_params_asserted(self, gen, tmp):
        sdk_dir = tmp + "/sdk"
        os.makedirs(sdk_dir)
        test_dir = tmp + "/tests"
        os.makedirs(test_dir)
        ep = {
            "id": "search_keywords",
            "controller": "Keywords",
            "method": "GET",
            "path": "/api/v1/keyword/search",
            "auth": "required",
            "params": [
                {"name": "query", "in": "query", "type": "string"},
                {"name": "limit", "in": "query", "type": "integer"},
            ],
        }
        gen.emit_controller_test("Keywords", [ep], sdk_dir, test_dir)
        content = open(os.path.join(test_dir, "KeywordsTest.php")).read()
        assert "query=" in content
        assert "limit=" in content
