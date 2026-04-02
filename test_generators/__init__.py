import importlib
import inspect
import os
import pkgutil

from .base import BaseTestGenerator


def discover_test_generators() -> dict[str, type[BaseTestGenerator]]:
    """Scan test_generators/ for BaseTestGenerator subclasses; return {framework_name: class}."""
    registry: dict[str, type[BaseTestGenerator]] = {}
    package_dir = os.path.dirname(__file__)
    for _, module_name, _ in pkgutil.iter_modules([package_dir]):
        if module_name in ("base",):
            continue
        module = importlib.import_module(f".{module_name}", package=__name__)
        for _, obj in inspect.getmembers(module, inspect.isclass):
            if (
                issubclass(obj, BaseTestGenerator)
                and obj is not BaseTestGenerator
                and hasattr(obj, "framework_name")
            ):
                registry[obj.framework_name] = obj
    return registry
