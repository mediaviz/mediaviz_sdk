'use strict';

// Crypto seam for PKCE.
//
// Defaults to WebCrypto, which covers browsers and Node >= 18. React Native's
// Hermes runtime provides neither half of what PKCE needs: there is no
// SubtleCrypto at all (so no SHA-256), and no crypto.getRandomValues without a
// polyfill. Hosts on such runtimes call configureCrypto() once at startup with
// native-backed equivalents (expo-crypto, react-native-quick-crypto).

/** @typedef {{getRandomValues: (bytes: Uint8Array) => Uint8Array, sha256: (bytes: Uint8Array) => Promise<Uint8Array>}} CryptoProvider */

let _provider = null;

/**
 * Installs a crypto provider, replacing the WebCrypto default.
 * @param {CryptoProvider} provider
 */
function configureCrypto(provider) {
  if (!provider || typeof provider.getRandomValues !== 'function' || typeof provider.sha256 !== 'function') {
    throw new TypeError(
      'configureCrypto requires { getRandomValues(bytes) => bytes, sha256(bytes) => Promise<Uint8Array> }'
    );
  }
  _provider = provider;
}

/** Restores the WebCrypto default. Primarily for tests. */
function resetCrypto() {
  _provider = null;
}

/**
 * @returns {CryptoProvider}
 */
function getCrypto() {
  return _provider ?? webCryptoProvider();
}

// helpers
function webCryptoProvider() {
  const wc = globalThis.crypto;
  // Named explicitly rather than letting a property access blow up deep inside
  // PKCE: on React Native the failure is a missing polyfill, and the message
  // has to say so.
  if (!wc || typeof wc.getRandomValues !== 'function' || !wc.subtle) {
    throw new Error(
      'No WebCrypto available in this runtime. On React Native (or any host without ' +
        'SubtleCrypto), call configureCrypto({ getRandomValues, sha256 }) before using PKCE.'
    );
  }
  return {
    getRandomValues: (bytes) => wc.getRandomValues(bytes),
    sha256: async (bytes) => new Uint8Array(await wc.subtle.digest('SHA-256', bytes)),
  };
}

module.exports = { configureCrypto, resetCrypto, getCrypto };
