import os
import textwrap
from types import SimpleNamespace

import pytest
import yaml

from resolver import (
    parse_ref,
    resolve_refs,
    validate_composite_endpoints,
    validate_endpoint_param_sources,
    write_flattened_yaml,
)


@pytest.fixture
def docs(tmp_path):
    """Minimal ref-list + controllers tree to exercise the resolver."""
    ctrl_dir = tmp_path / "controllers"
    ctrl_dir.mkdir()
    (ctrl_dir / "photos.yaml").write_text(textwrap.dedent("""\
        controller: Photos
        base_path: /api/v1
        endpoints:
          - id: get_photos_sort
            method: GET
            path: /api/v1/photos/{table_name}/sort/{sort_order}/
            summary: List photos sorted
            auth: required
            params:
              - name: table_name
                in: path
                type: string
                required: true
              - name: sort_order
                in: path
                type: string
                required: true
              - name: limit
                in: query
                type: integer
                required: false
              - name: last_id
                in: query
                type: integer
                required: false
            request_body: null
            response: null
            content_type: null
            tags: []
    """))
    (ctrl_dir / "users.yaml").write_text(textwrap.dedent("""\
        controller: Users
        base_path: /api/v1
        endpoints:
          - id: create_users_new_company
            method: POST
            path: /api/v1/users/new_company
            summary: Create a new company user
            auth: none
            params: []
            request_body:
              name:
                type: string
                required: true
            response: null
            content_type: application/json
            tags: []
    """))
    top = tmp_path / "top_endpoints.yaml"
    top.write_text(textwrap.dedent("""\
        refs:
          - ref: "controllers/photos.yaml#get_photos_sort"
          - ref: "controllers/users.yaml#create_users_new_company"
    """))
    return SimpleNamespace(top=str(top), ctrl_dir=str(ctrl_dir))


# --- parse_ref ---

def test_parse_ref_basic():
    file_part, endpoint_id = parse_ref("controllers/photos.yaml#get_photos_sort")
    assert file_part == "controllers/photos.yaml"
    assert endpoint_id == "get_photos_sort"


def test_parse_ref_missing_hash():
    with pytest.raises(ValueError, match="missing '#'"):
        parse_ref("controllers/photos.yaml")


def test_parse_ref_preserves_subpath():
    file_part, endpoint_id = parse_ref("controllers/admin.yaml#get_admin_category_labels")
    assert file_part == "controllers/admin.yaml"
    assert endpoint_id == "get_admin_category_labels"


# --- resolve_refs ---

def test_resolve_top_endpoints_count(docs):
    """All refs in top_endpoints.yaml must resolve."""
    with open(docs.top) as f:
        ref_list = yaml.safe_load(f)
    expected_count = len(ref_list["refs"])

    endpoints, *_ = resolve_refs(docs.top)
    assert len(endpoints) == expected_count


def test_resolve_preserves_required_fields(docs):
    endpoints, *_ = resolve_refs(docs.top)
    # _flatten() always emits these keys (resolver.py:228-244)
    required_keys = {
        "id", "function_name", "controller", "base_path", "method", "path",
        "summary", "auth", "params", "request_body", "response", "content_type",
        "tags", "hidden", "api_host",
    }
    for ep in endpoints:
        assert required_keys == set(ep.keys()), f"Mismatched keys in endpoint: {ep['id']}"


def test_resolve_photos_sort_fields(docs):
    endpoints, *_ = resolve_refs(docs.top)
    ep = next(e for e in endpoints if e["id"] == "get_photos_sort")

    assert ep["controller"] == "Photos"
    assert ep["base_path"] == "/api/v1"
    assert ep["method"] == "GET"
    assert ep["path"] == "/api/v1/photos/{table_name}/sort/{sort_order}/"
    assert ep["auth"] == "required"
    assert isinstance(ep["params"], list)
    assert len(ep["params"]) == 4

    path_params = [p for p in ep["params"] if p["in"] == "path"]
    query_params = [p for p in ep["params"] if p["in"] == "query"]
    assert {p["name"] for p in path_params} == {"table_name", "sort_order"}
    assert {p["name"] for p in query_params} == {"limit", "last_id"}


