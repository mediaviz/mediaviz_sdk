(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MediaVizSdk = {}));
})(this, (function (exports) { 'use strict';

  // Auto-generated — do not edit

  class ApiError extends Error {
    constructor(message, status, requestId, body) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.requestId = requestId;
      this.body = body;
    }
  }

  class ValidationError extends ApiError {
    constructor(body, status, requestId) {
      const detail = body.detail ?? [];
      const message = Array.isArray(detail)
        ? detail.map(d => `${d.loc.join('.')}: ${d.msg}`).join('; ')
        : String(detail);
      super(message, status, requestId, body);
      this.name = 'ValidationError';
      this.fieldErrors = Array.isArray(detail)
        ? detail.map(d => ({ loc: d.loc, msg: d.msg, type: d.type }))
        : [];
    }
  }

  class NotFoundError extends ApiError {
    constructor(body, status, requestId) {
      super(body.detail ?? 'Resource not found', status, requestId, body);
      this.name = 'NotFoundError';
    }
  }

  class RateLimitError extends ApiError {
    constructor(body, status, requestId, headers) {
      super(body.detail ?? 'Rate limited', status, requestId, body);
      this.name = 'RateLimitError';
      this.retryAfter = parseInt(headers.get('retry-after') ?? '', 10) || null;
    }
  }

  class ServerError extends ApiError {
    constructor(body, status, requestId) {
      super(body.detail ?? 'Internal server error', status, requestId, body);
      this.name = 'ServerError';
    }
  }

  async function handleResponse(response) {
    const requestId = response.headers.get('x-request-id');

    if (response.ok) {
      return response.status === 204 ? null : response.json();
    }

    let body;
    try {
      body = await response.json();
    } catch {
      body = { detail: response.statusText };
    }

    switch (response.status) {
      case 422:
        throw new ValidationError(body, response.status, requestId);
      case 404:
        throw new NotFoundError(body, response.status, requestId);
      case 429:
        throw new RateLimitError(body, response.status, requestId, response.headers);
      default:
        if (response.status >= 500) {
          throw new ServerError(body, response.status, requestId);
        }
        throw new ApiError(
          body.detail ?? 'Unknown error',
          response.status,
          requestId,
          body
        );
    }
  }

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var pkce;
  var hasRequiredPkce;

  function requirePkce () {
  	if (hasRequiredPkce) return pkce;
  	hasRequiredPkce = 1;

  	// base64url-encode a Uint8Array without padding
  	function base64urlEncode(bytes) {
  	  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  	  let result = '';
  	  for (let i = 0; i < bytes.length; i += 3) {
  	    const b0 = bytes[i];
  	    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
  	    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
  	    result += chars[b0 >> 2];
  	    result += chars[((b0 & 3) << 4) | (b1 >> 4)];
  	    if (i + 1 < bytes.length) result += chars[((b1 & 0xf) << 2) | (b2 >> 6)];
  	    if (i + 2 < bytes.length) result += chars[b2 & 0x3f];
  	  }
  	  return result;
  	}

  	/**
  	 * Generates a 64-character PKCE code verifier from [A-Za-z0-9-._~].
  	 * @returns {string}
  	 */
  	function generateCodeVerifier() {
  	  const bytes = new Uint8Array(48);
  	  globalThis.crypto.getRandomValues(bytes);
  	  return base64urlEncode(bytes).slice(0, 64);
  	}

  	/**
  	 * Computes Base64URL(SHA256(verifier)) with no padding.
  	 * @param {string} verifier
  	 * @returns {Promise<string>}
  	 */
  	async function generateCodeChallenge(verifier) {
  	  const encoded = new TextEncoder().encode(verifier);
  	  const hashBuf = await globalThis.crypto.subtle.digest('SHA-256', encoded);
  	  return base64urlEncode(new Uint8Array(hashBuf));
  	}

  	/**
  	 * Generates a cryptographically random 32-char hex state value.
  	 * @returns {string}
  	 */
  	function generateState() {
  	  const bytes = new Uint8Array(16);
  	  globalThis.crypto.getRandomValues(bytes);
  	  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  	}

  	pkce = { generateCodeVerifier, generateCodeChallenge, generateState };
  	return pkce;
  }

  var errors;
  var hasRequiredErrors;

  function requireErrors () {
  	if (hasRequiredErrors) return errors;
  	hasRequiredErrors = 1;

  	class OAuthError extends Error {
  	  /**
  	   * @param {string} code - RFC 6749 error code
  	   * @param {string} description - Human-readable description
  	   * @param {number} httpStatus - HTTP status code
  	   */
  	  constructor(code, description, httpStatus) {
  	    super(description);
  	    this.name = 'OAuthError';
  	    this.code = code;
  	    this.description = description;
  	    this.httpStatus = httpStatus;
  	  }

  	  /**
  	   * @param {number} status
  	   * @param {unknown} body
  	   * @returns {OAuthError}
  	   */
  	  static fromResponse(status, body) {
  	    if (body && typeof body === 'object' && typeof body.error === 'string') {
  	      return new OAuthError(body.error, body.error_description ?? '', status);
  	    }
  	    return new OAuthError('server_error', 'Unexpected server response', status);
  	  }
  	}

  	errors = { OAuthError };
  	return errors;
  }

  var http;
  var hasRequiredHttp;

  function requireHttp () {
  	if (hasRequiredHttp) return http;
  	hasRequiredHttp = 1;

  	const { OAuthError } = requireErrors();

  	/**
  	 * @param {string} url
  	 * @param {Record<string, string>} params
  	 * @param {Record<string, string>} [headers]
  	 * @returns {Promise<unknown>}
  	 */
  	async function postForm(url, params, headers = {}) {
  	  const body = new URLSearchParams(params).toString();
  	  const response = await fetch(url, {
  	    method: 'POST',
  	    headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...headers },
  	    body,
  	  });
  	  const json = await response.json();
  	  if (!response.ok) throw OAuthError.fromResponse(response.status, json);
  	  return json;
  	}

  	/**
  	 * @param {string} url
  	 * @param {Record<string, string>} [headers]
  	 * @returns {Promise<unknown>}
  	 */
  	async function getJson(url, headers = {}) {
  	  const response = await fetch(url, { headers });
  	  const json = await response.json();
  	  if (!response.ok) throw OAuthError.fromResponse(response.status, json);
  	  return json;
  	}

  	/**
  	 * @param {string} url
  	 * @param {object} body
  	 * @param {Record<string, string>} [headers]
  	 * @returns {Promise<unknown>}
  	 */
  	async function postJson(url, body, headers = {}) {
  	  const response = await fetch(url, {
  	    method: 'POST',
  	    headers: { 'Content-Type': 'application/json', ...headers },
  	    body: JSON.stringify(body),
  	  });
  	  const json = await response.json();
  	  if (!response.ok) throw OAuthError.fromResponse(response.status, json);
  	  return json;
  	}

  	http = { postForm, getJson, postJson };
  	return http;
  }

  var client;
  var hasRequiredClient;

  function requireClient () {
  	if (hasRequiredClient) return client;
  	hasRequiredClient = 1;

  	const { generateCodeVerifier, generateCodeChallenge, generateState } = requirePkce();
  	const { postForm, postJson } = requireHttp();
  	const { OAuthError } = requireErrors();

  	class OAuthClient {
  	  /**
  	   * @param {import('./types').OAuthClientConfig} config
  	   */
  	  constructor(config) {
  	    this._config = config;
  	  }

  	  /**
  	   * @param {import('./types').ClientRegistrationRequest} params
  	   * @returns {Promise<import('./types').ClientRegistrationResponse>}
  	   */
  	  static async registerClient(params) {
  	    const baseUrl = params.baseUrl.replace(/\/+$/, '');
  	    return postJson(`${baseUrl}/oauth/clients`, {
  	      client_name: params.clientName,
  	      client_type: params.clientType,
  	      redirect_uris: params.redirectUris,
  	      is_first_party: params.isFirstParty,
  	    });
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

  	client = { OAuthClient };
  	return client;
  }

  /**
   * @typedef {Object} OAuthClientConfig
   * @property {string} baseUrl - Base URL of the OAuth server
   * @property {string} clientId - Registered client_id
   * @property {string} clientSecret - Registered client_secret
   * @property {string} redirectUri - Registered redirect URI
   */

  var types;
  var hasRequiredTypes;

  function requireTypes () {
  	if (hasRequiredTypes) return types;
  	hasRequiredTypes = 1;
  	/**
  	 * @typedef {Object} TokenResponse
  	 * @property {string} access_token - Signed JWT access token
  	 * @property {string} token_type - Always "bearer"
  	 * @property {number} expires_in - Seconds until access token expires
  	 * @property {string} refresh_token - Opaque refresh token
  	 */

  	/**
  	 * @typedef {Object} TokenPayload
  	 * @property {string} user_id - ID of the authenticated user
  	 * @property {string} client_id - ID of the OAuth client
  	 * @property {string} jti - Unique token ID
  	 * @property {number} iat - Issued-at timestamp (Unix seconds)
  	 * @property {number} exp - Expiry timestamp (Unix seconds)
  	 */

  	/**
  	 * @typedef {Object} AuthorizationUrlResult
  	 * @property {string} url - Full authorization URL
  	 * @property {string} state - CSRF state value; persist between redirect and callback
  	 * @property {string} code_verifier - PKCE verifier; persist between redirect and callback
  	 */

  	/**
  	 * @typedef {Object} AuthenticatedResponse
  	 * @property {Object} data - Parsed JSON response body from resource server
  	 * @property {TokenResponse|null} updatedTokens - Non-null only when token refresh occurred
  	 */

  	/**
  	 * @typedef {Object} ClientRegistrationRequest
  	 * @property {string} baseUrl - Base URL of the OAuth server
  	 * @property {string} clientName - Human-readable client name
  	 * @property {string} clientType - "public" or "confidential"
  	 * @property {string[]} redirectUris - HTTPS redirect URIs
  	 * @property {boolean} isFirstParty - Whether this is a first-party client
  	 */

  	/**
  	 * @typedef {Object} ClientRegistrationResponse
  	 * @property {string} client_id - Assigned client ID
  	 * @property {string} client_name - Registered client name
  	 * @property {string} client_type - "public" or "confidential"
  	 * @property {string[]} redirect_uris - Registered redirect URIs
  	 * @property {string} [client_secret] - Only present for confidential clients
  	 */

  	const OAuthErrorCode = Object.freeze({
  	  INVALID_REQUEST: 'invalid_request',
  	  INVALID_CLIENT: 'invalid_client',
  	  INVALID_GRANT: 'invalid_grant',
  	  UNAUTHORIZED_CLIENT: 'unauthorized_client',
  	  UNSUPPORTED_GRANT_TYPE: 'unsupported_grant_type',
  	  ACCESS_DENIED: 'access_denied',
  	  SERVER_ERROR: 'server_error',
  	});

  	types = { OAuthErrorCode };
  	return types;
  }

  var src;
  var hasRequiredSrc;

  function requireSrc () {
  	if (hasRequiredSrc) return src;
  	hasRequiredSrc = 1;

  	const { OAuthClient } = requireClient();
  	const { OAuthError } = requireErrors();
  	const { OAuthErrorCode } = requireTypes();

  	src = { OAuthClient, OAuthError, OAuthErrorCode };
  	return src;
  }

  var srcExports = requireSrc();
  var _oauth = /*@__PURE__*/getDefaultExportFromCjs(srcExports);

  // Auto-generated — do not edit
  const { OAuthClient, OAuthError, OAuthErrorCode } = _oauth;

  async function getCategoryLabels(client, accessToken, refreshToken, category) {
    const path = `/api/v1/admin/category_labels/${encodeURIComponent(category)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getAllKeywordGroupsAndSubgroups(client, accessToken, refreshToken) {
    const path = `/api/v1/admin/keyword_group`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getKeywordGroupsLabelsByKeywordGroup(client, accessToken, refreshToken, keywordGroup, { subgroup } = {}) {
    let path = `/api/v1/admin/keyword_group/${encodeURIComponent(keywordGroup)}/`;
    const query = new URLSearchParams();
    if (subgroup !== undefined) query.set('subgroup', subgroup);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getGoogleSheetsCredentials(client, accessToken, refreshToken) {
    const path = `/api/v1/admin/get_google_sheets_credentials`;
    const { data } = await client.request(path, 'POST', accessToken, refreshToken);
    return data;
  }

  async function getAllProjectCuratedAlbums(client, accessToken, refreshToken, projectTableName) {
    const path = `/api/v1/curated_album/project/${encodeURIComponent(projectTableName)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getCuratedAlbumPhotos(client, accessToken, refreshToken, albumId, { ascOrDesc, lastId, limit, confidenceValue } = {}) {
    let path = `/api/v1/curated_album/photos/${encodeURIComponent(albumId)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    if (confidenceValue !== undefined) query.set('confidence_value', confidenceValue);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getCuratedAlbumPhotosRanked(client, accessToken, refreshToken, albumId, { ascOrDesc, lastId, limit, confidenceValue } = {}) {
    let path = `/api/v1/curated_album/photos/ranked/${encodeURIComponent(albumId)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    if (confidenceValue !== undefined) query.set('confidence_value', confidenceValue);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function createProjectCustomAlbum(client, accessToken, refreshToken, projectTableName, body) {
    const path = `/api/v1/custom_album/project/${encodeURIComponent(projectTableName)}`;
    const { data } = await client.request(path, 'POST', accessToken, refreshToken, JSON.stringify(body));
    return data;
  }

  async function getAllProjectCustomAlbums(client, accessToken, refreshToken, projectTableName) {
    const path = `/api/v1/custom_album/project/${encodeURIComponent(projectTableName)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getCustomAlbumDetailById(client, accessToken, refreshToken, customAlbumId) {
    const path = `/api/v1/custom_album/${encodeURIComponent(customAlbumId)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function deleteCustomAlbum(client, accessToken, refreshToken, albumId) {
    const path = `/api/v1/custom_album/${encodeURIComponent(albumId)}`;
    const { data } = await client.request(path, 'DELETE', accessToken, refreshToken);
    return data;
  }

  async function updateCustomAlbum(client, accessToken, refreshToken, albumId, body) {
    const path = `/api/v1/custom_album/${encodeURIComponent(albumId)}`;
    const { data } = await client.request(path, 'PUT', accessToken, refreshToken, JSON.stringify(body));
    return data;
  }

  async function getCustomAlbumPhotosById(client, accessToken, refreshToken, customAlbumId, { ascOrDesc, lastId, limit } = {}) {
    let path = `/api/v1/custom_album/photos/${encodeURIComponent(customAlbumId)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getTopMiddleBottomCustomAlbumById(client, accessToken, refreshToken, customAlbumId, { ascOrDesc, lastId, limit } = {}) {
    let path = `/api/v1/custom_album/photos/ranked/${encodeURIComponent(customAlbumId)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function requestPasswordReset(baseUrl, body) {
    const resp = await fetch(baseUrl + `/api/v1/request-password-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }

  async function resetPassword(baseUrl, body) {
    const resp = await fetch(baseUrl + `/api/v1/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }

  async function getUserKeywordFilteringLists(client, accessToken, refreshToken) {
    const path = `/api/v1/keyword/user`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function createKeywordFilteringList(client, accessToken, refreshToken, body) {
    const path = `/api/v1/keyword/`;
    const { data } = await client.request(path, 'POST', accessToken, refreshToken, JSON.stringify(body));
    return data;
  }

  async function getKeywordFilteringListById(client, accessToken, refreshToken, keywordListId) {
    const path = `/api/v1/keyword/list/${encodeURIComponent(keywordListId)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getDefaultKeywordFilteringListByProject(client, accessToken, refreshToken, projectTableName) {
    const path = `/api/v1/keyword/project/${encodeURIComponent(projectTableName)}/default`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getExistingKeywordFilteringListByProject(client, accessToken, refreshToken, projectTableName) {
    const path = `/api/v1/keyword/project/${encodeURIComponent(projectTableName)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getKeywordsAndIds(client, accessToken, refreshToken) {
    const path = `/api/v1/keyword/all_keywords/id/label`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function updateKeywordFilteringListLabels(client, accessToken, refreshToken, keywordListId, body) {
    const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
    const { data } = await client.request(path, 'PUT', accessToken, refreshToken, JSON.stringify(body));
    return data;
  }

  async function updateKeywordFilteringListDetails(client, accessToken, refreshToken, keywordListId, body) {
    const path = `/api/v1/keyword/details/${encodeURIComponent(keywordListId)}`;
    const { data } = await client.request(path, 'PUT', accessToken, refreshToken, JSON.stringify(body));
    return data;
  }

  async function addProjectToKeywordFilteringList(client, accessToken, refreshToken, keywordListId, { projectIds } = {}) {
    let path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/projects`;
    const query = new URLSearchParams();
    if (projectIds !== undefined) query.set('project_ids', projectIds);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'POST', accessToken, refreshToken);
    return data;
  }

  async function getKeywordFilteringListAndProjectsById(client, accessToken, refreshToken, keywordListId) {
    const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function removeProjectsFromKeywordFilteringList(client, accessToken, refreshToken, keywordListId, { projectIds } = {}) {
    let path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/projects`;
    const query = new URLSearchParams();
    if (projectIds !== undefined) query.set('project_ids', projectIds);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'DELETE', accessToken, refreshToken);
    return data;
  }

  async function deleteKeywordFilteringListById(client, accessToken, refreshToken, keywordListId) {
    const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
    const { data } = await client.request(path, 'DELETE', accessToken, refreshToken);
    return data;
  }

  async function requestKeywordListExport(client, accessToken, refreshToken, keywordListId) {
    const path = `/api/v1/keyword/export/${encodeURIComponent(keywordListId)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function requestKeywordListExportStatus(client, accessToken, refreshToken, keywordListId) {
    const path = `/api/v1/keyword/export_status/${encodeURIComponent(keywordListId)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getAllPersonsFromPhoto(client, accessToken, refreshToken, projectTableName, photoId) {
    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/photo/${encodeURIComponent(photoId)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function updatePerson(client, accessToken, refreshToken, projectTableName, personId, { personName } = {}) {
    let path = `/api/v1/person/${encodeURIComponent(projectTableName)}/${encodeURIComponent(personId)}`;
    const query = new URLSearchParams();
    if (personName !== undefined) query.set('person_name', personName);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'PUT', accessToken, refreshToken);
    return data;
  }

  async function getAllPersonsFromProject(client, accessToken, refreshToken, projectTableName) {
    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getAllProjectPhotoIds(client, accessToken, refreshToken, tableName, { ascOrDesc, lastId, limit } = {}) {
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getPhotoFromProject(client, accessToken, refreshToken, tableName, photoId, { keywordListId } = {}) {
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/${encodeURIComponent(photoId)}`;
    const query = new URLSearchParams();
    if (keywordListId !== undefined) query.set('keyword_list_id', keywordListId);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function deletePhotoFromProject(client, accessToken, refreshToken, tableName, { photoIds } = {}) {
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/delete/`;
    const query = new URLSearchParams();
    if (photoIds !== undefined) query.set('photo_ids', photoIds);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'DELETE', accessToken, refreshToken);
    return data;
  }

  async function getProjectThumbnail(client, accessToken, refreshToken, tableName) {
    const path = `/api/v1/photos_project/${encodeURIComponent(tableName)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getProjectMonthYearsWithPhotos(client, accessToken, refreshToken, tableName) {
    const path = `/api/v1/photo_month_years/${encodeURIComponent(tableName)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getProjectPhotoIdsByMonth(client, accessToken, refreshToken, tableName, month, year, { ascOrDesc } = {}) {
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getProjectPhotoIdsNoDateTaken(client, accessToken, refreshToken, tableName) {
    const path = `/api/v1/photos/${encodeURIComponent(tableName)}/date_taken/none`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function updatePhotoRanking(client, accessToken, refreshToken, tableName, photoId, newCategory) {
    const path = `/api/v1/photos_update/${encodeURIComponent(tableName)}/id/${encodeURIComponent(photoId)}/rank/${encodeURIComponent(newCategory)}`;
    const { data } = await client.request(path, 'PUT', accessToken, refreshToken);
    return data;
  }

  async function getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked(client, accessToken, refreshToken, tableName, { ascOrDesc } = {}) {
    let path = `/api/v1/photos_ranked/${encodeURIComponent(tableName)}`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked(client, accessToken, refreshToken, tableName, month, year, { ascOrDesc } = {}) {
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}/ranked`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getTopProjectPhotosByTableNameNoDateTakenNewRanked(client, accessToken, refreshToken, tableName, { ascOrDesc } = {}) {
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/date_taken/none/ranked`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getProjectDataExportUploadStatus(client, accessToken, refreshToken, projectTableName, modelName) {
    const path = `/api/v1/projects/${encodeURIComponent(projectTableName)}/upload_status/${encodeURIComponent(modelName)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function requestProjectExport(client, accessToken, refreshToken, projectTableName) {
    const path = `/api/v1/projects_export/${encodeURIComponent(projectTableName)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getUserProjects(client, accessToken, refreshToken) {
    const path = `/api/v1/projects/user`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getProjectByDirectory(client, accessToken, refreshToken, directory) {
    const path = `/api/v1/projects/directory/${encodeURIComponent(directory)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getProjectById(client, accessToken, refreshToken, projectId) {
    const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function createProjectAndRun(client, accessToken, refreshToken, body, { outcomes, models } = {}) {
    let path = `/api/v1/project_outcome/`;
    const query = new URLSearchParams();
    if (outcomes !== undefined) query.set('outcomes', outcomes);
    if (models !== undefined) query.set('models', models);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'POST', accessToken, refreshToken, JSON.stringify(body));
    return data;
  }

  async function updateProject(client, accessToken, refreshToken, projectId, body) {
    const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
    const { data } = await client.request(path, 'PUT', accessToken, refreshToken, JSON.stringify(body));
    return data;
  }

  async function updateProjectPhotoCount(client, accessToken, refreshToken, tableName, { filesFailedCount } = {}) {
    let path = `/api/v1/projects_photos/${encodeURIComponent(tableName)}/`;
    const query = new URLSearchParams();
    if (filesFailedCount !== undefined) query.set('files_failed_count', filesFailedCount);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'PUT', accessToken, refreshToken);
    return data;
  }

  async function deleteProject(client, accessToken, refreshToken, projectId) {
    const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
    const { data } = await client.request(path, 'DELETE', accessToken, refreshToken);
    return data;
  }

  async function addProjectEvent(client, accessToken, refreshToken, projectTableName, body) {
    const path = `/api/v1/projects/${encodeURIComponent(projectTableName)}/event`;
    const { data } = await client.request(path, 'POST', accessToken, refreshToken, JSON.stringify(body));
    return data;
  }

  async function updateProjectCreateUploadReport(client, accessToken, refreshToken, tableName, { filesFailedCount } = {}) {
    let path = `/api/v1/project_upload_report/${encodeURIComponent(tableName)}/`;
    const query = new URLSearchParams();
    if (filesFailedCount !== undefined) query.set('files_failed_count', filesFailedCount);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'PUT', accessToken, refreshToken);
    return data;
  }

  async function searchProjectPhotos(client, accessToken, refreshToken, projectTableName, { andParams, andStringParams, orParams, orStringParams, notParams, notStringParams, dateMin, dateMax, dateNullAnd, dateNullOr, dateOrder, customAlbumId, bestOfSimilarSetsOnly, curatedAlbumName, splitByTier } = {}) {
    let path = `/api/v1/search/${encodeURIComponent(projectTableName)}/`;
    const query = new URLSearchParams();
    if (andParams !== undefined) query.set('and_params', andParams);
    if (andStringParams !== undefined) query.set('and_string_params', andStringParams);
    if (orParams !== undefined) query.set('or_params', orParams);
    if (orStringParams !== undefined) query.set('or_string_params', orStringParams);
    if (notParams !== undefined) query.set('not_params', notParams);
    if (notStringParams !== undefined) query.set('not_string_params', notStringParams);
    if (dateMin !== undefined) query.set('date_min', dateMin);
    if (dateMax !== undefined) query.set('date_max', dateMax);
    if (dateNullAnd !== undefined) query.set('date_null_and', dateNullAnd);
    if (dateNullOr !== undefined) query.set('date_null_or', dateNullOr);
    if (dateOrder !== undefined) query.set('date_order', dateOrder);
    if (customAlbumId !== undefined) query.set('custom_album_id', customAlbumId);
    if (bestOfSimilarSetsOnly !== undefined) query.set('best_of_similar_sets_only', bestOfSimilarSetsOnly);
    if (curatedAlbumName !== undefined) query.set('curated_album_name', curatedAlbumName);
    if (splitByTier !== undefined) query.set('split_by_tier', splitByTier);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function getAccessTokenLogin(baseUrl, { username, password }) {
    const resp = await fetch(baseUrl + `/api/v1/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username,
        password
      }).toString(),
    });
    return handleResponse(resp);
  }

  async function invalidateTokenLogout(client, accessToken, refreshToken) {
    const path = `/api/v1/logout`;
    const { data } = await client.request(path, 'POST', accessToken, refreshToken);
    return data;
  }

  async function getUser(client, accessToken, refreshToken, userId) {
    const path = `/api/v1/users/${encodeURIComponent(userId)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  async function createUserAndCompany(baseUrl, body) {
    const resp = await fetch(baseUrl + `/api/v1/users/new_company`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  }

  async function updateUser(client, accessToken, refreshToken, userId, body) {
    const path = `/api/v1/users/${encodeURIComponent(userId)}`;
    const { data } = await client.request(path, 'PUT', accessToken, refreshToken, JSON.stringify(body));
    return data;
  }

  async function deleteUser(client, accessToken, refreshToken, userId, { newCompanyOwnerId } = {}) {
    let path = `/api/v1/users/delete/${encodeURIComponent(userId)}`;
    const query = new URLSearchParams();
    if (newCompanyOwnerId !== undefined) query.set('new_company_owner_id', newCompanyOwnerId);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await client.request(path, 'DELETE', accessToken, refreshToken);
    return data;
  }

  async function changePassword(client, accessToken, refreshToken, body) {
    const path = `/api/v1/user/change_password`;
    const { data } = await client.request(path, 'POST', accessToken, refreshToken, JSON.stringify(body));
    return data;
  }

  async function createUser(client, accessToken, refreshToken, body) {
    const path = `/api/v1/users/`;
    const { data } = await client.request(path, 'POST', accessToken, refreshToken, JSON.stringify(body));
    return data;
  }

  async function getAllUsersByCompany(client, accessToken, refreshToken, companyId) {
    const path = `/api/v1/users/company/${encodeURIComponent(companyId)}`;
    const { data } = await client.request(path, 'GET', accessToken, refreshToken);
    return data;
  }

  exports.ApiError = ApiError;
  exports.NotFoundError = NotFoundError;
  exports.OAuthClient = OAuthClient;
  exports.OAuthError = OAuthError;
  exports.OAuthErrorCode = OAuthErrorCode;
  exports.RateLimitError = RateLimitError;
  exports.ServerError = ServerError;
  exports.ValidationError = ValidationError;
  exports.addProjectEvent = addProjectEvent;
  exports.addProjectToKeywordFilteringList = addProjectToKeywordFilteringList;
  exports.changePassword = changePassword;
  exports.createKeywordFilteringList = createKeywordFilteringList;
  exports.createProjectAndRun = createProjectAndRun;
  exports.createProjectCustomAlbum = createProjectCustomAlbum;
  exports.createUser = createUser;
  exports.createUserAndCompany = createUserAndCompany;
  exports.deleteCustomAlbum = deleteCustomAlbum;
  exports.deleteKeywordFilteringListById = deleteKeywordFilteringListById;
  exports.deletePhotoFromProject = deletePhotoFromProject;
  exports.deleteProject = deleteProject;
  exports.deleteUser = deleteUser;
  exports.getAccessTokenLogin = getAccessTokenLogin;
  exports.getAllKeywordGroupsAndSubgroups = getAllKeywordGroupsAndSubgroups;
  exports.getAllPersonsFromPhoto = getAllPersonsFromPhoto;
  exports.getAllPersonsFromProject = getAllPersonsFromProject;
  exports.getAllProjectCuratedAlbums = getAllProjectCuratedAlbums;
  exports.getAllProjectCustomAlbums = getAllProjectCustomAlbums;
  exports.getAllProjectPhotoIds = getAllProjectPhotoIds;
  exports.getAllUsersByCompany = getAllUsersByCompany;
  exports.getCategoryLabels = getCategoryLabels;
  exports.getCuratedAlbumPhotos = getCuratedAlbumPhotos;
  exports.getCuratedAlbumPhotosRanked = getCuratedAlbumPhotosRanked;
  exports.getCustomAlbumDetailById = getCustomAlbumDetailById;
  exports.getCustomAlbumPhotosById = getCustomAlbumPhotosById;
  exports.getDefaultKeywordFilteringListByProject = getDefaultKeywordFilteringListByProject;
  exports.getExistingKeywordFilteringListByProject = getExistingKeywordFilteringListByProject;
  exports.getGoogleSheetsCredentials = getGoogleSheetsCredentials;
  exports.getKeywordFilteringListAndProjectsById = getKeywordFilteringListAndProjectsById;
  exports.getKeywordFilteringListById = getKeywordFilteringListById;
  exports.getKeywordGroupsLabelsByKeywordGroup = getKeywordGroupsLabelsByKeywordGroup;
  exports.getKeywordsAndIds = getKeywordsAndIds;
  exports.getPhotoFromProject = getPhotoFromProject;
  exports.getProjectByDirectory = getProjectByDirectory;
  exports.getProjectById = getProjectById;
  exports.getProjectDataExportUploadStatus = getProjectDataExportUploadStatus;
  exports.getProjectMonthYearsWithPhotos = getProjectMonthYearsWithPhotos;
  exports.getProjectPhotoIdsByMonth = getProjectPhotoIdsByMonth;
  exports.getProjectPhotoIdsNoDateTaken = getProjectPhotoIdsNoDateTaken;
  exports.getProjectThumbnail = getProjectThumbnail;
  exports.getTopMiddleBottomCustomAlbumById = getTopMiddleBottomCustomAlbumById;
  exports.getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked = getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked;
  exports.getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked = getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked;
  exports.getTopProjectPhotosByTableNameNoDateTakenNewRanked = getTopProjectPhotosByTableNameNoDateTakenNewRanked;
  exports.getUser = getUser;
  exports.getUserKeywordFilteringLists = getUserKeywordFilteringLists;
  exports.getUserProjects = getUserProjects;
  exports.handleResponse = handleResponse;
  exports.invalidateTokenLogout = invalidateTokenLogout;
  exports.removeProjectsFromKeywordFilteringList = removeProjectsFromKeywordFilteringList;
  exports.requestKeywordListExport = requestKeywordListExport;
  exports.requestKeywordListExportStatus = requestKeywordListExportStatus;
  exports.requestPasswordReset = requestPasswordReset;
  exports.requestProjectExport = requestProjectExport;
  exports.resetPassword = resetPassword;
  exports.searchProjectPhotos = searchProjectPhotos;
  exports.updateCustomAlbum = updateCustomAlbum;
  exports.updateKeywordFilteringListDetails = updateKeywordFilteringListDetails;
  exports.updateKeywordFilteringListLabels = updateKeywordFilteringListLabels;
  exports.updatePerson = updatePerson;
  exports.updatePhotoRanking = updatePhotoRanking;
  exports.updateProject = updateProject;
  exports.updateProjectCreateUploadReport = updateProjectCreateUploadReport;
  exports.updateProjectPhotoCount = updateProjectPhotoCount;
  exports.updateUser = updateUser;

}));
