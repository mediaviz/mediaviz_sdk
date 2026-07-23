// Auto-generated — do not edit
import { Company } from '../../javascript/company.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Company', () => {
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

  it('updateCompanyPhotoUrlAllowlist — exists', () => {
    const company = new Company({});
    expect(typeof company.updateCompanyPhotoUrlAllowlist).toBe('function');
  });

  it('updateCompanyPhotoUrlAllowlist — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.updateCompanyPhotoUrlAllowlist(42, ['item1', 'item2']);
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateCompanyPhotoUrlAllowlist — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.updateCompanyPhotoUrlAllowlist(42, ['item1', 'item2']);
    expect(spy.last_call().path).toContain('/api/v1/company/42/photo_url_allowlist/');
  });

  it('updateCompanyPhotoUrlAllowlist — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.updateCompanyPhotoUrlAllowlist(42, ['item1', 'item2']);
    const body = spy.last_call().body;
    expect(body).toHaveProperty('photo_url_allowlist');
  });

  it('updateCompanyPhotoUrlAllowlist — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const company = new Company(ctx);
    await company.updateCompanyPhotoUrlAllowlist(42, ['item1', 'item2']);
    expect(spy.calls.length).toBe(1);
  });

});
