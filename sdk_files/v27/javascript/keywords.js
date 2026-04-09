import { OAuthClient } from './_oauth.js';

export async function getUserKeywordFilteringLists(client, accessToken, refreshToken) {
  const path = `/api/v1/keyword/user`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function createKeywordFilteringList(client, accessToken, refreshToken, body) {
  const path = `/api/v1/keyword/`;
  const { data } = await client.request(path, 'POST', accessToken, refreshToken, JSON.stringify(body));
  return data;
}

export async function getKeywordFilteringListById(client, accessToken, refreshToken, keywordListId) {
  const path = `/api/v1/keyword/list/${encodeURIComponent(keywordListId)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getDefaultKeywordFilteringListByProject(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/keyword/project/${encodeURIComponent(projectTableName)}/default`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getExistingKeywordFilteringListByProject(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/keyword/project/${encodeURIComponent(projectTableName)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getKeywordsAndIds(client, accessToken, refreshToken) {
  const path = `/api/v1/keyword/all_keywords/id/label`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function updateKeywordFilteringListLabels(client, accessToken, refreshToken, keywordListId, body) {
  const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
  const { data } = await client.request(path, 'PUT', accessToken, refreshToken, JSON.stringify(body));
  return data;
}

export async function updateKeywordFilteringListDetails(client, accessToken, refreshToken, keywordListId, body) {
  const path = `/api/v1/keyword/details/${encodeURIComponent(keywordListId)}`;
  const { data } = await client.request(path, 'PUT', accessToken, refreshToken, JSON.stringify(body));
  return data;
}

export async function addProjectToKeywordFilteringList(client, accessToken, refreshToken, keywordListId, { projectIds } = {}) {
  let path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/projects`;
  const query = new URLSearchParams();
  if (projectIds !== undefined) query.set('project_ids', projectIds);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'POST', accessToken, refreshToken);
  return data;
}

export async function getKeywordFilteringListAndProjectsById(client, accessToken, refreshToken, keywordListId) {
  const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function removeProjectsFromKeywordFilteringList(client, accessToken, refreshToken, keywordListId, { projectIds } = {}) {
  let path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/projects`;
  const query = new URLSearchParams();
  if (projectIds !== undefined) query.set('project_ids', projectIds);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'DELETE', accessToken, refreshToken);
  return data;
}

export async function deleteKeywordFilteringListById(client, accessToken, refreshToken, keywordListId) {
  const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
  const { data } = await client.request(path, 'DELETE', accessToken, refreshToken);
  return data;
}

export async function requestKeywordListExport(client, accessToken, refreshToken, keywordListId) {
  const path = `/api/v1/keyword/export/${encodeURIComponent(keywordListId)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function requestKeywordListExportStatus(client, accessToken, refreshToken, keywordListId) {
  const path = `/api/v1/keyword/export_status/${encodeURIComponent(keywordListId)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}
