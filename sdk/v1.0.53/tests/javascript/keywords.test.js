// Auto-generated — do not edit
import { Keywords } from '../../javascript/keywords.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Keywords', () => {
  it('createKeywordFilteringList — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.createKeywordFilteringList).toBe('function');
  });

  it('createKeywordFilteringList — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.createKeywordFilteringList('test_value', ['item1', 'item2']);
    expect(spy.last_call().method).toBe('POST');
  });

  it('createKeywordFilteringList — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.createKeywordFilteringList('test_value', ['item1', 'item2']);
    expect(spy.last_call().path).toContain('/api/v1/keyword/');
  });

  it('createKeywordFilteringList — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.createKeywordFilteringList('test_value', ['item1', 'item2']);
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('project_list');
  });

  it('createKeywordFilteringList — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.createKeywordFilteringList('test_value', ['item1', 'item2']);
    expect(spy.calls.length).toBe(1);
  });

  it('getUserKeywordFilteringLists — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.getUserKeywordFilteringLists).toBe('function');
  });

  it('getUserKeywordFilteringLists — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getUserKeywordFilteringLists();
    expect(spy.last_call().method).toBe('GET');
  });

  it('getUserKeywordFilteringLists — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getUserKeywordFilteringLists();
    expect(spy.last_call().path).toContain('/api/v1/keyword/user');
  });

  it('getUserKeywordFilteringLists — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getUserKeywordFilteringLists();
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordFilteringListAndProjectsById — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.getKeywordFilteringListAndProjectsById).toBe('function');
  });

  it('getKeywordFilteringListAndProjectsById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getKeywordFilteringListAndProjectsById(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordFilteringListAndProjectsById — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getKeywordFilteringListAndProjectsById(42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/42');
  });

  it('getKeywordFilteringListAndProjectsById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getKeywordFilteringListAndProjectsById(42);
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordFilteringListById — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.getKeywordFilteringListById).toBe('function');
  });

  it('getKeywordFilteringListById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getKeywordFilteringListById(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordFilteringListById — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getKeywordFilteringListById(42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/list/42');
  });

  it('getKeywordFilteringListById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getKeywordFilteringListById(42);
    expect(spy.calls.length).toBe(1);
  });

  it('getExistingKeywordFilteringListByProject — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.getExistingKeywordFilteringListByProject).toBe('function');
  });

  it('getExistingKeywordFilteringListByProject — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getExistingKeywordFilteringListByProject('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getExistingKeywordFilteringListByProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getExistingKeywordFilteringListByProject('hello world');
    expect(spy.last_call().path).toContain('/api/v1/keyword/project/hello%20world');
  });

  it('getExistingKeywordFilteringListByProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getExistingKeywordFilteringListByProject('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getDefaultKeywordFilteringListByProject — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.getDefaultKeywordFilteringListByProject).toBe('function');
  });

  it('getDefaultKeywordFilteringListByProject — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getDefaultKeywordFilteringListByProject('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getDefaultKeywordFilteringListByProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getDefaultKeywordFilteringListByProject('hello world');
    expect(spy.last_call().path).toContain('/api/v1/keyword/project/hello%20world/default');
  });

  it('getDefaultKeywordFilteringListByProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getDefaultKeywordFilteringListByProject('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('updateKeywordFilteringListLabels — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.updateKeywordFilteringListLabels).toBe('function');
  });

  it('updateKeywordFilteringListLabels — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.updateKeywordFilteringListLabels(42, ['item1', 'item2'], ['item1', 'item2']);
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateKeywordFilteringListLabels — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.updateKeywordFilteringListLabels(42, ['item1', 'item2'], ['item1', 'item2']);
    expect(spy.last_call().path).toContain('/api/v1/keyword/42');
  });

  it('updateKeywordFilteringListLabels — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.updateKeywordFilteringListLabels(42, ['item1', 'item2'], ['item1', 'item2']);
    const body = spy.last_call().body;
    expect(body).toHaveProperty('list_keywords_to_include');
    expect(body).toHaveProperty('list_keywords_to_exclude');
  });

  it('updateKeywordFilteringListLabels — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.updateKeywordFilteringListLabels(42, ['item1', 'item2'], ['item1', 'item2']);
    expect(spy.calls.length).toBe(1);
  });

  it('updateKeywordFilteringListDetails — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.updateKeywordFilteringListDetails).toBe('function');
  });

  it('updateKeywordFilteringListDetails — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.updateKeywordFilteringListDetails(42, { name: 'test_value', projectList: ['item1', 'item2'] });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateKeywordFilteringListDetails — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.updateKeywordFilteringListDetails(42, { name: 'test_value', projectList: ['item1', 'item2'] });
    expect(spy.last_call().path).toContain('/api/v1/keyword/details/42');
  });

  it('updateKeywordFilteringListDetails — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.updateKeywordFilteringListDetails(42, { name: 'test_value', projectList: ['item1', 'item2'] });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('project_list');
  });

  it('updateKeywordFilteringListDetails — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.updateKeywordFilteringListDetails(42, { name: 'test_value', projectList: ['item1', 'item2'] });
    expect(spy.calls.length).toBe(1);
  });

  it('addProjectsToKeywordFilteringList — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.addProjectsToKeywordFilteringList).toBe('function');
  });

  it('addProjectsToKeywordFilteringList — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.addProjectsToKeywordFilteringList(42, { projectIds: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('addProjectsToKeywordFilteringList — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.addProjectsToKeywordFilteringList(42, { projectIds: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/keyword/42/projects');
  });

  it('addProjectsToKeywordFilteringList — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.addProjectsToKeywordFilteringList(42, { projectIds: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('project_ids=');
  });

  it('addProjectsToKeywordFilteringList — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.addProjectsToKeywordFilteringList(42, { projectIds: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('requestKeywordListExport — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.requestKeywordListExport).toBe('function');
  });

  it('requestKeywordListExport — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.requestKeywordListExport(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('requestKeywordListExport — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.requestKeywordListExport(42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/export/42');
  });

  it('requestKeywordListExport — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.requestKeywordListExport(42);
    expect(spy.calls.length).toBe(1);
  });

  it('requestKeywordListExportStatus — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.requestKeywordListExportStatus).toBe('function');
  });

  it('requestKeywordListExportStatus — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.requestKeywordListExportStatus(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('requestKeywordListExportStatus — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.requestKeywordListExportStatus(42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/export_status/42');
  });

  it('requestKeywordListExportStatus — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.requestKeywordListExportStatus(42);
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordsAndIds — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.getKeywordsAndIds).toBe('function');
  });

  it('getKeywordsAndIds — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getKeywordsAndIds();
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordsAndIds — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getKeywordsAndIds();
    expect(spy.last_call().path).toContain('/api/v1/keyword/all_keywords/id/label');
  });

  it('getKeywordsAndIds — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.getKeywordsAndIds();
    expect(spy.calls.length).toBe(1);
  });

  it('removeProjectsFromKeywordFilteringList — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.removeProjectsFromKeywordFilteringList).toBe('function');
  });

  it('removeProjectsFromKeywordFilteringList — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.removeProjectsFromKeywordFilteringList(42, { projectIds: 'test_value' });
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('removeProjectsFromKeywordFilteringList — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.removeProjectsFromKeywordFilteringList(42, { projectIds: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/keyword/42/projects');
  });

  it('removeProjectsFromKeywordFilteringList — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.removeProjectsFromKeywordFilteringList(42, { projectIds: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('project_ids=');
  });

  it('removeProjectsFromKeywordFilteringList — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.removeProjectsFromKeywordFilteringList(42, { projectIds: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('deleteKeywordFilteringListById — exists', () => {
    const keywords = new Keywords({});
    expect(typeof keywords.deleteKeywordFilteringListById).toBe('function');
  });

  it('deleteKeywordFilteringListById — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.deleteKeywordFilteringListById(42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteKeywordFilteringListById — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.deleteKeywordFilteringListById(42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/42');
  });

  it('deleteKeywordFilteringListById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const keywords = new Keywords(ctx);
    await keywords.deleteKeywordFilteringListById(42);
    expect(spy.calls.length).toBe(1);
  });

});
