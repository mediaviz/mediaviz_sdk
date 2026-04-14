export class CuratedAlbums {
  constructor(ctx) { this._ctx = ctx; }

  async createCuratedAlbum(projectTableName, body) {
    this._ctx.requireTokens();
    const path = `/api/v1/curated_album/project/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async getAllProjectCuratedAlbums(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/curated_album/project/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getCuratedAlbumPhotos(albumId, { ascOrDesc, lastId, limit, confidenceValue } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/curated_album/photos/${encodeURIComponent(albumId)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    if (confidenceValue !== undefined) query.set('confidence_value', confidenceValue);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getCuratedAlbumPhotosRanked(albumId, { ascOrDesc, lastId, limit, confidenceValue } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/curated_album/photos/ranked/${encodeURIComponent(albumId)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    if (confidenceValue !== undefined) query.set('confidence_value', confidenceValue);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getCuratedAlbumById(albumId) {
    this._ctx.requireTokens();
    const path = `/api/v1/curated_album/${encodeURIComponent(albumId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updateCuratedAlbum(albumId, body) {
    this._ctx.requireTokens();
    const path = `/api/v1/curated_album/${encodeURIComponent(albumId)}`;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async deleteCuratedAlbum(albumId) {
    this._ctx.requireTokens();
    const path = `/api/v1/curated_album/${encodeURIComponent(albumId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async convertCuratedAlbumToCustom(albumId) {
    this._ctx.requireTokens();
    const path = `/api/v1/curated_album/${encodeURIComponent(albumId)}/convert`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
