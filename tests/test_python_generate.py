"""Tests for Task 26: PythonGenerator.generate() wiring."""
from __future__ import annotations
import ast
import os
import sys
import tempfile

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import pytest
from generators.python import PythonGenerator

# Minimal endpoint fixtures
_AUTH_EP = {
    "function_name": "get_project",
    "controller": "projects",
    "path": "/projects/{project_id}",
    "method": "GET",
    "auth": "required",
    "params": [{"name": "project_id", "in": "path", "type": "string", "required": True}],
    "request_body": None,
    "api_host": None,
}

_UNAUTH_EP = {
    "function_name": "list_statuses",
    "controller": "projects",
    "path": "/statuses",
    "method": "GET",
    "auth": None,
    "params": [],
    "request_body": None,
    "api_host": None,
}

_BODY_EP = {
    "function_name": "create_project",
    "controller": "projects",
    "path": "/projects",
    "method": "POST",
    "auth": "required",
    "params": [],
    "request_body": {
        "_shape": "expanded",
        "fields": [
            {"name": "name", "type": "string", "required": True, "orig_path": ["name"]},
            {"name": "description", "type": "string", "required": False, "orig_path": ["description"]},
        ],
    },
    "api_host": None,
}

_PHOTOS_EP = {
    "function_name": "get_photo",
    "controller": "photos",
    "path": "/photos/{photo_id}",
    "method": "GET",
    "auth": "required",
    "params": [{"name": "photo_id", "in": "path", "type": "integer", "required": True}],
    "request_body": None,
    "api_host": None,
}


def _run_generate(endpoints, composites=None):
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "sdk", "v1.2.3", "python")
        os.makedirs(output_dir, exist_ok=True)
        g.generate(endpoints, output_dir, composites=composites)
        return output_dir, g, tmpdir


def test_generate_creates_pkg_dir():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "python")
        os.makedirs(output_dir)
        g.generate([_AUTH_EP], output_dir)
        assert os.path.isdir(os.path.join(output_dir, "mediaviz_sdk"))


def test_generate_emits_errors_file():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "python")
        os.makedirs(output_dir)
        g.generate([_AUTH_EP], output_dir)
        errors_path = os.path.join(output_dir, "mediaviz_sdk", "errors.py")
        assert os.path.isfile(errors_path)
        src = open(errors_path).read()
        assert "class ApiError" in src
        assert "class ValidationError" in src
        assert "def handle_response" in src


def test_generate_emits_controller_files():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "python")
        os.makedirs(output_dir)
        g.generate([_AUTH_EP, _PHOTOS_EP], output_dir)
        assert os.path.isfile(os.path.join(output_dir, "mediaviz_sdk", "projects.py"))
        assert os.path.isfile(os.path.join(output_dir, "mediaviz_sdk", "photos.py"))


def test_generate_emits_client_file():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "python")
        os.makedirs(output_dir)
        g.generate([_AUTH_EP], output_dir)
        client_path = os.path.join(output_dir, "mediaviz_sdk", "client.py")
        assert os.path.isfile(client_path)
        src = open(client_path).read()
        assert "class MediaVizClient" in src
        assert "class _Context" in src
        assert "class _TokenTrackingClient" in src


def test_generate_emits_init_file():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "python")
        os.makedirs(output_dir)
        g.generate([_AUTH_EP], output_dir)
        init_path = os.path.join(output_dir, "mediaviz_sdk", "__init__.py")
        assert os.path.isfile(init_path)
        src = open(init_path).read()
        assert "MediaVizClient" in src
        assert "ApiError" in src


def test_generate_emits_pyproject_toml():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "sdk", "v2.3.4", "python")
        os.makedirs(output_dir)
        g.generate([_AUTH_EP], output_dir)
        toml_path = os.path.join(output_dir, "pyproject.toml")
        assert os.path.isfile(toml_path)
        content = open(toml_path).read()
        assert 'version = "2.3.4"' in content
        assert 'mediaviz_sdk' in content
        assert 'oauth_sdk' in content
        # httpx must be capped <1: 1.0 removed the `data=` kwarg the auth path uses,
        # and `pip install --pre` would otherwise pull httpx 1.0.devN.
        assert 'httpx>=0.27,<1' in content


def _assert_valid_python(filepath: str) -> None:
    src = open(filepath).read()
    try:
        ast.parse(src)
    except SyntaxError as e:
        pytest.fail(f"SyntaxError in {filepath}: {e}\n\n{src}")


def test_generated_files_are_valid_python():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "sdk", "v1.0.0", "python")
        os.makedirs(output_dir)
        g.generate([_AUTH_EP, _UNAUTH_EP, _BODY_EP, _PHOTOS_EP], output_dir)
        pkg_dir = os.path.join(output_dir, "mediaviz_sdk")
        for fname in os.listdir(pkg_dir):
            if fname.endswith(".py"):
                _assert_valid_python(os.path.join(pkg_dir, fname))


def test_controller_auth_method_content():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "python")
        os.makedirs(output_dir)
        g.generate([_AUTH_EP], output_dir)
        src = open(os.path.join(output_dir, "mediaviz_sdk", "projects.py")).read()
        assert "def get_project" in src
        assert "require_tokens" in src
        assert "quote(str(project_id)" in src
        assert "self._ctx.client.request" in src
        assert ".data" in src


def test_controller_unauth_method_content():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "python")
        os.makedirs(output_dir)
        g.generate([_UNAUTH_EP], output_dir)
        src = open(os.path.join(output_dir, "mediaviz_sdk", "projects.py")).read()
        assert "def list_statuses" in src
        assert "httpx.Client" in src
        assert "handle_response" in src
        # No auth call
        assert "require_tokens" not in src


