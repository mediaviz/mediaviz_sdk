function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class Keywords {
  constructor(ctx) { this._ctx = ctx; }

  async createKeywordFilteringList(name, projectList = undefined) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/`;
    const body = stripUndef({
      name: name,
      project_list: projectList,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async getUserKeywordFilteringLists() {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/user`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getKeywordFilteringListAndProjectsById(keywordListId) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getKeywordFilteringListById(keywordListId) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/list/${encodeURIComponent(keywordListId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getExistingKeywordFilteringListByProject(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/project/${encodeURIComponent(projectTableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getDefaultKeywordFilteringListByProject(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/project/${encodeURIComponent(projectTableName)}/default`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updateKeywordFilteringListLabels(keywordListId, listKeywordsToInclude, listKeywordsToExclude) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
    const body = stripUndef({
      list_keywords_to_include: listKeywordsToInclude,
      list_keywords_to_exclude: listKeywordsToExclude,
    });
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async updateKeywordFilteringListDetails(keywordListId, name = undefined, projectList = undefined) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/details/${encodeURIComponent(keywordListId)}`;
    const body = stripUndef({
      name: name,
      project_list: projectList,
    });
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async addProjectToKeywordFilteringList(keywordListId, { projectIds } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/projects`;
    const query = new URLSearchParams();
    if (projectIds !== undefined) (Array.isArray(projectIds) ? projectIds : [projectIds]).forEach(v => query.append('project_ids', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
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

  async getKeywordsAndIds() {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/all_keywords/id/label`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async removeProjectsFromKeywordFilteringList(keywordListId, { projectIds } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/projects`;
    const query = new URLSearchParams();
    if (projectIds !== undefined) (Array.isArray(projectIds) ? projectIds : [projectIds]).forEach(v => query.append('project_ids', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async deleteKeywordFilteringListById(keywordListId) {
    this._ctx.requireTokens();
    const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
