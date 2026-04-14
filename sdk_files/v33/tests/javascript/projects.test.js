// Auto-generated — do not edit
import { Projects } from '../../javascript/projects.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Projects', () => {
  it('createProjectAndRun — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.createProjectAndRun).toBe('function');
  });

  it('createProjectAndRun — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.createProjectAndRun({ Model: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createProjectAndRun — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.createProjectAndRun({ Model: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/project_outcome/');
  });

  it('createProjectAndRun — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.createProjectAndRun({ Model: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('outcomes=');
    expect(path).toContain('models=');
  });

  it('createProjectAndRun — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.createProjectAndRun({ Model: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toBeDefined();
  });

  it('createProjectAndRun — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.createProjectAndRun({ Model: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('markProjectUploadComplete — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.markProjectUploadComplete).toBe('function');
  });

  it('markProjectUploadComplete — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.markProjectUploadComplete('test_value', { skippedFileCount: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('markProjectUploadComplete — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.markProjectUploadComplete('test_value', { skippedFileCount: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/project/test_value/upload_complete/');
  });

  it('markProjectUploadComplete — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.markProjectUploadComplete('test_value', { skippedFileCount: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('skipped_file_count=');
  });

  it('markProjectUploadComplete — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.markProjectUploadComplete('test_value', { skippedFileCount: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('checkProjectStatus — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.checkProjectStatus).toBe('function');
  });

  it('checkProjectStatus — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.checkProjectStatus('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('checkProjectStatus — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.checkProjectStatus('test_value');
    expect(spy.last_call().path).toContain('/api/v1/project/status/test_value');
  });

  it('checkProjectStatus — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.checkProjectStatus('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectPrelimModelRequestTemplate — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.getProjectPrelimModelRequestTemplate).toBe('function');
  });

  it('getProjectPrelimModelRequestTemplate — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectPrelimModelRequestTemplate('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectPrelimModelRequestTemplate — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectPrelimModelRequestTemplate('test_value');
    expect(spy.last_call().path).toContain('/api/v1/project_outcome/test_value');
  });

  it('getProjectPrelimModelRequestTemplate — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectPrelimModelRequestTemplate('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getUserProjects — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.getUserProjects).toBe('function');
  });

  it('getUserProjects — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getUserProjects();
    expect(spy.last_call().method).toBe('GET');
  });

  it('getUserProjects — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getUserProjects();
    expect(spy.last_call().path).toContain('/api/v1/projects/user');
  });

  it('getUserProjects — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getUserProjects();
    expect(spy.calls.length).toBe(1);
  });

  it('getAdminProjects — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.getAdminProjects).toBe('function');
  });

  it('getAdminProjects — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getAdminProjects();
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAdminProjects — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getAdminProjects();
    expect(spy.last_call().path).toContain('/api/v1/projects/admin');
  });

  it('getAdminProjects — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getAdminProjects();
    expect(spy.calls.length).toBe(1);
  });

  it('getAllUserProjectsAdmin — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.getAllUserProjectsAdmin).toBe('function');
  });

  it('getAllUserProjectsAdmin — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getAllUserProjectsAdmin(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllUserProjectsAdmin — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getAllUserProjectsAdmin(42);
    expect(spy.last_call().path).toContain('/api/v1/projects/admin/user/42');
  });

  it('getAllUserProjectsAdmin — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getAllUserProjectsAdmin(42);
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectById — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.getProjectById).toBe('function');
  });

  it('getProjectById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectById('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectById — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectById('test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects/test_value');
  });

  it('getProjectById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectById('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectByDirectory — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.getProjectByDirectory).toBe('function');
  });

  it('getProjectByDirectory — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectByDirectory('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectByDirectory — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectByDirectory('test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects/directory/test_value');
  });

  it('getProjectByDirectory — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectByDirectory('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('updateProject — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.updateProject).toBe('function');
  });

  it('updateProject — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProject('test_value', { Model: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProject('test_value', { Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/projects/test_value');
  });

  it('updateProject — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProject('test_value', { Model: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toBeDefined();
  });

  it('updateProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProject('test_value', { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('updateProjectPhotoCount — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.updateProjectPhotoCount).toBe('function');
  });

  it('updateProjectPhotoCount — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProjectPhotoCount('test_value', { filesFailedCount: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateProjectPhotoCount — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProjectPhotoCount('test_value', { filesFailedCount: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/projects_photos/test_value/');
  });

  it('updateProjectPhotoCount — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProjectPhotoCount('test_value', { filesFailedCount: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('files_failed_count=');
  });

  it('updateProjectPhotoCount — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProjectPhotoCount('test_value', { filesFailedCount: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('updateProjectCreateUploadReport — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.updateProjectCreateUploadReport).toBe('function');
  });

  it('updateProjectCreateUploadReport — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProjectCreateUploadReport('test_value', { filesFailedCount: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateProjectCreateUploadReport — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProjectCreateUploadReport('test_value', { filesFailedCount: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/project_upload_report/test_value/');
  });

  it('updateProjectCreateUploadReport — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProjectCreateUploadReport('test_value', { filesFailedCount: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('files_failed_count=');
  });

  it('updateProjectCreateUploadReport — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProjectCreateUploadReport('test_value', { filesFailedCount: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('requestProjectSimilarityQueue — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.requestProjectSimilarityQueue).toBe('function');
  });

  it('requestProjectSimilarityQueue — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectSimilarityQueue('test_value', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('requestProjectSimilarityQueue — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectSimilarityQueue('test_value', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects_similarity_queue/test_value/level/test_value');
  });

  it('requestProjectSimilarityQueue — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectSimilarityQueue('test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('requestProjectEvidenceQueue — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.requestProjectEvidenceQueue).toBe('function');
  });

  it('requestProjectEvidenceQueue — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectEvidenceQueue('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('requestProjectEvidenceQueue — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectEvidenceQueue('test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects_evidence_queue/test_value');
  });

  it('requestProjectEvidenceQueue — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectEvidenceQueue('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('requestProjectPersonhoodQueue — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.requestProjectPersonhoodQueue).toBe('function');
  });

  it('requestProjectPersonhoodQueue — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectPersonhoodQueue('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('requestProjectPersonhoodQueue — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectPersonhoodQueue('test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects_personhood_queue/test_value');
  });

  it('requestProjectPersonhoodQueue — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectPersonhoodQueue('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('requestInsightsQueue — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.requestInsightsQueue).toBe('function');
  });

  it('requestInsightsQueue — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestInsightsQueue('test_value', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('requestInsightsQueue — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestInsightsQueue('test_value', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/insights_queue/analysis_level/test_value/identifier/test_value');
  });

  it('requestInsightsQueue — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestInsightsQueue('test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('requestProjectExport — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.requestProjectExport).toBe('function');
  });

  it('requestProjectExport — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectExport('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('requestProjectExport — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectExport('test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects_export/test_value');
  });

  it('requestProjectExport — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectExport('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('requestProjectAdminExport — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.requestProjectAdminExport).toBe('function');
  });

  it('requestProjectAdminExport — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectAdminExport('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('requestProjectAdminExport — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectAdminExport('test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects_admin_export/test_value');
  });

  it('requestProjectAdminExport — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectAdminExport('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectDataExportUploadStatus — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.getProjectDataExportUploadStatus).toBe('function');
  });

  it('getProjectDataExportUploadStatus — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectDataExportUploadStatus('test_value', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectDataExportUploadStatus — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectDataExportUploadStatus('test_value', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects/test_value/upload_status/test_value');
  });

  it('getProjectDataExportUploadStatus — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectDataExportUploadStatus('test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('addProjectEvent — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.addProjectEvent).toBe('function');
  });

  it('addProjectEvent — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.addProjectEvent('test_value', { Model: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('addProjectEvent — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.addProjectEvent('test_value', { Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/projects/test_value/event');
  });

  it('addProjectEvent — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.addProjectEvent('test_value', { Model: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toBeDefined();
  });

  it('addProjectEvent — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.addProjectEvent('test_value', { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('deleteProject — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.deleteProject).toBe('function');
  });

  it('deleteProject — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.deleteProject('test_value');
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.deleteProject('test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects/test_value');
  });

  it('deleteProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.deleteProject('test_value');
    expect(spy.calls.length).toBe(1);
  });

});
