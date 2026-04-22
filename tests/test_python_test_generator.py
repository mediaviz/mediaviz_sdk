from __future__ import annotations
import os
import pytest
from test_generators.python import PythonTestGenerator, _py_literal, _parse_pytest_counts


@pytest.fixture
def gen():
    return PythonTestGenerator()


@pytest.fixture
def tmp(tmp_path):
    return str(tmp_path)


AUTH_ENDPOINT = {
    "id": "get_project",
    "function_name": "get_project",
    "controller": "projects",
    "method": "GET",
    "path": "/api/v1/project/{projectId}",
    "auth": "required",
    "params": [{"name": "projectId", "in": "path", "type": "integer"}],
}

UNAUTH_ENDPOINT = {
    "id": "create_account",
    "function_name": "create_account",
    "controller": "auth",
    "method": "POST",
    "path": "/api/v1/auth/register",
    "auth": "none",
    "params": [],
    "request_body": {"email": {"type": "string"}, "password": {"type": "string"}},
}

ALT_HOST_ENDPOINT = {
    "id": "upload_file",
    "function_name": "upload_file",
    "controller": "files",
    "method": "POST",
    "path": "/upload",
    "auth": "required",
    "api_host": "upload_host",
    "params": [{"name": "Content-Type", "in": "header", "required": True}],
}


class TestDiscovery:
    def test_framework_name(self, gen):
        assert gen.framework_name == "python"

    def test_discovered_by_registry(self):
        from test_generators import discover_test_generators
        reg = discover_test_generators()
        assert "python" in reg


class TestEmitHelpers:
    def test_creates_file(self, gen, tmp):
        gen.emit_helpers(tmp, "/fake/sdk")
        assert os.path.isfile(os.path.join(tmp, "test_helpers.py"))

    def test_spy_class_declared(self, gen, tmp):
        gen.emit_helpers(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "test_helpers.py")).read()
        assert "class SpyOAuthClient" in content

    def test_spy_extends_oauth_client(self, gen, tmp):
        gen.emit_helpers(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "test_helpers.py")).read()
        assert "SpyOAuthClient(OAuthClient)" in content

    def test_spy_init_no_super(self, gen, tmp):
        gen.emit_helpers(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "test_helpers.py")).read()
        assert "self.calls" in content

    def test_spy_request_records_calls(self, gen, tmp):
        gen.emit_helpers(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "test_helpers.py")).read()
        assert "self.calls.append(" in content

    def test_spy_last_call_present(self, gen, tmp):
        gen.emit_helpers(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "test_helpers.py")).read()
        assert "def last_call" in content

    def test_spy_reset_present(self, gen, tmp):
        gen.emit_helpers(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "test_helpers.py")).read()
        assert "def reset" in content

    def test_fake_response_class_present(self, gen, tmp):
        gen.emit_helpers(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "test_helpers.py")).read()
        assert "_FakeResponse" in content

    def test_sdk_path_inserted(self, gen, tmp):
        gen.emit_helpers(tmp, "/some/sdk/path")
        content = open(os.path.join(tmp, "test_helpers.py")).read()
        assert "/some/sdk/path" in content
        assert "sys.path.insert" in content


