'use strict';

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

const { MemoryTokenStore } = require('./storage');
const { startAuthSession } = require('./authSession');

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

module.exports = { createSession };
