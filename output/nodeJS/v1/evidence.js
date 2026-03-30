import { OAuthClient } from './oauth/index.js';

export function getProjectsEvidence(client, accessToken, refreshToken, projectTable) {
  const path = `/api/v1/projects_evidence/${encodeURIComponent(projectTable)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}
