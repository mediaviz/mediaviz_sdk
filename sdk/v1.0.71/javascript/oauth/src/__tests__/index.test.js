'use strict';

const sdk = require('../index');

describe('barrel export (index.js)', () => {
  test('exports OAuthClient', () => {
    expect(typeof sdk.OAuthClient).toBe('function');
  });

  test('exports OAuthError', () => {
    expect(typeof sdk.OAuthError).toBe('function');
  });

  test('exports OAuthErrorCode', () => {
    expect(typeof sdk.OAuthErrorCode).toBe('object');
    expect(sdk.OAuthErrorCode).not.toBeNull();
  });

  test('OAuthErrorCode is frozen', () => {
    expect(Object.isFrozen(sdk.OAuthErrorCode)).toBe(true);
  });

  test('OAuthErrorCode contains required codes', () => {
    expect(sdk.OAuthErrorCode.INVALID_REQUEST).toBe('invalid_request');
    expect(sdk.OAuthErrorCode.INVALID_CLIENT).toBe('invalid_client');
    expect(sdk.OAuthErrorCode.INVALID_GRANT).toBe('invalid_grant');
    expect(sdk.OAuthErrorCode.UNAUTHORIZED_CLIENT).toBe('unauthorized_client');
    expect(sdk.OAuthErrorCode.UNSUPPORTED_GRANT_TYPE).toBe('unsupported_grant_type');
    expect(sdk.OAuthErrorCode.ACCESS_DENIED).toBe('access_denied');
    expect(sdk.OAuthErrorCode.SERVER_ERROR).toBe('server_error');
  });

  test('OAuthClient is instantiable with config', () => {
    const client = new sdk.OAuthClient({
      baseUrl: 'https://auth.example.com',
      clientId: 'cid',
      clientSecret: 'csecret',
      redirectUri: 'https://myapp.com/callback',
    });
    expect(client).toBeInstanceOf(sdk.OAuthClient);
  });

  test('OAuthError is a subclass of Error', () => {
    const err = new sdk.OAuthError('server_error', 'boom', 500);
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(sdk.OAuthError);
  });

  test('no unexpected exports', () => {
    const keys = Object.keys(sdk);
    expect(keys.sort()).toEqual(['OAuthClient', 'OAuthError', 'OAuthErrorCode'].sort());
  });
});
