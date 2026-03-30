import { OAuthClient } from './oauth/index.js';

export function getPhotosAlbum(client, accessToken, refreshToken, projectTable) {
  const path = `/api/v1/photos_album/${encodeURIComponent(projectTable)}/`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotosAlbumTypeSort(client, accessToken, refreshToken, projectTable, formattedAlbum, sortOrder, { limit, lastId } = {}) {
  let path = `/api/v1/photos_album/${encodeURIComponent(projectTable)}/type/${encodeURIComponent(formattedAlbum)}/sort/${encodeURIComponent(sortOrder)}`;
  const query = new URLSearchParams();
  if (limit !== undefined) query.set('limit', limit);
  if (lastId !== undefined) query.set('last_id', lastId);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotosAlbumTypeRankedSort(client, accessToken, refreshToken, projectTable, formattedAlbum, sortOrder) {
  const path = `/api/v1/photos_album/${encodeURIComponent(projectTable)}/type/${encodeURIComponent(formattedAlbum)}/ranked/sort/${encodeURIComponent(sortOrder)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}
