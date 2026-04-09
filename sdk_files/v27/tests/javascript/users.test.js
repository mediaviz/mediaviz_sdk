// Auto-generated — do not edit
import { getUser, createUserAndCompany, updateUser, deleteUser, changePassword, createUser, getAllUsersByCompany } from '../../javascript/users.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Users', () => {
  it('getUser — exists', () => {
    expect(typeof getUser).toBe('function');
  });

  it('getUser — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getUser(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getUser — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getUser(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/users/42');
  });

  it('getUser — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getUser(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('createUserAndCompany — exists', () => {
    expect(typeof createUserAndCompany).toBe('function');
  });

  it('createUserAndCompany — HTTP method is POST', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createUserAndCompany('https://api.example.com', { Model: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createUserAndCompany — path construction', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createUserAndCompany('https://api.example.com', { Model: 'test_value' });
    expect(spy.last_call().url).toContain('/api/v1/users/new_company');
  });

  it('createUserAndCompany — request body', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createUserAndCompany('https://api.example.com', { Model: 'test_value' });
    const body = JSON.parse(spy.last_call().body);
    expect(body).toBeDefined();
  });

  it('createUserAndCompany — auth routing', async () => {
    const spy = makeSpyFetch();
    globalThis.fetch = spy;
    await createUserAndCompany('https://api.example.com', { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('updateUser — exists', () => {
    expect(typeof updateUser).toBe('function');
  });

  it('updateUser — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updateUser(spy, 'access_token', 'refresh_token', 42, { Model: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updateUser — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updateUser(spy, 'access_token', 'refresh_token', 42, { Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/users/42');
  });

  it('updateUser — request body', async () => {
    const spy = new SpyOAuthClient();
    await updateUser(spy, 'access_token', 'refresh_token', 42, { Model: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('updateUser — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updateUser(spy, 'access_token', 'refresh_token', 42, { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('deleteUser — exists', () => {
    expect(typeof deleteUser).toBe('function');
  });

  it('deleteUser — HTTP method is DELETE', async () => {
    const spy = new SpyOAuthClient();
    await deleteUser(spy, 'access_token', 'refresh_token', 42, { newCompanyOwnerId: 42 });
    expect(spy.last_call().method).toBe('DELETE');
  });

  it('deleteUser — path construction', async () => {
    const spy = new SpyOAuthClient();
    await deleteUser(spy, 'access_token', 'refresh_token', 42, { newCompanyOwnerId: 42 });
    expect(spy.last_call().path).toContain('/api/v1/users/delete/42');
  });

  it('deleteUser — query params', async () => {
    const spy = new SpyOAuthClient();
    await deleteUser(spy, 'access_token', 'refresh_token', 42, { newCompanyOwnerId: 42 });
    const path = spy.last_call().path;
    expect(path).toContain('new_company_owner_id=');
  });

  it('deleteUser — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await deleteUser(spy, 'access_token', 'refresh_token', 42, { newCompanyOwnerId: 42 });
    expect(spy.calls.length).toBe(1);
  });

  it('changePassword — exists', () => {
    expect(typeof changePassword).toBe('function');
  });

  it('changePassword — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await changePassword(spy, 'access_token', 'refresh_token', { Model: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('changePassword — path construction', async () => {
    const spy = new SpyOAuthClient();
    await changePassword(spy, 'access_token', 'refresh_token', { Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/user/change_password');
  });

  it('changePassword — request body', async () => {
    const spy = new SpyOAuthClient();
    await changePassword(spy, 'access_token', 'refresh_token', { Model: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('changePassword — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await changePassword(spy, 'access_token', 'refresh_token', { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('createUser — exists', () => {
    expect(typeof createUser).toBe('function');
  });

  it('createUser — HTTP method is POST', async () => {
    const spy = new SpyOAuthClient();
    await createUser(spy, 'access_token', 'refresh_token', { Model: 'test_value' });
    expect(spy.last_call().method).toBe('POST');
  });

  it('createUser — path construction', async () => {
    const spy = new SpyOAuthClient();
    await createUser(spy, 'access_token', 'refresh_token', { Model: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/users/');
  });

  it('createUser — request body', async () => {
    const spy = new SpyOAuthClient();
    await createUser(spy, 'access_token', 'refresh_token', { Model: 'test_value' });
    const body = spy.last_call().body;
    expect(body).toBeDefined();
  });

  it('createUser — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await createUser(spy, 'access_token', 'refresh_token', { Model: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getAllUsersByCompany — exists', () => {
    expect(typeof getAllUsersByCompany).toBe('function');
  });

  it('getAllUsersByCompany — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getAllUsersByCompany(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllUsersByCompany — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getAllUsersByCompany(spy, 'access_token', 'refresh_token', 42);
    expect(spy.last_call().path).toContain('/api/v1/users/company/42');
  });

  it('getAllUsersByCompany — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getAllUsersByCompany(spy, 'access_token', 'refresh_token', 42);
    expect(spy.calls.length).toBe(1);
  });

});
