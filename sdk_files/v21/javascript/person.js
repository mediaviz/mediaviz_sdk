import { OAuthClient } from './_oauth.js';

export async function getAllPersonsFromPhoto(client, accessToken, refreshToken, projectTableName, photoId) {
  const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/photo/${encodeURIComponent(photoId)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function updatePerson(client, accessToken, refreshToken, projectTableName, personId, { personName } = {}) {
  let path = `/api/v1/person/${encodeURIComponent(projectTableName)}/${encodeURIComponent(personId)}`;
  const query = new URLSearchParams();
  if (personName !== undefined) query.set('person_name', personName);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'PUT', accessToken, refreshToken);
  return data;
}

export async function getAllPersonsFromProject(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}
