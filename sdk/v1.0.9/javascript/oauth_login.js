import { handleResponse } from './errors.js';

export class OauthLogin {
  constructor(ctx) { this._ctx = ctx; }

  async getLogin({ next } = {}) {
    let path = `/api/v1/oauth/login`;
    const query = new URLSearchParams();
    if (next !== undefined) query.set('next', next);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const resp = await fetch(this._ctx.baseUrl + path, { method: 'GET' });
    return handleResponse(resp);
  }

  async postLogin({ email, password, next }) {
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/oauth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email, password, next }).toString(),
    });
    return handleResponse(resp);
  }
}
