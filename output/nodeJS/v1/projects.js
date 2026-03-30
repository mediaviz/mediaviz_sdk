import { OAuthClient } from './oauth/index.js';

export function getProjectsUser(client, accessToken, refreshToken, { companyId } = {}) {
  let path = `/api/v1/projects/user`;
  const query = new URLSearchParams();
  if (companyId !== undefined) query.set('company_id', companyId);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getProjectsDirectory(client, accessToken, refreshToken, directoryPath) {
  const path = `/api/v1/projects/directory/${encodeURIComponent(directoryPath)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getProjects(client, accessToken, refreshToken, projectId) {
  const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function createProjectOutcome(client, accessToken, refreshToken, { outcomes, models } = {}) {
  let path = `/api/v1/project_outcome/`;
  const query = new URLSearchParams();
  if (outcomes !== undefined) query.set('outcomes', outcomes);
  if (models !== undefined) query.set('models', models);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'POST', accessToken, refreshToken);
}

export function updateProjects(client, accessToken, refreshToken, projectId) {
  const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
  return client.request(path, 'PUT', accessToken, refreshToken);
}

export function updateProjectsPhotos(client, accessToken, refreshToken, tableName) {
  const path = `/api/v1/projects_photos/${encodeURIComponent(tableName)}`;
  return client.request(path, 'PUT', accessToken, refreshToken);
}

export function deleteProjects(client, accessToken, refreshToken, projectId) {
  const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
  return client.request(path, 'DELETE', accessToken, refreshToken);
}

export function createProjectsEvent(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/projects/${encodeURIComponent(projectTableName)}/event`;
  return client.request(path, 'POST', accessToken, refreshToken);
}
