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
    await projects.createProjectAndRun('test_value', true, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', { outcomes: 'test_value', models: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createProjectAndRun — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.createProjectAndRun('test_value', true, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', { outcomes: 'test_value', models: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/project_outcome/');
  });

  it('createProjectAndRun — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.createProjectAndRun('test_value', true, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', { outcomes: 'test_value', models: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('outcomes=');
    expect(path).toContain('models=');
  });

  it('createProjectAndRun — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.createProjectAndRun('test_value', true, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', { outcomes: 'test_value', models: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('private');
    expect(body).toHaveProperty('type');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('directory');
    expect(body).toHaveProperty('photo_upload_vector');
    expect(body).toHaveProperty('thumbnail');
    expect(body).toHaveProperty('run_name');
  });

  it('createProjectAndRun — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.createProjectAndRun('test_value', true, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', { outcomes: 'test_value', models: 'test_value' });
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
    await projects.markProjectUploadComplete('hello world', { skippedFileCount: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/project/hello%20world/upload_complete/');
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
    await projects.checkProjectStatus('hello world');
    expect(spy.last_call().path).toContain('/api/v1/project/status/hello%20world');
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
    await projects.getProjectPrelimModelRequestTemplate('hello world');
    expect(spy.last_call().path).toContain('/api/v1/project_outcome/hello%20world');
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
    await projects.getProjectById('hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects/hello%20world');
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
    await projects.getProjectByDirectory('hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects/directory/hello%20world');
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
    await projects.updateProject('test_value', { private: true, type: 42, description: 'test_value', directory: 'test_value', name: 'test_value', thumbnail: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProject('hello world', { private: true, type: 42, description: 'test_value', directory: 'test_value', name: 'test_value', thumbnail: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/projects/hello%20world');
  });

  it('updateProject — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProject('test_value', { private: true, type: 42, description: 'test_value', directory: 'test_value', name: 'test_value', thumbnail: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('private');
    expect(body).toHaveProperty('type');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('directory');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('thumbnail');
  });

  it('updateProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.updateProject('test_value', { private: true, type: 42, description: 'test_value', directory: 'test_value', name: 'test_value', thumbnail: 'test_value' });
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
    await projects.updateProjectPhotoCount('hello world', { filesFailedCount: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/projects_photos/hello%20world/');
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
    await projects.updateProjectCreateUploadReport('hello world', { filesFailedCount: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/project_upload_report/hello%20world/');
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
    await projects.requestProjectSimilarityQueue('hello world', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_similarity_queue/hello%20world/level/hello%20world');
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
    await projects.requestProjectEvidenceQueue('hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_evidence_queue/hello%20world');
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
    await projects.requestProjectPersonhoodQueue('hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_personhood_queue/hello%20world');
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
    await projects.requestInsightsQueue('hello world', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/insights_queue/analysis_level/hello%20world/identifier/hello%20world');
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
    await projects.requestProjectExport('hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_export/hello%20world');
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
    await projects.requestProjectAdminExport('hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_admin_export/hello%20world');
  });

  it('requestProjectAdminExport — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.requestProjectAdminExport('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectProcessStatus — exists', () => {
    const projects = new Projects({});
    expect(typeof projects.getProjectProcessStatus).toBe('function');
  });

  it('getProjectProcessStatus — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectProcessStatus('test_value', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectProcessStatus — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectProcessStatus('hello world', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects/hello%20world/process_status/hello%20world');
  });

  it('getProjectProcessStatus — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.getProjectProcessStatus('test_value', 'test_value');
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
    await projects.addProjectEvent('test_value', 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('POST');
  });

  it('addProjectEvent — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.addProjectEvent('hello world', 'test_value', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects/hello%20world/event');
  });

  it('addProjectEvent — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.addProjectEvent('test_value', 'test_value', 'test_value');
    const body = spy.last_call().body;
    expect(body).toHaveProperty('event');
    expect(body).toHaveProperty('detail');
  });

  it('addProjectEvent — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.addProjectEvent('test_value', 'test_value', 'test_value');
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
    await projects.deleteProject('hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects/hello%20world');
  });

  it('deleteProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const projects = new Projects(ctx);
    await projects.deleteProject('test_value');
    expect(spy.calls.length).toBe(1);
  });

});
