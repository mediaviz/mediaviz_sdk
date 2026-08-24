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

    def dts_addendum(self) -> str:
        """Declarations for the adapters copied in from ``react_native_module/``.

        Hand-written for the same reason as the ``/react`` subpath's: this is the
        fixed shape of the bundled source, not something the endpoint catalog can
        vary. Appended to the main ``sdk.d.ts`` because the barrel re-exports
        these from the package root, so that is where TypeScript looks for them.
        """
        return _ADAPTER_DTS

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


# Declarations for react_native_module/. Kept beside _REACT_DTS so both
# hand-written surfaces live together; appended to sdk.d.ts by dts_addendum.
_ADAPTER_DTS = """

// ── React Native adapters ──────────────────────────────────────────────────
// Bundled from react_native_module/ and re-exported from the package root.

/** Token shape the stores read back. Both tokens may be absent. */
export interface TokenPair {
  accessToken: string | null;
  refreshToken: string | null;
}

/**
 * Persistence contract. `save` accepts either the OAuth client's snake_case
 * response or the client's camelCase getters; both normalise to TokenPair.
 */
export interface TokenStore {
  load(): Promise<TokenPair>;
  save(tokens: unknown): Promise<void>;
  clear(): Promise<void>;
}

/** Native crypto, as expo-crypto or react-native-quick-crypto expose it. */
export interface CryptoImpl {
  /** May fill in place and return void (expo-crypto) or return the array. */
  getRandomValues(bytes: Uint8Array): Uint8Array | void;
  /** May resolve a Uint8Array, ArrayBuffer, typed array, or byte array. */
  digest(bytes: Uint8Array): Promise<Uint8Array | ArrayBuffer | ArrayBufferView | number[]> | Uint8Array | ArrayBuffer | ArrayBufferView | number[];
}

/** Normalised provider the OAuth SDK's PKCE path consumes. */
export interface CryptoProvider {
  getRandomValues(bytes: Uint8Array): Uint8Array;
  sha256(bytes: Uint8Array): Promise<Uint8Array>;
}

/** Normalises either native crypto convention into a CryptoProvider. */
export declare function createCryptoProvider(impl: CryptoImpl): CryptoProvider;

/**
 * Installs the provider PKCE uses. Must be called before any sign-in:
 * Hermes ships no SubtleCrypto, so the default WebCrypto path throws.
 */
export declare function configureCrypto(provider: CryptoProvider): void;

/** Non-persistent default. Tokens are lost when the app is killed. */
export declare class MemoryTokenStore implements TokenStore {
  load(): Promise<TokenPair>;
  save(tokens: unknown): Promise<void>;
  clear(): Promise<void>;
}

/** The subset of expo-secure-store this SDK calls. */
export interface SecureStoreLike {
  getItemAsync(key: string, options?: Record<string, unknown>): Promise<string | null>;
  setItemAsync(key: string, value: string, options?: Record<string, unknown>): Promise<void>;
  deleteItemAsync(key: string, options?: Record<string, unknown>): Promise<void>;
}

export interface SecureTokenStoreOptions {
  accessKey?: string;
  refreshKey?: string;
  secureStoreOptions?: Record<string, unknown>;
}

/**
 * Backed by expo-secure-store (Keychain on iOS, Keystore on Android). Tokens
 * are stored under separate keys — a single value is capped at 2048 bytes and
 * two JWTs in one blob can cross that.
 */
export declare function createSecureTokenStore(
  SecureStore: SecureStoreLike,
  options?: SecureTokenStoreOptions
): TokenStore;

/** The subset of react-native-keychain this SDK calls. */
export interface KeychainLike {
  getGenericPassword(options?: Record<string, unknown>): Promise<{ password: string } | false>;
  setGenericPassword(username: string, password: string, options?: Record<string, unknown>): Promise<unknown>;
  resetGenericPassword(options?: Record<string, unknown>): Promise<unknown>;
}

export interface KeychainTokenStoreOptions {
  service?: string;
  keychainOptions?: Record<string, unknown>;
}

/** Backed by react-native-keychain, which has no size cap, so one JSON entry. */
export declare function createKeychainTokenStore(
  Keychain: KeychainLike,
  options?: KeychainTokenStoreOptions
): TokenStore;

/** Contract of expo-web-browser's openAuthSessionAsync. */
export type OpenAuthSession = (
  url: string,
  redirectUri: string,
  options?: Record<string, unknown>
) => Promise<{ type: string; url?: string }>;

/** 'cancelled' when the user dismissed the sheet, 'failed' otherwise. */
export declare class AuthSessionError extends Error {
  readonly name: 'AuthSessionError';
  readonly code: string;
  constructor(code: string, message: string);
}

export interface AuthSessionOptions {
  openAuthSession: OpenAuthSession;
  redirectUri: string;
  state?: string;
  sessionOptions?: Record<string, unknown>;
}

/** Runs the full interactive login and leaves the client authenticated. */
export declare function startAuthSession(
  mv: MediaViz,
  options: AuthSessionOptions
): Promise<TokenResponse>;

/**
 * Extracts query and fragment params from a redirect URL. Hand-rolled because
 * React Native's URL polyfill mis-parses the custom schemes native redirect
 * URIs use. Returns an empty object for input it cannot parse.
 */
export declare function parseRedirectUrl(url: string): Record<string, string>;

export interface SignInOverrides {
  openAuthSession?: OpenAuthSession;
  redirectUri?: string;
  state?: string;
  sessionOptions?: Record<string, unknown>;
}

export interface CreateSessionOptions {
  /** The MediaViz class itself — this module is copied into the package and cannot name its host. */
  MediaViz: new (config?: MediaVizConfig) => MediaViz;
  config?: MediaVizConfig;
  /** Defaults to a MemoryTokenStore. */
  store?: TokenStore;
  openAuthSession?: OpenAuthSession;
  onTokens?: (tokens: unknown | null) => void;
}

/** The signed-in lifecycle, independent of React. react.js binds over this. */
export interface Session {
  readonly client: MediaViz;
  readonly store: TokenStore;
  /** Loads persisted tokens into the client. Resolves null when there are none. */
  restore(): Promise<TokenPair | null>;
  signIn(overrides?: SignInOverrides): Promise<TokenResponse>;
  signOut(): Promise<void>;
}

export declare function createSession(options: CreateSessionOptions): Session;
"""
