export class Projects {
  constructor(ctx) { this._ctx = ctx; }

  async checkProjectStatus(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/project/status/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectDataExportUploadStatus(projectTableName, modelName) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/${encodeURIComponent(projectTableName)}/upload_status/${encodeURIComponent(modelName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async requestProjectExport(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects_export/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getUserProjects({ companyId } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/projects/user`;
    const query = new URLSearchParams();
    if (companyId !== undefined) query.set('company_id', companyId);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectByDirectory(directory, directoryPath) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/directory/${encodeURIComponent(directory)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectById(projectId) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

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

  async updateProject(projectId, body) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async updateProjectPhotoCount(tableName, { filesFailedCount } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/projects_photos/${encodeURIComponent(tableName)}/`;
    const query = new URLSearchParams();
    if (filesFailedCount !== undefined) query.set('files_failed_count', filesFailedCount);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async deleteProject(projectId) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
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

  async addProjectEvent(projectTableName, body) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/${encodeURIComponent(projectTableName)}/event`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async updateProjectCreateUploadReport(tableName, { filesFailedCount } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/project_upload_report/${encodeURIComponent(tableName)}/`;
    const query = new URLSearchParams();
    if (filesFailedCount !== undefined) query.set('files_failed_count', filesFailedCount);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectPrelimModelRequestTemplate(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/project_outcome/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
