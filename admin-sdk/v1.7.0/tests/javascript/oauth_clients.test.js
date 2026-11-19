// Auto-generated — do not edit
import { OauthClients } from '../../javascript/oauth_clients.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('OAuth_Clients', () => {
  it('createClient — exists', () => {
    const oauthClients = new OauthClients({});
    expect(typeof oauthClients.createClient).toBe('function');
  });

  it('createClient — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.createClient('test_value', 'test_value', ['item1', 'item2'], true, ['item1', 'item2'], 42);
    expect(spy.last_call().method).toBe('POST');
  });

  it('createClient — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.createClient('test_value', 'test_value', ['item1', 'item2'], true, ['item1', 'item2'], 42);
    expect(spy.last_call().path).toContain('/oauth/clients');
  });

  it('createClient — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.createClient('test_value', 'test_value', ['item1', 'item2'], true, ['item1', 'item2'], 42);
    const body = spy.last_call().body;
    expect(body).toHaveProperty('client_name');
    expect(body).toHaveProperty('client_type');
    expect(body).toHaveProperty('grant_types');
    expect(body).toHaveProperty('redirect_uris');
    expect(body).toHaveProperty('is_first_party');
    expect(body).toHaveProperty('company_id');
  });

  it('createClient — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.createClient('test_value', 'test_value', ['item1', 'item2'], true, ['item1', 'item2'], 42);
    expect(spy.calls.length).toBe(1);
  });

  it('createApiCredential — exists', () => {
    const oauthClients = new OauthClients({});
    expect(typeof oauthClients.createApiCredential).toBe('function');
  });

  it('createApiCredential — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.createApiCredential('test_value');
    expect(spy.last_call().method).toBe('POST');
  });

  it('createApiCredential — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.createApiCredential('test_value');
    expect(spy.last_call().path).toContain('/oauth/clients/api-credentials');
  });

  it('createApiCredential — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.createApiCredential('test_value');
    const body = spy.last_call().body;
    expect(body).toHaveProperty('credential_name');
  });

  it('createApiCredential — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.createApiCredential('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getCompanyApiCredentials — exists', () => {
    const oauthClients = new OauthClients({});
    expect(typeof oauthClients.getCompanyApiCredentials).toBe('function');
  });

  it('getCompanyApiCredentials — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.getCompanyApiCredentials();
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCompanyApiCredentials — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.getCompanyApiCredentials();
    expect(spy.last_call().path).toContain('/oauth/clients/api-credentials');
  });

  it('getCompanyApiCredentials — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.getCompanyApiCredentials();
    expect(spy.calls.length).toBe(1);
  });

  it('revokeApiCredential — exists', () => {
    const oauthClients = new OauthClients({});
    expect(typeof oauthClients.revokeApiCredential).toBe('function');
  });

  it('revokeApiCredential — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.revokeApiCredential('test_value');
    expect(spy.last_call().method).toBe('POST');
  });

  it('revokeApiCredential — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.revokeApiCredential('hello world');
    expect(spy.last_call().path).toContain('/oauth/clients/api-credentials/hello%20world/revoke');
  });

  it('revokeApiCredential — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.revokeApiCredential('test_value');
    expect(spy.calls.length).toBe(1);
  });

});
