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
        "controller": controller,
        "method": method,
        "path": path,
        "auth": "required",
        "params": params or [],
        "request_body": None,
        "content_type": None,
        "tags": [],
    }


def _unauth_ep(ep_id, path, method="GET", params=None, request_body=None, controller="Users"):
    return {
        "id": ep_id,
        "controller": controller,
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


def test_snake_to_pascal(gen):
    assert gen.snake_to_pascal("my_controller") == "MyController"


# ── authenticated method emission ─────────────────────────────────────────────


def test_auth_method_no_params(gen):
    ep = _auth_ep("get_status", "/api/v1/status")
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "public function getStatus(string $accessToken, string $refreshToken)" in src
    assert r"\OAuthSdk\AuthenticatedResponse" in src
    assert "$this->client->request($path, 'GET', $accessToken, $refreshToken)" in src


def test_auth_method_path_params(gen):
    ep = _auth_ep(
        "get_photos",
        "/api/v1/photos/{table_name}/",
        params=[{"name": "table_name", "in": "path", "type": "string", "required": True}],
    )
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "string $tableName" in src
    assert "urlencode($tableName)" in src
    assert "$this->client->request" in src


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
    assert "urlencode($tableName)" in src
    assert "urlencode($sortOrder)" in src


# ── unauthenticated method emission ───────────────────────────────────────────


def test_unauth_method_structured_body(gen):
    ep = _unauth_ep(
        "create_users_new_company",
        "/api/v1/users/new_company",
        method="POST",
        request_body={
            "user": {"name": "string", "email": "string", "account_type": "integer"},
            "company": {"name": "string"},
        },
    )
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "public function createUsersNewCompany" in src
    assert "$name" in src
    assert "$companyName" in src
    assert "$accountType" in src
    assert "'account_type' => $accountType" in src
    assert "'company'" in src
    assert "curl_init" in src
    assert "json_encode($body)" in src
    assert "json_decode($response, true)" in src


def test_unauth_method_no_body_get(gen):
    ep = _unauth_ep("get_public_status", "/api/v1/status")
    lines = gen._emit_method(ep)
    src = "\n".join(lines)
    assert "public function getPublicStatus(string $baseUrl)" in src
    assert "curl_init($baseUrl . $path)" in src
    assert "CURLOPT_CUSTOMREQUEST, 'GET'" in src
    assert "json_decode($response, true)" in src


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
    assert "public function updateUsers(string $baseUrl, int $userId, array $body = [])" in src
    assert "CURLOPT_CUSTOMREQUEST, 'PUT'" in src


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
    assert r"private \OAuthSdk\OAuthClient $client;" in src
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
