// Auto-generated — do not edit
import { getProjectsUploadStatusDataExportService, getProjectsExport } from '../../javascript/export.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Export', () => {
  it('getProjectsUploadStatusDataExportService — exists', () => {
    expect(typeof getProjectsUploadStatusDataExportService).toBe('function');
  });

  it('getProjectsUploadStatusDataExportService — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsUploadStatusDataExportService(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsUploadStatusDataExportService — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsUploadStatusDataExportService(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects/hello%20world/upload_status/data_export_service');
  });

  it('getProjectsUploadStatusDataExportService — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsUploadStatusDataExportService(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectsExport — exists', () => {
    expect(typeof getProjectsExport).toBe('function');
  });

  it('getProjectsExport — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsExport(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsExport — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsExport(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_export/hello%20world');
  });

  it('getProjectsExport — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsExport(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

});
