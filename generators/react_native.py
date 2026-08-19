from __future__ import annotations
import json
import os

from .javascript_browser import JavaScriptBrowserGenerator

RN_MODULE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "react_native_module")


class ReactNativeGenerator(JavaScriptBrowserGenerator):
    """React Native / Expo SDK.

    The endpoint surface is byte-for-byte the browser generator's — it is
    already platform-neutral (fetch, no DOM) — so only packaging and the
    runtime adapters differ. What React Native cannot supply on its own is
    bundled from ``react_native_module/``: a crypto provider for PKCE (Hermes
    has no SubtleCrypto), secure token storage, the redirect-capture login
    flow, and the React bindings.
    """

    framework_name = "react_native"

    # react/react-native are peers for consumers, but npm auto-installs peers and
    # the RN toolchain is ~160MB of native tooling the rollup+tsc build never
    # touches. Skip them here; the published manifest still declares them.
    npm_install_args = ["--omit=peer"]

    def generate(self, endpoints: list[dict], output_dir: str, composites: list[dict] | None = None, utilities: list[dict] | None = None, admin: bool = False, schemas: dict | None = None) -> None:
        # Copied before the barrel is emitted so reexport_all_modules picks the
        # adapters up and re-exports them from the package root.
        self.copy_module("react_native", RN_MODULE_DIR, output_dir)
        self.emit_react_entry(output_dir)
        super().generate(endpoints, output_dir, composites=composites, utilities=utilities, admin=admin, schemas=schemas)

    def emit_rollup_config(self, output_dir: str) -> None:
        """Two bundles: the SDK, and the React bindings with react left external.

        No UMD target — there is no script tag on a phone — and the React entry
        is built separately so importing the SDK never pulls React into a plain
        module, background task, or test.
        """
        content = (
            "import resolve from '@rollup/plugin-node-resolve';\n"
            "import commonjs from '@rollup/plugin-commonjs';\n\n"
            "const plugins = [resolve(), commonjs()];\n\n"
            "export default [\n"
            "  {\n"
            "    input: 'index.js',\n"
            "    output: [\n"
            "      { file: 'dist/sdk.cjs', format: 'cjs', exports: 'named' },\n"
            "      { file: 'dist/sdk.esm.js', format: 'es' },\n"
            "    ],\n"
            "    plugins,\n"
            "  },\n"
            "  {\n"
            "    input: 'react_entry.js',\n"
            "    output: [\n"
            "      { file: 'dist/react.cjs', format: 'cjs', exports: 'named' },\n"
            "      { file: 'dist/react.esm.js', format: 'es' },\n"
            "    ],\n"
            "    plugins,\n"
            "    external: ['react'],\n"
            "  },\n"
            "];\n"
        )
        with open(os.path.join(output_dir, "rollup.config.js"), "w") as f:
            f.write(content)

    def emit_react_entry(self, output_dir: str) -> str:
        """Write the ESM entry Rollup builds the ``/react`` subpath from.

        react.js is CommonJS, and Rollup collapses a CommonJS entry to a single
        default export — `import { MediaVizProvider }` would resolve to
        undefined. Re-exporting through an ESM shim restores the named exports,
        the same trick emit_reexports() uses for the other bundled modules.
        """
        module_path = os.path.join(output_dir, "react_native")
        names = self.discover_file_exports(os.path.join(module_path, "src", "react.js"))
        if not names:
            raise RuntimeError("react_native module exposes no React bindings to re-export")
        lines = [
            "// Auto-generated — do not edit",
            "import _react from './react_native/src/react.js';",
            f"export const {{ {', '.join(names)} }} = _react;",
            "",
        ]
        path = os.path.join(output_dir, "react_entry.js")
        with open(path, "w") as f:
            f.write("\n".join(lines))
        return path

    @staticmethod
    def discover_file_exports(path: str) -> list[str]:
        """Names in a CommonJS file's ``module.exports = { ... }``."""
        import re
        if not os.path.isfile(path):
            return []
        m = re.search(r"module\.exports\s*=\s*\{([^}]+)\}", open(path).read())
        if not m:
            return []
        return [n.strip() for n in m.group(1).split(",") if n.strip()]

    def emit_package_json(self, output_dir: str, admin: bool = False) -> None:
        from .licenses import extract_sdk_version
        config = {
            "name": "@mediaviz/react-native-sdk",
            "version": self.sdk_version.npm() if self.sdk_version else extract_sdk_version(output_dir),
            "description": "MediaViz React Native SDK — auto-generated endpoint client for React Native and Expo.",
            "license": "MIT",
            "repository": {
                "type": "git",
                "url": "https://github.com/mediaviz/mediaviz_sdk",
            },
            "keywords": ["mediaviz", "react-native", "expo", "sdk"],
            "type": "module",
            "main": "./dist/sdk.cjs",
            "module": "./dist/sdk.esm.js",
            # Metro resolves `react-native` ahead of `browser` and `main`. Without
            # it RN would land on whichever of those came first, which for the web
            # package is a UMD bundle.
            "react-native": "./dist/sdk.esm.js",
            "types": "./dist/sdk.d.ts",
            "exports": {
                ".": {
                    "react-native": "./dist/sdk.esm.js",
                    "import": {
                        "types": "./dist/sdk.esm.d.ts",
                        "default": "./dist/sdk.esm.js",
                    },
                    "require": {
                        "types": "./dist/sdk.d.cts",
                        "default": "./dist/sdk.cjs",
                    },
                    "default": "./dist/sdk.cjs",
                },
                "./react": {
                    "react-native": "./dist/react.esm.js",
                    "import": {
                        "types": "./dist/react.d.ts",
                        "default": "./dist/react.esm.js",
                    },
                    "require": {
                        "types": "./dist/react.d.cts",
                        "default": "./dist/react.cjs",
                    },
                    "default": "./dist/react.cjs",
                },
                "./package.json": "./package.json",
            },
            "files": ["dist", "LICENSE", "README.md"],
            "peerDependencies": {
                "react": ">=18.0.0",
                "react-native": ">=0.72.0",
            },
            "publishConfig": {
                "access": "public",
            },
            "scripts": {
                "build": "rollup -c",
            },
            "devDependencies": {
                "rollup": "^4.0.0",
                "@rollup/plugin-node-resolve": "^16.0.0",
                "@rollup/plugin-commonjs": "^29.0.0",
                "typescript": "^5.4.0",
            },
        }
        with open(os.path.join(output_dir, "package.json"), "w") as f:
            json.dump(config, f, indent=2)
            f.write("\n")

    def emit_dts_file(self, endpoints: list[dict], composites: list[dict] | None, utilities: list[dict] | None, output_dir: str, admin: bool = False) -> None:
        super().emit_dts_file(endpoints, composites, utilities, output_dir, admin=admin)
        self.emit_react_dts(output_dir)

    def emit_react_dts(self, output_dir: str) -> None:
        """Declarations for the ``/react`` subpath.

        Hand-written rather than derived from the endpoint spec: this surface is
        the fixed shape of react_native_module/src/react.js, not something the
        catalog can vary.
        """
        dts = _REACT_DTS
        dist_dir = os.path.join(output_dir, "dist")
        os.makedirs(dist_dir, exist_ok=True)
        for name in ("react.d.ts", "react.d.cts"):
            path = os.path.join(dist_dir, name)
            with open(path, "w") as f:
                f.write(dts)
            self._typecheck_dts(output_dir, path)
        print(f"  [react_native] react types emitted → {os.path.join(dist_dir, 'react.d.ts')}")


