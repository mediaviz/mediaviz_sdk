"""Tests for the React Native generator: module bundling, packaging, and the /react subpath."""
from __future__ import annotations
import json
import os
import sys
import tempfile

import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from generators import discover_generators
from generators.javascript_browser import JavaScriptBrowserGenerator
from generators.react_native import ReactNativeGenerator
from test_generators import discover_test_generators

RN_MODULE_DIR = os.path.join(os.path.dirname(__file__), "..", "react_native_module")

_EP = {
    "function_name": "get_project",
    "controller": "projects",
    "path": "/projects/{project_id}",
    "method": "GET",
    "auth": "required",
    "params": [{"name": "project_id", "in": "path", "type": "string", "required": True}],
    "request_body": None,
    "api_host": None,
}


@pytest.fixture
def gen():
    return ReactNativeGenerator()


@pytest.fixture
def out_dir():
    with tempfile.TemporaryDirectory() as d:
        yield d


# ── source module sanity ──────────────────────────────────────────────────────

def test_react_native_module_source_layout():
    for path in (
        "javascript/package.json",
        "javascript/src/index.js",
        "javascript/src/crypto.js",
        "javascript/src/storage.js",
        "javascript/src/authSession.js",
        "javascript/src/session.js",
        "javascript/src/react.js",
    ):
        assert os.path.isfile(os.path.join(RN_MODULE_DIR, path)), f"missing: {path}"


def test_react_is_not_in_the_module_barrel():
    """react.js stays on a subpath so importing the SDK never requires React."""
    barrel = open(os.path.join(RN_MODULE_DIR, "javascript", "src", "index.js")).read()
    assert "react.js" not in barrel
    assert "./session" in barrel


# ── registration ──────────────────────────────────────────────────────────────

def test_generator_is_registered():
    assert discover_generators()["react_native"] is ReactNativeGenerator


def test_test_generator_is_registered():
    assert discover_test_generators()["react_native"].framework_name == "react_native"


def test_inherits_the_browser_endpoint_surface():
    """The generated endpoint code must not fork; only packaging differs."""
    assert issubclass(ReactNativeGenerator, JavaScriptBrowserGenerator)
    for method in ("emit_controller_file", "emit_client_class", "emit_errors_file", "_emit_method"):
        assert getattr(ReactNativeGenerator, method) is getattr(JavaScriptBrowserGenerator, method)


# ── module bundling ───────────────────────────────────────────────────────────

def test_copy_module_brings_the_adapters(gen, out_dir):
    gen.copy_module("react_native", RN_MODULE_DIR, out_dir)
    for name in ("crypto.js", "storage.js", "authSession.js", "session.js", "react.js"):
        assert os.path.isfile(os.path.join(out_dir, "react_native", "src", name))


def test_copy_module_leaves_the_module_tests_behind(gen, out_dir):
    """A bundled module's own suite must not ship inside the SDK."""
    gen.copy_module("react_native", RN_MODULE_DIR, out_dir)
    assert not os.path.exists(os.path.join(out_dir, "react_native", "src", "__tests__"))


def test_adapters_are_reexported_from_the_package_root(gen, out_dir):
    gen.copy_module("react_native", RN_MODULE_DIR, out_dir)
    files = gen.reexport_all_modules(out_dir)
    assert "_react_native.js" in files
    content = open(os.path.join(out_dir, "_react_native.js")).read()
    for name in ("createCryptoProvider", "createSession", "startAuthSession", "MemoryTokenStore"):
        assert name in content


# ── /react subpath entry ──────────────────────────────────────────────────────

def test_react_entry_reexports_named_bindings(gen, out_dir):
    gen.copy_module("react_native", RN_MODULE_DIR, out_dir)
    gen.emit_react_entry(out_dir)
    content = open(os.path.join(out_dir, "react_entry.js")).read()
    # Rollup collapses a CommonJS entry to a lone default export; the ESM shim is
    # what keeps `import { MediaVizProvider }` working.
    assert "export const { MediaVizProvider, useMediaViz, MediaVizContext }" in content
    assert "./react_native/src/react.js" in content


def test_react_entry_fails_loudly_when_the_module_is_missing(gen, out_dir):
    with pytest.raises(RuntimeError, match="React bindings"):
        gen.emit_react_entry(out_dir)


def test_discover_file_exports_reads_commonjs_exports():
    path = os.path.join(RN_MODULE_DIR, "javascript", "src", "react.js")
    assert ReactNativeGenerator.discover_file_exports(path) == [
        "MediaVizProvider",
        "useMediaViz",
        "MediaVizContext",
    ]


# ── packaging ─────────────────────────────────────────────────────────────────

