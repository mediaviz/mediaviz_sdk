import json
import os
import sys
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from generators.php import PhpGenerator


@pytest.fixture
def gen():
    return PhpGenerator()


def _auth_ep(ep_id, path, method="GET", params=None, controller="Photos"):
    return {
        "id": ep_id,
        "function_name": ep_id,
        "controller": controller,
        "method": method,
        "path": path,
        "auth": "required",
        "params": params or [],
        "request_body": None,
        "content_type": None,
        "tags": [],
    }


def _unauth_ep(ep_id, path, method="GET", params=None, request_body=None, controller="Users", content_type=None):
    return {
        "id": ep_id,
        "function_name": ep_id,
        "controller": controller,
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


def test_snake_to_pascal(gen):
    assert gen.snake_to_pascal("my_controller") == "MyController"


# ── authenticated method emission ─────────────────────────────────────────────


def test_auth_method_no_params(gen):
    ep = _auth_ep("get_status", "/api/v1/status")
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "public function getStatus(): mixed {" in src
    assert "$this->ctx->requireTokens();" in src
    assert "$this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data" in src


def test_auth_method_path_params(gen):
    ep = _auth_ep(
        "get_photos",
        "/api/v1/photos/{table_name}/",
        params=[{"name": "table_name", "in": "path", "type": "string", "required": True}],
    )
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "public function getPhotos(string $tableName): mixed {" in src
    assert "rawurlencode((string)$tableName)" in src
    assert "$this->ctx->client->request" in src


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
    assert "?int $limit = null" in src
    assert "?int $lastId = null" in src
    assert "$query['limit'] = $limit" in src
    assert "$query['last_id'] = $lastId" in src
    assert "http_build_query($query)" in src
    assert "rawurlencode((string)$tableName)" in src
    assert "rawurlencode((string)$sortOrder)" in src


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
    assert "public function createToken" in src
    assert "$username" in src
    assert "$password" in src
    assert "'username' => $username" in src
    assert "'password' => $password" in src
    assert "curl_init" in src
    assert "json_encode($body)" in src
    assert "handleResponse($body, $statusCode, $headers)" in src


def test_unauth_method_no_body_get(gen):
    ep = _unauth_ep("get_public_status", "/api/v1/status")
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "public function getPublicStatus(): mixed {" in src
    assert "$baseUrl = $this->ctx->baseUrl;" in src
    assert "curl_init($baseUrl . $path)" in src
    assert "CURLOPT_CUSTOMREQUEST, 'GET'" in src
    assert "handleResponse($body, $statusCode, $headers)" in src


def test_unauth_method_dynamic_body(gen):
    ep = _unauth_ep(
        "update_users",
        "/api/v1/users/{user_id}",
        method="PUT",
        params=[{"name": "user_id", "in": "path", "type": "integer", "required": True}],
        request_body="dynamic",
    )
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "public function updateUsers(" in src
    assert "int $userId," in src
    assert "array $body = []" in src
    assert "$baseUrl = $this->ctx->baseUrl;" in src
    assert "CURLOPT_CUSTOMREQUEST, 'PUT'" in src


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
    assert "http_build_query($body)" in src
    assert "Content-Type: application/x-www-form-urlencoded" in src
    assert "json_encode" not in src


# ── controller file structure ─────────────────────────────────────────────────


def test_generate_photos_controller(gen, tmp_path):
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

    php_file = tmp_path / "Photos.php"
    assert php_file.exists()
    assert (tmp_path / "composer.json").exists()

    src = php_file.read_text()
    assert "<?php" in src
    assert "declare(strict_types=1);" in src
    assert "namespace MediaVizSdk;" in src
    assert "class Photos {" in src
    assert "private object $ctx;" in src
    assert "public function getPhotos(" in src
    assert "public function getPhotosSort(" in src


def test_generate_unauth_controller(gen, tmp_path):
    endpoints = [_unauth_ep("get_public", "/api/v1/public")]
    gen.generate(endpoints, str(tmp_path))
    src = (tmp_path / "Users.php").read_text()
    # No OAuthClient constructor for purely unauth controllers
    assert r"\OAuthSdk\OAuthClient" not in src
    assert "class Users {" in src


def test_autoload_config(gen, tmp_path):
    gen.generate([_auth_ep("get_photos", "/api/v1/photos/")], str(tmp_path))
    import json
    config = json.loads((tmp_path / "composer.json").read_text())
    assert config["autoload"]["psr-4"]["MediaVizSdk\\"] == "./"


def test_file_naming_pascal_case(gen, tmp_path):
    ep = _auth_ep("get_items", "/api/v1/items/", controller="MyController")
    gen.generate([ep], str(tmp_path))
    assert (tmp_path / "MyController.php").exists()


def test_controller_with_spaces_produces_no_space_filename(gen, tmp_path):
    ep = _auth_ep("get_curated", "/api/v1/curated/", controller="Curated Albums")
    gen.generate([ep], str(tmp_path))
    assert (tmp_path / "CuratedAlbums.php").exists()
    assert not (tmp_path / "Curated Albums.php").exists()


# ── module re-export ─────────────────────────────────────────────────────────


def _make_php_oauth_module(base_path):
    """Create a minimal PHP oauth module for testing."""
    mod_dir = base_path / "oauth"
    src_dir = mod_dir / "src"
    src_dir.mkdir(parents=True)
    (mod_dir / "composer.json").write_text(json.dumps({
        "autoload": {"psr-4": {"OAuthSdk\\": "src/"}}
    }))
    (src_dir / "OAuthClient.php").write_text(
        "<?php\nnamespace OAuthSdk;\nclass OAuthClient {}\n"
    )
    (src_dir / "OAuthErrorCode.php").write_text(
        "<?php\nnamespace OAuthSdk;\nenum OAuthErrorCode: string {}\n"
    )
    (src_dir / "Types.php").write_text(
        "<?php\nnamespace OAuthSdk;\n"
        "readonly class TokenResponse {}\n"
        "readonly class AuthenticatedResponse {}\n"
    )
    return str(mod_dir)


def test_discover_php_module_exports(gen, tmp_path):
    mod_path = _make_php_oauth_module(tmp_path)
    exports = gen.discover_module_exports("oauth", mod_path)
    names = {e["name"] for e in exports}
    assert "OAuthClient" in names
    assert "OAuthErrorCode" in names
    assert "TokenResponse" in names
    assert "AuthenticatedResponse" in names


def test_discover_php_module_exports_kinds(gen, tmp_path):
    mod_path = _make_php_oauth_module(tmp_path)
    exports = gen.discover_module_exports("oauth", mod_path)
    by_name = {e["name"]: e for e in exports}
    assert by_name["OAuthClient"]["kind"] == "class"
    assert by_name["OAuthErrorCode"]["kind"] == "enum"


def test_discover_php_module_no_composer(gen, tmp_path):
    mod_dir = tmp_path / "empty"
    mod_dir.mkdir()
    assert gen.discover_module_exports("empty", str(mod_dir)) == []


def test_emit_php_reexports_facades(gen, tmp_path):
    exports = [
        {"name": "OAuthClient", "kind": "class", "fqcn": "OAuthSdk\\OAuthClient"},
        {"name": "OAuthErrorCode", "kind": "enum", "fqcn": "OAuthSdk\\OAuthErrorCode"},
    ]
    filename = gen.emit_reexports("oauth", exports, str(tmp_path))
    assert filename == "_oauth.php"
    content = (tmp_path / "_oauth.php").read_text()
    assert "namespace MediaVizSdk;" in content
    assert "class OAuthClient extends \\OAuthSdk\\OAuthClient {}" in content
    assert "class_alias" in content
    assert "OAuthErrorCode" in content


def test_emit_php_reexports_empty(gen, tmp_path):
    assert gen.emit_reexports("oauth", [], str(tmp_path)) is None


def test_autoload_config_includes_reexports(gen, tmp_path):
    mod_path = _make_php_oauth_module(tmp_path)
    gen._copied_modules.append({"name": "oauth", "path": mod_path})
    gen.generate([_auth_ep("get_photos", "/api/v1/photos/")], str(tmp_path))
    config = json.loads((tmp_path / "composer.json").read_text())
    assert "OAuthSdk\\" in config["autoload"]["psr-4"]
    assert "./_oauth.php" in config["autoload"]["files"]


def test_autoload_config_merges_nested_require(gen, tmp_path):
    mod_dir = tmp_path / "oauth"
    src_dir = mod_dir / "src"
    src_dir.mkdir(parents=True)
    (mod_dir / "composer.json").write_text(json.dumps({
        "require": {"php": ">=8.1", "ext-curl": "*"},
        "autoload": {"psr-4": {"OAuthSdk\\": "src/"}},
    }))
    gen._copied_modules.append({"name": "oauth", "path": str(mod_dir)})
    gen.generate([_auth_ep("get_photos", "/api/v1/photos/")], str(tmp_path))
    config = json.loads((tmp_path / "composer.json").read_text())
    assert config["require"]["php"] == ">=8.1"
    assert config["require"]["ext-curl"] == "*"


def test_autoload_config_no_require_when_no_modules(gen, tmp_path):
    gen.generate([_auth_ep("get_photos", "/api/v1/photos/")], str(tmp_path))
    config = json.loads((tmp_path / "composer.json").read_text())
    assert "require" not in config


# ── split types file ─────────────────────────────────────────────────────────


def _make_types_module(base_path):
    """Create a module with a monolithic Types.php containing multiple classes."""
    mod_dir = base_path / "oauth"
    src_dir = mod_dir / "src"
    src_dir.mkdir(parents=True)
    (mod_dir / "composer.json").write_text(json.dumps({
        "autoload": {
            "psr-4": {"OAuthSdk\\": "src/"},
            "files": ["src/Types.php"],
        }
    }))
    (src_dir / "OAuthClient.php").write_text(
        "<?php\nnamespace OAuthSdk;\nclass OAuthClient {}\n"
    )
    (src_dir / "Types.php").write_text(
        "<?php\n\ndeclare(strict_types=1);\n\nnamespace OAuthSdk;\n\n"
        "readonly class OAuthClientConfig\n{\n"
        "    public function __construct(\n"
        "        public string $baseUrl,\n"
        "        public string $clientId,\n"
        "    ) {}\n}\n\n"
        "readonly class TokenResponse\n{\n"
        "    public function __construct(\n"
        "        public string $accessToken,\n"
        "    ) {}\n}\n\n"
        "readonly class ClientRegistrationRequest\n{\n"
        "    /**\n"
        "     * @param list<string> $redirectUris\n"
        "     */\n"
        "    public function __construct(\n"
        "        public string $clientName,\n"
        "        public array $redirectUris,\n"
        "    ) {}\n}\n"
    )
    return str(mod_dir)


def test_split_types_creates_individual_files(gen, tmp_path):
    mod_path = _make_types_module(tmp_path)
    gen._split_types_file(mod_path)
    src = tmp_path / "oauth" / "src"
    assert (src / "OAuthClientConfig.php").exists()
    assert (src / "TokenResponse.php").exists()
    assert (src / "ClientRegistrationRequest.php").exists()
    assert not (src / "Types.php").exists()


def test_split_types_file_content(gen, tmp_path):
    mod_path = _make_types_module(tmp_path)
    gen._split_types_file(mod_path)
    src = tmp_path / "oauth" / "src"
    content = (src / "OAuthClientConfig.php").read_text()
    assert "<?php" in content
    assert "declare(strict_types=1);" in content
    assert "namespace OAuthSdk;" in content
    assert "readonly class OAuthClientConfig" in content
    assert "public string $baseUrl" in content


def test_split_types_preserves_docblocks(gen, tmp_path):
    mod_path = _make_types_module(tmp_path)
    gen._split_types_file(mod_path)
    src = tmp_path / "oauth" / "src"
    content = (src / "ClientRegistrationRequest.php").read_text()
    assert "@param list<string> $redirectUris" in content
    assert "readonly class ClientRegistrationRequest" in content


def test_split_types_removes_files_autoload(gen, tmp_path):
    mod_path = _make_types_module(tmp_path)
    gen._split_types_file(mod_path)
    config = json.loads((tmp_path / "oauth" / "composer.json").read_text())
    assert "files" not in config["autoload"]


def test_split_types_preserves_other_files(gen, tmp_path):
    mod_path = _make_types_module(tmp_path)
    gen._split_types_file(mod_path)
    src = tmp_path / "oauth" / "src"
    assert (src / "OAuthClient.php").exists()


def test_split_types_noop_without_types_file(gen, tmp_path):
    mod_dir = tmp_path / "mod"
    src_dir = mod_dir / "src"
    src_dir.mkdir(parents=True)
    (mod_dir / "composer.json").write_text(json.dumps({
        "autoload": {"psr-4": {"Foo\\": "src/"}}
    }))
    gen._split_types_file(str(mod_dir))  # should not raise


def test_split_types_discover_finds_split_classes(gen, tmp_path):
    mod_path = _make_types_module(tmp_path)
    gen._split_types_file(mod_path)
    exports = gen.discover_module_exports("oauth", mod_path)
    names = {e["name"] for e in exports}
    assert "OAuthClientConfig" in names
    assert "TokenResponse" in names
    assert "ClientRegistrationRequest" in names
    # All split files should be PSR-4 compliant
    for e in exports:
        if e["name"] in ("OAuthClientConfig", "TokenResponse", "ClientRegistrationRequest"):
            assert e["psr4"] is True


def test_model_flag_reads_template_headers(gen):
    expr = gen._resolve_php_expr("model_flag:template:x-ocr", {})
    assert "$template['headers']['x-ocr']" in expr
    assert "'true'" in expr and "null" in expr
