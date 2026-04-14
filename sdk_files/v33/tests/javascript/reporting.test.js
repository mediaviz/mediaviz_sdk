// Auto-generated — do not edit
import { Reporting } from '../../javascript/reporting.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Reporting', () => {
  it('updateProjectUploadReport — exists', () => {
    const reporting = new Reporting({});
    expect(typeof reporting.updateProjectUploadReport).toBe('function');
  });

  it('updateProjectUploadReport — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const reporting = new Reporting(ctx);
    await reporting.updateProjectUploadReport('test_value', { skippedFileCount: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateProjectUploadReport — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const reporting = new Reporting(ctx);
    await reporting.updateProjectUploadReport('hello world', { skippedFileCount: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/project_upload_report/hello%20world/');
  });

  it('updateProjectUploadReport — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const reporting = new Reporting(ctx);
    await reporting.updateProjectUploadReport('test_value', { skippedFileCount: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('skipped_file_count=');
  });

  it('updateProjectUploadReport — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const reporting = new Reporting(ctx);
    await reporting.updateProjectUploadReport('test_value', { skippedFileCount: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
