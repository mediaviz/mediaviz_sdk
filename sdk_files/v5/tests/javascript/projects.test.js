// Auto-generated — do not edit
import { getProjectsUser, getProjectsDirectory, getProjects, createProjectOutcome, updateProjects, updateProjectsPhotos, deleteProjects, createProjectsEvent } from '../../javascript/projects.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Projects', () => {
  it('getProjectsUser — exists', () => {
    expect(typeof getProjectsUser).toBe('function');
  });

  it('getProjectsUser — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsUser(spy, 'access_token', 'refresh_token', { companyId: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsUser — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsUser(spy, 'access_token', 'refresh_token', { companyId: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/projects/user');
  });

  it('getProjectsUser — query params', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsUser(spy, 'access_token', 'refresh_token', { companyId: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('company_id=');
  });

  it('getProjectsUser — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsUser(spy, 'access_token', 'refresh_token', { companyId: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectsDirectory — exists', () => {
    expect(typeof getProjectsDirectory).toBe('function');
  });

  it('getProjectsDirectory — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsDirectory(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsDirectory — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsDirectory(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/projects/directory/test_value');
  });

  it('getProjectsDirectory — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsDirectory(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjects — exists', () => {
    expect(typeof getProjects).toBe('function');
  });

  it('getProjects — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjects(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjects — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjects(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/projects/42');
  });

  it('getProjects — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjects(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('createProjectOutcome — exists', () => {
    expect(typeof createProjectOutcome).toBe('function');
  });

  it('createProjectOutcome — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createProjectOutcome(spy, 'access_token', 'refresh_token', { name: 'test_value', description: 'test_value', thumbnail: 'test_value', photoUploadVector: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createProjectOutcome — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createProjectOutcome(spy, 'access_token', 'refresh_token', { name: 'test_value', description: 'test_value', thumbnail: 'test_value', photoUploadVector: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/project_outcome/');
  });

  it('createProjectOutcome — query params', async () => {
    const spy = new SpyOAuthClient();
    await createProjectOutcome(spy, 'access_token', 'refresh_token', { name: 'test_value', description: 'test_value', thumbnail: 'test_value', photoUploadVector: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('outcomes=');
    expect(path).toContain('models=');
  });

  it('createProjectOutcome — request body', async () => {
    const spy = new SpyOAuthClient();
    await createProjectOutcome(spy, 'access_token', 'refresh_token', { name: 'test_value', description: 'test_value', thumbnail: 'test_value', photoUploadVector: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('thumbnail');
    expect(body).toHaveProperty('photo_upload_vector');
  });

  it('createProjectOutcome — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createProjectOutcome(spy, 'access_token', 'refresh_token', { name: 'test_value', description: 'test_value', thumbnail: 'test_value', photoUploadVector: 'test_value' }, { outcomes: 'test_value', models: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('updateProjects — exists', () => {
    expect(typeof updateProjects).toBe('function');
  });

  it('updateProjects — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateProjects(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateProjects — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateProjects(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.last_call().path).toContain('/api/v1/projects/42');
  });

  it('updateProjects — request body', async () => {
    const spy = new SpyOAuthClient();
    await updateProjects(spy, 'access_token', 'refresh_token', 42, {});
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('updateProjects — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateProjects(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.calls.length).toBe(1);
  });

  it('updateProjectsPhotos — exists', () => {
    expect(typeof updateProjectsPhotos).toBe('function');
  });

  it('updateProjectsPhotos — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectsPhotos(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateProjectsPhotos — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectsPhotos(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_photos/hello%20world');
  });

  it('updateProjectsPhotos — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateProjectsPhotos(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('deleteProjects — exists', () => {
    expect(typeof deleteProjects).toBe('function');
  });

  it('deleteProjects — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    await deleteProjects(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteProjects — path construction', async () => {
    const spy = new SpyOAuthClient();
    await deleteProjects(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/projects/42');
  });

  it('deleteProjects — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await deleteProjects(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('createProjectsEvent — exists', () => {
    expect(typeof createProjectsEvent).toBe('function');
  });

  it('createProjectsEvent — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createProjectsEvent(spy, 'access_token', 'refresh_token', 'test_value', { event: 'test_value', detail: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createProjectsEvent — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createProjectsEvent(spy, 'access_token', 'refresh_token', 'hello world', { event: 'test_value', detail: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/projects/hello%20world/event');
  });

  it('createProjectsEvent — request body', async () => {
    const spy = new SpyOAuthClient();
    await createProjectsEvent(spy, 'access_token', 'refresh_token', 'test_value', { event: 'test_value', detail: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('event');
    expect(body).toHaveProperty('detail');
  });

  it('createProjectsEvent — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createProjectsEvent(spy, 'access_token', 'refresh_token', 'test_value', { event: 'test_value', detail: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

});
