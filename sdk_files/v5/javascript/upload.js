import { OAuthClient } from './_oauth.js';

export function createUpload(client, accessToken, refreshToken, { fileContent, mimetype, filePath }) {
  const path = `/upload`;
  return client.request(path, 'POST', accessToken, refreshToken, { file_content: fileContent, mimetype, file_path: filePath });
}
