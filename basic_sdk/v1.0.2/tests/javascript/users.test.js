// Auto-generated — do not edit
import { Users } from '../../javascript/users.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Users', () => {
  it('createUserAndCompany — exists', () => {
    const users = new Users({});
    expect(typeof users.createUserAndCompany).toBe('function');
  });

  it('createUserAndCompany — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const users = new Users(ctx);
    await users.createUserAndCompany('test_value', 'user@example.com', 42, 'test_value', 42, 'test_value', 'test_value', 'test_value', 42);
    expect(spy.last_call().method).toBe('POST');
  });

  it('createUserAndCompany — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const users = new Users(ctx);
    await users.createUserAndCompany('test_value', 'user@example.com', 42, 'test_value', 42, 'test_value', 'test_value', 'test_value', 42);
    expect(spy.last_call().url).toContain('/api/v1/users/new_company');
  });

  it('createUserAndCompany — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const users = new Users(ctx);
    await users.createUserAndCompany('test_value', 'user@example.com', 42, 'test_value', 42, 'test_value', 'test_value', 'test_value', 42);
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('company_id');
    expect(body).toHaveProperty('account_type');
    expect(body).toHaveProperty('profile_picture');
    expect(body).toHaveProperty('payment_plan_type');
    expect(body).toHaveProperty('password');
    expect(body).toHaveProperty('company_name');
    expect(body).toHaveProperty('credits');
  });

  it('createUserAndCompany — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const users = new Users(ctx);
    await users.createUserAndCompany('test_value', 'user@example.com', 42, 'test_value', 42, 'test_value', 'test_value', 'test_value', 42);
    expect(spy.calls.length).toBe(1);
  });

});
