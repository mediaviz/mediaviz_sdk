'use strict';

const { startAuthSession, parseRedirectUrl, AuthSessionError } = require('../authSession');

const AUTH = { url: 'https://auth.example.com/oauth/authorize?x=1', state: 'st-123', code_verifier: 'ver-456' };

function makeClient(overrides = {}) {
  return {
    getAuthorizationUrl: jest.fn(async () => AUTH),
    handleCallback: jest.fn(async () => ({ access_token: 'tok', refresh_token: 'ref' })),
    ...overrides,
  };
}

const success = (url) => async () => ({ type: 'success', url });

describe('parseRedirectUrl', () => {
  test('parses a custom-scheme redirect', () => {
    expect(parseRedirectUrl('mediaviz://callback?code=abc&state=st-123')).toEqual({ code: 'abc', state: 'st-123' });
  });

  test('parses fragment params', () => {
    expect(parseRedirectUrl('mediaviz://cb#code=abc&state=s')).toEqual({ code: 'abc', state: 's' });
  });

  test('parses query and fragment together', () => {
    expect(parseRedirectUrl('mediaviz://cb?code=abc#state=s')).toEqual({ code: 'abc', state: 's' });
  });

  test('percent- and plus-decodes values', () => {
    const out = parseRedirectUrl('mediaviz://cb?error_description=Access+was%20denied');
    expect(out.error_description).toBe('Access was denied');
  });

  test('keeps a malformed escape rather than throwing', () => {
    expect(parseRedirectUrl('mediaviz://cb?code=%E0%A4%A').code).toBe('%E0%A4%A');
  });

  test.each([
    ['no query at all', 'mediaviz://callback'],
    ['empty string', ''],
    ['null', null],
  ])('returns {} for %s', (_label, url) => {
    expect(parseRedirectUrl(url)).toEqual({});
  });

  test('handles a valueless key', () => {
    expect(parseRedirectUrl('mediaviz://cb?code')).toEqual({ code: '' });
  });
});

describe('startAuthSession', () => {
  test.each([
    ['no openAuthSession', { redirectUri: 'mediaviz://cb' }],
    ['no redirectUri', { openAuthSession: success('mediaviz://cb?code=a&state=st-123') }],
  ])('rejects a misconfigured call (%s)', async (_label, options) => {
    await expect(startAuthSession(makeClient(), options)).rejects.toThrow(TypeError);
  });

  test('exchanges the code and returns tokens', async () => {
    const client = makeClient();
    const tokens = await startAuthSession(client, {
      openAuthSession: success('mediaviz://cb?code=auth-code&state=st-123'),
      redirectUri: 'mediaviz://cb',
    });
    expect(tokens).toEqual({ access_token: 'tok', refresh_token: 'ref' });
    expect(client.handleCallback).toHaveBeenCalledWith('auth-code', 'ver-456');
  });

  test('passes redirectUri and session options to the browser', async () => {
    const open = jest.fn(success('mediaviz://cb?code=a&state=st-123'));
    await startAuthSession(makeClient(), {
      openAuthSession: open,
      redirectUri: 'mediaviz://cb',
      sessionOptions: { showInRecents: true },
    });
    expect(open).toHaveBeenCalledWith(AUTH.url, 'mediaviz://cb', { showInRecents: true });
  });

  test.each([
    ['cancel', { type: 'cancel' }, 'cancelled'],
    ['dismiss', { type: 'dismiss' }, 'cancelled'],
    ['locked', { type: 'locked' }, 'failed'],
    ['success with no url', { type: 'success' }, 'failed'],
    ['no result', undefined, 'failed'],
  ])('maps a %s browser result to code %s', async (_label, result, code) => {
    await expect(
      startAuthSession(makeClient(), { openAuthSession: async () => result, redirectUri: 'mediaviz://cb' })
    ).rejects.toMatchObject({ name: 'AuthSessionError', code });
  });

  test('surfaces an OAuth error redirect', async () => {
    const promise = startAuthSession(makeClient(), {
      openAuthSession: success('mediaviz://cb?error=access_denied&error_description=Nope&state=st-123'),
      redirectUri: 'mediaviz://cb',
    });
    await expect(promise).rejects.toMatchObject({ code: 'access_denied', message: 'Nope' });
  });

  test.each([
    ['a forged state', 'mediaviz://cb?code=a&state=attacker'],
    ['a missing state', 'mediaviz://cb?code=a'],
  ])('rejects %s without exchanging the code', async (_label, url) => {
    const client = makeClient();
    await expect(
      startAuthSession(client, { openAuthSession: success(url), redirectUri: 'mediaviz://cb' })
    ).rejects.toMatchObject({ code: 'state_mismatch' });
    expect(client.handleCallback).not.toHaveBeenCalled();
  });

  test('rejects a redirect with no code', async () => {
    await expect(
      startAuthSession(makeClient(), { openAuthSession: success('mediaviz://cb?state=st-123'), redirectUri: 'mediaviz://cb' })
    ).rejects.toMatchObject({ code: 'no_code' });
  });

  test('forwards a caller-supplied state to the client', async () => {
    const client = makeClient();
    await startAuthSession(client, {
      openAuthSession: success('mediaviz://cb?code=a&state=st-123'),
      redirectUri: 'mediaviz://cb',
      state: 'mine',
    });
    expect(client.getAuthorizationUrl).toHaveBeenCalledWith('mine');
  });

  test('AuthSessionError is an Error', () => {
    expect(new AuthSessionError('x', 'y')).toBeInstanceOf(Error);
  });
});
