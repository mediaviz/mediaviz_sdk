// Auto-generated — do not edit
import { Authentication } from '../../javascript/authentication.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Authentication', () => {
  it('createToken — exists', () => {
    const authentication = new Authentication({});
    expect(typeof authentication.createToken).toBe('function');
  });

  it('createToken — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const authentication = new Authentication(ctx);
    await authentication.createToken({ username: 'test_value', password: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createToken — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const authentication = new Authentication(ctx);
    await authentication.createToken({ username: 'test_value', password: 'test_value' });
    expect(spy.last_call().url).toContain('/api/v1/token/');
  });

  it('createToken — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const authentication = new Authentication(ctx);
    await authentication.createToken({ username: 'test_value', password: 'test_value' });
    const body = Object.fromEntries(new URLSearchParams(spy.last_call().body));
    expect(body).toHaveProperty('username');
    expect(body).toHaveProperty('password');
  });

  it('createToken — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const authentication = new Authentication(ctx);
    await authentication.createToken({ username: 'test_value', password: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('createRequestPasswordReset — exists', () => {
    const authentication = new Authentication({});
    expect(typeof authentication.createRequestPasswordReset).toBe('function');
  });

  it('createRequestPasswordReset — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const authentication = new Authentication(ctx);
    await authentication.createRequestPasswordReset({ email: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createRequestPasswordReset — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const authentication = new Authentication(ctx);
    await authentication.createRequestPasswordReset({ email: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/request-password-reset');
  });

  it('createRequestPasswordReset — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const authentication = new Authentication(ctx);
    await authentication.createRequestPasswordReset({ email: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('email=');
  });

  it('createRequestPasswordReset — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const authentication = new Authentication(ctx);
    await authentication.createRequestPasswordReset({ email: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('createResetPassword — exists', () => {
    const authentication = new Authentication({});
    expect(typeof authentication.createResetPassword).toBe('function');
  });

  it('createResetPassword — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const authentication = new Authentication(ctx);
    await authentication.createResetPassword({ token: 'test_value', newPassword: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createResetPassword — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const authentication = new Authentication(ctx);
    await authentication.createResetPassword({ token: 'test_value', newPassword: 'test_value' });
    expect(spy.last_call().url).toContain('/api/v1/reset-password');
  });

  it('createResetPassword — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const authentication = new Authentication(ctx);
    await authentication.createResetPassword({ token: 'test_value', newPassword: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('new_password');
  });

  it('createResetPassword — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const authentication = new Authentication(ctx);
    await authentication.createResetPassword({ token: 'test_value', newPassword: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('refreshToken — exists', () => {
    const authentication = new Authentication({});
    expect(typeof authentication.refreshToken).toBe('function');
  });

  it('refreshToken — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const authentication = new Authentication(ctx);
    await authentication.refreshToken();
    expect(spy.last_call().method).toBe('POST');
  });

  it('refreshToken — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const authentication = new Authentication(ctx);
    await authentication.refreshToken();
    expect(spy.last_call().path).toContain('/api/v1/token/refresh');
  });

  it('refreshToken — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const authentication = new Authentication(ctx);
    await authentication.refreshToken();
    expect(spy.calls.length).toBe(1);
  });

  it('createLogout — exists', () => {
    const authentication = new Authentication({});
    expect(typeof authentication.createLogout).toBe('function');
  });

  it('createLogout — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const authentication = new Authentication(ctx);
    await authentication.createLogout();
    expect(spy.last_call().method).toBe('POST');
  });

  it('createLogout — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const authentication = new Authentication(ctx);
    await authentication.createLogout();
    expect(spy.last_call().path).toContain('/api/v1/logout');
  });

  it('createLogout — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const authentication = new Authentication(ctx);
    await authentication.createLogout();
    expect(spy.calls.length).toBe(1);
  });

  it('deleteAdminRevokeUserTokens — exists', () => {
    const authentication = new Authentication({});
    expect(typeof authentication.deleteAdminRevokeUserTokens).toBe('function');
  });

  it('deleteAdminRevokeUserTokens — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const authentication = new Authentication(ctx);
    await authentication.deleteAdminRevokeUserTokens(42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteAdminRevokeUserTokens — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const authentication = new Authentication(ctx);
    await authentication.deleteAdminRevokeUserTokens(42);
    expect(spy.last_call().path).toContain('/api/v1/admin/users/42/revoke-tokens');
  });

  it('deleteAdminRevokeUserTokens — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const authentication = new Authentication(ctx);
    await authentication.deleteAdminRevokeUserTokens(42);
    expect(spy.calls.length).toBe(1);
  });

  it('getShareauthPhp — exists', () => {
    const authentication = new Authentication({});
    expect(typeof authentication.getShareauthPhp).toBe('function');
  });

  it('getShareauthPhp — HTTP method is GET', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const authentication = new Authentication(ctx);
    await authentication.getShareauthPhp();
    expect(spy.last_call().method).toBe('GET');
  });

  it('getShareauthPhp — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const authentication = new Authentication(ctx);
    await authentication.getShareauthPhp();
    expect(spy.last_call().url).toContain('/shareAuth.php');
  });

  it('getShareauthPhp — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const authentication = new Authentication(ctx);
    await authentication.getShareauthPhp();
    expect(spy.calls.length).toBe(1);
  });

});
