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
      account_type: accountType,
      profile_picture: profilePicture,
      payment_plan_type: paymentPlanType,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async createMediavizInternalAdmin(name, email, accountType, password, companyId = undefined, profilePicture = undefined, paymentPlanType = undefined) {
    const body = stripUndef({
      name: name,
      email: email,
      company_id: companyId,
      account_type: accountType,
      profile_picture: profilePicture,
      payment_plan_type: paymentPlanType,
      password: password,
    });
    const resp = await fetch(this._ctx.baseUrl + `/api/v1/users/new_internal_admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }

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

  async changePassword(oldPassword, newPassword) {
    this._ctx.requireTokens();
    const path = `/api/v1/user/change_password`;
    const body = stripUndef({
      old_password: oldPassword,
      new_password: newPassword,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
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

  async getAllUsers(ascOrDesc, { lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/users/admin/sort/${encodeURIComponent(ascOrDesc)}/`;
    const query = new URLSearchParams();
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updateUser(userId, name = undefined, email = undefined, password = undefined, companyId = undefined, accountType = undefined, profilePicture = undefined, location = undefined, phoneNumber = undefined, birthday = undefined) {
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
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async updateUserByAdmin(userId, name = undefined, email = undefined, password = undefined, companyId = undefined, accountType = undefined, profilePicture = undefined, location = undefined, phoneNumber = undefined, birthday = undefined) {
    this._ctx.requireTokens();
    const path = `/api/v1/users/admin/${encodeURIComponent(userId)}`;
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
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async deleteUser(userId, { newCompanyOwnerId } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/users/delete/${encodeURIComponent(userId)}`;
    const query = new URLSearchParams();
    if (newCompanyOwnerId !== undefined) query.set('new_company_owner_id', newCompanyOwnerId);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
