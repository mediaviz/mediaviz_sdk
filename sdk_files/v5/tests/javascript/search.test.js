// Auto-generated — do not edit
import { getSearch } from '../../javascript/search.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Search', () => {
  it('getSearch — exists', () => {
    expect(typeof getSearch).toBe('function');
  });

  it('getSearch — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getSearch(spy, 'access_token', 'refresh_token', 'test_value', { andParams: 'test_value', orParams: 'test_value', dateNullAnd: true, dateMin: 'test_value', dateMax: 'test_value', customAlbumId: 42, curatedAlbumName: 'test_value', dateOrder: 'test_value', bestOfSimilarSetsOnly: true });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getSearch — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getSearch(spy, 'access_token', 'refresh_token', 'hello world', { andParams: 'test_value', orParams: 'test_value', dateNullAnd: true, dateMin: 'test_value', dateMax: 'test_value', customAlbumId: 42, curatedAlbumName: 'test_value', dateOrder: 'test_value', bestOfSimilarSetsOnly: true });
    expect(spy.last_call().path).toContain('/api/v1/search/hello%20world/');
  });

  it('getSearch — query params', async () => {
    const spy = new SpyOAuthClient();
    await getSearch(spy, 'access_token', 'refresh_token', 'test_value', { andParams: 'test_value', orParams: 'test_value', dateNullAnd: true, dateMin: 'test_value', dateMax: 'test_value', customAlbumId: 42, curatedAlbumName: 'test_value', dateOrder: 'test_value', bestOfSimilarSetsOnly: true });
    const path = spy.last_call().path;
    expect(path).toContain('and_params=');
    expect(path).toContain('or_params=');
    expect(path).toContain('date_null_and=');
    expect(path).toContain('date_min=');
    expect(path).toContain('date_max=');
    expect(path).toContain('custom_album_id=');
    expect(path).toContain('curated_album_name=');
    expect(path).toContain('date_order=');
    expect(path).toContain('best_of_similar_sets_only=');
  });

  it('getSearch — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getSearch(spy, 'access_token', 'refresh_token', 'test_value', { andParams: 'test_value', orParams: 'test_value', dateNullAnd: true, dateMin: 'test_value', dateMax: 'test_value', customAlbumId: 42, curatedAlbumName: 'test_value', dateOrder: 'test_value', bestOfSimilarSetsOnly: true });
    expect(spy.calls.length).toBe(1);
  });

});
