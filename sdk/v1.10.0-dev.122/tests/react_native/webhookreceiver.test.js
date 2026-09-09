// Auto-generated — do not edit
import { Webhookreceiver } from '../../react_native/webhookreceiver.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('WebhookReceiver', () => {
  it('listSubscriptionEvents — exists', () => {
    const webhookreceiver = new Webhookreceiver({});
    expect(typeof webhookreceiver.listSubscriptionEvents).toBe('function');
  });

  it('listSubscriptionEvents — HTTP method is GET', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { accessToken: 'access_token', requireTokens: () => {}, requireHost: () => 'https://upload.example.com' };
    const webhookreceiver = new Webhookreceiver(ctx);
    await webhookreceiver.listSubscriptionEvents('00000000-0000-0000-0000-000000000000', { since: 'test_value', limit: 42, wait: 'test_value', includeHeavy: true });
    expect(spy.last_call().method).toBe('GET');
  });

  it('listSubscriptionEvents — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { accessToken: 'access_token', requireTokens: () => {}, requireHost: () => 'https://upload.example.com' };
    const webhookreceiver = new Webhookreceiver(ctx);
    await webhookreceiver.listSubscriptionEvents('00000000-0000-0000-0000-000000000000', { since: 'test_value', limit: 42, wait: 'test_value', includeHeavy: true });
    expect(spy.last_call().url).toContain('/api/v1/subscriptions/00000000-0000-0000-0000-000000000000/events');
  });

  it('listSubscriptionEvents — query params', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { accessToken: 'access_token', requireTokens: () => {}, requireHost: () => 'https://upload.example.com' };
    const webhookreceiver = new Webhookreceiver(ctx);
    await webhookreceiver.listSubscriptionEvents('00000000-0000-0000-0000-000000000000', { since: 'test_value', limit: 42, wait: 'test_value', includeHeavy: true });
    const url = spy.last_call().url;
    expect(url).toContain('since=');
    expect(url).toContain('limit=');
    expect(url).toContain('wait=');
    expect(url).toContain('include_heavy=');
  });

  it('listSubscriptionEvents — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { accessToken: 'access_token', requireTokens: () => {}, requireHost: () => 'https://upload.example.com' };
    const webhookreceiver = new Webhookreceiver(ctx);
    await webhookreceiver.listSubscriptionEvents('00000000-0000-0000-0000-000000000000', { since: 'test_value', limit: 42, wait: 'test_value', includeHeavy: true });
    expect(spy.calls.length).toBe(1);
  });

});
