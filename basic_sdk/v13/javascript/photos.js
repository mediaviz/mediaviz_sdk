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

export async function getPhotoFromProject(client, accessToken, refreshToken, tableName, photoId, id, { keywordListId } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(tableName)}/${encodeURIComponent(photoId)}`;
  const query = new URLSearchParams();
  if (keywordListId !== undefined) query.set('keyword_list_id', keywordListId);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked(client, accessToken, refreshToken, tableName, month, year, projectTable, { ascOrDesc } = {}) {
  let path = `/api/v1/photos/${encodeURIComponent(tableName)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}/ranked`;
  const query = new URLSearchParams();
  if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}
