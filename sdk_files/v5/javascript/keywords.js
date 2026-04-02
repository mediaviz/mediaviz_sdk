import { OAuthClient } from './_oauth.js';

export function getKeywordUser(client, accessToken, refreshToken) {
  const path = `/api/v1/keyword/user`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function createKeyword(client, accessToken, refreshToken, { name, projectList }) {
  const path = `/api/v1/keyword/`;
  return client.request(path, 'POST', accessToken, refreshToken, { name, project_list: projectList });
}

export function getKeywordList(client, accessToken, refreshToken, keywordListId) {
  const path = `/api/v1/keyword/list/${encodeURIComponent(keywordListId)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getKeywordProjectDefault(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/keyword/project/${encodeURIComponent(projectTableName)}/default`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getKeywordProject(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/keyword/project/${encodeURIComponent(projectTableName)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getKeywordAllKeywordsIdLabel(client, accessToken, refreshToken) {
  const path = `/api/v1/keyword/all_keywords/id/label`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function updateKeyword(client, accessToken, refreshToken, keywordsListId, { listKeywordsToInclude, listKeywordsToExclude }) {
  const path = `/api/v1/keyword/${encodeURIComponent(keywordsListId)}`;
  return client.request(path, 'PUT', accessToken, refreshToken, { list_keywords_to_include: listKeywordsToInclude, list_keywords_to_exclude: listKeywordsToExclude });
}

export function updateKeywordDetails(client, accessToken, refreshToken, keywordsListId, { name }) {
  const path = `/api/v1/keyword/details/${encodeURIComponent(keywordsListId)}`;
  return client.request(path, 'PUT', accessToken, refreshToken, { name });
}

export function createKeywordProjects(client, accessToken, refreshToken, keywordListId, body = {}) {
  const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/projects`;
  return client.request(path, 'POST', accessToken, refreshToken, body);
}

export function getKeyword(client, accessToken, refreshToken, keywordListId) {
  const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function deleteKeywordProjects(client, accessToken, refreshToken, keywordListId, body = {}) {
  const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/projects`;
  return client.request(path, 'DELETE', accessToken, refreshToken, body);
}

export function deleteKeyword(client, accessToken, refreshToken, keywordListId) {
  const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
  return client.request(path, 'DELETE', accessToken, refreshToken);
}

export function getKeywordExport(client, accessToken, refreshToken, keywordListId) {
  const path = `/api/v1/keyword/export/${encodeURIComponent(keywordListId)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getKeywordExportStatus(client, accessToken, refreshToken, keywordListId) {
  const path = `/api/v1/keyword/export_status/${encodeURIComponent(keywordListId)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}
