export class Reporting {
  constructor(ctx) { this._ctx = ctx; }

  async updateProjectUploadReport(projectTableName, { skippedFileCount } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/project_upload_report/${encodeURIComponent(projectTableName)}/`;
    const query = new URLSearchParams();
    if (skippedFileCount !== undefined) query.set('skipped_file_count', skippedFileCount);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
