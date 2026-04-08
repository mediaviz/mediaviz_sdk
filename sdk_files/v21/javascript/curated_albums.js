import { OAuthClient } from './_oauth.js';

export async function getAllProjectCuratedAlbums(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/curated_album/project/${encodeURIComponent(projectTableName)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getCuratedAlbumPhotos(client, accessToken, refreshToken, albumId, { ascOrDesc, lastId, limit, confidenceValue } = {}) {
  let path = `/api/v1/curated_album/photos/${encodeURIComponent(albumId)}/`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  if (lastId !== undefined) query.set('last_id', lastId);
  if (limit !== undefined) query.set('limit', limit);
  if (confidenceValue !== undefined) query.set('confidence_value', confidenceValue);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getCuratedAlbumPhotosRanked(client, accessToken, refreshToken, albumId, { ascOrDesc, lastId, limit, confidenceValue } = {}) {
  let path = `/api/v1/curated_album/photos/ranked/${encodeURIComponent(albumId)}/`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  if (lastId !== undefined) query.set('last_id', lastId);
  if (limit !== undefined) query.set('limit', limit);
  if (confidenceValue !== undefined) query.set('confidence_value', confidenceValue);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}
