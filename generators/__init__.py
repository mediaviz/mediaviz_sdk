import importlib
import inspect
import os
import pkgutil

from .base import BaseGenerator


def discover_generators() -> dict[str, type[BaseGenerator]]:
    """Scan generators/ for BaseGenerator subclasses; return {framework_name: class}."""
    registry: dict[str, type[BaseGenerator]] = {}
    package_dir = os.path.dirname(__file__)
    for _, module_name, _ in pkgutil.iter_modules([package_dir]):
        if module_name in ("base",):
            continue
        module = importlib.import_module(f".{module_name}", package=__name__)
        for _, obj in inspect.getmembers(module, inspect.isclass):
            if (
                issubclass(obj, BaseGenerator)
                and obj is not BaseGenerator
                and hasattr(obj, "framework_name")
            ):
                registry[obj.framework_name] = obj
    return registry


def get_generator(framework: str) -> type[BaseGenerator]:
    registry = discover_generators()
    if framework not in registry:
        raise ValueError(f"Unknown framework '{framework}'. Available: {sorted(registry)}")
    return registry[framework]
