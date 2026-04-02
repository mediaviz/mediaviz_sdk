import os
import pytest
from versioning import get_next_version


def test_first_version(tmp_path):
    assert get_next_version(str(tmp_path)) == 1


def test_first_version_empty_dir(tmp_path):
    assert get_next_version(str(tmp_path)) == 1


def test_increment(tmp_path):
    (tmp_path / "v1").mkdir()
    (tmp_path / "v2").mkdir()
    assert get_next_version(str(tmp_path)) == 3


def test_increment_non_sequential(tmp_path):
    (tmp_path / "v1").mkdir()
    (tmp_path / "v5").mkdir()
    assert get_next_version(str(tmp_path)) == 6


def test_ignores_non_matching_entries(tmp_path):
    (tmp_path / "README.md").touch()
    (tmp_path / "v1").mkdir()
    (tmp_path / "archive").mkdir()
    assert get_next_version(str(tmp_path)) == 2


def test_ignores_files_named_like_versions(tmp_path):
    (tmp_path / "v1").touch()  # file, not dir
    assert get_next_version(str(tmp_path)) == 1
