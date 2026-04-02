import { OAuthClient } from './_oauth.js';

export function getAdminGoogleSheetsCredentials(client, accessToken, refreshToken) {
  const path = `/api/v1/admin/get_google_sheets_credentials`;
  return client.request(path, 'POST', accessToken, refreshToken);
}
