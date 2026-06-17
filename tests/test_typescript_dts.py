import json
import os
import sys

import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "generators"))

from generators.javascript_browser import JavaScriptBrowserGenerator
from generators.typescript_dts import build_dts, _py_to_ts


@pytest.fixture
def gen():
    return JavaScriptBrowserGenerator()


SCHEMAS = {
    "PhotoDisplay": {"fields": {
        "id": {"type": "int", "required": True},
        "url": {"type": "str", "required": True},
        "taken_at": {"type": "datetime", "required": False},
        "faces": {"type": "List[PhotoFace]", "required": False},
    }},
    "PhotoFace": {"fields": {
        "id": {"type": "int", "required": True},
        "score": {"type": "float", "required": False},
    }},
}


def _auth_ep(ep_id, path, controller="Photos", params=None, request_body=None, response=None):
    return {
        "id": ep_id, "function_name": ep_id, "controller": controller, "method": "GET",
        "path": path, "auth": "required", "params": params or [],
        "request_body": request_body, "response": response, "tags": [],
    }


# ── type mapper ──────────────────────────────────────────────────────────────


@pytest.mark.parametrize("py,ts", [
    ("str", "string"), ("int", "number"), ("float", "number"), ("bool", "boolean"),
    ("datetime", "string"), ("date", "string"), ("EmailStr", "string"),
    ("string (email)", "string"), ("string (bool)", "string"),
    ("Optional[int]", "number"), ("Optional[str]", "string"), ("Annotated[any]", "any"),
    ("List[int]", "number[]"), ("List[str]", "string[]"), ("Optional[List[int]]", "number[]"),
    ("List[]", "any[]"), ("dict", "Record<string, any>"), ("Dict[any]", "Record<string, any>"),
    ("null", "any"), (None, "any"), ("UnknownAlias", "any"),
])
def test_py_to_ts(py, ts):
    assert _py_to_ts(py, {}, set()) == ts


def test_py_to_ts_schema_queues():
    queue = set()
    assert _py_to_ts("PhotoFace", SCHEMAS, queue) == "PhotoFace"
    assert "PhotoFace" in queue


def test_py_to_ts_list_of_schema_queues():
    queue = set()
    assert _py_to_ts("List[PhotoDisplay]", SCHEMAS, queue) == "PhotoDisplay[]"
    assert "PhotoDisplay" in queue


# ── response typing ──────────────────────────────────────────────────────────


def test_response_ref(gen):
    ep = _auth_ep("get_photo", "/p/{id}", params=[{"name": "id", "in": "path", "type": "int", "required": True}],
                  response={"body": {"$ref": "api_schemas.yaml#PhotoDisplay"}})
    out = build_dts(gen, [ep], None, None, SCHEMAS)
    assert "getPhoto(id: number): Promise<PhotoDisplay>;" in out


def test_response_list_ref(gen):
    ep = _auth_ep("get_photos", "/p",
                  response={"body": {"type": "List[PhotoDisplay]", "$ref": "api_schemas.yaml#PhotoDisplay"}})
    out = build_dts(gen, [ep], None, None, SCHEMAS)
    assert "getPhotos(): Promise<PhotoDisplay[]>;" in out


def test_response_dict_and_missing(gen):
    dict_ep = _auth_ep("a", "/a", response={"body": "dict"})
    none_ep = _auth_ep("b", "/b", response=None)
    out = build_dts(gen, [dict_ep, none_ep], None, None, SCHEMAS)
    assert "a(): Promise<Record<string, any>>;" in out
    assert "b(): Promise<any>;" in out


# ── schema interface emission ──────────────────────────────────────────────────


def test_interface_emitted_with_members_and_optionality(gen):
    ep = _auth_ep("get_photo", "/p", response={"body": {"$ref": "api_schemas.yaml#PhotoDisplay"}})
    out = build_dts(gen, [ep], None, None, SCHEMAS)
    assert "export interface PhotoDisplay {" in out
    assert "  id: number;" in out          # required → no ?
    assert "  taken_at?: string;" in out   # optional → ?, snake_case kept, datetime→string
    assert "  faces?: PhotoFace[];" in out  # list of schema


def test_transitive_schema_closure(gen):
    """A schema referenced only via a nested field is still emitted."""
    ep = _auth_ep("get_photo", "/p", response={"body": {"$ref": "api_schemas.yaml#PhotoDisplay"}})
    out = build_dts(gen, [ep], None, None, SCHEMAS)
    assert "export interface PhotoFace {" in out  # reached only via PhotoDisplay.faces


def test_unreferenced_schema_not_emitted(gen):
    ep = _auth_ep("get_photo", "/p", response={"body": {"$ref": "api_schemas.yaml#PhotoFace"}})
    out = build_dts(gen, [ep], None, None, SCHEMAS)
    assert "export interface PhotoFace {" in out
    assert "export interface PhotoDisplay {" not in out  # never referenced