_REACT_DTS = """// Auto-generated — do not edit

export interface TokenPair {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface TokenStore {
  load(): Promise<TokenPair>;
  save(tokens: unknown): Promise<void>;
  clear(): Promise<void>;
}

/** Contract of expo-web-browser's openAuthSessionAsync. */
export type OpenAuthSession = (
  url: string,
  redirectUri: string,
  options?: Record<string, unknown>
) => Promise<{ type: string; url?: string }>;

export interface SignInOverrides {
  openAuthSession?: OpenAuthSession;
  redirectUri?: string;
  state?: string;
  sessionOptions?: Record<string, unknown>;
}

export interface MediaVizProviderProps {
  /** The MediaViz class itself, imported from the package root. */
  MediaViz: new (config?: Record<string, unknown>) => any;
  config?: Record<string, unknown>;
  store?: TokenStore;
  openAuthSession?: OpenAuthSession;
  children?: unknown;
}

export interface MediaVizContextValue {
  client: any;
  /** False until persisted tokens have been read back on mount. */
  ready: boolean;
  signedIn: boolean;
  signIn(overrides?: SignInOverrides): Promise<Record<string, unknown>>;
  signOut(): Promise<void>;
}

export declare function MediaVizProvider(props: MediaVizProviderProps): unknown;
export declare function useMediaViz(): MediaVizContextValue;
export declare const MediaVizContext: unknown;
"""
