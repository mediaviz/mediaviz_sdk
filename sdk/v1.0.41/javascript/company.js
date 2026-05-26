export class Company {
  constructor(ctx) { this._ctx = ctx; }

  async getAllCompanies() {
    this._ctx.requireTokens();
    const path = `/api/v1/company/`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getCompanyById(companyId) {
    this._ctx.requireTokens();
    const path = `/api/v1/company/${encodeURIComponent(companyId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async confirmCompanyCreditBalance(companyId, { photoCount, modelsList } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/company/credit_balance/${encodeURIComponent(companyId)}`;
    const query = new URLSearchParams();
    if (photoCount !== undefined) (Array.isArray(photoCount) ? photoCount : [photoCount]).forEach(v => query.append('photo_count', v));
    if (modelsList !== undefined) (Array.isArray(modelsList) ? modelsList : [modelsList]).forEach(v => query.append('models_list', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async adminListActiveCompanyTokens() {
    this._ctx.requireTokens();
    const path = `/api/v1/company/admin_create/`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async adminCreateCompanyToken({ email } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/company/admin_create/`;
    const query = new URLSearchParams();
    if (email !== undefined) (Array.isArray(email) ? email : [email]).forEach(v => query.append('email', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async adminRevokeCompanyToken(tokenId) {
    this._ctx.requireTokens();
    const path = `/api/v1/company/admin_create/${encodeURIComponent(tokenId)}/revoke/`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
