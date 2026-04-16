export class Export {
  constructor(ctx) { this._ctx = ctx; }

  async getProjectsUploadStatusDataExportService(tableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/${encodeURIComponent(tableName)}/upload_status/data_export_service`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectsExport(tableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects_export/${encodeURIComponent(tableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
