import { OAuthClient } from './_oauth.js';

export function getProjectsEvidence(client, accessToken, refreshToken, projectTable) {
  const path = `/api/v1/projects_evidence/${encodeURIComponent(projectTable)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}
