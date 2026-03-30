import os
import sys
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "generators"))

from generators.javascript_browser import JavaScriptBrowserGenerator


@pytest.fixture
def gen():
    return JavaScriptBrowserGenerator()


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


def _unauth_ep(ep_id, path, method="GET", params=None, request_body=None):
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


# ── naming ────────────────────────────────────────────────────────────────────


def test_snake_to_camel(gen):
    assert gen.snake_to_camel("get_photos_sort") == "getPhotosSort"
    assert gen.snake_to_camel("get_photos") == "getPhotos"
    assert gen.snake_to_camel("create_users_new_company") == "createUsersNewCompany"


# ── authenticated function emission ───────────────────────────────────────────


def test_auth_fn_no_params(gen):
    ep = _auth_ep("get_status", "/api/v1/status")
    lines = gen._emit_function(ep)
    src = "\n".join(lines)
    assert "export function getStatus(client, accessToken, refreshToken)" in src
    assert "client.request" in src
    assert "'GET'" in src


def test_auth_fn_path_params(gen):
    ep = _auth_ep(
        "get_photos",
        "/api/v1/photos/{table_name}/",
        params=[{"name": "table_name", "in": "path", "type": "string", "required": True}],
    )
    lines = gen._emit_function(ep)
    src = "\n".join(lines)
    assert "tableName" in src
    assert "encodeURIComponent(tableName)" in src
    assert "client.request(path, 'GET', accessToken, refreshToken)" in src


def test_auth_fn_query_params(gen):
    ep = _auth_ep(
        "get_photos_sort",
        "/api/v1/photos/{table_name}/sort/{sortOrder}/",
        params=[
            {"name": "table_name", "in": "path", "type": "string", "required": True},
            {"name": "sortOrder", "in": "path", "type": "string", "required": True},
            {"name": "limit", "in": "query", "type": "integer", "required": False},
            {"name": "last_id", "in": "query", "type": "integer", "required": False},
        ],
    )
    lines = gen._emit_function(ep)
    src = "\n".join(lines)
    assert "export function getPhotosSort(client, accessToken, refreshToken, tableName, sortOrder, { limit, lastId } = {})" in src
    assert "query.set('limit', limit)" in src
    assert "query.set('last_id', lastId)" in src
    assert "URLSearchParams" in src
    assert "if (qs) path +=" in src


# ── unauthenticated function emission ─────────────────────────────────────────


def test_unauth_fn_structured_body(gen):
    ep = _unauth_ep(
        "create_users_new_company",
        "/api/v1/users/new_company",
        method="POST",
        request_body={
            "user": {"name": "string", "email": "string", "password": "string", "account_type": 3, "company_id": 0, "profile_picture": None},
            "company": {"name": "string"},
        },
    )
    lines = gen._emit_function(ep)
    src = "\n".join(lines)
    # Signature flattens fields; companyName disambiguated
    assert "createUsersNewCompany" in src
    assert "name" in src
    assert "companyName" in src
    assert "accountType" in src
    assert "companyId" in src
    assert "profilePicture" in src
    # Body reconstruction uses snake_case keys
    assert "account_type: accountType" in src
    assert "company_id: companyId" in src
    assert "profile_picture: profilePicture" in src
    assert "company: { name: companyName }" in src
    # Fetch call
    assert "fetch(baseUrl +" in src
    assert "'POST'" in src
    assert "JSON.stringify" in src
    assert "resp.json()" in src


def test_unauth_fn_dynamic_body(gen):
    ep = _unauth_ep(
        "update_users",
        "/api/v1/users/{user_id}",
        method="PUT",
        params=[{"name": "user_id", "in": "path", "type": "integer", "required": True}],
        request_body="dynamic (updatedData object)",
    )
    lines = gen._emit_function(ep)
    src = "\n".join(lines)
    assert "export async function updateUsers(baseUrl, userId, body = {})" in src
    assert "JSON.stringify(body)" in src


def test_unauth_fn_no_body(gen):
    ep = _unauth_ep("get_public_status", "/api/v1/status")
    lines = gen._emit_function(ep)
    src = "\n".join(lines)
    assert "export async function getPublicStatus(baseUrl)" in src
    assert "fetch(baseUrl +" in src
    assert "'GET'" in src


# ── controller file + index ────────────────────────────────────────────────────


def test_generate_output_structure(gen, tmp_path):
    endpoints = [
        _auth_ep("get_photos", "/api/v1/photos/{table_name}/",
                 params=[{"name": "table_name", "in": "path", "type": "string", "required": True}]),
        _auth_ep("get_photos_sort", "/api/v1/photos/{table_name}/sort/{sortOrder}/",
                 params=[
                     {"name": "table_name", "in": "path", "type": "string", "required": True},
                     {"name": "sortOrder", "in": "path", "type": "string", "required": True},
                 ]),
    ]
    gen.generate(endpoints, str(tmp_path))

    assert (tmp_path / "photos.js").exists()
    assert (tmp_path / "index.js").exists()
    assert (tmp_path / "rollup.config.js").exists()


def test_barrel_index_exports(gen, tmp_path):
    endpoints = [
        _auth_ep("get_photos", "/api/v1/photos/{table_name}/",
                 params=[{"name": "table_name", "in": "path", "type": "string", "required": True}]),
    ]
    gen.generate(endpoints, str(tmp_path))
    index_src = (tmp_path / "index.js").read_text()
    assert "export * from './photos.js';" in index_src


def test_oauth_import_only_for_auth(gen, tmp_path):
    auth_endpoints = [_auth_ep("get_photos", "/api/v1/photos/")]
    gen.generate(auth_endpoints, str(tmp_path))
    photos_src = (tmp_path / "photos.js").read_text()
    assert "import { OAuthClient } from './oauth/index.js';" in photos_src


def test_no_oauth_import_for_unauth(gen, tmp_path):
    unauth_ep = _unauth_ep("get_public", "/api/v1/public")
    # Override controller to "Photos" so it writes to photos.js
    unauth_ep["controller"] = "Photos"
    gen.generate([unauth_ep], str(tmp_path))
    photos_src = (tmp_path / "photos.js").read_text()
    assert "import { OAuthClient }" not in photos_src


def test_rollup_config_content(gen, tmp_path):
    gen.generate([_auth_ep("get_photos", "/api/v1/photos/")], str(tmp_path))
    rollup = (tmp_path / "rollup.config.js").read_text()
    assert "format: 'umd'" in rollup
    assert "MediaVizSdk" in rollup
    assert "input: 'index.js'" in rollup


# ── body flattening disambiguation ────────────────────────────────────────────


def test_flatten_body_no_collision(gen):
    body = {"user": {"name": "string", "email": "string"}}
    flat, groups = gen._flatten_body(body)
    assert flat == ["name", "email"]
    assert groups[0][1] == [("name", "name"), ("email", "email")]


def test_flatten_body_collision(gen):
    body = {
        "user": {"name": "string"},
        "company": {"name": "string"},
    }
    flat, groups = gen._flatten_body(body)
    assert flat == ["name", "companyName"]
    assert groups[1][1] == [("name", "companyName")]
