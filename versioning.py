from __future__ import annotations

import os
import re
from dataclasses import dataclass

# Tracked, non-gitignored floor for the version counter. The generated vN/ dirs
# are gitignored and only exist because CI force-adds them, so any merge/rebase/
# fresh-checkout that drops them would otherwise silently reset versioning and
# collide with the immutable npm/PyPI registries. These files persist the last
# released version independently of that throwaway tree and are folded into the
# floor below, so a dropped vN/ dir can never regress the count.
#
# One file PER CHANNEL: dev/qa/main each write only their own path, so promoting
# dev→qa→main never produces a merge conflict on versioning (the pre-split single
# VERSION file was rewritten by all three branches, so every promotion collided).
# Keys are the internal channel codes (None = main, "rc" = qa); filenames use the
# branch names, which is what operators actually reason about.
MANIFEST_NAMES = {None: "VERSION.main", "dev": "VERSION.dev", "rc": "VERSION.qa"}

# The pre-split shared manifest. Still read as a fallback — its content declares
# its own channel, so whichever branch's copy survives floors the right channel —
# and deleted on the next write, so the migration completes on each branch's first
# regeneration and the shared merge target disappears for good.
LEGACY_MANIFEST_NAME = "VERSION"

# Matches both release dirs/manifests (v1.4.0 / 1.4.0) and channel pre-releases
# (v1.4.0-dev.81 / 1.4.0-rc.5). Leading 'v' optional.
_VERSION_RE = re.compile(r"^v?(\d+)\.(\d+)\.(\d+)(?:-(dev|rc)\.(\d+))?$")

# PEP 440 pre-release suffix per channel (PyPI ships dev/qa/main as one package).
_PYPI_SUFFIX = {"dev": ".dev0", "rc": "rc0"}


@dataclass(frozen=True)
class SdkVersion:
    """A channel-aware SDK version, rendered per registry.

    main (channel=None): a plain 3-part release, e.g. ``1.4.0``.
    dev/qa (channel ``"dev"``/``"rc"``): pinned one minor ahead of main
    (``minor`` = main's minor + 1), patch 0, plus a per-channel monotonic
    ``counter``. The actual number stays aligned with main while each channel
    tracks separately:
        npm  → ``1.{minor}.0-{channel}.{counter}``      (semver pre-release)
        PyPI → ``1.0.{minor}.{counter}{.dev0|rc0}``      (4-part + PEP 440 suffix)
    """

    major: int
    minor: int
    patch: int = 0
    channel: str | None = None  # None = main; "dev" / "rc" = pre-release channels
    counter: int = 0

    def npm(self) -> str:
        if self.channel is None:
            return f"{self.major}.{self.minor}.{self.patch}"
        return f"{self.major}.{self.minor}.0-{self.channel}.{self.counter}"

    def pypi(self) -> str:
        if self.channel is None:
            return f"{self.major}.{self.minor}.{self.patch}"
        return f"{self.major}.0.{self.minor}.{self.counter}{_PYPI_SUFFIX[self.channel]}"

    def base(self) -> str:
        """Plain 3-part ``major.minor.patch`` — channel/counter dropped.

        Used for the PHP/composer manifest: PHP ships to Packagist from main only
        (where this equals npm()), and composer would reject npm's pre-release form,
        which would break the inline ``composer install`` during dev/qa test runs.
        """
        return f"{self.major}.{self.minor}.{self.patch}"

    def dir_name(self) -> str:
        """Filesystem- and git-safe output dir name (mirrors the npm form)."""
        return f"v{self.npm()}"

    @property
    def sort_key(self) -> tuple:
        # A final release outranks its own pre-releases; counter orders pre-releases.
        return (self.major, self.minor, self.patch, 0 if self.channel else 1, self.counter)


def version_str(major: int, minor: int, iteration: int) -> str:
    return f"{major}.{minor}.{iteration}"


def parse_version(text: str) -> SdkVersion | None:
    """Parse ``1.4.0`` / ``v1.4.0-dev.81`` etc. into an SdkVersion, or None."""
    m = _VERSION_RE.match(text.strip())
    if not m:
        return None
    return SdkVersion(
        int(m.group(1)), int(m.group(2)), int(m.group(3)),
        m.group(4), int(m.group(5)) if m.group(5) else 0,
    )


