// Auto-generated — do not edit
import { Faces } from '../../javascript/faces.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Faces', () => {
  it('getPersonPhoto — exists', () => {
    const faces = new Faces({});
    expect(typeof faces.getPersonPhoto).toBe('function');
  });

  it('getPersonPhoto — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const faces = new Faces(ctx);
    await faces.getPersonPhoto('test_value', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPersonPhoto — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const faces = new Faces(ctx);
    await faces.getPersonPhoto('hello world', 42);
    expect(spy.last_call().path).toContain('/api/v1/person/hello%20world/photo/42');
  });

  it('getPersonPhoto — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const faces = new Faces(ctx);
    await faces.getPersonPhoto('test_value', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('updatePerson — exists', () => {
    const faces = new Faces({});
    expect(typeof faces.updatePerson).toBe('function');
  });

  it('updatePerson — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const faces = new Faces(ctx);
    await faces.updatePerson('test_value', 42, { personName: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updatePerson — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const faces = new Faces(ctx);
    await faces.updatePerson('hello world', 42, { personName: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/person/hello%20world/42');
  });

  it('updatePerson — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const faces = new Faces(ctx);
    await faces.updatePerson('test_value', 42, { personName: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('person_name=');
  });

  it('updatePerson — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const faces = new Faces(ctx);
    await faces.updatePerson('test_value', 42, { personName: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getPerson — exists', () => {
    const faces = new Faces({});
    expect(typeof faces.getPerson).toBe('function');
  });

  it('getPerson — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const faces = new Faces(ctx);
    await faces.getPerson('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPerson — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const faces = new Faces(ctx);
    await faces.getPerson('hello world');
    expect(spy.last_call().path).toContain('/api/v1/person/hello%20world/');
  });

  it('getPerson — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const faces = new Faces(ctx);
    await faces.getPerson('test_value');
    expect(spy.calls.length).toBe(1);
  });

});
