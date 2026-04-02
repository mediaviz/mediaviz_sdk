// Auto-generated — do not edit
import { createCustomAlbumProject, getCustomAlbumProject, getCustomAlbum, deleteCustomAlbum, updateCustomAlbum, getCustomAlbumPhotosSort, getCustomAlbumPhotosRankedSort } from '../../javascript/custom_albums.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Custom_Albums', () => {
  it('createCustomAlbumProject — exists', () => {
    expect(typeof createCustomAlbumProject).toBe('function');
  });

  it('createCustomAlbumProject — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createCustomAlbumProject(spy, 'access_token', 'refresh_token', 'test_value', { name: 'test_value', description: 'test_value', photoIdInclusionList: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createCustomAlbumProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createCustomAlbumProject(spy, 'access_token', 'refresh_token', 'hello world', { name: 'test_value', description: 'test_value', photoIdInclusionList: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/custom_album/project/hello%20world');
  });

  it('createCustomAlbumProject — request body', async () => {
    const spy = new SpyOAuthClient();
    await createCustomAlbumProject(spy, 'access_token', 'refresh_token', 'test_value', { name: 'test_value', description: 'test_value', photoIdInclusionList: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('photo_id_inclusion_list');
  });

  it('createCustomAlbumProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createCustomAlbumProject(spy, 'access_token', 'refresh_token', 'test_value', { name: 'test_value', description: 'test_value', photoIdInclusionList: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getCustomAlbumProject — exists', () => {
    expect(typeof getCustomAlbumProject).toBe('function');
  });

  it('getCustomAlbumProject — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCustomAlbumProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumProject(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/custom_album/project/hello%20world');
  });

  it('getCustomAlbumProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getCustomAlbum — exists', () => {
    expect(typeof getCustomAlbum).toBe('function');
  });

  it('getCustomAlbum — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbum(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCustomAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbum(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/custom_album/42');
  });

  it('getCustomAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbum(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('deleteCustomAlbum — exists', () => {
    expect(typeof deleteCustomAlbum).toBe('function');
  });

  it('deleteCustomAlbum — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    await deleteCustomAlbum(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteCustomAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    await deleteCustomAlbum(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/custom_album/42');
  });

  it('deleteCustomAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await deleteCustomAlbum(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('updateCustomAlbum — exists', () => {
    expect(typeof updateCustomAlbum).toBe('function');
  });

  it('updateCustomAlbum — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateCustomAlbum(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateCustomAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateCustomAlbum(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.last_call().path).toContain('/api/v1/custom_album/42');
  });

  it('updateCustomAlbum — request body', async () => {
    const spy = new SpyOAuthClient();
    await updateCustomAlbum(spy, 'access_token', 'refresh_token', 42, {});
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('updateCustomAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateCustomAlbum(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.calls.length).toBe(1);
  });

  it('getCustomAlbumPhotosSort — exists', () => {
    expect(typeof getCustomAlbumPhotosSort).toBe('function');
  });

  it('getCustomAlbumPhotosSort — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumPhotosSort(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCustomAlbumPhotosSort — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumPhotosSort(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.last_call().path).toContain('/api/v1/custom_album/photos/42/');
  });

  it('getCustomAlbumPhotosSort — query params', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumPhotosSort(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
  });

  it('getCustomAlbumPhotosSort — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumPhotosSort(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.calls.length).toBe(1);
  });

  it('getCustomAlbumPhotosRankedSort — exists', () => {
    expect(typeof getCustomAlbumPhotosRankedSort).toBe('function');
  });

  it('getCustomAlbumPhotosRankedSort — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumPhotosRankedSort(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCustomAlbumPhotosRankedSort — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumPhotosRankedSort(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/custom_album/photos/ranked/42/');
  });

  it('getCustomAlbumPhotosRankedSort — query params', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumPhotosRankedSort(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
  });

  it('getCustomAlbumPhotosRankedSort — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumPhotosRankedSort(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
