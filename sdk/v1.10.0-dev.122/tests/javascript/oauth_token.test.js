// Auto-generated — do not edit
import { OauthToken } from '../../javascript/oauth_token.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('OAuth_Token', () => {
  it('token — exists', () => {
    const oauthToken = new OauthToken({});
    expect(typeof oauthToken.token).toBe('function');
  });

  it('token — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthToken = new OauthToken(ctx);
    await oauthToken.token({ grantType: 'test_value', code: 'test_value', redirectUri: 'test_value', clientId: 'test_value', codeVerifier: 'test_value', refreshToken: 'test_value', clientSecret: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('token — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthToken = new OauthToken(ctx);
    await oauthToken.token({ grantType: 'test_value', code: 'test_value', redirectUri: 'test_value', clientId: 'test_value', codeVerifier: 'test_value', refreshToken: 'test_value', clientSecret: 'test_value' });
    expect(spy.last_call().url).toContain('/oauth/token');
  });

  it('token — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthToken = new OauthToken(ctx);
    await oauthToken.token({ grantType: 'test_value', code: 'test_value', redirectUri: 'test_value', clientId: 'test_value', codeVerifier: 'test_value', refreshToken: 'test_value', clientSecret: 'test_value' });
    const body = Object.fromEntries(new URLSearchParams(spy.last_call().body));
    expect(body).toHaveProperty('grant_type');
    expect(body).toHaveProperty('code');
    expect(body).toHaveProperty('redirect_uri');
    expect(body).toHaveProperty('client_id');
    expect(body).toHaveProperty('code_verifier');
    expect(body).toHaveProperty('refresh_token');
    expect(body).toHaveProperty('client_secret');
  });

  it('token — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthToken = new OauthToken(ctx);
    await oauthToken.token({ grantType: 'test_value', code: 'test_value', redirectUri: 'test_value', clientId: 'test_value', codeVerifier: 'test_value', refreshToken: 'test_value', clientSecret: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('adminRevokeUserTokens — exists', () => {
    const oauthToken = new OauthToken({});
    expect(typeof oauthToken.adminRevokeUserTokens).toBe('function');
  });

  it('adminRevokeUserTokens — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthToken = new OauthToken(ctx);
    await oauthToken.adminRevokeUserTokens(42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('adminRevokeUserTokens — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthToken = new OauthToken(ctx);
    await oauthToken.adminRevokeUserTokens(42);
    expect(spy.last_call().path).toContain('/oauth/admin/users/42/revoke-tokens');
  });

  it('adminRevokeUserTokens — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthToken = new OauthToken(ctx);
    await oauthToken.adminRevokeUserTokens(42);
    expect(spy.calls.length).toBe(1);
  });

  it('revoke — exists', () => {
    const oauthToken = new OauthToken({});
    expect(typeof oauthToken.revoke).toBe('function');
  });

  it('revoke — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthToken = new OauthToken(ctx);
    await oauthToken.revoke({ token: 'test_value', tokenTypeHint: 'test_value', clientId: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('revoke — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthToken = new OauthToken(ctx);
    await oauthToken.revoke({ token: 'test_value', tokenTypeHint: 'test_value', clientId: 'test_value' });
    expect(spy.last_call().url).toContain('/oauth/revoke');
  });

  it('revoke — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthToken = new OauthToken(ctx);
    await oauthToken.revoke({ token: 'test_value', tokenTypeHint: 'test_value', clientId: 'test_value' });
    const body = Object.fromEntries(new URLSearchParams(spy.last_call().body));
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('token_type_hint');
    expect(body).toHaveProperty('client_id');
  });

  it('revoke — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthToken = new OauthToken(ctx);
    await oauthToken.revoke({ token: 'test_value', tokenTypeHint: 'test_value', clientId: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