def test_controller_expanded_body_method():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "python")
        os.makedirs(output_dir)
        g.generate([_BODY_EP], output_dir)
        src = open(os.path.join(output_dir, "mediaviz_sdk", "projects.py")).read()
        assert "def create_project" in src
        assert "name: str" in src
        assert "description: str | None" in src
        assert "body" in src


def test_client_controller_properties():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "python")
        os.makedirs(output_dir)
        g.generate([_AUTH_EP, _PHOTOS_EP], output_dir)
        src = open(os.path.join(output_dir, "mediaviz_sdk", "client.py")).read()
        assert "self.projects = Projects(_ctx)" in src
        assert "self.photos = Photos(_ctx)" in src
        assert "from .projects import Projects" in src
        assert "from .photos import Photos" in src


def test_pyproject_prerelease_suffix():
    cases = {"dev": 'version = "2.3.4.dev0"', None: 'version = "2.3.4"', "rc": 'version = "2.3.4rc0"'}
    for channel, expected in cases.items():
        g = PythonGenerator()
        g.prerelease = channel
        with tempfile.TemporaryDirectory() as tmpdir:
            output_dir = os.path.join(tmpdir, "sdk", "v2.3.4", "python")
            os.makedirs(output_dir)
            g.generate([_AUTH_EP], output_dir)
            content = open(os.path.join(output_dir, "pyproject.toml")).read()
            assert expected in content, f"channel={channel}"


def test_pyproject_no_version_fallback():
    g = PythonGenerator()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_dir = os.path.join(tmpdir, "no_version_in_path", "python")
        os.makedirs(output_dir)
        g.generate([_AUTH_EP], output_dir)
        content = open(os.path.join(output_dir, "pyproject.toml")).read()
        assert 'version = "0.1.0"' in content


def test_copy_module_strips_metadata(tmp_path):
    g = PythonGenerator()
    # Create a fake python module directory
    python_dir = tmp_path / "fake_oauth" / "python"
    python_dir.mkdir(parents=True)
    (python_dir / "__init__.py").write_text("__all__ = ['OAuthClient']\n")
    (python_dir / "pyproject.toml").write_text("[project]\nname='x'\n")
    (python_dir / "setup.py").write_text("pass\n")
    tests_dir = python_dir / "tests"
    tests_dir.mkdir()
    (tests_dir / "test_x.py").write_text("pass\n")

    out = tmp_path / "sdk_out"
    out.mkdir()
    g.copy_module("oauth_sdk", str(tmp_path / "fake_oauth"), str(out))

    dst = out / "oauth_sdk"
    assert dst.is_dir()
    assert not (dst / "pyproject.toml").exists()
    assert not (dst / "setup.py").exists()
    assert not (dst / "tests").exists()
    assert (dst / "__init__.py").exists()


def test_discover_module_exports_all(tmp_path):
    g = PythonGenerator()
    mod_dir = tmp_path / "mymod"
    mod_dir.mkdir()
    (mod_dir / "__init__.py").write_text("__all__ = ['Foo', 'Bar', 'baz']\n")
    exports = g.discover_module_exports("mymod", str(mod_dir))
    names = [e["name"] for e in exports]
    assert "Foo" in names
    assert "Bar" in names
    assert "baz" in names


def test_discover_module_exports_from_imports(tmp_path):
    g = PythonGenerator()
    mod_dir = tmp_path / "mymod"
    mod_dir.mkdir()
    (mod_dir / "__init__.py").write_text(
        "from ._client import OAuthClient, TokenResponse\n"
        "from ._errors import OAuthError\n"
    )
    exports = g.discover_module_exports("mymod", str(mod_dir))
    names = [e["name"] for e in exports]
    assert "OAuthClient" in names
    assert "TokenResponse" in names
    assert "OAuthError" in names


def test_optional_check_expr():
    g = PythonGenerator()
    assert g._optional_check_expr("foo") == "foo is not None"
    assert g._optional_check_expr("x[0]") == "x[0] is not None"


def test_emit_reexports_returns_none():
    g = PythonGenerator()
    result = g.emit_reexports("oauth_sdk", [{"name": "OAuthClient"}], "/tmp")
    assert result is None


def test_composite_method_emitted(tmp_path):
    composite = {
        "function_name": "fetch_projects_with_photos",
        "controller": "projects",
        "params": [{"name": "owner_id", "type": "string"}],
        "steps": [
            {
                "step_id": "projects",
                "endpoint": _AUTH_EP,
                "execution": "once",
                "input_map": {"project_id": "params.owner_id"},
                "output_as": "projects",
                "cache": {},
            }
        ],
        "returns": "steps.projects",
    }
    g = PythonGenerator()
    output_dir = str(tmp_path / "python")
    os.makedirs(output_dir)
    g.generate([_AUTH_EP], output_dir, composites=[composite])
    src = open(os.path.join(output_dir, "mediaviz_sdk", "projects.py")).read()
    assert "def fetch_projects_with_photos" in src
    assert "require_tokens" in src
    _assert_valid_python(os.path.join(output_dir, "mediaviz_sdk", "projects.py"))


def test_model_flag_reads_template_headers():
    g = PythonGenerator()
    expr = g._resolve_python_expr("model_flag:template:x-colors", {})
    assert "(template or {}).get('headers') or {}).get('x-colors')" in expr
    assert "'true'" in expr and "None" in expr


def test_python_optional_photo_field_is_null_safe():
    g = PythonGenerator()
    assert g._resolve_python_expr("params.photo.size", {}) == "(photo or {}).get('size')"
