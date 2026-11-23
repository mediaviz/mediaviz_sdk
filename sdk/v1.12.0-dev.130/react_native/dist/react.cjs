'use strict';

var require$$0 = require('react');

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var storage;
var hasRequiredStorage;

function requireStorage () {
	if (hasRequiredStorage) return storage;
	hasRequiredStorage = 1;

	// Token persistence.
	//
	// Access and refresh tokens are kept under separate keys because
	// expo-secure-store caps a single value at 2048 bytes and two JWTs in one blob
	// can cross that. Keychain has no such cap, so it stores one JSON entry.

	const ACCESS_KEY = 'mediaviz.accessToken';
	const REFRESH_KEY = 'mediaviz.refreshToken';

	/** Non-persistent default. Tokens are lost when the app is killed. */
	class MemoryTokenStore {
	  constructor() {
	    this._tokens = { accessToken: null, refreshToken: null };
	  }

	  async load() {
	    return { ...this._tokens };
	  }

	  async save(tokens) {
	    this._tokens = normalize(tokens);
	  }

	  async clear() {
	    this._tokens = { accessToken: null, refreshToken: null };
	  }
	}

	/**
	 * Backed by expo-secure-store (Keychain on iOS, Keystore on Android).
	 * @param {{getItemAsync: Function, setItemAsync: Function, deleteItemAsync: Function}} SecureStore
	 */
	function createSecureTokenStore(SecureStore, options = {}) {
	  requireMethods(SecureStore, ['getItemAsync', 'setItemAsync', 'deleteItemAsync'], 'expo-secure-store');
	  const accessKey = options.accessKey ?? ACCESS_KEY;
	  const refreshKey = options.refreshKey ?? REFRESH_KEY;
	  const opts = options.secureStoreOptions;
	  return {
	    async load() {
	      const [accessToken, refreshToken] = await Promise.all([
	        SecureStore.getItemAsync(accessKey, opts),
	        SecureStore.getItemAsync(refreshKey, opts),
	      ]);
	      return { accessToken: accessToken ?? null, refreshToken: refreshToken ?? null };
	    },
	    async save(tokens) {
	      const { accessToken, refreshToken } = normalize(tokens);
	      await Promise.all([
	        writeOrDelete(SecureStore, accessKey, accessToken, opts),
	        writeOrDelete(SecureStore, refreshKey, refreshToken, opts),
	      ]);
	    },
	    async clear() {
	      await Promise.all([
	        SecureStore.deleteItemAsync(accessKey, opts),
	        SecureStore.deleteItemAsync(refreshKey, opts),
	      ]);
	    },
	  };
	}

	/**
	 * Backed by react-native-keychain.
	 * @param {{getGenericPassword: Function, setGenericPassword: Function, resetGenericPassword: Function}} Keychain
	 */
	function createKeychainTokenStore(Keychain, options = {}) {
	  requireMethods(Keychain, ['getGenericPassword', 'setGenericPassword', 'resetGenericPassword'], 'react-native-keychain');
	  const opts = { service: options.service ?? 'ai.mediaviz.tokens', ...options.keychainOptions };
	  return {
	    async load() {
	      const entry = await Keychain.getGenericPassword(opts);
	      if (!entry || !entry.password) return { accessToken: null, refreshToken: null };
	      return normalize(JSON.parse(entry.password));
	    },
	    async save(tokens) {
	      await Keychain.setGenericPassword('mediaviz', JSON.stringify(normalize(tokens)), opts);
	    },
	    async clear() {
	      await Keychain.resetGenericPassword(opts);
	    },
	  };
	}

	// helpers
	function normalize(tokens) {
	  // The OAuth client emits snake_case (access_token); MediaViz getters emit
	  // camelCase. Both reach this store, so both are accepted.
	  const t = tokens ?? {};
	  return {
	    accessToken: t.accessToken ?? t.access_token ?? null,
	    refreshToken: t.refreshToken ?? t.refresh_token ?? null,
	  };
	}

	function writeOrDelete(SecureStore, key, value, opts) {
	  // A null token must erase the key, not persist the string "null".
	  return value ? SecureStore.setItemAsync(key, value, opts) : SecureStore.deleteItemAsync(key, opts);
	}

	function requireMethods(mod, names, label) {
	  for (const name of names) {
	    if (typeof mod?.[name] !== 'function') {
	      throw new TypeError(`Expected the ${label} module; it has no ${name}()`);
	    }
	  }
	}

	storage = { MemoryTokenStore, createSecureTokenStore, createKeychainTokenStore };
	return storage;
}

var authSession;
var hasRequiredAuthSession;

