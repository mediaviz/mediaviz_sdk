"""Emit a single consolidated TypeScript declaration file (`dist/sdk.d.ts`) for
the generated JavaScript SDK.

The published package ships one Rollup bundle, so the types describe one flat
module surface: error classes, response-schema interfaces, one class per
controller, and the top-level `MediaViz` client. Signatures are built from the
same endpoint metadata the JS emitters use and must track the JS argument order
in lockstep (see `JavaScriptBrowserGenerator._emit_auth_method` /
`_emit_alt_host_method` / `_js_body_sig_tokens`). Request params are camelCase
(as the JS signature emits them); response interface members stay snake_case
(the SDK returns the server's raw JSON untouched).

Output is deterministic (sorted interfaces + controllers) so it does not perturb
the CI content-hash publish gate beyond the one-time addition of the file.
"""
from __future__ import annotations

import re

from naming import header_to_param, snake_to_camel
from resolver import _resolved_fields
from .javascript_browser import _js_safe

_WRAP_RE = re.compile(r"^(?:Optional|Annotated)\[(.+)\]$")
_LIST_RE = re.compile(r"^List\[(.*)\]$")
_DICT_RE = re.compile(r"^Dict\[.*\]$", re.IGNORECASE)
_IDENT_RE = re.compile(r"^[A-Za-z_$][\w$]*$")


def build_dts(gen, endpoints, composites, utilities, schemas, *, admin: bool = False) -> str:
    """Return the full `sdk.d.ts` source for the given resolved inputs.

    *gen* is the JavaScriptBrowserGenerator instance — reused for its naming and
    body-classification helpers so the declarations never drift from the JS.
    """
    schemas = schemas or {}
    queue: set[str] = set()  # schema names referenced by a typed surface → need an interface

    groups = gen.group_by_controller(endpoints)
    comp_groups = gen.group_composites_by_controller(composites)

    # Build controller class bodies first; this populates `queue` with every
    # schema reachable from a response type.
    controller_blocks: list[str] = []
    for controller in sorted(set(groups) | set(comp_groups)):
        controller_blocks.append(
            _controller_class(gen, controller, groups.get(controller, []), comp_groups.get(controller, []), schemas, queue)
        )

    util_iface = _utils_interface(gen, utilities, schemas, queue)

    interfaces = _emit_schema_interfaces(queue, schemas)

    parts: list[str] = [
        "// Auto-generated — do not edit. TypeScript declarations for the MediaViz SDK.",
        "",
        _config_and_oauth_block(),
        _errors_block(),
    ]
    if interfaces:
        parts.append("// ── response schemas ──")
        parts.append(interfaces)
    parts.extend(controller_blocks)
    if util_iface:
        parts.append(util_iface)
    parts.append(_mediaviz_class(gen, groups, comp_groups, utilities))
    return "\n".join(p for p in parts if p) + "\n"


# ── controller + method signatures ──────────────────────────────────────────

def _controller_class(gen, controller: str, eps: list[dict], comps: list[dict], schemas: dict, queue: set[str]) -> str:
    class_name = gen.snake_to_pascal(controller)
    lines = [f"export class {class_name} {{"]
    for ep in eps:
        lines.append(f"  {_method_sig(gen, ep, schemas, queue)}")
    for comp in comps:
        lines.append(f"  {_composite_sig(gen, comp, schemas, queue)}")
    lines.append("}")
    lines.append("")
    return "\n".join(lines)


def _method_sig(gen, ep: dict, schemas: dict, queue: set[str]) -> str:
    func_name = gen.snake_to_camel(ep["function_name"])
    path_params = [p for p in ep["params"] if p["in"] == "path"]
    query_params = [p for p in ep["params"] if p["in"] == "query"]
    header_params = [p for p in ep["params"] if p["in"] == "header"]
    request_body = ep.get("request_body")

    params: list[str] = []
    # 1. path params (required, positional) — mirror JS: plain camelCase
    for p in path_params:
        params.append(f"{snake_to_camel(p['name'])}: {_py_to_ts(p.get('type'), schemas, queue)}")
    # 2. alt-host required headers (required, positional)
    if ep.get("api_host"):
        for p in header_params:
            if p.get("required"):
                params.append(f"{header_to_param(p['name'])}: {_py_to_ts(p.get('type'), schemas, queue)}")
    # 3. body params
    params.extend(_body_params(gen, request_body, schemas, queue))
    # 4. alt-host optional-header options bag
    if ep.get("api_host"):
        opt_headers = [p for p in header_params if not p.get("required")]
        if opt_headers:
            members = ", ".join(f"{_member_key(header_to_param(p['name']))}?: {_py_to_ts(p.get('type'), schemas, queue)}" for p in opt_headers)
            params.append("headerOptions?: { " + members + " }")
    # 5. query options bag (values accept scalar or array)
    if query_params:
        members = ", ".join(f"{_member_key(snake_to_camel(p['name']))}?: {_query_ts(p.get('type'), schemas, queue)}" for p in query_params)
        params.append("options?: { " + members + " }")

    return f"{func_name}({', '.join(params)}): Promise<{_response_ts(ep, schemas, queue)}>;"


