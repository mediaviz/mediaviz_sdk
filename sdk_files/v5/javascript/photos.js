import { OAuthClient } from './_oauth.js';

export function getPhotoIds(client, accessToken, refreshToken, tableName, { ascOrDesc, lastId, limit } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(tableName)}/`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  if (lastId !== undefined) query.set('last_id', lastId);
  if (limit !== undefined) query.set('limit', limit);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotoById(client, accessToken, refreshToken, tableName, id) {
  const path = `/api/v1/photos/${encodeURIComponent(tableName)}/${encodeURIComponent(id)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function deletePhotos(client, accessToken, refreshToken, tableName, { photoIds } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(tableName)}/delete/`;
  const query = new URLSearchParams();
  if (photoIds !== undefined) query.set('photo_ids', photoIds);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'DELETE', accessToken, refreshToken);
}

export function getProjectThumbnail(client, accessToken, refreshToken, projectTable) {
  const path = `/api/v1/photos_project/${encodeURIComponent(projectTable)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getProjectMonthYears(client, accessToken, refreshToken, projectTable) {
  const path = `/api/v1/photo_month_years/${encodeURIComponent(projectTable)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotosByMonthYearSort(client, accessToken, refreshToken, projectTable, month, year, { ascOrDesc, lastId, limit } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(projectTable)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}/`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  if (lastId !== undefined) query.set('last_id', lastId);
  if (limit !== undefined) query.set('limit', limit);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotosDateTakenNone(client, accessToken, refreshToken, projectTable) {
  const path = `/api/v1/photos/${encodeURIComponent(projectTable)}/date_taken/none`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function updatePhotosUpdateRankById(client, accessToken, refreshToken, projectTable, id, newCategory) {
  const path = `/api/v1/photos_update/${encodeURIComponent(projectTable)}/id/${encodeURIComponent(id)}/rank/${encodeURIComponent(newCategory)}`;
  return client.request(path, 'PUT', accessToken, refreshToken);
}

export function getPhotosRanked(client, accessToken, refreshToken, tableName, { ascOrDesc, lastId, limit } = {}) {
  let path = `/api/v1/photos_ranked/${encodeURIComponent(tableName)}/`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  if (lastId !== undefined) query.set('last_id', lastId);
  if (limit !== undefined) query.set('limit', limit);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotosMonthYearRanked(client, accessToken, refreshToken, projectTable, month, year, { ascOrDesc } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(projectTable)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}/ranked`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotosDateTakenNoneRankedSortDesc(client, accessToken, refreshToken, projectTable, { ascOrDesc } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(projectTable)}/date_taken/none/ranked`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}
