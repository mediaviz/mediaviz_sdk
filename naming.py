"""Shared string-naming utilities used by both generators and test_generators."""

import re

_X_PREFIX_RE = re.compile(r"^x[-_]")


def snake_to_camel(name: str) -> str:
    parts = name.replace("-", "_").split("_")
    return parts[0] + "".join(p.capitalize() for p in parts[1:])


def snake_to_pascal(name: str) -> str:
    return "".join(p.capitalize() for p in name.replace("-", "_").split("_"))


def header_to_param(name: str) -> str:
    """Convert an HTTP header name to a clean param name.

    Strips 'x-' prefix, then camelCases: 'x-bucket-name' -> 'bucketName'.
    """
    stripped = _X_PREFIX_RE.sub("", name)
    return snake_to_camel(stripped)
