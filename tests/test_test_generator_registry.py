import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from test_generators import discover_test_generators
from test_generators.base import BaseTestGenerator


def test_discover_test_generators_returns_dict():
    registry = discover_test_generators()
    assert isinstance(registry, dict)


def test_discover_test_generators_contains_javascript():
    registry = discover_test_generators()
    assert "javascript" in registry


def test_discover_test_generators_contains_php():
    registry = discover_test_generators()
    assert "php" in registry


def test_all_discovered_are_base_subclasses():
    registry = discover_test_generators()
    for name, cls in registry.items():
        assert issubclass(cls, BaseTestGenerator), f"{name} is not a BaseTestGenerator subclass"


def test_registry_keys_match_framework_name():
    registry = discover_test_generators()
    for key, cls in registry.items():
        assert key == cls.framework_name, f"key '{key}' != framework_name '{cls.framework_name}'"


def test_discovered_classes_are_instantiable():
    registry = discover_test_generators()
    for name, cls in registry.items():
        instance = cls()
        assert hasattr(instance, "generate"), f"{name} missing generate()"
        assert hasattr(instance, "run"), f"{name} missing run()"
