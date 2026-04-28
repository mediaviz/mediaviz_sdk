import { handleResponse } from './errors.js';

export class OauthAuthorization {
  constructor(ctx) { this._ctx = ctx; }

  async authorize({ responseType, clientId, redirectUri, state, codeChallenge, codeChallengeMethod } = {}) {
    let path = `/oauth/authorize`;
    const query = new URLSearchParams();
    if (responseType !== undefined) (Array.isArray(responseType) ? responseType : [responseType]).forEach(v => query.append('response_type', v));
    if (clientId !== undefined) (Array.isArray(clientId) ? clientId : [clientId]).forEach(v => query.append('client_id', v));
    if (redirectUri !== undefined) (Array.isArray(redirectUri) ? redirectUri : [redirectUri]).forEach(v => query.append('redirect_uri', v));
    if (state !== undefined) (Array.isArray(state) ? state : [state]).forEach(v => query.append('state', v));
    if (codeChallenge !== undefined) (Array.isArray(codeChallenge) ? codeChallenge : [codeChallenge]).forEach(v => query.append('code_challenge', v));
    if (codeChallengeMethod !== undefined) (Array.isArray(codeChallengeMethod) ? codeChallengeMethod : [codeChallengeMethod]).forEach(v => query.append('code_challenge_method', v));
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
