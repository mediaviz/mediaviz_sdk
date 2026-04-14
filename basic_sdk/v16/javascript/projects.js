export class Projects {
  constructor(ctx) { this._ctx = ctx; }

  async createProjectAndRun(body, { outcomes, models } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/project_outcome/`;
    const query = new URLSearchParams();
    if (outcomes !== undefined) query.set('outcomes', outcomes);
    if (models !== undefined) query.set('models', models);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async markProjectUploadComplete(projectTableName, { skippedFileCount } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/project/${encodeURIComponent(projectTableName)}/upload_complete/`;
    const query = new URLSearchParams();
    if (skippedFileCount !== undefined) query.set('skipped_file_count', skippedFileCount);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async checkProjectStatus(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/project/status/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async deleteProject(projectId) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectPrelimModelRequestTemplate(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/project_outcome/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
