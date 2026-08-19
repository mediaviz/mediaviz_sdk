'use strict';

const { MemoryTokenStore, createSecureTokenStore, createKeychainTokenStore } = require('../storage');

const PAIR = { accessToken: 'a-1', refreshToken: 'r-1' };

function fakeSecureStore() {
  const values = new Map();
  return {
    values,
    getItemAsync: jest.fn(async (k) => (values.has(k) ? values.get(k) : null)),
    setItemAsync: jest.fn(async (k, v) => void values.set(k, v)),
    deleteItemAsync: jest.fn(async (k) => void values.delete(k)),
  };
}

function fakeKeychain() {
  let entry = null;
  return {
    getGenericPassword: jest.fn(async () => entry),
    setGenericPassword: jest.fn(async (username, password) => {
      entry = { username, password };
    }),
    resetGenericPassword: jest.fn(async () => {
      entry = null;
    }),
  };
}

describe.each([
  ['MemoryTokenStore', () => new MemoryTokenStore()],
  ['secure store', () => createSecureTokenStore(fakeSecureStore())],
  ['keychain', () => createKeychainTokenStore(fakeKeychain())],
])('%s', (_label, make) => {
  test('loads an empty pair before anything is saved', async () => {
    await expect(make().load()).resolves.toEqual({ accessToken: null, refreshToken: null });
  });

  test('round-trips a token pair', async () => {
    const store = make();
    await store.save(PAIR);
    await expect(store.load()).resolves.toEqual(PAIR);
  });

  test('accepts the OAuth response shape (snake_case)', async () => {
    const store = make();
    await store.save({ access_token: 'a-1', refresh_token: 'r-1' });
    await expect(store.load()).resolves.toEqual(PAIR);
  });

  test('clear empties the pair', async () => {
    const store = make();
    await store.save(PAIR);
    await store.clear();
    await expect(store.load()).resolves.toEqual({ accessToken: null, refreshToken: null });
  });

  test('a client-credentials response with no refresh token stores null', async () => {
    const store = make();
    await store.save({ access_token: 'a-1' });
    await expect(store.load()).resolves.toEqual({ accessToken: 'a-1', refreshToken: null });
  });
});

describe('createSecureTokenStore', () => {
  test('rejects a module that is not expo-secure-store', () => {
    expect(() => createSecureTokenStore({})).toThrow(/expo-secure-store/);
  });

  test('keeps the two tokens under separate keys (2048-byte value cap)', async () => {
    const SecureStore = fakeSecureStore();
    await createSecureTokenStore(SecureStore).save(PAIR);
    expect([...SecureStore.values.keys()].sort()).toEqual(['mediaviz.accessToken', 'mediaviz.refreshToken']);
  });

  test('deletes rather than persisting the string "null"', async () => {
    const SecureStore = fakeSecureStore();
    const store = createSecureTokenStore(SecureStore);
    await store.save(PAIR);
    await store.save({ accessToken: 'a-2' });
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('mediaviz.refreshToken', undefined);
    expect(SecureStore.values.has('mediaviz.refreshToken')).toBe(false);
  });

  test('honours custom keys and passes through native options', async () => {
    const SecureStore = fakeSecureStore();
    const opts = { keychainAccessible: 'AFTER_FIRST_UNLOCK' };
    const store = createSecureTokenStore(SecureStore, { accessKey: 'k.a', refreshKey: 'k.r', secureStoreOptions: opts });
    await store.save(PAIR);
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('k.a', 'a-1', opts);
    await expect(store.load()).resolves.toEqual(PAIR);
  });
});

describe('createKeychainTokenStore', () => {
  test('rejects a module that is not react-native-keychain', () => {
    expect(() => createKeychainTokenStore({})).toThrow(/react-native-keychain/);
  });

  test('writes one JSON entry under the configured service', async () => {
    const Keychain = fakeKeychain();
    await createKeychainTokenStore(Keychain, { service: 'custom.svc' }).save(PAIR);
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'mediaviz',
      JSON.stringify(PAIR),
      expect.objectContaining({ service: 'custom.svc' })
    );
  });

  test('treats a false entry from the native module as empty', async () => {
    const Keychain = fakeKeychain();
    Keychain.getGenericPassword.mockResolvedValue(false);
    await expect(createKeychainTokenStore(Keychain).load()).resolves.toEqual({ accessToken: null, refreshToken: null });
  });
});