class TestEmitConftest:
    def test_creates_file(self, gen, tmp):
        gen.emit_conftest(tmp, "/fake/sdk")
        assert os.path.isfile(os.path.join(tmp, "conftest.py"))

    def test_sdk_path_in_sys_path(self, gen, tmp):
        gen.emit_conftest(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "conftest.py")).read()
        assert "sys.path.insert" in content
        assert "/fake/sdk" in content

    def test_imports_mediaviz_client(self, gen, tmp):
        gen.emit_conftest(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "conftest.py")).read()
        assert "from mediaviz_sdk import MediaVizClient" in content

    def test_imports_spy_client(self, gen, tmp):
        gen.emit_conftest(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "conftest.py")).read()
        assert "from test_helpers import SpyOAuthClient" in content

    def test_spy_client_fixture(self, gen, tmp):
        gen.emit_conftest(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "conftest.py")).read()
        assert "def spy_client" in content
        assert "SpyOAuthClient()" in content

    def test_mv_client_fixture(self, gen, tmp):
        gen.emit_conftest(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "conftest.py")).read()
        assert "def mv_client" in content
        assert "MediaVizClient(" in content

    def test_mv_client_wires_spy(self, gen, tmp):
        gen.emit_conftest(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "conftest.py")).read()
        assert "_tracking_client._inner = spy_client" in content

    def test_mv_client_sets_tokens(self, gen, tmp):
        gen.emit_conftest(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "conftest.py")).read()
        assert "_access_token" in content
        assert "_refresh_token" in content

    def test_mv_client_sets_hosts(self, gen, tmp):
        gen.emit_conftest(tmp, "/fake/sdk")
        content = open(os.path.join(tmp, "conftest.py")).read()
        assert "mv._hosts" in content


class TestEmitPytestConfig:
    def test_creates_file(self, gen, tmp):
        gen.emit_pytest_config(tmp)
        assert os.path.isfile(os.path.join(tmp, "pyproject.toml"))

    def test_testpaths_configured(self, gen, tmp):
        gen.emit_pytest_config(tmp)
        content = open(os.path.join(tmp, "pyproject.toml")).read()
        assert "testpaths" in content


class TestEmitErrorsTest:
    def test_creates_file(self, gen, tmp):
        gen.emit_errors_test(tmp)
        assert os.path.isfile(os.path.join(tmp, "test_errors.py"))

    def test_all_error_classes_present(self, gen, tmp):
        gen.emit_errors_test(tmp)
        content = open(os.path.join(tmp, "test_errors.py")).read()
        for cls in ["ApiError", "ValidationError", "NotFoundError", "RateLimitError", "ServerError"]:
            assert cls in content

    def test_422_maps_to_validation(self, gen, tmp):
        gen.emit_errors_test(tmp)
        content = open(os.path.join(tmp, "test_errors.py")).read()
        assert "ValidationError" in content
        assert "422" in content

    def test_404_maps_to_not_found(self, gen, tmp):
        gen.emit_errors_test(tmp)
        content = open(os.path.join(tmp, "test_errors.py")).read()
        assert "NotFoundError" in content
        assert "404" in content

    def test_429_maps_to_rate_limit(self, gen, tmp):
        gen.emit_errors_test(tmp)
        content = open(os.path.join(tmp, "test_errors.py")).read()
        assert "RateLimitError" in content
        assert "429" in content

    def test_500_maps_to_server_error(self, gen, tmp):
        gen.emit_errors_test(tmp)
        content = open(os.path.join(tmp, "test_errors.py")).read()
        assert "ServerError" in content
        assert "500" in content

    def test_pytest_raises_used(self, gen, tmp):
        gen.emit_errors_test(tmp)
        content = open(os.path.join(tmp, "test_errors.py")).read()
        assert "pytest.raises" in content

    def test_handle_response_imported(self, gen, tmp):
        gen.emit_errors_test(tmp)
        content = open(os.path.join(tmp, "test_errors.py")).read()
        assert "handle_response" in content


