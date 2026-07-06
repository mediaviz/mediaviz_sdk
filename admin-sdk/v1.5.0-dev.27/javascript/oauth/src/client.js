'use strict';

const { generateCodeVerifier, generateCodeChallenge, generateState } = require('./pkce');
const { postForm, postJson } = require('./http');
const { OAuthError } = require('./errors');

// In-flight dedup key for client_credentials re-mints (no refresh_token to key on).
const CLIENT_CREDENTIALS_KEY = Symbol('client_credentials');

class OAuthClient {
  /**
   * @param {import('./types').OAuthClientConfig} config
   */
  constructor(config) {
    this._config = config;
    this._inFlightRefreshes = new Map();
  }

  /**
   * @param {import('./types').ClientRegistrationRequest} params
   * @returns {Promise<import('./types').ClientRegistrationResponse>}
   */
  static async registerClient(params) {
    const baseUrl = params.baseUrl.replace(/\/+$/, '');
    const body = {
      client_name: params.clientName,
      client_type: params.clientType,
      redirect_uris: params.redirectUris,
      is_first_party: params.isFirstParty,
    };
    // grant_types/company_id are required to provision a confidential
    // client_credentials (machine-to-machine) client; omitted bodies keep the
    // legacy public/authorization_code shape. The endpoint is admin-gated, so a
    // bearer token must be supplied for the request to authenticate.
    if (params.grantTypes !== undefined) body.grant_types = params.grantTypes;
    if (params.companyId !== undefined) body.company_id = params.companyId;
    const headers = params.accessToken
      ? { Authorization: `Bearer ${params.accessToken}` }
      : {};
    return postJson(`${baseUrl}/oauth/clients`, body, headers);
  }

  /**
   * @param {string} [state]
   * @returns {import('./types').AuthorizationUrlResult}
   */
  async generateAuthorizationUrl(state) {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const resolvedState = state ?? generateState();

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this._config.clientId,
      redirect_uri: this._config.redirectUri,
      state: resolvedState,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    return {
      url: `${this._config.baseUrl}/oauth/authorize?${params}`,
      state: resolvedState,
      code_verifier: codeVerifier,
    };
  }

  /**
   * @param {string} code
   * @param {string} codeVerifier
   * @param {string} [redirectUri]
   * @returns {Promise<import('./types').TokenResponse>}
   */
  async exchangeCode(code, codeVerifier, redirectUri) {
    return postForm(`${this._config.baseUrl}/oauth/token`, {
      grant_type: 'authorization_code',
      code,
      code_verifier: codeVerifier,
      redirect_uri: redirectUri ?? this._config.redirectUri,
      client_id: this._config.clientId,
      client_secret: this._config.clientSecret,
    });
  }

  /**
   * RFC 6749 §4.4 — machine-to-machine token exchange. No user login.
   * Returned TokenResponse has no refresh_token.
   * @returns {Promise<import('./types').TokenResponse>}
   */
  async getClientCredentialsToken() {
    return postForm(`${this._config.baseUrl}/oauth/token`, {
      grant_type: 'client_credentials',
      client_id: this._config.clientId,
      client_secret: this._config.clientSecret,
    });
  }

  /**
   * @param {string} refreshToken
   * @returns {Promise<import('./types').TokenResponse>}
   */
  async refreshAccessToken(refreshToken) {
    return postForm(`${this._config.baseUrl}/oauth/token`, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: this._config.clientId,
      client_secret: this._config.clientSecret,
    });
  }

  /**
   * @param {string} token
   * @param {string} [tokenTypeHint]
   * @returns {Promise<void>}
   */
  async revokeToken(token, tokenTypeHint) {
    const params = { token, client_id: this._config.clientId, client_secret: this._config.clientSecret };
    if (tokenTypeHint) params.token_type_hint = tokenTypeHint;
    await postForm(`${this._config.baseUrl}/oauth/revoke`, params);
  }

  /**
   * Makes an authenticated request with 401-intercept-and-retry.
   *
   * `onRefreshSuccess` fires synchronously the moment the rotated tokens are received,
   * BEFORE the retry. The server has already deleted the old refresh token by then;
   * if the retry throws, the new tokens would otherwise be lost in this call frame.
   * Long-lived callers MUST persist via this callback — not from the resolved value —
   * to stay in sync with single-use refresh-token rotation (RFC 6749 §6).
   *
   * @param {string} url
   * @param {string} method
   * @param {string} accessToken
   * @param {string} refreshToken
   * @param {object} [body]
   * @param {(newTokens: import('./types').TokenResponse) => void} [onRefreshSuccess]
   * @returns {Promise<import('./types').AuthenticatedResponse>}
   */
  async request(url, method, accessToken, refreshToken, body, onRefreshSuccess) {
    const buildOptions = (token) => {
      const headers = { Authorization: `Bearer ${token}` };
      const options = { method, headers };
      if (body != null) {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
      }
      return options;
    };

    const firstResponse = await fetch(`${this._config.baseUrl}${url}`, buildOptions(accessToken));

    if (firstResponse.status !== 401) {
      const json = await firstResponse.json();
      if (!firstResponse.ok) throw OAuthError.fromResponse(firstResponse.status, json);
      return { data: json, updatedTokens: null };
    }

    // 401: re-authenticate, then retry once.
    // - User sessions (refresh_token present) use the refresh_token grant. The server
    //   rotates the token one-time, so concurrent callers share one in-flight call
    //   (a second rotation would get invalid_grant).
    // - Machine-to-machine sessions (no refresh_token, client_secret configured) re-mint
    //   via client_credentials, which issues no refresh token to rotate (RFC 6749 §4.4).
    // - With neither a refresh_token nor a client_secret there is nothing to retry with.
    if (!refreshToken && !this._config.clientSecret) {
      throw OAuthError.fromResponse(401, await firstResponse.json());
    }

    const reauthKey = refreshToken || CLIENT_CREDENTIALS_KEY;
    let pending = this._inFlightRefreshes.get(reauthKey);
    if (!pending) {
      const reauth = refreshToken
        ? this.refreshAccessToken(refreshToken)
        : this.getClientCredentialsToken();
      pending = reauth.finally(() => {
        this._inFlightRefreshes.delete(reauthKey);
      });
      this._inFlightRefreshes.set(reauthKey, pending);
    }
    const newTokens = await pending;

    if (onRefreshSuccess) onRefreshSuccess(newTokens);

    const retryResponse = await fetch(`${this._config.baseUrl}${url}`, buildOptions(newTokens.access_token));
    const retryJson = await retryResponse.json();
    if (!retryResponse.ok) throw OAuthError.fromResponse(retryResponse.status, retryJson);
    return { data: retryJson, updatedTokens: newTokens };
  }

  /**
   * Decodes a JWT access token payload without verifying the signature.
   * @param {string} accessToken
   * @returns {import('./types').TokenPayload}
   */
  decodeAccessToken(accessToken) {
    const segment = accessToken.split('.')[1];
    if (!segment) throw new OAuthError('invalid_token', 'Malformed JWT', 400);
    const b64 = segment.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(segment.length / 4) * 4, '=');
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const payload = JSON.parse(new TextDecoder().decode(bytes));
    return payload;
  }
}

module.exports = { OAuthClient };
