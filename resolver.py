from __future__ import annotations

import os
import re
from datetime import datetime, timezone

import yaml

from naming import snake_to_camel
from utilities_resolver import find_utility

# Matches {param_name:converter} in URL paths (e.g. FastAPI's {directory:path})
_PATH_CONVERTER_RE = re.compile(r"\{(\w+):\w+\}")


def _is_utility_ref(file_part: str) -> bool:
    """Refs pointing at api_docs/utilities/<module>.yaml are utility refs."""
    return file_part.startswith("utilities/") and file_part.endswith((".yaml", ".yml"))


def _utility_source_module_from_ref(file_part: str) -> str:
    """Extract source_module from 'utilities/<module>.yaml'."""
    base = os.path.basename(file_part)
    return os.path.splitext(base)[0]

# Matches List[T] / list[t] in schema field types
_LIST_TYPE_RE = re.compile(r"^[Ll]ist\[(.+)\]$")


def load_schemas(schemas_path: str) -> dict:
    """Load api_schemas.yaml and return the `schemas` mapping (name -> schema def)."""
    if not os.path.isfile(schemas_path):
        return {}
    with open(schemas_path) as f:
        data = yaml.safe_load(f) or {}
    return data.get("schemas", {}) or {}


def _resolved_fields(schema_name: str, schemas: dict, _seen: frozenset = frozenset()) -> dict:
    """Return effective fields map for a schema, merging `extends` parent first.

    Returned dict preserves parent-field order; child keys that collide overwrite
    parent entries in place; new child keys are appended last.
    """
    if schema_name in _seen:
        raise ValueError(f"Circular schema extends detected: {schema_name}")
    schema = schemas.get(schema_name)
    if not schema or not isinstance(schema, dict):
        return {}
    fields = {}
    parent = schema.get("extends")
    if parent:
        fields = dict(_resolved_fields(parent, schemas, _seen | {schema_name}))
    for k, v in (schema.get("fields") or {}).items():
        fields[k] = v
    return fields


def _expand_fields_to_list(
    fields_map: dict,
    schemas: dict,
    prefix_parts: tuple[str, ...],
    orig_path_parts: tuple[str, ...],
) -> list[dict]:
    """Flatten a fields map into a list of leaf field descriptors.

    Each leaf carries `name` (camel, prefixed), `snake`, `type`, `required`, `kind`
    (primitive | list | nested_leaf), `orig_path` (list of snake keys from root body),
    and optional `items_type` for list fields.
    """
    out: list[dict] = []
    for field_name, spec in fields_map.items():
        spec = spec or {}
        ftype = spec.get("type", "Any")
        required = bool(spec.get("required", False))
        this_orig = orig_path_parts + (field_name,)
        list_match = _LIST_TYPE_RE.match(str(ftype)) if ftype else None

        if list_match:
            # List field — stays a single array param, never flattened
            items_type = list_match.group(1)
            camel = snake_to_camel("_".join(prefix_parts + (field_name,)))
            out.append({
                "name": camel,
                "snake": field_name,
                "type": ftype,
                "items_type": items_type,
                "required": required,
                "kind": "list",
                "orig_path": list(this_orig),
            })
        elif isinstance(ftype, str) and ftype in schemas:
            # Nested schema — recursively expand, prefixing with this field name
            nested_map = _resolved_fields(ftype, schemas)
            out.extend(_expand_fields_to_list(
                nested_map, schemas,
                prefix_parts + (field_name,),
                this_orig,
            ))
        else:
            # Primitive (or unknown type alias, e.g. EmailStr) — one scalar param
            camel = snake_to_camel("_".join(prefix_parts + (field_name,)))
            out.append({
                "name": camel,
                "snake": field_name,
                "type": ftype,
                "required": required,
                "kind": "primitive",
                "orig_path": list(this_orig),
            })
    return out


