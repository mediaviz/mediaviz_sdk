import { handleResponse } from './errors.js';

export class Authentication {
  constructor(ctx) { this._ctx = ctx; }

  async createToken({ username, password }) {
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username,
        password
      }).toString(),
    });
    return handleResponse(resp);
  }

  async createRequestPasswordReset({ email } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/request-password-reset`;
    const query = new URLSearchParams();
    if (email !== undefined) query.set('email', email);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async createResetPassword({ token, newPassword }) {
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        new_password: newPassword
      }),
    });
    return handleResponse(resp);
  }

  async refreshToken() {
    this._ctx.requireTokens();
    const path = `/api/v1/token/refresh`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async createLogout() {
    this._ctx.requireTokens();
    const path = `/api/v1/logout`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async deleteAdminRevokeUserTokens(userId) {
    this._ctx.requireTokens();
    const path = `/api/v1/admin/users/${encodeURIComponent(userId)}/revoke-tokens`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getShareauthPhp() {
    const resp = await fetch(this._ctx.baseUrl + `/shareAuth.php`, { method: 'GET' });
    return handleResponse(resp);
  }
}
