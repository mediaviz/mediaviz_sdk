'use strict';

const { OAuthClient } = require('../client');
const { OAuthError } = require('../errors');

const config = {
  baseUrl: 'https://auth.example.com',
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
  redirectUri: 'https://myapp.com/callback',
};

function makeFetchMock(status, body) {
  return jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
}

describe('OAuthClient', () => {
  let client;

  beforeEach(() => {
    client = new OAuthClient(config);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('generateAuthorizationUrl', () => {
    it('returns url, state, and code_verifier', async () => {
      const result = await client.generateAuthorizationUrl();
      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('state');
      expect(result).toHaveProperty('code_verifier');
    });

    it('url contains required OAuth params', async () => {
      const result = await client.generateAuthorizationUrl();
      const url = new URL(result.url);
      expect(url.searchParams.get('response_type')).toBe('code');
      expect(url.searchParams.get('client_id')).toBe(config.clientId);
      expect(url.searchParams.get('redirect_uri')).toBe(config.redirectUri);
      expect(url.searchParams.get('code_challenge_method')).toBe('S256');
      expect(url.searchParams.get('state')).toBe(result.state);
      expect(url.searchParams.get('code_challenge')).toBeTruthy();
    });

    it('url base matches baseUrl + /oauth/authorize', async () => {
      const result = await client.generateAuthorizationUrl();
      expect(result.url).toMatch(/^https:\/\/auth\.example\.com\/oauth\/authorize/);
    });

    it('code_verifier is 64 chars', async () => {
      const result = await client.generateAuthorizationUrl();
      expect(result.code_verifier).toHaveLength(64);
    });

    it('state is 32 chars', async () => {
      const result = await client.generateAuthorizationUrl();
      expect(result.state).toHaveLength(32);
    });

    it('uses provided state', async () => {
      const result = await client.generateAuthorizationUrl('my-state');
      expect(result.state).toBe('my-state');
      const url = new URL(result.url);
      expect(url.searchParams.get('state')).toBe('my-state');
    });
  });

  describe('exchangeCode', () => {
    it('POSTs to /oauth/token with correct params and returns TokenResponse', async () => {
      const tokenResponse = {
        access_token: 'access-tok',
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'refresh-tok',
      };
      const mockFetch = makeFetchMock(200, tokenResponse);
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      const result = await client.exchangeCode('auth-code', 'verifier123');

      expect(result).toEqual(tokenResponse);
      const [url, options] = mockFetch.mock.calls[0];
      expect(url).toBe('https://auth.example.com/oauth/token');
      expect(options.method).toBe('POST');
      const body = new URLSearchParams(options.body);
      expect(body.get('grant_type')).toBe('authorization_code');
      expect(body.get('code')).toBe('auth-code');
      expect(body.get('code_verifier')).toBe('verifier123');
      expect(body.get('redirect_uri')).toBe(config.redirectUri);
      expect(body.get('client_id')).toBe(config.clientId);
      expect(body.get('client_secret')).toBe(config.clientSecret);
    });

    it('uses provided redirectUri when given', async () => {
      const mockFetch = makeFetchMock(200, { access_token: 'a', token_type: 'bearer', expires_in: 3600, refresh_token: 'r' });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await client.exchangeCode('code', 'verifier', 'https://other.com/cb');

      const [, options] = mockFetch.mock.calls[0];
      const body = new URLSearchParams(options.body);
      expect(body.get('redirect_uri')).toBe('https://other.com/cb');
    });

    it('throws OAuthError on non-2xx', async () => {
      const mockFetch = makeFetchMock(400, { error: 'invalid_grant', error_description: 'Bad code' });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await expect(client.exchangeCode('bad-code', 'verifier')).rejects.toBeInstanceOf(OAuthError);
    });
  });

  describe('refreshAccessToken', () => {
    it('POSTs to /oauth/token with grant_type=refresh_token', async () => {
      const tokenResponse = {
        access_token: 'new-access',
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'new-refresh',
      };
      const mockFetch = makeFetchMock(200, tokenResponse);
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      const result = await client.refreshAccessToken('old-refresh');

      expect(result).toEqual(tokenResponse);
      const [url, options] = mockFetch.mock.calls[0];
      expect(url).toBe('https://auth.example.com/oauth/token');
      const body = new URLSearchParams(options.body);
      expect(body.get('grant_type')).toBe('refresh_token');
      expect(body.get('refresh_token')).toBe('old-refresh');
      expect(body.get('client_id')).toBe(config.clientId);
      expect(body.get('client_secret')).toBe(config.clientSecret);
    });

    it('throws OAuthError on non-2xx', async () => {
      const mockFetch = makeFetchMock(401, { error: 'invalid_grant', error_description: 'Expired' });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await expect(client.refreshAccessToken('bad-refresh')).rejects.toBeInstanceOf(OAuthError);
    });
  });

  describe('revokeToken', () => {
    it('POSTs to /oauth/revoke with token', async () => {
      const mockFetch = makeFetchMock(200, {});
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await expect(client.revokeToken('some-token')).resolves.toBeUndefined();

      const [url, options] = mockFetch.mock.calls[0];
      expect(url).toBe('https://auth.example.com/oauth/revoke');
      const body = new URLSearchParams(options.body);
      expect(body.get('token')).toBe('some-token');
    });

    it('includes token_type_hint when provided', async () => {
      const mockFetch = makeFetchMock(200, {});
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await client.revokeToken('tok', 'access_token');

      const [, options] = mockFetch.mock.calls[0];
      const body = new URLSearchParams(options.body);
      expect(body.get('token_type_hint')).toBe('access_token');
    });

    it('omits token_type_hint when not provided', async () => {
      const mockFetch = makeFetchMock(200, {});
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await client.revokeToken('tok');

      const [, options] = mockFetch.mock.calls[0];
      const body = new URLSearchParams(options.body);
      expect(body.get('token_type_hint')).toBeNull();
    });
  });

  describe('request', () => {
    const freshTokens = {
      access_token: 'new-access',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'new-refresh',
    };

    it('returns data with updatedTokens null on 2xx (no 401)', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true, status: 200, json: () => Promise.resolve({ user: 'alice' }),
      });

      const result = await client.request('https://api.example.com/me', 'GET', 'access-tok', 'refresh-tok');

      expect(result.data).toEqual({ user: 'alice' });
      expect(result.updatedTokens).toBeNull();
    });

    it('attaches Authorization header on initial request', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true, status: 200, json: () => Promise.resolve({}),
      });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await client.request('https://api.example.com/me', 'GET', 'my-token', 'refresh-tok');

      expect(mockFetch.mock.calls[0][1].headers.Authorization).toBe('Bearer my-token');
    });

    it('returns data and updatedTokens on 401 → refresh → retry success', async () => {
      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({}) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(freshTokens) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ user: 'alice' }) });

      const result = await client.request('https://api.example.com/me', 'GET', 'old-access', 'refresh-tok');

      expect(result.data).toEqual({ user: 'alice' });
      expect(result.updatedTokens).toEqual(freshTokens);
    });

    it('propagates OAuthError when refresh fails on 401', async () => {
      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({}) })
        .mockResolvedValueOnce({
          ok: false, status: 400,
          json: () => Promise.resolve({ error: 'invalid_grant', error_description: 'Token expired' }),
        });

      await expect(
        client.request('https://api.example.com/me', 'GET', 'old-access', 'bad-refresh')
      ).rejects.toBeInstanceOf(OAuthError);
    });

    it('throws OAuthError when retry after refresh also returns 401', async () => {
      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({}) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(freshTokens) })
        .mockResolvedValueOnce({
          ok: false, status: 401,
          json: () => Promise.resolve({ error: 'invalid_token', error_description: 'Token invalid' }),
        });

      await expect(
        client.request('https://api.example.com/me', 'GET', 'old-access', 'refresh-tok')
      ).rejects.toBeInstanceOf(OAuthError);
    });

    it('uses new access token in Authorization header on retry', async () => {
      const mockFetch = jest.fn()
        .mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({}) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(freshTokens) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await client.request('https://api.example.com/me', 'GET', 'old-access', 'refresh-tok');

      expect(mockFetch.mock.calls[0][1].headers.Authorization).toBe('Bearer old-access');
      expect(mockFetch.mock.calls[2][1].headers.Authorization).toBe('Bearer new-access');
    });

    it('sends body as JSON with Content-Type header for non-GET', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true, status: 200, json: () => Promise.resolve({ created: true }),
      });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await client.request('https://api.example.com/items', 'POST', 'access-tok', 'refresh-tok', { name: 'test' });

      const [, options] = mockFetch.mock.calls[0];
      expect(options.headers['Content-Type']).toBe('application/json');
      expect(options.body).toBe(JSON.stringify({ name: 'test' }));
    });
  });

  describe('decodeAccessToken', () => {
    it('decodes JWT payload without signature verification', () => {
      const payload = { user_id: 'u1', client_id: 'c1', jti: 'j1', iat: 1000, exp: 2000 };
      const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
      const jwt = `header.${encoded}.signature`;

      const result = client.decodeAccessToken(jwt);

      expect(result).toEqual(payload);
    });

    it('throws OAuthError on malformed JWT (no dot separator)', () => {
      expect(() => client.decodeAccessToken('notajwt')).toThrow(OAuthError);
    });

    it('handles base64url encoded payload needing padding', () => {
      const payload = { user_id: 'user-abc' };
      const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
      const jwt = `h.${encoded}.s`;
      expect(client.decodeAccessToken(jwt)).toMatchObject({ user_id: 'user-abc' });
    });
  });
});
