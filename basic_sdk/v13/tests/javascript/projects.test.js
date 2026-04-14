// Auto-generated — do not edit
import { createProjectAndRun, markProjectUploadComplete, checkProjectStatus, deleteProject, getProjectPrelimModelRequestTemplate } from '../../javascript/projects.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Projects', () => {
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