def _schema_ref_type(request_body: dict) -> str | None:
    """Extract the schema type name from a request_body ref.

    Supports current convention: `{"$ref": "api_schemas.yaml#TypeName"}`.
    Also supports legacy: `{"_model": {"type": "TypeName"}}`.
    Returns None if the shape is neither.
    """
    if "$ref" in request_body and len(request_body) == 1:
        ref = request_body["$ref"]
        if isinstance(ref, str) and "#" in ref:
            return ref.split("#", 1)[1].lstrip("/").strip() or None
        return None
    if list(request_body.keys()) == ["_model"]:
        model = request_body["_model"] or {}
        return model.get("type")
    return None


def expand_model_body(request_body: dict | None, schemas: dict) -> dict | None:
    """Expand a schema-ref request body into a flat field list (or scalar).

    Accepts `{"$ref": "api_schemas.yaml#TypeName"}` or the legacy
    `{"_model": {"type": "TypeName"}}` form.

    Returns:
      - None if `request_body` is None or not a schema-ref shape.
      - `{"_shape": "scalar", "param_name": str, "type": str}` when the type
        is not defined in `schemas` (e.g. Pydantic aliases like EmailStr).
      - `{"_shape": "expanded", "fields": [...leaf descriptors...]}` otherwise.
    """
    if not isinstance(request_body, dict):
        return None
    model_type = _schema_ref_type(request_body)
    if not model_type:
        return None
    if model_type not in schemas:
        return {
            "_shape": "scalar",
            "param_name": snake_to_camel(model_type[0].lower() + model_type[1:]),
            "type": model_type,
        }
    fields_map = _resolved_fields(model_type, schemas)
    leaves = _expand_fields_to_list(fields_map, schemas, (), ())
    return {"_shape": "expanded", "fields": leaves}


def parse_ref(ref: str) -> tuple[str, str]:
    """Parse 'controllers/photos.yaml#endpoint_id' -> (relative_file_path, endpoint_id)."""
    if "#" not in ref:
        raise ValueError(f"Invalid ref (missing '#'): {ref}")
    file_part, endpoint_id = ref.split("#", 1)
    return file_part.strip(), endpoint_id.strip()


def resolve_refs(
    ref_list_path: str,
    controllers_dir: str | None = None,
    schemas: dict | None = None,
) -> tuple[list[dict], list[str], list[str]]:
    """Read ref-list YAML, follow each ref into controller YAMLs, return flattened endpoints, composite file paths, and warnings.

    Endpoint refs contain '#' (e.g. controllers/photos.yaml#get_photos).
    Composite refs have no '#' (e.g. composites/upload_photos.yaml).
    """
    schemas = schemas or {}
    with open(ref_list_path) as f:
        ref_list = yaml.safe_load(f)

    refs = ref_list.get("refs", [])
    base_dir = os.path.dirname(os.path.abspath(ref_list_path))
    resolve_base = controllers_dir if controllers_dir else base_dir
    controller_cache: dict[str, dict] = {}
    endpoints = []
    composite_paths = []
    warnings: list[str] = []

    for item in refs:
        ref = item["ref"]
        if "#" not in ref:
            composite_paths.append(os.path.normpath(os.path.join(resolve_base, ref)))
            continue

        file_part, endpoint_id = parse_ref(ref)

        controller_path = os.path.normpath(os.path.join(resolve_base, file_part))
        if controller_path not in controller_cache:
            if not os.path.exists(controller_path):
                warnings.append(f"Controller file not found: {controller_path} — skipped")
                controller_cache[controller_path] = None
                continue
            with open(controller_path) as f:
                controller_cache[controller_path] = yaml.safe_load(f)
        if controller_cache[controller_path] is None:
            continue

        ctrl = controller_cache[controller_path]
        matching = [ep for ep in ctrl["endpoints"] if ep["id"] == endpoint_id]
        if not matching:
            warnings.append(f"Endpoint '{endpoint_id}' not found in {controller_path} — skipped")
            continue

        endpoints.append(_flatten(matching[0], ctrl["controller"], ctrl.get("base_path", ""), schemas))

    return endpoints, composite_paths, warnings


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


