// Auto-generated — do not edit
import { EmailTokens } from '../../javascript/email_tokens.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Email_Tokens', () => {
  it('requestEmailVerification — exists', () => {
    const emailTokens = new EmailTokens({});
    expect(typeof emailTokens.requestEmailVerification).toBe('function');
  });

  it('requestEmailVerification — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.requestEmailVerification({ email: 'user@example.com' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('requestEmailVerification — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.requestEmailVerification({ email: 'user@example.com' });
    expect(spy.last_call().url).toContain('/api/v1/request-email-verification');
  });

  it('requestEmailVerification — query params', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.requestEmailVerification({ email: 'user@example.com' });
    const url = spy.last_call().url;
    expect(url).toContain('email=');
  });

  it('requestEmailVerification — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.requestEmailVerification({ email: 'user@example.com' });
    expect(spy.calls.length).toBe(1);
  });

  it('verifyEmail — exists', () => {
    const emailTokens = new EmailTokens({});
    expect(typeof emailTokens.verifyEmail).toBe('function');
  });

  it('verifyEmail — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.verifyEmail('test_value');
    expect(spy.last_call().method).toBe('POST');
  });

  it('verifyEmail — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.verifyEmail('hello world');
    expect(spy.last_call().url).toContain('/api/v1/verify-email/hello%20world');
  });

  it('verifyEmail — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.verifyEmail('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('requestPasswordReset — exists', () => {
    const emailTokens = new EmailTokens({});
    expect(typeof emailTokens.requestPasswordReset).toBe('function');
  });

  it('requestPasswordReset — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.requestPasswordReset({ email: 'user@example.com' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('requestPasswordReset — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.requestPasswordReset({ email: 'user@example.com' });
    expect(spy.last_call().url).toContain('/api/v1/request-password-reset');
  });

  it('requestPasswordReset — query params', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.requestPasswordReset({ email: 'user@example.com' });
    const url = spy.last_call().url;
    expect(url).toContain('email=');
  });

  it('requestPasswordReset — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.requestPasswordReset({ email: 'user@example.com' });
    expect(spy.calls.length).toBe(1);
  });

  it('validateToken — exists', () => {
    const emailTokens = new EmailTokens({});
    expect(typeof emailTokens.validateToken).toBe('function');
  });

  it('validateToken — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.validateToken('test_value');
    expect(spy.last_call().method).toBe('POST');
  });

  it('validateToken — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.validateToken('test_value');
    expect(spy.last_call().url).toContain('/api/v1/validate-token');
  });

  it('validateToken — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.validateToken('test_value');
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('token');
  });

  it('validateToken — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.validateToken('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('resetPassword — exists', () => {
    const emailTokens = new EmailTokens({});
    expect(typeof emailTokens.resetPassword).toBe('function');
  });

  it('resetPassword — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.resetPassword('test_value', 'test_value');
    expect(spy.last_call().method).toBe('POST');
  });

  it('resetPassword — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.resetPassword('test_value', 'test_value');
    expect(spy.last_call().url).toContain('/api/v1/reset-password');
  });

  it('resetPassword — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.resetPassword('test_value', 'test_value');
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('new_password');
  });

  it('resetPassword — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.resetPassword('test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('deleteUserEmailTokens — exists', () => {
    const emailTokens = new EmailTokens({});
    expect(typeof emailTokens.deleteUserEmailTokens).toBe('function');
  });

  it('deleteUserEmailTokens — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.deleteUserEmailTokens(42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteUserEmailTokens — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.deleteUserEmailTokens(42);
    expect(spy.last_call().path).toContain('/api/v1/admin/email_tokens/by_user/42');
  });

  it('deleteUserEmailTokens — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const emailTokens = new EmailTokens(ctx);
    await emailTokens.deleteUserEmailTokens(42);
    expect(spy.calls.length).toBe(1);
  });

});
