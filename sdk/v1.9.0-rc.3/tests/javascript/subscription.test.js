// Auto-generated — do not edit
import { Subscription } from '../../javascript/subscription.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Subscription', () => {
  it('createSubscription — exists', () => {
    const subscription = new Subscription({});
    expect(typeof subscription.createSubscription).toBe('function');
  });

  it('createSubscription — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.createSubscription('test_value', 'test_value', ['item1', 'item2']);
    expect(spy.last_call().method).toBe('POST');
  });

  it('createSubscription — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.createSubscription('test_value', 'test_value', ['item1', 'item2']);
    expect(spy.last_call().path).toContain('/api/v1/subscriptions');
  });

  it('createSubscription — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.createSubscription('test_value', 'test_value', ['item1', 'item2']);
    const body = spy.last_call().body;
    expect(body).toHaveProperty('project_table_name');
    expect(body).toHaveProperty('callback_url');
    expect(body).toHaveProperty('targets');
  });

  it('createSubscription — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.createSubscription('test_value', 'test_value', ['item1', 'item2']);
    expect(spy.calls.length).toBe(1);
  });

  it('verifySubscription — exists', () => {
    const subscription = new Subscription({});
    expect(typeof subscription.verifySubscription).toBe('function');
  });

  it('verifySubscription — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.verifySubscription('00000000-0000-0000-0000-000000000000');
    expect(spy.last_call().method).toBe('POST');
  });

  it('verifySubscription — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.verifySubscription('00000000-0000-0000-0000-000000000000');
    expect(spy.last_call().path).toContain('/api/v1/subscriptions/00000000-0000-0000-0000-000000000000/verify');
  });

  it('verifySubscription — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.verifySubscription('00000000-0000-0000-0000-000000000000');
    expect(spy.calls.length).toBe(1);
  });

  it('listSubscriptions — exists', () => {
    const subscription = new Subscription({});
    expect(typeof subscription.listSubscriptions).toBe('function');
  });

  it('listSubscriptions — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.listSubscriptions();
    expect(spy.last_call().method).toBe('GET');
  });

  it('listSubscriptions — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.listSubscriptions();
    expect(spy.last_call().path).toContain('/api/v1/subscriptions');
  });

  it('listSubscriptions — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.listSubscriptions();
    expect(spy.calls.length).toBe(1);
  });

  it('listSubscriptionEvents — exists', () => {
    const subscription = new Subscription({});
    expect(typeof subscription.listSubscriptionEvents).toBe('function');
  });

  it('listSubscriptionEvents — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.listSubscriptionEvents('00000000-0000-0000-0000-000000000000', { since: 'test_value', limit: 42 });
    expect(spy.last_call().method).toBe('GET');
  });

  it('listSubscriptionEvents — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.listSubscriptionEvents('00000000-0000-0000-0000-000000000000', { since: 'test_value', limit: 42 });
    expect(spy.last_call().path).toContain('/api/v1/subscriptions/00000000-0000-0000-0000-000000000000/events');
  });

  it('listSubscriptionEvents — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.listSubscriptionEvents('00000000-0000-0000-0000-000000000000', { since: 'test_value', limit: 42 });
    const path = spy.last_call().path;
    expect(path).toContain('since=');
    expect(path).toContain('limit=');
  });

  it('listSubscriptionEvents — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.listSubscriptionEvents('00000000-0000-0000-0000-000000000000', { since: 'test_value', limit: 42 });
    expect(spy.calls.length).toBe(1);
  });

  it('updateSubscription — exists', () => {
    const subscription = new Subscription({});
    expect(typeof subscription.updateSubscription).toBe('function');
  });

  it('updateSubscription — HTTP method is PATCH', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.updateSubscription('00000000-0000-0000-0000-000000000000', { callbackUrl: 'test_value', targets: ['item1', 'item2'] });
    expect(spy.last_call().method).toBe('PATCH');
  });

  it('updateSubscription — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.updateSubscription('00000000-0000-0000-0000-000000000000', { callbackUrl: 'test_value', targets: ['item1', 'item2'] });
    expect(spy.last_call().path).toContain('/api/v1/subscriptions/00000000-0000-0000-0000-000000000000');
  });

  it('updateSubscription — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.updateSubscription('00000000-0000-0000-0000-000000000000', { callbackUrl: 'test_value', targets: ['item1', 'item2'] });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('callback_url');
    expect(body).toHaveProperty('targets');
  });

  it('updateSubscription — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.updateSubscription('00000000-0000-0000-0000-000000000000', { callbackUrl: 'test_value', targets: ['item1', 'item2'] });
    expect(spy.calls.length).toBe(1);
  });

  it('deleteSubscription — exists', () => {
    const subscription = new Subscription({});
    expect(typeof subscription.deleteSubscription).toBe('function');
  });

  it('deleteSubscription — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.deleteSubscription('00000000-0000-0000-0000-000000000000');
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteSubscription — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.deleteSubscription('00000000-0000-0000-0000-000000000000');
    expect(spy.last_call().path).toContain('/api/v1/subscriptions/00000000-0000-0000-0000-000000000000');
  });

  it('deleteSubscription — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.deleteSubscription('00000000-0000-0000-0000-000000000000');
    expect(spy.calls.length).toBe(1);
  });

  it('rotateSubscriptionSecret — exists', () => {
    const subscription = new Subscription({});
    expect(typeof subscription.rotateSubscriptionSecret).toBe('function');
  });

  it('rotateSubscriptionSecret — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.rotateSubscriptionSecret('00000000-0000-0000-0000-000000000000');
    expect(spy.last_call().method).toBe('POST');
  });

  it('rotateSubscriptionSecret — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.rotateSubscriptionSecret('00000000-0000-0000-0000-000000000000');
    expect(spy.last_call().path).toContain('/api/v1/subscriptions/00000000-0000-0000-0000-000000000000/rotate_secret');
  });

  it('rotateSubscriptionSecret — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const subscription = new Subscription(ctx);
    await subscription.rotateSubscriptionSecret('00000000-0000-0000-0000-000000000000');
    expect(spy.calls.length).toBe(1);
  });

});
