import { OAuthClient } from './_oauth.js';

export function getProjectsUploadStatusDataExportService(client, accessToken, refreshToken, tableName) {
  const path = `/api/v1/projects/${encodeURIComponent(tableName)}/upload_status/data_export_service`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getProjectsExport(client, accessToken, refreshToken, tableName) {
  const path = `/api/v1/projects_export/${encodeURIComponent(tableName)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}
