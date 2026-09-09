import { handleResponse } from './errors.js';

function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class Users {
  constructor(ctx) { this._ctx = ctx; }

  async createUser(name, email, accountType, companyId = undefined, profilePicture = undefined, paymentPlanType = undefined) {
    this._ctx.requireTokens();
    const path = `/api/v1/users/`;
    const body = stripUndef({
      name: name,
      email: email,
      company_id: companyId,
      profile_picture: profilePicture,
      payment_plan_type: paymentPlanType,
      account_type: accountType,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async createUserAndCompany(name, email, password, companyId = undefined, profilePicture = undefined, paymentPlanType = undefined, companyName = undefined, credits = undefined, { inviteToken } = {}) {
    let path = `/api/v1/users/new_company/`;
    const query = new URLSearchParams();
    if (inviteToken !== undefined) (Array.isArray(inviteToken) ? inviteToken : [inviteToken]).forEach(v => query.append('invite_token', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const body = stripUndef({
      name: name,
      email: email,
      company_id: companyId,
      profile_picture: profilePicture,
      payment_plan_type: paymentPlanType,
      password: password,
      company_name: companyName,
      credits: credits,
    });
    const resp = await fetch(this._ctx.baseUrl + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }

  async changePassword(oldPassword, newPassword) {
    this._ctx.requireTokens();
    const path = `/api/v1/user/change_password`;
    const body = stripUndef({
      old_password: oldPassword,
      new_password: newPassword,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async getUserId() {
    this._ctx.requireTokens();
    const path = `/api/v1/users`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getUser(userId) {
    this._ctx.requireTokens();
    const path = `/api/v1/users/${encodeURIComponent(userId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getAllUsersByCompany(companyId) {
    this._ctx.requireTokens();
    const path = `/api/v1/users/company/${encodeURIComponent(companyId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updateUser(userId, { name, email, password, companyId, accountType, profilePicture, location, phoneNumber, birthday } = {}) {
    this._ctx.requireTokens();
    const path = `/api/v1/users/${encodeURIComponent(userId)}`;
    const body = stripUndef({
      name: name,
      email: email,
      password: password,
      company_id: companyId,
      account_type: accountType,
      profile_picture: profilePicture,
      location: location,
      phone_number: phoneNumber,
      birthday: birthday,
    });
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async deleteUser(userId, { newCompanyOwnerId } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/users/delete/${encodeURIComponent(userId)}`;
    const query = new URLSearchParams();
    if (newCompanyOwnerId !== undefined) (Array.isArray(newCompanyOwnerId) ? newCompanyOwnerId : [newCompanyOwnerId]).forEach(v => query.append('new_company_owner_id', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
