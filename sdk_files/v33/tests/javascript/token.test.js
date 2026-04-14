// Auto-generated — do not edit
import { Token } from '../../javascript/token.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Token', () => {
  it('getAccessTokenLogin — exists', () => {
    const token = new Token({});
    expect(typeof token.getAccessTokenLogin).toBe('function');
  });

  it('getAccessTokenLogin — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const token = new Token(ctx);
    await token.getAccessTokenLogin({ username: 'test_value', password: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('getAccessTokenLogin — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const token = new Token(ctx);
    await token.getAccessTokenLogin({ username: 'test_value', password: 'test_value' });
    expect(spy.last_call().url).toContain('/api/v1/token/');
  });

  it('getAccessTokenLogin — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const token = new Token(ctx);
    await token.getAccessTokenLogin({ username: 'test_value', password: 'test_value' });
    const body = Object.fromEntries(new URLSearchParams(spy.last_call().body));
    expect(body).toHaveProperty('username');
    expect(body).toHaveProperty('password');
  });

  it('getAccessTokenLogin — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const token = new Token(ctx);
    await token.getAccessTokenLogin({ username: 'test_value', password: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getAccessTokenRefresh — exists', () => {
    const token = new Token({});
    expect(typeof token.getAccessTokenRefresh).toBe('function');
  });

  it('getAccessTokenRefresh — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const token = new Token(ctx);
    await token.getAccessTokenRefresh();
    expect(spy.last_call().method).toBe('POST');
  });

  it('getAccessTokenRefresh — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const token = new Token(ctx);
    await token.getAccessTokenRefresh();
    expect(spy.last_call().path).toContain('/api/v1/token/refresh');
  });

  it('getAccessTokenRefresh — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const token = new Token(ctx);
    await token.getAccessTokenRefresh();
    expect(spy.calls.length).toBe(1);
  });

  it('invalidateTokenLogout — exists', () => {
    const token = new Token({});
    expect(typeof token.invalidateTokenLogout).toBe('function');
  });

  it('invalidateTokenLogout — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const token = new Token(ctx);
    await token.invalidateTokenLogout();
    expect(spy.last_call().method).toBe('POST');
  });

  it('invalidateTokenLogout — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const token = new Token(ctx);
    await token.invalidateTokenLogout();
    expect(spy.last_call().path).toContain('/api/v1/logout');
  });

  it('invalidateTokenLogout — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const token = new Token(ctx);
    await token.invalidateTokenLogout();
    expect(spy.calls.length).toBe(1);
  });

  it('deleteTokensRevokeUser — exists', () => {
    const token = new Token({});
    expect(typeof token.deleteTokensRevokeUser).toBe('function');
  });

  it('deleteTokensRevokeUser — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const token = new Token(ctx);
    await token.deleteTokensRevokeUser(42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteTokensRevokeUser — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const token = new Token(ctx);
    await token.deleteTokensRevokeUser(42);
    expect(spy.last_call().path).toContain('/api/v1/admin/users/42/revoke-tokens');
  });

  it('deleteTokensRevokeUser — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const token = new Token(ctx);
    await token.deleteTokensRevokeUser(42);
    expect(spy.calls.length).toBe(1);
  });

});