def _composite_sig(gen, comp: dict, schemas: dict, queue: set[str]) -> str:
    func_name = gen.snake_to_camel(comp["function_name"])
    params = ", ".join(
        f"{_js_safe(gen.snake_to_camel(p['name']))}: {_py_to_ts(p.get('type'), schemas, queue)}"
        for p in comp.get("params", [])
    )
    # Composite return types depend on cross-step dataflow and are not inferred.
    steps = comp.get("steps", [])
    if steps and steps[-1].get("on_error") == "collect":
        ret = "{ results: any[]; errors: Array<{ index: number; error: any }> }"
    else:
        ret = "any"
    return f"{func_name}({params}): Promise<{ret}>;"


def _body_params(gen, request_body, schemas: dict, queue: set[str]) -> list[str]:
    """TS params for a request body — mirrors `_js_body_sig_tokens`."""
    shape = gen._body_shape(request_body)
    if shape is None:
        return []
    if shape == "scalar":
        return [f"{_js_safe(request_body['param_name'])}: {_py_to_ts(request_body.get('type'), schemas, queue)}"]
    if shape == "expanded":
        ordered = gen._order_expanded_fields(gen._expanded_fields(request_body))
        if ordered and not any(f.get("required") for f in ordered):
            members = ", ".join(f"{_member_key(f['name'])}?: {_py_to_ts(f.get('type'), schemas, queue)}" for f in ordered)
            return ["body?: { " + members + " }"]
        out = []
        for f in ordered:
            opt = "" if f.get("required") else "?"
            out.append(f"{_js_safe(f['name'])}{opt}: {_py_to_ts(f.get('type'), schemas, queue)}")
        return out
    if shape == "flat_dict":
        members = []
        for key, spec in request_body.items():
            spec = spec or {}
            opt = "" if spec.get("required") else "?"
            members.append(f"{_member_key(snake_to_camel(key))}{opt}: {_py_to_ts(spec.get('type'), schemas, queue)}")
        return ["body: { " + ", ".join(members) + " }"]
    if shape == "generic":
        return ["body?: Record<string, any>"]
    return []


def _response_ts(ep: dict, schemas: dict, queue: set[str]) -> str:
    body = (ep.get("response") or {}).get("body")
    if body is None:
        return "any"
    if isinstance(body, dict):
        ref = body.get("$ref")
        if ref and "#" in ref:
            name = ref.split("#", 1)[1].lstrip("/").strip()
            base = name if name in schemas else None
            if base:
                queue.add(base)
            ts = base or "any"
            if str(body.get("type", "")).startswith("List["):
                return f"{ts}[]"
            return ts
        return "Record<string, any>"
    return _py_to_ts(str(body), schemas, queue)


# ── schema interfaces (transitive closure) ──────────────────────────────────

def _emit_schema_interfaces(queue: set[str], schemas: dict) -> str:
    emitted: dict[str, str] = {}
    pending = set(queue)
    while pending:
        name = pending.pop()
        if name in emitted or name not in schemas:
            continue
        fields = _resolved_fields(name, schemas)
        lines = [f"export interface {name} {{"]
        for fname, spec in fields.items():
            spec = spec or {}
            ts = _py_to_ts(spec.get("type"), schemas, pending)
            opt = "" if spec.get("required") else "?"
            lines.append(f"  {_member_key(fname)}{opt}: {ts};")
        lines.append("}")
        emitted[name] = "\n".join(lines)
        # _py_to_ts may have queued freshly-referenced schemas into `pending`.
    return "\n\n".join(emitted[n] for n in sorted(emitted)) + ("\n" if emitted else "")


# ── fixed declaration blocks ─────────────────────────────────────────────────

def _config_and_oauth_block() -> str:
    return (
        "export interface TokenResponse {\n"
        "  access_token: string;\n"
        "  token_type: string;\n"
        "  expires_in: number;\n"
        "  refresh_token: string;\n"
        "}\n\n"
        "export interface AuthorizationUrlResult {\n"
        "  url: string;\n"
        "  state: string;\n"
        "  code_verifier: string;\n"
        "}\n\n"
        "export interface MediaVizConfig {\n"
        "  clientId?: string;\n"
        "  clientSecret?: string;\n"
        "  baseUrl?: string;\n"
        "  redirectUri?: string;\n"
        "  hosts?: Record<string, string>;\n"
        "  accessToken?: string;\n"
        "  refreshToken?: string;\n"
        "  onTokenRefresh?: (tokens: TokenResponse) => void;\n"
        "}\n\n"
        "export class OAuthClient {\n"
        "  constructor(config: { baseUrl?: string; clientId?: string; clientSecret?: string; redirectUri?: string });\n"
        "}\n\n"
        "export class OAuthError extends Error {\n"
        "  code: string;\n"
        "}\n\n"
        "export const OAuthErrorCode: { [key: string]: string };\n"
    )


