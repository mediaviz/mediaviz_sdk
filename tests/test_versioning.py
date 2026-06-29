import os
import pytest
from versioning import (
    get_next_version,
    version_str,
    read_version_manifest,
    write_version_manifest,
    MANIFEST_NAME,
)


def test_version_str():
    assert version_str(1, 0, 0) == "1.0.0"
    assert version_str(2, 3, 14) == "2.3.14"


def test_first_version(tmp_path):
    assert get_next_version(str(tmp_path)) == (1, 0, 0)


def test_first_version_empty_dir(tmp_path):
    assert get_next_version(str(tmp_path)) == (1, 0, 0)


def test_iteration_bump(tmp_path):
    (tmp_path / "v1.0.0").mkdir()
    (tmp_path / "v1.0.1").mkdir()
    assert get_next_version(str(tmp_path)) == (1, 0, 2)


def test_minor_bump(tmp_path):
    (tmp_path / "v1.2.5").mkdir()
    assert get_next_version(str(tmp_path), bump="minor") == (1, 3, 0)


def test_major_bump(tmp_path):
    (tmp_path / "v2.1.3").mkdir()
    assert get_next_version(str(tmp_path), bump="major") == (3, 0, 0)


def test_picks_highest_version(tmp_path):
    (tmp_path / "v1.0.0").mkdir()
    (tmp_path / "v1.2.0").mkdir()
    (tmp_path / "v1.1.5").mkdir()
    assert get_next_version(str(tmp_path)) == (1, 2, 1)


def test_ignores_non_matching_entries(tmp_path):
    (tmp_path / "README.md").touch()
    (tmp_path / "v1.0.0").mkdir()
    (tmp_path / "archive").mkdir()
    assert get_next_version(str(tmp_path)) == (1, 0, 1)


def test_ignores_files_named_like_versions(tmp_path):
    (tmp_path / "v1.0.0").touch()  # file, not dir
    assert get_next_version(str(tmp_path)) == (1, 0, 0)


def test_ignores_old_integer_dirs(tmp_path):
    (tmp_path / "v39").mkdir()  # old format
    assert get_next_version(str(tmp_path)) == (1, 0, 0)


# ── VERSION manifest (durable floor) ────────────────────────────────────────

def test_manifest_roundtrip(tmp_path):
    write_version_manifest(str(tmp_path), (1, 0, 79))
    assert (tmp_path / MANIFEST_NAME).read_text().strip() == "1.0.79"
    assert read_version_manifest(str(tmp_path)) == (1, 0, 79)


def test_manifest_absent_returns_none(tmp_path):
    assert read_version_manifest(str(tmp_path)) is None


def test_manifest_accepts_optional_v_prefix(tmp_path):
    (tmp_path / MANIFEST_NAME).write_text("v2.3.4\n")
    assert read_version_manifest(str(tmp_path)) == (2, 3, 4)


def test_manifest_garbage_returns_none(tmp_path):
    (tmp_path / MANIFEST_NAME).write_text("not-a-version")
    assert read_version_manifest(str(tmp_path)) is None


def test_manifest_floors_version_when_no_dirs(tmp_path):
    # The dev-branch failure: vN/ dirs dropped by a merge → dir scan finds
    # nothing, but the manifest must keep the counter from resetting to 1.0.0.
    write_version_manifest(str(tmp_path), (1, 0, 79))
    assert get_next_version(str(tmp_path)) == (1, 0, 80)


def test_manifest_does_not_regress_below_dirs(tmp_path):
    # On promotion the manifest may carry a lower number than the branch's own
    # tracked dirs (e.g. dev's 1.0.x promoted onto main's 1.3.x); max() wins.
    (tmp_path / "v1.3.0").mkdir()
    write_version_manifest(str(tmp_path), (1, 0, 79))
    assert get_next_version(str(tmp_path), bump="minor") == (1, 4, 0)


def test_manifest_takes_floor_above_dirs(tmp_path):
    (tmp_path / "v1.0.5").mkdir()
    write_version_manifest(str(tmp_path), (1, 0, 79))
    assert get_next_version(str(tmp_path)) == (1, 0, 80)
