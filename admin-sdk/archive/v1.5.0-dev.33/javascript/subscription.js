function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class Subscription {
  constructor(ctx) { this._ctx = ctx; }

  async createSubscription(projectTableName, callbackUrl, targets) {
    this._ctx.requireTokens();
    const path = `/api/v1/subscriptions`;
    const body = stripUndef({
      project_table_name: projectTableName,
      callback_url: callbackUrl,
      targets: targets,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async verifySubscription(subscriptionId) {
    this._ctx.requireTokens();
    const path = `/api/v1/subscriptions/${encodeURIComponent(subscriptionId)}/verify`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async listSubscriptions() {
    this._ctx.requireTokens();
    const path = `/api/v1/subscriptions`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async listSubscriptionEvents(subscriptionId, { since, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/subscriptions/${encodeURIComponent(subscriptionId)}/events`;
    const query = new URLSearchParams();
    if (since !== undefined) (Array.isArray(since) ? since : [since]).forEach(v => query.append('since', v));
    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updateSubscription(subscriptionId, { callbackUrl, targets } = {}) {
    this._ctx.requireTokens();
    const path = `/api/v1/subscriptions/${encodeURIComponent(subscriptionId)}`;
    const body = stripUndef({
      callback_url: callbackUrl,
      targets: targets,
    });
    const { data } = await this._ctx.client.request(path, 'PATCH', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async deleteSubscription(subscriptionId) {
    this._ctx.requireTokens();
    const path = `/api/v1/subscriptions/${encodeURIComponent(subscriptionId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async rotateSubscriptionSecret(subscriptionId) {
    this._ctx.requireTokens();
    const path = `/api/v1/subscriptions/${encodeURIComponent(subscriptionId)}/rotate_secret`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
