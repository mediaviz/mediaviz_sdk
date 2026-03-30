import { OAuthClient } from './oauth/index.js';

export function createCustomAlbumProject(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/custom_album/project/${encodeURIComponent(projectTableName)}`;
  return client.request(path, 'POST', accessToken, refreshToken);
}

export function getCustomAlbumProject(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/custom_album/project/${encodeURIComponent(projectTableName)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getCustomAlbum(client, accessToken, refreshToken, customAlbumId) {
  const path = `/api/v1/custom_album/${encodeURIComponent(customAlbumId)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function deleteCustomAlbum(client, accessToken, refreshToken, customAlbumId) {
  const path = `/api/v1/custom_album/${encodeURIComponent(customAlbumId)}`;
  return client.request(path, 'DELETE', accessToken, refreshToken);
}

export function updateCustomAlbum(client, accessToken, refreshToken, customAlbumId) {
  const path = `/api/v1/custom_album/${encodeURIComponent(customAlbumId)}`;
  return client.request(path, 'PUT', accessToken, refreshToken);
}

export function getCustomAlbumPhotosSort(client, accessToken, refreshToken, customAlbumId, sortOrder, { limit, lastId } = {}) {
  let path = `/api/v1/custom_album/photos/${encodeURIComponent(customAlbumId)}/sort/${encodeURIComponent(sortOrder)}/`;
  const query = new URLSearchParams();
  if (limit !== undefined) query.set('limit', limit);
  if (lastId !== undefined) query.set('last_id', lastId);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getCustomAlbumPhotosRankedSort(client, accessToken, refreshToken, customAlbumId, sortOrder) {
  const path = `/api/v1/custom_album/photos/ranked/${encodeURIComponent(customAlbumId)}/sort/${encodeURIComponent(sortOrder)}/`;
  return client.request(path, 'GET', accessToken, refreshToken);
}
