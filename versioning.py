import os
import re


def get_next_version(output_dir: str) -> int:
    if not os.path.isdir(output_dir):
        return 1
    pattern = re.compile(r"^v(\d+)$")
    versions = [
        int(m.group(1))
        for d in os.listdir(output_dir)
        if (m := pattern.match(d)) and os.path.isdir(os.path.join(output_dir, d))
    ]
    return max(versions) + 1 if versions else 1
