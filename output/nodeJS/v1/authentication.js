import { OAuthClient } from './oauth/index.js';

export async function createToken(baseUrl, { type, required, passwordType, passwordRequired }) {
  const resp = await fetch(baseUrl + `/api/v1/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: { type, required },
      password: { type: passwordType, required: passwordRequired }
    }),
  });
  return resp.json();
}

export function createRequestPasswordReset(client, accessToken, refreshToken, { email } = {}) {
  let path = `/api/v1/request-password-reset`;
  const query = new URLSearchParams();
  if (email !== undefined) query.set('email', email);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'POST', accessToken, refreshToken);
}

export async function createResetPassword(baseUrl, { type, required, newPasswordType, newPasswordRequired }) {
  const resp = await fetch(baseUrl + `/api/v1/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: { type, required },
      new_password: { type: newPasswordType, required: newPasswordRequired }
    }),
  });
  return resp.json();
}

export function createLogout(client, accessToken, refreshToken) {
  const path = `/api/v1/logout`;
  return client.request(path, 'POST', accessToken, refreshToken);
}

export async function getShareauthPhp(baseUrl) {
  const resp = await fetch(baseUrl + `/shareAuth.php`, { method: 'GET' });
  return resp.json();
}
