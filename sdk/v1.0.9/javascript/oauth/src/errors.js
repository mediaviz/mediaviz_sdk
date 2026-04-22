'use strict';

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

module.exports = { OAuthError };
