// Auto-generated — do not edit
import { createHash, randomFillSync } from 'crypto';

import {
  MediaViz,
  configureCrypto,
  createCryptoProvider,
  createSession,
  MemoryTokenStore,
  startAuthSession,
  parseRedirectUrl,
} from '../../react_native/index.js';
import pkg from '../../react_native/package.json';


const nativeProvider = () =>
  createCryptoProvider({
    getRandomValues: (b) => randomFillSync(b),
    digest: async (b) => createHash('sha256').update(b).digest(),
  });

describe('React Native runtime adapters', () => {
  test.each([
    ['createCryptoProvider', createCryptoProvider],
    ['createSession', createSession],
    ['startAuthSession', startAuthSession],
    ['parseRedirectUrl', parseRedirectUrl],
    ['configureCrypto', configureCrypto],
  ])('%s is exported from the package root', (_name, fn) => {
    expect(typeof fn).toBe('function');
  });

  test('MemoryTokenStore round-trips a token pair', async () => {
    const store = new MemoryTokenStore();
    await store.save({ access_token: 'a', refresh_token: 'r' });
    await expect(store.load()).resolves.toEqual({ accessToken: 'a', refreshToken: 'r' });
  });

  test('parseRedirectUrl reads a custom-scheme redirect', () => {
    expect(parseRedirectUrl('mediaviz://cb?code=c&state=s')).toEqual({ code: 'c', state: 's' });
  });
});

describe('PKCE', () => {
  test('produces an S256 challenge once a provider is installed', async () => {
    configureCrypto(nativeProvider());
    const mv = new MediaViz({ clientId: 'cid', baseUrl: 'https://auth.example.com', redirectUri: 'mediaviz://cb' });
    const auth = await mv.getAuthorizationUrl();
    expect(auth.url).toContain('code_challenge_method=S256');
    expect(auth.code_verifier).toHaveLength(64);
    const expected = createHash('sha256').update(auth.code_verifier, 'ascii').digest('base64url');
    expect(auth.url).toContain(`code_challenge=${expected}`);
  });
});

describe('public-client token requests', () => {
  test('omit client_secret entirely', async () => {
    configureCrypto(nativeProvider());
    let body = null;
    global.fetch = jest.fn(async (url, init) => {
      body = init.body;
      return { ok: true, status: 200, json: async () => ({ access_token: 'at', refresh_token: 'rt' }) };
    });
    const mv = new MediaViz({ clientId: 'cid', baseUrl: 'https://auth.example.com', redirectUri: 'mediaviz://cb' });
    await mv.handleCallback('code-1', 'verifier-1');
    expect(body).toContain('client_id=cid');
    expect(body).not.toContain('client_secret');
    expect(body).not.toContain('undefined');
  });
});

describe('package manifest', () => {
  test('declares the Metro resolution field', () => {
    expect(pkg['react-native']).toBe('./dist/sdk.esm.js');
    expect(pkg.exports['.']['react-native']).toBe('./dist/sdk.esm.js');
  });

  test('exposes the React bindings on a subpath', () => {
    expect(pkg.exports['./react']['react-native']).toBe('./dist/react.esm.js');
    expect(pkg.exports['./react'].import.types).toBe('./dist/react.d.ts');
  });

  test('declares react and react-native as peers, not dependencies', () => {
    expect(pkg.peerDependencies).toHaveProperty('react');
    expect(pkg.peerDependencies).toHaveProperty('react-native');
    expect(pkg.dependencies).toBeUndefined();
  });

  test('ships no browser or UMD entry', () => {
    expect(pkg.browser).toBeUndefined();
    expect(JSON.stringify(pkg)).not.toContain('umd');
  });

  test('does not drag in sharp (a native Node image library)', () => {
    expect(pkg.optionalDependencies).toBeUndefined();
  });
});
