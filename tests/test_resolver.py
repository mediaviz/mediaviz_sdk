import os
import textwrap
from types import SimpleNamespace

import pytest
import yaml

from resolver import parse_ref, resolve_refs, write_flattened_yaml


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
