import { OAuthClient } from './_oauth.js';
import { handleResponse } from './errors.js';

export async function createToken(baseUrl, { username, password }) {
  const resp = await fetch(baseUrl + `/api/v1/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password
    }),
  });
  return handleResponse(resp);
}

export function createRequestPasswordReset(client, accessToken, refreshToken, { email } = {}) {
  let path = `/api/v1/request-password-reset`;
  const query = new URLSearchParams();
  if (email !== undefined) query.set('email', email);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'POST', accessToken, refreshToken);
}

export async function createResetPassword(baseUrl, { token, newPassword }) {
  const resp = await fetch(baseUrl + `/api/v1/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token,
      new_password: newPassword
    }),
  });
  return handleResponse(resp);
}

export function createLogout(client, accessToken, refreshToken) {
  const path = `/api/v1/logout`;
  return client.request(path, 'POST', accessToken, refreshToken);
}

export async function getShareauthPhp(baseUrl) {
  const resp = await fetch(baseUrl + `/shareAuth.php`, { method: 'GET' });
  return handleResponse(resp);
}
