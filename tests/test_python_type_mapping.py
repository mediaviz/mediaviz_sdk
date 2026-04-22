"""Tests for Task 2: Python type mapping (_TYPE_MAP, _python_type, _python_nullable)."""
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import pytest
from generators.python import _TYPE_MAP, _python_type, _python_nullable


@pytest.mark.parametrize("yaml_type,expected", [
    ("string", "str"),
    ("str", "str"),
    ("integer", "int"),
    ("int", "int"),
    ("number", "float"),
    ("float", "float"),
    ("boolean", "bool"),
    ("bool", "bool"),
    ("list", "list"),
    ("array", "list"),
    ("any", "Any"),
    ("dict", "Any"),
    ("Dict", "Any"),   # uppercase — must normalise via .lower()
    ("datetime", "str"),
    ("emailstr", "str"),
])
def test_python_type_known(yaml_type, expected):
    assert _python_type(yaml_type) == expected


def test_python_type_unknown_defaults_to_any():
    assert _python_type("unknown_custom_type") == "Any"


def test_python_type_none_input_defaults_to_any():
    assert _python_type(None) == "Any"


def test_python_type_empty_string_defaults_to_any():
    assert _python_type("") == "Any"


@pytest.mark.parametrize("t,expected", [
    ("str", "str | None"),
    ("int", "int | None"),
    ("float", "float | None"),
    ("bool", "bool | None"),
    ("list", "list | None"),
    ("Any", "Any | None"),
])
def test_python_nullable(t, expected):
    assert _python_nullable(t) == expected


def test_type_map_covers_all_spec_entries():
    required_keys = {
        "string", "str", "integer", "int", "number", "float",
        "boolean", "bool", "list", "array", "any", "dict",
        "datetime", "emailstr",
    }
    assert required_keys.issubset(_TYPE_MAP.keys())
