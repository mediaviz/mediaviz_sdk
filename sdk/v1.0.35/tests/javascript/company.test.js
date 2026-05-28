// Auto-generated — do not edit
import { Company } from '../../javascript/company.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Company', () => {
  it('getAllCompanies — exists', () => {
    const company = new Company({});
    expect(typeof company.getAllCompanies).toBe('function');
  });

  it('getAllCompanies — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.getAllCompanies();
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllCompanies — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.getAllCompanies();
    expect(spy.last_call().path).toContain('/api/v1/company/');
  });

  it('getAllCompanies — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.getAllCompanies();
    expect(spy.calls.length).toBe(1);
  });

  it('getCompanyById — exists', () => {
    const company = new Company({});
    expect(typeof company.getCompanyById).toBe('function');
  });

  it('getCompanyById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.getCompanyById(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCompanyById — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.getCompanyById(42);
    expect(spy.last_call().path).toContain('/api/v1/company/42');
  });

  it('getCompanyById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.getCompanyById(42);
    expect(spy.calls.length).toBe(1);
  });

  it('confirmCompanyCreditBalance — exists', () => {
    const company = new Company({});
    expect(typeof company.confirmCompanyCreditBalance).toBe('function');
  });

  it('confirmCompanyCreditBalance — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.confirmCompanyCreditBalance(42, { photoCount: 42, modelsList: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('confirmCompanyCreditBalance — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.confirmCompanyCreditBalance(42, { photoCount: 42, modelsList: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/company/credit_balance/42');
  });

  it('confirmCompanyCreditBalance — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.confirmCompanyCreditBalance(42, { photoCount: 42, modelsList: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('photo_count=');
    expect(path).toContain('models_list=');
  });

  it('confirmCompanyCreditBalance — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.confirmCompanyCreditBalance(42, { photoCount: 42, modelsList: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('adminListActiveCompanyTokens — exists', () => {
    const company = new Company({});
    expect(typeof company.adminListActiveCompanyTokens).toBe('function');
  });

  it('adminListActiveCompanyTokens — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.adminListActiveCompanyTokens();
    expect(spy.last_call().method).toBe('GET');
  });

  it('adminListActiveCompanyTokens — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.adminListActiveCompanyTokens();
    expect(spy.last_call().path).toContain('/api/v1/company/admin_create/');
  });

  it('adminListActiveCompanyTokens — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.adminListActiveCompanyTokens();
    expect(spy.calls.length).toBe(1);
  });

  it('adminCreateCompanyToken — exists', () => {
    const company = new Company({});
    expect(typeof company.adminCreateCompanyToken).toBe('function');
  });

  it('adminCreateCompanyToken — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.adminCreateCompanyToken({ email: 'user@example.com' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('adminCreateCompanyToken — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.adminCreateCompanyToken({ email: 'user@example.com' });
    expect(spy.last_call().path).toContain('/api/v1/company/admin_create/');
  });

  it('adminCreateCompanyToken — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.adminCreateCompanyToken({ email: 'user@example.com' });
    const path = spy.last_call().path;
    expect(path).toContain('email=');
  });

  it('adminCreateCompanyToken — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.adminCreateCompanyToken({ email: 'user@example.com' });
    expect(spy.calls.length).toBe(1);
  });

  it('adminRevokeCompanyToken — exists', () => {
    const company = new Company({});
    expect(typeof company.adminRevokeCompanyToken).toBe('function');
  });

  it('adminRevokeCompanyToken — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.adminRevokeCompanyToken(42);
    expect(spy.last_call().method).toBe('POST');
  });

  it('adminRevokeCompanyToken — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.adminRevokeCompanyToken(42);
    expect(spy.last_call().path).toContain('/api/v1/company/admin_create/42/revoke/');
  });

  it('adminRevokeCompanyToken — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.adminRevokeCompanyToken(42);
    expect(spy.calls.length).toBe(1);
  });

});
