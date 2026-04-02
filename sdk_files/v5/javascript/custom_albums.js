import { OAuthClient } from './_oauth.js';

export function createCustomAlbumProject(client, accessToken, refreshToken, projectTableName, { name, description, photoIdInclusionList }) {
  const path = `/api/v1/custom_album/project/${encodeURIComponent(projectTableName)}`;
  return client.request(path, 'POST', accessToken, refreshToken, { name, description, photo_id_inclusion_list: photoIdInclusionList });
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

export function updateCustomAlbum(client, accessToken, refreshToken, customAlbumId, body = {}) {
  const path = `/api/v1/custom_album/${encodeURIComponent(customAlbumId)}`;
  return client.request(path, 'PUT', accessToken, refreshToken, body);
}

export function getCustomAlbumPhotosSort(client, accessToken, refreshToken, customAlbumId, { ascOrDesc, lastId, limit } = {}) {
  let path = `/api/v1/custom_album/photos/${encodeURIComponent(customAlbumId)}/`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  if (lastId !== undefined) query.set('last_id', lastId);
  if (limit !== undefined) query.set('limit', limit);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getCustomAlbumPhotosRankedSort(client, accessToken, refreshToken, customAlbumId, { ascOrDesc } = {}) {
  let path = `/api/v1/custom_album/photos/ranked/${encodeURIComponent(customAlbumId)}/`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}
