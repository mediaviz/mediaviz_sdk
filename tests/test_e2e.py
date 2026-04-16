"""End-to-end test: run generate.main() in-process against a synthetic flow + controllers."""
from __future__ import annotations

import os
import sys
import textwrap

import pytest
import yaml

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, REPO_ROOT)

import generate  # noqa: E402

EXPECTED_ENDPOINT_COUNT = 2  # what we write into the synthetic flow


@pytest.fixture
def e2e_output(fake_sources, monkeypatch, capsys):
    """Drive generate.main() against an isolated tmp sibling-repo tree; yield the version dir."""
    flow_name = "test_flow"
    (fake_sources.flows / f"{flow_name}.yaml").write_text(textwrap.dedent("""\
        refs:
          - ref: "controllers/photos.yaml#get_photos_sort"
          - ref: "controllers/users.yaml#create_users_new_company"
    """))
    (fake_sources.controllers / "photos.yaml").write_text(textwrap.dedent("""\
        controller: Photos
        base_path: /api/v1
        endpoints:
          - id: get_photos_sort
            method: GET
            path: /api/v1/photos/{table_name}/sort/{sort_order}/
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
    """))
    (fake_sources.controllers / "users.yaml").write_text(textwrap.dedent("""\
        controller: Users
        base_path: /api/v1
        endpoints:
          - id: create_users_new_company
            method: POST
            path: /api/v1/users/new_company
            auth: none
            params: []
            request_body:
              name: { type: string, required: true }
            content_type: application/json
    """))

    # Stub the post-generate test-runner step so we don't shell out to npm/composer.
    from test_generators.base import TestResult
    from test_generators.javascript import JavaScriptTestGenerator
    from test_generators.php import PhpTestGenerator
    stub = lambda self, td: TestResult(success=True, total=0, passed=0, failed=0, output="")
    monkeypatch.setattr(JavaScriptTestGenerator, "run", stub)
    monkeypatch.setattr(PhpTestGenerator, "run", stub)

    output_dir = fake_sources.hub.parent / "output"
    monkeypatch.setattr(sys, "argv", [
        "generate.py",
        "--endpoints", flow_name,
        "--frameworks", "javascript,php",
        "--destination-dir", str(output_dir),
    ])
    generate.main()
    capsys.readouterr()  # drain output so it doesn't pollute later tests
    return str(output_dir / "v1.0.0")


# ── resolved YAML ──────────────────────────────────────────────────────────────


def test_resolved_yaml_created(e2e_output):
    files = [f for f in os.listdir(e2e_output) if f.startswith("resolved_") and f.endswith(".yaml")]
    assert files == ["resolved_test_flow.yaml"]


def test_resolved_yaml_endpoint_count(e2e_output):
    with open(os.path.join(e2e_output, "resolved_test_flow.yaml")) as f:
        data = yaml.safe_load(f)
    assert len(data["endpoints"]) == EXPECTED_ENDPOINT_COUNT


def test_resolved_yaml_preserves_endpoint_fields(e2e_output):
    with open(os.path.join(e2e_output, "resolved_test_flow.yaml")) as f:
        data = yaml.safe_load(f)
    photos_sort = next(ep for ep in data["endpoints"] if ep["id"] == "get_photos_sort")
    assert photos_sort["controller"] == "Photos"
    assert photos_sort["method"] == "GET"
    assert photos_sort["auth"] == "required"
    path_params = [p for p in photos_sort["params"] if p["in"] == "path"]
    assert {p["name"] for p in path_params} == {"table_name", "sort_order"}


# ── output directory structure ─────────────────────────────────────────────────


def test_javascript_v1_dir_exists(e2e_output):
    assert os.path.isdir(os.path.join(e2e_output, "javascript"))


def test_php_v1_dir_exists(e2e_output):
    assert os.path.isdir(os.path.join(e2e_output, "php"))


# ── JavaScript browser: file contents ─────────────────────────────────────────


def test_js_photos_controller_file_exists(e2e_output):
    assert os.path.isfile(os.path.join(e2e_output, "javascript", "photos.js"))


def test_js_photos_contains_get_photos_sort(e2e_output):
    content = open(os.path.join(e2e_output, "javascript", "photos.js")).read()
    assert "getPhotosSort" in content


def test_js_photos_sort_path_interpolation(e2e_output):
    content = open(os.path.join(e2e_output, "javascript", "photos.js")).read()
    assert "encodeURIComponent(tableName)" in content
    assert "encodeURIComponent(sortOrder)" in content


def test_js_photos_sort_query_params(e2e_output):
    content = open(os.path.join(e2e_output, "javascript", "photos.js")).read()
    assert "limit" in content
    assert "lastId" in content


def test_js_barrel_index_exists(e2e_output):
    assert os.path.isfile(os.path.join(e2e_output, "javascript", "index.js"))


def test_js_barrel_index_exports_photos(e2e_output):
    content = open(os.path.join(e2e_output, "javascript", "index.js")).read()
    assert "photos.js" in content


def test_js_rollup_config_exists(e2e_output):
    assert os.path.isfile(os.path.join(e2e_output, "javascript", "rollup.config.js"))


def test_js_oauth_wrapper_copied(e2e_output):
    oauth_dir = os.path.join(e2e_output, "javascript", "oauth")
    assert os.path.isdir(oauth_dir)
    assert os.listdir(oauth_dir)


def test_js_mediaviz_client_emitted(e2e_output):
    """Top-level MediaViz client class is the new entry point — emitted alongside controller files."""
    assert os.path.isfile(os.path.join(e2e_output, "javascript", "MediaViz.js"))


# ── PHP: file contents ─────────────────────────────────────────────────────────


def test_php_photos_class_file_exists(e2e_output):
    assert os.path.isfile(os.path.join(e2e_output, "php", "Photos.php"))


def test_php_photos_contains_get_photos_sort(e2e_output):
    content = open(os.path.join(e2e_output, "php", "Photos.php")).read()
    assert "getPhotosSort" in content


def test_php_photos_sort_path_interpolation(e2e_output):
    content = open(os.path.join(e2e_output, "php", "Photos.php")).read()
    # current emitter uses rawurlencode (verified against generators/php.py _build_path)
    assert "rawurlencode((string)$tableName)" in content
    assert "rawurlencode((string)$sortOrder)" in content


def test_php_photos_class_structure(e2e_output):
    content = open(os.path.join(e2e_output, "php", "Photos.php")).read()
    assert "declare(strict_types=1);" in content
    assert "namespace MediaVizSdk;" in content
    assert "class Photos" in content


def test_php_oauth_wrapper_copied(e2e_output):
    oauth_dir = os.path.join(e2e_output, "php", "oauth")
    assert os.path.isdir(oauth_dir)
    assert os.listdir(oauth_dir)


def test_php_composer_config_exists(e2e_output):
    assert os.path.isfile(os.path.join(e2e_output, "php", "composer.json"))


# ── version consistency ────────────────────────────────────────────────────────


def test_all_frameworks_use_same_version(e2e_output):
    """Both framework dirs land under the same v* version dir."""
    assert os.path.isdir(os.path.join(e2e_output, "javascript"))
    assert os.path.isdir(os.path.join(e2e_output, "php"))
