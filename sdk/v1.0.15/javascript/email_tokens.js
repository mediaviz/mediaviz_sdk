import { handleResponse } from './errors.js';

function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class EmailTokens {
  constructor(ctx) { this._ctx = ctx; }

  async requestEmailVerification({ email } = {}) {
    let path = `/api/v1/request-email-verification`;
    const query = new URLSearchParams();
    if (email !== undefined) query.set('email', email);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const resp = await fetch(this._ctx.baseUrl + path, { method: 'POST' });
    return handleResponse(resp);
  }

  async verifyEmail(token) {
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/verify-email/${encodeURIComponent(token)}`, { method: 'POST' });
    return handleResponse(resp);
  }

  async requestPasswordReset({ email } = {}) {
    let path = `/api/v1/request-password-reset`;
    const query = new URLSearchParams();
    if (email !== undefined) query.set('email', email);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const resp = await fetch(this._ctx.baseUrl + path, { method: 'POST' });
    return handleResponse(resp);
  }

  async validateToken(token) {
    const body = stripUndef({
      token: token,
    });
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/validate-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }

  async resetPassword(token, newPassword) {
    const body = stripUndef({
      token: token,
      new_password: newPassword,
    });
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