def test_resolve_unauth_endpoint(docs):
    endpoints, *_ = resolve_refs(docs.top)
    ep = next(e for e in endpoints if e["id"] == "create_users_new_company")
    assert ep["auth"] == "none"
    assert ep["content_type"] == "application/json"
    assert ep["request_body"] is not None


def test_resolve_unknown_endpoint_raises(tmp_path):
    ref_list = {"refs": [{"ref": "controllers/photos.yaml#nonexistent_id"}]}
    ref_list_path = str(tmp_path / "refs.yaml")
    with open(ref_list_path, "w") as f:
        yaml.dump(ref_list, f)

    ctrl_dir = tmp_path / "controllers"
    ctrl_dir.mkdir()
    (ctrl_dir / "photos.yaml").write_text(textwrap.dedent("""\
        controller: Photos
        base_path: /api/v1
        endpoints:
          - id: get_photos
            method: GET
            path: /api/v1/photos/
            auth: required
            params: []
    """))

    endpoints, _, warnings = resolve_refs(ref_list_path)
    assert len(endpoints) == 0
    assert any("not found" in w for w in warnings)


# --- write_flattened_yaml ---

def test_write_flattened_yaml_structure(docs, tmp_path):
    endpoints, *_ = resolve_refs(docs.top)
    version_dir = str(tmp_path / "v3")
    out_path = write_flattened_yaml(endpoints, docs.top, version_dir)

    assert os.path.isfile(out_path)
    assert os.path.basename(out_path) == "resolved_top_endpoints.yaml"

    with open(out_path) as f:
        data = yaml.safe_load(f)

    assert data["source"] == "top_endpoints.yaml"
    assert "resolved_at" in data
    assert isinstance(data["endpoints"], list)
    assert len(data["endpoints"]) == len(endpoints)


def test_write_flattened_yaml_creates_version_dir(docs, tmp_path):
    endpoints, *_ = resolve_refs(docs.top)
    version_dir = str(tmp_path / "v1")
    write_flattened_yaml(endpoints, docs.top, version_dir)
    assert os.path.isdir(tmp_path / "v1")


def _composite_with_input_map(input_map):
    ep = {
        "id": "post_x",
        "params": [{"name": "x-blur", "in": "header"}],
        "request_body": {"file_content": {"type": "str", "required": True}},
    }
    comp = {"id": "c", "steps": [{"step_id": "s", "endpoint": ep, "input_map": input_map}]}
    return [comp], [ep]


def test_validate_composite_accepts_declared_input_map_keys():
    composites, endpoints = _composite_with_input_map(
        {"x-blur": "steps.t.blur", "file_content": "params.p.file_content"}
    )
    validate_composite_endpoints(composites, endpoints)  # param + body field — no raise


def test_validate_composite_rejects_undeclared_input_map_key():
    composites, endpoints = _composite_with_input_map(
        {"x-bucket-name": "steps.t.bucket_name"}
    )
    with pytest.raises(ValueError, match="x-bucket-name"):
        validate_composite_endpoints(composites, endpoints)


def test_validate_composite_skips_opaque_body():
    composites, endpoints = _composite_with_input_map({"anything": "params.x"})
    endpoints[0]["request_body"] = "opaque"  # non-dict body → field names unknown
    composites[0]["steps"][0]["endpoint"]["request_body"] = "opaque"
    validate_composite_endpoints(composites, endpoints)  # key check skipped — no raise


def test_validate_composite_rejects_unmapped_required_body_field():
    """The judgment_model bug class: a new required upstream field with no input_map
    entry generates a literal undefined in the call rather than failing the build."""
    composites, endpoints = _composite_with_input_map({"x-blur": "steps.t.blur"})
    with pytest.raises(ValueError, match="file_content"):
        validate_composite_endpoints(composites, endpoints)


