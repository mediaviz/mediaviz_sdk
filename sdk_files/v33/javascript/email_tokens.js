import { handleResponse } from './errors.js';

export class EmailTokens {
  constructor(ctx) { this._ctx = ctx; }

  async requestEmailVerification(body) {
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/request-email-verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }

  async verifyEmail(token) {
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/verify-email/${encodeURIComponent(token)}`, { method: 'POST' });
    return handleResponse(resp);
  }

  async requestPasswordReset(body) {
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/request-password-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }

  async validateToken(body) {
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/validate-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }

  async resetPassword(body) {
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }

  async deleteUserEmailTokens(userId) {
    this._ctx.requireTokens();
    const path = `/api/v1/admin/email_tokens/by_user/${encodeURIComponent(userId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
