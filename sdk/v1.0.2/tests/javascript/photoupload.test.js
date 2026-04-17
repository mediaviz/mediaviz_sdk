// Auto-generated — do not edit
import { Photoupload } from '../../javascript/photoupload.js';
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
    await photoupload.uploadPhotoToMediaviz('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', { fileContent: 'test_value', mimetype: 'test_value', filePath: 'test_value' }, { clientSideId: 'test_value', blur: 'test_value', colors: 'test_value', faceRecognition: 'test_value', imageClassification: 'test_value', imageComparison: 'test_value', size: 'test_value', sourceResolutionX: 'test_value', sourceResolutionY: 'test_value', dateTaken: 'test_value', latitude: 'test_value', longitude: 'test_value', resizedDimensions: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('uploadPhotoToMediaviz — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { accessToken: 'access_token', requireTokens: () => {}, requireHost: () => 'https://upload.example.com' };
    const photoupload = new Photoupload(ctx);
    await photoupload.uploadPhotoToMediaviz('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', { fileContent: 'test_value', mimetype: 'test_value', filePath: 'test_value' }, { clientSideId: 'test_value', blur: 'test_value', colors: 'test_value', faceRecognition: 'test_value', imageClassification: 'test_value', imageComparison: 'test_value', size: 'test_value', sourceResolutionX: 'test_value', sourceResolutionY: 'test_value', dateTaken: 'test_value', latitude: 'test_value', longitude: 'test_value', resizedDimensions: 'test_value' });
    expect(spy.last_call().url).toContain('/photo_upload');
  });

  it('uploadPhotoToMediaviz — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { accessToken: 'access_token', requireTokens: () => {}, requireHost: () => 'https://upload.example.com' };
    const photoupload = new Photoupload(ctx);
    await photoupload.uploadPhotoToMediaviz('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', { fileContent: 'test_value', mimetype: 'test_value', filePath: 'test_value' }, { clientSideId: 'test_value', blur: 'test_value', colors: 'test_value', faceRecognition: 'test_value', imageClassification: 'test_value', imageComparison: 'test_value', size: 'test_value', sourceResolutionX: 'test_value', sourceResolutionY: 'test_value', dateTaken: 'test_value', latitude: 'test_value', longitude: 'test_value', resizedDimensions: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('file_content');
    expect(body).toHaveProperty('mimetype');
    expect(body).toHaveProperty('file_path');
  });

  it('uploadPhotoToMediaviz — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { accessToken: 'access_token', requireTokens: () => {}, requireHost: () => 'https://upload.example.com' };
    const photoupload = new Photoupload(ctx);
    await photoupload.uploadPhotoToMediaviz('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', { fileContent: 'test_value', mimetype: 'test_value', filePath: 'test_value' }, { clientSideId: 'test_value', blur: 'test_value', colors: 'test_value', faceRecognition: 'test_value', imageClassification: 'test_value', imageComparison: 'test_value', size: 'test_value', sourceResolutionX: 'test_value', sourceResolutionY: 'test_value', dateTaken: 'test_value', latitude: 'test_value', longitude: 'test_value', resizedDimensions: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
