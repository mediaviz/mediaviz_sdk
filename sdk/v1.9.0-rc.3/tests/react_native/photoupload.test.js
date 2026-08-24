// Auto-generated — do not edit
import { Photoupload } from '../../react_native/photoupload.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('PhotoUpload', () => {
  it('uploadPhotoToMediaviz — exists', () => {
    const photoupload = new Photoupload({});
    expect(typeof photoupload.uploadPhotoToMediaviz).toBe('function');
  });

  it('uploadPhotoToMediaviz — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { accessToken: 'access_token', requireTokens: () => {}, requireHost: () => 'https://upload.example.com' };
    const photoupload = new Photoupload(ctx);
    await photoupload.uploadPhotoToMediaviz('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', { clientSideId: 'test_value', format: 'test_value', size: 'test_value', sourceResolutionX: 'test_value', sourceResolutionY: 'test_value', dateTaken: 'test_value', latitude: 'test_value', longitude: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('uploadPhotoToMediaviz — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { accessToken: 'access_token', requireTokens: () => {}, requireHost: () => 'https://upload.example.com' };
    const photoupload = new Photoupload(ctx);
    await photoupload.uploadPhotoToMediaviz('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', { clientSideId: 'test_value', format: 'test_value', size: 'test_value', sourceResolutionX: 'test_value', sourceResolutionY: 'test_value', dateTaken: 'test_value', latitude: 'test_value', longitude: 'test_value' });
    expect(spy.last_call().url).toContain('/photo_upload');
  });

  it('uploadPhotoToMediaviz — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { accessToken: 'access_token', requireTokens: () => {}, requireHost: () => 'https://upload.example.com' };
    const photoupload = new Photoupload(ctx);
    await photoupload.uploadPhotoToMediaviz('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', { clientSideId: 'test_value', format: 'test_value', size: 'test_value', sourceResolutionX: 'test_value', sourceResolutionY: 'test_value', dateTaken: 'test_value', latitude: 'test_value', longitude: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('file_content');
    expect(body).toHaveProperty('file_path');
    expect(body).toHaveProperty('mimetype');
    expect(body).toHaveProperty('company_id');
    expect(body).toHaveProperty('user_id');
    expect(body).toHaveProperty('project_table_name');
    expect(body).toHaveProperty('blur');
    expect(body).toHaveProperty('colors');
    expect(body).toHaveProperty('face_recognition');
    expect(body).toHaveProperty('image_classification');
    expect(body).toHaveProperty('image_comparison');
    expect(body).toHaveProperty('image_describe');
    expect(body).toHaveProperty('ocr');
    expect(body).toHaveProperty('client_side_id');
    expect(body).toHaveProperty('format');
    expect(body).toHaveProperty('size');
    expect(body).toHaveProperty('source_resolution_x');
    expect(body).toHaveProperty('source_resolution_y');
    expect(body).toHaveProperty('date_taken');
    expect(body).toHaveProperty('latitude');
    expect(body).toHaveProperty('longitude');
  });

  it('uploadPhotoToMediaviz — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { accessToken: 'access_token', requireTokens: () => {}, requireHost: () => 'https://upload.example.com' };
    const photoupload = new Photoupload(ctx);
    await photoupload.uploadPhotoToMediaviz('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', { clientSideId: 'test_value', format: 'test_value', size: 'test_value', sourceResolutionX: 'test_value', sourceResolutionY: 'test_value', dateTaken: 'test_value', latitude: 'test_value', longitude: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
