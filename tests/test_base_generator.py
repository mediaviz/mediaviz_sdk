import os
import shutil
import tempfile
import pytest
from generators.base import BaseGenerator


class ConcreteGenerator(BaseGenerator):
    framework_name = "test"

    def generate(self, endpoints, output_dir):
        pass

    def copy_module(self, module_name, module_root, output_dir):
        self._copy_module_files(module_root, "javascript", module_name, output_dir)

    def discover_module_exports(self, module_name, module_path):
        return []

    def emit_reexports(self, module_name, exports, output_dir):
        return None

    def emit_client_class(self, groups, comp_groups, alt_hosts, output_dir):
        pass

    def _optional_check_expr(self, expr):
        return f"{expr} is not None"


@pytest.fixture
def gen():
    return ConcreteGenerator()


def test_snake_to_camel():
    assert BaseGenerator.snake_to_camel("get_photos_sort") == "getPhotosSort"
    assert BaseGenerator.snake_to_camel("get_photos") == "getPhotos"
    assert BaseGenerator.snake_to_camel("create_users_new_company") == "createUsersNewCompany"
    assert BaseGenerator.snake_to_camel("simple") == "simple"


def test_snake_to_pascal():
    assert BaseGenerator.snake_to_pascal("get_photos_sort") == "GetPhotosSort"
    assert BaseGenerator.snake_to_pascal("photos") == "Photos"
    assert BaseGenerator.snake_to_pascal("users_controller") == "UsersController"


def test_group_by_controller(gen):
    endpoints = [
        {"id": "get_photos", "controller": "Photos"},
        {"id": "get_photos_sort", "controller": "Photos"},
        {"id": "create_user", "controller": "Users"},
    ]
    groups = gen.group_by_controller(endpoints)
    assert set(groups.keys()) == {"Photos", "Users"}
    assert len(groups["Photos"]) == 2
    assert len(groups["Users"]) == 1
    assert groups["Photos"][0]["id"] == "get_photos"


def test_group_by_controller_replaces_spaces_with_underscores(gen):
    endpoints = [
        {"id": "get_curated", "controller": "Curated Albums"},
        {"id": "get_custom", "controller": "Custom Albums"},
    ]
    groups = gen.group_by_controller(endpoints)
    assert set(groups.keys()) == {"Curated_Albums", "Custom_Albums"}
    assert len(groups["Curated_Albums"]) == 1
    assert len(groups["Custom_Albums"]) == 1


def test_group_by_controller_empty(gen):
    assert gen.group_by_controller([]) == {}


def test_copy_module_missing_src(gen):
    with tempfile.TemporaryDirectory() as tmp:
        oauth_root = os.path.join(tmp, "oauth_sdk")
        os.makedirs(oauth_root)
        out_dir = os.path.join(tmp, "output")
        gen.copy_module("oauth", oauth_root, out_dir)
        assert os.path.isdir(os.path.join(out_dir, "oauth"))


def test_copy_module_copies_files(gen):
    with tempfile.TemporaryDirectory() as tmp:
        oauth_root = os.path.join(tmp, "oauth_sdk")
        js_src = os.path.join(oauth_root, "javascript")
        os.makedirs(js_src)
        with open(os.path.join(js_src, "index.js"), "w") as f:
            f.write("export class OAuthClient {}")
        out_dir = os.path.join(tmp, "output")
        gen.copy_module("oauth", oauth_root, out_dir)
        assert os.path.isfile(os.path.join(out_dir, "oauth", "index.js"))


def test_copy_module_registers_in_copied_modules(gen):
    with tempfile.TemporaryDirectory() as tmp:
        oauth_root = os.path.join(tmp, "oauth_sdk")
        js_src = os.path.join(oauth_root, "javascript")
        os.makedirs(js_src)
        out_dir = os.path.join(tmp, "output")
        gen.copy_module("oauth", oauth_root, out_dir)
        assert len(gen._copied_modules) == 1
        assert gen._copied_modules[0]["name"] == "oauth"


def test_copy_auth_wrapper_delegates_to_copy_module(gen):
    with tempfile.TemporaryDirectory() as tmp:
        oauth_root = os.path.join(tmp, "oauth_sdk")
        js_src = os.path.join(oauth_root, "javascript")
        os.makedirs(js_src)
        with open(os.path.join(js_src, "index.js"), "w") as f:
            f.write("// stub")
        out_dir = os.path.join(tmp, "output")
        gen.copy_auth_wrapper(oauth_root, out_dir)
        assert os.path.isfile(os.path.join(out_dir, "oauth", "index.js"))
        assert gen._copied_modules[0]["name"] == "oauth"


def test_reexport_all_modules_empty(gen):
    with tempfile.TemporaryDirectory() as tmp:
        result = gen.reexport_all_modules(tmp)
        assert result == []
