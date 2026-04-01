"""End-to-end test: run generate.py against the real top_endpoints.yaml."""
from __future__ import annotations

import os
import subprocess
import sys

import pytest
import yaml

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MEDIAVIZ_DOCS = os.path.abspath(os.path.join(REPO_ROOT, "..", "mediaviz_docs"))
ENDPOINTS_YAML = os.path.join(MEDIAVIZ_DOCS, "api-docs", "top_endpoints.yaml")
CONTROLLERS_DIR = os.path.join(MEDIAVIZ_DOCS, "api-docs", "controllers")

EXPECTED_ENDPOINT_COUNT = 73


def _count_refs(path: str) -> int:
    with open(path) as f:
        data = yaml.safe_load(f)
    return len(data.get("refs", []))


@pytest.fixture(scope="module")
def e2e_output(tmp_path_factory):
    """Run generate.py once against the real endpoints; yield the output dir."""
    output_dir = str(tmp_path_factory.mktemp("e2e_output"))

    # Minimal OAuth SDK stub: javascript and php subdirs
    oauth_root = str(tmp_path_factory.mktemp("oauth_sdk"))
    for subdir, filename in [("javascript", "index.js"), ("php", "OAuthClient.php")]:
        d = os.path.join(oauth_root, subdir)
        os.makedirs(d)
        with open(os.path.join(d, filename), "w") as f:
            f.write(f"// {subdir} oauth stub\n")

    cmd = [
        sys.executable,
        os.path.join(REPO_ROOT, "generate.py"),
        "--endpoints", ENDPOINTS_YAML,
        "--controllers", CONTROLLERS_DIR,
        "--oauth-sdk", oauth_root,
        "--frameworks", "javascript,php",
        "--output", output_dir,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=REPO_ROOT)
    assert result.returncode == 0, f"generate.py failed:\n{result.stderr}\n{result.stdout}"
    return output_dir


# ── prerequisites ──────────────────────────────────────────────────────────────

def test_real_endpoints_yaml_exists():
    assert os.path.isfile(ENDPOINTS_YAML), f"Missing {ENDPOINTS_YAML}"


def test_real_endpoints_yaml_ref_count():
    assert _count_refs(ENDPOINTS_YAML) == EXPECTED_ENDPOINT_COUNT


# ── resolved YAML ──────────────────────────────────────────────────────────────

def test_resolved_yaml_created(e2e_output):
    resolved_dir = os.path.join(e2e_output, "resolved")
    files = [f for f in os.listdir(resolved_dir) if f.endswith(".yaml")]
    assert len(files) == 1
    assert files[0].startswith("v1_")


def test_resolved_yaml_endpoint_count(e2e_output):
    resolved_dir = os.path.join(e2e_output, "resolved")
    yaml_file = next(f for f in os.listdir(resolved_dir) if f.endswith(".yaml"))
    with open(os.path.join(resolved_dir, yaml_file)) as f:
        data = yaml.safe_load(f)
    assert data["version"] == 1
    assert len(data["endpoints"]) == EXPECTED_ENDPOINT_COUNT


def test_resolved_yaml_preserves_endpoint_fields(e2e_output):
    resolved_dir = os.path.join(e2e_output, "resolved")
    yaml_file = next(f for f in os.listdir(resolved_dir) if f.endswith(".yaml"))
    with open(os.path.join(resolved_dir, yaml_file)) as f:
        data = yaml.safe_load(f)
    photos_sort = next(ep for ep in data["endpoints"] if ep["id"] == "get_photos_sort")
    assert photos_sort["controller"] == "Photos"
    assert photos_sort["method"] == "GET"
    assert photos_sort["auth"] == "required"
    path_params = [p for p in photos_sort["params"] if p["in"] == "path"]
    assert {p["name"] for p in path_params} == {"table_name", "sortOrder"}


# ── output directory structure ─────────────────────────────────────────────────

