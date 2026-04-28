"""Smoke-test the Python generator: correct file layout, importable package, 37/37 tests pass."""
from __future__ import annotations
import os
import re
import subprocess
import sys


_SDK_ROOT = os.path.join(os.path.dirname(__file__), "..", "sdk")
_VERSION_RE = re.compile(r"^v(\d+)\.(\d+)\.(\d+)$")


def _latest_version_dir() -> str:
    versions: list[tuple[tuple[int, int, int], str]] = []
    if os.path.isdir(_SDK_ROOT):
        for entry in os.listdir(_SDK_ROOT):
            m = _VERSION_RE.match(entry)
            full = os.path.join(_SDK_ROOT, entry)
            if m and os.path.isdir(full):
                versions.append(((int(m.group(1)), int(m.group(2)), int(m.group(3))), full))
    if not versions:
        raise RuntimeError(f"no sdk/v*.*.* directories found under {_SDK_ROOT}")
    return max(versions)[1]


_LATEST_DIR = _latest_version_dir()
SDK_DIR = os.path.join(_LATEST_DIR, "python")
TEST_DIR = os.path.join(_LATEST_DIR, "tests", "python")
_VERSION = os.path.basename(_LATEST_DIR).lstrip("v")


def test_generated_file_layout():
    """Expected snake_case controller files, flat oauth_sdk, and pyproject.toml are present."""
    for path in (
        "pyproject.toml",
        "mediaviz_sdk/__init__.py",
        "mediaviz_sdk/client.py",
        "mediaviz_sdk/errors.py",
        "mediaviz_sdk/photos.py",
        "mediaviz_sdk/projects.py",
        "mediaviz_sdk/users.py",
        "mediaviz_sdk/photo_upload.py",
        "oauth_sdk/__init__.py",
        "oauth_sdk/_client.py",
    ):
        assert os.path.isfile(os.path.join(SDK_DIR, path)), f"missing: {path}"


def test_no_nested_oauth_sdk():
    """oauth_sdk must be a flat package — no oauth_sdk/oauth_sdk/ nesting."""
    nested = os.path.join(SDK_DIR, "oauth_sdk", "oauth_sdk")
    assert not os.path.isdir(nested), "oauth_sdk package is double-nested"


def test_no_pasc_case_controller_files():
    """Controller files must be snake_case, never PascalCase."""
    mediaviz_pkg = os.path.join(SDK_DIR, "mediaviz_sdk")
    for fname in os.listdir(mediaviz_pkg):
        if fname.endswith(".py") and fname not in ("__init__.py", "client.py", "errors.py"):
            assert fname == fname.lower(), f"PascalCase controller file: {fname}"


def test_init_exports_mediaviz_client():
    init = open(os.path.join(SDK_DIR, "mediaviz_sdk", "__init__.py")).read()
    assert "MediaVizClient" in init
    assert "OAuthClient" in init


def test_client_uses_oauth_client_config():
    client_src = open(os.path.join(SDK_DIR, "mediaviz_sdk", "client.py")).read()
    assert "OAuthClientConfig" in client_src
    assert "OAuthClient(OAuthClientConfig(" in client_src


def test_no_requests_import():
    """Generated SDK must not import `requests`."""
    for dirpath, _, files in os.walk(os.path.join(SDK_DIR, "mediaviz_sdk")):
        for fname in files:
            if not fname.endswith(".py"):
                continue
            src = open(os.path.join(dirpath, fname)).read()
            assert "import requests" not in src, f"requests found in {fname}"


def test_importable(tmp_path):
    """MediaVizClient can be imported from the generated package."""
    script = tmp_path / "check_import.py"
    script.write_text(
        f"import sys; sys.path.insert(0, {repr(SDK_DIR)})\n"
        "from mediaviz_sdk import MediaVizClient\n"
        "MediaVizClient(client_id='x', client_secret='y', base_url='https://example.com')\n"
        "print('ok')\n"
    )
    result = subprocess.run(
        [sys.executable, str(script)], capture_output=True, text=True
    )
    assert result.returncode == 0, result.stderr
    assert result.stdout.strip() == "ok"


def test_generated_test_suite_passes():
    """The PythonTestGenerator-produced pytest suite must report 0 failures."""
    assert os.path.isdir(TEST_DIR), "test dir not generated"
    result = subprocess.run(
        [sys.executable, "-m", "pytest", "-v", "--tb=short"],
        cwd=TEST_DIR,
        capture_output=True,
        text=True,
    )
    m = re.search(r"(\d+) passed", result.stdout)
    passed = int(m.group(1)) if m else 0
    failed_m = re.search(r"(\d+) failed", result.stdout)
    failed = int(failed_m.group(1)) if failed_m else 0
    assert failed == 0, f"{failed} tests failed:\n{result.stdout[-3000:]}"
    assert passed > 0, "no tests ran"


def test_pyproject_version():
    """pyproject.toml version matches the output directory version segment."""
    content = open(os.path.join(SDK_DIR, "pyproject.toml")).read()
    m = re.search(r'version\s*=\s*"([\d.]+)"', content)
    assert m, "no version in pyproject.toml"
    assert m.group(1) == _VERSION
