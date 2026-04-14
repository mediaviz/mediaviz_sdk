from __future__ import annotations

import os
import re
from datetime import datetime, timezone

import yaml

# Matches {param_name:converter} in URL paths (e.g. FastAPI's {directory:path})
_PATH_CONVERTER_RE = re.compile(r"\{(\w+):\w+\}")


def parse_ref(ref: str) -> tuple[str, str]:
    """Parse 'controllers/photos.yaml#endpoint_id' -> (relative_file_path, endpoint_id)."""
    if "#" not in ref:
        raise ValueError(f"Invalid ref (missing '#'): {ref}")
    file_part, endpoint_id = ref.split("#", 1)
    return file_part.strip(), endpoint_id.strip()


def resolve_refs(ref_list_path: str, controllers_dir: str | None = None) -> tuple[list[dict], list[str]]:
    """Read ref-list YAML, follow each ref into controller YAMLs, return flattened endpoints and composite file paths.

    Endpoint refs contain '#' (e.g. controllers/photos.yaml#get_photos).
    Composite refs have no '#' (e.g. composites/upload_photos.yaml).
    """
    with open(ref_list_path) as f:
        ref_list = yaml.safe_load(f)

    refs = ref_list.get("refs", [])
    base_dir = os.path.dirname(os.path.abspath(ref_list_path))
    resolve_base = controllers_dir if controllers_dir else base_dir
    controller_cache: dict[str, dict] = {}
    endpoints = []
    composite_paths = []

    for item in refs:
        ref = item["ref"]
        if "#" not in ref:
            composite_paths.append(os.path.normpath(os.path.join(resolve_base, ref)))
            continue

        file_part, endpoint_id = parse_ref(ref)

        controller_path = os.path.normpath(os.path.join(resolve_base, file_part))
        if controller_path not in controller_cache:
            with open(controller_path) as f:
                controller_cache[controller_path] = yaml.safe_load(f)

        ctrl = controller_cache[controller_path]
        matching = [ep for ep in ctrl["endpoints"] if ep["id"] == endpoint_id]
        if not matching:
            raise ValueError(f"Endpoint '{endpoint_id}' not found in {controller_path}")

        endpoints.append(_flatten(matching[0], ctrl["controller"], ctrl.get("base_path", "")))

    return endpoints, composite_paths


def _normalize_path(path: str, params: list[dict]) -> tuple[str, list[dict]]:
    """Strip type converters from path placeholders and promote misclassified params to path."""
    path_param_names = {m.group(1) for m in _PATH_CONVERTER_RE.finditer(path)}
    if not path_param_names:
        return path, params
    normalized = _PATH_CONVERTER_RE.sub(r"{\1}", path)
    for p in params:
        if p["name"] in path_param_names and p.get("in") != "path":
            p = {**p, "in": "path", "required": True}
    # rebuild list with promotions applied
    params = [
        {**p, "in": "path", "required": True} if p["name"] in path_param_names and p.get("in") != "path" else p
        for p in params
    ]
    # add missing path params not declared in params list
    declared = {p["name"] for p in params}
    for name in sorted(path_param_names - declared):
        params.append({"name": name, "in": "path", "type": "str", "required": True})
    return normalized, params


def _flatten(ep: dict, controller: str, base_path: str) -> dict:
    params = list(ep.get("params") or [])
    path, params = _normalize_path(ep["path"], params)
    return {
        "id": ep["id"],
        "function_name": ep.get("function_name", ep["id"]),
        "controller": controller,
        "base_path": base_path,
        "method": ep["method"],
        "path": path,
        "summary": ep.get("summary"),
        "auth": ep.get("auth"),
        "params": params,
        "request_body": ep.get("request_body"),
        "response": ep.get("response"),
        "content_type": ep.get("content_type"),
        "tags": ep.get("tags", []),
        "hidden": ep.get("hidden", False),
        "api_host": ep.get("api_host"),
    }


