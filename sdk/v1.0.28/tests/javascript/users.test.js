// Auto-generated — do not edit
import { Users } from '../../javascript/users.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Users', () => {
  it('createUser — exists', () => {
    const users = new Users({});
    expect(typeof users.createUser).toBe('function');
  });

  it('createUser — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.createUser('test_value', 'user@example.com', 42, 42, 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('POST');
  });

  it('createUser — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.createUser('test_value', 'user@example.com', 42, 42, 'test_value', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/users/');
  });

  it('createUser — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.createUser('test_value', 'user@example.com', 42, 42, 'test_value', 'test_value');
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('company_id');
    expect(body).toHaveProperty('profile_picture');
    expect(body).toHaveProperty('payment_plan_type');
    expect(body).toHaveProperty('account_type');
  });

  it('createUser — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.createUser('test_value', 'user@example.com', 42, 42, 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('createMediavizInternalAdmin — exists', () => {
    const users = new Users({});
    expect(typeof users.createMediavizInternalAdmin).toBe('function');
  });

  it('createMediavizInternalAdmin — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const users = new Users(ctx);
    await users.createMediavizInternalAdmin('test_value', 'user@example.com', 42, 'test_value', 42, 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('POST');
  });

  it('createMediavizInternalAdmin — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const users = new Users(ctx);
    await users.createMediavizInternalAdmin('test_value', 'user@example.com', 42, 'test_value', 42, 'test_value', 'test_value');
    expect(spy.last_call().url).toContain('/api/v1/users/new_internal_admin');
  });

  it('createMediavizInternalAdmin — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const users = new Users(ctx);
    await users.createMediavizInternalAdmin('test_value', 'user@example.com', 42, 'test_value', 42, 'test_value', 'test_value');
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('company_id');
    expect(body).toHaveProperty('profile_picture');
    expect(body).toHaveProperty('payment_plan_type');
    expect(body).toHaveProperty('account_type');
    expect(body).toHaveProperty('password');
  });

  it('createMediavizInternalAdmin — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const users = new Users(ctx);
    await users.createMediavizInternalAdmin('test_value', 'user@example.com', 42, 'test_value', 42, 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('createUserAndCompany — exists', () => {
    const users = new Users({});
    expect(typeof users.createUserAndCompany).toBe('function');
  });

  it('createUserAndCompany — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const users = new Users(ctx);
    await users.createUserAndCompany('test_value', 'user@example.com', 'test_value', 42, 'test_value', 'test_value', 'test_value', 42);
    expect(spy.last_call().method).toBe('POST');
  });

  it('createUserAndCompany — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const users = new Users(ctx);
    await users.createUserAndCompany('test_value', 'user@example.com', 'test_value', 42, 'test_value', 'test_value', 'test_value', 42);
    expect(spy.last_call().url).toContain('/api/v1/users/new_company');
  });

  it('createUserAndCompany — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    const ctx = { baseUrl: 'https://api.example.com' };
    const users = new Users(ctx);
    await users.createUserAndCompany('test_value', 'user@example.com', 'test_value', 42, 'test_value', 'test_value', 'test_value', 42);
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('company_id');
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
    await users.createUserAndCompany('test_value', 'user@example.com', 'test_value', 42, 'test_value', 'test_value', 'test_value', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('changePassword — exists', () => {
    const users = new Users({});
    expect(typeof users.changePassword).toBe('function');
  });

  it('changePassword — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.changePassword('test_value', 'test_value');
    expect(spy.last_call().method).toBe('POST');
  });

  it('changePassword — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.changePassword('test_value', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/user/change_password');
  });

  it('changePassword — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.changePassword('test_value', 'test_value');
    const body = spy.last_call().body;
    expect(body).toHaveProperty('old_password');
    expect(body).toHaveProperty('new_password');
  });

  it('changePassword — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.changePassword('test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getUserId — exists', () => {
    const users = new Users({});
    expect(typeof users.getUserId).toBe('function');
  });

  it('getUserId — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.getUserId();
    expect(spy.last_call().method).toBe('GET');
  });

  it('getUserId — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.getUserId();
    expect(spy.last_call().path).toContain('/api/v1/users');
  });

  it('getUserId — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.getUserId();
    expect(spy.calls.length).toBe(1);
  });

  it('getUser — exists', () => {
    const users = new Users({});
    expect(typeof users.getUser).toBe('function');
  });

  it('getUser — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.getUser(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getUser — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.getUser(42);
    expect(spy.last_call().path).toContain('/api/v1/users/42');
  });

  it('getUser — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.getUser(42);
    expect(spy.calls.length).toBe(1);
  });

  it('getAllUsersByCompany — exists', () => {
    const users = new Users({});
    expect(typeof users.getAllUsersByCompany).toBe('function');
  });

  it('getAllUsersByCompany — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.getAllUsersByCompany(42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllUsersByCompany — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.getAllUsersByCompany(42);
    expect(spy.last_call().path).toContain('/api/v1/users/company/42');
  });

  it('getAllUsersByCompany — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.getAllUsersByCompany(42);
    expect(spy.calls.length).toBe(1);
  });

  it('getAllUsers — exists', () => {
    const users = new Users({});
    expect(typeof users.getAllUsers).toBe('function');
  });

  it('getAllUsers — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.getAllUsers('test_value', { lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllUsers — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.getAllUsers('hello world', { lastId: 'test_value', limit: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/users/admin/sort/hello%20world/');
  });

  it('getAllUsers — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.getAllUsers('test_value', { lastId: 'test_value', limit: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('last_id=');
    expect(path).toContain('limit=');
  });

  it('getAllUsers — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.getAllUsers('test_value', { lastId: 'test_value', limit: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('updateUser — exists', () => {
    const users = new Users({});
    expect(typeof users.updateUser).toBe('function');
  });

  it('updateUser — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.updateUser(42, { name: 'test_value', email: 'user@example.com', password: 'test_value', companyId: 42, accountType: 42, profilePicture: 'test_value', location: 'test_value', phoneNumber: 'test_value', birthday: '2024-01-01' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateUser — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.updateUser(42, { name: 'test_value', email: 'user@example.com', password: 'test_value', companyId: 42, accountType: 42, profilePicture: 'test_value', location: 'test_value', phoneNumber: 'test_value', birthday: '2024-01-01' });
    expect(spy.last_call().path).toContain('/api/v1/users/42');
  });

  it('updateUser — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.updateUser(42, { name: 'test_value', email: 'user@example.com', password: 'test_value', companyId: 42, accountType: 42, profilePicture: 'test_value', location: 'test_value', phoneNumber: 'test_value', birthday: '2024-01-01' });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('password');
    expect(body).toHaveProperty('company_id');
    expect(body).toHaveProperty('account_type');
    expect(body).toHaveProperty('profile_picture');
    expect(body).toHaveProperty('location');
    expect(body).toHaveProperty('phone_number');
    expect(body).toHaveProperty('birthday');
  });

  it('updateUser — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.updateUser(42, { name: 'test_value', email: 'user@example.com', password: 'test_value', companyId: 42, accountType: 42, profilePicture: 'test_value', location: 'test_value', phoneNumber: 'test_value', birthday: '2024-01-01' });
    expect(spy.calls.length).toBe(1);
  });

  it('updateUserByAdmin — exists', () => {
    const users = new Users({});
    expect(typeof users.updateUserByAdmin).toBe('function');
  });

  it('updateUserByAdmin — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.updateUserByAdmin(42, { name: 'test_value', email: 'user@example.com', password: 'test_value', companyId: 42, accountType: 42, profilePicture: 'test_value', location: 'test_value', phoneNumber: 'test_value', birthday: '2024-01-01' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateUserByAdmin — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.updateUserByAdmin(42, { name: 'test_value', email: 'user@example.com', password: 'test_value', companyId: 42, accountType: 42, profilePicture: 'test_value', location: 'test_value', phoneNumber: 'test_value', birthday: '2024-01-01' });
    expect(spy.last_call().path).toContain('/api/v1/users/admin/42');
  });

  it('updateUserByAdmin — request body', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.updateUserByAdmin(42, { name: 'test_value', email: 'user@example.com', password: 'test_value', companyId: 42, accountType: 42, profilePicture: 'test_value', location: 'test_value', phoneNumber: 'test_value', birthday: '2024-01-01' });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('password');
    expect(body).toHaveProperty('company_id');
    expect(body).toHaveProperty('account_type');
    expect(body).toHaveProperty('profile_picture');
    expect(body).toHaveProperty('location');
    expect(body).toHaveProperty('phone_number');
    expect(body).toHaveProperty('birthday');
  });

  it('updateUserByAdmin — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.updateUserByAdmin(42, { name: 'test_value', email: 'user@example.com', password: 'test_value', companyId: 42, accountType: 42, profilePicture: 'test_value', location: 'test_value', phoneNumber: 'test_value', birthday: '2024-01-01' });
    expect(spy.calls.length).toBe(1);
  });

  it('deleteUser — exists', () => {
    const users = new Users({});
    expect(typeof users.deleteUser).toBe('function');
  });

  it('deleteUser — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.deleteUser(42, { newCompanyOwnerId: 42 });
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteUser — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.deleteUser(42, { newCompanyOwnerId: 42 });
    expect(spy.last_call().path).toContain('/api/v1/users/delete/42');
  });

  it('deleteUser — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.deleteUser(42, { newCompanyOwnerId: 42 });
    const path = spy.last_call().path;
    expect(path).toContain('new_company_owner_id=');
  });

  it('deleteUser — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const users = new Users(ctx);
    await users.deleteUser(42, { newCompanyOwnerId: 42 });
    expect(spy.calls.length).toBe(1);
  });

});