function requireAuthSession () {
	if (hasRequiredAuthSession) return authSession;
	hasRequiredAuthSession = 1;

	// Authorization Code + PKCE on device.
	//
	// The app injects openAuthSession (expo-web-browser's openAuthSessionAsync, or
	// anything with the same contract), keeping this file free of native
	// dependencies. The verifier never leaves this function, so there is nothing to
	// persist across the redirect the way a web app must.

	class AuthSessionError extends Error {
	  constructor(code, message) {
	    super(message);
	    this.name = 'AuthSessionError';
	    this.code = code;
	  }
	}

	/**
	 * Runs the full interactive login and leaves *mv* authenticated.
	 * @param {object} mv - a MediaViz client
	 * @param {{openAuthSession: Function, redirectUri: string, state?: string, sessionOptions?: object}} options
	 * @returns {Promise<object>} the token response
	 */
	async function startAuthSession(mv, options) {
	  const { openAuthSession, redirectUri, state: requestedState, sessionOptions } = options ?? {};
	  if (typeof openAuthSession !== 'function') {
	    throw new TypeError('startAuthSession requires openAuthSession(url, redirectUri, options)');
	  }
	  if (!redirectUri) {
	    throw new TypeError('startAuthSession requires redirectUri');
	  }

	  const { url, state, code_verifier: codeVerifier } = await mv.getAuthorizationUrl(requestedState);
	  const result = await openAuthSession(url, redirectUri, sessionOptions);

	  const type = result?.type;
	  if (type === 'cancel' || type === 'dismiss') {
	    throw new AuthSessionError('cancelled', 'The user dismissed the sign-in screen.');
	  }
	  if (type !== 'success' || !result?.url) {
	    throw new AuthSessionError('failed', `Sign-in did not complete (result type: ${type ?? 'none'}).`);
	  }

	  const params = parseRedirectUrl(result.url);
	  if (params.error) {
	    throw new AuthSessionError(params.error, params.error_description ?? `Authorization failed: ${params.error}`);
	  }
	  // Rejecting a mismatched state is the CSRF defence the whole flow rests on —
	  // it must fail closed, including when the server returns no state at all.
	  if (params.state !== state) {
	    throw new AuthSessionError('state_mismatch', 'Authorization state did not match the request; discarding the response.');
	  }
	  if (!params.code) {
	    throw new AuthSessionError('no_code', 'Authorization redirect carried no code.');
	  }

	  return mv.handleCallback(params.code, codeVerifier);
	}

	/**
	 * Extracts query and fragment params from a redirect URL.
	 *
	 * Hand-rolled because React Native's URL polyfill mis-parses custom schemes
	 * (mediaviz://callback) — the very shape every native redirect URI takes.
	 * @param {string} url
	 * @returns {Record<string, string>}
	 */
	function parseRedirectUrl(url) {
	  const out = {};
	  const text = String(url ?? '');
	  const queryStart = text.indexOf('?');
	  const hashStart = text.indexOf('#');
	  if (queryStart !== -1) {
	    const end = hashStart > queryStart ? hashStart : text.length;
	    assign(out, text.slice(queryStart + 1, end));
	  }
	  if (hashStart !== -1) assign(out, text.slice(hashStart + 1));
	  return out;
	}

	// helpers
	function assign(out, segment) {
	  for (const pair of segment.split('&')) {
	    if (!pair) continue;
	    const eq = pair.indexOf('=');
	    const key = decode(eq === -1 ? pair : pair.slice(0, eq));
	    if (!key) continue;
	    out[key] = eq === -1 ? '' : decode(pair.slice(eq + 1));
	  }
	}

	function decode(value) {
	  try {
	    return decodeURIComponent(value.replace(/\+/g, ' '));
	  } catch {
	    // A malformed escape must not take down the whole redirect parse; the
	    // caller's state/code checks still reject anything unusable.
	    return value;
	  }
	}

	authSession = { startAuthSession, parseRedirectUrl, AuthSessionError };
	return authSession;
}

var session;
var hasRequiredSession;

