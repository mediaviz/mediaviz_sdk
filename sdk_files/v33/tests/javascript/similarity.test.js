// Auto-generated — do not edit
import { Similarity } from '../../javascript/similarity.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Similarity', () => {
  it('getProjectsSimilarityLevelMedium — exists', () => {
    const similarity = new Similarity({});
    expect(typeof similarity.getProjectsSimilarityLevelMedium).toBe('function');
  });

  it('getProjectsSimilarityLevelMedium — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const similarity = new Similarity(ctx);
    await similarity.getProjectsSimilarityLevelMedium('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsSimilarityLevelMedium — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const similarity = new Similarity(ctx);
    await similarity.getProjectsSimilarityLevelMedium('hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_similarity/hello%20world/level/medium');
  });

  it('getProjectsSimilarityLevelMedium — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const similarity = new Similarity(ctx);
    await similarity.getProjectsSimilarityLevelMedium('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectsSimilarityQueueLevel — exists', () => {
    const similarity = new Similarity({});
    expect(typeof similarity.getProjectsSimilarityQueueLevel).toBe('function');
  });

  it('getProjectsSimilarityQueueLevel — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const similarity = new Similarity(ctx);
    await similarity.getProjectsSimilarityQueueLevel('test_value', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsSimilarityQueueLevel — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const similarity = new Similarity(ctx);
    await similarity.getProjectsSimilarityQueueLevel('hello world', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_similarity_queue/hello%20world/level/hello%20world');
  });

  it('getProjectsSimilarityQueueLevel — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const similarity = new Similarity(ctx);
    await similarity.getProjectsSimilarityQueueLevel('test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectsPersonhoodQueue — exists', () => {
    const similarity = new Similarity({});
    expect(typeof similarity.getProjectsPersonhoodQueue).toBe('function');
  });

  it('getProjectsPersonhoodQueue — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const similarity = new Similarity(ctx);
    await similarity.getProjectsPersonhoodQueue('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsPersonhoodQueue — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const similarity = new Similarity(ctx);
    await similarity.getProjectsPersonhoodQueue('hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_personhood_queue/hello%20world');
  });

  it('getProjectsPersonhoodQueue — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const similarity = new Similarity(ctx);
    await similarity.getProjectsPersonhoodQueue('test_value');
    expect(spy.calls.length).toBe(1);
  });

});
