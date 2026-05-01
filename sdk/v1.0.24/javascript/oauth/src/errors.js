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
    if (body && typeof body === 'object' && typeof body.error === 'string') {
      return new OAuthError(body.error, body.error_description ?? '', status, body);
    }
    return new OAuthError('server_error', 'Unexpected server response', status, body);
  }
}

module.exports = { OAuthError };
