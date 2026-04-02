'use strict';

const { generateCodeVerifier, generateCodeChallenge, generateState } = require('./pkce');
const { postForm } = require('./http');
const { OAuthError } = require('./errors');

class OAuthClient {
  /**
   * @param {import('./types').OAuthClientConfig} config
   */
  constructor(config) {
    this._config = config;
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
   * @param {string} url
   * @param {string} method
   * @param {string} accessToken
   * @param {string} refreshToken
   * @param {object} [body]
   * @returns {Promise<import('./types').AuthenticatedResponse>}
   */
  async request(url, method, accessToken, refreshToken, body) {
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

    // 401: attempt refresh — propagate OAuthError if refresh fails
    const newTokens = await this.refreshAccessToken(refreshToken);

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
    const payload = JSON.parse(Buffer.from(segment, 'base64url').toString('utf8'));
    return payload;
  }
}

module.exports = { OAuthClient };
