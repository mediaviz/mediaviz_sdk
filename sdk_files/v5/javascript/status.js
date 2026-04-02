import { OAuthClient } from './_oauth.js';

export function getPhotosProjectUploadStatus(client, accessToken, refreshToken, tableName, model) {
  const path = `/api/v1/photos_project/${encodeURIComponent(tableName)}/upload_status/${encodeURIComponent(model)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}
