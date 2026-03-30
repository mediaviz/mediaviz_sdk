import { OAuthClient } from './oauth/index.js';

export function getProjectsSimilarityLevelMedium(client, accessToken, refreshToken, projectTable) {
  const path = `/api/v1/projects_similarity/${encodeURIComponent(projectTable)}/level/medium`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getProjectsSimilarityQueueLevel(client, accessToken, refreshToken, projectTableName, similarityLevel) {
  const path = `/api/v1/projects_similarity_queue/${encodeURIComponent(projectTableName)}/level/${encodeURIComponent(similarityLevel)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}

export function getProjectsPersonhoodQueue(client, accessToken, refreshToken, projectTableName) {
  const path = `/api/v1/projects_personhood_queue/${encodeURIComponent(projectTableName)}`;
  return client.request(path, 'GET', accessToken, refreshToken);
}
