// Auto-generated — do not edit
import { getAllProjectCuratedAlbums, getCuratedAlbumPhotos, getCuratedAlbumPhotosRanked } from '../../javascript/curated_albums.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Curated_Albums', () => {
  it('getAllProjectCuratedAlbums — exists', () => {
    expect(typeof getAllProjectCuratedAlbums).toBe('function');
  });

  it('getAllProjectCuratedAlbums — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getAllProjectCuratedAlbums(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllProjectCuratedAlbums — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getAllProjectCuratedAlbums(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/curated_album/project/hello%20world');
  });

  it('getAllProjectCuratedAlbums — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getAllProjectCuratedAlbums(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getCuratedAlbumPhotos — exists', () => {
    expect(typeof getCuratedAlbumPhotos).toBe('function');
  });

  it('getCuratedAlbumPhotos — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getCuratedAlbumPhotos(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 42, limit: 42, confidenceValue: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCuratedAlbumPhotos — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getCuratedAlbumPhotos(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 42, limit: 42, confidenceValue: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/curated_album/photos/42/');
  });

  it('getCuratedAlbumPhotos — query params', async () => {
    const spy = new SpyOAuthClient();
    await getCuratedAlbumPhotos(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 42, limit: 42, confidenceValue: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
    expect(path).toContain('confidence_value=');
  });

  it('getCuratedAlbumPhotos — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getCuratedAlbumPhotos(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 42, limit: 42, confidenceValue: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getCuratedAlbumPhotosRanked — exists', () => {
    expect(typeof getCuratedAlbumPhotosRanked).toBe('function');
  });

  it('getCuratedAlbumPhotosRanked — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getCuratedAlbumPhotosRanked(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 42, limit: 42, confidenceValue: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCuratedAlbumPhotosRanked — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getCuratedAlbumPhotosRanked(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 42, limit: 42, confidenceValue: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/curated_album/photos/ranked/42/');
  });

  it('getCuratedAlbumPhotosRanked — query params', async () => {
    const spy = new SpyOAuthClient();
    await getCuratedAlbumPhotosRanked(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 42, limit: 42, confidenceValue: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
    expect(path).toContain('confidence_value=');
  });

  it('getCuratedAlbumPhotosRanked — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getCuratedAlbumPhotosRanked(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 42, limit: 42, confidenceValue: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