def test_javascript_v1_dir_exists(e2e_output):
    assert os.path.isdir(os.path.join(e2e_output, "v1", "javascript"))


def test_php_v1_dir_exists(e2e_output):
    assert os.path.isdir(os.path.join(e2e_output, "v1", "php"))


# ── JavaScript browser: file contents ─────────────────────────────────────────

def test_js_photos_controller_file_exists(e2e_output):
    assert os.path.isfile(os.path.join(e2e_output, "v1", "javascript", "photos.js"))


def test_js_photos_contains_get_photos_sort(e2e_output):
    content = open(os.path.join(e2e_output, "v1", "javascript", "photos.js")).read()
    assert "getPhotosSort" in content


def test_js_photos_sort_path_interpolation(e2e_output):
    content = open(os.path.join(e2e_output, "v1", "javascript", "photos.js")).read()
    assert "encodeURIComponent(tableName)" in content
    assert "encodeURIComponent(sortOrder)" in content


def test_js_photos_sort_query_params(e2e_output):
    content = open(os.path.join(e2e_output, "v1", "javascript", "photos.js")).read()
    # limit and last_id are optional query params
    assert "limit" in content
    assert "lastId" in content


def test_js_barrel_index_exists(e2e_output):
    assert os.path.isfile(os.path.join(e2e_output, "v1", "javascript", "index.js"))


def test_js_barrel_index_exports_photos(e2e_output):
    content = open(os.path.join(e2e_output, "v1", "javascript", "index.js")).read()
    assert "photos.js" in content


def test_js_rollup_config_exists(e2e_output):
    assert os.path.isfile(os.path.join(e2e_output, "v1", "javascript", "rollup.config.js"))


def test_js_oauth_wrapper_copied(e2e_output):
    oauth_dir = os.path.join(e2e_output, "v1", "javascript", "oauth")
    assert os.path.isdir(oauth_dir)
    assert any(os.listdir(oauth_dir))


# ── PHP: file contents ─────────────────────────────────────────────────────────

def test_php_photos_class_file_exists(e2e_output):
    assert os.path.isfile(os.path.join(e2e_output, "v1", "php", "Photos.php"))


def test_php_photos_contains_get_photos_sort(e2e_output):
    content = open(os.path.join(e2e_output, "v1", "php", "Photos.php")).read()
    assert "getPhotosSort" in content


def test_php_photos_sort_path_interpolation(e2e_output):
    content = open(os.path.join(e2e_output, "v1", "php", "Photos.php")).read()
    assert "urlencode($tableName)" in content
    assert "urlencode($sortOrder)" in content


def test_php_photos_class_structure(e2e_output):
    content = open(os.path.join(e2e_output, "v1", "php", "Photos.php")).read()
    assert "declare(strict_types=1);" in content
    assert "namespace MediaVizSdk;" in content
    assert "class Photos" in content


def test_php_oauth_wrapper_copied(e2e_output):
    oauth_dir = os.path.join(e2e_output, "v1", "php", "oauth")
    assert os.path.isdir(oauth_dir)
    assert any(os.listdir(oauth_dir))


def test_php_composer_config_exists(e2e_output):
    assert os.path.isfile(os.path.join(e2e_output, "v1", "php", "composer.json"))


# ── version consistency ────────────────────────────────────────────────────────

def test_all_frameworks_use_same_version(e2e_output):
    """Resolved YAML version matches all framework output dir names."""
    resolved_dir = os.path.join(e2e_output, "resolved")
    yaml_file = next(f for f in os.listdir(resolved_dir) if f.endswith(".yaml"))
    version = int(yaml_file.split("_")[0][1:])  # v1_foo.yaml → 1

    for framework in ("javascript", "php"):
        fw_dir = os.path.join(e2e_output, f"v{version}", framework)
        assert os.path.isdir(fw_dir), f"v{version}/{framework} missing"
