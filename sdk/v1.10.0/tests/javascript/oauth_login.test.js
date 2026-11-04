// Auto-generated — do not edit
import { OauthLogin } from '../../javascript/oauth_login.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Oauth_Login', () => {
  it('getLogin — exists', () => {
    const oauthLogin = new OauthLogin({});
    expect(typeof oauthLogin.getLogin).toBe('function');
  });

  it('getLogin — HTTP method is GET', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthLogin = new OauthLogin(ctx);
    await oauthLogin.getLogin({ next: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getLogin — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthLogin = new OauthLogin(ctx);
    await oauthLogin.getLogin({ next: 'test_value' });
    expect(spy.last_call().url).toContain('/api/v1/oauth/login');
  });

  it('getLogin — query params', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthLogin = new OauthLogin(ctx);
    await oauthLogin.getLogin({ next: 'test_value' });
    const url = spy.last_call().url;
    expect(url).toContain('next=');
  });

  it('getLogin — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthLogin = new OauthLogin(ctx);
    await oauthLogin.getLogin({ next: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('postLogin — exists', () => {
    const oauthLogin = new OauthLogin({});
    expect(typeof oauthLogin.postLogin).toBe('function');
  });

  it('postLogin — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthLogin = new OauthLogin(ctx);
    await oauthLogin.postLogin({ email: 'test_value', password: 'test_value', next: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('postLogin — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthLogin = new OauthLogin(ctx);
    await oauthLogin.postLogin({ email: 'test_value', password: 'test_value', next: 'test_value' });
    expect(spy.last_call().url).toContain('/api/v1/oauth/login');
  });

  it('postLogin — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthLogin = new OauthLogin(ctx);
    await oauthLogin.postLogin({ email: 'test_value', password: 'test_value', next: 'test_value' });
    const body = Object.fromEntries(new URLSearchParams(spy.last_call().body));
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('password');
    expect(body).toHaveProperty('next');
  });

  it('postLogin — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const oauthLogin = new OauthLogin(ctx);
    await oauthLogin.postLogin({ email: 'test_value', password: 'test_value', next: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
