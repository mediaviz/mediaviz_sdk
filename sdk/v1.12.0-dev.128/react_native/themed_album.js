function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class ThemedAlbum {
  constructor(ctx) { this._ctx = ctx; }

  async createThemedAlbum(projectTableName, name, description = undefined, confidenceValue = undefined) {
    this._ctx.requireTokens();
    const path = `/api/v1/themed_album/project/${encodeURIComponent(projectTableName)}`;
    const body = stripUndef({
      name: name,
      description: description,
      confidence_value: confidenceValue,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async getAllProjectThemedAlbums(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/themed_album/project/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getThemedAlbumPhotos(albumId, { ascOrDesc, lastId, limit, confidenceValue } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/themed_album/photos/${encodeURIComponent(albumId)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
    if (confidenceValue !== undefined) (Array.isArray(confidenceValue) ? confidenceValue : [confidenceValue]).forEach(v => query.append('confidence_value', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getThemedAlbumPhotosRanked(albumId, { ascOrDesc, lastId, limit, confidenceValue } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/themed_album/photos/ranked/${encodeURIComponent(albumId)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
    if (confidenceValue !== undefined) (Array.isArray(confidenceValue) ? confidenceValue : [confidenceValue]).forEach(v => query.append('confidence_value', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getThemedAlbumById(albumId) {
    this._ctx.requireTokens();
    const path = `/api/v1/themed_album/${encodeURIComponent(albumId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updateThemedAlbum(albumId, { name, description, confidenceValue } = {}) {
    this._ctx.requireTokens();
    const path = `/api/v1/themed_album/${encodeURIComponent(albumId)}`;
    const body = stripUndef({
      name: name,
      description: description,
      confidence_value: confidenceValue,
    });
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async deleteThemedAlbum(albumId) {
    this._ctx.requireTokens();
    const path = `/api/v1/themed_album/${encodeURIComponent(albumId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async convertThemedAlbumToCustom(albumId) {
    this._ctx.requireTokens();
    const path = `/api/v1/themed_album/${encodeURIComponent(albumId)}/convert`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
