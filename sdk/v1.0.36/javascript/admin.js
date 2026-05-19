export class Admin {
  constructor(ctx) { this._ctx = ctx; }

  async insertLabelCategoryMatrix() {
    this._ctx.requireTokens();
    const path = `/api/v1/admin/insert_label_category_matrix`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async generateMidLevelCategoryKeywordAlignment() {
    this._ctx.requireTokens();
    const path = `/api/v1/admin/generate_mid_level_category_keyword_alignment`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

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
    if (subgroup !== undefined) (Array.isArray(subgroup) ? subgroup : [subgroup]).forEach(v => query.append('subgroup', v));
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

  async adminDeleteUserProjects({ userIds } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/admin/delete_user_projects/`;
    const query = new URLSearchParams();
    if (userIds !== undefined) (Array.isArray(userIds) ? userIds : [userIds]).forEach(v => query.append('user_ids', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async adminDeleteUser({ userIds } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/admin/delete_user/`;
    const query = new URLSearchParams();
    if (userIds !== undefined) (Array.isArray(userIds) ? userIds : [userIds]).forEach(v => query.append('user_ids', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
