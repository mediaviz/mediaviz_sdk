import { OAuthClient } from './_oauth.js';

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

export async function markProjectUploadComplete(client, accessToken, refreshToken, projectTableName, { skippedFileCount } = {}) {
  let path = `/api/v1/project/${encodeURIComponent(projectTableName)}/upload_complete/`;
  const query = new URLSearchParams();
  if (skippedFileCount !== undefined) query.set('skipped_file_count', skippedFileCount);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'POST', accessToken, refreshToken);
  return data;
}

export async function checkProjectStatus(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/project/status/${encodeURIComponent(projectTableName)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function deleteProject(client, accessToken, refreshToken, projectId) {
  const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
  const { data } = await client.request(path, 'DELETE', accessToken, refreshToken);
  return data;
}

export async function getProjectPrelimModelRequestTemplate(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/project_outcome/${encodeURIComponent(projectTableName)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}
