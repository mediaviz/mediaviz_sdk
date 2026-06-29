from __future__ import annotations
from abc import ABC, abstractmethod
import re
import shutil
import os

from naming import snake_to_camel as _snake_to_camel, snake_to_pascal as _snake_to_pascal, header_to_param as _header_to_param


class BaseGenerator(ABC):
    framework_name: str

    # PEP 440 pre-release channel ("dev" | "rc" | None) set per-run by generate.py.
    # Only the Python generator consumes it (to suffix the PyPI package version so
    # dev/qa/main publish to one package as pre-releases); others ignore it.
    prerelease: str | None = None

    def __init__(self):
        self._copied_modules: list[dict] = []

    @abstractmethod
    def generate(self, endpoints: list[dict], output_dir: str, composites: list[dict] | None = None, utilities: list[dict] | None = None, admin: bool = False, schemas: dict | None = None) -> None:
        """Generate SDK files from resolved endpoints into output_dir.

        *utilities* is a list of utility-module dicts (see utilities_resolver.load_utilities);
        each generator decides how to expose them (e.g. as a `utils` namespace on the client).

        *admin* switches the framework to its admin-variant publish manifest
        (private/restricted package name + access). Only the JS generator
        currently varies on this flag; others may accept and ignore it.

        *schemas* is the resolved Pydantic schema map (see resolver.load_schemas),
        used to type response bodies. Only the JS generator consumes it (to emit
        TypeScript declarations); others may accept and ignore it.
        """

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

    def group_composites_by_controller(self, composites: list[dict] | None) -> dict[str, list[dict]]:
        groups: dict[str, list[dict]] = {}
        if not composites:
            return groups
        for comp in composites:
            controller = comp["controller"].replace(" ", "_")
            groups.setdefault(controller, []).append(comp)
        return groups

    # ── expanded request_body helpers ──────────────────────────────────────

    @staticmethod
    def _body_shape(request_body) -> str | None:
        """Classify a resolved request_body.

        Returns one of:
          - None                : no body
          - "scalar"           : {"_shape": "scalar", ...}   (model type not in schemas)
          - "expanded"         : {"_shape": "expanded", ...} (flattened from _model)
          - "flat_dict"        : plain dict of fields (legacy non-_model)
          - "generic"          : truthy non-dict sentinel (legacy opaque body)
        """
        if request_body is None:
            return None
        if isinstance(request_body, dict):
            shape = request_body.get("_shape")
            if shape in ("scalar", "expanded"):
                return shape
            return "flat_dict"
        return "generic"

    @staticmethod
    def _expanded_fields(request_body: dict) -> list[dict]:
        return request_body.get("fields", [])

    @staticmethod
    def _order_expanded_fields(fields: list[dict]) -> list[dict]:
        """Required fields first (declaration order), then optional (declaration order)."""
        required = [f for f in fields if f.get("required")]
        optional = [f for f in fields if not f.get("required")]
        return required + optional

    @staticmethod
    def _group_fields_by_path(fields: list[dict]) -> dict:
        """Build a nested tree keyed by snake-case path for body reassembly.

        Leaves are the field dicts themselves; branches are dicts mapping
        snake key -> subtree. Preserves input field order at each level.
        """
        root: dict = {}
        for f in fields:
            path = f.get("orig_path") or [f["snake"]]
            cursor = root
            for key in path[:-1]:
                if key not in cursor or not isinstance(cursor[key], dict) or "_leaf" in cursor[key]:
                    cursor[key] = {}
                cursor = cursor[key]
            cursor[path[-1]] = {"_leaf": f}
        return root

    @staticmethod
    def snake_to_camel(name: str) -> str:
        return _snake_to_camel(name)

    @staticmethod
    def snake_to_pascal(name: str) -> str:
        return _snake_to_pascal(name)

    @staticmethod
    def header_to_param(name: str) -> str:
        return _header_to_param(name)

    def collect_alt_hosts(self, endpoints: list[dict], composites: list[dict] | None) -> set[str]:
        """Return distinct api_host values across endpoints and composites."""
        hosts: set[str] = set()
        for ep in endpoints:
            if ep.get("api_host"):
                hosts.add(ep["api_host"])
        for comp in (composites or []):
            for step in comp.get("steps", []):
                if step.get("endpoint", {}).get("api_host"):
                    hosts.add(step["endpoint"]["api_host"])
        return hosts

    @abstractmethod
    def _optional_check_expr(self, expr: str) -> str:
        """Return a boolean expression that is true when *expr* is present and non-null.

        Each framework must handle the case where the underlying key/property
        does not exist at all (not just null/undefined).
        """

    @abstractmethod
    def emit_client_class(self, groups: dict, comp_groups: dict, alt_hosts: set[str], output_dir: str, utilities: list[dict] | None = None) -> None:
        """Generate the top-level SDK client class file."""

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
