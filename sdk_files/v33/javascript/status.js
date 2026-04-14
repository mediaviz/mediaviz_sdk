export class Status {
  constructor(ctx) { this._ctx = ctx; }

  async getPhotosProjectUploadStatus(tableName, model) {
    this._ctx.requireTokens();
    const path = `/api/v1/photos_project/${encodeURIComponent(tableName)}/upload_status/${encodeURIComponent(model)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
