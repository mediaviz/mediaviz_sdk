// Auto-generated — do not edit
import { Admin } from '../../react_native/admin.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Admin', () => {
  it('getCategoryLabels — exists', () => {
    const admin = new Admin({});
    expect(typeof admin.getCategoryLabels).toBe('function');
  });

  it('getCategoryLabels — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.getCategoryLabels('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCategoryLabels — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.getCategoryLabels('hello world');
    expect(spy.last_call().path).toContain('/api/v1/admin/category_labels/hello%20world');
  });

  it('getCategoryLabels — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.getCategoryLabels('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('adminSetCompanyCanManageApiClients — exists', () => {
    const admin = new Admin({});
    expect(typeof admin.adminSetCompanyCanManageApiClients).toBe('function');
  });

  it('adminSetCompanyCanManageApiClients — HTTP method is PATCH', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminSetCompanyCanManageApiClients(42, true);
    expect(spy.last_call().method).toBe('PATCH');
  });

  it('adminSetCompanyCanManageApiClients — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminSetCompanyCanManageApiClients(42, true);
    expect(spy.last_call().path).toContain('/api/v1/admin/companies/42/can_manage_api_clients');
  });

  it('adminSetCompanyCanManageApiClients — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminSetCompanyCanManageApiClients(42, true);
    const body = spy.last_call().body;
    expect(body).toHaveProperty('can_manage_api_clients');
  });

  it('adminSetCompanyCanManageApiClients — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminSetCompanyCanManageApiClients(42, true);
    expect(spy.calls.length).toBe(1);
  });

});
