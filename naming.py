"""Shared string-naming utilities used by both generators and test_generators."""


def snake_to_camel(name: str) -> str:
    parts = name.split("_")
    return parts[0] + "".join(p.capitalize() for p in parts[1:])


def snake_to_pascal(name: str) -> str:
    return "".join(p.capitalize() for p in name.split("_"))
