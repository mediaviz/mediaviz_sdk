import { OAuthClient } from './_oauth.js';
import { handleResponse } from './errors.js';

export function getUsers(client, accessToken, refreshToken, userId) {
  const path = `/api/v1/users/${encodeURIComponent(userId)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export async function createUsersNewCompany(baseUrl, { user, company }) {
  const resp = await fetch(baseUrl + `/api/v1/users/new_company`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user,
      company
    }),
  });
  return handleResponse(resp);
}

export function updateUsers(client, accessToken, refreshToken, userId, body = {}) {
  const path = `/api/v1/users/${encodeURIComponent(userId)}`;
  return client.request(path, 'PUT', accessToken, refreshToken, body);
}

export function deleteUsersDelete(client, accessToken, refreshToken, userId) {
  const path = `/api/v1/users/delete/${encodeURIComponent(userId)}`;
  return client.request(path, 'DELETE', accessToken, refreshToken);
}

export function createUserChangePassword(client, accessToken, refreshToken, { oldPassword, newPassword }) {
  const path = `/api/v1/user/change_password`;
  return client.request(path, 'POST', accessToken, refreshToken, { old_password: oldPassword, new_password: newPassword });
}

export function createUsers(client, accessToken, refreshToken, body = {}) {
  const path = `/api/v1/users/`;
  return client.request(path, 'POST', accessToken, refreshToken, body);
}

export function getUsersCompany(client, accessToken, refreshToken, companyId) {
  const path = `/api/v1/users/company/${encodeURIComponent(companyId)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}
