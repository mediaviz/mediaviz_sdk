export class Admin {
  constructor(ctx) { this._ctx = ctx; }

  async getCategoryLabels(category) {
    this._ctx.requireTokens();
    const path = `/api/v1/admin/category_labels/${encodeURIComponent(category)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getAllKeywordGroupsAndSubgroups() {
    this._ctx.requireTokens();
    const path = `/api/v1/admin/keyword_group`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getKeywordGroupsLabelsByKeywordGroup(keywordGroup, { subgroup } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/admin/keyword_group/${encodeURIComponent(keywordGroup)}/`;
    const query = new URLSearchParams();
    if (subgroup !== undefined) query.set('subgroup', subgroup);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getGoogleSheetsCredentials() {
    this._ctx.requireTokens();
    const path = `/api/v1/admin/get_google_sheets_credentials`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
