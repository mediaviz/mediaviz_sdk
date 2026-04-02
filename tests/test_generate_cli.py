from __future__ import annotations

import os
import sys
import subprocess
import textwrap
import pytest

REPO_ROOT = os.path.join(os.path.dirname(__file__), "..")
sys.path.insert(0, REPO_ROOT)


# ── fixtures ──────────────────────────────────────────────────────────────────


@pytest.fixture()
def sdk_env(tmp_path):
    """Build a minimal but complete file tree for a CLI run."""
    # Controller YAML
    ctrl_dir = tmp_path / "controllers"
    ctrl_dir.mkdir()
    (ctrl_dir / "photos.yaml").write_text(
        textwrap.dedent("""\
            controller: Photos
            base_path: /api/v1
            endpoints:
              - id: get_photos
                method: GET
                path: /api/v1/photos/{table_name}/
                auth: required
                params:
                  - name: table_name
                    in: path
                    type: string
                    required: true
        """)
    )

    # Ref-list YAML
    endpoints_yaml = tmp_path / "top_endpoints.yaml"
    endpoints_yaml.write_text(
        textwrap.dedent("""\
            refs:
              - ref: "controllers/photos.yaml#get_photos"
        """)
    )

    # OAuth SDK stub
    oauth_root = tmp_path / "oauth_sdk"
    (oauth_root / "javascript").mkdir(parents=True)
    (oauth_root / "javascript" / "index.js").write_text("// oauth stub\n")

    output_dir = tmp_path / "output"

    return {
        "endpoints": str(endpoints_yaml),
        "controllers": str(ctrl_dir),
        "oauth_sdk": str(oauth_root),
        "output": str(output_dir),
    }


# ── helpers ────────────────────────────────────────────────────────────────────


def run_cli(env: dict, extra_args: list[str] | None = None) -> subprocess.CompletedProcess:
    cmd = [
        sys.executable,
        os.path.join(REPO_ROOT, "generate.py"),
        "--endpoints", env["endpoints"],
        "--controllers", env["controllers"],
        "--oauth-sdk", env["oauth_sdk"],
        "--output", env["output"],
    ]
    if extra_args:
        cmd.extend(extra_args)
    return subprocess.run(cmd, capture_output=True, text=True, cwd=REPO_ROOT)


# ── tests ──────────────────────────────────────────────────────────────────────


def test_cli_creates_resolved_yaml(sdk_env):
    result = run_cli(sdk_env, ["--frameworks", "javascript"])
    assert result.returncode == 0, result.stderr
    resolved_dir = os.path.join(sdk_env["output"], "resolved")
    yaml_files = [f for f in os.listdir(resolved_dir) if f.endswith(".yaml")]
    assert len(yaml_files) == 1
    assert yaml_files[0].startswith("v1_")


def test_cli_creates_framework_output_dir(sdk_env):
    result = run_cli(sdk_env, ["--frameworks", "javascript"])
    assert result.returncode == 0, result.stderr
    fw_dir = os.path.join(sdk_env["output"], "v1", "javascript")
    assert os.path.isdir(fw_dir)


def test_cli_generates_controller_file(sdk_env):
    result = run_cli(sdk_env, ["--frameworks", "javascript"])
    assert result.returncode == 0, result.stderr
    photos_js = os.path.join(sdk_env["output"], "v1", "javascript", "photos.js")
    assert os.path.isfile(photos_js)
    content = open(photos_js).read()
    assert "getPhotos" in content


def test_cli_copies_oauth_wrapper(sdk_env):
    result = run_cli(sdk_env, ["--frameworks", "javascript"])
    assert result.returncode == 0, result.stderr
    oauth_index = os.path.join(sdk_env["output"], "v1", "javascript", "oauth", "index.js")
    assert os.path.isfile(oauth_index)


def test_cli_version_increments_on_second_run(sdk_env):
    run_cli(sdk_env, ["--frameworks", "javascript"])
    run_cli(sdk_env, ["--frameworks", "javascript"])
    v2_dir = os.path.join(sdk_env["output"], "v2", "javascript")
    assert os.path.isdir(v2_dir)
    resolved_dir = os.path.join(sdk_env["output"], "resolved")
    yaml_files = sorted(os.listdir(resolved_dir))
    assert any(f.startswith("v2_") for f in yaml_files)


def test_cli_unknown_framework_exits_nonzero(sdk_env):
    result = run_cli(sdk_env, ["--frameworks", "cobol"])
    assert result.returncode != 0
    assert "cobol" in result.stderr or "cobol" in result.stdout


def test_cli_summary_output(sdk_env):
    result = run_cli(sdk_env, ["--frameworks", "javascript"])
    assert result.returncode == 0, result.stderr
    assert "v1" in result.stdout
    assert "javascript" in result.stdout


def test_cli_missing_required_arg_exits_nonzero(sdk_env):
    cmd = [
        sys.executable,
        os.path.join(REPO_ROOT, "generate.py"),
        "--controllers", sdk_env["controllers"],
        "--oauth-sdk", sdk_env["oauth_sdk"],
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=REPO_ROOT)
    assert result.returncode != 0


def test_cli_generates_test_dir(sdk_env):
    """After SDK generation, test files are generated into output/v1/tests/{framework}/."""
    result = run_cli(sdk_env, ["--frameworks", "javascript"])
    assert result.returncode == 0, result.stderr
    test_dir = os.path.join(sdk_env["output"], "v1", "tests", "javascript")
    assert os.path.isdir(test_dir), f"test dir not created: {test_dir}"
    assert os.path.isfile(os.path.join(test_dir, "helpers.js"))
    assert os.path.isfile(os.path.join(test_dir, "package.json"))


def test_cli_test_summary_printed(sdk_env):
    """print_test_summary is called and 'Test Results' appears in stdout."""
    result = run_cli(sdk_env, ["--frameworks", "javascript"])
    assert result.returncode == 0, result.stderr
    assert "Test Results" in result.stdout
