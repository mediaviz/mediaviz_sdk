// Auto-generated — do not edit
import { getPhotosProjectUploadStatus } from '../../javascript/status.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Status', () => {
  it('getPhotosProjectUploadStatus — exists', () => {
    expect(typeof getPhotosProjectUploadStatus).toBe('function');
  });

  it('getPhotosProjectUploadStatus — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosProjectUploadStatus(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPhotosProjectUploadStatus — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosProjectUploadStatus(spy, 'access_token', 'refresh_token', 'hello world', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/photos_project/hello%20world/upload_status/test_value');
  });

  it('getPhotosProjectUploadStatus — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosProjectUploadStatus(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

});
