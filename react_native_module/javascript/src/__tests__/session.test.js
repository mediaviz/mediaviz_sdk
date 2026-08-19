'use strict';

const { createSession } = require('../session');
const { MemoryTokenStore } = require('../storage');

const TOKENS = { access_token: 'a-new', refresh_token: 'r-new' };

// Stand-in for the generated MediaViz client: records construction config and
// token writes, and lets a test fire the OAuth layer's rotation callback.
function FakeMediaViz(config) {
  this.config = config;
  this.tokens = { accessToken: null, refreshToken: null };
  this.setTokens = jest.fn((accessToken, refreshToken) => {
    this.tokens = { accessToken, refreshToken };
  });
  this.getAuthorizationUrl = jest.fn(async (state) => ({
    url: 'https://auth.example.com/oauth/authorize',
    state: state ?? 'st-1',
    code_verifier: 'ver-1',
  }));
  this.handleCallback = jest.fn(async () => TOKENS);
  FakeMediaViz.last = this;
}

const openOk = (state = 'st-1') => async () => ({ type: 'success', url: `mediaviz://cb?code=c-1&state=${state}` });

const baseOptions = (over = {}) => ({
  MediaViz: FakeMediaViz,
  config: { clientId: 'cid', redirectUri: 'mediaviz://cb' },
  openAuthSession: openOk(),
  ...over,
});

describe('createSession', () => {
  test('requires the MediaViz class', () => {
    expect(() => createSession({})).toThrow(TypeError);
  });

  test('passes config through to the client', () => {
    const session = createSession(baseOptions());
    expect(session.client.config).toMatchObject({ clientId: 'cid', redirectUri: 'mediaviz://cb' });
  });

  test('defaults to an in-memory store', () => {
    expect(createSession(baseOptions()).store).toBeInstanceOf(MemoryTokenStore);
  });
});

describe('restore', () => {
  test('loads persisted tokens into the client', async () => {
    const store = new MemoryTokenStore();
    await store.save({ accessToken: 'a-1', refreshToken: 'r-1' });
    const onTokens = jest.fn();
    const session = createSession(baseOptions({ store, onTokens }));

    await expect(session.restore()).resolves.toEqual({ accessToken: 'a-1', refreshToken: 'r-1' });
    expect(session.client.setTokens).toHaveBeenCalledWith('a-1', 'r-1');
    expect(onTokens).toHaveBeenCalledWith({ accessToken: 'a-1', refreshToken: 'r-1' });
  });

  test('returns null and touches nothing when the store is empty', async () => {
    const session = createSession(baseOptions());
    await expect(session.restore()).resolves.toBeNull();
    expect(session.client.setTokens).not.toHaveBeenCalled();
  });

  test('survives a failing store read', async () => {
    const store = { load: async () => { throw new Error('keychain locked'); } };
    await expect(createSession(baseOptions({ store })).restore()).resolves.toBeNull();
  });

  test('ignores a stored refresh token with no access token', async () => {
    const store = { load: async () => ({ accessToken: null, refreshToken: 'r-1' }) };
    await expect(createSession(baseOptions({ store })).restore()).resolves.toBeNull();
  });
});

describe('token rotation', () => {
  test('persists rotated tokens the moment the OAuth layer reports them', async () => {
    const store = new MemoryTokenStore();
    const onTokens = jest.fn();
    const session = createSession(baseOptions({ store, onTokens }));

    session.client.config.onTokenRefresh(TOKENS);

    expect(onTokens).toHaveBeenCalledWith(TOKENS);
    await Promise.resolve();
    await expect(store.load()).resolves.toEqual({ accessToken: 'a-new', refreshToken: 'r-new' });
  });

  test('a failing store write does not reject into the in-flight request', async () => {
    const store = { save: async () => { throw new Error('disk full'); }, load: async () => null, clear: async () => {} };
    const session = createSession(baseOptions({ store }));
    expect(() => session.client.config.onTokenRefresh(TOKENS)).not.toThrow();
    await Promise.resolve();
  });
});

describe('signIn', () => {
  test('runs the flow, persists, and reports the tokens', async () => {
    const store = new MemoryTokenStore();
    const onTokens = jest.fn();
    const session = createSession(baseOptions({ store, onTokens }));

    await expect(session.signIn()).resolves.toEqual(TOKENS);
    expect(session.client.handleCallback).toHaveBeenCalledWith('c-1', 'ver-1');
    await expect(store.load()).resolves.toEqual({ accessToken: 'a-new', refreshToken: 'r-new' });
    expect(onTokens).toHaveBeenCalledWith(TOKENS);
  });

  test('takes redirectUri from config when not overridden', async () => {
    const open = jest.fn(openOk());
    await createSession(baseOptions({ openAuthSession: open })).signIn();
    expect(open).toHaveBeenCalledWith(expect.any(String), 'mediaviz://cb', undefined);
  });

  test('per-call overrides beat the provider defaults', async () => {
    const override = jest.fn(openOk('st-9'));
    const session = createSession(baseOptions());
    await session.signIn({ openAuthSession: override, redirectUri: 'other://cb', state: 'st-9' });
    expect(override).toHaveBeenCalledWith(expect.any(String), 'other://cb', undefined);
    expect(session.client.getAuthorizationUrl).toHaveBeenCalledWith('st-9');
  });

  test('does not persist anything when the user cancels', async () => {
    const store = new MemoryTokenStore();
    const session = createSession(baseOptions({ store, openAuthSession: async () => ({ type: 'cancel' }) }));
    await expect(session.signIn()).rejects.toMatchObject({ code: 'cancelled' });
    await expect(store.load()).resolves.toEqual({ accessToken: null, refreshToken: null });
  });
});

describe('signOut', () => {
  test('clears the client and the store', async () => {
    const store = new MemoryTokenStore();
    await store.save({ accessToken: 'a-1', refreshToken: 'r-1' });
    const onTokens = jest.fn();
    const session = createSession(baseOptions({ store, onTokens }));

    await session.signOut();

    expect(session.client.setTokens).toHaveBeenCalledWith(null, null);
    expect(onTokens).toHaveBeenCalledWith(null);
    await expect(store.load()).resolves.toEqual({ accessToken: null, refreshToken: null });
  });
});
