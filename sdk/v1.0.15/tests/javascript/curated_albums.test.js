// Auto-generated — do not edit
import { CuratedAlbums } from '../../javascript/curated_albums.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Curated_Albums', () => {
  it('createCuratedAlbum — exists', () => {
    const curatedAlbums = new CuratedAlbums({});
    expect(typeof curatedAlbums.createCuratedAlbum).toBe('function');
  });

  it('createCuratedAlbum — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.createCuratedAlbum('test_value', 'test_value', 'test_value', 3.14);
    expect(spy.last_call().method).toBe('POST');
  });

  it('createCuratedAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.createCuratedAlbum('hello world', 'test_value', 'test_value', 3.14);
    expect(spy.last_call().path).toContain('/api/v1/curated_album/project/hello%20world');
  });

  it('createCuratedAlbum — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.createCuratedAlbum('test_value', 'test_value', 'test_value', 3.14);
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('confidence_value');
  });

  it('createCuratedAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.createCuratedAlbum('test_value', 'test_value', 'test_value', 3.14);
    expect(spy.calls.length).toBe(1);
  });

  it('getAllProjectCuratedAlbums — exists', () => {
    const curatedAlbums = new CuratedAlbums({});
    expect(typeof curatedAlbums.getAllProjectCuratedAlbums).toBe('function');
  });

  it('getAllProjectCuratedAlbums — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getAllProjectCuratedAlbums('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllProjectCuratedAlbums — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getAllProjectCuratedAlbums('hello world');
    expect(spy.last_call().path).toContain('/api/v1/curated_album/project/hello%20world');
  });

  it('getAllProjectCuratedAlbums — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getAllProjectCuratedAlbums('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getCuratedAlbumPhotos — exists', () => {
    const curatedAlbums = new CuratedAlbums({});
    expect(typeof curatedAlbums.getCuratedAlbumPhotos).toBe('function');
  });

  it('getCuratedAlbumPhotos — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getCuratedAlbumPhotos(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCuratedAlbumPhotos — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getCuratedAlbumPhotos(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/curated_album/photos/42/');
  });

  it('getCuratedAlbumPhotos — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getCuratedAlbumPhotos(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
    expect(path).toContain('confidence_value=');
  });

  it('getCuratedAlbumPhotos — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getCuratedAlbumPhotos(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getCuratedAlbumPhotosRanked — exists', () => {
    const curatedAlbums = new CuratedAlbums({});
    expect(typeof curatedAlbums.getCuratedAlbumPhotosRanked).toBe('function');
  });

  it('getCuratedAlbumPhotosRanked — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getCuratedAlbumPhotosRanked(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCuratedAlbumPhotosRanked — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getCuratedAlbumPhotosRanked(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/curated_album/photos/ranked/42/');
  });

  it('getCuratedAlbumPhotosRanked — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getCuratedAlbumPhotosRanked(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
    expect(path).toContain('confidence_value=');
  });

  it('getCuratedAlbumPhotosRanked — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getCuratedAlbumPhotosRanked(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', confidenceValue: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getCuratedAlbumById — exists', () => {
    const curatedAlbums = new CuratedAlbums({});
    expect(typeof curatedAlbums.getCuratedAlbumById).toBe('function');
  });

  it('getCuratedAlbumById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getCuratedAlbumById(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCuratedAlbumById — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getCuratedAlbumById(42);
    expect(spy.last_call().path).toContain('/api/v1/curated_album/42');
  });

  it('getCuratedAlbumById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.getCuratedAlbumById(42);
    expect(spy.calls.length).toBe(1);
  });

  it('updateCuratedAlbum — exists', () => {
    const curatedAlbums = new CuratedAlbums({});
    expect(typeof curatedAlbums.updateCuratedAlbum).toBe('function');
  });

  it('updateCuratedAlbum — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.updateCuratedAlbum(42, 'test_value', 'test_value', 3.14);
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateCuratedAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.updateCuratedAlbum(42, 'test_value', 'test_value', 3.14);
    expect(spy.last_call().path).toContain('/api/v1/curated_album/42');
  });

  it('updateCuratedAlbum — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.updateCuratedAlbum(42, 'test_value', 'test_value', 3.14);
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('confidence_value');
  });

  it('updateCuratedAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.updateCuratedAlbum(42, 'test_value', 'test_value', 3.14);
    expect(spy.calls.length).toBe(1);
  });

  it('deleteCuratedAlbum — exists', () => {
    const curatedAlbums = new CuratedAlbums({});
    expect(typeof curatedAlbums.deleteCuratedAlbum).toBe('function');
  });

  it('deleteCuratedAlbum — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.deleteCuratedAlbum(42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteCuratedAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.deleteCuratedAlbum(42);
    expect(spy.last_call().path).toContain('/api/v1/curated_album/42');
  });

  it('deleteCuratedAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.deleteCuratedAlbum(42);
    expect(spy.calls.length).toBe(1);
  });

  it('convertCuratedAlbumToCustom — exists', () => {
    const curatedAlbums = new CuratedAlbums({});
    expect(typeof curatedAlbums.convertCuratedAlbumToCustom).toBe('function');
  });

  it('convertCuratedAlbumToCustom — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.convertCuratedAlbumToCustom(42);
    expect(spy.last_call().method).toBe('POST');
  });

  it('convertCuratedAlbumToCustom — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.convertCuratedAlbumToCustom(42);
    expect(spy.last_call().path).toContain('/api/v1/curated_album/42/convert');
  });

  it('convertCuratedAlbumToCustom — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const curatedAlbums = new CuratedAlbums(ctx);
    await curatedAlbums.convertCuratedAlbumToCustom(42);
    expect(spy.calls.length).toBe(1);
  });

});
