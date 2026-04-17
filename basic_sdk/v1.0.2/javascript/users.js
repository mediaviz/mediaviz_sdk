import { handleResponse } from './errors.js';

function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class Users {
  constructor(ctx) { this._ctx = ctx; }

  async createUserAndCompany(name, email, accountType, password, companyId = undefined, profilePicture = undefined, paymentPlanType = undefined, companyName = undefined, credits = undefined) {
    const body = stripUndef({
      name: name,
      email: email,
      company_id: companyId,
      account_type: accountType,
      profile_picture: profilePicture,
      payment_plan_type: paymentPlanType,
      password: password,
      company_name: companyName,
      credits: credits,
    });
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/users/new_company`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }
}
