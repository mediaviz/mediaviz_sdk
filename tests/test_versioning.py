import os
import pytest
from versioning import get_next_version


def test_first_version(tmp_path):
    assert get_next_version(str(tmp_path)) == 1


def test_first_version_empty_resolved(tmp_path):
    (tmp_path / "resolved").mkdir()
    assert get_next_version(str(tmp_path)) == 1


def test_increment(tmp_path):
    resolved = tmp_path / "resolved"
    resolved.mkdir()
    (resolved / "v1_top_endpoints.yaml").touch()
    (resolved / "v2_top_endpoints.yaml").touch()
    assert get_next_version(str(tmp_path)) == 3


def test_increment_non_sequential(tmp_path):
    resolved = tmp_path / "resolved"
    resolved.mkdir()
    (resolved / "v1_top_endpoints.yaml").touch()
    (resolved / "v5_other.yaml").touch()
    assert get_next_version(str(tmp_path)) == 6


def test_ignores_non_matching_files(tmp_path):
    resolved = tmp_path / "resolved"
    resolved.mkdir()
    (resolved / "README.md").touch()
    (resolved / "v1_top.yaml").touch()
    (resolved / "not_a_version.yaml").touch()
    assert get_next_version(str(tmp_path)) == 2
