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
}