def _errors_block() -> str:
    return (
        "export class ApiError extends Error {\n"
        "  status: number;\n"
        "  requestId: string | null;\n"
        "  body: any;\n"
        "  constructor(message: string, status: number, requestId: string | null, body: any);\n"
        "}\n\n"
        "export class ValidationError extends ApiError {\n"
        "  fieldErrors: Array<{ loc: (string | number)[]; msg: string; type: string }>;\n"
        "  constructor(body: any, status: number, requestId: string | null);\n"
        "}\n\n"
        "export class NotFoundError extends ApiError {\n"
        "  constructor(body: any, status: number, requestId: string | null);\n"
        "}\n\n"
        "export class RateLimitError extends ApiError {\n"
        "  retryAfter: number | null;\n"
        "  constructor(body: any, status: number, requestId: string | null, headers: Headers);\n"
        "}\n\n"
        "export class ServerError extends ApiError {\n"
        "  constructor(body: any, status: number, requestId: string | null);\n"
        "}\n\n"
        "export function handleResponse(response: Response): Promise<any>;\n"
    )


def _utils_interface(gen, utilities, schemas: dict, queue: set[str]) -> str | None:
    if not gen._has_utilities(utilities):
        return None
    methods = []
    for module in utilities:
        for util in module.get("utilities", []):
            fn = util["function_name"]["javascript"]
            params = ", ".join(
                f"{_js_safe(snake_to_camel(p['name']))}: {_py_to_ts(p.get('type'), schemas, queue)}"
                for p in util.get("params", [])
            )
            ret = "Promise<any>" if (util.get("async") or {}).get("javascript") else "any"
            methods.append(f"  {fn}({params}): {ret};")
    return "export interface MediaVizUtils {\n" + "\n".join(methods) + "\n}\n"


def _mediaviz_class(gen, groups: dict, comp_groups: dict, utilities) -> str:
    lines = [
        "export class MediaViz {",
        "  constructor(config?: MediaVizConfig);",
        "  authenticate(): Promise<TokenResponse>;",
        "  getAuthorizationUrl(state?: string): Promise<AuthorizationUrlResult>;",
        "  handleCallback(code: string, codeVerifier: string): Promise<TokenResponse>;",
        "  setTokens(accessToken: string, refreshToken: string): void;",
        "  readonly accessToken: string | null;",
        "  readonly refreshToken: string | null;",
    ]
    for controller in sorted(set(groups) | set(comp_groups)):
        prop = gen._to_prop_name(controller)
        cls = gen.snake_to_pascal(controller)
        lines.append(f"  readonly {prop}: {cls};")
    if gen._has_utilities(utilities):
        lines.append("  readonly utils: MediaVizUtils;")
    lines.append("}")
    lines.append("")
    return "\n".join(lines)


# ── helpers ──────────────────────────────────────────────────────────────────

def _py_to_ts(t, schemas: dict, queue: set[str]) -> str:
    """Map a resolved Python/OpenAPI type string to a TypeScript type.

    Unknown types fall back to `any`. Schema-named types are returned verbatim
    and queued for interface emission.
    """
    if not t:
        return "any"
    t = str(t).strip()
    low = t.lower()
    if low in ("null", "none", "any"):
        return "any"
    wrap = _WRAP_RE.match(t)
    if wrap:
        return _py_to_ts(wrap.group(1), schemas, queue)
    lst = _LIST_RE.match(t)
    if lst:
        inner = lst.group(1).strip()
        return f"{_py_to_ts(inner, schemas, queue)}[]" if inner else "any[]"
    if _DICT_RE.match(t) or low in ("dict", "object"):
        return "Record<string, any>"
    if low == "array":
        return "any[]"
    if low.startswith("string"):  # "string", "string (email)", "string (bool)", …
        return "string"
    if low in ("str", "emailstr", "datetime", "date", "uuid", "bytes"):
        return "string"
    if low in ("int", "integer", "float", "number"):
        return "number"
    if low in ("bool", "boolean"):
        return "boolean"
    if t in schemas:
        queue.add(t)
        return t
    return "any"


def _query_ts(t, schemas: dict, queue: set[str]) -> str:
    ts = _py_to_ts(t, schemas, queue)
    return "any" if ts == "any" else f"{ts} | {ts}[]"


def _member_key(name: str) -> str:
    """Quote an interface/object member key if it is not a bare TS identifier."""
    return name if _IDENT_RE.match(name) else f'"{name}"'
