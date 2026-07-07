'use strict';

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

module.exports = { OAuthError };
