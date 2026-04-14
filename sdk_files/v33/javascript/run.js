export class Run {
  constructor(ctx) { this._ctx = ctx; }

  async createRun(body) {
    this._ctx.requireTokens();
    const path = `/api/v1/runs/`;
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

  async updateRun(runId, body) {
    this._ctx.requireTokens();
    const path = `/api/v1/runs/${encodeURIComponent(runId)}`;
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
