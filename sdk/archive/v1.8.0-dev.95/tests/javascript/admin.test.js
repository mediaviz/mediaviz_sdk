// Auto-generated — do not edit
import { Admin } from '../../javascript/admin.js';
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

});
