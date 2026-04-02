import pytest
from test_generators.base import BaseTestGenerator, TestResult


# Concrete stub so we can instantiate the ABC
class _StubGenerator(BaseTestGenerator):
    framework_name = "stub"

    def generate(self, endpoints, sdk_dir, test_dir):
        pass

    def run(self, test_dir):
        return TestResult(success=True, total=0, passed=0, failed=0, output="")


@pytest.fixture
def gen():
    return _StubGenerator()


# ---------------------------------------------------------------------------
# TestResult
# ---------------------------------------------------------------------------

def test_test_result_fields():
    r = TestResult(success=False, total=10, passed=7, failed=3, output="oops")
    assert r.success is False
    assert r.total == 10
    assert r.passed == 7
    assert r.failed == 3
    assert r.output == "oops"


# ---------------------------------------------------------------------------
# test_value_for_type
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("type_str,expected", [
    ("string", "test_value"),
    ("integer", 42),
    ("int", 42),
    ("boolean", True),
    ("bool", True),
    ("number", 3.14),
    ("float", 3.14),
    ("array", ["item1", "item2"]),
])
def test_test_value_for_type_standard(gen, type_str, expected):
    assert gen.test_value_for_type(type_str) == expected


def test_test_value_for_type_unknown_defaults_to_string(gen):
    assert gen.test_value_for_type("object") == "test_value"


def test_test_value_for_type_encoding_string(gen):
    # encoding=True should yield a value with a space to exercise percent-encoding
    val = gen.test_value_for_type("string", encoding=True)
    assert " " in str(val)


# ---------------------------------------------------------------------------
# build_expected_path
# ---------------------------------------------------------------------------

def test_build_expected_path_no_params(gen):
    assert gen.build_expected_path("/api/v1/keywords", []) == "/api/v1/keywords"


def test_build_expected_path_integer_param(gen):
    params = [{"name": "keywordListId", "in": "path", "type": "integer"}]
    result = gen.build_expected_path("/api/v1/keyword/list/{keywordListId}", params)
    assert result == "/api/v1/keyword/list/42"


def test_build_expected_path_string_param_url_encoded(gen):
    params = [{"name": "slug", "in": "path", "type": "string"}]
    result = gen.build_expected_path("/api/v1/items/{slug}", params)
    # encoding=True is used for path params; "hello world" -> "hello%20world"
    assert result == "/api/v1/items/hello%20world"


def test_build_expected_path_multiple_params(gen):
    params = [
        {"name": "userId", "in": "path", "type": "integer"},
        {"name": "itemId", "in": "path", "type": "integer"},
    ]
    result = gen.build_expected_path("/api/v1/users/{userId}/items/{itemId}", params)
    assert result == "/api/v1/users/42/items/42"


def test_build_expected_path_ignores_query_params(gen):
    params = [
        {"name": "id", "in": "path", "type": "integer"},
        {"name": "filter", "in": "query", "type": "string"},
    ]
    result = gen.build_expected_path("/api/v1/items/{id}", params)
    assert result == "/api/v1/items/42"
    assert "filter" not in result


# ---------------------------------------------------------------------------
# build_expected_query_string
# ---------------------------------------------------------------------------

def test_build_expected_query_string_no_params(gen):
    assert gen.build_expected_query_string([]) == ""


def test_build_expected_query_string_ignores_path_params(gen):
    params = [{"name": "id", "in": "path", "type": "integer"}]
    assert gen.build_expected_query_string(params) == ""


def test_build_expected_query_string_single_param(gen):
    params = [{"name": "page", "in": "query", "type": "integer"}]
    result = gen.build_expected_query_string(params)
    assert result == "?page=42"


def test_build_expected_query_string_multiple_params(gen):
    params = [
        {"name": "page", "in": "query", "type": "integer"},
        {"name": "limit", "in": "query", "type": "integer"},
    ]
    result = gen.build_expected_query_string(params)
    assert "page=42" in result
    assert "limit=42" in result
    assert result.startswith("?")


def test_build_expected_query_string_uses_snake_case_names(gen):
    params = [{"name": "keyword_list_id", "in": "query", "type": "integer"}]
    result = gen.build_expected_query_string(params)
    assert "keyword_list_id=42" in result


# ---------------------------------------------------------------------------
# group_by_controller
# ---------------------------------------------------------------------------

def test_group_by_controller_basic(gen):
    endpoints = [
        {"controller": "keywords", "name": "list"},
        {"controller": "keywords", "name": "get"},
        {"controller": "auth", "name": "login"},
    ]
    groups = gen.group_by_controller(endpoints)
    assert set(groups.keys()) == {"keywords", "auth"}
    assert len(groups["keywords"]) == 2
    assert len(groups["auth"]) == 1


def test_group_by_controller_skips_hidden(gen):
    endpoints = [
        {"controller": "keywords", "name": "list"},
        {"controller": "internal", "name": "secret", "hidden": True},
    ]
    groups = gen.group_by_controller(endpoints)
    assert "internal" not in groups
    assert "keywords" in groups
