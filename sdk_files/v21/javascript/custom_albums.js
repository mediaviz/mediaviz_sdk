import { OAuthClient } from './_oauth.js';

export async function createProjectCustomAlbum(client, accessToken, refreshToken, projectTableName, body) {
  const path = `/api/v1/custom_album/project/${encodeURIComponent(projectTableName)}`;
  const { data } = await client.request(path, 'POST', accessToken, refreshToken, JSON.stringify(body));
  return data;
}

export async function getAllProjectCustomAlbums(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/custom_album/project/${encodeURIComponent(projectTableName)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getCustomAlbumDetailById(client, accessToken, refreshToken, customAlbumId) {
  const path = `/api/v1/custom_album/${encodeURIComponent(customAlbumId)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function deleteCustomAlbum(client, accessToken, refreshToken, albumId) {
  const path = `/api/v1/custom_album/${encodeURIComponent(albumId)}`;
  const { data } = await client.request(path, 'DELETE', accessToken, refreshToken);
  return data;
}

export async function updateCustomAlbum(client, accessToken, refreshToken, albumId, body) {
  const path = `/api/v1/custom_album/${encodeURIComponent(albumId)}`;
  const { data } = await client.request(path, 'PUT', accessToken, refreshToken, JSON.stringify(body));
  return data;
}

export async function getCustomAlbumPhotosById(client, accessToken, refreshToken, customAlbumId, { ascOrDesc, lastId, limit } = {}) {
  let path = `/api/v1/custom_album/photos/${encodeURIComponent(customAlbumId)}/`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  if (lastId !== undefined) query.set('last_id', lastId);
  if (limit !== undefined) query.set('limit', limit);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getTopMiddleBottomCustomAlbumById(client, accessToken, refreshToken, customAlbumId, { ascOrDesc, lastId, limit } = {}) {
  let path = `/api/v1/custom_album/photos/ranked/${encodeURIComponent(customAlbumId)}/`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  if (lastId !== undefined) query.set('last_id', lastId);
  if (limit !== undefined) query.set('limit', limit);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}
