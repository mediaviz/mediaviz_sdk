from __future__ import annotations
from abc import ABC, abstractmethod
import re
import shutil
import os

from naming import snake_to_camel as _snake_to_camel, snake_to_pascal as _snake_to_pascal


class BaseGenerator(ABC):
    framework_name: str

    def __init__(self):
        self._copied_modules: list[dict] = []

    @abstractmethod
    def generate(self, endpoints: list[dict], output_dir: str) -> None:
        """Generate SDK files from resolved endpoints into output_dir."""

    @abstractmethod
    def copy_module(self, module_name: str, module_root: str, output_dir: str) -> None:
        """Copy a nested module into output_dir/<module_name>/ and register it."""

    @abstractmethod
    def discover_module_exports(self, module_name: str, module_path: str) -> list:
        """Return export descriptors for a copied nested module."""

    @abstractmethod
    def emit_reexports(self, module_name: str, exports: list, output_dir: str) -> str | None:
        """Generate re-export file(s). Return filename for barrel inclusion, or None."""

    def copy_auth_wrapper(self, oauth_sdk_root: str, output_dir: str) -> None:
        """Backward-compatible delegate to copy_module."""
        self.copy_module("oauth", oauth_sdk_root, output_dir)

    def reexport_all_modules(self, output_dir: str) -> list[str]:
        """Discover and re-export all copied modules. Returns filenames for barrel/autoload."""
        reexport_files = []
        for mod in self._copied_modules:
            exports = self.discover_module_exports(mod["name"], mod["path"])
            if not exports:
                continue
            filename = self.emit_reexports(mod["name"], exports, output_dir)
            if filename:
                reexport_files.append(filename)
        return reexport_files

    def group_by_controller(self, endpoints: list[dict]) -> dict[str, list[dict]]:
        groups: dict[str, list[dict]] = {}
        for ep in endpoints:
            if ep.get("hidden"):
                continue
            controller = ep["controller"].replace(" ", "_")
            groups.setdefault(controller, []).append(ep)
        return groups

    @staticmethod
    def snake_to_camel(name: str) -> str:
        return _snake_to_camel(name)

    @staticmethod
    def snake_to_pascal(name: str) -> str:
        return _snake_to_pascal(name)

    def _copy_module_files(self, module_root: str, framework_subdir: str, module_name: str, output_dir: str) -> str:
        src = os.path.join(module_root, framework_subdir)
        dst = os.path.join(output_dir, module_name)
        if os.path.isdir(src):
            shutil.copytree(src, dst, dirs_exist_ok=True,
                            ignore=shutil.ignore_patterns("vendor", "node_modules"))
        else:
            os.makedirs(dst, exist_ok=True)
        self._copied_modules.append({"name": module_name, "path": dst})
        return dst
