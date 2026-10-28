import { handleResponse } from './errors.js';

export class Webhookreceiver {
  constructor(ctx) { this._ctx = ctx; }

  async listSubscriptionEvents(subscriptionId, { since, limit, wait, includeHeavy } = {}) {
    this._ctx.requireTokens();
    const baseUrl = this._ctx.requireHost('webhookReceiver');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._ctx.accessToken}`,
    };
    let path = `/api/v1/subscriptions/${encodeURIComponent(subscriptionId)}/events`;
    const query = new URLSearchParams();
    if (since !== undefined) (Array.isArray(since) ? since : [since]).forEach(v => query.append('since', v));
    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
    if (wait !== undefined) (Array.isArray(wait) ? wait : [wait]).forEach(v => query.append('wait', v));
    if (includeHeavy !== undefined) (Array.isArray(includeHeavy) ? includeHeavy : [includeHeavy]).forEach(v => query.append('include_heavy', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const resp = await fetch(baseUrl + path, {
      method: 'GET',
      headers,
    });
    return handleResponse(resp);
  }
}
