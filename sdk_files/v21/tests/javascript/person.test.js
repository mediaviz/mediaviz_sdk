// Auto-generated — do not edit
import { getAllPersonsFromPhoto, updatePerson, getAllPersonsFromProject } from '../../javascript/person.js';
import { SpyOAuthClient, makeSpyFetch } from './helpers.js';

describe('Person', () => {
  it('getAllPersonsFromPhoto — exists', () => {
    expect(typeof getAllPersonsFromPhoto).toBe('function');
  });

  it('getAllPersonsFromPhoto — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getAllPersonsFromPhoto(spy, 'access_token', 'refresh_token', 'test_value', 42);
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllPersonsFromPhoto — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getAllPersonsFromPhoto(spy, 'access_token', 'refresh_token', 'test_value', 42);
    expect(spy.last_call().path).toContain('/api/v1/person/test_value/photo/42');
  });

  it('getAllPersonsFromPhoto — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getAllPersonsFromPhoto(spy, 'access_token', 'refresh_token', 'test_value', 42);
    expect(spy.calls.length).toBe(1);
  });

  it('updatePerson — exists', () => {
    expect(typeof updatePerson).toBe('function');
  });

  it('updatePerson — HTTP method is PUT', async () => {
    const spy = new SpyOAuthClient();
    await updatePerson(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', { personName: 'test_value' });
    expect(spy.last_call().method).toBe('PUT');
  });

  it('updatePerson — path construction', async () => {
    const spy = new SpyOAuthClient();
    await updatePerson(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', { personName: 'test_value' });
    expect(spy.last_call().path).toContain('/api/v1/person/test_value/test_value');
  });

  it('updatePerson — query params', async () => {
    const spy = new SpyOAuthClient();
    await updatePerson(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', { personName: 'test_value' });
    const path = spy.last_call().path;
    expect(path).toContain('person_name=');
  });

  it('updatePerson — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await updatePerson(spy, 'access_token', 'refresh_token', 'test_value', 'test_value', { personName: 'test_value' });
    expect(spy.calls.length).toBe(1);
  });

  it('getAllPersonsFromProject — exists', () => {
    expect(typeof getAllPersonsFromProject).toBe('function');
  });

  it('getAllPersonsFromProject — HTTP method is GET', async () => {
    const spy = new SpyOAuthClient();
    await getAllPersonsFromProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().method).toBe('GET');
  });

  it('getAllPersonsFromProject — path construction', async () => {
    const spy = new SpyOAuthClient();
    await getAllPersonsFromProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.last_call().path).toContain('/api/v1/person/test_value/');
  });

  it('getAllPersonsFromProject — auth routing', async () => {
    const spy = new SpyOAuthClient();
    await getAllPersonsFromProject(spy, 'access_token', 'refresh_token', 'test_value');
    expect(spy.calls.length).toBe(1);
  });

});
