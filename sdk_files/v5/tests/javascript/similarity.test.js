// Auto-generated — do not edit
import { getProjectsSimilarityLevelMedium, getProjectsSimilarityQueueLevel, getProjectsPersonhoodQueue } from '../../javascript/similarity.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Similarity', () => {
  it('getProjectsSimilarityLevelMedium — exists', () => {
    expect(typeof getProjectsSimilarityLevelMedium).toBe('function');
  });

  it('getProjectsSimilarityLevelMedium — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsSimilarityLevelMedium(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsSimilarityLevelMedium — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsSimilarityLevelMedium(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_similarity/hello%20world/level/medium');
  });

  it('getProjectsSimilarityLevelMedium — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsSimilarityLevelMedium(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectsSimilarityQueueLevel — exists', () => {
    expect(typeof getProjectsSimilarityQueueLevel).toBe('function');
  });

  it('getProjectsSimilarityQueueLevel — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsSimilarityQueueLevel(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsSimilarityQueueLevel — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsSimilarityQueueLevel(spy, 'access_token', 'refresh_token', 'hello world', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_similarity_queue/hello%20world/level/hello%20world');
  });

  it('getProjectsSimilarityQueueLevel — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsSimilarityQueueLevel(spy, 'access_token', 'refresh_token', 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getProjectsPersonhoodQueue — exists', () => {
    expect(typeof getProjectsPersonhoodQueue).toBe('function');
  });

  it('getProjectsPersonhoodQueue — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsPersonhoodQueue(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsPersonhoodQueue — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsPersonhoodQueue(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_personhood_queue/hello%20world');
  });

  it('getProjectsPersonhoodQueue — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsPersonhoodQueue(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

});
