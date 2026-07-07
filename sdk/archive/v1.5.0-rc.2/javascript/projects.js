function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class Projects {
  constructor(ctx) { this._ctx = ctx; }

  async createProjectAndRun(name, private_ = undefined, type = undefined, description = undefined, directory = undefined, photoUploadVector = undefined, thumbnail = undefined, runName = undefined, { outcomes, models } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/project_outcome/`;
    const query = new URLSearchParams();
    if (outcomes !== undefined) (Array.isArray(outcomes) ? outcomes : [outcomes]).forEach(v => query.append('outcomes', v));
    if (models !== undefined) (Array.isArray(models) ? models : [models]).forEach(v => query.append('models', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const body = stripUndef({
      name: name,
      private: private_,
      type: type,
      description: description,
      directory: directory,
      photo_upload_vector: photoUploadVector,
      thumbnail: thumbnail,
      run_name: runName,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async markProjectUploadComplete(projectTableName, { skippedFileCount } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/project/${encodeURIComponent(projectTableName)}/upload_complete/`;
    const query = new URLSearchParams();
    if (skippedFileCount !== undefined) (Array.isArray(skippedFileCount) ? skippedFileCount : [skippedFileCount]).forEach(v => query.append('skipped_file_count', v));
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

  async getProjectPrelimModelRequestTemplate(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/project_outcome/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getUserProjects() {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/user`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getAdminProjects() {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/admin`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectById(projectId) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectByDirectory(directory) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/directory/${encodeURIComponent(directory)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updateProject(projectId, { private: private_, type, description, directory, name, thumbnail } = {}) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
    const body = stripUndef({
      private: private_,
      type: type,
      description: description,
      directory: directory,
      name: name,
      thumbnail: thumbnail,
    });
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async updateProjectPhotoCount(tableName, { filesFailedCount } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/projects_photos/${encodeURIComponent(tableName)}/`;
    const query = new URLSearchParams();
    if (filesFailedCount !== undefined) (Array.isArray(filesFailedCount) ? filesFailedCount : [filesFailedCount]).forEach(v => query.append('files_failed_count', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updateProjectCreateUploadReport(tableName, { filesFailedCount } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/project_upload_report/${encodeURIComponent(tableName)}/`;
    const query = new URLSearchParams();
    if (filesFailedCount !== undefined) (Array.isArray(filesFailedCount) ? filesFailedCount : [filesFailedCount]).forEach(v => query.append('files_failed_count', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async requestProjectSimilarityQueue(projectTableName, level) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects_similarity_queue/${encodeURIComponent(projectTableName)}/level/${encodeURIComponent(level)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async requestProjectEvidenceQueue(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects_evidence_queue/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async requestProjectPersonhoodQueue(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects_personhood_queue/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async requestInsightsQueue(analysisLevel, identifier) {
    this._ctx.requireTokens();
    const path = `/api/v1/insights_queue/analysis_level/${encodeURIComponent(analysisLevel)}/identifier/${encodeURIComponent(identifier)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async requestProjectExport(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects_export/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectDataExportUploadStatus(projectTableName, modelName) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/${encodeURIComponent(projectTableName)}/upload_status/${encodeURIComponent(modelName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async addProjectEvent(projectTableName, event, detail = undefined) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/${encodeURIComponent(projectTableName)}/event`;
    const body = stripUndef({
      event: event,
      detail: detail,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async deleteProject(projectId) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
