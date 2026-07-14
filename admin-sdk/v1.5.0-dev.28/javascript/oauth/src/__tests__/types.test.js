'use strict';

const { OAuthErrorCode } = require('../types');

describe('OAuthErrorCode', () => {
  test('has all required error codes with correct values', () => {
    expect(OAuthErrorCode.INVALID_REQUEST).toBe('invalid_request');
    expect(OAuthErrorCode.INVALID_CLIENT).toBe('invalid_client');
    expect(OAuthErrorCode.INVALID_GRANT).toBe('invalid_grant');
    expect(OAuthErrorCode.UNAUTHORIZED_CLIENT).toBe('unauthorized_client');
    expect(OAuthErrorCode.UNSUPPORTED_GRANT_TYPE).toBe('unsupported_grant_type');
    expect(OAuthErrorCode.ACCESS_DENIED).toBe('access_denied');
    expect(OAuthErrorCode.SERVER_ERROR).toBe('server_error');
  });

  test('is frozen (immutable)', () => {
    expect(Object.isFrozen(OAuthErrorCode)).toBe(true);
  });

  test('mutation attempt does not change values', () => {
    const original = OAuthErrorCode.INVALID_REQUEST;
    try { OAuthErrorCode.INVALID_REQUEST = 'mutated'; } catch (_) {}
    expect(OAuthErrorCode.INVALID_REQUEST).toBe(original);
  });

  test('has exactly 7 entries', () => {
    expect(Object.keys(OAuthErrorCode).length).toBe(7);
  });
});
