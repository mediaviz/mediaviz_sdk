// Auto-generated — do not edit
import { getKeywordUser, createKeyword, getKeywordList, getKeywordProjectDefault, getKeywordProject, getKeywordAllKeywordsIdLabel, updateKeyword, updateKeywordDetails, createKeywordProjects, getKeyword, deleteKeywordProjects, deleteKeyword, getKeywordExport, getKeywordExportStatus } from '../../javascript/keywords.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Keywords', () => {
  it('getKeywordUser — exists', () => {
    expect(typeof getKeywordUser).toBe('function');
  });

  it('getKeywordUser — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordUser(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordUser — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordUser(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().path).toContain('/api/v1/keyword/user');
  });

  it('getKeywordUser — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordUser(spy, 'access_token', 'refresh_token');
    expect(spy.calls.length).toBe(1);
  });

  it('createKeyword — exists', () => {
    expect(typeof createKeyword).toBe('function');
  });

  it('createKeyword — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createKeyword(spy, 'access_token', 'refresh_token', { name: 'test_value', projectList: ['item1', 'item2'] });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createKeyword — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createKeyword(spy, 'access_token', 'refresh_token', { name: 'test_value', projectList: ['item1', 'item2'] });
    expect(spy.last_call().path).toContain('/api/v1/keyword/');
  });

  it('createKeyword — request body', async () => {
    const spy = new SpyOAuthClient();
    await createKeyword(spy, 'access_token', 'refresh_token', { name: 'test_value', projectList: ['item1', 'item2'] });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('project_list');
  });

  it('createKeyword — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createKeyword(spy, 'access_token', 'refresh_token', { name: 'test_value', projectList: ['item1', 'item2'] });
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordList — exists', () => {
    expect(typeof getKeywordList).toBe('function');
  });

  it('getKeywordList — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordList(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordList — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordList(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/list/42');
  });

  it('getKeywordList — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordList(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordProjectDefault — exists', () => {
    expect(typeof getKeywordProjectDefault).toBe('function');
  });

  it('getKeywordProjectDefault — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordProjectDefault(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordProjectDefault — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordProjectDefault(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/keyword/project/hello%20world/default');
  });

  it('getKeywordProjectDefault — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordProjectDefault(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordProject — exists', () => {
    expect(typeof getKeywordProject).toBe('function');
  });

  it('getKeywordProject — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordProject(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/keyword/project/hello%20world');
  });

  it('getKeywordProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordAllKeywordsIdLabel — exists', () => {
    expect(typeof getKeywordAllKeywordsIdLabel).toBe('function');
  });

  it('getKeywordAllKeywordsIdLabel — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordAllKeywordsIdLabel(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordAllKeywordsIdLabel — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordAllKeywordsIdLabel(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().path).toContain('/api/v1/keyword/all_keywords/id/label');
  });

  it('getKeywordAllKeywordsIdLabel — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordAllKeywordsIdLabel(spy, 'access_token', 'refresh_token');
    expect(spy.calls.length).toBe(1);
  });

  it('updateKeyword — exists', () => {
    expect(typeof updateKeyword).toBe('function');
  });

  it('updateKeyword — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateKeyword(spy, 'access_token', 'refresh_token', 42, { listKeywordsToInclude: ['item1', 'item2'], listKeywordsToExclude: ['item1', 'item2'] });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateKeyword — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateKeyword(spy, 'access_token', 'refresh_token', 42, { listKeywordsToInclude: ['item1', 'item2'], listKeywordsToExclude: ['item1', 'item2'] });
    expect(spy.last_call().path).toContain('/api/v1/keyword/42');
  });

  it('updateKeyword — request body', async () => {
    const spy = new SpyOAuthClient();
    await updateKeyword(spy, 'access_token', 'refresh_token', 42, { listKeywordsToInclude: ['item1', 'item2'], listKeywordsToExclude: ['item1', 'item2'] });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('list_keywords_to_include');
    expect(body).toHaveProperty('list_keywords_to_exclude');
  });

  it('updateKeyword — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateKeyword(spy, 'access_token', 'refresh_token', 42, { listKeywordsToInclude: ['item1', 'item2'], listKeywordsToExclude: ['item1', 'item2'] });
    expect(spy.calls.length).toBe(1);
  });

  it('updateKeywordDetails — exists', () => {
    expect(typeof updateKeywordDetails).toBe('function');
  });

  it('updateKeywordDetails — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateKeywordDetails(spy, 'access_token', 'refresh_token', 42, { name: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateKeywordDetails — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateKeywordDetails(spy, 'access_token', 'refresh_token', 42, { name: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/keyword/details/42');
  });

  it('updateKeywordDetails — request body', async () => {
    const spy = new SpyOAuthClient();
    await updateKeywordDetails(spy, 'access_token', 'refresh_token', 42, { name: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
  });

  it('updateKeywordDetails — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateKeywordDetails(spy, 'access_token', 'refresh_token', 42, { name: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('createKeywordProjects — exists', () => {
    expect(typeof createKeywordProjects).toBe('function');
  });

  it('createKeywordProjects — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createKeywordProjects(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.last_call().method).toBe('POST');
  });

  it('createKeywordProjects — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createKeywordProjects(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.last_call().path).toContain('/api/v1/keyword/42/projects');
  });

  it('createKeywordProjects — request body', async () => {
    const spy = new SpyOAuthClient();
    await createKeywordProjects(spy, 'access_token', 'refresh_token', 42, {});
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('createKeywordProjects — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createKeywordProjects(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.calls.length).toBe(1);
  });

  it('getKeyword — exists', () => {
    expect(typeof getKeyword).toBe('function');
  });

  it('getKeyword — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getKeyword(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeyword — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getKeyword(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/42');
  });

  it('getKeyword — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getKeyword(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('deleteKeywordProjects — exists', () => {
    expect(typeof deleteKeywordProjects).toBe('function');
  });

  it('deleteKeywordProjects — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    await deleteKeywordProjects(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteKeywordProjects — path construction', async () => {
    const spy = new SpyOAuthClient();
    await deleteKeywordProjects(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.last_call().path).toContain('/api/v1/keyword/42/projects');
  });

  it('deleteKeywordProjects — request body', async () => {
    const spy = new SpyOAuthClient();
    await deleteKeywordProjects(spy, 'access_token', 'refresh_token', 42, {});
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('deleteKeywordProjects — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await deleteKeywordProjects(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.calls.length).toBe(1);
  });

  it('deleteKeyword — exists', () => {
    expect(typeof deleteKeyword).toBe('function');
  });

  it('deleteKeyword — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    await deleteKeyword(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteKeyword — path construction', async () => {
    const spy = new SpyOAuthClient();
    await deleteKeyword(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/42');
  });

  it('deleteKeyword — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await deleteKeyword(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordExport — exists', () => {
    expect(typeof getKeywordExport).toBe('function');
  });

  it('getKeywordExport — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordExport(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordExport — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordExport(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/export/42');
  });

  it('getKeywordExport — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordExport(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordExportStatus — exists', () => {
    expect(typeof getKeywordExportStatus).toBe('function');
  });

  it('getKeywordExportStatus — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordExportStatus(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordExportStatus — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordExportStatus(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/export_status/42');
  });

  it('getKeywordExportStatus — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordExportStatus(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

});
