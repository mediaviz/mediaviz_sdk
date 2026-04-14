// Auto-generated — do not edit
import { Moments } from '../../javascript/moments.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Moments', () => {
  it('createMoment — exists', () => {
    const moments = new Moments({});
    expect(typeof moments.createMoment).toBe('function');
  });

  it('createMoment — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.createMoment({ Model: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createMoment — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.createMoment({ Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/moments/');
  });

  it('createMoment — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.createMoment({ Model: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toBeDefined();
  });

  it('createMoment — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.createMoment({ Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getMoment — exists', () => {
    const moments = new Moments({});
    expect(typeof moments.getMoment).toBe('function');
  });

  it('getMoment — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.getMoment(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getMoment — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.getMoment(42);
    expect(spy.last_call().path).toContain('/api/v1/moments/42');
  });

  it('getMoment — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.getMoment(42);
    expect(spy.calls.length).toBe(1);
  });

  it('getUserMoments — exists', () => {
    const moments = new Moments({});
    expect(typeof moments.getUserMoments).toBe('function');
  });

  it('getUserMoments — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.getUserMoments(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getUserMoments — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.getUserMoments(42);
    expect(spy.last_call().path).toContain('/api/v1/moments/user/42');
  });

  it('getUserMoments — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.getUserMoments(42);
    expect(spy.calls.length).toBe(1);
  });

  it('updateMoment — exists', () => {
    const moments = new Moments({});
    expect(typeof moments.updateMoment).toBe('function');
  });

  it('updateMoment — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.updateMoment(42, { Model: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateMoment — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.updateMoment(42, { Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/moments/42');
  });

  it('updateMoment — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.updateMoment(42, { Model: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toBeDefined();
  });

  it('updateMoment — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.updateMoment(42, { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('deleteMoment — exists', () => {
    const moments = new Moments({});
    expect(typeof moments.deleteMoment).toBe('function');
  });

  it('deleteMoment — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.deleteMoment(42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteMoment — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.deleteMoment(42);
    expect(spy.last_call().path).toContain('/api/v1/moments/42');
  });

  it('deleteMoment — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const moments = new Moments(ctx);
    await moments.deleteMoment(42);
    expect(spy.calls.length).toBe(1);
  });

});
