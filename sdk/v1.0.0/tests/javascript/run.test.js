// Auto-generated — do not edit
import { Run } from '../../javascript/run.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Run', () => {
  it('createRun — exists', () => {
    const run = new Run({});
    expect(typeof run.createRun).toBe('function');
  });

  it('createRun — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.createRun('00000000-0000-0000-0000-000000000000', true, true, true, true, true, true, true, true, true, 'test_value', 'test_value', true);
    expect(spy.last_call().method).toBe('POST');
  });

  it('createRun — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.createRun('00000000-0000-0000-0000-000000000000', true, true, true, true, true, true, true, true, true, 'test_value', 'test_value', true);
    expect(spy.last_call().path).toContain('/api/v1/runs/');
  });

  it('createRun — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.createRun('00000000-0000-0000-0000-000000000000', true, true, true, true, true, true, true, true, true, 'test_value', 'test_value', true);
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('project_id');
    expect(body).toHaveProperty('active');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('similarity_level');
    expect(body).toHaveProperty('normalize');
    expect(body).toHaveProperty('colors_model');
    expect(body).toHaveProperty('blur_model');
    expect(body).toHaveProperty('face_recognition_model');
    expect(body).toHaveProperty('image_classification_model');
    expect(body).toHaveProperty('image_comparison_model');
    expect(body).toHaveProperty('personhood_model');
    expect(body).toHaveProperty('similarity_model');
    expect(body).toHaveProperty('evidence_model');
  });

  it('createRun — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.createRun('00000000-0000-0000-0000-000000000000', true, true, true, true, true, true, true, true, true, 'test_value', 'test_value', true);
    expect(spy.calls.length).toBe(1);
  });

  it('getRun — exists', () => {
    const run = new Run({});
    expect(typeof run.getRun).toBe('function');
  });

  it('getRun — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.getRun(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getRun — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.getRun(42);
    expect(spy.last_call().path).toContain('/api/v1/runs/42');
  });

  it('getRun — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.getRun(42);
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectRuns — exists', () => {
    const run = new Run({});
    expect(typeof run.getProjectRuns).toBe('function');
  });

  it('getProjectRuns — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.getProjectRuns('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectRuns — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.getProjectRuns('hello world');
    expect(spy.last_call().path).toContain('/api/v1/runs/project/hello%20world');
  });

  it('getProjectRuns — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.getProjectRuns('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('updateRun — exists', () => {
    const run = new Run({});
    expect(typeof run.updateRun).toBe('function');
  });

  it('updateRun — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.updateRun(42, 42, ['item1', 'item2'], true, 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateRun — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.updateRun(42, 42, ['item1', 'item2'], true, 'test_value', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/runs/42');
  });

  it('updateRun — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.updateRun(42, 42, ['item1', 'item2'], true, 'test_value', 'test_value');
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('project_run_index');
    expect(body).toHaveProperty('models');
    expect(body).toHaveProperty('active');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('similarity_level');
  });

  it('updateRun — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.updateRun(42, 42, ['item1', 'item2'], true, 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('deleteRun — exists', () => {
    const run = new Run({});
    expect(typeof run.deleteRun).toBe('function');
  });

  it('deleteRun — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.deleteRun(42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteRun — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.deleteRun(42);
    expect(spy.last_call().path).toContain('/api/v1/runs/42');
  });

  it('deleteRun — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const run = new Run(ctx);
    await run.deleteRun(42);
    expect(spy.calls.length).toBe(1);
  });

});
