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

  test('body defaults to null when omitted from constructor', () => {
    const err = new OAuthError('invalid_client', 'bad creds', 401);
    expect(err.body).toBeNull();
  });

  test('constructor stores body when provided', () => {
    const body = { error: 'invalid_client', request_id: 'abc-123' };
    const err = new OAuthError('invalid_client', 'bad creds', 401, body);
    expect(err.body).toBe(body);
  });

  test('fromResponse parses RFC 6749 body', () => {
    const body = {
      error: 'invalid_grant',
      error_description: 'Authorization code expired',
    };
    const err = OAuthError.fromResponse(400, body);
    expect(err.code).toBe('invalid_grant');
    expect(err.description).toBe('Authorization code expired');
    expect(err.httpStatus).toBe(400);
    expect(err.body).toEqual(body);
    expect(err).toBeInstanceOf(OAuthError);
  });

  test('fromResponse handles missing error_description', () => {
    const body = { error: 'access_denied' };
    const err = OAuthError.fromResponse(400, body);
    expect(err.code).toBe('access_denied');
    expect(err.description).toBe('');
    expect(err.body).toEqual(body);
  });

  test('fromResponse unwraps the FastAPI detail envelope', () => {
    const body = {
      detail: { error: 'invalid_client', error_description: 'Client authentication failed.' },
    };
    const err = OAuthError.fromResponse(401, body);
    expect(err.code).toBe('invalid_client');
    expect(err.description).toBe('Client authentication failed.');
    expect(err.httpStatus).toBe(401);
    expect(err.body).toEqual(body);
  });

  test('fromResponse falls back for non-RFC body (object without error)', () => {
    const body = { message: 'crash' };
    const err = OAuthError.fromResponse(500, body);
    expect(err.code).toBe('server_error');
    expect(err.description).toBe('Unexpected server response');
    expect(err.httpStatus).toBe(500);
    expect(err.body).toEqual(body);
  });

  test('fromResponse falls back for null body', () => {
    const err = OAuthError.fromResponse(502, null);
    expect(err.code).toBe('server_error');
    expect(err.httpStatus).toBe(502);
    expect(err.body).toBeNull();
  });

  test('fromResponse falls back for string body', () => {
    const err = OAuthError.fromResponse(503, 'Service Unavailable');
    expect(err.code).toBe('server_error');
    expect(err.body).toBe('Service Unavailable');
  });
});