def _flatten(ep: dict, controller: str, base_path: str, schemas: dict | None = None) -> dict:
    params = list(ep.get("params") or [])
    path, params = _normalize_path(ep["path"], params)
    request_body = ep.get("request_body")
    expanded = expand_model_body(request_body, schemas or {})
    if expanded is not None:
        request_body = expanded
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
        "request_body": request_body,
        "response": ep.get("response"),
        "content_type": ep.get("content_type"),
        "tags": ep.get("tags", []),
        "hidden": ep.get("hidden", False),
        "api_host": ep.get("api_host"),
    }


def _resolve_step(
    step: dict,
    composite_id: str,
    resolve_base: str,
    controller_cache: dict,
    schemas: dict,
    utilities: list[dict] | None,
    warnings: list[str],
) -> dict | None:
    """Resolve one composite step's ``ref`` into either an inlined ``endpoint`` or ``utility``.

    Returns the resolved step dict (with ``ref`` stripped), or ``None`` if the ref
    could not be resolved (warning is appended in that case).
    """
    file_part, ref_id = parse_ref(step["ref"])
    resolved_step = {k: v for k, v in step.items() if k != "ref"}

    cache = resolved_step.get("cache")
    if cache and cache.get("enabled") and "{" not in cache.get("key", ""):
        raise ValueError(
            f"Composite '{composite_id}' step '{step.get('step_id')}' cache key "
            f"must be a template string with {{...}} placeholders (got: {cache.get('key')!r})"
        )

    if _is_utility_ref(file_part):
        source_module = _utility_source_module_from_ref(file_part)
        util = find_utility(utilities, source_module, ref_id)
        if util is None:
            warnings.append(
                f"Composite '{composite_id}' step utility '{ref_id}' not found in "
                f"utilities/{source_module}.yaml — skipped"
            )
            return None
        resolved_step["utility"] = util
        return resolved_step

    controller_path = os.path.normpath(os.path.join(resolve_base, file_part))
    if controller_path not in controller_cache:
        if not os.path.exists(controller_path):
            warnings.append(f"Controller file not found: {controller_path} — skipped")
            controller_cache[controller_path] = None
            return None
        with open(controller_path) as f:
            controller_cache[controller_path] = yaml.safe_load(f)
    if controller_cache[controller_path] is None:
        return None
    ctrl = controller_cache[controller_path]
    matching = [ep for ep in ctrl["endpoints"] if ep["id"] == ref_id]
    if not matching:
        warnings.append(
            f"Composite '{composite_id}' step endpoint '{ref_id}' not found in "
            f"{controller_path} — skipped"
        )
        return None
    flat_ep = _flatten(matching[0], ctrl["controller"], ctrl.get("base_path", ""), schemas)
    resolved_step["endpoint"] = flat_ep
    return resolved_step


def resolve_composites(
    composites_path: str,
    controllers_dir: str | None = None,
    schemas: dict | None = None,
    utilities: list[dict] | None = None,
) -> tuple[list[dict], list[str]]:
    """Read composites ref-list YAML, resolve each step's ref, return composites with embedded endpoints/utilities and warnings."""
    schemas = schemas or {}
    with open(composites_path) as f:
        ref_list = yaml.safe_load(f)

    composites_list = ref_list.get("composites", [])
    base_dir = os.path.dirname(os.path.abspath(composites_path))
    resolve_base = controllers_dir if controllers_dir else base_dir
    controller_cache: dict[str, dict] = {}
    result = []
    warnings: list[str] = []

    for item in composites_list:
        composite_file = os.path.normpath(os.path.join(resolve_base, item["ref"]))
        if not os.path.exists(composite_file):
            warnings.append(f"Composite file not found: {composite_file} — skipped")
            continue
        with open(composite_file) as f:
            composite = yaml.safe_load(f)

        resolved_steps = []
        for step in composite["steps"]:
            rs = _resolve_step(
                step, composite["id"], resolve_base, controller_cache, schemas, utilities, warnings,
            )
            if rs is not None:
                resolved_steps.append(rs)

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

    return result, warnings


