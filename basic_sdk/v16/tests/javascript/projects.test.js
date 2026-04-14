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

});
