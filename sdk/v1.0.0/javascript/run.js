function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class Run {
  constructor(ctx) { this._ctx = ctx; }

  async createRun(projectId, colorsModel, blurModel, faceRecognitionModel, imageClassificationModel, imageComparisonModel, personhoodModel, similarityModel, evidenceModel, active = undefined, name = undefined, similarityLevel = undefined, normalize = undefined) {
    this._ctx.requireTokens();
    const path = `/api/v1/runs/`;
    const body = stripUndef({
      project_id: projectId,
      active: active,
      name: name,
      similarity_level: similarityLevel,
      normalize: normalize,
      colors_model: colorsModel,
      blur_model: blurModel,
      face_recognition_model: faceRecognitionModel,
      image_classification_model: imageClassificationModel,
      image_comparison_model: imageComparisonModel,
      personhood_model: personhoodModel,
      similarity_model: similarityModel,
      evidence_model: evidenceModel,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async getRun(runId) {
    this._ctx.requireTokens();
    const path = `/api/v1/runs/${encodeURIComponent(runId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectRuns(projectId) {
    this._ctx.requireTokens();
    const path = `/api/v1/runs/project/${encodeURIComponent(projectId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updateRun(runId, projectRunIndex = undefined, models = undefined, active = undefined, name = undefined, similarityLevel = undefined) {
    this._ctx.requireTokens();
    const path = `/api/v1/runs/${encodeURIComponent(runId)}`;
    const body = stripUndef({
      project_run_index: projectRunIndex,
      models: models,
      active: active,
      name: name,
      similarity_level: similarityLevel,
    });
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async deleteRun(runId) {
    this._ctx.requireTokens();
    const path = `/api/v1/runs/${encodeURIComponent(runId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
