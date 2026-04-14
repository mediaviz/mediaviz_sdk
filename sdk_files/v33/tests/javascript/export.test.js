// Auto-generated — do not edit
import { Export } from '../../javascript/export.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Export', () => {
  it('getProjectsUploadStatusDataExportService — exists', () => {
    const export_ = new Export({});
    expect(typeof export_.getProjectsUploadStatusDataExportService).toBe('function');
  });

  it('getProjectsUploadStatusDataExportService — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const export_ = new Export(ctx);
    await export_.getProjectsUploadStatusDataExportService('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsUploadStatusDataExportService — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const export_ = new Export(ctx);
    await export_.getProjectsUploadStatusDataExportService('hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects/hello%20world/upload_status/data_export_service');
  });

  it('getProjectsUploadStatusDataExportService — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const export_ = new Export(ctx);
    await export_.getProjectsUploadStatusDataExportService('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectsExport — exists', () => {
    const export_ = new Export({});
    expect(typeof export_.getProjectsExport).toBe('function');
  });

  it('getProjectsExport — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const export_ = new Export(ctx);
    await export_.getProjectsExport('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsExport — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const export_ = new Export(ctx);
    await export_.getProjectsExport('hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_export/hello%20world');
  });

  it('getProjectsExport — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const export_ = new Export(ctx);
    await export_.getProjectsExport('test_value');
    expect(spy.calls.length).toBe(1);
  });

});
