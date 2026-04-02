// Auto-generated — do not edit
import { getPhotoIds, getPhotoById, deletePhotos, getProjectThumbnail, getProjectMonthYears, getPhotosByMonthYearSort, getPhotosDateTakenNone, updatePhotosUpdateRankById, getPhotosRanked, getPhotosMonthYearRanked, getPhotosDateTakenNoneRankedSortDesc } from '../../javascript/photos.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Photos', () => {
  it('getPhotoIds — exists', () => {
    expect(typeof getPhotoIds).toBe('function');
  });

  it('getPhotoIds — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getPhotoIds(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPhotoIds — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getPhotoIds(spy, 'access_token', 'refresh_token', 'hello world', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/hello%20world/');
  });

  it('getPhotoIds — query params', async () => {
    const spy = new SpyOAuthClient();
    await getPhotoIds(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
  });

  it('getPhotoIds — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getPhotoIds(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 'test_value', limit: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getPhotoById — exists', () => {
    expect(typeof getPhotoById).toBe('function');
  });

  it('getPhotoById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getPhotoById(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPhotoById — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getPhotoById(spy, 'access_token', 'refresh_token', 'hello world', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/photos/hello%20world/test_value');
  });

  it('getPhotoById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getPhotoById(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('deletePhotos — exists', () => {
    expect(typeof deletePhotos).toBe('function');
  });

  it('deletePhotos — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    await deletePhotos(spy, 'access_token', 'refresh_token', 'test_value', { photoIds: 'test_value' });
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deletePhotos — path construction', async () => {
    const spy = new SpyOAuthClient();
    await deletePhotos(spy, 'access_token', 'refresh_token', 'hello world', { photoIds: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/hello%20world/delete/');
  });

  it('deletePhotos — query params', async () => {
    const spy = new SpyOAuthClient();
    await deletePhotos(spy, 'access_token', 'refresh_token', 'test_value', { photoIds: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('photo_ids=');
  });

  it('deletePhotos — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await deletePhotos(spy, 'access_token', 'refresh_token', 'test_value', { photoIds: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectThumbnail — exists', () => {
    expect(typeof getProjectThumbnail).toBe('function');
  });

  it('getProjectThumbnail — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectThumbnail(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectThumbnail — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectThumbnail(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/photos_project/hello%20world');
  });

  it('getProjectThumbnail — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectThumbnail(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectMonthYears — exists', () => {
    expect(typeof getProjectMonthYears).toBe('function');
  });

  it('getProjectMonthYears — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectMonthYears(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectMonthYears — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectMonthYears(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/photo_month_years/hello%20world');
  });

  it('getProjectMonthYears — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectMonthYears(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getPhotosByMonthYearSort — exists', () => {
    expect(typeof getPhotosByMonthYearSort).toBe('function');
  });

  it('getPhotosByMonthYearSort — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosByMonthYearSort(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPhotosByMonthYearSort — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosByMonthYearSort(spy, 'access_token', 'refresh_token', 'hello world', 'hello world', 'hello world', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.last_call().path).toContain('/api/v1/photos/hello%20world/month/hello%20world/year/hello%20world/');
  });

  it('getPhotosByMonthYearSort — query params', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosByMonthYearSort(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
  });

  it('getPhotosByMonthYearSort — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosByMonthYearSort(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.calls.length).toBe(1);
  });

  it('getPhotosDateTakenNone — exists', () => {
    expect(typeof getPhotosDateTakenNone).toBe('function');
  });

  it('getPhotosDateTakenNone — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosDateTakenNone(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPhotosDateTakenNone — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosDateTakenNone(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/photos/hello%20world/date_taken/none');
  });

  it('getPhotosDateTakenNone — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosDateTakenNone(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('updatePhotosUpdateRankById — exists', () => {
    expect(typeof updatePhotosUpdateRankById).toBe('function');
  });

  it('updatePhotosUpdateRankById — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updatePhotosUpdateRankById(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updatePhotosUpdateRankById — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updatePhotosUpdateRankById(spy, 'access_token', 'refresh_token', 'hello world', 'test_value', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/photos_update/hello%20world/id/test_value/rank/test_value');
  });

  it('updatePhotosUpdateRankById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updatePhotosUpdateRankById(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getPhotosRanked — exists', () => {
    expect(typeof getPhotosRanked).toBe('function');
  });

  it('getPhotosRanked — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosRanked(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPhotosRanked — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosRanked(spy, 'access_token', 'refresh_token', 'hello world', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.last_call().path).toContain('/api/v1/photos_ranked/hello%20world/');
  });

  it('getPhotosRanked — query params', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosRanked(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
  });

  it('getPhotosRanked — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosRanked(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value', lastId: 42, limit: 42 });
    expect(spy.calls.length).toBe(1);
  });

  it('getPhotosMonthYearRanked — exists', () => {
    expect(typeof getPhotosMonthYearRanked).toBe('function');
  });

  it('getPhotosMonthYearRanked — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosMonthYearRanked(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', { ascOrDesc: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPhotosMonthYearRanked — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosMonthYearRanked(spy, 'access_token', 'refresh_token', 'hello world', 'hello world', 'hello world', { ascOrDesc: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/hello%20world/month/hello%20world/year/hello%20world/ranked');
  });

  it('getPhotosMonthYearRanked — query params', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosMonthYearRanked(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', { ascOrDesc: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
  });

  it('getPhotosMonthYearRanked — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosMonthYearRanked(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', { ascOrDesc: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getPhotosDateTakenNoneRankedSortDesc — exists', () => {
    expect(typeof getPhotosDateTakenNoneRankedSortDesc).toBe('function');
  });

  it('getPhotosDateTakenNoneRankedSortDesc — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosDateTakenNoneRankedSortDesc(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPhotosDateTakenNoneRankedSortDesc — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosDateTakenNoneRankedSortDesc(spy, 'access_token', 'refresh_token', 'hello world', { ascOrDesc: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/photos/hello%20world/date_taken/none/ranked');
  });

  it('getPhotosDateTakenNoneRankedSortDesc — query params', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosDateTakenNoneRankedSortDesc(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('asc_or_desc=');
  });

  it('getPhotosDateTakenNoneRankedSortDesc — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getPhotosDateTakenNoneRankedSortDesc(spy, 'access_token', 'refresh_token', 'test_value', { ascOrDesc: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
