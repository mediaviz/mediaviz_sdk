import pytest
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from generators import discover_generators, get_generator
from generators.base import BaseGenerator


def test_discover_all():
    registry = discover_generators()
    assert isinstance(registry, dict)
    # All known generators must be present
    assert "javascript" in registry
    # Every value must be a BaseGenerator subclass
    for name, cls in registry.items():
        assert issubclass(cls, BaseGenerator), f"{name} is not a BaseGenerator subclass"
        assert cls.framework_name == name


def test_get_generator_returns_class():
    cls = get_generator("javascript")
    assert issubclass(cls, BaseGenerator)
    instance = cls()
    assert hasattr(instance, "generate")
    assert hasattr(instance, "copy_auth_wrapper")


def test_unknown_framework_raises():
    with pytest.raises(ValueError, match="Unknown framework"):
        get_generator("cobol")


def test_registry_is_dict_keyed_by_framework_name():
    registry = discover_generators()
    for key, cls in registry.items():
        assert key == cls.framework_name
