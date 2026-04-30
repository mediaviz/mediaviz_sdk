function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class CustomAlbums {
  constructor(ctx) { this._ctx = ctx; }

  async getCustomAlbumDetailById(customAlbumId) {
    this._ctx.requireTokens();
    const path = `/api/v1/custom_album/${encodeURIComponent(customAlbumId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getAllProjectCustomAlbums(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/custom_album/project/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getCustomAlbumPhotosById(customAlbumId, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/custom_album/photos/${encodeURIComponent(customAlbumId)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getRankedCustomAlbumById(customAlbumId, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/custom_album/photos/ranked/${encodeURIComponent(customAlbumId)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async createProjectCustomAlbum(projectTableName, name = undefined, description = undefined, photoIdInclusionList = undefined, photoIdRemovalList = undefined) {
    this._ctx.requireTokens();
    const path = `/api/v1/custom_album/project/${encodeURIComponent(projectTableName)}`;
    const body = stripUndef({
      name: name,
      description: description,
      photo_id_inclusion_list: photoIdInclusionList,
      photo_id_removal_list: photoIdRemovalList,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async updateCustomAlbum(albumId, name = undefined, description = undefined, photoIdInclusionList = undefined, photoIdRemovalList = undefined) {
    this._ctx.requireTokens();
    const path = `/api/v1/custom_album/${encodeURIComponent(albumId)}`;
    const body = stripUndef({
      name: name,
      description: description,
      photo_id_inclusion_list: photoIdInclusionList,
      photo_id_removal_list: photoIdRemovalList,
    });
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async deleteCustomAlbum(albumId) {
    this._ctx.requireTokens();
    const path = `/api/v1/custom_album/${encodeURIComponent(albumId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
