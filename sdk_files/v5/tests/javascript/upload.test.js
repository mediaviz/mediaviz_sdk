// Auto-generated — do not edit
import { createUpload } from '../../javascript/upload.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Upload', () => {
  it('createUpload — exists', () => {
    expect(typeof createUpload).toBe('function');
  });

  it('createUpload — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createUpload(spy, 'access_token', 'refresh_token', { fileContent: 'test_value', mimetype: 'test_value', filePath: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createUpload — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createUpload(spy, 'access_token', 'refresh_token', { fileContent: 'test_value', mimetype: 'test_value', filePath: 'test_value' });
    expect(spy.last_call().path).toContain('/upload');
  });

  it('createUpload — request body', async () => {
    const spy = new SpyOAuthClient();
    await createUpload(spy, 'access_token', 'refresh_token', { fileContent: 'test_value', mimetype: 'test_value', filePath: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('file_content');
    expect(body).toHaveProperty('mimetype');
    expect(body).toHaveProperty('file_path');
  });

  it('createUpload — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createUpload(spy, 'access_token', 'refresh_token', { fileContent: 'test_value', mimetype: 'test_value', filePath: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
