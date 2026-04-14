// Auto-generated — do not edit
import { checkProjectStatus, getProjectDataExportUploadStatus, requestProjectExport, getUserProjects, getProjectByDirectory, getProjectById, createProjectAndRun, updateProject, updateProjectPhotoCount, deleteProject, markProjectUploadComplete, addProjectEvent, updateProjectCreateUploadReport, getProjectPrelimModelRequestTemplate } from '../../javascript/projects.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Projects', () => {
  it('checkProjectStatus — exists', () => {
    expect(typeof checkProjectStatus).toBe('function');
  });

  it('checkProjectStatus — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await checkProjectStatus(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('checkProjectStatus — path construction', async () => {
    const spy = new SpyOAuthClient();
    await checkProjectStatus(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/project/status/test_value');
  });

  it('checkProjectStatus — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await checkProjectStatus(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectDataExportUploadStatus — exists', () => {
    expect(typeof getProjectDataExportUploadStatus).toBe('function');
  });

  it('getProjectDataExportUploadStatus — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectDataExportUploadStatus(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectDataExportUploadStatus — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectDataExportUploadStatus(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects/test_value/upload_status/test_value');
  });

  it('getProjectDataExportUploadStatus — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectDataExportUploadStatus(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('requestProjectExport — exists', () => {
    expect(typeof requestProjectExport).toBe('function');
  });

  it('requestProjectExport — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await requestProjectExport(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('requestProjectExport — path construction', async () => {
    const spy = new SpyOAuthClient();
    await requestProjectExport(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects_export/test_value');
  });

  it('requestProjectExport — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await requestProjectExport(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getUserProjects — exists', () => {
    expect(typeof getUserProjects).toBe('function');
  });

  it('getUserProjects — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getUserProjects(spy, 'access_token', 'refresh_token', { companyId: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getUserProjects — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getUserProjects(spy, 'access_token', 'refresh_token', { companyId: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/projects/user');
  });

  it('getUserProjects — query params', async () => {
    const spy = new SpyOAuthClient();
    await getUserProjects(spy, 'access_token', 'refresh_token', { companyId: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('company_id=');
  });

  it('getUserProjects — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getUserProjects(spy, 'access_token', 'refresh_token', { companyId: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectByDirectory — exists', () => {
    expect(typeof getProjectByDirectory).toBe('function');
  });

  it('getProjectByDirectory — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectByDirectory(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectByDirectory — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectByDirectory(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects/directory/test_value');
  });

  it('getProjectByDirectory — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectByDirectory(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectById — exists', () => {
    expect(typeof getProjectById).toBe('function');
  });

  it('getProjectById — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectById(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectById — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectById(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects/test_value');
  });

  it('getProjectById — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectById(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('createProjectAndRun — exists', () => {
    expect(typeof createProjectAndRun).toBe('function');
  });

  it('createProjectAndRun — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createProjectAndRun(spy, 'access_token', 'refresh_token', { Model: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createProjectAndRun — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createProjectAndRun(spy, 'access_token', 'refresh_token', { Model: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/project_outcome/');
  });

  it('createProjectAndRun — query params', async () => {
    const spy = new SpyOAuthClient();
    await createProjectAndRun(spy, 'access_token', 'refresh_token', { Model: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('outcomes=');
    expect(path).toContain('models=');
  });

  it('createProjectAndRun — request body', async () => {
    const spy = new SpyOAuthClient();
    await createProjectAndRun(spy, 'access_token', 'refresh_token', { Model: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('createProjectAndRun — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createProjectAndRun(spy, 'access_token', 'refresh_token', { Model: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('updateProject — exists', () => {
    expect(typeof updateProject).toBe('function');
  });

  it('updateProject — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateProject(spy, 'access_token', 'refresh_token', 'test_value', { Model: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateProject(spy, 'access_token', 'refresh_token', 'test_value', { Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/projects/test_value');
  });

  it('updateProject — request body', async () => {
    const spy = new SpyOAuthClient();
    await updateProject(spy, 'access_token', 'refresh_token', 'test_value', { Model: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('updateProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateProject(spy, 'access_token', 'refresh_token', 'test_value', { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('updateProjectPhotoCount — exists', () => {
    expect(typeof updateProjectPhotoCount).toBe('function');
  });

  it('updateProjectPhotoCount — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectPhotoCount(spy, 'access_token', 'refresh_token', 'test_value', { filesFailedCount: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateProjectPhotoCount — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectPhotoCount(spy, 'access_token', 'refresh_token', 'test_value', { filesFailedCount: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/projects_photos/test_value/');
  });

  it('updateProjectPhotoCount — query params', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectPhotoCount(spy, 'access_token', 'refresh_token', 'test_value', { filesFailedCount: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('files_failed_count=');
  });

  it('updateProjectPhotoCount — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectPhotoCount(spy, 'access_token', 'refresh_token', 'test_value', { filesFailedCount: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('deleteProject — exists', () => {
    expect(typeof deleteProject).toBe('function');
  });

  it('deleteProject — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    await deleteProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    await deleteProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects/test_value');
  });

  it('deleteProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await deleteProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('markProjectUploadComplete — exists', () => {
    expect(typeof markProjectUploadComplete).toBe('function');
  });

  it('markProjectUploadComplete — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await markProjectUploadComplete(spy, 'access_token', 'refresh_token', 'test_value', { skippedFileCount: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('markProjectUploadComplete — path construction', async () => {
    const spy = new SpyOAuthClient();
    await markProjectUploadComplete(spy, 'access_token', 'refresh_token', 'test_value', { skippedFileCount: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/project/test_value/upload_complete/');
  });

  it('markProjectUploadComplete — query params', async () => {
    const spy = new SpyOAuthClient();
    await markProjectUploadComplete(spy, 'access_token', 'refresh_token', 'test_value', { skippedFileCount: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('skipped_file_count=');
  });

  it('markProjectUploadComplete — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await markProjectUploadComplete(spy, 'access_token', 'refresh_token', 'test_value', { skippedFileCount: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('addProjectEvent — exists', () => {
    expect(typeof addProjectEvent).toBe('function');
  });

  it('addProjectEvent — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await addProjectEvent(spy, 'access_token', 'refresh_token', 'test_value', { Model: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('addProjectEvent — path construction', async () => {
    const spy = new SpyOAuthClient();
    await addProjectEvent(spy, 'access_token', 'refresh_token', 'test_value', { Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/projects/test_value/event');
  });

  it('addProjectEvent — request body', async () => {
    const spy = new SpyOAuthClient();
    await addProjectEvent(spy, 'access_token', 'refresh_token', 'test_value', { Model: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('addProjectEvent — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await addProjectEvent(spy, 'access_token', 'refresh_token', 'test_value', { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('updateProjectCreateUploadReport — exists', () => {
    expect(typeof updateProjectCreateUploadReport).toBe('function');
  });

  it('updateProjectCreateUploadReport — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectCreateUploadReport(spy, 'access_token', 'refresh_token', 'test_value', { filesFailedCount: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateProjectCreateUploadReport — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectCreateUploadReport(spy, 'access_token', 'refresh_token', 'test_value', { filesFailedCount: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/project_upload_report/test_value/');
  });

  it('updateProjectCreateUploadReport — query params', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectCreateUploadReport(spy, 'access_token', 'refresh_token', 'test_value', { filesFailedCount: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('files_failed_count=');
  });

  it('updateProjectCreateUploadReport — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectCreateUploadReport(spy, 'access_token', 'refresh_token', 'test_value', { filesFailedCount: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectPrelimModelRequestTemplate — exists', () => {
    expect(typeof getProjectPrelimModelRequestTemplate).toBe('function');
  });

  it('getProjectPrelimModelRequestTemplate — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectPrelimModelRequestTemplate(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectPrelimModelRequestTemplate — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectPrelimModelRequestTemplate(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/project_outcome/test_value');
  });

  it('getProjectPrelimModelRequestTemplate — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectPrelimModelRequestTemplate(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

});
