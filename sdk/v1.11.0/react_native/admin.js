function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class Admin {
  constructor(ctx) { this._ctx = ctx; }

  async getCategoryLabels(category) {
    this._ctx.requireTokens();
    const path = `/api/v1/admin/category_labels/${encodeURIComponent(category)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async adminSetCompanyCanManageApiClients(companyId, canManageApiClients) {
    this._ctx.requireTokens();
    const path = `/api/v1/admin/companies/${encodeURIComponent(companyId)}/can_manage_api_clients`;
    const body = stripUndef({
      can_manage_api_clients: canManageApiClients,
    });
    const { data } = await this._ctx.client.request(path, 'PATCH', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }
}
