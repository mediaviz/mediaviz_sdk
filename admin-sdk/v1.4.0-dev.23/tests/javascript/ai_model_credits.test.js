// Auto-generated — do not edit
import { AiModelCredits } from '../../javascript/ai_model_credits.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('AI_Model_Credits', () => {
  it('getModelCreditRelationship — exists', () => {
    const aiModelCredits = new AiModelCredits({});
    expect(typeof aiModelCredits.getModelCreditRelationship).toBe('function');
  });

  it('getModelCreditRelationship — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const aiModelCredits = new AiModelCredits(ctx);
    await aiModelCredits.getModelCreditRelationship('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getModelCreditRelationship — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const aiModelCredits = new AiModelCredits(ctx);
    await aiModelCredits.getModelCreditRelationship('hello world');
    expect(spy.last_call().path).toContain('/api/v1/model_credit/hello%20world');
  });

  it('getModelCreditRelationship — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const aiModelCredits = new AiModelCredits(ctx);
    await aiModelCredits.getModelCreditRelationship('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('upsertModelCreditRelationship — exists', () => {
    const aiModelCredits = new AiModelCredits({});
    expect(typeof aiModelCredits.upsertModelCreditRelationship).toBe('function');
  });

  it('upsertModelCreditRelationship — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const aiModelCredits = new AiModelCredits(ctx);
    await aiModelCredits.upsertModelCreditRelationship({ modelName: 'test_value', newCreditValue: 42 });
    expect(spy.last_call().method).toBe('POST');
  });

  it('upsertModelCreditRelationship — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const aiModelCredits = new AiModelCredits(ctx);
    await aiModelCredits.upsertModelCreditRelationship({ modelName: 'test_value', newCreditValue: 42 });
    expect(spy.last_call().path).toContain('/api/v1/model_credit/upsert');
  });

  it('upsertModelCreditRelationship — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const aiModelCredits = new AiModelCredits(ctx);
    await aiModelCredits.upsertModelCreditRelationship({ modelName: 'test_value', newCreditValue: 42 });
    const path = spy.last_call().path;
    expect(path).toContain('model_name=');
    expect(path).toContain('new_credit_value=');
  });

  it('upsertModelCreditRelationship — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const aiModelCredits = new AiModelCredits(ctx);
    await aiModelCredits.upsertModelCreditRelationship({ modelName: 'test_value', newCreditValue: 42 });
    expect(spy.calls.length).toBe(1);
  });

});
