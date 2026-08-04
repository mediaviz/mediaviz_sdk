(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MediaVizSdk = {}));
})(this, (function (exports) { 'use strict';

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
		   * @param {unknown} [body] - Raw response body (parsed JSON when available)
		   */
		  constructor(code, description, httpStatus, body = null) {
		    super(description);
		    this.name = 'OAuthError';
		    this.code = code;
		    this.description = description;
		    this.httpStatus = httpStatus;
		    this.body = body;
		  }

		  /**
		   * @param {number} status
		   * @param {unknown} body
		   * @returns {OAuthError}
		   */
		  static fromResponse(status, body) {
		    // FastAPI wraps HTTPException payloads in a `detail` envelope, so an OAuth
		    // error arrives as { detail: { error, error_description } }. Unwrap it
		    // before falling back, or every server-side OAuth error reads as server_error.
		    const payload =
		      body && typeof body === 'object' && typeof body.error !== 'string' && body.detail
		        ? body.detail
		        : body;
		    if (payload && typeof payload === 'object' && typeof payload.error === 'string') {
		      return new OAuthError(payload.error, payload.error_description ?? '', status, body);
		    }
		    return new OAuthError('server_error', 'Unexpected server response', status, body);
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
		 * @property {string[]} [grantTypes] - Allowed grants, e.g. ["client_credentials"]; required for machine-to-machine clients
		 * @property {number} [companyId] - Company to bind the client to; required for the client_credentials grant
		 * @property {string} [accessToken] - Admin bearer token; the registration endpoint is authorization-gated
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

	var src$1;
	var hasRequiredSrc$1;

	function requireSrc$1 () {
		if (hasRequiredSrc$1) return src$1;
		hasRequiredSrc$1 = 1;

		const { OAuthClient } = requireClient();
		const { OAuthError } = requireErrors();
		const { OAuthErrorCode } = requireTypes();

		src$1 = { OAuthClient, OAuthError, OAuthErrorCode };
		return src$1;
	}

	var srcExports$1 = requireSrc$1();
	var _oauth = /*@__PURE__*/getDefaultExportFromCjs(srcExports$1);

	// Auto-generated — do not edit
	const { OAuthClient, OAuthError, OAuthErrorCode } = _oauth;

	var signing;
	var hasRequiredSigning;

	function requireSigning () {
		if (hasRequiredSigning) return signing;
		hasRequiredSigning = 1;

		// HMAC scheme shared with the MediaViz producer: X-Signature = 'sha256=' +
		// hex(HMAC-SHA256(secret, `${X-Timestamp}.` + rawBody)). The signing string is
		// the timestamp joined to the *raw request body bytes* — never re-serialized
		// JSON. Verification accepts the current and (during rotation) previous
		// secret, rejects timestamps outside the skew window, and compares digests in
		// constant time. Web Crypto only, so the same code runs in Node >= 18 and
		// browsers.

		const _encoder = new TextEncoder();

		async function signWebhookPayload(secret, timestamp, rawBody) {
		  const key = await globalThis.crypto.subtle.importKey(
		    'raw', _encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
		  const payload = _concat(_encoder.encode(`${timestamp}.`), toBytes(rawBody));
		  const digest = await globalThis.crypto.subtle.sign('HMAC', key, payload);
		  return 'sha256=' + _hex(new Uint8Array(digest));
		}

		async function verifyWebhookSignature(secretCurrent, secretPrevious, headers, rawBody, options = {}) {
		  const h = lowerHeaders(headers);
		  const timestamp = h['x-timestamp'];
		  const signature = h['x-signature'];
		  if (!timestamp || !signature) return false;
		  if (!/^-?\d+$/.test(String(timestamp))) return false;
		  const skewToleranceS = options.skewToleranceS ?? 300;
		  const now = options.now ?? Math.floor(Date.now() / 1000);
		  if (Math.abs(now - Number(timestamp)) > skewToleranceS) return false;
		  for (const secret of [secretCurrent, secretPrevious]) {
		    if (!secret) continue;
		    const expected = await signWebhookPayload(secret, String(timestamp), rawBody);
		    if (_constantTimeEqual(expected, String(signature))) return true;
		  }
		  return false;
		}

		// helpers
		function toBytes(rawBody) {
		  if (typeof rawBody === 'string') return _encoder.encode(rawBody);
		  if (rawBody instanceof Uint8Array) return rawBody;
		  if (rawBody instanceof ArrayBuffer) return new Uint8Array(rawBody);
		  throw new TypeError('rawBody must be a string, Uint8Array, or ArrayBuffer');
		}

		function lowerHeaders(headers) {
		  const out = {};
		  const entries = typeof headers?.entries === 'function' ? headers.entries() : Object.entries(headers ?? {});
		  for (const [k, v] of entries) out[String(k).toLowerCase()] = v;
		  return out;
		}

		function _concat(a, b) {
		  const out = new Uint8Array(a.length + b.length);
		  out.set(a, 0);
		  out.set(b, a.length);
		  return out;
		}

		function _hex(bytes) {
		  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
		}

		function _constantTimeEqual(a, b) {
		  if (a.length !== b.length) return false;
		  let diff = 0;
		  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
		  return diff === 0;
		}

		signing = { signWebhookPayload, verifyWebhookSignature, toBytes, lowerHeaders };
		return signing;
	}

	var store;
	var hasRequiredStore;

	function requireStore () {
		if (hasRequiredStore) return store;
		hasRequiredStore = 1;

		// Persistence seam for the webhook consumer: dedupe ledger, signing secrets,
		// and pull cursors. The default in-memory store suits a single long-lived
		// process (worker, dev server); multi-process consumers supply an object with
		// the same shape backed by Redis or a database.

		const MAX_SEEN_ENTRIES = 100000;

		class InMemoryWebhookStore {
		  constructor() {
		    this._seen = new Map();     // eventId -> expiresAt (ms)
		    this._secrets = new Map();  // subscriptionId -> {current, previous, previousExpiresAt}
		    this._cursors = new Map();  // subscriptionId -> cursor
		  }

		  markSeen(eventId, ttlS) {
		    const now = Date.now();
		    const expiresAt = this._seen.get(eventId);
		    if (expiresAt !== undefined && expiresAt > now) return false;
		    this._seen.delete(eventId);
		    this._seen.set(eventId, now + ttlS * 1000);
		    this._prune(now);
		    return true;
		  }

		  unmarkSeen(eventId) {
		    this._seen.delete(eventId);
		  }

		  saveSecret(subscriptionId, secret) {
		    this._secrets.set(subscriptionId, { current: secret, previous: null, previousExpiresAt: 0 });
		  }

		  rotateSecret(subscriptionId, newSecret, windowS) {
		    const entry = this._secrets.get(subscriptionId);
		    this._secrets.set(subscriptionId, {
		      current: newSecret,
		      previous: entry?.current ?? null,
		      previousExpiresAt: Date.now() + windowS * 1000,
		    });
		  }

		  getSecrets(subscriptionId) {
		    const entry = this._secrets.get(subscriptionId);
		    if (!entry) return [null, null];
		    const previous = entry.previous && entry.previousExpiresAt > Date.now() ? entry.previous : null;
		    return [entry.current, previous];
		  }

		  getCursor(subscriptionId) {
		    return this._cursors.get(subscriptionId) ?? null;
		  }

		  setCursor(subscriptionId, cursor) {
		    this._cursors.set(subscriptionId, cursor);
		  }

		  _prune(now) {
		    if (this._seen.size <= MAX_SEEN_ENTRIES) return;
		    for (const [id, expiresAt] of this._seen) {
		      if (expiresAt <= now) this._seen.delete(id);
		      if (this._seen.size <= MAX_SEEN_ENTRIES) return;
		    }
		    // still over the cap: evict oldest insertions
		    for (const id of this._seen.keys()) {
		      this._seen.delete(id);
		      if (this._seen.size <= MAX_SEEN_ENTRIES) return;
		    }
		  }
		}

		store = { InMemoryWebhookStore };
		return store;
	}

	var consumer;
	var hasRequiredConsumer;

	function requireConsumer () {
		if (hasRequiredConsumer) return consumer;
		hasRequiredConsumer = 1;

		const { verifyWebhookSignature, toBytes, lowerHeaders } = requireSigning();
		const { InMemoryWebhookStore } = requireStore();

		// Photo columns each producer model writes — used to select a model's results
		// out of a fetched PhotoDisplay. Mirrors the producer vocabulary; personhood is
		// predicate-based and writes no columns.
		const WEBHOOK_MODEL_COLUMNS = {
		  blur: ['blur_value'],
		  colors: ['main_color_palette', 'color_averages', 'hue_values', 'light_values', 'saturation_values'],
		  face_recognition: ['number_of_faces', 'bounding_boxes_from_faces_model'],
		  image_classification: ['labels_from_classifications_model', 'feature_extraction_output'],
		  image_comparison: ['average_hash'],
		  image_describe: ['topic'],
		  ocr: ['ocr_output'],
		  similarity: ['similar_photo_ids_high', 'similar_photo_ids_medium', 'similar_photo_ids_low'],
		  evidence: ['evidence_score', 'aesthetic_score', 'face_score', 'content_score', 'similarity_set_ranking'],
		  personhood: [],
		};

		const WEBHOOK_OUTCOME_MODELS = {
		  curation: ['blur', 'colors', 'face_recognition', 'image_classification', 'image_comparison', 'similarity', 'evidence'],
		  similarity: ['image_classification', 'image_comparison', 'similarity'],
		  persons: ['face_recognition', 'personhood'],
		};

		// Client-side counterpart of the MediaViz webhook producer, giving photo-by-photo
		// progress as a project upload is analyzed.
		//
		// Receiver half (no auth needed): classify inbound POSTs, echo the subscription
		// verification challenge, verify signed `target.completed` deliveries (HMAC +
		// timestamp skew), dedupe on event_id, and dispatch each new event to a single
		// onEvent callback. `handleRequest` is framework-agnostic glue — adapt it to
		// express/lambda/etc. in a few lines by feeding it the raw body and headers.
		//
		// API half (requires an authenticated client): subscription lifecycle
		// orchestration — register/confirm/rotate store the signing secret the moment
		// the producer issues it — plus history pulls that share the push dedupe
		// ledger, and out-of-band result fetches (webhooks carry a pointer, never the
		// result itself).
		class WebhookConsumer {
		  constructor(ctx, subscriptionApi, options = {}) {
		    this._ctx = ctx;
		    this._api = subscriptionApi;
		    this.store = options.store ?? new InMemoryWebhookStore();
		    this.skewToleranceS = options.skewToleranceS ?? 300;
		    this.rotationWindowS = options.rotationWindowS ?? 86400;
		    this.dedupeTtlS = options.dedupeTtlS ?? 604800;
		    this.pageLimit = options.pageLimit ?? 100;
		    this._onEvent = options.onEvent ?? null;
		  }

		  // ── receiver half ─────────────────────────────────────────────────────────

		  onEvent(fn) {
		    this._onEvent = fn;
		    return fn;
		  }

		  useStore(store) {
		    this.store = store;
		  }

		  classifyMessage(body) {
		    const type = body?.event_type;
		    if (type === 'subscription.verification') return 'verification';
		    if (type === 'target.completed') return 'delivery';
		    return 'unknown';
		  }

		  handleChallenge(body) {
		    return { challenge: body.challenge };
		  }

		  async handleDelivery(headers, rawBody) {
		    let event;
		    try {
		      event = this._parseDelivery(rawBody);
		    } catch {
		      return 'bad_signature';
		    }
		    const [current, previous] = this.store.getSecrets(String(event.subscription_id));
		    const ok = await verifyWebhookSignature(current, previous, headers, rawBody, { skewToleranceS: this.skewToleranceS });
		    if (!ok) return 'bad_signature';
		    return this._dispatch(event);
		  }

		  async handleRequest(headers, rawBody) {
		    let body;
		    try {
		      body = JSON.parse(_text(rawBody));
		    } catch {
		      return { status: 400, body: { detail: 'invalid JSON' } };
		    }
		    switch (this.classifyMessage(body)) {
		      case 'verification':
		        return { status: 200, body: this.handleChallenge(body) };
		      case 'delivery': {
		        const ack = await this.handleDelivery(lowerHeaders(headers), rawBody);
		        if (ack === 'bad_signature') return { status: 401, body: { detail: 'bad signature' } };
		        return { status: 200, body: { status: ack } };
		      }
		      default:
		        return { status: 400, body: { detail: 'unrecognized event_type' } };
		    }
		  }

		  // ── API half ──────────────────────────────────────────────────────────────

		  async register(projectTableName, callbackUrl, targets) {
		    const res = await this._api.createSubscription(projectTableName, callbackUrl, targets);
		    this._saveSecretFrom(res);
		    return res;
		  }

		  async confirm(subscriptionId) {
		    const res = await this._api.verifySubscription(subscriptionId);
		    this._saveSecretFrom(res);
		    return res;
		  }

		  async rotateSecret(subscriptionId) {
		    const res = await this._api.rotateSubscriptionSecret(subscriptionId);
		    this.store.rotateSecret(String(subscriptionId), res.signing_secret, this.rotationWindowS);
		    return res.signing_secret;
		  }

		  async updateCallback(subscriptionId, callbackUrl) {
		    // A callback change resets the subscription to pending_verification and
		    // pauses push until the new URL passes the challenge — confirm right away.
		    await this._api.updateSubscription(subscriptionId, { callbackUrl });
		    return this.confirm(subscriptionId);
		  }

		  async disable(subscriptionId) {
		    return this._api.deleteSubscription(subscriptionId);
		  }

		  async listSubscriptions() {
		    return this._api.listSubscriptions();
		  }

		  async pullEvents(subscriptionId, { since, limit } = {}) {
		    return this._api.listSubscriptionEvents(subscriptionId, { since, limit: limit ?? this.pageLimit });
		  }

		  async reconcile(subscriptionId, projectTableName) {
		    const id = String(subscriptionId);
		    let cursor = this.store.getCursor(id);
		    let pulled = 0;
		    let dispatched = 0;
		    for (;;) {
		      const page = await this._api.listSubscriptionEvents(id, { since: cursor ?? undefined, limit: this.pageLimit });
		      const events = page?.events ?? [];
		      pulled += events.length;
		      for (const ev of events) {
		        const ack = await this._dispatch({
		          event_id: ev.event_id,
		          event_type: 'target.completed',
		          schema_version: '1',
		          subscription_id: id,
		          project_table_name: projectTableName,
		          photo_id: ev.photo_id,
		          target: ev.target,
		          completed_at: ev.completed_at,
		          result_location: this._ctx.baseUrl + _photoPath(projectTableName, ev.photo_id),
		        });
		        if (ack === 'handled') dispatched += 1;
		      }
		      if (page?.next_cursor && page.next_cursor !== cursor) {
		        cursor = page.next_cursor;
		        this.store.setCursor(id, cursor);
		      }
		      if (!events.length || events.length < this.pageLimit) break;
		    }
		    return { pulled, dispatched };
		  }

		  async fetchResult(event) {
		    this._ctx.requireTokens();
		    const path = _photoPath(event.project_table_name, event.photo_id);
		    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
		    return { photo: data, selected: selectResultColumns(data, event.target) };
		  }

		  saveSecret(subscriptionId, secret) {
		    this.store.saveSecret(String(subscriptionId), secret);
		  }

		  // ── internal ──────────────────────────────────────────────────────────────

		  _saveSecretFrom(res) {
		    if (res?.signing_secret && res?.subscription_id != null) {
		      this.store.saveSecret(String(res.subscription_id), res.signing_secret);
		    }
		  }

		  _parseDelivery(rawBody) {
		    const event = JSON.parse(_text(rawBody));
		    for (const key of ['event_id', 'subscription_id', 'target']) {
		      if (typeof event?.[key] !== 'string' || !event[key]) throw new Error(`missing ${key}`);
		    }
		    if (!Number.isInteger(event.photo_id)) throw new Error('photo_id must be an integer');
		    return event;
		  }

		  async _dispatch(event) {
		    if (!this.store.markSeen(String(event.event_id), this.dedupeTtlS)) return 'duplicate';
		    if (this._onEvent) {
		      try {
		        await this._onEvent(event);
		      } catch (e) {
		        // release the dedupe claim so the producer's retry redelivers
		        this.store.unmarkSeen(String(event.event_id));
		        throw e;
		      }
		    }
		    return 'handled';
		  }
		}

		// helpers
		function selectResultColumns(photo, target) {
		  if (target === 'all') return null;
		  const sep = String(target).indexOf(':');
		  const kind = sep === -1 ? String(target) : String(target).slice(0, sep);
		  const name = sep === -1 ? '' : String(target).slice(sep + 1);
		  let columns;
		  if (kind === 'model') {
		    columns = WEBHOOK_MODEL_COLUMNS[name];
		    if (!columns) throw new Error(`unknown model '${name}'`);
		  } else if (kind === 'outcome') {
		    const models = WEBHOOK_OUTCOME_MODELS[name];
		    if (!models) throw new Error(`unknown outcome '${name}'`);
		    columns = [...new Set(models.flatMap((m) => WEBHOOK_MODEL_COLUMNS[m]))];
		  } else {
		    throw new Error(`unknown target grammar '${target}' (expected 'model:<name>', 'outcome:<name>', or 'all')`);
		  }
		  const selected = {};
		  for (const c of columns) selected[c] = photo?.[c] ?? null;
		  return selected;
		}

		function _photoPath(projectTableName, photoId) {
		  return `/api/v1/photos/${encodeURIComponent(projectTableName)}/${encodeURIComponent(String(photoId))}`;
		}

		function _text(rawBody) {
		  return typeof rawBody === 'string' ? rawBody : new TextDecoder().decode(toBytes(rawBody));
		}

		consumer = { WebhookConsumer, selectResultColumns, WEBHOOK_MODEL_COLUMNS, WEBHOOK_OUTCOME_MODELS };
		return consumer;
	}

	var src;
	var hasRequiredSrc;

	function requireSrc () {
		if (hasRequiredSrc) return src;
		hasRequiredSrc = 1;

		const { WebhookConsumer, selectResultColumns, WEBHOOK_MODEL_COLUMNS, WEBHOOK_OUTCOME_MODELS } = requireConsumer();
		const { InMemoryWebhookStore } = requireStore();
		const { signWebhookPayload, verifyWebhookSignature } = requireSigning();

		src = { WebhookConsumer, InMemoryWebhookStore, signWebhookPayload, verifyWebhookSignature, selectResultColumns, WEBHOOK_MODEL_COLUMNS, WEBHOOK_OUTCOME_MODELS };
		return src;
	}

	var srcExports = requireSrc();
	var _webhooks = /*@__PURE__*/getDefaultExportFromCjs(srcExports);

	// Auto-generated — do not edit
	const { WebhookConsumer, InMemoryWebhookStore, signWebhookPayload, verifyWebhookSignature, selectResultColumns, WEBHOOK_MODEL_COLUMNS, WEBHOOK_OUTCOME_MODELS } = _webhooks;

	class AiModelCredits {
	  constructor(ctx) { this._ctx = ctx; }

	  async getModelCreditRelationship(modelName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/model_credit/${encodeURIComponent(modelName)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }
	}

	class Admin {
	  constructor(ctx) { this._ctx = ctx; }

	  async getCategoryLabels(category) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/admin/category_labels/${encodeURIComponent(category)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }
	}

	class Company {
	  constructor(ctx) { this._ctx = ctx; }

	  async getCompanyById(companyId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/company/${encodeURIComponent(companyId)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async confirmCompanyCreditBalance(companyId, { photoCount, modelsList } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/company/credit_balance/${encodeURIComponent(companyId)}`;
	    const query = new URLSearchParams();
	    if (photoCount !== undefined) (Array.isArray(photoCount) ? photoCount : [photoCount]).forEach(v => query.append('photo_count', v));
	    if (modelsList !== undefined) (Array.isArray(modelsList) ? modelsList : [modelsList]).forEach(v => query.append('models_list', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }
	}

	function stripUndef$7(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

	class CuratedAlbums {
	  constructor(ctx) { this._ctx = ctx; }

	  async createCuratedAlbum(projectTableName, name, description = undefined, confidenceValue = undefined) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/curated_album/project/${encodeURIComponent(projectTableName)}`;
	    const body = stripUndef$7({
	      name: name,
	      description: description,
	      confidence_value: confidenceValue,
	    });
	    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
	    return data;
	  }

	  async getAllProjectCuratedAlbums(projectTableName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/curated_album/project/${encodeURIComponent(projectTableName)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getCuratedAlbumPhotos(albumId, { ascOrDesc, lastId, limit, confidenceValue } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/curated_album/photos/${encodeURIComponent(albumId)}/`;
	    const query = new URLSearchParams();
	    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
	    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
	    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
	    if (confidenceValue !== undefined) (Array.isArray(confidenceValue) ? confidenceValue : [confidenceValue]).forEach(v => query.append('confidence_value', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getCuratedAlbumPhotosRanked(albumId, { ascOrDesc, lastId, limit, confidenceValue } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/curated_album/photos/ranked/${encodeURIComponent(albumId)}/`;
	    const query = new URLSearchParams();
	    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
	    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
	    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
	    if (confidenceValue !== undefined) (Array.isArray(confidenceValue) ? confidenceValue : [confidenceValue]).forEach(v => query.append('confidence_value', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getCuratedAlbumById(albumId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/curated_album/${encodeURIComponent(albumId)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async updateCuratedAlbum(albumId, { name, description, confidenceValue } = {}) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/curated_album/${encodeURIComponent(albumId)}`;
	    const body = stripUndef$7({
	      name: name,
	      description: description,
	      confidence_value: confidenceValue,
	    });
	    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, body);
	    return data;
	  }

	  async deleteCuratedAlbum(albumId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/curated_album/${encodeURIComponent(albumId)}`;
	    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async convertCuratedAlbumToCustom(albumId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/curated_album/${encodeURIComponent(albumId)}/convert`;
	    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }
	}

	function stripUndef$6(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

	class CustomAlbums {
	  constructor(ctx) { this._ctx = ctx; }

	  async getCustomAlbumDetailById(customAlbumId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/custom_album/${encodeURIComponent(customAlbumId)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getAllProjectCustomAlbums(projectTableName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/custom_album/project/${encodeURIComponent(projectTableName)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getCustomAlbumPhotosById(customAlbumId, { ascOrDesc, lastId, limit } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/custom_album/photos/${encodeURIComponent(customAlbumId)}/`;
	    const query = new URLSearchParams();
	    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
	    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
	    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getRankedCustomAlbumById(customAlbumId, { ascOrDesc, lastId, limit } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/custom_album/photos/ranked/${encodeURIComponent(customAlbumId)}/`;
	    const query = new URLSearchParams();
	    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
	    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
	    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async createProjectCustomAlbum(projectTableName, { name, description, photoIdInclusionList, photoIdRemovalList } = {}) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/custom_album/project/${encodeURIComponent(projectTableName)}`;
	    const body = stripUndef$6({
	      name: name,
	      description: description,
	      photo_id_inclusion_list: photoIdInclusionList,
	      photo_id_removal_list: photoIdRemovalList,
	    });
	    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
	    return data;
	  }

	  async updateCustomAlbum(albumId, { name, description, photoIdInclusionList, photoIdRemovalList } = {}) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/custom_album/${encodeURIComponent(albumId)}`;
	    const body = stripUndef$6({
	      name: name,
	      description: description,
	      photo_id_inclusion_list: photoIdInclusionList,
	      photo_id_removal_list: photoIdRemovalList,
	    });
	    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, body);
	    return data;
	  }

	  async deleteCustomAlbum(albumId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/custom_album/${encodeURIComponent(albumId)}`;
	    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }
	}

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

	function stripUndef$5(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

	class EmailTokens {
	  constructor(ctx) { this._ctx = ctx; }

	  async requestEmailVerification({ email } = {}) {
	    let path = `/api/v1/request-email-verification`;
	    const query = new URLSearchParams();
	    if (email !== undefined) (Array.isArray(email) ? email : [email]).forEach(v => query.append('email', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const resp = await fetch(this._ctx.baseUrl + path, { method: 'POST' });
	    return handleResponse(resp);
	  }

	  async verifyEmail(token) {
	    const resp = await fetch(this._ctx.baseUrl + `/api/v1/verify-email/${encodeURIComponent(token)}`, { method: 'POST' });
	    return handleResponse(resp);
	  }

	  async requestPasswordReset({ email } = {}) {
	    let path = `/api/v1/request-password-reset`;
	    const query = new URLSearchParams();
	    if (email !== undefined) (Array.isArray(email) ? email : [email]).forEach(v => query.append('email', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const resp = await fetch(this._ctx.baseUrl + path, { method: 'POST' });
	    return handleResponse(resp);
	  }

	  async validateToken(token) {
	    const body = stripUndef$5({
	      token: token,
	    });
	    const resp = await fetch(this._ctx.baseUrl + `/api/v1/validate-token`, {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(body),
	    });
	    return handleResponse(resp);
	  }

	  async resetPassword(token, newPassword) {
	    const body = stripUndef$5({
	      token: token,
	      new_password: newPassword,
	    });
	    const resp = await fetch(this._ctx.baseUrl + `/api/v1/reset-password`, {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(body),
	    });
	    return handleResponse(resp);
	  }

	  async deleteUserEmailTokens(userId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/admin/email_tokens/by_user/${encodeURIComponent(userId)}`;
	    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }
	}

	class Health {
	  constructor(ctx) { this._ctx = ctx; }

	  async healthCheck() {
	    const resp = await fetch(this._ctx.baseUrl + `/api/v1/health/`, { method: 'GET' });
	    return handleResponse(resp);
	  }

	  async livenessCheck() {
	    const resp = await fetch(this._ctx.baseUrl + `/api/v1/health/live/`, { method: 'GET' });
	    return handleResponse(resp);
	  }

	  async readinessCheck() {
	    const resp = await fetch(this._ctx.baseUrl + `/api/v1/health/ready`, { method: 'GET' });
	    return handleResponse(resp);
	  }
	}

	function stripUndef$4(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

	class Keywords {
	  constructor(ctx) { this._ctx = ctx; }

	  async createKeywordFilteringList(name, projectList = undefined) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/keyword/`;
	    const body = stripUndef$4({
	      name: name,
	      project_list: projectList,
	    });
	    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
	    return data;
	  }

	  async getUserKeywordFilteringLists() {
	    this._ctx.requireTokens();
	    const path = `/api/v1/keyword/user`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getCompanyKeywordLists(companyId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/keyword/company/${encodeURIComponent(companyId)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getKeywordFilteringListAndProjectsById(keywordListId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getKeywordFilteringListById(keywordListId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/keyword/list/${encodeURIComponent(keywordListId)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getExistingKeywordFilteringListByProject(projectTableName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/keyword/project/${encodeURIComponent(projectTableName)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getDefaultKeywordFilteringListByProject(projectTableName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/keyword/project/${encodeURIComponent(projectTableName)}/default`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async updateKeywordFilteringListLabels(keywordListId, listKeywordsToInclude, listKeywordsToExclude) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
	    const body = stripUndef$4({
	      list_keywords_to_include: listKeywordsToInclude,
	      list_keywords_to_exclude: listKeywordsToExclude,
	    });
	    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, body);
	    return data;
	  }

	  async updateKeywordFilteringListDetails(keywordListId, { name, projectList } = {}) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/keyword/details/${encodeURIComponent(keywordListId)}`;
	    const body = stripUndef$4({
	      name: name,
	      project_list: projectList,
	    });
	    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, body);
	    return data;
	  }

	  async addProjectsToKeywordFilteringList(keywordListId, { projectIds } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/projects`;
	    const query = new URLSearchParams();
	    if (projectIds !== undefined) (Array.isArray(projectIds) ? projectIds : [projectIds]).forEach(v => query.append('project_ids', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async addCompanyToKeywordFilteringList(keywordListId, { companyId } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/company`;
	    const query = new URLSearchParams();
	    if (companyId !== undefined) (Array.isArray(companyId) ? companyId : [companyId]).forEach(v => query.append('company_id', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async requestKeywordListExport(keywordListId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/keyword/export/${encodeURIComponent(keywordListId)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async requestKeywordListExportStatus(keywordListId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/keyword/export_status/${encodeURIComponent(keywordListId)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getKeywordsAndIds() {
	    this._ctx.requireTokens();
	    const path = `/api/v1/keyword/all_keywords/id/label`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async removeProjectsFromKeywordFilteringList(keywordListId, { projectIds } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/projects`;
	    const query = new URLSearchParams();
	    if (projectIds !== undefined) (Array.isArray(projectIds) ? projectIds : [projectIds]).forEach(v => query.append('project_ids', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async removeCompanyFromKeywordFilteringList(keywordListId, { companyId } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}/company`;
	    const query = new URLSearchParams();
	    if (companyId !== undefined) (Array.isArray(companyId) ? companyId : [companyId]).forEach(v => query.append('company_id', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async deleteKeywordFilteringListById(keywordListId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/keyword/${encodeURIComponent(keywordListId)}`;
	    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }
	}

	class OauthAuthorization {
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

	  async postApproveConsent(sessionId, { restartUrl }) {
	    const resp = await fetch(this._ctx.baseUrl + `/oauth/consent/${encodeURIComponent(sessionId)}/approve`, {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	      body: new URLSearchParams({ restart_url: restartUrl }).toString(),
	    });
	    return handleResponse(resp);
	  }

	  async postDenyConsent(sessionId, { restartUrl }) {
	    const resp = await fetch(this._ctx.baseUrl + `/oauth/consent/${encodeURIComponent(sessionId)}/deny`, {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	      body: new URLSearchParams({ restart_url: restartUrl }).toString(),
	    });
	    return handleResponse(resp);
	  }

	  async getSwitchUser(sessionId, { restartUrl } = {}) {
	    let path = `/oauth/consent/${encodeURIComponent(sessionId)}/switch-user`;
	    const query = new URLSearchParams();
	    if (restartUrl !== undefined) (Array.isArray(restartUrl) ? restartUrl : [restartUrl]).forEach(v => query.append('restart_url', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const resp = await fetch(this._ctx.baseUrl + path, { method: 'GET' });
	    return handleResponse(resp);
	  }
	}

	class OauthToken {
	  constructor(ctx) { this._ctx = ctx; }

	  async token({ grantType, code, redirectUri, clientId, codeVerifier, refreshToken, clientSecret }) {
	    const resp = await fetch(this._ctx.baseUrl + `/oauth/token`, {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	      body: new URLSearchParams({ grant_type: grantType, code, redirect_uri: redirectUri, client_id: clientId, code_verifier: codeVerifier, refresh_token: refreshToken, client_secret: clientSecret }).toString(),
	    });
	    return handleResponse(resp);
	  }

	  async adminRevokeUserTokens(userId) {
	    this._ctx.requireTokens();
	    const path = `/oauth/admin/users/${encodeURIComponent(userId)}/revoke-tokens`;
	    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
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

	class OauthLogin {
	  constructor(ctx) { this._ctx = ctx; }

	  async getLogin({ next } = {}) {
	    let path = `/api/v1/oauth/login`;
	    const query = new URLSearchParams();
	    if (next !== undefined) (Array.isArray(next) ? next : [next]).forEach(v => query.append('next', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const resp = await fetch(this._ctx.baseUrl + path, { method: 'GET' });
	    return handleResponse(resp);
	  }

	  async postLogin({ email, password, next }) {
	    const resp = await fetch(this._ctx.baseUrl + `/api/v1/oauth/login`, {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	      body: new URLSearchParams({ email, password, next }).toString(),
	    });
	    return handleResponse(resp);
	  }
	}

	class Person {
	  constructor(ctx) { this._ctx = ctx; }

	  async updatePerson(projectTableName, personId, { personName } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/person/${encodeURIComponent(projectTableName)}/${encodeURIComponent(personId)}`;
	    const query = new URLSearchParams();
	    if (personName !== undefined) (Array.isArray(personName) ? personName : [personName]).forEach(v => query.append('person_name', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async removePersonName(projectTableName, personId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/remove_name/${encodeURIComponent(personId)}`;
	    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async combinePersons(projectTableName, destinationPersonId, oldPersonId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/combine/${encodeURIComponent(destinationPersonId)}/${encodeURIComponent(oldPersonId)}`;
	    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async splitPersons(projectTableName, id, { newName, destinationPersonId } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/person/${encodeURIComponent(projectTableName)}/split/${encodeURIComponent(id)}/`;
	    const query = new URLSearchParams();
	    if (newName !== undefined) (Array.isArray(newName) ? newName : [newName]).forEach(v => query.append('new_name', v));
	    if (destinationPersonId !== undefined) (Array.isArray(destinationPersonId) ? destinationPersonId : [destinationPersonId]).forEach(v => query.append('destination_person_id', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getAllPersonsFromProject(projectTableName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getAllPersonNamesFromProject(projectTableName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/names`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getPhotoIdsByPersons(projectTableName, { personId } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/person/${encodeURIComponent(projectTableName)}/photos`;
	    const query = new URLSearchParams();
	    if (personId !== undefined) (Array.isArray(personId) ? personId : [personId]).forEach(v => query.append('person_id', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getAllPersonsFromPhoto(projectTableName, photoId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/photo/${encodeURIComponent(photoId)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async removePerson(projectTableName, personId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/${encodeURIComponent(personId)}`;
	    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }
	}

	function stripUndef$3(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

	class Projects {
	  constructor(ctx) { this._ctx = ctx; }

	  async createProjectAndRun(name, type, private_ = undefined, description = undefined, directory = undefined, photoUploadVector = undefined, thumbnail = undefined, runName = undefined, { outcomes, models } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/project_outcome/`;
	    const query = new URLSearchParams();
	    if (outcomes !== undefined) (Array.isArray(outcomes) ? outcomes : [outcomes]).forEach(v => query.append('outcomes', v));
	    if (models !== undefined) (Array.isArray(models) ? models : [models]).forEach(v => query.append('models', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const body = stripUndef$3({
	      name: name,
	      private: private_,
	      type: type,
	      description: description,
	      directory: directory,
	      photo_upload_vector: photoUploadVector,
	      thumbnail: thumbnail,
	      run_name: runName,
	    });
	    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
	    return data;
	  }

	  async markProjectUploadComplete(projectTableName, { skippedFileCount } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/project/${encodeURIComponent(projectTableName)}/upload_complete/`;
	    const query = new URLSearchParams();
	    if (skippedFileCount !== undefined) (Array.isArray(skippedFileCount) ? skippedFileCount : [skippedFileCount]).forEach(v => query.append('skipped_file_count', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async checkProjectStatus(projectTableName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/project/status/${encodeURIComponent(projectTableName)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getProjectPrelimModelRequestTemplate(projectTableName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/project_outcome/${encodeURIComponent(projectTableName)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getUserProjects() {
	    this._ctx.requireTokens();
	    const path = `/api/v1/projects/user`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getAdminProjects() {
	    this._ctx.requireTokens();
	    const path = `/api/v1/projects/admin`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getProjectById(projectId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getProjectByDirectory(directory) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/projects/directory/${encodeURIComponent(directory)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async updateProject(projectId, { private: private_, type, description, directory, name, thumbnail } = {}) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
	    const body = stripUndef$3({
	      private: private_,
	      type: type,
	      description: description,
	      directory: directory,
	      name: name,
	      thumbnail: thumbnail,
	    });
	    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, body);
	    return data;
	  }

	  async updateProjectPhotoCount(tableName, { filesFailedCount } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/projects_photos/${encodeURIComponent(tableName)}/`;
	    const query = new URLSearchParams();
	    if (filesFailedCount !== undefined) (Array.isArray(filesFailedCount) ? filesFailedCount : [filesFailedCount]).forEach(v => query.append('files_failed_count', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async updateProjectCreateUploadReport(tableName, { filesFailedCount } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/project_upload_report/${encodeURIComponent(tableName)}/`;
	    const query = new URLSearchParams();
	    if (filesFailedCount !== undefined) (Array.isArray(filesFailedCount) ? filesFailedCount : [filesFailedCount]).forEach(v => query.append('files_failed_count', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async requestProjectSimilarityQueue(projectTableName, level) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/projects_similarity_queue/${encodeURIComponent(projectTableName)}/level/${encodeURIComponent(level)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async requestProjectEvidenceQueue(projectTableName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/projects_evidence_queue/${encodeURIComponent(projectTableName)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async requestProjectPersonhoodQueue(projectTableName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/projects_personhood_queue/${encodeURIComponent(projectTableName)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async requestInsightsQueue(analysisLevel, identifier) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/insights_queue/analysis_level/${encodeURIComponent(analysisLevel)}/identifier/${encodeURIComponent(identifier)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async requestProjectExport(projectTableName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/projects_export/${encodeURIComponent(projectTableName)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getProjectProcessStatus(projectTableName, modelName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/projects/${encodeURIComponent(projectTableName)}/process_status/${encodeURIComponent(modelName)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async addProjectEvent(projectTableName, event, detail = undefined) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/projects/${encodeURIComponent(projectTableName)}/event`;
	    const body = stripUndef$3({
	      event: event,
	      detail: detail,
	    });
	    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
	    return data;
	  }

	  async deleteProject(projectId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/projects/${encodeURIComponent(projectId)}`;
	    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }
	}

	class Photoupload {
	  constructor(ctx) { this._ctx = ctx; this._caches = {}; }

	  async uploadPhotoToMediaviz(fileContent, filePath, mimetype, companyId, userId, projectTableName, blur, colors, faceRecognition, imageClassification, imageComparison, imageDescribe, judgmentModel, ocr, { clientSideId, format, size, sourceResolutionX, sourceResolutionY, dateTaken, latitude, longitude } = {}) {
	    this._ctx.requireTokens();
	    const baseUrl = this._ctx.requireHost('photoUpload');
	    const headers = {
	      'Content-Type': 'application/json',
	      'Authorization': `Bearer ${this._ctx.accessToken}`,
	    };
	    const resp = await fetch(baseUrl + `/photo_upload`, {
	      method: 'POST',
	      headers,
	      body: JSON.stringify({ file_content: fileContent, file_path: filePath, mimetype, company_id: companyId, user_id: userId, project_table_name: projectTableName, blur, colors, face_recognition: faceRecognition, image_classification: imageClassification, image_comparison: imageComparison, image_describe: imageDescribe, judgment_model: judgmentModel, ocr, client_side_id: clientSideId, format, size, source_resolution_x: sourceResolutionX, source_resolution_y: sourceResolutionY, date_taken: dateTaken, latitude, longitude }),
	    });
	    return handleResponse(resp);
	  }

	  async uploadPhoto(companyId, userId, projectTableName, photo) {
	    this._ctx.requireTokens();

	    if (!this._caches['_get_template']) this._caches['_get_template'] = new Map();
	    const _cacheKey_get_template = `upload_template:${projectTableName}`;
	    let template = this._caches['_get_template'].get(_cacheKey_get_template);
	    if (template === undefined) {
	      template = (await this._ctx.client.request(`/api/v1/project_outcome/${encodeURIComponent(projectTableName)}`, 'GET', this._ctx.accessToken, this._ctx.refreshToken)).data;
	      this._caches['_get_template'].set(_cacheKey_get_template, template);
	    }

	    const upload_result = await this.uploadPhotoToMediaviz(photo.fileContent, photo.filePath, photo.mimetype, companyId, userId, projectTableName, (((template?.body?.['blur'] ?? template?.headers?.['x-blur']) === true || (template?.body?.['blur'] ?? template?.headers?.['x-blur']) === 'true') ? 'true' : undefined), (((template?.body?.['colors'] ?? template?.headers?.['x-colors']) === true || (template?.body?.['colors'] ?? template?.headers?.['x-colors']) === 'true') ? 'true' : undefined), (((template?.body?.['face_recognition'] ?? template?.headers?.['x-face-recognition']) === true || (template?.body?.['face_recognition'] ?? template?.headers?.['x-face-recognition']) === 'true') ? 'true' : undefined), (((template?.body?.['image_classification'] ?? template?.headers?.['x-image-classification']) === true || (template?.body?.['image_classification'] ?? template?.headers?.['x-image-classification']) === 'true') ? 'true' : undefined), (((template?.body?.['image_comparison'] ?? template?.headers?.['x-image-comparison']) === true || (template?.body?.['image_comparison'] ?? template?.headers?.['x-image-comparison']) === 'true') ? 'true' : undefined), (((template?.body?.['image_describe'] ?? template?.headers?.['x-image-describe']) === true || (template?.body?.['image_describe'] ?? template?.headers?.['x-image-describe']) === 'true') ? 'true' : undefined), undefined, (((template?.body?.['ocr'] ?? template?.headers?.['x-ocr']) === true || (template?.body?.['ocr'] ?? template?.headers?.['x-ocr']) === 'true') ? 'true' : undefined), { clientSideId: photo.clientSideId, format: photo.format, size: photo.size, sourceResolutionX: photo.sourceResolutionX, sourceResolutionY: photo.sourceResolutionY, dateTaken: photo.dateTaken, latitude: photo.latitude, longitude: photo.longitude });

	    return upload_result;
	  }
	}

	class Photos {
	  constructor(ctx) { this._ctx = ctx; }

	  async getPhotoFromProject(tableName, photoId, { keywordListId } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/${encodeURIComponent(photoId)}`;
	    const query = new URLSearchParams();
	    if (keywordListId !== undefined) (Array.isArray(keywordListId) ? keywordListId : [keywordListId]).forEach(v => query.append('keyword_list_id', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getPhotoFaceDetailsFromProject(tableName, photoId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/photos/face_details/${encodeURIComponent(tableName)}/${encodeURIComponent(photoId)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getProjectPhotoIdsByTableName(tableName, { ascOrDesc, lastId, limit, includeAll, startDate, endDate, noDateTaken } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/`;
	    const query = new URLSearchParams();
	    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
	    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
	    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
	    if (includeAll !== undefined) (Array.isArray(includeAll) ? includeAll : [includeAll]).forEach(v => query.append('include_all', v));
	    if (startDate !== undefined) (Array.isArray(startDate) ? startDate : [startDate]).forEach(v => query.append('start_date', v));
	    if (endDate !== undefined) (Array.isArray(endDate) ? endDate : [endDate]).forEach(v => query.append('end_date', v));
	    if (noDateTaken !== undefined) (Array.isArray(noDateTaken) ? noDateTaken : [noDateTaken]).forEach(v => query.append('no_date_taken', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getRankedProjectPhotoIdsByTableName(tableName, { ascOrDesc, lastId, limit, startDate, endDate, noDateTaken } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/photos/ranked/${encodeURIComponent(tableName)}/`;
	    const query = new URLSearchParams();
	    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
	    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
	    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
	    if (startDate !== undefined) (Array.isArray(startDate) ? startDate : [startDate]).forEach(v => query.append('start_date', v));
	    if (endDate !== undefined) (Array.isArray(endDate) ? endDate : [endDate]).forEach(v => query.append('end_date', v));
	    if (noDateTaken !== undefined) (Array.isArray(noDateTaken) ? noDateTaken : [noDateTaken]).forEach(v => query.append('no_date_taken', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getProjectMonthYearsWithPhotos(tableName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/photo_month_years/${encodeURIComponent(tableName)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async updatePhotoInProject({ tableName, photoId, photoData } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/photos_update`;
	    const query = new URLSearchParams();
	    if (tableName !== undefined) (Array.isArray(tableName) ? tableName : [tableName]).forEach(v => query.append('table_name', v));
	    if (photoId !== undefined) (Array.isArray(photoId) ? photoId : [photoId]).forEach(v => query.append('photo_id', v));
	    if (photoData !== undefined) (Array.isArray(photoData) ? photoData : [photoData]).forEach(v => query.append('photo_data', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async updatePhotoRanking(tableName, photoId, newCategory) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/photos_update/${encodeURIComponent(tableName)}/id/${encodeURIComponent(photoId)}/rank/${encodeURIComponent(newCategory)}`;
	    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async deletePhotoFromProject(tableName, { photoIds } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/delete/`;
	    const query = new URLSearchParams();
	    if (photoIds !== undefined) (Array.isArray(photoIds) ? photoIds : [photoIds]).forEach(v => query.append('photo_ids', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }
	}

	function stripUndef$2(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

	class Search {
	  constructor(ctx) { this._ctx = ctx; }

	  async searchProjectPhotos(projectTableName, { andParams, andStringParams, orParams, orStringParams, notParams, notStringParams, dateMin, dateMax, dateNullAnd, dateNullOr, dateOrder, customAlbumId, bestOfSimilarSetsOnly, curatedAlbumId, splitByTier } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/search/${encodeURIComponent(projectTableName)}/`;
	    const query = new URLSearchParams();
	    if (andParams !== undefined) (Array.isArray(andParams) ? andParams : [andParams]).forEach(v => query.append('and_params', v));
	    if (andStringParams !== undefined) (Array.isArray(andStringParams) ? andStringParams : [andStringParams]).forEach(v => query.append('and_string_params', v));
	    if (orParams !== undefined) (Array.isArray(orParams) ? orParams : [orParams]).forEach(v => query.append('or_params', v));
	    if (orStringParams !== undefined) (Array.isArray(orStringParams) ? orStringParams : [orStringParams]).forEach(v => query.append('or_string_params', v));
	    if (notParams !== undefined) (Array.isArray(notParams) ? notParams : [notParams]).forEach(v => query.append('not_params', v));
	    if (notStringParams !== undefined) (Array.isArray(notStringParams) ? notStringParams : [notStringParams]).forEach(v => query.append('not_string_params', v));
	    if (dateMin !== undefined) (Array.isArray(dateMin) ? dateMin : [dateMin]).forEach(v => query.append('date_min', v));
	    if (dateMax !== undefined) (Array.isArray(dateMax) ? dateMax : [dateMax]).forEach(v => query.append('date_max', v));
	    if (dateNullAnd !== undefined) (Array.isArray(dateNullAnd) ? dateNullAnd : [dateNullAnd]).forEach(v => query.append('date_null_and', v));
	    if (dateNullOr !== undefined) (Array.isArray(dateNullOr) ? dateNullOr : [dateNullOr]).forEach(v => query.append('date_null_or', v));
	    if (dateOrder !== undefined) (Array.isArray(dateOrder) ? dateOrder : [dateOrder]).forEach(v => query.append('date_order', v));
	    if (customAlbumId !== undefined) (Array.isArray(customAlbumId) ? customAlbumId : [customAlbumId]).forEach(v => query.append('custom_album_id', v));
	    if (bestOfSimilarSetsOnly !== undefined) (Array.isArray(bestOfSimilarSetsOnly) ? bestOfSimilarSetsOnly : [bestOfSimilarSetsOnly]).forEach(v => query.append('best_of_similar_sets_only', v));
	    if (curatedAlbumId !== undefined) (Array.isArray(curatedAlbumId) ? curatedAlbumId : [curatedAlbumId]).forEach(v => query.append('curated_album_id', v));
	    if (splitByTier !== undefined) (Array.isArray(splitByTier) ? splitByTier : [splitByTier]).forEach(v => query.append('split_by_tier', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async searchProjectPhotosParametrized(projectTableName, { andSearchText, orSearchText, notSearchText, city, country, state, albums, dateMin, dateMax, dateNullAnd, dateNullOr, ascOrDesc, bestOfSimilarSetsOnly, splitByTier, lastId, limit } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/search/parametrized/${encodeURIComponent(projectTableName)}/`;
	    const query = new URLSearchParams();
	    if (andSearchText !== undefined) (Array.isArray(andSearchText) ? andSearchText : [andSearchText]).forEach(v => query.append('and_search_text', v));
	    if (orSearchText !== undefined) (Array.isArray(orSearchText) ? orSearchText : [orSearchText]).forEach(v => query.append('or_search_text', v));
	    if (notSearchText !== undefined) (Array.isArray(notSearchText) ? notSearchText : [notSearchText]).forEach(v => query.append('not_search_text', v));
	    if (city !== undefined) (Array.isArray(city) ? city : [city]).forEach(v => query.append('city', v));
	    if (country !== undefined) (Array.isArray(country) ? country : [country]).forEach(v => query.append('country', v));
	    if (state !== undefined) (Array.isArray(state) ? state : [state]).forEach(v => query.append('state', v));
	    if (albums !== undefined) (Array.isArray(albums) ? albums : [albums]).forEach(v => query.append('albums', v));
	    if (dateMin !== undefined) (Array.isArray(dateMin) ? dateMin : [dateMin]).forEach(v => query.append('date_min', v));
	    if (dateMax !== undefined) (Array.isArray(dateMax) ? dateMax : [dateMax]).forEach(v => query.append('date_max', v));
	    if (dateNullAnd !== undefined) (Array.isArray(dateNullAnd) ? dateNullAnd : [dateNullAnd]).forEach(v => query.append('date_null_and', v));
	    if (dateNullOr !== undefined) (Array.isArray(dateNullOr) ? dateNullOr : [dateNullOr]).forEach(v => query.append('date_null_or', v));
	    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
	    if (bestOfSimilarSetsOnly !== undefined) (Array.isArray(bestOfSimilarSetsOnly) ? bestOfSimilarSetsOnly : [bestOfSimilarSetsOnly]).forEach(v => query.append('best_of_similar_sets_only', v));
	    if (splitByTier !== undefined) (Array.isArray(splitByTier) ? splitByTier : [splitByTier]).forEach(v => query.append('split_by_tier', v));
	    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
	    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async recallProjectPhotos(projectTableName, { ascOrDesc, bestOfSimilarSetsOnly, lastId, limit } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/search/recall/${encodeURIComponent(projectTableName)}/`;
	    const query = new URLSearchParams();
	    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
	    if (bestOfSimilarSetsOnly !== undefined) (Array.isArray(bestOfSimilarSetsOnly) ? bestOfSimilarSetsOnly : [bestOfSimilarSetsOnly]).forEach(v => query.append('best_of_similar_sets_only', v));
	    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
	    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async searchProjectPhotosNaturalLanguage(projectTableName, searchText, size = undefined, { minCosine, labelMinCosine, labelTopK, labelDelta, bestOfSimilarSetsOnly, splitByTier } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/search/natural_language/${encodeURIComponent(projectTableName)}/`;
	    const query = new URLSearchParams();
	    if (minCosine !== undefined) (Array.isArray(minCosine) ? minCosine : [minCosine]).forEach(v => query.append('min_cosine', v));
	    if (labelMinCosine !== undefined) (Array.isArray(labelMinCosine) ? labelMinCosine : [labelMinCosine]).forEach(v => query.append('label_min_cosine', v));
	    if (labelTopK !== undefined) (Array.isArray(labelTopK) ? labelTopK : [labelTopK]).forEach(v => query.append('label_top_k', v));
	    if (labelDelta !== undefined) (Array.isArray(labelDelta) ? labelDelta : [labelDelta]).forEach(v => query.append('label_delta', v));
	    if (bestOfSimilarSetsOnly !== undefined) (Array.isArray(bestOfSimilarSetsOnly) ? bestOfSimilarSetsOnly : [bestOfSimilarSetsOnly]).forEach(v => query.append('best_of_similar_sets_only', v));
	    if (splitByTier !== undefined) (Array.isArray(splitByTier) ? splitByTier : [splitByTier]).forEach(v => query.append('split_by_tier', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const body = stripUndef$2({
	      search_text: searchText,
	      size: size,
	    });
	    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
	    return data;
	  }

	  async getProjectSavedSearches(projectTableName) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/search/saved/${encodeURIComponent(projectTableName)}/`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async getSavedSearchById(searchId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/search/${encodeURIComponent(searchId)}`;
	    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async saveProjectPhotosSearch(projectTableName, { searchName, andParams, andStringParams, orParams, orStringParams, notParams, notStringParams, dateMin, dateMax, dateNullAnd, dateNullOr, dateOrder, customAlbumId, bestOfSimilarSetsOnly, curatedAlbumId, splitByTier } = {}) {
	    this._ctx.requireTokens();
	    let path = `/api/v1/search/${encodeURIComponent(projectTableName)}/`;
	    const query = new URLSearchParams();
	    if (searchName !== undefined) (Array.isArray(searchName) ? searchName : [searchName]).forEach(v => query.append('search_name', v));
	    if (andParams !== undefined) (Array.isArray(andParams) ? andParams : [andParams]).forEach(v => query.append('and_params', v));
	    if (andStringParams !== undefined) (Array.isArray(andStringParams) ? andStringParams : [andStringParams]).forEach(v => query.append('and_string_params', v));
	    if (orParams !== undefined) (Array.isArray(orParams) ? orParams : [orParams]).forEach(v => query.append('or_params', v));
	    if (orStringParams !== undefined) (Array.isArray(orStringParams) ? orStringParams : [orStringParams]).forEach(v => query.append('or_string_params', v));
	    if (notParams !== undefined) (Array.isArray(notParams) ? notParams : [notParams]).forEach(v => query.append('not_params', v));
	    if (notStringParams !== undefined) (Array.isArray(notStringParams) ? notStringParams : [notStringParams]).forEach(v => query.append('not_string_params', v));
	    if (dateMin !== undefined) (Array.isArray(dateMin) ? dateMin : [dateMin]).forEach(v => query.append('date_min', v));
	    if (dateMax !== undefined) (Array.isArray(dateMax) ? dateMax : [dateMax]).forEach(v => query.append('date_max', v));
	    if (dateNullAnd !== undefined) (Array.isArray(dateNullAnd) ? dateNullAnd : [dateNullAnd]).forEach(v => query.append('date_null_and', v));
	    if (dateNullOr !== undefined) (Array.isArray(dateNullOr) ? dateNullOr : [dateNullOr]).forEach(v => query.append('date_null_or', v));
	    if (dateOrder !== undefined) (Array.isArray(dateOrder) ? dateOrder : [dateOrder]).forEach(v => query.append('date_order', v));
	    if (customAlbumId !== undefined) (Array.isArray(customAlbumId) ? customAlbumId : [customAlbumId]).forEach(v => query.append('custom_album_id', v));
	    if (bestOfSimilarSetsOnly !== undefined) (Array.isArray(bestOfSimilarSetsOnly) ? bestOfSimilarSetsOnly : [bestOfSimilarSetsOnly]).forEach(v => query.append('best_of_similar_sets_only', v));
	    if (curatedAlbumId !== undefined) (Array.isArray(curatedAlbumId) ? curatedAlbumId : [curatedAlbumId]).forEach(v => query.append('curated_album_id', v));
	    if (splitByTier !== undefined) (Array.isArray(splitByTier) ? splitByTier : [splitByTier]).forEach(v => query.append('split_by_tier', v));
	    const qs = query.toString();
	    if (qs) path += '?' + qs;
	    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }

	  async deleteSavedSearchById(searchId) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/search/${encodeURIComponent(searchId)}`;
	    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
	    return data;
	  }
	}

	function stripUndef$1(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

	class Subscription {
	  constructor(ctx) { this._ctx = ctx; }

	  async createSubscription(projectTableName, callbackUrl, targets) {
	    this._ctx.requireTokens();
	    const path = `/api/v1/subscriptions`;
	    const body = stripUndef$1({
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
	    const body = stripUndef$1({
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

	function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

	class Users {
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

	// Auto-generated — do not edit

	function _env(key) {
	  if (typeof process !== 'undefined' && process.env) return process.env[key];
	  return undefined;
	}

	class _Context {
	  constructor(mv) { this._mv = mv; }
	  get client() { return this._mv._oauthClient; }
	  get accessToken() { return this._mv._accessToken; }
	  get refreshToken() { return this._mv._refreshToken; }
	  get baseUrl() { return this._mv._config.baseUrl; }
	  get hosts() { return this._mv._hosts; }
	  requireHost(key) {
	    const url = this._mv._hosts[key];
	    if (!url) throw new Error(`Host '${key}' not configured. Pass hosts.${key} in MediaViz constructor or set the corresponding env var.`);
	    return url;
	  }
	  requireTokens() {
	    if (!this._mv._accessToken) throw new Error('Not authenticated. Call authenticate(), handleCallback(), or setTokens() first.');
	  }
	}

	class _TokenTrackingClient {
	  constructor(mv, inner) { this._mv = mv; this._inner = inner; }
	  async request(url, method, accessToken, refreshToken, body) {
	    const onRefreshSuccess = (newTokens) => {
	      this._mv._accessToken = newTokens.access_token;
	      this._mv._refreshToken = newTokens.refresh_token;
	      if (this._mv._onTokenRefresh) this._mv._onTokenRefresh(newTokens);
	    };
	    return this._inner.request(url, method, accessToken, refreshToken, body, onRefreshSuccess);
	  }
	}

	class MediaViz {
	  constructor(config = {}) {
	    this._config = {
	      clientId: config.clientId ?? _env('MEDIAVIZ_CLIENT_ID'),
	      clientSecret: config.clientSecret ?? _env('MEDIAVIZ_CLIENT_SECRET'),
	      baseUrl: config.baseUrl ?? _env('MEDIAVIZ_BASE_URL') ?? 'https://api.mediaviz.ai',
	      redirectUri: config.redirectUri ?? _env('MEDIAVIZ_REDIRECT_URI'),
	    };
	    this._hosts = {
	      photoUpload: config.hosts?.photoUpload ?? _env('MEDIAVIZ_PHOTO_UPLOAD_URL'),
	      ...(config.hosts || {}),
	    };
	    this._accessToken = config.accessToken ?? null;
	    this._refreshToken = config.refreshToken ?? null;
	    this._onTokenRefresh = config.onTokenRefresh ?? null;

	    const _inner = new OAuthClient({
	      clientId: this._config.clientId,
	      clientSecret: this._config.clientSecret,
	      baseUrl: this._config.baseUrl,
	      redirectUri: this._config.redirectUri,
	    });
	    this._oauthClient = new _TokenTrackingClient(this, _inner);

	    const _ctx = new _Context(this);
	    this.aiModelCredits = new AiModelCredits(_ctx);
	    this.admin = new Admin(_ctx);
	    this.company = new Company(_ctx);
	    this.curatedAlbums = new CuratedAlbums(_ctx);
	    this.customAlbums = new CustomAlbums(_ctx);
	    this.emailTokens = new EmailTokens(_ctx);
	    this.health = new Health(_ctx);
	    this.keywords = new Keywords(_ctx);
	    this.oAuthAuthorization = new OauthAuthorization(_ctx);
	    this.oAuthToken = new OauthToken(_ctx);
	    this.oauthLogin = new OauthLogin(_ctx);
	    this.person = new Person(_ctx);
	    this.photoUpload = new Photoupload(_ctx);
	    this.photos = new Photos(_ctx);
	    this.projects = new Projects(_ctx);
	    this.search = new Search(_ctx);
	    this.subscription = new Subscription(_ctx);
	    this.users = new Users(_ctx);
	    this.webhooks = new WebhookConsumer(_ctx, this.subscription);
	  }

	  async authenticate() {
	    const tokens = await this._oauthClient._inner.getClientCredentialsToken();
	    this._accessToken = tokens.access_token;
	    this._refreshToken = tokens.refresh_token ?? null;
	    return tokens;
	  }

	  async getAuthorizationUrl(state) {
	    return this._oauthClient._inner.generateAuthorizationUrl(state);
	  }

	  async handleCallback(code, codeVerifier) {
	    const tokens = await this._oauthClient._inner.exchangeCode(code, codeVerifier);
	    this._accessToken = tokens.access_token;
	    this._refreshToken = tokens.refresh_token;
	    return tokens;
	  }

	  setTokens(accessToken, refreshToken) {
	    this._accessToken = accessToken;
	    this._refreshToken = refreshToken;
	  }

	  get accessToken() { return this._accessToken; }
	  get refreshToken() { return this._refreshToken; }
	}

	exports.Admin = Admin;
	exports.AiModelCredits = AiModelCredits;
	exports.ApiError = ApiError;
	exports.Company = Company;
	exports.CuratedAlbums = CuratedAlbums;
	exports.CustomAlbums = CustomAlbums;
	exports.EmailTokens = EmailTokens;
	exports.Health = Health;
	exports.InMemoryWebhookStore = InMemoryWebhookStore;
	exports.Keywords = Keywords;
	exports.MediaViz = MediaViz;
	exports.NotFoundError = NotFoundError;
	exports.OAuthClient = OAuthClient;
	exports.OAuthError = OAuthError;
	exports.OAuthErrorCode = OAuthErrorCode;
	exports.OauthAuthorization = OauthAuthorization;
	exports.OauthLogin = OauthLogin;
	exports.OauthToken = OauthToken;
	exports.Person = Person;
	exports.Photos = Photos;
	exports.Photoupload = Photoupload;
	exports.Projects = Projects;
	exports.RateLimitError = RateLimitError;
	exports.Search = Search;
	exports.ServerError = ServerError;
	exports.Subscription = Subscription;
	exports.Users = Users;
	exports.ValidationError = ValidationError;
	exports.WEBHOOK_MODEL_COLUMNS = WEBHOOK_MODEL_COLUMNS;
	exports.WEBHOOK_OUTCOME_MODELS = WEBHOOK_OUTCOME_MODELS;
	exports.WebhookConsumer = WebhookConsumer;
	exports.handleResponse = handleResponse;
	exports.selectResultColumns = selectResultColumns;
	exports.signWebhookPayload = signWebhookPayload;
	exports.verifyWebhookSignature = verifyWebhookSignature;

}));
