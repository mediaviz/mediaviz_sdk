from __future__ import annotations

import os
from datetime import datetime, timezone

import yaml

_REQUIRED_UTILITY_FIELDS = ("id", "target", "function_name", "params")
_FRAMEWORKS = ("javascript", "php", "python")


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
    utilities = data.get("utilities") or []
    if not isinstance(utilities, list):
        raise ValueError(f"{path}: 'utilities' must be a list")
    for util in utilities:
        _validate_utility(util, path)
    return {"source_module": source_module, "utilities": utilities}


def _validate_utility(util: dict, path: str) -> None:
    if not isinstance(util, dict):
        raise ValueError(f"{path}: each utility must be a mapping")
    missing = [f for f in _REQUIRED_UTILITY_FIELDS if f not in util]
    if missing:
        raise ValueError(f"{path}: utility '{util.get('id', '?')}' missing fields: {missing}")
    for key in ("target", "function_name"):
        value = util[key]
        if not isinstance(value, dict):
            raise ValueError(
                f"{path}: utility '{util['id']}' field '{key}' must map frameworks to names"
            )
        for fw in _FRAMEWORKS:
            if fw not in value:
                raise ValueError(
                    f"{path}: utility '{util['id']}' missing {key}.{fw}"
                )
    if not isinstance(util["params"], list):
        raise ValueError(f"{path}: utility '{util['id']}' 'params' must be a list")
    for p in util["params"]:
        if not isinstance(p, dict) or "name" not in p or "type" not in p:
            raise ValueError(
                f"{path}: utility '{util['id']}' param must have 'name' and 'type': {p!r}"
            )


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
