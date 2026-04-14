import os
import yaml
import pytest

from resolver import parse_ref, resolve_refs, write_flattened_yaml

DOCS_DIR = os.path.normpath(os.path.join(os.path.dirname(__file__), "../../mediaviz_docs/api_docs"))
TOP_ENDPOINTS = os.path.join(DOCS_DIR, "top_endpoints.yaml")


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

def test_resolve_top_endpoints_count():
    """All refs in top_endpoints.yaml must resolve."""
    with open(TOP_ENDPOINTS) as f:
        ref_list = yaml.safe_load(f)
    expected_count = len(ref_list["refs"])

    endpoints = resolve_refs(TOP_ENDPOINTS)
    assert len(endpoints) == expected_count


def test_resolve_preserves_required_fields():
    endpoints = resolve_refs(TOP_ENDPOINTS)
    required_keys = {"id", "controller", "base_path", "method", "path", "summary",
                     "auth", "params", "request_body", "response", "content_type", "tags",
                     "hidden"}
    for ep in endpoints:
        assert required_keys == set(ep.keys()), f"Missing keys in endpoint: {ep['id']}"


def test_resolve_photos_sort_fields():
    endpoints = resolve_refs(TOP_ENDPOINTS)
    ep = next(e for e in endpoints if e["id"] == "get_photos_by_month_year_sort")

    assert ep["controller"] == "Photos"
    assert ep["base_path"] == "/api/v1"
    assert ep["method"] == "GET"
    assert ep["path"] == "/api/v1/photos/{projectTable}/month/{month}/year/{year}/"
    assert ep["auth"] == "required"
    assert isinstance(ep["params"], list)
    assert len(ep["params"]) == 6

    path_params = [p for p in ep["params"] if p["in"] == "path"]
    query_params = [p for p in ep["params"] if p["in"] == "query"]
    assert {p["name"] for p in path_params} == {"projectTable", "month", "year"}
    assert {p["name"] for p in query_params} == {"asc_or_desc", "last_id", "limit"}


def test_resolve_unauth_endpoint():
    endpoints = resolve_refs(TOP_ENDPOINTS)
    ep = next(e for e in endpoints if e["id"] == "create_users_new_company")
    assert ep["auth"] == "none"
    assert ep["content_type"] == "application/json"
    assert ep["request_body"] is not None


def test_resolve_unknown_endpoint_raises(tmp_path):
    ref_list = {"refs": [{"ref": "controllers/photos.yaml#nonexistent_id"}]}
    ref_list_path = str(tmp_path / "refs.yaml")
    import yaml as _yaml
    with open(ref_list_path, "w") as f:
        _yaml.dump(ref_list, f)

    # Copy photos.yaml so the path resolves
    import shutil
    ctrl_dir = tmp_path / "controllers"
    ctrl_dir.mkdir()
    shutil.copy(os.path.join(DOCS_DIR, "controllers/photos.yaml"), ctrl_dir / "photos.yaml")

    with pytest.raises(ValueError, match="not found"):
        resolve_refs(ref_list_path)


# --- write_flattened_yaml ---

def test_write_flattened_yaml_structure(tmp_path):
    endpoints = resolve_refs(TOP_ENDPOINTS)
    version_dir = str(tmp_path / "v3")
    out_path = write_flattened_yaml(endpoints, TOP_ENDPOINTS, version_dir)

    assert os.path.isfile(out_path)
    assert os.path.basename(out_path) == "resolved_top_endpoints.yaml"

    with open(out_path) as f:
        data = yaml.safe_load(f)

    assert data["source"] == "top_endpoints.yaml"
    assert "resolved_at" in data
    assert isinstance(data["endpoints"], list)
    assert len(data["endpoints"]) == len(endpoints)


def test_write_flattened_yaml_creates_version_dir(tmp_path):
    endpoints = resolve_refs(TOP_ENDPOINTS)
    version_dir = str(tmp_path / "v1")
    write_flattened_yaml(endpoints, TOP_ENDPOINTS, version_dir)
    assert os.path.isdir(tmp_path / "v1")
