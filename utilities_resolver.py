from __future__ import annotations

import os
from datetime import datetime, timezone

import yaml

_FRAMEWORKS = ("javascript", "php", "python")
_BASE_REQUIRED_FIELDS = ("id", "function_name", "params")


def load_utilities(utilities_dir: str) -> list[dict]:
    """Load all utility module YAMLs from *utilities_dir*.

    Returns a list of module dicts: ``[{"source_module": str, "utilities": [...]}, ...]``.
    Raises ValueError on malformed entries so generation fails fast.
    """
    if not os.path.isdir(utilities_dir):
        return []
    modules: list[dict] = []
    for fname in sorted(os.listdir(utilities_dir)):
        if not fname.endswith((".yaml", ".yml")):
            continue
        path = os.path.join(utilities_dir, fname)
        with open(path) as f:
            data = yaml.safe_load(f) or {}
        module = _validate_module(data, path)
        modules.append(module)
    return modules


def _validate_module(data: dict, path: str) -> dict:
    if not isinstance(data, dict):
        raise ValueError(f"{path}: expected mapping at top level")
    source_module = data.get("source_module")
    if not source_module:
        raise ValueError(f"{path}: missing 'source_module'")
    expected = os.path.splitext(os.path.basename(path))[0]
    if source_module != expected:
        raise ValueError(
            f"{path}: source_module '{source_module}' must match filename '{expected}'. "
            f"Composite utility refs (utilities/<file>.yaml#<id>) derive the source_module from the filename, "
            f"so a mismatch would make this module unreachable from composite steps."
        )
    utilities = data.get("utilities") or []
    if not isinstance(utilities, list):
        raise ValueError(f"{path}: 'utilities' must be a list")
    yaml_dir = os.path.dirname(path)
    resolved_utils: list[dict] = []
    for util in utilities:
        resolved_utils.append(_validate_utility(util, path, yaml_dir))
    return {"source_module": source_module, "utilities": resolved_utils}


def _validate_utility(util: dict, path: str, yaml_dir: str) -> dict:
    if not isinstance(util, dict):
        raise ValueError(f"{path}: each utility must be a mapping")
    missing = [f for f in _BASE_REQUIRED_FIELDS if f not in util]
    if missing:
        raise ValueError(f"{path}: utility '{util.get('id', '?')}' missing fields: {missing}")

    has_target = "target" in util
    has_snippets = "snippets" in util
    if has_target == has_snippets:
        raise ValueError(
            f"{path}: utility '{util['id']}' must have exactly one of 'target' or 'snippets'"
        )

    _validate_framework_map(util, "function_name", path)
    if has_target:
        _validate_framework_map(util, "target", path)
    else:
        _validate_and_load_snippets(util, path, yaml_dir)

    _validate_optional_imports(util, path)
    _validate_optional_async(util, path)

    if not isinstance(util["params"], list):
        raise ValueError(f"{path}: utility '{util['id']}' 'params' must be a list")
    for p in util["params"]:
        if not isinstance(p, dict) or "name" not in p or "type" not in p:
            raise ValueError(
                f"{path}: utility '{util['id']}' param must have 'name' and 'type': {p!r}"
            )
    return util


def _validate_framework_map(util: dict, key: str, path: str) -> None:
    value = util[key]
    if not isinstance(value, dict):
        raise ValueError(
            f"{path}: utility '{util['id']}' field '{key}' must map frameworks to names"
        )
    for fw in _FRAMEWORKS:
        if fw not in value:
            raise ValueError(f"{path}: utility '{util['id']}' missing {key}.{fw}")


def _validate_and_load_snippets(util: dict, path: str, yaml_dir: str) -> None:
    """Validate ``snippets`` paths and load each file's body into ``snippet_body``.

    Replaces the relative path strings with the loaded source. Embedding the
    bodies makes ``resolved_utilities.yaml`` self-contained and lets generators
    consume the same dict shape they get for ``target``-form utilities.
    """
    snippets = util["snippets"]
    if not isinstance(snippets, dict):
        raise ValueError(
            f"{path}: utility '{util['id']}' 'snippets' must map frameworks to file paths"
        )
    body: dict[str, str] = {}
    for fw in _FRAMEWORKS:
        rel = snippets.get(fw)
        if not rel or not isinstance(rel, str):
            raise ValueError(f"{path}: utility '{util['id']}' missing snippets.{fw}")
        abs_path = rel if os.path.isabs(rel) else os.path.join(yaml_dir, rel)
        if not os.path.isfile(abs_path):
            raise ValueError(
                f"{path}: utility '{util['id']}' snippets.{fw} not found: {abs_path}"
            )
        with open(abs_path) as f:
            body[fw] = f.read().rstrip("\n")
    util["snippet_body"] = body


def _validate_optional_imports(util: dict, path: str) -> None:
    imports = util.get("imports")
    if imports is None:
        return
    if not isinstance(imports, dict):
        raise ValueError(
            f"{path}: utility '{util['id']}' 'imports' must map frameworks to lists of statements"
        )
    for fw, items in imports.items():
        if fw not in _FRAMEWORKS:
            raise ValueError(
                f"{path}: utility '{util['id']}' imports.{fw} unknown framework"
            )
        if not isinstance(items, list) or not all(isinstance(i, str) for i in items):
            raise ValueError(
                f"{path}: utility '{util['id']}' imports.{fw} must be a list of strings"
            )


def _validate_optional_async(util: dict, path: str) -> None:
    flag = util.get("async")
    if flag is None:
        return
    if not isinstance(flag, dict):
        raise ValueError(
            f"{path}: utility '{util['id']}' 'async' must map frameworks to booleans"
        )
    for fw, val in flag.items():
        if fw not in _FRAMEWORKS:
            raise ValueError(f"{path}: utility '{util['id']}' async.{fw} unknown framework")
        if not isinstance(val, bool):
            raise ValueError(f"{path}: utility '{util['id']}' async.{fw} must be boolean")


def write_flattened_utilities_yaml(modules: list[dict], version_dir: str) -> str:
    """Write a snapshot of resolved utilities alongside the generated SDK."""
    os.makedirs(version_dir, exist_ok=True)
    out_path = os.path.join(version_dir, "resolved_utilities.yaml")
    data = {
        "resolved_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "modules": modules,
    }
    with open(out_path, "w") as f:
        yaml.safe_dump(data, f, sort_keys=False)
    return out_path


def collect_framework_imports(modules: list[dict], framework: str) -> list[str]:
    """Return a deduplicated list of import statements for *framework* across all utilities."""
    seen: set[str] = set()
    out: list[str] = []
    for module in modules or []:
        for util in module.get("utilities", []):
            for stmt in (util.get("imports") or {}).get(framework, []) or []:
                if stmt not in seen:
                    seen.add(stmt)
                    out.append(stmt)
    return out


def indent_body(body: str, indent: str) -> list[str]:
    """Re-indent each line of *body*; empty lines stay empty (no trailing spaces)."""
    return [(indent + line) if line.strip() else "" for line in body.splitlines()]


def find_utility(modules: list[dict] | None, source_module: str, util_id: str) -> dict | None:
    """Return the utility dict matching ``(source_module, util_id)`` or ``None``."""
    for module in modules or []:
        if module.get("source_module") != source_module:
            continue
        for util in module.get("utilities", []):
            if util.get("id") == util_id:
                return util
    return None