function requireSession () {
	if (hasRequiredSession) return session;
	hasRequiredSession = 1;

	// The authenticated-session lifecycle, independent of React.
	//
	// Everything stateful about being signed in — rehydrating persisted tokens,
	// keeping the store in step with refresh-token rotation, running the
	// interactive login, clearing on sign-out — lives here so it can be driven and
	// tested without a renderer. react.js is a thin binding over this.
	//
	// The MediaViz class is injected because this module is copied *into* the
	// generated package: it cannot name its own host, and MediaViz.js is ESM while
	// this file is CommonJS.

	const { MemoryTokenStore } = requireStorage();
	const { startAuthSession } = requireAuthSession();

	/**
	 * @param {{MediaViz: Function, config?: object, store?: object, openAuthSession?: Function, onTokens?: Function}} options
	 */
	function createSession(options) {
	  const { MediaViz, config, store, openAuthSession, onTokens } = options ?? {};
	  if (typeof MediaViz !== 'function') throw new TypeError('createSession requires the MediaViz class');

	  const tokenStore = store ?? new MemoryTokenStore();
	  const emit = (tokens) => {
	    if (onTokens) onTokens(tokens ?? null);
	  };

	  const client = new MediaViz({
	    ...config,
	    onTokenRefresh: (tokens) => {
	      emit(tokens);
	      // Fire-and-forget: the refresh already succeeded and the retry is waiting
	      // on this callback, so awaiting the write would stall the request. A
	      // failed write is not worth failing the call over — the next refresh
	      // rewrites it.
	      Promise.resolve(tokenStore.save(tokens)).catch(() => {});
	    },
	  });

	  return {
	    client,
	    store: tokenStore,

	    /** Loads persisted tokens into the client. Returns them, or null if none. */
	    async restore() {
	      const tokens = await tokenStore.load().catch(() => null);
	      if (!tokens || !tokens.accessToken) return null;
	      client.setTokens(tokens.accessToken, tokens.refreshToken ?? null);
	      emit(tokens);
	      return tokens;
	    },

	    async signIn(overrides = {}) {
	      const tokens = await startAuthSession(client, {
	        openAuthSession: overrides.openAuthSession ?? openAuthSession,
	        redirectUri: overrides.redirectUri ?? config?.redirectUri,
	        state: overrides.state,
	        sessionOptions: overrides.sessionOptions,
	      });
	      await tokenStore.save(tokens);
	      emit(tokens);
	      return tokens;
	    },

	    async signOut() {
	      client.setTokens(null, null);
	      emit(null);
	      await tokenStore.clear();
	    },
	  };
	}

	session = { createSession };
	return session;
}

var react;
var hasRequiredReact;

function requireReact () {
	if (hasRequiredReact) return react;
	hasRequiredReact = 1;

	// React bindings, reachable at "<pkg>/react".
	//
	// Deliberately outside the package barrel: this is the only file that requires
	// react, so keeping it on a subpath leaves the core SDK importable from plain
	// modules, background tasks, and tests with no React in scope. All the actual
	// lifecycle logic lives in session.js; this file only mirrors it into state.

	const React = require$$0;

	const { createSession } = requireSession();

	const MediaVizContext = React.createContext(null);

	/**
	 * Provides an authenticated MediaViz client to the tree.
	 *
	 * Pass the MediaViz class itself as a prop — see session.js for why it cannot
	 * be imported here.
	 */
	function MediaVizProvider(props) {
	  const { MediaViz, config, store, openAuthSession, children } = props;

	  const [ready, setReady] = React.useState(false);
	  const [accessToken, setAccessToken] = React.useState(null);

	  const session = React.useMemo(
	    () =>
	      createSession({
	        MediaViz,
	        config,
	        store,
	        openAuthSession,
	        onTokens: (tokens) => setAccessToken(tokens?.accessToken ?? tokens?.access_token ?? null),
	      }),
	    [MediaViz, config, store, openAuthSession]
	  );

	  React.useEffect(() => {
	    let cancelled = false;
	    // `ready` gates the tree on the one-time keychain read, so it must flip even
	    // when there is nothing stored or the read fails.
	    session.restore().finally(() => {
	      if (!cancelled) setReady(true);
	    });
	    return () => {
	      cancelled = true;
	    };
	  }, [session]);

	  const signIn = React.useCallback((overrides) => session.signIn(overrides), [session]);
	  const signOut = React.useCallback(() => session.signOut(), [session]);

	  const value = React.useMemo(
	    () => ({ client: session.client, ready, signedIn: Boolean(accessToken), signIn, signOut }),
	    [session, ready, accessToken, signIn, signOut]
	  );

	  return React.createElement(MediaVizContext.Provider, { value }, children);
	}

	function useMediaViz() {
	  const value = React.useContext(MediaVizContext);
	  if (!value) throw new Error('useMediaViz must be used inside a <MediaVizProvider>');
	  return value;
	}

	react = { MediaVizProvider, useMediaViz, MediaVizContext };
	return react;
}

var reactExports = requireReact();
var _react = /*@__PURE__*/getDefaultExportFromCjs(reactExports);

// Auto-generated — do not edit
const { MediaVizProvider, useMediaViz, MediaVizContext } = _react;

exports.MediaVizContext = MediaVizContext;
exports.MediaVizProvider = MediaVizProvider;
exports.useMediaViz = useMediaViz;