def resolve_composites(composites_path: str, controllers_dir: str | None = None) -> list[dict]:
    """Read composites ref-list YAML, resolve each step's endpoint ref, return composites with embedded endpoints."""
    with open(composites_path) as f:
        ref_list = yaml.safe_load(f)

    composites_list = ref_list.get("composites", [])
    base_dir = os.path.dirname(os.path.abspath(composites_path))
    resolve_base = controllers_dir if controllers_dir else base_dir
    controller_cache: dict[str, dict] = {}
    result = []

    for item in composites_list:
        composite_file = os.path.normpath(os.path.join(resolve_base, item["ref"]))
        with open(composite_file) as f:
            composite = yaml.safe_load(f)

        resolved_steps = []
        for step in composite["steps"]:
            file_part, endpoint_id = parse_ref(step["ref"])
            controller_path = os.path.normpath(os.path.join(resolve_base, file_part))
            if controller_path not in controller_cache:
                with open(controller_path) as f:
                    controller_cache[controller_path] = yaml.safe_load(f)
            ctrl = controller_cache[controller_path]
            matching = [ep for ep in ctrl["endpoints"] if ep["id"] == endpoint_id]
            if not matching:
                raise ValueError(f"Endpoint '{endpoint_id}' not found in {controller_path}")
            flat_ep = _flatten(matching[0], ctrl["controller"], ctrl.get("base_path", ""))
            resolved_step = {k: v for k, v in step.items() if k != "ref"}
            resolved_step["endpoint"] = flat_ep
            resolved_steps.append(resolved_step)

        result.append({
            "id": composite["id"],
            "function_name": composite["function_name"],
            "summary": composite.get("summary"),
            "controller": composite["controller"],
            "auth": composite.get("auth", "required"),
            "params": composite.get("params", []),
            "steps": resolved_steps,
            "returns": composite.get("returns"),
        })

    return result


def resolve_composite_files(composite_paths: list[str], controllers_dir: str | None = None) -> list[dict]:
    """Resolve individual composite YAML files (not a ref-list). Each path points directly to a composite definition."""
    controller_cache: dict[str, dict] = {}
    result = []

    for comp_path in composite_paths:
        abs_path = os.path.abspath(comp_path)
        resolve_base = controllers_dir if controllers_dir else os.path.dirname(abs_path)

        with open(abs_path) as f:
            composite = yaml.safe_load(f)

        resolved_steps = []
        for step in composite["steps"]:
            file_part, endpoint_id = parse_ref(step["ref"])
            controller_path = os.path.normpath(os.path.join(resolve_base, file_part))
            if controller_path not in controller_cache:
                with open(controller_path) as f:
                    controller_cache[controller_path] = yaml.safe_load(f)
            ctrl = controller_cache[controller_path]
            matching = [ep for ep in ctrl["endpoints"] if ep["id"] == endpoint_id]
            if not matching:
                raise ValueError(f"Endpoint '{endpoint_id}' not found in {controller_path}")
            flat_ep = _flatten(matching[0], ctrl["controller"], ctrl.get("base_path", ""))
            resolved_step = {k: v for k, v in step.items() if k != "ref"}
            resolved_step["endpoint"] = flat_ep
            resolved_steps.append(resolved_step)

        result.append({
            "id": composite["id"],
            "function_name": composite["function_name"],
            "summary": composite.get("summary"),
            "controller": composite["controller"],
            "auth": composite.get("auth", "required"),
            "params": composite.get("params", []),
            "steps": resolved_steps,
            "returns": composite.get("returns"),
        })

    return result


def validate_composite_endpoints(composites: list[dict], endpoints: list[dict]) -> None:
    """Verify every composite step endpoint exists in the resolved endpoints list. Raises ValueError if not."""
    endpoint_ids = {ep["id"] for ep in endpoints}
    missing = []
    for comp in composites:
        for step in comp["steps"]:
            ep_id = step["endpoint"]["id"]
            if ep_id not in endpoint_ids:
                missing.append(f"  composite '{comp['id']}' step '{step['step_id']}' requires endpoint '{ep_id}'")
    if missing:
        raise ValueError(
            "Composite steps reference endpoints not in the provided endpoint list:\n" + "\n".join(missing)
        )


def write_flattened_yaml(
    endpoints: list[dict],
    ref_list_path: str,
    version_dir: str,
) -> str:
    """Write flattened YAML snapshot into the version directory."""
    source_name = os.path.basename(ref_list_path)
    os.makedirs(version_dir, exist_ok=True)

    out_path = os.path.join(version_dir, f"resolved_{source_name}")
    data = {
        "source": source_name,
        "resolved_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "endpoints": endpoints,
    }
    with open(out_path, "w") as f:
        yaml.dump(data, f, default_flow_style=False, allow_unicode=True, sort_keys=False)

    return out_path


def write_flattened_composites_yaml(
    composites: list[dict],
    composites_path: str,
    version_dir: str,
) -> str:
    """Write resolved composites YAML snapshot into the version directory."""
    source_name = os.path.basename(composites_path)
    os.makedirs(version_dir, exist_ok=True)

    out_path = os.path.join(version_dir, f"resolved_{source_name}")
    data = {
        "source": source_name,
        "resolved_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "composites": composites,
    }
    with open(out_path, "w") as f:
        yaml.dump(data, f, default_flow_style=False, allow_unicode=True, sort_keys=False)

    return out_path
