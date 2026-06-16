function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class Search {
  constructor(ctx) { this._ctx = ctx; }

  async searchProjectPhotos(projectTableName, { andParams, andStringParams, orParams, orStringParams, notParams, notStringParams, dateMin, dateMax, dateNullAnd, dateNullOr, dateOrder, customAlbumId, bestOfSimilarSetsOnly, curatedAlbumId, splitByTier } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/search/${encodeURIComponent(projectTableName)}/`;
    const query = new URLSearchParams();
    if (andParams !== undefined) (Array.isArray(andParams) ? andParams : [andParams]).forEach(v => query.append('and_params', v));
    if (andStringParams !== undefined) (Array.isArray(andStringParams) ? andStringParams : [andStringParams]).forEach(v => query.append('and_string_params', v));
    if (orParams !== undefined) (Array.isArray(orParams) ? orParams : [orParams]).forEach(v => query.append('or_params', v));
    if (orStringParams !== undefined) (Array.isArray(orStringParams) ? orStringParams : [orStringParams]).forEach(v => query.append('or_string_params', v));
    if (notParams !== undefined) (Array.isArray(notParams) ? notParams : [notParams]).forEach(v => query.append('not_params', v));
    if (notStringParams !== undefined) (Array.isArray(notStringParams) ? notStringParams : [notStringParams]).forEach(v => query.append('not_string_params', v));
    if (dateMin !== undefined) (Array.isArray(dateMin) ? dateMin : [dateMin]).forEach(v => query.append('date_min', v));
    if (dateMax !== undefined) (Array.isArray(dateMax) ? dateMax : [dateMax]).forEach(v => query.append('date_max', v));
    if (dateNullAnd !== undefined) (Array.isArray(dateNullAnd) ? dateNullAnd : [dateNullAnd]).forEach(v => query.append('date_null_and', v));
    if (dateNullOr !== undefined) (Array.isArray(dateNullOr) ? dateNullOr : [dateNullOr]).forEach(v => query.append('date_null_or', v));
    if (dateOrder !== undefined) (Array.isArray(dateOrder) ? dateOrder : [dateOrder]).forEach(v => query.append('date_order', v));
    if (customAlbumId !== undefined) (Array.isArray(customAlbumId) ? customAlbumId : [customAlbumId]).forEach(v => query.append('custom_album_id', v));
    if (bestOfSimilarSetsOnly !== undefined) (Array.isArray(bestOfSimilarSetsOnly) ? bestOfSimilarSetsOnly : [bestOfSimilarSetsOnly]).forEach(v => query.append('best_of_similar_sets_only', v));
    if (curatedAlbumId !== undefined) (Array.isArray(curatedAlbumId) ? curatedAlbumId : [curatedAlbumId]).forEach(v => query.append('curated_album_id', v));
    if (splitByTier !== undefined) (Array.isArray(splitByTier) ? splitByTier : [splitByTier]).forEach(v => query.append('split_by_tier', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async searchProjectPhotosNaturalLanguageAuto(projectTableName, searchText, size = undefined, { minCosine, labelMinCosine, labelTopK, labelDelta, debugScores } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/search/auto/${encodeURIComponent(projectTableName)}/`;
    const query = new URLSearchParams();
    if (minCosine !== undefined) (Array.isArray(minCosine) ? minCosine : [minCosine]).forEach(v => query.append('min_cosine', v));
    if (labelMinCosine !== undefined) (Array.isArray(labelMinCosine) ? labelMinCosine : [labelMinCosine]).forEach(v => query.append('label_min_cosine', v));
    if (labelTopK !== undefined) (Array.isArray(labelTopK) ? labelTopK : [labelTopK]).forEach(v => query.append('label_top_k', v));
    if (labelDelta !== undefined) (Array.isArray(labelDelta) ? labelDelta : [labelDelta]).forEach(v => query.append('label_delta', v));
    if (debugScores !== undefined) (Array.isArray(debugScores) ? debugScores : [debugScores]).forEach(v => query.append('debug_scores', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const body = stripUndef({
      search_text: searchText,
      size: size,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async getProjectSavedSearches(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/search/saved/${encodeURIComponent(projectTableName)}/`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getSavedSearchById(searchId) {
    this._ctx.requireTokens();
    const path = `/api/v1/search/${encodeURIComponent(searchId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async saveProjectPhotosSearch(projectTableName, { searchName, andParams, andStringParams, orParams, orStringParams, notParams, notStringParams, dateMin, dateMax, dateNullAnd, dateNullOr, dateOrder, customAlbumId, bestOfSimilarSetsOnly, curatedAlbumId, splitByTier } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/search/${encodeURIComponent(projectTableName)}/`;
    const query = new URLSearchParams();
    if (searchName !== undefined) (Array.isArray(searchName) ? searchName : [searchName]).forEach(v => query.append('search_name', v));
    if (andParams !== undefined) (Array.isArray(andParams) ? andParams : [andParams]).forEach(v => query.append('and_params', v));
    if (andStringParams !== undefined) (Array.isArray(andStringParams) ? andStringParams : [andStringParams]).forEach(v => query.append('and_string_params', v));
    if (orParams !== undefined) (Array.isArray(orParams) ? orParams : [orParams]).forEach(v => query.append('or_params', v));
    if (orStringParams !== undefined) (Array.isArray(orStringParams) ? orStringParams : [orStringParams]).forEach(v => query.append('or_string_params', v));
    if (notParams !== undefined) (Array.isArray(notParams) ? notParams : [notParams]).forEach(v => query.append('not_params', v));
    if (notStringParams !== undefined) (Array.isArray(notStringParams) ? notStringParams : [notStringParams]).forEach(v => query.append('not_string_params', v));
    if (dateMin !== undefined) (Array.isArray(dateMin) ? dateMin : [dateMin]).forEach(v => query.append('date_min', v));
    if (dateMax !== undefined) (Array.isArray(dateMax) ? dateMax : [dateMax]).forEach(v => query.append('date_max', v));
    if (dateNullAnd !== undefined) (Array.isArray(dateNullAnd) ? dateNullAnd : [dateNullAnd]).forEach(v => query.append('date_null_and', v));
    if (dateNullOr !== undefined) (Array.isArray(dateNullOr) ? dateNullOr : [dateNullOr]).forEach(v => query.append('date_null_or', v));
    if (dateOrder !== undefined) (Array.isArray(dateOrder) ? dateOrder : [dateOrder]).forEach(v => query.append('date_order', v));
    if (customAlbumId !== undefined) (Array.isArray(customAlbumId) ? customAlbumId : [customAlbumId]).forEach(v => query.append('custom_album_id', v));
    if (bestOfSimilarSetsOnly !== undefined) (Array.isArray(bestOfSimilarSetsOnly) ? bestOfSimilarSetsOnly : [bestOfSimilarSetsOnly]).forEach(v => query.append('best_of_similar_sets_only', v));
    if (curatedAlbumId !== undefined) (Array.isArray(curatedAlbumId) ? curatedAlbumId : [curatedAlbumId]).forEach(v => query.append('curated_album_id', v));
    if (splitByTier !== undefined) (Array.isArray(splitByTier) ? splitByTier : [splitByTier]).forEach(v => query.append('split_by_tier', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async deleteSavedSearchById(searchId) {
    this._ctx.requireTokens();
    const path = `/api/v1/search/${encodeURIComponent(searchId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
