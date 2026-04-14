export class Search {
  constructor(ctx) { this._ctx = ctx; }

  async searchProjectPhotos(projectTableName, { andParams, andStringParams, orParams, orStringParams, notParams, notStringParams, dateMin, dateMax, dateNullAnd, dateNullOr, dateOrder, customAlbumId, bestOfSimilarSetsOnly, curatedAlbumName, splitByTier } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/search/${encodeURIComponent(projectTableName)}/`;
    const query = new URLSearchParams();
    if (andParams !== undefined) query.set('and_params', andParams);
    if (andStringParams !== undefined) query.set('and_string_params', andStringParams);
    if (orParams !== undefined) query.set('or_params', orParams);
    if (orStringParams !== undefined) query.set('or_string_params', orStringParams);
    if (notParams !== undefined) query.set('not_params', notParams);
    if (notStringParams !== undefined) query.set('not_string_params', notStringParams);
    if (dateMin !== undefined) query.set('date_min', dateMin);
    if (dateMax !== undefined) query.set('date_max', dateMax);
    if (dateNullAnd !== undefined) query.set('date_null_and', dateNullAnd);
    if (dateNullOr !== undefined) query.set('date_null_or', dateNullOr);
    if (dateOrder !== undefined) query.set('date_order', dateOrder);
    if (customAlbumId !== undefined) query.set('custom_album_id', customAlbumId);
    if (bestOfSimilarSetsOnly !== undefined) query.set('best_of_similar_sets_only', bestOfSimilarSetsOnly);
    if (curatedAlbumName !== undefined) query.set('curated_album_name', curatedAlbumName);
    if (splitByTier !== undefined) query.set('split_by_tier', splitByTier);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
