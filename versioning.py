import os
import re


def version_str(major: int, minor: int, iteration: int) -> str:
    return f"{major}.{minor}.{iteration}"


def get_next_version(output_dir: str, bump: str = "iteration") -> tuple[int, int, int]:
    """Return the next (major, minor, iteration) version tuple.

    bump: "iteration" (default), "minor", or "major".
    """
    pattern = re.compile(r"^v(\d+)\.(\d+)\.(\d+)$")
    versions: list[tuple[int, int, int]] = []

    if os.path.isdir(output_dir):
        for d in os.listdir(output_dir):
            m = pattern.match(d)
            if m and os.path.isdir(os.path.join(output_dir, d)):
                versions.append((int(m.group(1)), int(m.group(2)), int(m.group(3))))

    if not versions:
        return (1, 0, 0)

    major, minor, iteration = max(versions)

    if bump == "major":
        return (major + 1, 0, 0)
    if bump == "minor":
        return (major, minor + 1, 0)
    return (major, minor, iteration + 1)
