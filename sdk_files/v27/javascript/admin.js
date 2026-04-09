import { OAuthClient } from './_oauth.js';

export async function getCategoryLabels(client, accessToken, refreshToken, category) {
  const path = `/api/v1/admin/category_labels/${encodeURIComponent(category)}`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getAllKeywordGroupsAndSubgroups(client, accessToken, refreshToken) {
  const path = `/api/v1/admin/keyword_group`;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getKeywordGroupsLabelsByKeywordGroup(client, accessToken, refreshToken, keywordGroup, { subgroup } = {}) {
  let path = `/api/v1/admin/keyword_group/${encodeURIComponent(keywordGroup)}/`;
  const query = new URLSearchParams();
  if (subgroup !== undefined) query.set('subgroup', subgroup);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  const { data } = await client.request(path, 'GET', accessToken, refreshToken);
  return data;
}

export async function getGoogleSheetsCredentials(client, accessToken, refreshToken) {
  const path = `/api/v1/admin/get_google_sheets_credentials`;
  const { data } = await client.request(path, 'POST', accessToken, refreshToken);
  return data;
}
