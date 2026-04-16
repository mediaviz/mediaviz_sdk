import { handleResponse } from './errors.js';

export class OauthToken {
  constructor(ctx) { this._ctx = ctx; }

  async token({ grantType, code, redirectUri, clientId, codeVerifier, refreshToken, clientSecret }) {
    const resp = await fetch(this._ctx.baseUrl + `/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: grantType, code, redirect_uri: redirectUri, client_id: clientId, code_verifier: codeVerifier, refresh_token: refreshToken, client_secret: clientSecret }).toString(),
    });
    return handleResponse(resp);
  }

  async revoke({ token, tokenTypeHint, clientId }) {
    const resp = await fetch(this._ctx.baseUrl + `/oauth/revoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ token, token_type_hint: tokenTypeHint, client_id: clientId }).toString(),
    });
    return handleResponse(resp);
  }
}
