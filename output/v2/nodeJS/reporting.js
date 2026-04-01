import { OAuthClient } from './_oauth.js';

export function updateProjectUploadReport(client, accessToken, refreshToken, projectTableName, { skippedFileCount } = {}) {
  let path = `/api/v1/project_upload_report/${encodeURIComponent(projectTableName)}/`;
  const query = new URLSearchParams();
  if (skippedFileCount !== undefined) query.set('skipped_file_count', skippedFileCount);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'PUT', accessToken, refreshToken);
}
