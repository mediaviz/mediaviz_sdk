import { OAuthClient } from './_oauth.js';

export async function getProjectDataExportUploadStatus(client, accessToken, refreshToken, projectTableName, modelName) {
  const path = `/api/v1/projects/${encodeURIComponent(projectTableName)}/upload_status/${encodeURIComponent(modelName)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function requestProjectExport(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/projects_export/${encodeURIComponent(projectTableName)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getUserProjects(client, accessToken, refreshToken) {
  const path = `/api/v1/projects/user`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getProjectByDirectory(client, accessToken, refreshToken, directory) {
  const path = `/api/v1/projects/directory/${encodeURIComponent(directory)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getProjectById(client, accessToken, refreshToken, projectId) {
  const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function createProjectAndRun(client, accessToken, refreshToken, body, { outcomes, models } = {}) {
  let path = `/api/v1/project_outcome/`;
  const query = new URLSearchParams();
  if (outcomes !== undefined) query.set('outcomes', outcomes);
  if (models !== undefined) query.set('models', models);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'POST', accessToken, refreshToken, JSON.stringify(body));
  return data;
}

export async function updateProject(client, accessToken, refreshToken, projectId, body) {
  const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
  const { data } = await client.request(path, 'PUT', accessToken, refreshToken, JSON.stringify(body));
  return data;
}

export async function updateProjectPhotoCount(client, accessToken, refreshToken, tableName, { filesFailedCount } = {}) {
  let path = `/api/v1/projects_photos/${encodeURIComponent(tableName)}/`;
  const query = new URLSearchParams();
  if (filesFailedCount !== undefined) query.set('files_failed_count', filesFailedCount);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'PUT', accessToken, refreshToken);
  return data;
}

export async function deleteProject(client, accessToken, refreshToken, projectId) {
  const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
  const { data } = await client.request(path, 'DELETE', accessToken, refreshToken);
  return data;
}

export async function addProjectEvent(client, accessToken, refreshToken, projectTableName, body) {
  const path = `/api/v1/projects/${encodeURIComponent(projectTableName)}/event`;
  const { data } = await client.request(path, 'POST', accessToken, refreshToken, JSON.stringify(body));
  return data;
}

export async function updateProjectCreateUploadReport(client, accessToken, refreshToken, tableName, { filesFailedCount } = {}) {
  let path = `/api/v1/project_upload_report/${encodeURIComponent(tableName)}/`;
  const query = new URLSearchParams();
  if (filesFailedCount !== undefined) query.set('files_failed_count', filesFailedCount);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'PUT', accessToken, refreshToken);
  return data;
}
