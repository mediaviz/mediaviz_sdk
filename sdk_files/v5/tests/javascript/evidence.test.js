// Auto-generated — do not edit
import { getProjectsEvidence } from '../../javascript/evidence.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Evidence', () => {
  it('getProjectsEvidence — exists', () => {
    expect(typeof getProjectsEvidence).toBe('function');
  });

  it('getProjectsEvidence — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsEvidence(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsEvidence — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsEvidence(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_evidence/hello%20world');
  });

  it('getProjectsEvidence — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getProjectsEvidence(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

});
