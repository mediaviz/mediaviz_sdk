"""Tests for Task 1: PythonGenerator scaffold."""
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import pytest
from generators import discover_generators, get_generator
from generators.base import BaseGenerator
from generators.python import PythonGenerator


def test_python_in_registry():
    registry = discover_generators()
    assert "python" in registry, "PythonGenerator must be auto-discovered"


def test_python_generator_is_base_subclass():
    assert issubclass(PythonGenerator, BaseGenerator)


def test_framework_name():
    assert PythonGenerator.framework_name == "python"


def test_get_generator_python():
    cls = get_generator("python")
    assert cls is PythonGenerator


def test_instantiation():
    g = PythonGenerator()
    assert isinstance(g, PythonGenerator)
    assert hasattr(g, "_copied_modules")
    assert g._copied_modules == []


def test_contract_methods_callable():
    g = PythonGenerator()
    # All abstract methods are now implemented; verify they don't raise NotImplementedError
    assert g._optional_check_expr("x") == "x is not None"
    assert g.emit_reexports("m", [], "/tmp") is None
    exports = g.discover_module_exports("m", "/nonexistent_path")
    assert isinstance(exports, list)
