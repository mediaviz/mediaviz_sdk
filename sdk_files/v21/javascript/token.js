import { OAuthClient } from './_oauth.js';
import { handleResponse } from './errors.js';

export async function getAccessTokenLogin(baseUrl, { username, password }) {
  const resp = await fetch(baseUrl + `/api/v1/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      username,
      password
    }).toString(),
  });
  return handleResponse(resp);
}

export async function invalidateTokenLogout(client, accessToken, refreshToken) {
  const path = `/api/v1/logout`;
  const { data } = await client.request(path, 'POST', accessToken, refreshToken);
  return data;
}
