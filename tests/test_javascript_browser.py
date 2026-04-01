import os
import sys
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "generators"))

from generators.javascript_browser import JavaScriptBrowserGenerator


@pytest.fixture
def gen():
    return JavaScriptBrowserGenerator()


def _auth_ep(ep_id, path, method="GET", params=None, request_body=None):
    return {
        "id": ep_id,
        "controller": "Photos",
        "method": method,
        "path": path,
        "auth": "required",
        "params": params or [],
        "request_body": request_body,
        "content_type": "application/json" if request_body else None,
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


def test_auth_fn_dynamic_body(gen):
    ep = _auth_ep(
        "update_projects",
        "/api/v1/projects/{project_id}",
        method="PUT",
        params=[{"name": "project_id", "in": "path", "type": "integer", "required": True}],
        request_body="varies by caller: name, directory, or thumbnail",
    )
    lines = gen._emit_function(ep)
    src = "\n".join(lines)
    assert "body = {}" in src
    assert "JSON.stringify(body)" in src
    assert "client.request(path, 'PUT', accessToken, refreshToken, JSON.stringify(body))" in src


def test_auth_fn_structured_body(gen):
    ep = _auth_ep(
        "create_projects_event",
        "/api/v1/projects/{project_table_name}/event",
        method="POST",
        params=[{"name": "project_table_name", "in": "path", "type": "string", "required": True}],
        request_body={
            "event": {"type": "string", "required": True},
            "detail": {"type": "string", "required": True},
        },
    )
    lines = gen._emit_function(ep)
    src = "\n".join(lines)
    assert "{ event, detail }" in src
    assert "JSON.stringify({ event, detail })" in src
    assert "client.request(path, 'POST', accessToken, refreshToken, JSON.stringify({ event, detail }))" in src


# ── unauthenticated function emission ─────────────────────────────────────────


def test_unauth_fn_structured_body(gen):
    ep = _unauth_ep(
        "create_token",
        "/api/v1/token/",
        method="POST",
        request_body={
            "username": {"type": "string (email)", "required": True},
            "password": {"type": "string", "required": True},
        },
    )
    lines = gen._emit_function(ep)
    src = "\n".join(lines)
    assert "createToken" in src
    assert "{ username, password }" in src
    assert "username" in src
    assert "password" in src
    assert "JSON.stringify" in src
    assert "fetch(baseUrl +" in src
    assert "'POST'" in src
    assert "handleResponse(resp)" in src


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
    assert "import { OAuthClient }" in photos_src


def test_oauth_import_uses_reexport_when_module_registered(gen, tmp_path):
    gen._copied_modules.append({"name": "oauth", "path": str(tmp_path / "oauth")})
    gen.generate([_auth_ep("get_photos", "/api/v1/photos/")], str(tmp_path))
    photos_src = (tmp_path / "photos.js").read_text()
    assert "import { OAuthClient } from './_oauth.js';" in photos_src


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
    assert "input: 'index.js'" in rollup
    assert "format: 'cjs'" in rollup
    assert "format: 'es'" in rollup
    assert "format: 'umd'" in rollup
    assert "MediaVizSdk" in rollup
    assert "commonjs" in rollup


def test_package_json(gen, tmp_path):
    import json
    gen.generate([_auth_ep("get_photos", "/api/v1/photos/")], str(tmp_path))
    pkg = json.loads((tmp_path / "package.json").read_text())
    assert pkg["name"] == "@mediaviz/sdk"
    assert pkg["type"] == "module"
    assert pkg["main"] == "./dist/sdk.cjs.js"
    assert pkg["module"] == "./dist/sdk.esm.js"
    assert pkg["browser"] == "./dist/sdk.umd.js"
    exports = pkg["exports"]["."]
    assert exports["browser"] == "./dist/sdk.umd.js"
    assert exports["import"] == "./dist/sdk.esm.js"
    assert exports["require"] == "./dist/sdk.cjs.js"
    assert exports["default"] == "./dist/sdk.cjs.js"
    assert "build" in pkg["scripts"]
    assert "rollup" in pkg["devDependencies"]


# ── body flattening disambiguation ────────────────────────────────────────────


def test_flatten_body_simple(gen):
    body = {"username": {"type": "string", "required": True}, "password": {"type": "string", "required": True}}
    fields = gen._flatten_body(body)
    assert fields == [("username", "username"), ("password", "password")]


def test_flatten_body_snake_to_camel(gen):
    body = {"new_password": {"type": "string", "required": True}, "photo_id_inclusion_list": {"type": "array", "required": True}}
    fields = gen._flatten_body(body)
    assert fields == [("new_password", "newPassword"), ("photo_id_inclusion_list", "photoIdInclusionList")]


# ── module re-export ─────────────────────────────────────────────────────────


def test_discover_module_exports_cjs(gen, tmp_path):
    mod_dir = tmp_path / "oauth"
    mod_dir.mkdir()
    (mod_dir / "package.json").write_text('{"main": "src/index.js"}')
    src_dir = mod_dir / "src"
    src_dir.mkdir()
    (src_dir / "index.js").write_text(
        "const { OAuthClient } = require('./client');\n"
        "const { OAuthError } = require('./errors');\n"
        "module.exports = { OAuthClient, OAuthError };\n"
    )
    exports = gen.discover_module_exports("oauth", str(mod_dir))
    assert exports == ["OAuthClient", "OAuthError"]


def test_discover_module_exports_no_package_json(gen, tmp_path):
    mod_dir = tmp_path / "oauth"
    mod_dir.mkdir()
    src_dir = mod_dir / "src"
    src_dir.mkdir()
    (src_dir / "index.js").write_text("module.exports = { Foo, Bar };\n")
    exports = gen.discover_module_exports("oauth", str(mod_dir))
    assert exports == ["Foo", "Bar"]


def test_discover_module_exports_empty(gen, tmp_path):
    mod_dir = tmp_path / "oauth"
    mod_dir.mkdir()
    assert gen.discover_module_exports("oauth", str(mod_dir)) == []


def test_emit_reexports_generates_esm_wrapper(gen, tmp_path):
    mod_dir = tmp_path / "oauth"
    mod_dir.mkdir()
    (mod_dir / "package.json").write_text('{"main": "src/index.js"}')
    src_dir = mod_dir / "src"
    src_dir.mkdir()
    (src_dir / "index.js").write_text("")
    filename = gen.emit_reexports("oauth", ["OAuthClient", "OAuthError"], str(tmp_path))
    assert filename == "_oauth.js"
    content = (tmp_path / "_oauth.js").read_text()
    assert "import _oauth from './oauth/src/index.js'" in content
    assert "export const { OAuthClient, OAuthError } = _oauth" in content


def test_emit_reexports_empty(gen, tmp_path):
    assert gen.emit_reexports("oauth", [], str(tmp_path)) is None


def test_barrel_index_includes_reexport_files(gen, tmp_path):
    mod_dir = tmp_path / "oauth"
    mod_dir.mkdir()
    (mod_dir / "package.json").write_text('{"main": "src/index.js"}')
    src_dir = mod_dir / "src"
    src_dir.mkdir()
    (src_dir / "index.js").write_text("module.exports = { OAuthClient };\n")
    gen._copied_modules.append({"name": "oauth", "path": str(mod_dir)})
    endpoints = [_auth_ep("get_photos", "/api/v1/photos/")]
    gen.generate(endpoints, str(tmp_path))
    index_src = (tmp_path / "index.js").read_text()
    assert "export * from './_oauth.js';" in index_src
    assert "export * from './photos.js';" in index_src
