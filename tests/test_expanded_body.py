"""Tests for schema-expanded request-body emission across JS and PHP generators.

Covers the refactor from opaque body args to per-field unary params:
- UserCreate — flat schema with required + optional fields
- KeywordListCreate — List[X] field stays a single array param
- Scalar fallback — _model type not in schemas (EmailStr)
- Nested schema — camelCase prefixing + body reassembly
"""
from __future__ import annotations
import pytest

from generators.javascript_browser import JavaScriptBrowserGenerator
from generators.php import PhpGenerator
from resolver import expand_model_body


SCHEMAS = {
    "Company": {"fields": {"name": {"type": "str", "required": True}}},
    "CompanyCreate": {
        "extends": "Company",
        "fields": {
            "name": {"type": "str", "required": True},
            "credits": {"type": "int", "required": False},
            "payment_plan_type": {"type": "str", "required": False},
        },
    },
    "UserCreate": {
        "fields": {
            "name": {"type": "str", "required": True},
            "email": {"type": "EmailStr", "required": True},
            "company_id": {"type": "int", "required": False},
            "account_type": {"type": "int", "required": True},
            "profile_picture": {"type": "str", "required": False},
            "payment_plan_type": {"type": "str", "required": False},
        },
    },
    "KeywordListCreate": {
        "fields": {
            "name": {"type": "str", "required": True},
            "project_list": {"type": "List[str]", "required": False},
        },
    },
    # Nested: Envelope references UserCreate + CompanyCreate
    "UserCompanyEnvelope": {
        "fields": {
            "user": {"type": "UserCreate", "required": True},
            "company": {"type": "CompanyCreate", "required": True},
        },
    },
}


def _ep(ep_id, body_type, path="/api/v1/x", method="POST", controller="Users", auth="none"):
    return {
        "id": ep_id,
        "function_name": ep_id,
        "controller": controller,
        "method": method,
        "path": path,
        "auth": auth,
        "params": [],
        "request_body": expand_model_body({"$ref": f"api_schemas.yaml#{body_type}"}, SCHEMAS),
        "content_type": "application/json",
        "tags": [],
    }


# ── resolver shape fixtures ─────────────────────────────────────────────────


def test_user_create_expands_flat_fields():
    rb = expand_model_body({"$ref": "api_schemas.yaml#UserCreate"}, SCHEMAS)
    assert rb["_shape"] == "expanded"
    names = [f["name"] for f in rb["fields"]]
    assert names == ["name", "email", "companyId", "accountType", "profilePicture", "paymentPlanType"]
    required = {f["name"] for f in rb["fields"] if f["required"]}
    assert required == {"name", "email", "accountType"}


def test_keyword_list_create_list_field_stays_list():
    rb = expand_model_body({"$ref": "api_schemas.yaml#KeywordListCreate"}, SCHEMAS)
    fields = rb["fields"]
    list_field = next(f for f in fields if f["name"] == "projectList")
    assert list_field["kind"] == "list"
    assert list_field["items_type"] == "str"


def test_unknown_type_is_scalar_fallback():
    rb = expand_model_body({"$ref": "api_schemas.yaml#EmailStr"}, SCHEMAS)
    assert rb["_shape"] == "scalar"
    assert rb["param_name"] == "emailStr"
    assert rb["type"] == "EmailStr"


def test_extends_merges_parent_fields():
    rb = expand_model_body({"$ref": "api_schemas.yaml#CompanyCreate"}, SCHEMAS)
    names = [f["name"] for f in rb["fields"]]
    # Parent "Company.name" is overlaid by child; credits + payment_plan_type appended
    assert names == ["name", "credits", "paymentPlanType"]


def test_nested_schema_flattens_with_prefix():
    rb = expand_model_body({"$ref": "api_schemas.yaml#UserCompanyEnvelope"}, SCHEMAS)
    names = [f["name"] for f in rb["fields"]]
    # UserCreate fields prefixed with "user", CompanyCreate with "company"
    assert "userName" in names
    assert "userEmail" in names
    assert "userAccountType" in names
    assert "companyName" in names
    # orig_path preserved for body reassembly
    user_name = next(f for f in rb["fields"] if f["name"] == "userName")
    assert user_name["orig_path"] == ["user", "name"]


