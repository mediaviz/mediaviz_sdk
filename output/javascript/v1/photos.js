import { OAuthClient } from './oauth/index.js';

export function getPhotosSort(client, accessToken, refreshToken, tableName, sortOrder, { limit, lastId } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(tableName)}/sort/${encodeURIComponent(sortOrder)}/`;
  const query = new URLSearchParams();
  if (limit !== undefined) query.set('limit', limit);
  if (lastId !== undefined) query.set('last_id', lastId);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotos(client, accessToken, refreshToken, tableName) {
  const path = `/api/v1/photos/${encodeURIComponent(tableName)}/`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotos1(client, accessToken, refreshToken, tableName, id) {
  const path = `/api/v1/photos/${encodeURIComponent(tableName)}/${encodeURIComponent(id)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function deletePhotosDelete(client, accessToken, refreshToken, tableName, { photoIds } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(tableName)}/delete/`;
  const query = new URLSearchParams();
  if (photoIds !== undefined) query.set('photo_ids', photoIds);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'DELETE', accessToken, refreshToken);
}

export function getPhotosProject(client, accessToken, refreshToken, projectTable) {
  const path = `/api/v1/photos_project/${encodeURIComponent(projectTable)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotoMonthYears(client, accessToken, refreshToken, projectTable) {
  const path = `/api/v1/photo_month_years/${encodeURIComponent(projectTable)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotosMonthYearSort(client, accessToken, refreshToken, projectTable, month, year, sortOrder, { limit, lastId } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(projectTable)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}/sort/${encodeURIComponent(sortOrder)}/`;
  const query = new URLSearchParams();
  if (limit !== undefined) query.set('limit', limit);
  if (lastId !== undefined) query.set('last_id', lastId);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotosDateTakenNone(client, accessToken, refreshToken, projectTable) {
  const path = `/api/v1/photos/${encodeURIComponent(projectTable)}/date_taken/none`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function updatePhotosUpdateIdRank(client, accessToken, refreshToken, projectTable, id, newCategory) {
  const path = `/api/v1/photos_update/${encodeURIComponent(projectTable)}/id/${encodeURIComponent(id)}/rank/${encodeURIComponent(newCategory)}`;
  return client.request(path, 'PUT', accessToken, refreshToken);
}

export function getPhotosRankedSort(client, accessToken, refreshToken, tableName, sortOrder, { limit, lastId } = {}) {
  let path = `/api/v1/photos_ranked/${encodeURIComponent(tableName)}/sort/${encodeURIComponent(sortOrder)}/`;
  const query = new URLSearchParams();
  if (limit !== undefined) query.set('limit', limit);
  if (lastId !== undefined) query.set('last_id', lastId);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotosMonthYearRankedSort(client, accessToken, refreshToken, projectTable, month, year, sortOrder) {
  const path = `/api/v1/photos/${encodeURIComponent(projectTable)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}/ranked/sort/${encodeURIComponent(sortOrder)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getPhotosDateTakenNoneRankedSortDesc(client, accessToken, refreshToken, projectTable) {
  const path = `/api/v1/photos/${encodeURIComponent(projectTable)}/date_taken/none/ranked/sort/desc`;
  return client.request(path, 'GET', accessToken, refreshToken);
}
