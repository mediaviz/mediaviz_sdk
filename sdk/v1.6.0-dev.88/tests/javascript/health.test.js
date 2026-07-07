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

  it('livenessCheck — exists', () => {
    const health = new Health({});
    expect(typeof health.livenessCheck).toBe('function');
  });

  it('livenessCheck — HTTP method is GET', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const health = new Health(ctx);
    await health.livenessCheck();
    expect(spy.last_call().method).toBe('GET');
  });

  it('livenessCheck — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const health = new Health(ctx);
    await health.livenessCheck();
    expect(spy.last_call().url).toContain('/api/v1/health/live/');
  });

  it('livenessCheck — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const health = new Health(ctx);
    await health.livenessCheck();
    expect(spy.calls.length).toBe(1);
  });

  it('readinessCheck — exists', () => {
    const health = new Health({});
    expect(typeof health.readinessCheck).toBe('function');
  });

  it('readinessCheck — HTTP method is GET', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const health = new Health(ctx);
    await health.readinessCheck();
    expect(spy.last_call().method).toBe('GET');
  });

  it('readinessCheck — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const health = new Health(ctx);
    await health.readinessCheck();
    expect(spy.last_call().url).toContain('/api/v1/health/ready');
  });

  it('readinessCheck — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const health = new Health(ctx);
    await health.readinessCheck();
    expect(spy.calls.length).toBe(1);
  });

});
