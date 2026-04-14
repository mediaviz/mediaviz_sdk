import { handleResponse } from './errors.js';

export class Users {
  constructor(ctx) { this._ctx = ctx; }

  async getUser(userId) {
    this._ctx.requireTokens();
    const path = `/api/v1/users/${encodeURIComponent(userId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async createUserAndCompany(body) {
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/users/new_company`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }

  async updateUser(userId, body) {
    this._ctx.requireTokens();
    const path = `/api/v1/users/${encodeURIComponent(userId)}`;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async deleteUser(userId, { newCompanyOwnerId } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/users/delete/${encodeURIComponent(userId)}`;
    const query = new URLSearchParams();
    if (newCompanyOwnerId !== undefined) query.set('new_company_owner_id', newCompanyOwnerId);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async changePassword(body) {
    this._ctx.requireTokens();
    const path = `/api/v1/user/change_password`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async createUser(body) {
    this._ctx.requireTokens();
    const path = `/api/v1/users/`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async getAllUsersByCompany(companyId) {
    this._ctx.requireTokens();
    const path = `/api/v1/users/company/${encodeURIComponent(companyId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
