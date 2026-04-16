import os
import pytest
from versioning import get_next_version, version_str


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
