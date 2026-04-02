// Auto-generated — do not edit
import { getPersonPhoto, updatePerson, getPerson } from '../../javascript/faces.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Faces', () => {
  it('getPersonPhoto — exists', () => {
    expect(typeof getPersonPhoto).toBe('function');
  });

  it('getPersonPhoto — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getPersonPhoto(spy, 'access_token', 'refresh_token', 'test_value', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPersonPhoto — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getPersonPhoto(spy, 'access_token', 'refresh_token', 'hello world', 42);
    expect(spy.last_call().path).toContain('/api/v1/person/hello%20world/photo/42');
  });

  it('getPersonPhoto — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getPersonPhoto(spy, 'access_token', 'refresh_token', 'test_value', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('updatePerson — exists', () => {
    expect(typeof updatePerson).toBe('function');
  });

  it('updatePerson — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updatePerson(spy, 'access_token', 'refresh_token', 'test_value', 42, { personName: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updatePerson — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updatePerson(spy, 'access_token', 'refresh_token', 'hello world', 42, { personName: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/person/hello%20world/42');
  });

  it('updatePerson — query params', async () => {
    const spy = new SpyOAuthClient();
    await updatePerson(spy, 'access_token', 'refresh_token', 'test_value', 42, { personName: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('person_name=');
  });

  it('updatePerson — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updatePerson(spy, 'access_token', 'refresh_token', 'test_value', 42, { personName: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getPerson — exists', () => {
    expect(typeof getPerson).toBe('function');
  });

  it('getPerson — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getPerson(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getPerson — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getPerson(spy, 'access_token', 'refresh_token', 'hello world');
    expect(spy.last_call().path).toContain('/api/v1/person/hello%20world/');
  });

  it('getPerson — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getPerson(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

});
