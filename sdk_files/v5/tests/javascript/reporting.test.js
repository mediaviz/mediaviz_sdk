// Auto-generated — do not edit
import { updateProjectUploadReport } from '../../javascript/reporting.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Reporting', () => {
  it('updateProjectUploadReport — exists', () => {
    expect(typeof updateProjectUploadReport).toBe('function');
  });

  it('updateProjectUploadReport — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectUploadReport(spy, 'access_token', 'refresh_token', 'test_value', { skippedFileCount: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateProjectUploadReport — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectUploadReport(spy, 'access_token', 'refresh_token', 'hello world', { skippedFileCount: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/project_upload_report/hello%20world/');
  });

  it('updateProjectUploadReport — query params', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectUploadReport(spy, 'access_token', 'refresh_token', 'test_value', { skippedFileCount: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('skipped_file_count=');
  });

  it('updateProjectUploadReport — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectUploadReport(spy, 'access_token', 'refresh_token', 'test_value', { skippedFileCount: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
