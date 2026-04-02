// Auto-generated — do not edit
import { createToken, createRequestPasswordReset, createResetPassword, createLogout, getShareauthPhp } from '../../javascript/authentication.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Authentication', () => {
  it('createToken — exists', () => {
    expect(typeof createToken).toBe('function');
  });

  it('createToken — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createToken('https://api.example.com', { username: 'test_value', password: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createToken — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createToken('https://api.example.com', { username: 'test_value', password: 'test_value' });
    expect(spy.last_call().url).toContain('/api/v1/token/');
  });

  it('createToken — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createToken('https://api.example.com', { username: 'test_value', password: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('username');
    expect(body).toHaveProperty('password');
  });

  it('createToken — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createToken('https://api.example.com', { username: 'test_value', password: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('createRequestPasswordReset — exists', () => {
    expect(typeof createRequestPasswordReset).toBe('function');
  });

  it('createRequestPasswordReset — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createRequestPasswordReset(spy, 'access_token', 'refresh_token', { email: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createRequestPasswordReset — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createRequestPasswordReset(spy, 'access_token', 'refresh_token', { email: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/request-password-reset');
  });

  it('createRequestPasswordReset — query params', async () => {
    const spy = new SpyOAuthClient();
    await createRequestPasswordReset(spy, 'access_token', 'refresh_token', { email: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('email=');
  });

  it('createRequestPasswordReset — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createRequestPasswordReset(spy, 'access_token', 'refresh_token', { email: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('createResetPassword — exists', () => {
    expect(typeof createResetPassword).toBe('function');
  });

  it('createResetPassword — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createResetPassword('https://api.example.com', { token: 'test_value', newPassword: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createResetPassword — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createResetPassword('https://api.example.com', { token: 'test_value', newPassword: 'test_value' });
    expect(spy.last_call().url).toContain('/api/v1/reset-password');
  });

  it('createResetPassword — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createResetPassword('https://api.example.com', { token: 'test_value', newPassword: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('new_password');
  });

  it('createResetPassword — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createResetPassword('https://api.example.com', { token: 'test_value', newPassword: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('createLogout — exists', () => {
    expect(typeof createLogout).toBe('function');
  });

  it('createLogout — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createLogout(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().method).toBe('POST');
  });

  it('createLogout — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createLogout(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().path).toContain('/api/v1/logout');
  });

  it('createLogout — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createLogout(spy, 'access_token', 'refresh_token');
    expect(spy.calls.length).toBe(1);
  });

  it('getShareauthPhp — exists', () => {
    expect(typeof getShareauthPhp).toBe('function');
  });

  it('getShareauthPhp — HTTP method is GET', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await getShareauthPhp('https://api.example.com');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getShareauthPhp — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await getShareauthPhp('https://api.example.com');
    expect(spy.last_call().url).toContain('/shareAuth.php');
  });

  it('getShareauthPhp — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await getShareauthPhp('https://api.example.com');
    expect(spy.calls.length).toBe(1);
  });

});
