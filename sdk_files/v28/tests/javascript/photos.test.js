// Auto-generated — do not edit
import { getAllProjectPhotoIds, getPhotoFromProject, deletePhotoFromProject, getProjectThumbnail, getProjectMonthYearsWithPhotos, getProjectPhotoIdsByMonth, getProjectPhotoIdsNoDateTaken, updatePhotoRanking, getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked, getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked, getTopProjectPhotosByTableNameNoDateTakenNewRanked } from '../../javascript/photos.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Photos', () => {
  it('getAllProjectPhotoIds — exists', () => {
    expect(typeof getAllProjectPhotoIds).toBe('function');
  });

  it('getAllProjectPhotoIds — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getAllProjectPhotoIds(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllProjectPhotoIds — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getAllProjectPhotoIds(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/test_value/');
  });

  it('getAllProjectPhotoIds — query params', async () => {
    const spy = new SpyOAuthClient();
    await getAllProjectPhotoIds(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
  });

  it('getAllProjectPhotoIds — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getAllProjectPhotoIds(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getPhotoFromProject — exists', () => {
    expect(typeof getPhotoFromProject).toBe('function');
  });

  it('getPhotoFromProject — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getPhotoFromProject(spy, 'access_token', 'refresh_token', 'test_value', 42, 'test_value', { keywordListId: 42 });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPhotoFromProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getPhotoFromProject(spy, 'access_token', 'refresh_token', 'test_value', 42, 'test_value', { keywordListId: 42 });
    expect(spy.last_call().path).toContain('/api/v1/photos/test_value/42');
  });

  it('getPhotoFromProject — query params', async () => {
    const spy = new SpyOAuthClient();
    await getPhotoFromProject(spy, 'access_token', 'refresh_token', 'test_value', 42, 'test_value', { keywordListId: 42 });
    const path = spy.last_call().path;
    expect(path).toContain('keyword_list_id=');
  });

  it('getPhotoFromProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getPhotoFromProject(spy, 'access_token', 'refresh_token', 'test_value', 42, 'test_value', { keywordListId: 42 });
    expect(spy.calls.length).toBe(1);
  });

  it('deletePhotoFromProject — exists', () => {
    expect(typeof deletePhotoFromProject).toBe('function');
  });

  it('deletePhotoFromProject — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    await deletePhotoFromProject(spy, 'access_token', 'refresh_token', 'test_value', { photoIds: 'test_value' });
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deletePhotoFromProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    await deletePhotoFromProject(spy, 'access_token', 'refresh_token', 'test_value', { photoIds: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/test_value/delete/');
  });

  it('deletePhotoFromProject — query params', async () => {
    const spy = new SpyOAuthClient();
    await deletePhotoFromProject(spy, 'access_token', 'refresh_token', 'test_value', { photoIds: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('photo_ids=');
  });

  it('deletePhotoFromProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await deletePhotoFromProject(spy, 'access_token', 'refresh_token', 'test_value', { photoIds: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectThumbnail — exists', () => {
    expect(typeof getProjectThumbnail).toBe('function');
  });

  it('getProjectThumbnail — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectThumbnail(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectThumbnail — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectThumbnail(spy, 'access_token', 'refresh_token', 'test_value', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/photos_project/test_value');
  });

  it('getProjectThumbnail — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectThumbnail(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectMonthYearsWithPhotos — exists', () => {
    expect(typeof getProjectMonthYearsWithPhotos).toBe('function');
  });

  it('getProjectMonthYearsWithPhotos — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectMonthYearsWithPhotos(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectMonthYearsWithPhotos — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectMonthYearsWithPhotos(spy, 'access_token', 'refresh_token', 'test_value', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/photo_month_years/test_value');
  });

  it('getProjectMonthYearsWithPhotos — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectMonthYearsWithPhotos(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectPhotoIdsByMonth — exists', () => {
    expect(typeof getProjectPhotoIdsByMonth).toBe('function');
  });

  it('getProjectPhotoIdsByMonth — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectPhotoIdsByMonth(spy, 'access_token', 'refresh_token', 'test_value', 42, 42, 'test_value', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectPhotoIdsByMonth — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectPhotoIdsByMonth(spy, 'access_token', 'refresh_token', 'test_value', 42, 42, 'hello world', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.last_call().path).toContain('/api/v1/photos/test_value/month/42/year/42');
  });

  it('getProjectPhotoIdsByMonth — query params', async () => {
    const spy = new SpyOAuthClient();
    await getProjectPhotoIdsByMonth(spy, 'access_token', 'refresh_token', 'test_value', 42, 42, 'test_value', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
  });

  it('getProjectPhotoIdsByMonth — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectPhotoIdsByMonth(spy, 'access_token', 'refresh_token', 'test_value', 42, 42, 'test_value', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectPhotoIdsNoDateTaken — exists', () => {
    expect(typeof getProjectPhotoIdsNoDateTaken).toBe('function');
  });

  it('getProjectPhotoIdsNoDateTaken — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectPhotoIdsNoDateTaken(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectPhotoIdsNoDateTaken — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectPhotoIdsNoDateTaken(spy, 'access_token', 'refresh_token', 'test_value', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/photos/test_value/date_taken/none');
  });

  it('getProjectPhotoIdsNoDateTaken — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectPhotoIdsNoDateTaken(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('updatePhotoRanking — exists', () => {
    expect(typeof updatePhotoRanking).toBe('function');
  });

  it('updatePhotoRanking — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updatePhotoRanking(spy, 'access_token', 'refresh_token', 'test_value', 42, 'test_value', 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updatePhotoRanking — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updatePhotoRanking(spy, 'access_token', 'refresh_token', 'test_value', 42, 'test_value', 'hello world', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/photos_update/test_value/id/42/rank/test_value');
  });

  it('updatePhotoRanking — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updatePhotoRanking(spy, 'access_token', 'refresh_token', 'test_value', 42, 'test_value', 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked — exists', () => {
    expect(typeof getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked).toBe('function');
  });

  it('getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.last_call().path).toContain('/api/v1/photos_ranked/test_value');
  });

  it('getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked — query params', async () => {
    const spy = new SpyOAuthClient();
    await getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
  });

  it('getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.calls.length).toBe(1);
  });

  it('getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked — exists', () => {
    expect(typeof getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked).toBe('function');
  });

  it('getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked(spy, 'access_token', 'refresh_token', 'test_value', 42, 42, 'test_value', { ascOrDesc: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked(spy, 'access_token', 'refresh_token', 'test_value', 42, 42, 'hello world', { ascOrDesc: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/test_value/month/42/year/42/ranked');
  });

  it('getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked — query params', async () => {
    const spy = new SpyOAuthClient();
    await getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked(spy, 'access_token', 'refresh_token', 'test_value', 42, 42, 'test_value', { ascOrDesc: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
  });

  it('getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked(spy, 'access_token', 'refresh_token', 'test_value', 42, 42, 'test_value', { ascOrDesc: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getTopProjectPhotosByTableNameNoDateTakenNewRanked — exists', () => {
    expect(typeof getTopProjectPhotosByTableNameNoDateTakenNewRanked).toBe('function');
  });

  it('getTopProjectPhotosByTableNameNoDateTakenNewRanked — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getTopProjectPhotosByTableNameNoDateTakenNewRanked(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', { ascOrDesc: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getTopProjectPhotosByTableNameNoDateTakenNewRanked — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getTopProjectPhotosByTableNameNoDateTakenNewRanked(spy, 'access_token', 'refresh_token', 'test_value', 'hello world', { ascOrDesc: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/test_value/date_taken/none/ranked');
  });

  it('getTopProjectPhotosByTableNameNoDateTakenNewRanked — query params', async () => {
    const spy = new SpyOAuthClient();
    await getTopProjectPhotosByTableNameNoDateTakenNewRanked(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', { ascOrDesc: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
  });

  it('getTopProjectPhotosByTableNameNoDateTakenNewRanked — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getTopProjectPhotosByTableNameNoDateTakenNewRanked(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', { ascOrDesc: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
