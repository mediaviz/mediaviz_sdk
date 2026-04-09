// Auto-generated — do not edit
import { getUserKeywordFilteringLists, createKeywordFilteringList, getKeywordFilteringListById, getDefaultKeywordFilteringListByProject, getExistingKeywordFilteringListByProject, getKeywordsAndIds, updateKeywordFilteringListLabels, updateKeywordFilteringListDetails, addProjectToKeywordFilteringList, getKeywordFilteringListAndProjectsById, removeProjectsFromKeywordFilteringList, deleteKeywordFilteringListById, requestKeywordListExport, requestKeywordListExportStatus } from '../../javascript/keywords.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Keywords', () => {
  it('getUserKeywordFilteringLists — exists', () => {
    expect(typeof getUserKeywordFilteringLists).toBe('function');
  });

  it('getUserKeywordFilteringLists — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getUserKeywordFilteringLists(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getUserKeywordFilteringLists — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getUserKeywordFilteringLists(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().path).toContain('/api/v1/keyword/user');
  });

  it('getUserKeywordFilteringLists — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getUserKeywordFilteringLists(spy, 'access_token', 'refresh_token');
    expect(spy.calls.length).toBe(1);
  });

  it('createKeywordFilteringList — exists', () => {
    expect(typeof createKeywordFilteringList).toBe('function');
  });

  it('createKeywordFilteringList — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createKeywordFilteringList(spy, 'access_token', 'refresh_token', { Model: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createKeywordFilteringList — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createKeywordFilteringList(spy, 'access_token', 'refresh_token', { Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/keyword/');
  });

  it('createKeywordFilteringList — request body', async () => {
    const spy = new SpyOAuthClient();
    await createKeywordFilteringList(spy, 'access_token', 'refresh_token', { Model: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('createKeywordFilteringList — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createKeywordFilteringList(spy, 'access_token', 'refresh_token', { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordFilteringListById — exists', () => {
    expect(typeof getKeywordFilteringListById).toBe('function');
  });

  it('getKeywordFilteringListById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordFilteringListById(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordFilteringListById — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordFilteringListById(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/list/42');
  });

  it('getKeywordFilteringListById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordFilteringListById(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('getDefaultKeywordFilteringListByProject — exists', () => {
    expect(typeof getDefaultKeywordFilteringListByProject).toBe('function');
  });

  it('getDefaultKeywordFilteringListByProject — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getDefaultKeywordFilteringListByProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getDefaultKeywordFilteringListByProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getDefaultKeywordFilteringListByProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/keyword/project/test_value/default');
  });

  it('getDefaultKeywordFilteringListByProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getDefaultKeywordFilteringListByProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getExistingKeywordFilteringListByProject — exists', () => {
    expect(typeof getExistingKeywordFilteringListByProject).toBe('function');
  });

  it('getExistingKeywordFilteringListByProject — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getExistingKeywordFilteringListByProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getExistingKeywordFilteringListByProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getExistingKeywordFilteringListByProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/keyword/project/test_value');
  });

  it('getExistingKeywordFilteringListByProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getExistingKeywordFilteringListByProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordsAndIds — exists', () => {
    expect(typeof getKeywordsAndIds).toBe('function');
  });

  it('getKeywordsAndIds — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordsAndIds(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordsAndIds — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordsAndIds(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().path).toContain('/api/v1/keyword/all_keywords/id/label');
  });

  it('getKeywordsAndIds — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordsAndIds(spy, 'access_token', 'refresh_token');
    expect(spy.calls.length).toBe(1);
  });

  it('updateKeywordFilteringListLabels — exists', () => {
    expect(typeof updateKeywordFilteringListLabels).toBe('function');
  });

  it('updateKeywordFilteringListLabels — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateKeywordFilteringListLabels(spy, 'access_token', 'refresh_token', 42, { Model: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateKeywordFilteringListLabels — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateKeywordFilteringListLabels(spy, 'access_token', 'refresh_token', 42, { Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/keyword/42');
  });

  it('updateKeywordFilteringListLabels — request body', async () => {
    const spy = new SpyOAuthClient();
    await updateKeywordFilteringListLabels(spy, 'access_token', 'refresh_token', 42, { Model: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('updateKeywordFilteringListLabels — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateKeywordFilteringListLabels(spy, 'access_token', 'refresh_token', 42, { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('updateKeywordFilteringListDetails — exists', () => {
    expect(typeof updateKeywordFilteringListDetails).toBe('function');
  });

  it('updateKeywordFilteringListDetails — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateKeywordFilteringListDetails(spy, 'access_token', 'refresh_token', 42, { Model: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateKeywordFilteringListDetails — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateKeywordFilteringListDetails(spy, 'access_token', 'refresh_token', 42, { Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/keyword/details/42');
  });

  it('updateKeywordFilteringListDetails — request body', async () => {
    const spy = new SpyOAuthClient();
    await updateKeywordFilteringListDetails(spy, 'access_token', 'refresh_token', 42, { Model: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('updateKeywordFilteringListDetails — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateKeywordFilteringListDetails(spy, 'access_token', 'refresh_token', 42, { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('addProjectToKeywordFilteringList — exists', () => {
    expect(typeof addProjectToKeywordFilteringList).toBe('function');
  });

  it('addProjectToKeywordFilteringList — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await addProjectToKeywordFilteringList(spy, 'access_token', 'refresh_token', 42, { projectIds: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('addProjectToKeywordFilteringList — path construction', async () => {
    const spy = new SpyOAuthClient();
    await addProjectToKeywordFilteringList(spy, 'access_token', 'refresh_token', 42, { projectIds: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/keyword/42/projects');
  });

  it('addProjectToKeywordFilteringList — query params', async () => {
    const spy = new SpyOAuthClient();
    await addProjectToKeywordFilteringList(spy, 'access_token', 'refresh_token', 42, { projectIds: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('project_ids=');
  });

  it('addProjectToKeywordFilteringList — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await addProjectToKeywordFilteringList(spy, 'access_token', 'refresh_token', 42, { projectIds: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordFilteringListAndProjectsById — exists', () => {
    expect(typeof getKeywordFilteringListAndProjectsById).toBe('function');
  });

  it('getKeywordFilteringListAndProjectsById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordFilteringListAndProjectsById(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordFilteringListAndProjectsById — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordFilteringListAndProjectsById(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/42');
  });

  it('getKeywordFilteringListAndProjectsById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordFilteringListAndProjectsById(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('removeProjectsFromKeywordFilteringList — exists', () => {
    expect(typeof removeProjectsFromKeywordFilteringList).toBe('function');
  });

  it('removeProjectsFromKeywordFilteringList — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    await removeProjectsFromKeywordFilteringList(spy, 'access_token', 'refresh_token', 42, { projectIds: 'test_value' });
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('removeProjectsFromKeywordFilteringList — path construction', async () => {
    const spy = new SpyOAuthClient();
    await removeProjectsFromKeywordFilteringList(spy, 'access_token', 'refresh_token', 42, { projectIds: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/keyword/42/projects');
  });

  it('removeProjectsFromKeywordFilteringList — query params', async () => {
    const spy = new SpyOAuthClient();
    await removeProjectsFromKeywordFilteringList(spy, 'access_token', 'refresh_token', 42, { projectIds: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('project_ids=');
  });

  it('removeProjectsFromKeywordFilteringList — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await removeProjectsFromKeywordFilteringList(spy, 'access_token', 'refresh_token', 42, { projectIds: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('deleteKeywordFilteringListById — exists', () => {
    expect(typeof deleteKeywordFilteringListById).toBe('function');
  });

  it('deleteKeywordFilteringListById — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    await deleteKeywordFilteringListById(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteKeywordFilteringListById — path construction', async () => {
    const spy = new SpyOAuthClient();
    await deleteKeywordFilteringListById(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/42');
  });

  it('deleteKeywordFilteringListById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await deleteKeywordFilteringListById(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('requestKeywordListExport — exists', () => {
    expect(typeof requestKeywordListExport).toBe('function');
  });

  it('requestKeywordListExport — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await requestKeywordListExport(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('requestKeywordListExport — path construction', async () => {
    const spy = new SpyOAuthClient();
    await requestKeywordListExport(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/export/42');
  });

  it('requestKeywordListExport — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await requestKeywordListExport(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('requestKeywordListExportStatus — exists', () => {
    expect(typeof requestKeywordListExportStatus).toBe('function');
  });

  it('requestKeywordListExportStatus — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await requestKeywordListExportStatus(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('requestKeywordListExportStatus — path construction', async () => {
    const spy = new SpyOAuthClient();
    await requestKeywordListExportStatus(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/keyword/export_status/42');
  });

  it('requestKeywordListExportStatus — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await requestKeywordListExportStatus(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

});
