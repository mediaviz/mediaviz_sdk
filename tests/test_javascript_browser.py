import os
import sys
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "generators"))

from generators.javascript_browser import JavaScriptBrowserGenerator


@pytest.fixture
def gen():
    return JavaScriptBrowserGenerator()


def _auth_ep(ep_id, path, method="GET", params=None, request_body=None, content_type=None):
    return {
        "id": ep_id,
        "function_name": ep_id,
        "controller": "Photos",
        "method": method,
        "path": path,
        "auth": "required",
        "params": params or [],
        "request_body": request_body,
        "content_type": content_type or ("application/json" if request_body else None),
        "tags": [],
    }


def _unauth_ep(ep_id, path, method="GET", params=None, request_body=None, content_type=None):
    return {
        "id": ep_id,
        "function_name": ep_id,
        "controller": "Users",
        "method": method,
        "path": path,
        "auth": "none",
        "params": params or [],
        "request_body": request_body,
        "content_type": content_type or ("application/json" if request_body else None),
        "tags": [],
    }


# ── naming ────────────────────────────────────────────────────────────────────


def test_snake_to_camel(gen):
    assert gen.snake_to_camel("get_photos_sort") == "getPhotosSort"
    assert gen.snake_to_camel("get_photos") == "getPhotos"
    assert gen.snake_to_camel("create_users_new_company") == "createUsersNewCompany"


# ── authenticated method emission ─────────────────────────────────────────────


def test_auth_method_no_params(gen):
    ep = _auth_ep("get_status", "/api/v1/status")
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "async getStatus()" in src
    assert "this._ctx.requireTokens();" in src
    assert "const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);" in src
    assert "return data;" in src


def test_auth_method_path_params(gen):
    ep = _auth_ep(
        "get_photos",
        "/api/v1/photos/{table_name}/",
        params=[{"name": "table_name", "in": "path", "type": "string", "required": True}],
    )
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "async getPhotos(tableName)" in src
    assert "encodeURIComponent(tableName)" in src
    assert "await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken)" in src


def test_auth_method_query_params(gen):
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
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "async getPhotosSort(tableName, sortOrder, { limit, lastId } = {})" in src
    assert "query.set('limit', limit)" in src
    assert "query.set('last_id', lastId)" in src
    assert "URLSearchParams" in src
    assert "if (qs) path += '?' + qs;" in src


def test_auth_method_dynamic_body(gen):
    ep = _auth_ep(
        "update_projects",
        "/api/v1/projects/{project_id}",
        method="PUT",
        params=[{"name": "project_id", "in": "path", "type": "integer", "required": True}],
        request_body="varies by caller: name, directory, or thumbnail",
    )
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "async updateProjects(projectId, body = {})" in src
    assert "JSON.stringify(body)" in src
    assert "await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body))" in src


def test_auth_method_structured_body(gen):
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
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "async createProjectsEvent(projectTableName, { event, detail })" in src
    assert "JSON.stringify({ event, detail })" in src
    assert "await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify({ event, detail }))" in src


# ── unauthenticated method emission ───────────────────────────────────────────


def test_unauth_method_structured_body(gen):
    ep = _unauth_ep(
        "create_token",
        "/api/v1/token/",
        method="POST",
        request_body={
            "username": {"type": "string (email)", "required": True},
            "password": {"type": "string", "required": True},
        },
    )
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "async createToken({ username, password })" in src
    assert "fetch(this._ctx.baseUrl +" in src
    assert "method: 'POST'," in src
    assert "JSON.stringify({ username, password })" in src
    assert "handleResponse(resp)" in src


def test_unauth_method_dynamic_body(gen):
    ep = _unauth_ep(
        "update_users",
        "/api/v1/users/{user_id}",
        method="PUT",
        params=[{"name": "user_id", "in": "path", "type": "integer", "required": True}],
        request_body="dynamic (updatedData object)",
    )
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "async updateUsers(userId, body = {})" in src
    assert "fetch(this._ctx.baseUrl +" in src
    assert "method: 'PUT'," in src
    assert "JSON.stringify(body)" in src


def test_unauth_method_no_body(gen):
    ep = _unauth_ep("get_public_status", "/api/v1/status")
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "async getPublicStatus()" in src
    assert "fetch(this._ctx.baseUrl + `/api/v1/status`, { method: 'GET' })" in src


def test_unauth_method_form_urlencoded(gen):
    ep = _unauth_ep(
        "create_token",
        "/api/v1/token/",
        method="POST",
        request_body={
            "username": {"type": "string (email)", "required": True},
            "password": {"type": "string", "required": True},
        },
        content_type="application/x-www-form-urlencoded",
    )
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "application/x-www-form-urlencoded" in src
    assert "new URLSearchParams" in src
    assert "JSON.stringify" not in src


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
    assert (tmp_path / "MediaViz.js").exists()


def test_barrel_index_exports(gen, tmp_path):
    endpoints = [
        _auth_ep("get_photos", "/api/v1/photos/{table_name}/",
                 params=[{"name": "table_name", "in": "path", "type": "string", "required": True}]),
    ]
    gen.generate(endpoints, str(tmp_path))
    index_src = (tmp_path / "index.js").read_text()
    assert "export * from './photos.js';" in index_src
    assert "export { MediaViz } from './MediaViz.js';" in index_src
    assert "export * from './errors.js';" in index_src


def test_controller_with_spaces_produces_underscored_filename(gen, tmp_path):
    ep = _auth_ep("get_curated", "/api/v1/curated/")
    ep["controller"] = "Curated Albums"
    gen.generate([ep], str(tmp_path))
    assert (tmp_path / "curated_albums.js").exists()
    assert not (tmp_path / "curated albums.js").exists()
    index_src = (tmp_path / "index.js").read_text()
    assert "export * from './curated_albums.js';" in index_src


def test_oauth_import_lives_in_mediaviz_not_controllers(gen, tmp_path):
    """OAuthClient is imported by the top-level MediaViz client, not by per-controller files."""
    gen.generate([_auth_ep("get_photos", "/api/v1/photos/")], str(tmp_path))
    photos_src = (tmp_path / "photos.js").read_text()
    mv_src = (tmp_path / "MediaViz.js").read_text()
    assert "import { OAuthClient }" not in photos_src
    assert "import { OAuthClient }" in mv_src


def test_oauth_import_uses_reexport_when_module_registered(gen, tmp_path):
    """When an oauth module is registered, MediaViz.js imports from the _oauth.js facade."""
    gen._copied_modules.append({"name": "oauth", "path": str(tmp_path / "oauth")})
    gen.generate([_auth_ep("get_photos", "/api/v1/photos/")], str(tmp_path))
    mv_src = (tmp_path / "MediaViz.js").read_text()
    assert "from './_oauth.js'" in mv_src


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
    assert pkg["main"] == "./dist/sdk.cjs"
    assert pkg["module"] == "./dist/sdk.esm.js"
    assert pkg["browser"] == "./dist/sdk.umd.js"
    exports = pkg["exports"]["."]
    assert exports["browser"] == "./dist/sdk.umd.js"
    assert exports["import"] == "./dist/sdk.esm.js"
    assert exports["require"] == "./dist/sdk.cjs"
    assert exports["default"] == "./dist/sdk.cjs"
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
