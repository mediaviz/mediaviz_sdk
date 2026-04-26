import { handleResponse } from './errors.js';

export class OauthAuthorization {
  constructor(ctx) { this._ctx = ctx; }

  async authorize({ responseType, clientId, redirectUri, state, codeChallenge, codeChallengeMethod } = {}) {
    let path = `/oauth/authorize`;
    const query = new URLSearchParams();
    if (responseType !== undefined) query.set('response_type', responseType);
    if (clientId !== undefined) query.set('client_id', clientId);
    if (redirectUri !== undefined) query.set('redirect_uri', redirectUri);
    if (state !== undefined) query.set('state', state);
    if (codeChallenge !== undefined) query.set('code_challenge', codeChallenge);
    if (codeChallengeMethod !== undefined) query.set('code_challenge_method', codeChallengeMethod);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const resp = await fetch(this._ctx.baseUrl + path, { method: 'GET' });
    return handleResponse(resp);
  }

  async getConsent(sessionId) {
    const resp = await fetch(this._ctx.baseUrl + `/oauth/consent/${encodeURIComponent(sessionId)}`, { method: 'GET' });
    return handleResponse(resp);
  }

  async postApproveConsent(sessionId) {
    const resp = await fetch(this._ctx.baseUrl + `/oauth/consent/${encodeURIComponent(sessionId)}/approve`, { method: 'POST' });
    return handleResponse(resp);
  }

  async postDenyConsent(sessionId) {
    const resp = await fetch(this._ctx.baseUrl + `/oauth/consent/${encodeURIComponent(sessionId)}/deny`, { method: 'POST' });
    return handleResponse(resp);
  }
}
