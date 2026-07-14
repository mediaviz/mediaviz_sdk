export class Admin {
  constructor(ctx) { this._ctx = ctx; }

  async getCategoryLabels(category) {
    this._ctx.requireTokens();
    const path = `/api/v1/admin/category_labels/${encodeURIComponent(category)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
