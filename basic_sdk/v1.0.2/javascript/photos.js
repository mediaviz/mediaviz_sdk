export class Photos {
  constructor(ctx) { this._ctx = ctx; }

  async getAllProjectPhotoIds(tableName, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getPhotoFromProject(tableName, photoId, { keywordListId } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/${encodeURIComponent(photoId)}`;
    const query = new URLSearchParams();
    if (keywordListId !== undefined) query.set('keyword_list_id', keywordListId);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