class TestEmitControllerTest:
    def test_creates_file_for_auth_endpoint(self, gen, tmp):
        gen.emit_controller_test("projects", [AUTH_ENDPOINT], tmp)
        assert os.path.isfile(os.path.join(tmp, "test_projects.py"))

    def test_existence_test_present(self, gen, tmp):
        gen.emit_controller_test("projects", [AUTH_ENDPOINT], tmp)
        content = open(os.path.join(tmp, "test_projects.py")).read()
        assert "test_get_project_exists" in content
        assert "get_project" in content

    def test_http_method_assertion_auth(self, gen, tmp):
        gen.emit_controller_test("projects", [AUTH_ENDPOINT], tmp)
        content = open(os.path.join(tmp, "test_projects.py")).read()
        assert "'GET'" in content
        assert "spy_client" in content

    def test_path_assertion_auth(self, gen, tmp):
        gen.emit_controller_test("projects", [AUTH_ENDPOINT], tmp)
        content = open(os.path.join(tmp, "test_projects.py")).read()
        assert "/api/v1/project/" in content

    def test_unauth_endpoint_uses_monkeypatch(self, gen, tmp):
        gen.emit_controller_test("auth", [UNAUTH_ENDPOINT], tmp)
        content = open(os.path.join(tmp, "test_auth.py")).read()
        assert "monkeypatch" in content
        assert "_MockClient" in content

    def test_unauth_endpoint_mock_client_defined(self, gen, tmp):
        gen.emit_controller_test("auth", [UNAUTH_ENDPOINT], tmp)
        content = open(os.path.join(tmp, "test_auth.py")).read()
        assert "class _MockClient" in content

    def test_query_params_asserted(self, gen, tmp):
        ep = {
            "id": "list_projects",
            "function_name": "list_projects",
            "controller": "projects",
            "method": "GET",
            "path": "/api/v1/project",
            "auth": "required",
            "params": [
                {"name": "page", "in": "query", "type": "integer"},
                {"name": "limit", "in": "query", "type": "integer"},
            ],
        }
        gen.emit_controller_test("projects", [ep], tmp)
        content = open(os.path.join(tmp, "test_projects.py")).read()
        assert "page=" in content
        assert "limit=" in content

    def test_body_keys_asserted_for_flat_dict(self, gen, tmp):
        ep = {
            "id": "create_project",
            "function_name": "create_project",
            "controller": "projects",
            "method": "POST",
            "path": "/api/v1/project",
            "auth": "required",
            "params": [],
            "request_body": {"name": {"type": "string"}, "description": {"type": "string"}},
        }
        gen.emit_controller_test("projects", [ep], tmp)
        content = open(os.path.join(tmp, "test_projects.py")).read()
        assert "'name'" in content
        assert "'description'" in content

    def test_alt_host_endpoint_uses_monkeypatch(self, gen, tmp):
        gen.emit_controller_test("files", [ALT_HOST_ENDPOINT], tmp)
        content = open(os.path.join(tmp, "test_files.py")).read()
        assert "monkeypatch" in content

    def test_httpx_imported_when_has_unauth(self, gen, tmp):
        gen.emit_controller_test("auth", [UNAUTH_ENDPOINT], tmp)
        content = open(os.path.join(tmp, "test_auth.py")).read()
        assert "import httpx" in content

    def test_no_httpx_import_for_auth_only(self, gen, tmp):
        gen.emit_controller_test("projects", [AUTH_ENDPOINT], tmp)
        content = open(os.path.join(tmp, "test_projects.py")).read()
        assert "import httpx" not in content


class TestGenerate:
    def test_creates_test_dir(self, gen, tmp):
        endpoints = [AUTH_ENDPOINT]
        sdk_dir = tmp + "/sdk"
        test_dir = tmp + "/tests"
        gen.generate(endpoints, sdk_dir, test_dir)
        assert os.path.isdir(test_dir)

    def test_creates_all_expected_files(self, gen, tmp):
        endpoints = [AUTH_ENDPOINT]
        sdk_dir = tmp + "/sdk"
        test_dir = tmp + "/tests"
        gen.generate(endpoints, sdk_dir, test_dir)
        for fname in ["test_helpers.py", "conftest.py", "pyproject.toml", "test_errors.py", "test_projects.py"]:
            assert os.path.isfile(os.path.join(test_dir, fname)), f"missing {fname}"

    def test_one_controller_file_per_controller(self, gen, tmp):
        endpoints = [AUTH_ENDPOINT, UNAUTH_ENDPOINT]
        sdk_dir = tmp + "/sdk"
        test_dir = tmp + "/tests"
        gen.generate(endpoints, sdk_dir, test_dir)
        assert os.path.isfile(os.path.join(test_dir, "test_projects.py"))
        assert os.path.isfile(os.path.join(test_dir, "test_auth.py"))


