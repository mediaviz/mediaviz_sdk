export class Evidence {
  constructor(ctx) { this._ctx = ctx; }

  async getProjectsEvidence(projectTable) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects_evidence/${encodeURIComponent(projectTable)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
