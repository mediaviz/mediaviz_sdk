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
    await oauthClients.createClient({ Model: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createClient — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.createClient({ Model: 'test_value' });
    expect(spy.last_call().path).toContain('/oauth/clients');
  });

  it('createClient — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.createClient({ Model: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toBeDefined();
  });

  it('createClient — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const oauthClients = new OauthClients(ctx);
    await oauthClients.createClient({ Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
