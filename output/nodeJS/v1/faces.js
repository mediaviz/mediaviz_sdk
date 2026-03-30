import { OAuthClient } from './oauth/index.js';

export function getPersonPhoto(client, accessToken, refreshToken, projectTableName, photoId) {
  const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/photo/${encodeURIComponent(photoId)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function updatePerson(client, accessToken, refreshToken, projectTable, personId, { personName } = {}) {
  let path = `/api/v1/person/${encodeURIComponent(projectTable)}/${encodeURIComponent(personId)}`;
  const query = new URLSearchParams();
  if (personName !== undefined) query.set('person_name', personName);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'PUT', accessToken, refreshToken);
}

export function getPerson(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/`;
  return client.request(path, 'GET', accessToken, refreshToken);
}
