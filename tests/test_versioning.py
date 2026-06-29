import pytest
from versioning import (
    SdkVersion,
    next_version,
    parse_version,
    version_str,
    read_version_manifest,
    write_version_manifest,
    MANIFEST_NAME,
)


def test_version_str():
    assert version_str(1, 0, 0) == "1.0.0"
    assert version_str(2, 3, 14) == "2.3.14"


# ── SdkVersion rendering ────────────────────────────────────────────────────

def test_main_renders_plain_3part():
    v = SdkVersion(1, 4, 0)
    assert v.npm() == "1.4.0"
    assert v.pypi() == "1.4.0"
    assert v.base() == "1.4.0"
    assert v.dir_name() == "v1.4.0"


def test_dev_renders_prerelease_and_4part():
    v = SdkVersion(1, 4, 0, "dev", 81)
    assert v.npm() == "1.4.0-dev.81"          # semver prerelease
    assert v.pypi() == "1.0.4.81.dev0"        # 4-part + PEP 440 suffix
    assert v.base() == "1.4.0"                # composer-safe
    assert v.dir_name() == "v1.4.0-dev.81"


def test_qa_uses_rc_channel():
    v = SdkVersion(1, 4, 0, "rc", 5)
    assert v.npm() == "1.4.0-rc.5"
    assert v.pypi() == "1.0.4.5rc0"


# ── parse_version ───────────────────────────────────────────────────────────

@pytest.mark.parametrize("text,expected", [
    ("1.4.0", SdkVersion(1, 4, 0, None, 0)),
    ("v1.4.0", SdkVersion(1, 4, 0, None, 0)),
    ("1.4.0-dev.81", SdkVersion(1, 4, 0, "dev", 81)),
    ("v1.4.0-rc.5", SdkVersion(1, 4, 0, "rc", 5)),
])
def test_parse_version(text, expected):
    assert parse_version(text) == expected


@pytest.mark.parametrize("bad", ["", "not-a-version", "v39", "1.2", "1.4.0-beta.1"])
def test_parse_version_rejects_garbage(bad):
    assert parse_version(bad) is None


# ── manifest roundtrip ──────────────────────────────────────────────────────

def test_manifest_roundtrip_main(tmp_path):
    write_version_manifest(str(tmp_path), SdkVersion(1, 3, 0))
    assert (tmp_path / MANIFEST_NAME).read_text().strip() == "1.3.0"
    assert read_version_manifest(str(tmp_path)) == SdkVersion(1, 3, 0)


def test_manifest_roundtrip_dev(tmp_path):
    write_version_manifest(str(tmp_path), SdkVersion(1, 4, 0, "dev", 80))
    assert (tmp_path / MANIFEST_NAME).read_text().strip() == "1.4.0-dev.80"
    assert read_version_manifest(str(tmp_path)) == SdkVersion(1, 4, 0, "dev", 80)


def test_manifest_absent_returns_none(tmp_path):
    assert read_version_manifest(str(tmp_path)) is None


# ── next_version: main (channel=None) ───────────────────────────────────────

def test_main_first_version(tmp_path):
    assert next_version(str(tmp_path)) == SdkVersion(1, 0, 0)


def test_main_iteration_bump(tmp_path):
    (tmp_path / "v1.0.0").mkdir()
    (tmp_path / "v1.0.1").mkdir()
    assert next_version(str(tmp_path)) == SdkVersion(1, 0, 2)


def test_main_minor_bump(tmp_path):
    (tmp_path / "v1.2.5").mkdir()
    assert next_version(str(tmp_path), bump="minor") == SdkVersion(1, 3, 0)


def test_main_major_bump(tmp_path):
    (tmp_path / "v2.1.3").mkdir()
    assert next_version(str(tmp_path), bump="major") == SdkVersion(3, 0, 0)


def test_main_ignores_files_and_old_dirs(tmp_path):
    (tmp_path / "v1.0.0").touch()   # file, not dir
    (tmp_path / "v39").mkdir()       # old integer format
    (tmp_path / "archive").mkdir()
    assert next_version(str(tmp_path)) == SdkVersion(1, 0, 0)


def test_main_floored_by_manifest_when_dirs_dropped(tmp_path):
    # The durable-floor guarantee: no vN/ dirs, manifest carries the version.
    write_version_manifest(str(tmp_path), SdkVersion(1, 3, 0))
    assert next_version(str(tmp_path), bump="minor") == SdkVersion(1, 4, 0)


def test_main_manifest_does_not_regress_below_dirs(tmp_path):
    (tmp_path / "v1.5.0").mkdir()
    write_version_manifest(str(tmp_path), SdkVersion(1, 3, 0))
    assert next_version(str(tmp_path), bump="minor") == SdkVersion(1, 6, 0)


def test_main_ignores_prerelease_candidates(tmp_path):
    # A stray dev dir must not influence main's release floor.
    (tmp_path / "v1.4.0-dev.99").mkdir()
    (tmp_path / "v1.3.0").mkdir()
    assert next_version(str(tmp_path), bump="minor") == SdkVersion(1, 4, 0)


# ── next_version: dev/qa (channel pre-releases) ─────────────────────────────

def test_dev_pins_to_base_minor_and_starts_counter(tmp_path):
    # No prior dev versions → counter starts at 1, minor = main_minor + 1 (passed in).
    assert next_version(str(tmp_path), channel="dev", base_minor=4) == SdkVersion(1, 4, 0, "dev", 1)


def test_dev_continues_counter_from_manifest(tmp_path):
    write_version_manifest(str(tmp_path), SdkVersion(1, 4, 0, "dev", 80))
    assert next_version(str(tmp_path), channel="dev", base_minor=4) == SdkVersion(1, 4, 0, "dev", 81)


def test_dev_continues_counter_from_dirs(tmp_path):
    (tmp_path / "v1.4.0-dev.80").mkdir()
    (tmp_path / "v1.4.0-dev.79").mkdir()
    assert next_version(str(tmp_path), channel="dev", base_minor=4) == SdkVersion(1, 4, 0, "dev", 81)


def test_base_minor_updates_when_main_bumps(tmp_path):
    # main moved to 1.4.0 → base_minor 5; counter still continues from 80.
    write_version_manifest(str(tmp_path), SdkVersion(1, 4, 0, "dev", 80))
    assert next_version(str(tmp_path), channel="dev", base_minor=5) == SdkVersion(1, 5, 0, "dev", 81)


def test_dev_and_qa_counters_are_independent(tmp_path):
    # A dev manifest must not seed qa's counter (channel isolation).
    write_version_manifest(str(tmp_path), SdkVersion(1, 4, 0, "dev", 80))
    assert next_version(str(tmp_path), channel="rc", base_minor=4) == SdkVersion(1, 4, 0, "rc", 1)


def test_base_minor_falls_back_to_manifest_when_absent(tmp_path):
    # Local regen without --base-version reuses the stored base minor.
    write_version_manifest(str(tmp_path), SdkVersion(1, 4, 0, "dev", 80))
    assert next_version(str(tmp_path), channel="dev") == SdkVersion(1, 4, 0, "dev", 81)