# ── JS generator emission ───────────────────────────────────────────────────


@pytest.fixture
def js():
    return JavaScriptBrowserGenerator()


def test_js_expanded_signature_required_first(js):
    ep = _ep("create_user", "UserCreate", auth="required")
    lines = js._emit_method(ep)
    src = "\n".join(lines)
    # required params first, optional with = undefined
    assert "async createUser(name, email, accountType, companyId = undefined" in src
    assert "profilePicture = undefined" in src
    assert "paymentPlanType = undefined" in src


def test_js_expanded_body_reassembles_snake_keys(js):
    ep = _ep("create_user", "UserCreate", auth="required")
    src = "\n".join(js._emit_method(ep))
    # camelCase -> snake_case body keys
    assert "account_type: accountType" in src
    assert "company_id: companyId" in src
    # wrapped in stripUndef
    assert "stripUndef({" in src


def test_js_list_field_single_array_param(js):
    ep = _ep("create_keywords", "KeywordListCreate", auth="required")
    src = "\n".join(js._emit_method(ep))
    # single unary array param, not flattened
    assert "async createKeywords(name, projectList = undefined)" in src
    assert "project_list: projectList" in src


def test_js_scalar_body_single_param(js):
    ep = _ep("request_token", "EmailStr", auth="none")
    src = "\n".join(js._emit_method(ep))
    assert "async requestToken(emailStr)" in src
    assert "JSON.stringify(emailStr)" in src


def test_js_nested_schema_reassembles_envelope(js):
    ep = _ep("create_user_and_company", "UserCompanyEnvelope", auth="required")
    src = "\n".join(js._emit_method(ep))
    # caller sees flat prefixed params
    assert "async createUserAndCompany(userName, userEmail, userAccountType" in src
    assert "companyName" in src
    # body reassembled as nested object
    assert "user: stripUndef({" in src
    assert "company: stripUndef({" in src


def test_js_reserved_keyword_escaped(js):
    schemas = {"Foo": {"fields": {"private": {"type": "bool", "required": False}}}}
    rb = expand_model_body({"$ref": "api_schemas.yaml#Foo"}, schemas)
    ep = {"id": "x", "function_name": "x", "controller": "T", "method": "POST", "path": "/x",
          "auth": "required", "params": [], "request_body": rb, "content_type": "application/json", "tags": []}
    src = "\n".join(js._emit_method(ep))
    # "private" is reserved in strict mode — must be escaped as "private_"
    assert "private_ = undefined" in src
    assert "private: private_" in src


# ── PHP generator emission ──────────────────────────────────────────────────


@pytest.fixture
def php():
    return PhpGenerator()


def test_php_expanded_signature_typed_params(php):
    ep = _ep("create_user", "UserCreate", auth="required")
    src = "\n".join(php._emit_method(ep))
    # required: bare typed; optional: nullable with default
    assert "string $name," in src
    assert "int $accountType" in src  # EmailStr -> string, int for account_type
    assert "?int $companyId = null" in src
    assert "?string $profilePicture = null" in src


def test_php_expanded_body_uses_array_filter(php):
    ep = _ep("create_user", "UserCreate", auth="required")
    src = "\n".join(php._emit_method(ep))
    assert "$body = array_filter([" in src
    assert "'account_type' => $accountType" in src
    assert "fn($v) => $v !== null" in src


def test_php_list_field_typed_as_array(php):
    ep = _ep("create_keywords", "KeywordListCreate", auth="required")
    src = "\n".join(php._emit_method(ep))
    assert "?array $projectList = null" in src
    assert "'project_list' => $projectList" in src


def test_php_scalar_body_single_typed_param(php):
    ep = _ep("request_token", "EmailStr", auth="none")
    src = "\n".join(php._emit_method(ep))
    # EmailStr is not in schemas; aliased to PHP string per type map
    assert "string $emailStr" in src
    assert "$body = $emailStr;" in src


def test_php_nested_schema_reassembles_envelope(php):
    ep = _ep("create_user_and_company", "UserCompanyEnvelope", auth="required")
    src = "\n".join(php._emit_method(ep))
    assert "string $userName" in src
    assert "string $companyName" in src
    # Nested array_filter for each sub-object
    assert "'user' => array_filter([" in src
    assert "'company' => array_filter([" in src