@pytest.fixture
def pkg(gen, out_dir):
    gen.emit_package_json(out_dir)
    return json.load(open(os.path.join(out_dir, "package.json")))


def test_package_name_and_access(pkg):
    assert pkg["name"] == "@mediaviz/react-native-sdk"
    assert pkg["publishConfig"]["access"] == "public"


def test_metro_resolves_the_esm_bundle(pkg):
    """Metro checks `react-native` before `browser` and `main`."""
    assert pkg["react-native"] == "./dist/sdk.esm.js"
    assert pkg["exports"]["."]["react-native"] == "./dist/sdk.esm.js"


def test_react_bindings_are_on_a_subpath(pkg):
    entry = pkg["exports"]["./react"]
    assert entry["react-native"] == "./dist/react.esm.js"
    assert entry["import"]["types"] == "./dist/react.d.ts"
    assert entry["require"]["types"] == "./dist/react.d.cts"


def test_react_and_react_native_are_peers_only(pkg):
    assert set(pkg["peerDependencies"]) == {"react", "react-native"}
    assert "dependencies" not in pkg


def test_no_browser_or_umd_entry(pkg):
    assert "browser" not in pkg
    assert "umd" not in json.dumps(pkg)


def test_sharp_is_not_carried_onto_the_device(pkg):
    """sharp is a native Node image library — dead weight in a mobile bundle."""
    assert "optionalDependencies" not in pkg


def test_native_peers_are_skipped_at_build_time():
    """npm auto-installs peers; the RN toolchain is ~160MB rollup never touches."""
    assert "--omit=peer" in ReactNativeGenerator.npm_install_args
    assert JavaScriptBrowserGenerator.npm_install_args == []


# ── rollup config ─────────────────────────────────────────────────────────────

@pytest.fixture
def rollup(gen, out_dir):
    gen.emit_rollup_config(out_dir)
    return open(os.path.join(out_dir, "rollup.config.js")).read()


def test_rollup_builds_both_entries(rollup):
    assert "input: 'index.js'" in rollup
    assert "input: 'react_entry.js'" in rollup


def test_rollup_emits_no_umd_bundle(rollup):
    assert "umd" not in rollup


def test_rollup_leaves_react_external(rollup):
    assert "external: ['react']" in rollup


# ── declarations ──────────────────────────────────────────────────────────────

def test_react_dts_declares_the_provider_surface(gen, out_dir):
    gen.emit_react_dts(out_dir)
    dts = open(os.path.join(out_dir, "dist", "react.d.ts")).read()
    for name in ("MediaVizProvider", "useMediaViz", "MediaVizContextValue", "TokenStore", "OpenAuthSession"):
        assert name in dts
    # The require condition needs a .d.cts or node16 resolution reads it as ESM.
    assert os.path.isfile(os.path.join(out_dir, "dist", "react.d.cts"))


# Every name the barrel re-exports from react_native_module/. These ship as
# runtime exports regardless; the risk is that they ship *untyped*, which no
# test caught until a TypeScript consumer hit TS2305 on the published package.
_ADAPTER_EXPORTS = (
    "createCryptoProvider", "configureCrypto",
    "MemoryTokenStore", "createSecureTokenStore", "createKeychainTokenStore",
    "startAuthSession", "parseRedirectUrl", "AuthSessionError",
    "createSession",
)


def test_adapter_exports_are_declared(gen):
    dts = gen.dts_addendum()
    for name in _ADAPTER_EXPORTS:
        assert f"export declare function {name}" in dts or f"export declare class {name}" in dts, name


def test_adapter_addendum_matches_the_barrel(gen):
    """The declared surface must not drift from what index.js actually exports."""
    barrel = os.path.join(RN_MODULE_DIR, "javascript", "src", "index.js")
    exported = gen.discover_file_exports(barrel)
    dts = gen.dts_addendum()
    for name in exported:
        assert name in dts, f"{name} is exported by the barrel but undeclared"


def test_addendum_is_appended_to_every_dts_variant(gen, out_dir):
    gen._schemas = {}
    gen.emit_dts_file([_EP], None, None, out_dir)
    dist = os.path.join(out_dir, "dist")
    bodies = [open(os.path.join(dist, n)).read()
              for n in ("sdk.d.ts", "sdk.esm.d.ts", "sdk.d.cts")]
    # The require/import conditions resolve to different files; a name missing
    # from one of them is invisible to half of all consumers.
    for body in bodies:
        for name in _ADAPTER_EXPORTS:
            assert name in body, name
    assert bodies[0] == bodies[1] == bodies[2]


def test_addendum_is_react_native_only():
    """The browser SDK bundles no adapters, so its declarations must not gain them."""
    assert JavaScriptBrowserGenerator().dts_addendum() == ""
