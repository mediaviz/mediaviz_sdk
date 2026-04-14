// Auto-generated — do not edit
import { Photos } from '../../javascript/photos.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Photos', () => {
  it('getAllProjectPhotoIds — exists', () => {
    const photos = new Photos({});
    expect(typeof photos.getAllProjectPhotoIds).toBe('function');
  });

  it('getAllProjectPhotoIds — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getAllProjectPhotoIds('test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllProjectPhotoIds — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getAllProjectPhotoIds('test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/test_value/');
  });

  it('getAllProjectPhotoIds — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getAllProjectPhotoIds('test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
  });

  it('getAllProjectPhotoIds — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getAllProjectPhotoIds('test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getPhotoFromProject — exists', () => {
    const photos = new Photos({});
    expect(typeof photos.getPhotoFromProject).toBe('function');
  });

  it('getPhotoFromProject — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getPhotoFromProject('test_value', 42, { keywordListId: 42 });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPhotoFromProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getPhotoFromProject('test_value', 42, { keywordListId: 42 });
    expect(spy.last_call().path).toContain('/api/v1/photos/test_value/42');
  });

  it('getPhotoFromProject — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getPhotoFromProject('test_value', 42, { keywordListId: 42 });
    const path = spy.last_call().path;
    expect(path).toContain('keyword_list_id=');
  });

  it('getPhotoFromProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getPhotoFromProject('test_value', 42, { keywordListId: 42 });
    expect(spy.calls.length).toBe(1);
  });

  it('getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked — exists', () => {
    const photos = new Photos({});
    expect(typeof photos.getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked).toBe('function');
  });

  it('getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked('test_value', 42, 42, { ascOrDesc: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked('test_value', 42, 42, { ascOrDesc: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/test_value/month/42/year/42/ranked');
  });

  it('getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked('test_value', 42, 42, { ascOrDesc: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
  });

  it('getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked('test_value', 42, 42, { ascOrDesc: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
