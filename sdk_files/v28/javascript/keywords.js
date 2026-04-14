export class Keywords {
  constructor(ctx) { this._ctx = ctx; }

  async getUserKeywordFilteringLists() {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/user`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async createKeywordFilteringList(body) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async getKeywordFilteringListById(keywordListId) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/list/${encodeURIComponent(keywordListId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getDefaultKeywordFilteringListByProject(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/project/${encodeURIComponent(projectTableName)}/default`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getExistingKeywordFilteringListByProject(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/project/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getKeywordsAndIds() {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/all_keywords/id/label`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updateKeywordFilteringListLabels(keywordListId, keywordsListId, body) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async updateKeywordFilteringListDetails(keywordListId, keywordsListId, body) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/details/${encodeURIComponent(keywordListId)}`;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async addProjectToKeywordFilteringList(keywordListId, body = {}, { projectIds } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/projects`;
    const query = new URLSearchParams();
    if (projectIds !== undefined) query.set('project_ids', projectIds);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async getKeywordFilteringListAndProjectsById(keywordListId) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async removeProjectsFromKeywordFilteringList(keywordListId, body = {}, { projectIds } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/projects`;
    const query = new URLSearchParams();
    if (projectIds !== undefined) query.set('project_ids', projectIds);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async deleteKeywordFilteringListById(keywordListId) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async requestKeywordListExport(keywordListId) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/export/${encodeURIComponent(keywordListId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async requestKeywordListExportStatus(keywordListId) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/export_status/${encodeURIComponent(keywordListId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
