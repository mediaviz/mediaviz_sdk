import { handleResponse } from './errors.js';

export class Users {
  constructor(ctx) { this._ctx = ctx; }

  async createUserAndCompany(body) {
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/users/new_company`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }
}
