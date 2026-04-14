// Auto-generated — do not edit
import { createProjectCustomAlbum, getAllProjectCustomAlbums, getCustomAlbumDetailById, deleteCustomAlbum, updateCustomAlbum, getCustomAlbumPhotosById, getTopMiddleBottomCustomAlbumById } from '../../javascript/custom_albums.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Custom_Albums', () => {
  it('createProjectCustomAlbum — exists', () => {
    expect(typeof createProjectCustomAlbum).toBe('function');
  });

  it('createProjectCustomAlbum — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createProjectCustomAlbum(spy, 'access_token', 'refresh_token', 'test_value', { Model: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createProjectCustomAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createProjectCustomAlbum(spy, 'access_token', 'refresh_token', 'test_value', { Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/custom_album/project/test_value');
  });

  it('createProjectCustomAlbum — request body', async () => {
    const spy = new SpyOAuthClient();
    await createProjectCustomAlbum(spy, 'access_token', 'refresh_token', 'test_value', { Model: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('createProjectCustomAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createProjectCustomAlbum(spy, 'access_token', 'refresh_token', 'test_value', { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getAllProjectCustomAlbums — exists', () => {
    expect(typeof getAllProjectCustomAlbums).toBe('function');
  });

  it('getAllProjectCustomAlbums — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getAllProjectCustomAlbums(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllProjectCustomAlbums — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getAllProjectCustomAlbums(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/custom_album/project/test_value');
  });

  it('getAllProjectCustomAlbums — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getAllProjectCustomAlbums(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getCustomAlbumDetailById — exists', () => {
    expect(typeof getCustomAlbumDetailById).toBe('function');
  });

  it('getCustomAlbumDetailById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumDetailById(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCustomAlbumDetailById — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumDetailById(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/custom_album/42');
  });

  it('getCustomAlbumDetailById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumDetailById(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('deleteCustomAlbum — exists', () => {
    expect(typeof deleteCustomAlbum).toBe('function');
  });

  it('deleteCustomAlbum — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    await deleteCustomAlbum(spy, 'access_token', 'refresh_token', 42, 42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteCustomAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    await deleteCustomAlbum(spy, 'access_token', 'refresh_token', 42, 42);
    expect(spy.last_call().path).toContain('/api/v1/custom_album/42');
  });

  it('deleteCustomAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await deleteCustomAlbum(spy, 'access_token', 'refresh_token', 42, 42);
    expect(spy.calls.length).toBe(1);
  });

  it('updateCustomAlbum — exists', () => {
    expect(typeof updateCustomAlbum).toBe('function');
  });

  it('updateCustomAlbum — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateCustomAlbum(spy, 'access_token', 'refresh_token', 42, 42, { Model: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateCustomAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateCustomAlbum(spy, 'access_token', 'refresh_token', 42, 42, { Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/custom_album/42');
  });

  it('updateCustomAlbum — request body', async () => {
    const spy = new SpyOAuthClient();
    await updateCustomAlbum(spy, 'access_token', 'refresh_token', 42, 42, { Model: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('updateCustomAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateCustomAlbum(spy, 'access_token', 'refresh_token', 42, 42, { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getCustomAlbumPhotosById — exists', () => {
    expect(typeof getCustomAlbumPhotosById).toBe('function');
  });

  it('getCustomAlbumPhotosById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumPhotosById(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCustomAlbumPhotosById — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumPhotosById(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/custom_album/photos/42/');
  });

  it('getCustomAlbumPhotosById — query params', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumPhotosById(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
  });

  it('getCustomAlbumPhotosById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getCustomAlbumPhotosById(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getTopMiddleBottomCustomAlbumById — exists', () => {
    expect(typeof getTopMiddleBottomCustomAlbumById).toBe('function');
  });

  it('getTopMiddleBottomCustomAlbumById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getTopMiddleBottomCustomAlbumById(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getTopMiddleBottomCustomAlbumById — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getTopMiddleBottomCustomAlbumById(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/custom_album/photos/ranked/42/');
  });

  it('getTopMiddleBottomCustomAlbumById — query params', async () => {
    const spy = new SpyOAuthClient();
    await getTopMiddleBottomCustomAlbumById(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
  });

  it('getTopMiddleBottomCustomAlbumById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getTopMiddleBottomCustomAlbumById(spy, 'access_token', 'refresh_token', 42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
