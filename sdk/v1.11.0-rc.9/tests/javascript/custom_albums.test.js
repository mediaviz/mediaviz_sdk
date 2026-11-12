// Auto-generated — do not edit
import { CustomAlbums } from '../../javascript/custom_albums.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Custom_Albums', () => {
  it('getCustomAlbumDetailById — exists', () => {
    const customAlbums = new CustomAlbums({});
    expect(typeof customAlbums.getCustomAlbumDetailById).toBe('function');
  });

  it('getCustomAlbumDetailById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getCustomAlbumDetailById(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCustomAlbumDetailById — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getCustomAlbumDetailById(42);
    expect(spy.last_call().path).toContain('/api/v1/custom_album/42');
  });

  it('getCustomAlbumDetailById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getCustomAlbumDetailById(42);
    expect(spy.calls.length).toBe(1);
  });

  it('getAllProjectCustomAlbums — exists', () => {
    const customAlbums = new CustomAlbums({});
    expect(typeof customAlbums.getAllProjectCustomAlbums).toBe('function');
  });

  it('getAllProjectCustomAlbums — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getAllProjectCustomAlbums('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllProjectCustomAlbums — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getAllProjectCustomAlbums('hello world');
    expect(spy.last_call().path).toContain('/api/v1/custom_album/project/hello%20world');
  });

  it('getAllProjectCustomAlbums — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getAllProjectCustomAlbums('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getCustomAlbumPhotosById — exists', () => {
    const customAlbums = new CustomAlbums({});
    expect(typeof customAlbums.getCustomAlbumPhotosById).toBe('function');
  });

  it('getCustomAlbumPhotosById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getCustomAlbumPhotosById(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCustomAlbumPhotosById — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getCustomAlbumPhotosById(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/custom_album/photos/42/');
  });

  it('getCustomAlbumPhotosById — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getCustomAlbumPhotosById(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
  });

  it('getCustomAlbumPhotosById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getCustomAlbumPhotosById(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getRankedCustomAlbumById — exists', () => {
    const customAlbums = new CustomAlbums({});
    expect(typeof customAlbums.getRankedCustomAlbumById).toBe('function');
  });

  it('getRankedCustomAlbumById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getRankedCustomAlbumById(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getRankedCustomAlbumById — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getRankedCustomAlbumById(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/custom_album/photos/ranked/42/');
  });

  it('getRankedCustomAlbumById — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getRankedCustomAlbumById(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
  });

  it('getRankedCustomAlbumById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.getRankedCustomAlbumById(42, { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('createProjectCustomAlbum — exists', () => {
    const customAlbums = new CustomAlbums({});
    expect(typeof customAlbums.createProjectCustomAlbum).toBe('function');
  });

  it('createProjectCustomAlbum — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.createProjectCustomAlbum('test_value', { name: 'test_value', description: 'test_value', photoIdInclusionList: ['item1', 'item2'], photoIdRemovalList: ['item1', 'item2'] });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createProjectCustomAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.createProjectCustomAlbum('hello world', { name: 'test_value', description: 'test_value', photoIdInclusionList: ['item1', 'item2'], photoIdRemovalList: ['item1', 'item2'] });
    expect(spy.last_call().path).toContain('/api/v1/custom_album/project/hello%20world');
  });

  it('createProjectCustomAlbum — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.createProjectCustomAlbum('test_value', { name: 'test_value', description: 'test_value', photoIdInclusionList: ['item1', 'item2'], photoIdRemovalList: ['item1', 'item2'] });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('photo_id_inclusion_list');
    expect(body).toHaveProperty('photo_id_removal_list');
  });

  it('createProjectCustomAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.createProjectCustomAlbum('test_value', { name: 'test_value', description: 'test_value', photoIdInclusionList: ['item1', 'item2'], photoIdRemovalList: ['item1', 'item2'] });
    expect(spy.calls.length).toBe(1);
  });

  it('updateCustomAlbum — exists', () => {
    const customAlbums = new CustomAlbums({});
    expect(typeof customAlbums.updateCustomAlbum).toBe('function');
  });

  it('updateCustomAlbum — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.updateCustomAlbum(42, { name: 'test_value', description: 'test_value', photoIdInclusionList: ['item1', 'item2'], photoIdRemovalList: ['item1', 'item2'] });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateCustomAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.updateCustomAlbum(42, { name: 'test_value', description: 'test_value', photoIdInclusionList: ['item1', 'item2'], photoIdRemovalList: ['item1', 'item2'] });
    expect(spy.last_call().path).toContain('/api/v1/custom_album/42');
  });

  it('updateCustomAlbum — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.updateCustomAlbum(42, { name: 'test_value', description: 'test_value', photoIdInclusionList: ['item1', 'item2'], photoIdRemovalList: ['item1', 'item2'] });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('photo_id_inclusion_list');
    expect(body).toHaveProperty('photo_id_removal_list');
  });

  it('updateCustomAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.updateCustomAlbum(42, { name: 'test_value', description: 'test_value', photoIdInclusionList: ['item1', 'item2'], photoIdRemovalList: ['item1', 'item2'] });
    expect(spy.calls.length).toBe(1);
  });

  it('deleteCustomAlbum — exists', () => {
    const customAlbums = new CustomAlbums({});
    expect(typeof customAlbums.deleteCustomAlbum).toBe('function');
  });

  it('deleteCustomAlbum — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.deleteCustomAlbum(42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteCustomAlbum — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.deleteCustomAlbum(42);
    expect(spy.last_call().path).toContain('/api/v1/custom_album/42');
  });

  it('deleteCustomAlbum — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const customAlbums = new CustomAlbums(ctx);
    await customAlbums.deleteCustomAlbum(42);
    expect(spy.calls.length).toBe(1);
  });

});
