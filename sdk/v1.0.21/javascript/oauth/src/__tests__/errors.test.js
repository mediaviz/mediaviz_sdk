'use strict';

const { OAuthError } = require('../errors');

describe('OAuthError', () => {
  test('is instanceof Error', () => {
    const err = new OAuthError('invalid_grant', 'token expired', 400);
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(OAuthError);
  });

  test('stores code, description, httpStatus', () => {
    const err = new OAuthError('invalid_client', 'bad creds', 401);
    expect(err.code).toBe('invalid_client');
    expect(err.description).toBe('bad creds');
    expect(err.httpStatus).toBe(401);
    expect(err.message).toBe('bad creds');
  });

  test('fromResponse parses RFC 6749 body', () => {
    const err = OAuthError.fromResponse(400, {
      error: 'invalid_grant',
      error_description: 'Authorization code expired',
    });
    expect(err.code).toBe('invalid_grant');
    expect(err.description).toBe('Authorization code expired');
    expect(err.httpStatus).toBe(400);
    expect(err).toBeInstanceOf(OAuthError);
  });

  test('fromResponse handles missing error_description', () => {
    const err = OAuthError.fromResponse(400, { error: 'access_denied' });
    expect(err.code).toBe('access_denied');
    expect(err.description).toBe('');
  });

  test('fromResponse falls back for non-RFC body (object without error)', () => {
    const err = OAuthError.fromResponse(500, { message: 'crash' });
    expect(err.code).toBe('server_error');
    expect(err.description).toBe('Unexpected server response');
    expect(err.httpStatus).toBe(500);
  });

  test('fromResponse falls back for null body', () => {
    const err = OAuthError.fromResponse(502, null);
    expect(err.code).toBe('server_error');
    expect(err.httpStatus).toBe(502);
  });

  test('fromResponse falls back for string body', () => {
    const err = OAuthError.fromResponse(503, 'Service Unavailable');
    expect(err.code).toBe('server_error');
  });
});