# ── method signature shapes ────────────────────────────────────────────────────


def test_path_and_query_bag(gen):
    ep = _auth_ep("get_photos", "/p/{table_name}", params=[
        {"name": "table_name", "in": "path", "type": "str", "required": True},
        {"name": "limit", "in": "query", "type": "Optional[int]", "required": False},
    ], response={"body": "dict"})
    out = build_dts(gen, [ep], None, None, SCHEMAS)
    assert "getPhotos(tableName: string, options?: { limit?: number | number[] })" in out


def test_expanded_body_required_then_optional(gen):
    rb = {"_shape": "expanded", "fields": [
        {"name": "name", "type": "str", "required": True},
        {"name": "count", "type": "Optional[int]", "required": False},
    ]}
    ep = _auth_ep("create_thing", "/t", request_body=rb, response={"body": "dict"})
    out = build_dts(gen, [ep], None, None, SCHEMAS)
    assert "createThing(name: string, count?: number)" in out


def test_all_optional_body_is_options_bag(gen):
    rb = {"_shape": "expanded", "fields": [
        {"name": "name", "type": "str", "required": False},
        {"name": "count", "type": "Optional[int]", "required": False},
    ]}
    ep = _auth_ep("update_thing", "/t", request_body=rb, response={"body": "dict"})
    out = build_dts(gen, [ep], None, None, SCHEMAS)
    assert "updateThing(body?: { name?: string, count?: number })" in out


def test_reserved_word_param_escaped(gen):
    rb = {"_shape": "expanded", "fields": [{"name": "private", "type": "bool", "required": True}]}
    ep = _auth_ep("x", "/x", request_body=rb, response={"body": "dict"})
    out = build_dts(gen, [ep], None, None, SCHEMAS)
    assert "x(private_: boolean)" in out


# ── MediaViz client + fixed blocks ──────────────────────────────────────────────


def test_mediaviz_client_surface(gen):
    ep = _auth_ep("get_photo", "/p", response={"body": "dict"})
    out = build_dts(gen, [ep], None, None, SCHEMAS)
    assert "export class MediaViz {" in out
    assert "constructor(config?: MediaVizConfig);" in out
    assert "authenticate(): Promise<TokenResponse>;" in out
    assert "getAuthorizationUrl(state?: string): Promise<AuthorizationUrlResult>;" in out
    assert "readonly photos: Photos;" in out
    assert "export function handleResponse(response: Response): Promise<any>;" in out


# ── package.json wiring ─────────────────────────────────────────────────────────


def test_package_json_advertises_types(gen, tmp_path):
    gen.emit_package_json(str(tmp_path))
    pkg = json.loads((tmp_path / "package.json").read_text())
    # Sibling top-level `types` is the legacy-resolution fallback.
    assert pkg["types"] == "./dist/sdk.d.ts"
    exp = pkg["exports"]["."]
    # No top-level `types` CONDITION inside exports — it would pre-empt the
    # per-condition types under node16/nodenext.
    assert "types" not in exp
    # Per-condition types: ESM → sdk.esm.d.ts, CJS → sdk.d.cts; each first in its block.
    assert list(exp["import"])[0] == "types" and exp["import"]["types"] == "./dist/sdk.esm.d.ts"
    assert exp["import"]["default"] == "./dist/sdk.esm.js"
    assert list(exp["require"])[0] == "types" and exp["require"]["types"] == "./dist/sdk.d.cts"
    assert exp["require"]["default"] == "./dist/sdk.cjs"
    assert "typescript" in pkg["devDependencies"]


def test_emit_dts_writes_all_declaration_files(gen, tmp_path):
    gen._schemas = {}
    ep = _auth_ep("get_photo", "/p", response={"body": "dict"})
    gen.emit_dts_file([ep], None, None, str(tmp_path))  # tsc absent → type-check skipped
    dist = tmp_path / "dist"
    base = (dist / "sdk.d.ts").read_text()
    assert base  # non-empty
    # ESM + CJS declarations are byte-identical copies of the consolidated surface.
    assert (dist / "sdk.esm.d.ts").read_text() == base
    assert (dist / "sdk.d.cts").read_text() == base


def test_typescript_devdep_pruned_for_publish(gen, tmp_path):
    gen.emit_package_json(str(tmp_path))
    gen.prune_package_json_for_publish(str(tmp_path))
    pkg = json.loads((tmp_path / "package.json").read_text())
    assert "devDependencies" not in pkg      # typescript never ships
    assert pkg["types"] == "./dist/sdk.d.ts"  # but types survives pruning