def manifest_name(channel: str | None) -> str:
    """Manifest filename owned by *channel* (None = main)."""
    return MANIFEST_NAMES[channel]


def read_version_manifest(output_dir: str, channel: str | None = None) -> SdkVersion | None:
    """Return the version *channel* recorded in *output_dir*, or None if absent/unparseable.

    Falls back to the pre-split shared VERSION file, but only when its content
    declares this same channel — on a dev checkout that file holds a dev version
    and must not be mistaken for main's baseline.
    """
    own = _read_manifest_file(os.path.join(output_dir, manifest_name(channel)))
    if own and own.channel == channel:
        return own
    legacy = _read_manifest_file(os.path.join(output_dir, LEGACY_MANIFEST_NAME))
    return legacy if legacy and legacy.channel == channel else None


def write_version_manifest(output_dir: str, version: SdkVersion) -> None:
    """Persist *version* (npm form — carries channel + counter) as its channel's floor."""
    os.makedirs(output_dir, exist_ok=True)
    with open(os.path.join(output_dir, manifest_name(version.channel)), "w") as f:
        f.write(version.npm() + "\n")
    # Retire the shared manifest once this channel owns its own file, so it stops
    # being a three-way merge target. Its value is preserved: this write records a
    # version strictly above whatever it held for this channel.
    legacy = os.path.join(output_dir, LEGACY_MANIFEST_NAME)
    if os.path.isfile(legacy):
        os.remove(legacy)


def next_version(
    output_dir: str,
    bump: str = "iteration",
    *,
    channel: str | None = None,
    base_minor: int | None = None,
) -> SdkVersion:
    """Compute the next version for *output_dir*.

    channel None (main): a 3-part release bumped per *bump* ("iteration" /
    "minor" / "major"), floored by the max of the on-disk vN/ dirs and the
    VERSION manifests so a dropped dir can't regress the count.

    channel "dev"/"rc": pinned to ``1.{base_minor}.0`` (base_minor = main's
    minor + 1, supplied by the caller) with a per-channel ``counter`` that is
    one above the highest counter seen for this channel in the dirs/manifest.
    """
    candidates = _scan_versions(output_dir)

    if channel is None:
        releases = [c for c in candidates if c.channel is None]
        if not releases:
            return SdkVersion(1, 0, 0)  # first release
        floor = max(releases, key=lambda c: c.sort_key)
        major, minor, patch = floor.major, floor.minor, floor.patch
        if bump == "major":
            return SdkVersion(major + 1, 0, 0)
        if bump == "minor":
            return SdkVersion(major, minor + 1, 0)
        return SdkVersion(major, minor, patch + 1)

    same = [c for c in candidates if c.channel == channel]
    stored = max((c.minor for c in same), default=1)
    if base_minor is None:
        # Local regen without --base-version: derive the base from the checked-out
        # main manifest (CI passes origin/main's, which is authoritative). Floored by
        # the stored base so a stale main copy can't regress below a published minor.
        main = read_version_manifest(output_dir, None)
        base_minor = max(stored, main.minor + 1) if main else stored
    counter = max((c.counter for c in same), default=0) + 1
    return SdkVersion(1, base_minor, 0, channel, counter)


def _read_manifest_file(path: str) -> SdkVersion | None:
    if not os.path.isfile(path):
        return None
    return parse_version(open(path).read())


def _scan_versions(output_dir: str) -> list[SdkVersion]:
    """All versions discoverable in *output_dir*: vN/ dir names + every VERSION manifest.

    Manifests for other channels are harmless here — callers filter candidates by
    channel, so each channel's floor stays isolated.
    """
    found: list[SdkVersion] = []
    if os.path.isdir(output_dir):
        for d in os.listdir(output_dir):
            if d.startswith("v") and os.path.isdir(os.path.join(output_dir, d)):
                v = parse_version(d)
                if v:
                    found.append(v)
    for name in (*MANIFEST_NAMES.values(), LEGACY_MANIFEST_NAME):
        manifest = _read_manifest_file(os.path.join(output_dir, name))
        if manifest:
            found.append(manifest)
    return found