def resolve_composite_files(
    composite_paths: list[str],
    controllers_dir: str | None = None,
    schemas: dict | None = None,
    utilities: list[dict] | None = None,
) -> tuple[list[dict], list[str]]:
    """Resolve individual composite YAML files (not a ref-list). Each path points directly to a composite definition and warnings."""
    schemas = schemas or {}
    controller_cache: dict[str, dict] = {}
    result = []
    warnings: list[str] = []

    for comp_path in composite_paths:
        abs_path = os.path.abspath(comp_path)
        resolve_base = controllers_dir if controllers_dir else os.path.dirname(abs_path)

        if not os.path.exists(abs_path):
            warnings.append(f"Composite file not found: {abs_path} — skipped")
            continue
        with open(abs_path) as f:
            composite = yaml.safe_load(f)

        resolved_steps = []
        for step in composite["steps"]:
            rs = _resolve_step(
                step, composite["id"], resolve_base, controller_cache, schemas, utilities, warnings,
            )
            if rs is not None:
                resolved_steps.append(rs)

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

    return result, warnings


def validate_composite_endpoints(composites: list[dict], endpoints: list[dict]) -> None:
    """Verify composite endpoint steps are wired to real, fully-declared endpoints.

    Two checks, both fail-fast:
      1. every endpoint step references an endpoint in the resolved list, and
      2. every ``input_map`` key matches a param or request_body field the endpoint
         actually declares — generators build calls strictly from declared params,
         so an unmatched key is silently dropped (the upload-template bug class).

    Utility steps are auto-included from ``api_docs/utilities/`` and skip both checks.
    """
    endpoint_ids = {ep["id"] for ep in endpoints}
    missing = []
    unmapped = []
    for comp in composites:
        for step in comp["steps"]:
            if "utility" in step:
                continue
            ep = step["endpoint"]
            if ep["id"] not in endpoint_ids:
                missing.append(f"  composite '{comp['id']}' step '{step['step_id']}' requires endpoint '{ep['id']}'")
                continue
            allowed = _declared_input_keys(ep)
            if allowed is None:  # opaque body — field names unknown, can't validate
                continue
            for key in step.get("input_map", {}):
                if key not in allowed:
                    unmapped.append(
                        f"  composite '{comp['id']}' step '{step['step_id']}' input_map key "
                        f"'{key}' matches no param or body field on endpoint '{ep['id']}' (would be silently dropped)"
                    )

    errors = []
    if missing:
        errors.append("Composite steps reference endpoints not in the provided endpoint list:\n" + "\n".join(missing))
    if unmapped:
        errors.append("Composite input_map keys do not match any endpoint param or body field:\n" + "\n".join(unmapped))
    if errors:
        raise ValueError("\n\n".join(errors))


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


def _declared_input_keys(ep: dict) -> set[str] | None:
    """Input_map keys an endpoint can consume: declared param names + body fields.

    Returns ``None`` when the request_body is an opaque/generic shape whose fields
    can't be enumerated, signalling the caller to skip key validation for that step.
    """
    keys = {p["name"] for p in ep.get("params", [])}
    body = ep.get("request_body")
    if body is None:
        return keys
    if not isinstance(body, dict):
        return None  # generic opaque body — field names not enumerable
    shape = body.get("_shape")
    if shape == "scalar":
        keys.add(body.get("param_name"))
    elif shape == "expanded":
        keys.update(f["name"] for f in body.get("fields", []))
    else:  # flat_dict
        keys.update(k for k in body if k != "_shape")
    return keys
