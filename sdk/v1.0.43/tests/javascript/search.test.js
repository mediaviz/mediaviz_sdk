// Auto-generated — do not edit
import { Search } from '../../javascript/search.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Search', () => {
  it('searchProjectPhotos — exists', () => {
    const search = new Search({});
    expect(typeof search.searchProjectPhotos).toBe('function');
  });

  it('searchProjectPhotos — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.searchProjectPhotos('test_value', { andParams: 'test_value', andStringParams: 'test_value', orParams: 'test_value', orStringParams: 'test_value', notParams: 'test_value', notStringParams: 'test_value', dateMin: 'test_value', dateMax: 'test_value', dateNullAnd: 'test_value', dateNullOr: 'test_value', dateOrder: 'test_value', customAlbumId: 'test_value', bestOfSimilarSetsOnly: 'test_value', curatedAlbumId: 'test_value', splitByTier: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('searchProjectPhotos — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.searchProjectPhotos('hello world', { andParams: 'test_value', andStringParams: 'test_value', orParams: 'test_value', orStringParams: 'test_value', notParams: 'test_value', notStringParams: 'test_value', dateMin: 'test_value', dateMax: 'test_value', dateNullAnd: 'test_value', dateNullOr: 'test_value', dateOrder: 'test_value', customAlbumId: 'test_value', bestOfSimilarSetsOnly: 'test_value', curatedAlbumId: 'test_value', splitByTier: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/search/hello%20world/');
  });

  it('searchProjectPhotos — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.searchProjectPhotos('test_value', { andParams: 'test_value', andStringParams: 'test_value', orParams: 'test_value', orStringParams: 'test_value', notParams: 'test_value', notStringParams: 'test_value', dateMin: 'test_value', dateMax: 'test_value', dateNullAnd: 'test_value', dateNullOr: 'test_value', dateOrder: 'test_value', customAlbumId: 'test_value', bestOfSimilarSetsOnly: 'test_value', curatedAlbumId: 'test_value', splitByTier: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('and_params=');
    expect(path).toContain('and_string_params=');
    expect(path).toContain('or_params=');
    expect(path).toContain('or_string_params=');
    expect(path).toContain('not_params=');
    expect(path).toContain('not_string_params=');
    expect(path).toContain('date_min=');
    expect(path).toContain('date_max=');
    expect(path).toContain('date_null_and=');
    expect(path).toContain('date_null_or=');
    expect(path).toContain('date_order=');
    expect(path).toContain('custom_album_id=');
    expect(path).toContain('best_of_similar_sets_only=');
    expect(path).toContain('curated_album_id=');
    expect(path).toContain('split_by_tier=');
  });

  it('searchProjectPhotos — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.searchProjectPhotos('test_value', { andParams: 'test_value', andStringParams: 'test_value', orParams: 'test_value', orStringParams: 'test_value', notParams: 'test_value', notStringParams: 'test_value', dateMin: 'test_value', dateMax: 'test_value', dateNullAnd: 'test_value', dateNullOr: 'test_value', dateOrder: 'test_value', customAlbumId: 'test_value', bestOfSimilarSetsOnly: 'test_value', curatedAlbumId: 'test_value', splitByTier: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('searchProjectPhotosText — exists', () => {
    const search = new Search({});
    expect(typeof search.searchProjectPhotosText).toBe('function');
  });

  it('searchProjectPhotosText — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.searchProjectPhotosText('test_value', { q: 'test_value', size: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('searchProjectPhotosText — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.searchProjectPhotosText('hello world', { q: 'test_value', size: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/search/text/hello%20world/');
  });

  it('searchProjectPhotosText — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.searchProjectPhotosText('test_value', { q: 'test_value', size: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('q=');
    expect(path).toContain('size=');
  });

  it('searchProjectPhotosText — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.searchProjectPhotosText('test_value', { q: 'test_value', size: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectSavedSearches — exists', () => {
    const search = new Search({});
    expect(typeof search.getProjectSavedSearches).toBe('function');
  });

  it('getProjectSavedSearches — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.getProjectSavedSearches('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectSavedSearches — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.getProjectSavedSearches('hello world');
    expect(spy.last_call().path).toContain('/api/v1/search/saved/hello%20world/');
  });

  it('getProjectSavedSearches — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.getProjectSavedSearches('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getSavedSearchById — exists', () => {
    const search = new Search({});
    expect(typeof search.getSavedSearchById).toBe('function');
  });

  it('getSavedSearchById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.getSavedSearchById(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getSavedSearchById — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.getSavedSearchById(42);
    expect(spy.last_call().path).toContain('/api/v1/search/42');
  });

  it('getSavedSearchById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.getSavedSearchById(42);
    expect(spy.calls.length).toBe(1);
  });

  it('saveProjectPhotosSearch — exists', () => {
    const search = new Search({});
    expect(typeof search.saveProjectPhotosSearch).toBe('function');
  });

  it('saveProjectPhotosSearch — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.saveProjectPhotosSearch('test_value', { searchName: 'test_value', andParams: 'test_value', andStringParams: 'test_value', orParams: 'test_value', orStringParams: 'test_value', notParams: 'test_value', notStringParams: 'test_value', dateMin: 'test_value', dateMax: 'test_value', dateNullAnd: 'test_value', dateNullOr: 'test_value', dateOrder: 'test_value', customAlbumId: 'test_value', bestOfSimilarSetsOnly: 'test_value', curatedAlbumId: 'test_value', splitByTier: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('saveProjectPhotosSearch — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.saveProjectPhotosSearch('hello world', { searchName: 'test_value', andParams: 'test_value', andStringParams: 'test_value', orParams: 'test_value', orStringParams: 'test_value', notParams: 'test_value', notStringParams: 'test_value', dateMin: 'test_value', dateMax: 'test_value', dateNullAnd: 'test_value', dateNullOr: 'test_value', dateOrder: 'test_value', customAlbumId: 'test_value', bestOfSimilarSetsOnly: 'test_value', curatedAlbumId: 'test_value', splitByTier: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/search/hello%20world/');
  });

  it('saveProjectPhotosSearch — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.saveProjectPhotosSearch('test_value', { searchName: 'test_value', andParams: 'test_value', andStringParams: 'test_value', orParams: 'test_value', orStringParams: 'test_value', notParams: 'test_value', notStringParams: 'test_value', dateMin: 'test_value', dateMax: 'test_value', dateNullAnd: 'test_value', dateNullOr: 'test_value', dateOrder: 'test_value', customAlbumId: 'test_value', bestOfSimilarSetsOnly: 'test_value', curatedAlbumId: 'test_value', splitByTier: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('search_name=');
    expect(path).toContain('and_params=');
    expect(path).toContain('and_string_params=');
    expect(path).toContain('or_params=');
    expect(path).toContain('or_string_params=');
    expect(path).toContain('not_params=');
    expect(path).toContain('not_string_params=');
    expect(path).toContain('date_min=');
    expect(path).toContain('date_max=');
    expect(path).toContain('date_null_and=');
    expect(path).toContain('date_null_or=');
    expect(path).toContain('date_order=');
    expect(path).toContain('custom_album_id=');
    expect(path).toContain('best_of_similar_sets_only=');
    expect(path).toContain('curated_album_id=');
    expect(path).toContain('split_by_tier=');
  });

  it('saveProjectPhotosSearch — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.saveProjectPhotosSearch('test_value', { searchName: 'test_value', andParams: 'test_value', andStringParams: 'test_value', orParams: 'test_value', orStringParams: 'test_value', notParams: 'test_value', notStringParams: 'test_value', dateMin: 'test_value', dateMax: 'test_value', dateNullAnd: 'test_value', dateNullOr: 'test_value', dateOrder: 'test_value', customAlbumId: 'test_value', bestOfSimilarSetsOnly: 'test_value', curatedAlbumId: 'test_value', splitByTier: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('deleteSavedSearchById — exists', () => {
    const search = new Search({});
    expect(typeof search.deleteSavedSearchById).toBe('function');
  });

  it('deleteSavedSearchById — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.deleteSavedSearchById(42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteSavedSearchById — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.deleteSavedSearchById(42);
    expect(spy.last_call().path).toContain('/api/v1/search/42');
  });

  it('deleteSavedSearchById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const search = new Search(ctx);
    await search.deleteSavedSearchById(42);
    expect(spy.calls.length).toBe(1);
  });

});
