// Auto-generated — do not edit
import { Admin } from '../../javascript/admin.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Admin', () => {
  it('insertLabelCategoryMatrix — exists', () => {
    const admin = new Admin({});
    expect(typeof admin.insertLabelCategoryMatrix).toBe('function');
  });

  it('insertLabelCategoryMatrix — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.insertLabelCategoryMatrix();
    expect(spy.last_call().method).toBe('GET');
  });

  it('insertLabelCategoryMatrix — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.insertLabelCategoryMatrix();
    expect(spy.last_call().path).toContain('/api/v1/admin/insert_label_category_matrix');
  });

  it('insertLabelCategoryMatrix — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.insertLabelCategoryMatrix();
    expect(spy.calls.length).toBe(1);
  });

  it('generateMidLevelCategoryKeywordAlignment — exists', () => {
    const admin = new Admin({});
    expect(typeof admin.generateMidLevelCategoryKeywordAlignment).toBe('function');
  });

  it('generateMidLevelCategoryKeywordAlignment — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.generateMidLevelCategoryKeywordAlignment();
    expect(spy.last_call().method).toBe('GET');
  });

  it('generateMidLevelCategoryKeywordAlignment — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.generateMidLevelCategoryKeywordAlignment();
    expect(spy.last_call().path).toContain('/api/v1/admin/generate_mid_level_category_keyword_alignment');
  });

  it('generateMidLevelCategoryKeywordAlignment — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.generateMidLevelCategoryKeywordAlignment();
    expect(spy.calls.length).toBe(1);
  });

  it('getCategoryLabels — exists', () => {
    const admin = new Admin({});
    expect(typeof admin.getCategoryLabels).toBe('function');
  });

  it('getCategoryLabels — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.getCategoryLabels('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getCategoryLabels — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.getCategoryLabels('hello world');
    expect(spy.last_call().path).toContain('/api/v1/admin/category_labels/hello%20world');
  });

  it('getCategoryLabels — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.getCategoryLabels('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('adminDumpCompanyNlpIndex — exists', () => {
    const admin = new Admin({});
    expect(typeof admin.adminDumpCompanyNlpIndex).toBe('function');
  });

  it('adminDumpCompanyNlpIndex — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDumpCompanyNlpIndex(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('adminDumpCompanyNlpIndex — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDumpCompanyNlpIndex(42);
    expect(spy.last_call().path).toContain('/api/v1/admin/dump_company_nlp_index/42');
  });

  it('adminDumpCompanyNlpIndex — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDumpCompanyNlpIndex(42);
    expect(spy.calls.length).toBe(1);
  });

  it('getAllKeywordGroupsAndSubgroups — exists', () => {
    const admin = new Admin({});
    expect(typeof admin.getAllKeywordGroupsAndSubgroups).toBe('function');
  });

  it('getAllKeywordGroupsAndSubgroups — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.getAllKeywordGroupsAndSubgroups();
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllKeywordGroupsAndSubgroups — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.getAllKeywordGroupsAndSubgroups();
    expect(spy.last_call().path).toContain('/api/v1/admin/keyword_group');
  });

  it('getAllKeywordGroupsAndSubgroups — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.getAllKeywordGroupsAndSubgroups();
    expect(spy.calls.length).toBe(1);
  });

  it('getKeywordGroupsLabelsByKeywordGroup — exists', () => {
    const admin = new Admin({});
    expect(typeof admin.getKeywordGroupsLabelsByKeywordGroup).toBe('function');
  });

  it('getKeywordGroupsLabelsByKeywordGroup — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.getKeywordGroupsLabelsByKeywordGroup('test_value', { subgroup: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getKeywordGroupsLabelsByKeywordGroup — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.getKeywordGroupsLabelsByKeywordGroup('hello world', { subgroup: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/admin/keyword_group/hello%20world/');
  });

  it('getKeywordGroupsLabelsByKeywordGroup — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.getKeywordGroupsLabelsByKeywordGroup('test_value', { subgroup: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('subgroup=');
  });

  it('getKeywordGroupsLabelsByKeywordGroup — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.getKeywordGroupsLabelsByKeywordGroup('test_value', { subgroup: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('adminCreateCompanyNlpIndexes — exists', () => {
    const admin = new Admin({});
    expect(typeof admin.adminCreateCompanyNlpIndexes).toBe('function');
  });

  it('adminCreateCompanyNlpIndexes — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminCreateCompanyNlpIndexes({ companyIds: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('adminCreateCompanyNlpIndexes — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminCreateCompanyNlpIndexes({ companyIds: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/admin/create_company_nlp_indexes/');
  });

  it('adminCreateCompanyNlpIndexes — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminCreateCompanyNlpIndexes({ companyIds: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('company_ids=');
  });

  it('adminCreateCompanyNlpIndexes — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminCreateCompanyNlpIndexes({ companyIds: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('adminCreateNlHybridPipelines — exists', () => {
    const admin = new Admin({});
    expect(typeof admin.adminCreateNlHybridPipelines).toBe('function');
  });

  it('adminCreateNlHybridPipelines — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminCreateNlHybridPipelines();
    expect(spy.last_call().method).toBe('POST');
  });

  it('adminCreateNlHybridPipelines — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminCreateNlHybridPipelines();
    expect(spy.last_call().path).toContain('/api/v1/admin/search/nl_create_hybrid_pipelines');
  });

  it('adminCreateNlHybridPipelines — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminCreateNlHybridPipelines();
    expect(spy.calls.length).toBe(1);
  });

  it('adminDeleteCompanyNlpIndexes — exists', () => {
    const admin = new Admin({});
    expect(typeof admin.adminDeleteCompanyNlpIndexes).toBe('function');
  });

  it('adminDeleteCompanyNlpIndexes — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDeleteCompanyNlpIndexes({ companyIds: 'test_value' });
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('adminDeleteCompanyNlpIndexes — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDeleteCompanyNlpIndexes({ companyIds: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/admin/delete_company_nlp_indexes/');
  });

  it('adminDeleteCompanyNlpIndexes — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDeleteCompanyNlpIndexes({ companyIds: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('company_ids=');
  });

  it('adminDeleteCompanyNlpIndexes — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDeleteCompanyNlpIndexes({ companyIds: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('adminDeleteUserProjects — exists', () => {
    const admin = new Admin({});
    expect(typeof admin.adminDeleteUserProjects).toBe('function');
  });

  it('adminDeleteUserProjects — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDeleteUserProjects({ userIds: 'test_value' });
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('adminDeleteUserProjects — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDeleteUserProjects({ userIds: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/admin/delete_user_projects/');
  });

  it('adminDeleteUserProjects — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDeleteUserProjects({ userIds: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('user_ids=');
  });

  it('adminDeleteUserProjects — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDeleteUserProjects({ userIds: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('adminDeleteUser — exists', () => {
    const admin = new Admin({});
    expect(typeof admin.adminDeleteUser).toBe('function');
  });

  it('adminDeleteUser — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDeleteUser({ userIds: 'test_value' });
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('adminDeleteUser — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDeleteUser({ userIds: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/admin/delete_user/');
  });

  it('adminDeleteUser — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDeleteUser({ userIds: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('user_ids=');
  });

  it('adminDeleteUser — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const admin = new Admin(ctx);
    await admin.adminDeleteUser({ userIds: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
