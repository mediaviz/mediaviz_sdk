// Auto-generated — do not edit
import { searchProjectPhotos } from '../../javascript/search.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Search', () => {
  it('searchProjectPhotos — exists', () => {
    expect(typeof searchProjectPhotos).toBe('function');
  });

  it('searchProjectPhotos — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await searchProjectPhotos(spy, 'access_token', 'refresh_token', 'test_value', { andParams: 'test_value', andStringParams: 'test_value', orParams: 'test_value', orStringParams: 'test_value', notParams: 'test_value', notStringParams: 'test_value', dateMin: 'test_value', dateMax: 'test_value', dateNullAnd: 'test_value', dateNullOr: 'test_value', dateOrder: 'test_value', customAlbumId: 'test_value', bestOfSimilarSetsOnly: 'test_value', curatedAlbumName: 'test_value', splitByTier: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('searchProjectPhotos — path construction', async () => {
    const spy = new SpyOAuthClient();
    await searchProjectPhotos(spy, 'access_token', 'refresh_token', 'test_value', { andParams: 'test_value', andStringParams: 'test_value', orParams: 'test_value', orStringParams: 'test_value', notParams: 'test_value', notStringParams: 'test_value', dateMin: 'test_value', dateMax: 'test_value', dateNullAnd: 'test_value', dateNullOr: 'test_value', dateOrder: 'test_value', customAlbumId: 'test_value', bestOfSimilarSetsOnly: 'test_value', curatedAlbumName: 'test_value', splitByTier: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/search/test_value/');
  });

  it('searchProjectPhotos — query params', async () => {
    const spy = new SpyOAuthClient();
    await searchProjectPhotos(spy, 'access_token', 'refresh_token', 'test_value', { andParams: 'test_value', andStringParams: 'test_value', orParams: 'test_value', orStringParams: 'test_value', notParams: 'test_value', notStringParams: 'test_value', dateMin: 'test_value', dateMax: 'test_value', dateNullAnd: 'test_value', dateNullOr: 'test_value', dateOrder: 'test_value', customAlbumId: 'test_value', bestOfSimilarSetsOnly: 'test_value', curatedAlbumName: 'test_value', splitByTier: 'test_value' });
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
    expect(path).toContain('curated_album_name=');
    expect(path).toContain('split_by_tier=');
  });

  it('searchProjectPhotos — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await searchProjectPhotos(spy, 'access_token', 'refresh_token', 'test_value', { andParams: 'test_value', andStringParams: 'test_value', orParams: 'test_value', orStringParams: 'test_value', notParams: 'test_value', notStringParams: 'test_value', dateMin: 'test_value', dateMax: 'test_value', dateNullAnd: 'test_value', dateNullOr: 'test_value', dateOrder: 'test_value', customAlbumId: 'test_value', bestOfSimilarSetsOnly: 'test_value', curatedAlbumName: 'test_value', splitByTier: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
