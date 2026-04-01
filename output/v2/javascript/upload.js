import { OAuthClient } from './_oauth.js';

export function createUpload(client, accessToken, refreshToken) {
  const path = `/upload`;
  return client.request(path, 'POST', accessToken, refreshToken);
}
