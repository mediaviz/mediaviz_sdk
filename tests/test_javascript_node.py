import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from generators.javascript_node import JavaScriptNodeGenerator

import pytest


@pytest.fixture
def gen():
    return JavaScriptNodeGenerator()


def _auth_ep(ep_id, path, method="GET", params=None):
    return {
        "id": ep_id,
        "controller": "Photos",
        "method": method,
        "path": path,
        "auth": "required",
        "params": params or [],
        "request_body": None,
        "content_type": None,
        "tags": [],
    }


def _unauth_ep(ep_id, path, method="POST", params=None, request_body=None):
    return {
        "id": ep_id,
        "controller": "Users",
        "method": method,
        "path": path,
        "auth": "none",
        "params": params or [],
        "request_body": request_body,
        "content_type": "application/json" if request_body else None,
        "tags": [],
    }


def test_framework_name(gen):
    assert gen.framework_name == "nodeJS"


def test_generate_no_rollup(gen, tmp_path):
    endpoints = [_auth_ep("get_photos", "/api/v1/photos/")]
    gen.generate(endpoints, str(tmp_path))
    assert not (tmp_path / "rollup.config.js").exists()


def test_generate_emits_controller_and_index(gen, tmp_path):
    endpoints = [
        _auth_ep(
            "get_photos",
            "/api/v1/photos/{table_name}/",
            params=[{"name": "table_name", "in": "path", "type": "string", "required": True}],
        )
    ]
    gen.generate(endpoints, str(tmp_path))
    assert (tmp_path / "photos.js").exists()
    assert (tmp_path / "index.js").exists()


def test_barrel_index_exports(gen, tmp_path):
    gen.generate([_auth_ep("get_photos", "/api/v1/photos/")], str(tmp_path))
    index_src = (tmp_path / "index.js").read_text()
    assert "export * from './photos.js';" in index_src


def test_auth_function_signature(gen, tmp_path):
    ep = _auth_ep(
        "get_photos_sort",
        "/api/v1/photos/{table_name}/sort/{sortOrder}/",
        params=[
            {"name": "table_name", "in": "path", "type": "string", "required": True},
            {"name": "sortOrder", "in": "path", "type": "string", "required": True},
            {"name": "limit", "in": "query", "type": "integer", "required": False},
        ],
    )
    gen.generate([ep], str(tmp_path))
    src = (tmp_path / "photos.js").read_text()
    assert "export function getPhotosSort(client, accessToken, refreshToken, tableName, sortOrder, { limit } = {})" in src
    assert "client.request(path, 'GET', accessToken, refreshToken)" in src
    assert "URLSearchParams" in src


def test_unauth_structured_body(gen, tmp_path):
    ep = _unauth_ep(
        "create_users_new_company",
        "/api/v1/users/new_company",
        request_body={
            "user": {"name": "string", "email": "string"},
            "company": {"name": "string"},
        },
    )
    gen.generate([ep], str(tmp_path))
    src = (tmp_path / "users.js").read_text()
    assert "createUsersNewCompany" in src
    assert "companyName" in src
    assert "fetch(baseUrl +" in src
    assert "JSON.stringify" in src


def test_oauth_import_only_when_auth_required(gen, tmp_path):
    auth_ep = _auth_ep("get_photos", "/api/v1/photos/")
    gen.generate([auth_ep], str(tmp_path))
    src = (tmp_path / "photos.js").read_text()
    assert "import { OAuthClient } from './oauth/index.js';" in src


def test_no_oauth_import_for_unauth(gen, tmp_path):
    ep = _unauth_ep("get_public", "/api/v1/public", method="GET")
    ep["controller"] = "Photos"
    gen.generate([ep], str(tmp_path))
    src = (tmp_path / "photos.js").read_text()
    assert "import { OAuthClient }" not in src


def test_copy_auth_wrapper_uses_javascript_subdir(gen, tmp_path):
    # oauth root has javascript/ subdir with a sentinel file
    js_oauth = tmp_path / "oauth_root" / "javascript"
    js_oauth.mkdir(parents=True)
    (js_oauth / "index.js").write_text("// oauth stub")
    out_dir = tmp_path / "out"
    out_dir.mkdir()
    gen.copy_auth_wrapper(str(tmp_path / "oauth_root"), str(out_dir))
    assert (out_dir / "oauth" / "index.js").exists()
