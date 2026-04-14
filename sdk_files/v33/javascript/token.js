import { handleResponse } from './errors.js';

export class Token {
  constructor(ctx) { this._ctx = ctx; }

  async getAccessTokenLogin({ username, password }) {
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

  async getAccessTokenRefresh() {
    this._ctx.requireTokens();
    const path = `/api/v1/token/refresh`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async invalidateTokenLogout() {
    this._ctx.requireTokens();
    const path = `/api/v1/logout`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async deleteTokensRevokeUser(userId) {
    this._ctx.requireTokens();
    const path = `/api/v1/admin/users/${encodeURIComponent(userId)}/revoke-tokens`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
