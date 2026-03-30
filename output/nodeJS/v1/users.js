import { OAuthClient } from './oauth/index.js';
import { handleResponse } from './errors.js';

export function getUsers(client, accessToken, refreshToken, userId) {
  const path = `/api/v1/users/${encodeURIComponent(userId)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export async function createUsersNewCompany(baseUrl, { name, email, password, accountType, companyId, profilePicture, companyName }) {
  const resp = await fetch(baseUrl + `/api/v1/users/new_company`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: { name, email, password, account_type: accountType, company_id: companyId, profile_picture: profilePicture },
      company: { name: companyName }
    }),
  });
  return handleResponse(resp);
}

export function updateUsers(client, accessToken, refreshToken, userId) {
  const path = `/api/v1/users/${encodeURIComponent(userId)}`;
  return client.request(path, 'PUT', accessToken, refreshToken);
}

export function deleteUsersDelete(client, accessToken, refreshToken, userId) {
  const path = `/api/v1/users/delete/${encodeURIComponent(userId)}`;
  return client.request(path, 'DELETE', accessToken, refreshToken);
}

export function createUserChangePassword(client, accessToken, refreshToken) {
  const path = `/api/v1/user/change_password`;
  return client.request(path, 'POST', accessToken, refreshToken);
}

export function createUsers(client, accessToken, refreshToken) {
  const path = `/api/v1/users/`;
  return client.request(path, 'POST', accessToken, refreshToken);
}

export function getUsersCompany(client, accessToken, refreshToken, companyId) {
  const path = `/api/v1/users/company/${encodeURIComponent(companyId)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}
