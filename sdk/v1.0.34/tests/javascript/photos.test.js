// Auto-generated — do not edit
import { Photos } from '../../javascript/photos.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Photos', () => {
  it('addPhotoToProject — exists', () => {
    const photos = new Photos({});
    expect(typeof photos.addPhotoToProject).toBe('function');
  });

  it('addPhotoToProject — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.addPhotoToProject({ photo: 'test_value', tableName: 'test_value', sourceResolutionX: 42, sourceResolutionY: 42, dateTaken: 'test_value', latitude: 'test_value', longitude: 'test_value', filePath: 'test_value', title: 'test_value', clientSideId: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('addPhotoToProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.addPhotoToProject({ photo: 'test_value', tableName: 'test_value', sourceResolutionX: 42, sourceResolutionY: 42, dateTaken: 'test_value', latitude: 'test_value', longitude: 'test_value', filePath: 'test_value', title: 'test_value', clientSideId: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/');
  });

  it('addPhotoToProject — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.addPhotoToProject({ photo: 'test_value', tableName: 'test_value', sourceResolutionX: 42, sourceResolutionY: 42, dateTaken: 'test_value', latitude: 'test_value', longitude: 'test_value', filePath: 'test_value', title: 'test_value', clientSideId: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('photo');
    expect(body).toHaveProperty('table_name');
    expect(body).toHaveProperty('source_resolution_x');
    expect(body).toHaveProperty('source_resolution_y');
    expect(body).toHaveProperty('date_taken');
    expect(body).toHaveProperty('latitude');
    expect(body).toHaveProperty('longitude');
    expect(body).toHaveProperty('file_path');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('client_side_id');
  });

  it('addPhotoToProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.addPhotoToProject({ photo: 'test_value', tableName: 'test_value', sourceResolutionX: 42, sourceResolutionY: 42, dateTaken: 'test_value', latitude: 'test_value', longitude: 'test_value', filePath: 'test_value', title: 'test_value', clientSideId: 'test_value' });
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
    await photos.getPhotoFromProject('hello world', 42, { keywordListId: 42 });
    expect(spy.last_call().path).toContain('/api/v1/photos/hello%20world/42');
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

  it('getPhotoFaceDetailsFromProject — exists', () => {
    const photos = new Photos({});
    expect(typeof photos.getPhotoFaceDetailsFromProject).toBe('function');
  });

  it('getPhotoFaceDetailsFromProject — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getPhotoFaceDetailsFromProject('test_value', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPhotoFaceDetailsFromProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getPhotoFaceDetailsFromProject('hello world', 42);
    expect(spy.last_call().path).toContain('/api/v1/photos/face_details/hello%20world/42');
  });

  it('getPhotoFaceDetailsFromProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getPhotoFaceDetailsFromProject('test_value', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('getAllProjectPhotoIds — exists', () => {
    const photos = new Photos({});
    expect(typeof photos.getAllProjectPhotoIds).toBe('function');
  });

  it('getAllProjectPhotoIds — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getAllProjectPhotoIds('test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', includeAll: 'test_value', startDate: 'test_value', endDate: 'test_value', noDateTaken: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllProjectPhotoIds — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getAllProjectPhotoIds('hello world', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', includeAll: 'test_value', startDate: 'test_value', endDate: 'test_value', noDateTaken: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/hello%20world/');
  });

  it('getAllProjectPhotoIds — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getAllProjectPhotoIds('test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', includeAll: 'test_value', startDate: 'test_value', endDate: 'test_value', noDateTaken: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
    expect(path).toContain('include_all=');
    expect(path).toContain('start_date=');
    expect(path).toContain('end_date=');
    expect(path).toContain('no_date_taken=');
  });

  it('getAllProjectPhotoIds — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getAllProjectPhotoIds('test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', includeAll: 'test_value', startDate: 'test_value', endDate: 'test_value', noDateTaken: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getRankedProjectPhotosByTableName — exists', () => {
    const photos = new Photos({});
    expect(typeof photos.getRankedProjectPhotosByTableName).toBe('function');
  });

  it('getRankedProjectPhotosByTableName — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getRankedProjectPhotosByTableName('test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', startDate: 'test_value', endDate: 'test_value', noDateTaken: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getRankedProjectPhotosByTableName — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getRankedProjectPhotosByTableName('hello world', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', startDate: 'test_value', endDate: 'test_value', noDateTaken: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/ranked/hello%20world/');
  });

  it('getRankedProjectPhotosByTableName — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getRankedProjectPhotosByTableName('test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', startDate: 'test_value', endDate: 'test_value', noDateTaken: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
    expect(path).toContain('start_date=');
    expect(path).toContain('end_date=');
    expect(path).toContain('no_date_taken=');
  });

  it('getRankedProjectPhotosByTableName — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getRankedProjectPhotosByTableName('test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value', startDate: 'test_value', endDate: 'test_value', noDateTaken: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectMonthYearsWithPhotos — exists', () => {
    const photos = new Photos({});
    expect(typeof photos.getProjectMonthYearsWithPhotos).toBe('function');
  });

  it('getProjectMonthYearsWithPhotos — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getProjectMonthYearsWithPhotos('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectMonthYearsWithPhotos — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getProjectMonthYearsWithPhotos('hello world');
    expect(spy.last_call().path).toContain('/api/v1/photo_month_years/hello%20world');
  });

  it('getProjectMonthYearsWithPhotos — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getProjectMonthYearsWithPhotos('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectThumbnail — exists', () => {
    const photos = new Photos({});
    expect(typeof photos.getProjectThumbnail).toBe('function');
  });

  it('getProjectThumbnail — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getProjectThumbnail('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectThumbnail — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getProjectThumbnail('hello world');
    expect(spy.last_call().path).toContain('/api/v1/photos_project/hello%20world');
  });

  it('getProjectThumbnail — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.getProjectThumbnail('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('updatePhotoInProject — exists', () => {
    const photos = new Photos({});
    expect(typeof photos.updatePhotoInProject).toBe('function');
  });

  it('updatePhotoInProject — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.updatePhotoInProject({ tableName: 'test_value', photoId: 42, photoData: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updatePhotoInProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.updatePhotoInProject({ tableName: 'test_value', photoId: 42, photoData: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos_update');
  });

  it('updatePhotoInProject — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.updatePhotoInProject({ tableName: 'test_value', photoId: 42, photoData: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('table_name=');
    expect(path).toContain('photo_id=');
    expect(path).toContain('photo_data=');
  });

  it('updatePhotoInProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.updatePhotoInProject({ tableName: 'test_value', photoId: 42, photoData: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('updatePhotoRanking — exists', () => {
    const photos = new Photos({});
    expect(typeof photos.updatePhotoRanking).toBe('function');
  });

  it('updatePhotoRanking — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.updatePhotoRanking('test_value', 42, 'test_value');
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updatePhotoRanking — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.updatePhotoRanking('hello world', 42, 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/photos_update/hello%20world/id/42/rank/hello%20world');
  });

  it('updatePhotoRanking — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.updatePhotoRanking('test_value', 42, 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('deletePhotoFromProject — exists', () => {
    const photos = new Photos({});
    expect(typeof photos.deletePhotoFromProject).toBe('function');
  });

  it('deletePhotoFromProject — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.deletePhotoFromProject('test_value', { photoIds: 'test_value' });
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deletePhotoFromProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.deletePhotoFromProject('hello world', { photoIds: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/hello%20world/delete/');
  });

  it('deletePhotoFromProject — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.deletePhotoFromProject('test_value', { photoIds: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('photo_ids=');
  });

  it('deletePhotoFromProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const photos = new Photos(ctx);
    await photos.deletePhotoFromProject('test_value', { photoIds: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
