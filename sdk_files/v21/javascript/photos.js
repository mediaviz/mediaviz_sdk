import { OAuthClient } from './_oauth.js';

export async function getAllProjectPhotoIds(client, accessToken, refreshToken, tableName, { ascOrDesc, lastId, limit } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(tableName)}/`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  if (lastId !== undefined) query.set('last_id', lastId);
  if (limit !== undefined) query.set('limit', limit);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getPhotoFromProject(client, accessToken, refreshToken, tableName, photoId, { keywordListId } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(tableName)}/${encodeURIComponent(photoId)}`;
  const query = new URLSearchParams();
  if (keywordListId !== undefined) query.set('keyword_list_id', keywordListId);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function deletePhotoFromProject(client, accessToken, refreshToken, tableName, { photoIds } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(tableName)}/delete/`;
  const query = new URLSearchParams();
  if (photoIds !== undefined) query.set('photo_ids', photoIds);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'DELETE', accessToken, refreshToken);
  return data;
}

export async function getProjectThumbnail(client, accessToken, refreshToken, tableName) {
  const path = `/api/v1/photos_project/${encodeURIComponent(tableName)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getProjectMonthYearsWithPhotos(client, accessToken, refreshToken, tableName) {
  const path = `/api/v1/photo_month_years/${encodeURIComponent(tableName)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getProjectPhotoIdsByMonth(client, accessToken, refreshToken, tableName, month, year, { ascOrDesc } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(tableName)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getProjectPhotoIdsNoDateTaken(client, accessToken, refreshToken, tableName) {
  const path = `/api/v1/photos/${encodeURIComponent(tableName)}/date_taken/none`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function updatePhotoRanking(client, accessToken, refreshToken, tableName, photoId, newCategory) {
  const path = `/api/v1/photos_update/${encodeURIComponent(tableName)}/id/${encodeURIComponent(photoId)}/rank/${encodeURIComponent(newCategory)}`;
  const { data } = await client.request(path, 'PUT', accessToken, refreshToken);
  return data;
}

export async function getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked(client, accessToken, refreshToken, tableName, { ascOrDesc } = {}) {
  let path = `/api/v1/photos_ranked/${encodeURIComponent(tableName)}`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked(client, accessToken, refreshToken, tableName, month, year, { ascOrDesc } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(tableName)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}/ranked`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getTopProjectPhotosByTableNameNoDateTakenNewRanked(client, accessToken, refreshToken, tableName, { ascOrDesc } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(tableName)}/date_taken/none/ranked`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}
