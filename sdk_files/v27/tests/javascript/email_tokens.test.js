// Auto-generated — do not edit
import { requestPasswordReset, resetPassword } from '../../javascript/email_tokens.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Email_Tokens', () => {
  it('requestPasswordReset — exists', () => {
    expect(typeof requestPasswordReset).toBe('function');
  });

  it('requestPasswordReset — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await requestPasswordReset('https://api.example.com', { Model: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('requestPasswordReset — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await requestPasswordReset('https://api.example.com', { Model: 'test_value' });
    expect(spy.last_call().url).toContain('/api/v1/request-password-reset');
  });

  it('requestPasswordReset — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await requestPasswordReset('https://api.example.com', { Model: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toBeDefined();
  });

  it('requestPasswordReset — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await requestPasswordReset('https://api.example.com', { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('resetPassword — exists', () => {
    expect(typeof resetPassword).toBe('function');
  });

  it('resetPassword — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await resetPassword('https://api.example.com', { Model: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('resetPassword — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await resetPassword('https://api.example.com', { Model: 'test_value' });
    expect(spy.last_call().url).toContain('/api/v1/reset-password');
  });

  it('resetPassword — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await resetPassword('https://api.example.com', { Model: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toBeDefined();
  });

  it('resetPassword — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await resetPassword('https://api.example.com', { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
