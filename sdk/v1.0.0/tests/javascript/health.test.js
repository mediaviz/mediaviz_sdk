// Auto-generated — do not edit
import { Health } from '../../javascript/health.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Health', () => {
  it('healthCheck — exists', () => {
    const health = new Health({});
    expect(typeof health.healthCheck).toBe('function');
  });

  it('healthCheck — HTTP method is GET', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const health = new Health(ctx);
    await health.healthCheck();
    expect(spy.last_call().method).toBe('GET');
  });

  it('healthCheck — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const health = new Health(ctx);
    await health.healthCheck();
    expect(spy.last_call().url).toContain('/api/v1/health/');
  });

  it('healthCheck — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const health = new Health(ctx);
    await health.healthCheck();
    expect(spy.calls.length).toBe(1);
  });

});
