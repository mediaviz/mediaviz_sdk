from __future__ import annotations

import os
import re

# Tracked, non-gitignored floor for the version counter. The generated vN/ dirs
# are gitignored and only exist because CI force-adds them, so any merge/rebase/
# fresh-checkout that drops them would otherwise silently reset versioning to
# 1.0.0 — colliding with the immutable npm/PyPI registries. This file persists
# the last-released version independently of that throwaway tree and is folded
# into the version floor below, so a dropped vN/ dir can never regress the count.
MANIFEST_NAME = "VERSION"

_DIR_RE = re.compile(r"^v(\d+)\.(\d+)\.(\d+)$")        # generated vN/ dir names (require the v)
_MANIFEST_RE = re.compile(r"^v?(\d+)\.(\d+)\.(\d+)$")  # VERSION file contents (v optional)


def version_str(major: int, minor: int, iteration: int) -> str:
    return f"{major}.{minor}.{iteration}"


def read_version_manifest(output_dir: str) -> tuple[int, int, int] | None:
    """Return the version recorded in <output_dir>/VERSION, or None if absent/unparseable."""
    path = os.path.join(output_dir, MANIFEST_NAME)
    if not os.path.isfile(path):
        return None
    m = _MANIFEST_RE.match(open(path).read().strip())
    return (int(m.group(1)), int(m.group(2)), int(m.group(3))) if m else None


def write_version_manifest(output_dir: str, version: tuple[int, int, int]) -> None:
    """Persist *version* to <output_dir>/VERSION as the durable version floor."""
    os.makedirs(output_dir, exist_ok=True)
    with open(os.path.join(output_dir, MANIFEST_NAME), "w") as f:
        f.write(version_str(*version) + "\n")


def get_next_version(output_dir: str, bump: str = "iteration") -> tuple[int, int, int]:
    """Return the next (major, minor, iteration) version tuple.

    The floor is the max of the on-disk vN/ dirs AND the committed VERSION
    manifest, so a missing (dropped/un-tracked) vN/ dir can never reset the
    count below what was already published. bump: "iteration", "minor", "major".
    """
    versions: list[tuple[int, int, int]] = []

    if os.path.isdir(output_dir):
        for d in os.listdir(output_dir):
            m = _DIR_RE.match(d)
            if m and os.path.isdir(os.path.join(output_dir, d)):
                versions.append((int(m.group(1)), int(m.group(2)), int(m.group(3))))

    manifest = read_version_manifest(output_dir)
    if manifest is not None:
        versions.append(manifest)

    if not versions:
        return (1, 0, 0)

    major, minor, iteration = max(versions)

    if bump == "major":
        return (major + 1, 0, 0)
    if bump == "minor":
        return (major, minor + 1, 0)
    return (major, minor, iteration + 1)
