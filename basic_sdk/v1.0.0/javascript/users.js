import { handleResponse } from './errors.js';

function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class Users {
  constructor(ctx) { this._ctx = ctx; }

  async createUserAndCompany(name, credits = undefined, paymentPlanType = undefined) {
    const body = stripUndef({
      name: name,
      credits: credits,
      payment_plan_type: paymentPlanType,
    });
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/users/new_company`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }
}
