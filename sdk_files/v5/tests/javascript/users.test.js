// Auto-generated — do not edit
import { getUsers, createUsersNewCompany, updateUsers, deleteUsersDelete, createUserChangePassword, createUsers, getUsersCompany } from '../../javascript/users.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Users', () => {
  it('getUsers — exists', () => {
    expect(typeof getUsers).toBe('function');
  });

  it('getUsers — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getUsers(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getUsers — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getUsers(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/users/42');
  });

  it('getUsers — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getUsers(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('createUsersNewCompany — exists', () => {
    expect(typeof createUsersNewCompany).toBe('function');
  });

  it('createUsersNewCompany — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createUsersNewCompany('https://api.example.com', { user: 'test_value', company: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createUsersNewCompany — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createUsersNewCompany('https://api.example.com', { user: 'test_value', company: 'test_value' });
    expect(spy.last_call().url).toContain('/api/v1/users/new_company');
  });

  it('createUsersNewCompany — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createUsersNewCompany('https://api.example.com', { user: 'test_value', company: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toHaveProperty('user');
    expect(body).toHaveProperty('company');
  });

  it('createUsersNewCompany — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createUsersNewCompany('https://api.example.com', { user: 'test_value', company: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('updateUsers — exists', () => {
    expect(typeof updateUsers).toBe('function');
  });

  it('updateUsers — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateUsers(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateUsers — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateUsers(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.last_call().path).toContain('/api/v1/users/42');
  });

  it('updateUsers — request body', async () => {
    const spy = new SpyOAuthClient();
    await updateUsers(spy, 'access_token', 'refresh_token', 42, {});
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('updateUsers — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateUsers(spy, 'access_token', 'refresh_token', 42, {});
    expect(spy.calls.length).toBe(1);
  });

  it('deleteUsersDelete — exists', () => {
    expect(typeof deleteUsersDelete).toBe('function');
  });

  it('deleteUsersDelete — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    await deleteUsersDelete(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteUsersDelete — path construction', async () => {
    const spy = new SpyOAuthClient();
    await deleteUsersDelete(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/users/delete/42');
  });

  it('deleteUsersDelete — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await deleteUsersDelete(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('createUserChangePassword — exists', () => {
    expect(typeof createUserChangePassword).toBe('function');
  });

  it('createUserChangePassword — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createUserChangePassword(spy, 'access_token', 'refresh_token', { oldPassword: 'test_value', newPassword: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createUserChangePassword — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createUserChangePassword(spy, 'access_token', 'refresh_token', { oldPassword: 'test_value', newPassword: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/user/change_password');
  });

  it('createUserChangePassword — request body', async () => {
    const spy = new SpyOAuthClient();
    await createUserChangePassword(spy, 'access_token', 'refresh_token', { oldPassword: 'test_value', newPassword: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toHaveProperty('old_password');
    expect(body).toHaveProperty('new_password');
  });

  it('createUserChangePassword — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createUserChangePassword(spy, 'access_token', 'refresh_token', { oldPassword: 'test_value', newPassword: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('createUsers — exists', () => {
    expect(typeof createUsers).toBe('function');
  });

  it('createUsers — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createUsers(spy, 'access_token', 'refresh_token', {});
    expect(spy.last_call().method).toBe('POST');
  });

  it('createUsers — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createUsers(spy, 'access_token', 'refresh_token', {});
    expect(spy.last_call().path).toContain('/api/v1/users/');
  });

  it('createUsers — request body', async () => {
    const spy = new SpyOAuthClient();
    await createUsers(spy, 'access_token', 'refresh_token', {});
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('createUsers — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createUsers(spy, 'access_token', 'refresh_token', {});
    expect(spy.calls.length).toBe(1);
  });

  it('getUsersCompany — exists', () => {
    expect(typeof getUsersCompany).toBe('function');
  });

  it('getUsersCompany — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getUsersCompany(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getUsersCompany — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getUsersCompany(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/users/company/42');
  });

  it('getUsersCompany — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getUsersCompany(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

});
