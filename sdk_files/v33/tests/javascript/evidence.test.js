// Auto-generated — do not edit
import { Evidence } from '../../javascript/evidence.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Evidence', () => {
  it('getProjectsEvidence — exists', () => {
    const evidence = new Evidence({});
    expect(typeof evidence.getProjectsEvidence).toBe('function');
  });

  it('getProjectsEvidence — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const evidence = new Evidence(ctx);
    await evidence.getProjectsEvidence('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getProjectsEvidence — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const evidence = new Evidence(ctx);
    await evidence.getProjectsEvidence('hello world');
    expect(spy.last_call().path).toContain('/api/v1/projects_evidence/hello%20world');
  });

  it('getProjectsEvidence — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const evidence = new Evidence(ctx);
    await evidence.getProjectsEvidence('test_value');
    expect(spy.calls.length).toBe(1);
  });

});
