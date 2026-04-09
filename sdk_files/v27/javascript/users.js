import { OAuthClient } from './_oauth.js';
import { handleResponse } from './errors.js';

export async function getUser(client, accessToken, refreshToken, userId) {
  const path = `/api/v1/users/${encodeURIComponent(userId)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function createUserAndCompany(baseUrl, body) {
  const resp = await fetch(baseUrl + `/api/v1/users/new_company`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleResponse(resp);
}

export async function updateUser(client, accessToken, refreshToken, userId, body) {
  const path = `/api/v1/users/${encodeURIComponent(userId)}`;
  const { data } = await client.request(path, 'PUT', accessToken, refreshToken, JSON.stringify(body));
  return data;
}

export async function deleteUser(client, accessToken, refreshToken, userId, { newCompanyOwnerId } = {}) {
  let path = `/api/v1/users/delete/${encodeURIComponent(userId)}`;
  const query = new URLSearchParams();
  if (newCompanyOwnerId !== undefined) query.set('new_company_owner_id', newCompanyOwnerId);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'DELETE', accessToken, refreshToken);
  return data;
}

export async function changePassword(client, accessToken, refreshToken, body) {
  const path = `/api/v1/user/change_password`;
  const { data } = await client.request(path, 'POST', accessToken, refreshToken, JSON.stringify(body));
  return data;
}

export async function createUser(client, accessToken, refreshToken, body) {
  const path = `/api/v1/users/`;
  const { data } = await client.request(path, 'POST', accessToken, refreshToken, JSON.stringify(body));
  return data;
}

export async function getAllUsersByCompany(client, accessToken, refreshToken, companyId) {
  const path = `/api/v1/users/company/${encodeURIComponent(companyId)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}
