// Auto-generated — do not edit
import { Person } from '../../javascript/person.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Person', () => {
  it('updatePerson — exists', () => {
    const person = new Person({});
    expect(typeof person.updatePerson).toBe('function');
  });

  it('updatePerson — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.updatePerson('test_value', 'test_value', { personName: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updatePerson — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.updatePerson('test_value', 'test_value', { personName: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/person/test_value/test_value');
  });

  it('updatePerson — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.updatePerson('test_value', 'test_value', { personName: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('person_name=');
  });

  it('updatePerson — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.updatePerson('test_value', 'test_value', { personName: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('combinePersons — exists', () => {
    const person = new Person({});
    expect(typeof person.combinePersons).toBe('function');
  });

  it('combinePersons — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.combinePersons('test_value', 'test_value', 'test_value');
    expect(spy.last_call().method).toBe('PUT');
  });

  it('combinePersons — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.combinePersons('test_value', 'test_value', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/person/test_value/combine/test_value/test_value');
  });

  it('combinePersons — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.combinePersons('test_value', 'test_value', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('splitPersons — exists', () => {
    const person = new Person({});
    expect(typeof person.splitPersons).toBe('function');
  });

  it('splitPersons — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.splitPersons('test_value', 42, { newName: 'test_value', destinationPersonId: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('splitPersons — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.splitPersons('test_value', 42, { newName: 'test_value', destinationPersonId: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/person/test_value/split/42/');
  });

  it('splitPersons — query params', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.splitPersons('test_value', 42, { newName: 'test_value', destinationPersonId: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('new_name=');
    expect(path).toContain('destination_person_id=');
  });

  it('splitPersons — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.splitPersons('test_value', 42, { newName: 'test_value', destinationPersonId: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getAllPersonsFromProject — exists', () => {
    const person = new Person({});
    expect(typeof person.getAllPersonsFromProject).toBe('function');
  });

  it('getAllPersonsFromProject — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.getAllPersonsFromProject('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllPersonsFromProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.getAllPersonsFromProject('test_value');
    expect(spy.last_call().path).toContain('/api/v1/person/test_value/');
  });

  it('getAllPersonsFromProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.getAllPersonsFromProject('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getAllPersonNamesFromProject — exists', () => {
    const person = new Person({});
    expect(typeof person.getAllPersonNamesFromProject).toBe('function');
  });

  it('getAllPersonNamesFromProject — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.getAllPersonNamesFromProject('test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllPersonNamesFromProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.getAllPersonNamesFromProject('test_value');
    expect(spy.last_call().path).toContain('/api/v1/person/test_value/names');
  });

  it('getAllPersonNamesFromProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.getAllPersonNamesFromProject('test_value');
    expect(spy.calls.length).toBe(1);
  });

  it('getAllPersonsFromPhoto — exists', () => {
    const person = new Person({});
    expect(typeof person.getAllPersonsFromPhoto).toBe('function');
  });

  it('getAllPersonsFromPhoto — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.getAllPersonsFromPhoto('test_value', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllPersonsFromPhoto — path construction', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.getAllPersonsFromPhoto('test_value', 42);
    expect(spy.last_call().path).toContain('/api/v1/person/test_value/photo/42');
  });

  it('getAllPersonsFromPhoto — auth routing', async () => {
    const spy = new SpyOAuthClient();
    const ctx = { client: spy, accessToken: 'access_token', refreshToken: 'refresh_token', requireTokens: () => {} };
    const person = new Person(ctx);
    await person.getAllPersonsFromPhoto('test_value', 42);
    expect(spy.calls.length).toBe(1);
  });

});
