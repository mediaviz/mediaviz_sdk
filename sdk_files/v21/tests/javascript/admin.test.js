// Auto-generated — do not edit
import { getCategoryLabels, getAllKeywordGroupsAndSubgroups, getKeywordGroupsLabelsByKeywordGroup, getGoogleSheetsCredentials } from '../../javascript/admin.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Admin', () => {
  it('getCategoryLabels — exists', () => {
    expect(typeof getCategoryLabels).toBe('function');
  });

  it('getCategoryLabels — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getCategoryLabels(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCategoryLabels — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getCategoryLabels(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/admin/category_labels/test_value');
  });

  it('getCategoryLabels — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getCategoryLabels(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getAllKeywordGroupsAndSubgroups — exists', () => {
    expect(typeof getAllKeywordGroupsAndSubgroups).toBe('function');
  });

  it('getAllKeywordGroupsAndSubgroups — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getAllKeywordGroupsAndSubgroups(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllKeywordGroupsAndSubgroups — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getAllKeywordGroupsAndSubgroups(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().path).toContain('/api/v1/admin/keyword_group');
  });

  it('getAllKeywordGroupsAndSubgroups — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getAllKeywordGroupsAndSubgroups(spy, 'access_token', 'refresh_token');
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordGroupsLabelsByKeywordGroup — exists', () => {
    expect(typeof getKeywordGroupsLabelsByKeywordGroup).toBe('function');
  });

  it('getKeywordGroupsLabelsByKeywordGroup — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordGroupsLabelsByKeywordGroup(spy, 'access_token', 'refresh_token', 'test_value', { subgroup: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordGroupsLabelsByKeywordGroup — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordGroupsLabelsByKeywordGroup(spy, 'access_token', 'refresh_token', 'test_value', { subgroup: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/admin/keyword_group/test_value/');
  });

  it('getKeywordGroupsLabelsByKeywordGroup — query params', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordGroupsLabelsByKeywordGroup(spy, 'access_token', 'refresh_token', 'test_value', { subgroup: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('subgroup=');
  });

  it('getKeywordGroupsLabelsByKeywordGroup — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getKeywordGroupsLabelsByKeywordGroup(spy, 'access_token', 'refresh_token', 'test_value', { subgroup: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getGoogleSheetsCredentials — exists', () => {
    expect(typeof getGoogleSheetsCredentials).toBe('function');
  });

  it('getGoogleSheetsCredentials — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await getGoogleSheetsCredentials(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().method).toBe('POST');
  });

  it('getGoogleSheetsCredentials — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getGoogleSheetsCredentials(spy, 'access_token', 'refresh_token');
    expect(spy.last_call().path).toContain('/api/v1/admin/get_google_sheets_credentials');
  });

  it('getGoogleSheetsCredentials — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getGoogleSheetsCredentials(spy, 'access_token', 'refresh_token');
    expect(spy.calls.length).toBe(1);
  });

});
