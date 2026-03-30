import os
import shutil
import tempfile
import pytest
from generators.base import BaseGenerator


class ConcreteGenerator(BaseGenerator):
    framework_name = "test"

    def generate(self, endpoints, output_dir):
        pass

    def copy_auth_wrapper(self, oauth_sdk_root, output_dir):
        self._copy_oauth(oauth_sdk_root, "javascript", output_dir)


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


def test_group_by_controller_empty(gen):
    assert gen.group_by_controller([]) == {}


def test_copy_oauth_missing_src(gen):
    with tempfile.TemporaryDirectory() as tmp:
        oauth_root = os.path.join(tmp, "oauth_sdk")
        os.makedirs(oauth_root)
        out_dir = os.path.join(tmp, "output")
        # should not raise even if subdir missing
        gen.copy_auth_wrapper(oauth_root, out_dir)
        assert os.path.isdir(os.path.join(out_dir, "oauth"))


def test_copy_oauth_copies_files(gen):
    with tempfile.TemporaryDirectory() as tmp:
        oauth_root = os.path.join(tmp, "oauth_sdk")
        js_src = os.path.join(oauth_root, "javascript")
        os.makedirs(js_src)
        with open(os.path.join(js_src, "index.js"), "w") as f:
            f.write("export class OAuthClient {}")
        out_dir = os.path.join(tmp, "output")
        gen.copy_auth_wrapper(oauth_root, out_dir)
        assert os.path.isfile(os.path.join(out_dir, "oauth", "index.js"))