class TestBuildCallArgs:
    def test_path_param_included(self, gen):
        args = gen._build_call_args(AUTH_ENDPOINT, AUTH_ENDPOINT["params"])
        assert args == "42"

    def test_query_params_included(self, gen):
        ep = {
            **AUTH_ENDPOINT,
            "params": [
                {"name": "projectId", "in": "path", "type": "integer"},
                {"name": "page", "in": "query", "type": "integer"},
            ],
        }
        args = gen._build_call_args(ep, ep["params"])
        assert "42" in args

    def test_flat_dict_body_included(self, gen):
        ep = {
            "id": "create", "function_name": "create", "controller": "c",
            "method": "POST", "path": "/x", "auth": "required", "params": [],
            "request_body": {"name": {"type": "string"}},
        }
        args = gen._build_call_args(ep, ep["params"])
        assert "'test_value'" in args

    def test_scalar_body_included(self, gen):
        ep = {
            "id": "upload", "function_name": "upload", "controller": "c",
            "method": "POST", "path": "/x", "auth": "required", "params": [],
            "request_body": {"_shape": "scalar", "param_name": "data", "type": "string"},
        }
        args = gen._build_call_args(ep, ep["params"])
        assert "'test_value'" in args

    def test_no_args_when_no_params(self, gen):
        ep = {
            "id": "ping", "function_name": "ping", "controller": "c",
            "method": "GET", "path": "/ping", "auth": "required", "params": [],
        }
        args = gen._build_call_args(ep, [])
        assert args == ""

    def test_encoding_uses_encoding_values(self, gen):
        args_normal = gen._build_call_args(AUTH_ENDPOINT, AUTH_ENDPOINT["params"], encoding=False)
        args_enc = gen._build_call_args(AUTH_ENDPOINT, AUTH_ENDPOINT["params"], encoding=True)
        # Integer path params are the same for both
        assert args_normal == args_enc  # int 42 doesn't differ

    def test_string_path_param_differs_with_encoding(self, gen):
        ep = {
            **AUTH_ENDPOINT,
            "params": [{"name": "name", "in": "path", "type": "string"}],
        }
        args_normal = gen._build_call_args(ep, ep["params"], encoding=False)
        args_enc = gen._build_call_args(ep, ep["params"], encoding=True)
        assert "'test_value'" in args_normal
        assert "'hello world'" in args_enc


class TestUsesOAuthClient:
    def test_auth_no_api_host_returns_true(self, gen):
        assert gen._uses_oauth_client(AUTH_ENDPOINT) is True

    def test_auth_with_api_host_returns_false(self, gen):
        assert gen._uses_oauth_client(ALT_HOST_ENDPOINT) is False

    def test_unauth_returns_false(self, gen):
        assert gen._uses_oauth_client(UNAUTH_ENDPOINT) is False


class TestPyLiteral:
    def test_string(self):
        assert _py_literal("hello") == "'hello'"

    def test_bool_true(self):
        assert _py_literal(True) == "True"

    def test_bool_false(self):
        assert _py_literal(False) == "False"

    def test_integer(self):
        assert _py_literal(42) == "42"

    def test_float(self):
        assert _py_literal(3.14) == "3.14"

    def test_list(self):
        assert _py_literal(["a", "b"]) == "['a', 'b']"


class TestParsePytestCounts:
    def test_all_pass(self):
        output = "===== 5 passed in 0.3s ====="
        passed, failed, total = _parse_pytest_counts(output)
        assert passed == 5
        assert failed == 0
        assert total == 5

    def test_with_failures(self):
        output = "===== 3 passed, 2 failed in 1.1s ====="
        passed, failed, total = _parse_pytest_counts(output)
        assert passed == 3
        assert failed == 2
        assert total == 5

    def test_with_errors(self):
        output = "===== 1 passed, 1 error in 0.5s ====="
        passed, failed, total = _parse_pytest_counts(output)
        assert passed == 1
        assert failed == 1
        assert total == 2

    def test_empty_output(self):
        passed, failed, total = _parse_pytest_counts("")
        assert passed == 0
        assert failed == 0
        assert total == 0
