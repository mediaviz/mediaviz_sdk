from __future__ import annotations

import os
import sys
import textwrap

import pytest

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, REPO_ROOT)

import generate  # noqa: E402


# ── fixtures ──────────────────────────────────────────────────────────────────


@pytest.fixture
def sdk_env(fake_sources, monkeypatch):
    """Populate fake_sources with a minimal flow + controller, return invocation context."""
    flow_name = "test_flow"
    (fake_sources.flows / f"{flow_name}.yaml").write_text(textwrap.dedent("""\
        refs:
          - ref: "controllers/photos.yaml#get_photos"
    """))
    (fake_sources.controllers / "photos.yaml").write_text(textwrap.dedent("""\
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
    """))
    output_dir = fake_sources.hub.parent / "output"

    # Skip the (slow, network-dependent) npm install + jest run; we only care that
    # generate() invokes the test generator and prints the summary.
    from test_generators.base import TestResult
    from test_generators.javascript import JavaScriptTestGenerator
    monkeypatch.setattr(
        JavaScriptTestGenerator, "run",
        lambda self, test_dir: TestResult(success=True, total=0, passed=0, failed=0, output=""),
    )

    return {"flow": flow_name, "output_dir": str(output_dir)}


# ── helpers ────────────────────────────────────────────────────────────────────


def run_cli(monkeypatch, capsys, env, *extra):
    argv = ["generate.py", "--endpoints", env["flow"], "--destination-dir", env["output_dir"], *extra]
    monkeypatch.setattr(sys, "argv", argv)
    try:
        generate.main()
        code = 0
    except SystemExit as e:
        code = e.code if e.code is not None else 0
    captured = capsys.readouterr()
    return code, captured


# ── tests ──────────────────────────────────────────────────────────────────────


def test_cli_creates_resolved_yaml(monkeypatch, capsys, sdk_env):
    code, _ = run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "javascript")
    assert code == 0
    v = os.path.join(sdk_env["output_dir"], "v1.0.0")
    yaml_files = [f for f in os.listdir(v) if f.startswith("resolved_") and f.endswith(".yaml")]
    assert yaml_files == ["resolved_test_flow.yaml"]


def test_cli_creates_framework_output_dir(monkeypatch, capsys, sdk_env):
    code, _ = run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "javascript")
    assert code == 0
    fw_dir = os.path.join(sdk_env["output_dir"], "v1.0.0", "javascript")
    assert os.path.isdir(fw_dir)


def test_cli_generates_controller_file(monkeypatch, capsys, sdk_env):
    code, _ = run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "javascript")
    assert code == 0
    photos_js = os.path.join(sdk_env["output_dir"], "v1.0.0", "javascript", "photos.js")
    assert os.path.isfile(photos_js)
    assert "getPhotos" in open(photos_js).read()


def test_cli_copies_oauth_wrapper(monkeypatch, capsys, sdk_env):
    code, _ = run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "javascript")
    assert code == 0
    assert os.path.isfile(
        os.path.join(sdk_env["output_dir"], "v1.0.0", "javascript", "oauth", "index.js")
    )


def test_cli_version_increments_on_second_run(monkeypatch, capsys, sdk_env):
    run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "javascript")
    run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "javascript")
    v2 = os.path.join(sdk_env["output_dir"], "v1.0.1", "javascript")
    assert os.path.isdir(v2)
    # v1.0.0 is moved to archive/ on the second run
    archived = os.path.join(sdk_env["output_dir"], "archive", "v1.0.0")
    assert os.path.isdir(archived)


def test_cli_minor_version_flag(monkeypatch, capsys, sdk_env):
    run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "javascript")
    run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "javascript", "--minor-version")
    v = os.path.join(sdk_env["output_dir"], "v1.1.0", "javascript")
    assert os.path.isdir(v)


def test_cli_major_version_flag(monkeypatch, capsys, sdk_env):
    run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "javascript")
    run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "javascript", "--major-version")
    v = os.path.join(sdk_env["output_dir"], "v2.0.0", "javascript")
    assert os.path.isdir(v)


def test_cli_unknown_framework_exits_nonzero(monkeypatch, capsys, sdk_env):
    code, captured = run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "cobol")
    assert code != 0
    assert "cobol" in captured.err or "cobol" in captured.out


def test_cli_summary_output(monkeypatch, capsys, sdk_env):
    code, captured = run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "javascript")
    assert code == 0
    assert "v1.0.0" in captured.out
    assert "javascript" in captured.out


def test_cli_missing_required_arg_exits_nonzero(monkeypatch, capsys, sdk_env):
    monkeypatch.setattr(sys, "argv", ["generate.py"])
    with pytest.raises(SystemExit) as exc_info:
        generate.main()
    assert exc_info.value.code != 0


def test_cli_generates_test_dir(monkeypatch, capsys, sdk_env):
    """After SDK generation, test files are emitted into output/v1.0.0/tests/{framework}/."""
    code, _ = run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "javascript")
    assert code == 0
    test_dir = os.path.join(sdk_env["output_dir"], "v1.0.0", "tests", "javascript")
    assert os.path.isdir(test_dir)
    assert os.path.isfile(os.path.join(test_dir, "helpers.js"))
    assert os.path.isfile(os.path.join(test_dir, "package.json"))


def test_cli_test_summary_printed(monkeypatch, capsys, sdk_env):
    """print_test_summary is called and 'Test Results' appears in stdout."""
    code, captured = run_cli(monkeypatch, capsys, sdk_env, "--frameworks", "javascript")
    assert code == 0
    assert "Test Results" in captured.out
