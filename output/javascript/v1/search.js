import { OAuthClient } from './oauth/index.js';

export function getSearch(client, accessToken, refreshToken, projectTableName, { andParams, orParams, dateNullAnd, dateMin, dateMax, customAlbumId, curatedAlbumName, dateOrder, bestOfSimilarSetsOnly } = {}) {
  let path = `/api/v1/search/${encodeURIComponent(projectTableName)}/`;
  const query = new URLSearchParams();
  if (andParams !== undefined) query.set('and_params', andParams);
  if (orParams !== undefined) query.set('or_params', orParams);
  if (dateNullAnd !== undefined) query.set('date_null_and', dateNullAnd);
  if (dateMin !== undefined) query.set('date_min', dateMin);
  if (dateMax !== undefined) query.set('date_max', dateMax);
  if (customAlbumId !== undefined) query.set('custom_album_id', customAlbumId);
  if (curatedAlbumName !== undefined) query.set('curated_album_name', curatedAlbumName);
  if (dateOrder !== undefined) query.set('date_order', dateOrder);
  if (bestOfSimilarSetsOnly !== undefined) query.set('best_of_similar_sets_only', bestOfSimilarSetsOnly);
  const qs = query.toString();
  if (qs) path += '?' + qs;
  return client.request(path, 'GET', accessToken, refreshToken);
}
