/**
 * @typedef {Object} OAuthClientConfig
 * @property {string} baseUrl - Base URL of the OAuth server
 * @property {string} clientId - Registered client_id
 * @property {string} clientSecret - Registered client_secret
 * @property {string} redirectUri - Registered redirect URI
 */

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

module.exports = { OAuthErrorCode };
