// Auto-generated — do not edit
import { OauthAuthorization } from '../../javascript/oauth_authorization.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('OAuth_Authorization', () => {
  it('authorize — exists', () => {
    const oauthAuthorization = new OauthAuthorization({});
    expect(typeof oauthAuthorization.authorize).toBe('function');
  });

  it('authorize — HTTP method is GET', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthAuthorization = new OauthAuthorization(ctx);
    await oauthAuthorization.authorize({ responseType: 'test_value', clientId: 'test_value', redirectUri: 'test_value', state: 'test_value', codeChallenge: 'test_value', codeChallengeMethod: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('authorize — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthAuthorization = new OauthAuthorization(ctx);
    await oauthAuthorization.authorize({ responseType: 'test_value', clientId: 'test_value', redirectUri: 'test_value', state: 'test_value', codeChallenge: 'test_value', codeChallengeMethod: 'test_value' });
    expect(spy.last_call().url).toContain('/oauth/authorize');
  });

  it('authorize — query params', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthAuthorization = new OauthAuthorization(ctx);
    await oauthAuthorization.authorize({ responseType: 'test_value', clientId: 'test_value', redirectUri: 'test_value', state: 'test_value', codeChallenge: 'test_value', codeChallengeMethod: 'test_value' });
    const url = spy.last_call().url;
    expect(url).toContain('response_type=');
    expect(url).toContain('client_id=');
    expect(url).toContain('redirect_uri=');
    expect(url).toContain('state=');
    expect(url).toContain('code_challenge=');
    expect(url).toContain('code_challenge_method=');
  });

  it('authorize — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthAuthorization = new OauthAuthorization(ctx);
    await oauthAuthorization.authorize({ responseType: 'test_value', clientId: 'test_value', redirectUri: 'test_value', state: 'test_value', codeChallenge: 'test_value', codeChallengeMethod: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getConsent — exists', () => {
    const oauthAuthorization = new OauthAuthorization({});
    expect(typeof oauthAuthorization.getConsent).toBe('function');
  });

  it('getConsent — HTTP method is GET', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthAuthorization = new OauthAuthorization(ctx);
    await oauthAuthorization.getConsent('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getConsent — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthAuthorization = new OauthAuthorization(ctx);
    await oauthAuthorization.getConsent('test_value');
    expect(spy.last_call().url).toContain('/oauth/consent/test_value');
  });

  it('getConsent — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthAuthorization = new OauthAuthorization(ctx);
    await oauthAuthorization.getConsent('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('postApproveConsent — exists', () => {
    const oauthAuthorization = new OauthAuthorization({});
    expect(typeof oauthAuthorization.postApproveConsent).toBe('function');
  });

  it('postApproveConsent — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthAuthorization = new OauthAuthorization(ctx);
    await oauthAuthorization.postApproveConsent('test_value');
    expect(spy.last_call().method).toBe('POST');
  });

  it('postApproveConsent — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthAuthorization = new OauthAuthorization(ctx);
    await oauthAuthorization.postApproveConsent('test_value');
    expect(spy.last_call().url).toContain('/oauth/consent/test_value/approve');
  });

  it('postApproveConsent — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthAuthorization = new OauthAuthorization(ctx);
    await oauthAuthorization.postApproveConsent('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('postDenyConsent — exists', () => {
    const oauthAuthorization = new OauthAuthorization({});
    expect(typeof oauthAuthorization.postDenyConsent).toBe('function');
  });

  it('postDenyConsent — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthAuthorization = new OauthAuthorization(ctx);
    await oauthAuthorization.postDenyConsent('test_value');
    expect(spy.last_call().method).toBe('POST');
  });

  it('postDenyConsent — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthAuthorization = new OauthAuthorization(ctx);
    await oauthAuthorization.postDenyConsent('test_value');
    expect(spy.last_call().url).toContain('/oauth/consent/test_value/deny');
  });

  it('postDenyConsent — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthAuthorization = new OauthAuthorization(ctx);
    await oauthAuthorization.postDenyConsent('test_value');
    expect(spy.calls.length).toBe(1);
  });

});
