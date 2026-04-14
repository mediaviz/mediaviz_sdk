export class Similarity {
  constructor(ctx) { this._ctx = ctx; }

  async getProjectsSimilarityLevelMedium(projectTable) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects_similarity/${encodeURIComponent(projectTable)}/level/medium`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectsSimilarityQueueLevel(projectTableName, similarityLevel) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects_similarity_queue/${encodeURIComponent(projectTableName)}/level/${encodeURIComponent(similarityLevel)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectsPersonhoodQueue(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/projects_personhood_queue/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
