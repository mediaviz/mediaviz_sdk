import os
import re


def get_next_version(output_dir: str) -> int:
    resolved_dir = os.path.join(output_dir, "resolved")
    if not os.path.isdir(resolved_dir):
        return 1
    pattern = re.compile(r"^v(\d+)_.*\.yaml$")
    versions = [
        int(m.group(1))
        for f in os.listdir(resolved_dir)
        if (m := pattern.match(f))
    ]
    return max(versions) + 1 if versions else 1
