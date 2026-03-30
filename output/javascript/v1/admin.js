import { OAuthClient } from './oauth/index.js';

export function getAdminCategoryLabels(client, accessToken, refreshToken, category) {
  const path = `/api/v1/admin/category_labels/${encodeURIComponent(category)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getAdminKeywordGroup(client, accessToken, refreshToken, keywordGroup, { subgroup } = {}) {
  let path = `/api/v1/admin/keyword_group/${encodeURIComponent(keywordGroup)}/`;
  const query = new URLSearchParams();
  if (subgroup !== undefined) query.set('subgroup', subgroup);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getAdminKeywordGroup1(client, accessToken, refreshToken) {
  const path = `/api/v1/admin/keyword_group`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function createAdminGetGoogleSheetsCredentials(client, accessToken, refreshToken) {
  const path = `/api/v1/admin/get_google_sheets_credentials`;
  return client.request(path, 'POST', accessToken, refreshToken);
}
