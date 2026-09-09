'use strict';

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

module.exports = { MemoryTokenStore, createSecureTokenStore, createKeychainTokenStore };
