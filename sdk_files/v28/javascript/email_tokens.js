import { handleResponse } from './errors.js';

export class EmailTokens {
  constructor(ctx) { this._ctx = ctx; }

  async requestPasswordReset(body) {
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/request-password-reset`, {
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
}
