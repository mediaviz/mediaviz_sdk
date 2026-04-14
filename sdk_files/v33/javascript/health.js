import { handleResponse } from './errors.js';

export class Health {
  constructor(ctx) { this._ctx = ctx; }

  async healthCheck() {
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/health/`, { method: 'GET' });
    return handleResponse(resp);
  }
}
