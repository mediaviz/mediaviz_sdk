// Auto-generated — do not edit
import { getAdminGoogleSheetsCredentials } from '../../javascript/admin.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Admin', () => {
  it('getAdminGoogleSheetsCredentials — exists', () => {
    expect(typeof getAdminGoogleSheetsCredentials).toBe('function');
  });

  it('getAdminGoogleSheetsCredentials — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await getAdminGoogleSheetsCredentials(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().method).toBe('POST');
  });

  it('getAdminGoogleSheetsCredentials — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getAdminGoogleSheetsCredentials(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().path).toContain('/api/v1/admin/get_google_sheets_credentials');
  });

  it('getAdminGoogleSheetsCredentials — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getAdminGoogleSheetsCredentials(spy, 'access_token', 'refresh_token');
    expect(spy.calls.length).toBe(1);
  });

});
