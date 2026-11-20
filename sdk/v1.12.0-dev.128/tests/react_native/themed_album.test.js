// Auto-generated — do not edit
import { ThemedAlbum } from '../../react_native/themed_album.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Themed_Album', () => {
  it('createThemedAlbum — exists', () => {
    const themedAlbum = new ThemedAlbum({});
    expect(typeof themedAlbum.createThemedAlbum).toBe('function');
  });

  it('createThemedAlbum — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.createThemedAlbum('test_value', 'test_value', 'test_value', 3.14);
    expect(spy.last_call().method).toBe('POST');
  });

  it('createThemedAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.createThemedAlbum('hello world', 'test_value', 'test_value', 3.14);
    expect(spy.last_call().path).toContain('/api/v1/themed_album/project/hello%20world');
  });

  it('createThemedAlbum — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.createThemedAlbum('test_value', 'test_value', 'test_value', 3.14);
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('confidence_value');
  });

  it('createThemedAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.createThemedAlbum('test_value', 'test_value', 'test_value', 3.14);
    expect(spy.calls.length).toBe(1);
  });

  it('getAllProjectThemedAlbums — exists', () => {
    const themedAlbum = new ThemedAlbum({});
    expect(typeof themedAlbum.getAllProjectThemedAlbums).toBe('function');
  });

  it('getAllProjectThemedAlbums — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getAllProjectThemedAlbums('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllProjectThemedAlbums — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getAllProjectThemedAlbums('hello world');
    expect(spy.last_call().path).toContain('/api/v1/themed_album/project/hello%20world');
  });

  it('getAllProjectThemedAlbums — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getAllProjectThemedAlbums('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getThemedAlbumPhotos — exists', () => {
    const themedAlbum = new ThemedAlbum({});
    expect(typeof themedAlbum.getThemedAlbumPhotos).toBe('function');
  });

  it('getThemedAlbumPhotos — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getThemedAlbumPhotos(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getThemedAlbumPhotos — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getThemedAlbumPhotos(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/themed_album/photos/42/');
  });

  it('getThemedAlbumPhotos — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getThemedAlbumPhotos(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
    expect(path).toContain('confidence_value=');
  });

  it('getThemedAlbumPhotos — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getThemedAlbumPhotos(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getThemedAlbumPhotosRanked — exists', () => {
    const themedAlbum = new ThemedAlbum({});
    expect(typeof themedAlbum.getThemedAlbumPhotosRanked).toBe('function');
  });

  it('getThemedAlbumPhotosRanked — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getThemedAlbumPhotosRanked(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getThemedAlbumPhotosRanked — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getThemedAlbumPhotosRanked(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/themed_album/photos/ranked/42/');
  });

  it('getThemedAlbumPhotosRanked — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getThemedAlbumPhotosRanked(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
    expect(path).toContain('confidence_value=');
  });

  it('getThemedAlbumPhotosRanked — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getThemedAlbumPhotosRanked(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getThemedAlbumById — exists', () => {
    const themedAlbum = new ThemedAlbum({});
    expect(typeof themedAlbum.getThemedAlbumById).toBe('function');
  });

  it('getThemedAlbumById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getThemedAlbumById(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getThemedAlbumById — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getThemedAlbumById(42);
    expect(spy.last_call().path).toContain('/api/v1/themed_album/42');
  });

  it('getThemedAlbumById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.getThemedAlbumById(42);
    expect(spy.calls.length).toBe(1);
  });

  it('updateThemedAlbum — exists', () => {
    const themedAlbum = new ThemedAlbum({});
    expect(typeof themedAlbum.updateThemedAlbum).toBe('function');
  });

  it('updateThemedAlbum — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.updateThemedAlbum(42, { name: 'test_value', description: 'test_value', confidenceValue: 3.14 });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateThemedAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.updateThemedAlbum(42, { name: 'test_value', description: 'test_value', confidenceValue: 3.14 });
    expect(spy.last_call().path).toContain('/api/v1/themed_album/42');
  });

  it('updateThemedAlbum — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.updateThemedAlbum(42, { name: 'test_value', description: 'test_value', confidenceValue: 3.14 });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('confidence_value');
  });

  it('updateThemedAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.updateThemedAlbum(42, { name: 'test_value', description: 'test_value', confidenceValue: 3.14 });
    expect(spy.calls.length).toBe(1);
  });

  it('deleteThemedAlbum — exists', () => {
    const themedAlbum = new ThemedAlbum({});
    expect(typeof themedAlbum.deleteThemedAlbum).toBe('function');
  });

  it('deleteThemedAlbum — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.deleteThemedAlbum(42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteThemedAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.deleteThemedAlbum(42);
    expect(spy.last_call().path).toContain('/api/v1/themed_album/42');
  });

  it('deleteThemedAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.deleteThemedAlbum(42);
    expect(spy.calls.length).toBe(1);
  });

  it('convertThemedAlbumToCustom — exists', () => {
    const themedAlbum = new ThemedAlbum({});
    expect(typeof themedAlbum.convertThemedAlbumToCustom).toBe('function');
  });

  it('convertThemedAlbumToCustom — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.convertThemedAlbumToCustom(42);
    expect(spy.last_call().method).toBe('POST');
  });

  it('convertThemedAlbumToCustom — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.convertThemedAlbumToCustom(42);
    expect(spy.last_call().path).toContain('/api/v1/themed_album/42/convert');
  });

  it('convertThemedAlbumToCustom — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const themedAlbum = new ThemedAlbum(ctx);
    await themedAlbum.convertThemedAlbumToCustom(42);
    expect(spy.calls.length).toBe(1);
  });

});
