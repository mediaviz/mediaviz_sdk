// Auto-generated — do not edit
import { getAccessTokenLogin, invalidateTokenLogout } from '../../javascript/token.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Token', () => {
  it('getAccessTokenLogin — exists', () => {
    expect(typeof getAccessTokenLogin).toBe('function');
  });

  it('getAccessTokenLogin — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await getAccessTokenLogin('https://api.example.com', { username: 'test_value', password: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('getAccessTokenLogin — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await getAccessTokenLogin('https://api.example.com', { username: 'test_value', password: 'test_value' });
    expect(spy.last_call().url).toContain('/api/v1/token/');
  });

  it('getAccessTokenLogin — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await getAccessTokenLogin('https://api.example.com', { username: 'test_value', password: 'test_value' });
    const body = Object.fromEntries(new URLSearchParams(spy.last_call().body));
    expect(body).toHaveProperty('username');
    expect(body).toHaveProperty('password');
  });

  it('getAccessTokenLogin — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await getAccessTokenLogin('https://api.example.com', { username: 'test_value', password: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('invalidateTokenLogout — exists', () => {
    expect(typeof invalidateTokenLogout).toBe('function');
  });

  it('invalidateTokenLogout — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await invalidateTokenLogout(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().method).toBe('POST');
  });

  it('invalidateTokenLogout — path construction', async () => {
    const spy = new SpyOAuthClient();
    await invalidateTokenLogout(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().path).toContain('/api/v1/logout');
  });

  it('invalidateTokenLogout — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await invalidateTokenLogout(spy, 'access_token', 'refresh_token');
    expect(spy.calls.length).toBe(1);
  });

});
