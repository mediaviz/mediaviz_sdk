import os
from datetime import datetime, timezone

import yaml


def parse_ref(ref: str) -> tuple[str, str]:
    """Parse 'controllers/photos.yaml#endpoint_id' -> (relative_file_path, endpoint_id)."""
    if "#" not in ref:
        raise ValueError(f"Invalid ref (missing '#'): {ref}")
    file_part, endpoint_id = ref.split("#", 1)
    return file_part.strip(), endpoint_id.strip()


def resolve_refs(ref_list_path: str) -> list[dict]:
    """Read ref-list YAML, follow each ref into controller YAMLs, return flattened endpoints."""
    with open(ref_list_path) as f:
        ref_list = yaml.safe_load(f)

    refs = ref_list.get("refs", [])
    base_dir = os.path.dirname(os.path.abspath(ref_list_path))
    controller_cache: dict[str, dict] = {}
    endpoints = []

    for item in refs:
        ref = item["ref"]
        file_part, endpoint_id = parse_ref(ref)

        controller_path = os.path.normpath(os.path.join(base_dir, file_part))
        if controller_path not in controller_cache:
            with open(controller_path) as f:
                controller_cache[controller_path] = yaml.safe_load(f)

        ctrl = controller_cache[controller_path]
        matching = [ep for ep in ctrl["endpoints"] if ep["id"] == endpoint_id]
        if not matching:
            raise ValueError(f"Endpoint '{endpoint_id}' not found in {controller_path}")

        endpoints.append(_flatten(matching[0], ctrl["controller"], ctrl.get("base_path", "")))

    return endpoints


def _flatten(ep: dict, controller: str, base_path: str) -> dict:
    return {
        "id": ep["id"],
        "controller": controller,
        "base_path": base_path,
        "method": ep["method"],
        "path": ep["path"],
        "summary": ep.get("summary"),
        "auth": ep.get("auth"),
        "params": ep.get("params") or [],
        "request_body": ep.get("request_body"),
        "response": ep.get("response"),
        "content_type": ep.get("content_type"),
        "tags": ep.get("tags", []),
        "hidden": ep.get("hidden", False),
    }


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
