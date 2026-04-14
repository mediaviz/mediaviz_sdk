export class CustomAlbums {
  constructor(ctx) { this._ctx = ctx; }

  async createProjectCustomAlbum(projectTableName, body) {
    this._ctx.requireTokens();
    const path = `/api/v1/custom_album/project/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async getAllProjectCustomAlbums(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/custom_album/project/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getCustomAlbumDetailById(customAlbumId) {
    this._ctx.requireTokens();
    const path = `/api/v1/custom_album/${encodeURIComponent(customAlbumId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async deleteCustomAlbum(albumId, customAlbumId) {
    this._ctx.requireTokens();
    const path = `/api/v1/custom_album/${encodeURIComponent(albumId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updateCustomAlbum(albumId, customAlbumId, body) {
    this._ctx.requireTokens();
    const path = `/api/v1/custom_album/${encodeURIComponent(albumId)}`;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async getCustomAlbumPhotosById(customAlbumId, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/custom_album/photos/${encodeURIComponent(customAlbumId)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getTopMiddleBottomCustomAlbumById(customAlbumId, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/custom_album/photos/ranked/${encodeURIComponent(customAlbumId)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