def test_validate_composite_rejects_unmapped_required_param():
    composites, endpoints = _composite_with_input_map({"file_content": "params.p.fc"})
    for ep in (endpoints[0], composites[0]["steps"][0]["endpoint"]):
        ep["params"] = [{"name": "table_name", "in": "path", "required": True}]
    with pytest.raises(ValueError, match="table_name"):
        validate_composite_endpoints(composites, endpoints)


def test_validate_composite_allows_unmapped_optional_body_field():
    composites, endpoints = _composite_with_input_map({"file_content": "params.p.fc"})
    for ep in (endpoints[0], composites[0]["steps"][0]["endpoint"]):
        ep["request_body"]["client_side_id"] = {"type": "str", "required": False}
    validate_composite_endpoints(composites, endpoints)  # optional — no raise


def test_validate_composite_treats_absent_required_key_as_required():
    """Mirrors BaseGenerator._flat_body_categories, which defaults required to True."""
    composites, endpoints = _composite_with_input_map({"file_content": "params.p.fc"})
    for ep in (endpoints[0], composites[0]["steps"][0]["endpoint"]):
        ep["request_body"]["judgment"] = {"type": "bool|string (model toggle)"}
    with pytest.raises(ValueError, match="judgment"):
        validate_composite_endpoints(composites, endpoints)


# ── param-source validation (photo_data bug class) ────────────────────────────


def _ep(param_type, location="query", ep_id="update_photo_in_project"):
    return {
        "id": ep_id,
        "method": "PUT",
        "path": "/api/v1/photos_update",
        "params": [{"name": "photo_data", "in": location, "type": param_type, "required": False}],
    }


def test_dict_query_param_is_rejected():
    """A dict in the query string stringifies to [object Object] and the server
    demands a body — the mismatch is invisible until a 422 at runtime."""
    with pytest.raises(ValueError, match="dict-shaped type in a non-body location"):
        validate_endpoint_param_sources([_ep("dict")])


@pytest.mark.parametrize("declared", ["dict", "Dict[str, Any]", "Mapping[str, str]", "List[dict]"])
def test_all_dict_like_query_types_are_rejected(declared):
    with pytest.raises(ValueError, match="cannot be "):
        validate_endpoint_param_sources([_ep(declared)])


@pytest.mark.parametrize("location", ["query", "path", "header", "cookie"])
def test_dict_rejected_in_every_non_body_location(location):
    with pytest.raises(ValueError):
        validate_endpoint_param_sources([_ep("dict", location=location)])


@pytest.mark.parametrize("declared", ["str", "int", "Optional[bool]", "UUID", "EmailStr", "float"])
def test_scalar_query_params_pass(declared):
    validate_endpoint_param_sources([_ep(declared)])


@pytest.mark.parametrize("declared", ["List[str]", "Annotated[any]"])
def test_repeatable_scalar_lists_are_allowed(declared):
    """These are legitimate repeatable query params and are used by ~30 real
    endpoints — flagging them would be a false positive that blocks generation."""
    validate_endpoint_param_sources([_ep(declared)])


def test_dict_in_request_body_is_allowed():
    """The body is exactly where a dict belongs."""
    validate_endpoint_param_sources([
        {"id": "x", "method": "PUT", "path": "/x", "params": [], "request_body": "dict"},
    ])


def test_error_names_the_offending_endpoint_and_param():
    with pytest.raises(ValueError) as exc:
        validate_endpoint_param_sources([_ep("dict")])
    msg = str(exc.value)
    assert "update_photo_in_project" in msg
    assert "photo_data" in msg
    assert "request_body" in msg  # points at the fix


def test_endpoints_without_params_pass():
    validate_endpoint_param_sources([{"id": "x", "method": "GET", "path": "/x"}])
