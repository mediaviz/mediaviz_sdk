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

  describe('registerClient', () => {
    it('POSTs JSON to /oauth/clients and returns response', async () => {
      const regResponse = {
        client_id: 'new-id',
        client_name: 'My App',
        client_type: 'confidential',
        redirect_uris: ['https://myapp.com/callback'],
        client_secret: 'secret-123',
      };
      const mockFetch = makeFetchMock(201, regResponse);
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      const result = await OAuthClient.registerClient({
        baseUrl: 'https://auth.example.com',
        clientName: 'My App',
        clientType: 'confidential',
        redirectUris: ['https://myapp.com/callback'],
        isFirstParty: false,
      });

      expect(result).toEqual(regResponse);
      const [url, options] = mockFetch.mock.calls[0];
      expect(url).toBe('https://auth.example.com/oauth/clients');
      expect(options.method).toBe('POST');
      expect(options.headers['Content-Type']).toBe('application/json');
      const body = JSON.parse(options.body);
      expect(body).toEqual({
        client_name: 'My App',
        client_type: 'confidential',
        redirect_uris: ['https://myapp.com/callback'],
        is_first_party: false,
      });
    });

    it('forwards grant_types/company_id and a bearer header for machine-to-machine clients', async () => {
      const mockFetch = makeFetchMock(201, { client_id: 'm2m-id', client_secret: 'secret' });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await OAuthClient.registerClient({
        baseUrl: 'https://auth.example.com',
        clientName: 'Machine Client',
        clientType: 'confidential',
        redirectUris: [],
        isFirstParty: true,
        grantTypes: ['client_credentials'],
        companyId: 42,
        accessToken: 'admin-token',
      });

      const [, options] = mockFetch.mock.calls[0];
      expect(options.headers['Authorization']).toBe('Bearer admin-token');
      const body = JSON.parse(options.body);
      expect(body).toEqual({
        client_name: 'Machine Client',
        client_type: 'confidential',
        redirect_uris: [],
        is_first_party: true,
        grant_types: ['client_credentials'],
        company_id: 42,
      });
    });

    it('strips trailing slash from baseUrl', async () => {
      const mockFetch = makeFetchMock(201, { client_id: 'id' });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await OAuthClient.registerClient({
        baseUrl: 'https://auth.example.com/',
        clientName: 'App',
        clientType: 'public',
        redirectUris: ['https://app.com/cb'],
        isFirstParty: true,
      });

      expect(mockFetch.mock.calls[0][0]).toBe('https://auth.example.com/oauth/clients');
    });

    it('throws OAuthError on non-2xx', async () => {
      const mockFetch = makeFetchMock(400, { error: 'invalid_request', error_description: 'Missing name' });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await expect(OAuthClient.registerClient({
        baseUrl: 'https://auth.example.com',
        clientName: '',
        clientType: 'confidential',
        redirectUris: ['https://app.com/cb'],
        isFirstParty: false,
      })).rejects.toBeInstanceOf(OAuthError);
    });
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

      const result = await client.request('/me', 'GET', 'access-tok', 'refresh-tok');

      expect(fetch).toHaveBeenCalledWith('https://auth.example.com/me', expect.anything());
      expect(result.data).toEqual({ user: 'alice' });
      expect(result.updatedTokens).toBeNull();
    });

    it('attaches Authorization header on initial request', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true, status: 200, json: () => Promise.resolve({}),
      });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await client.request('/me', 'GET', 'my-token', 'refresh-tok');

      expect(mockFetch.mock.calls[0][0]).toBe('https://auth.example.com/me');
      expect(mockFetch.mock.calls[0][1].headers.Authorization).toBe('Bearer my-token');
    });

    it('returns data and updatedTokens on 401 → refresh → retry success', async () => {
      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({}) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(freshTokens) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ user: 'alice' }) });

      const result = await client.request('/me', 'GET', 'old-access', 'refresh-tok');

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
        client.request('/me', 'GET', 'old-access', 'bad-refresh')
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
        client.request('/me', 'GET', 'old-access', 'refresh-tok')
      ).rejects.toBeInstanceOf(OAuthError);
    });

    it('uses new access token in Authorization header on retry', async () => {
      const mockFetch = jest.fn()
        .mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({}) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(freshTokens) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await client.request('/me', 'GET', 'old-access', 'refresh-tok');

      expect(mockFetch.mock.calls[0][0]).toBe('https://auth.example.com/me');
      expect(mockFetch.mock.calls[0][1].headers.Authorization).toBe('Bearer old-access');
      expect(mockFetch.mock.calls[2][0]).toBe('https://auth.example.com/me');
      expect(mockFetch.mock.calls[2][1].headers.Authorization).toBe('Bearer new-access');
    });

    it('re-mints via client_credentials on 401 when there is no refresh token (m2m)', async () => {
      const ccTokens = { access_token: 'cc-access', token_type: 'bearer', expires_in: 3600 };
      const mockFetch = jest.fn()
        .mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({}) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(ccTokens) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ user: 'svc' }) });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      const result = await client.request('/me', 'GET', 'old-access', null);

      expect(result.data).toEqual({ user: 'svc' });
      expect(result.updatedTokens).toEqual(ccTokens);
      expect(mockFetch.mock.calls[1][0]).toBe('https://auth.example.com/oauth/token');
      expect(mockFetch.mock.calls[1][1].body).toContain('grant_type=client_credentials');
      expect(mockFetch.mock.calls[1][1].body).not.toContain('refresh_token');
      expect(mockFetch.mock.calls[2][1].headers.Authorization).toBe('Bearer cc-access');
    });

    it('throws the original 401 when there is neither a refresh token nor a client secret', async () => {
      const publicClient = new OAuthClient({ ...config, clientSecret: '' });
      const mockFetch = jest.fn().mockResolvedValueOnce({
        ok: false, status: 401,
        json: () => Promise.resolve({ error: 'invalid_token', error_description: 'expired' }),
      });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await expect(
        publicClient.request('/me', 'GET', 'old-access', null)
      ).rejects.toBeInstanceOf(OAuthError);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('coalesces concurrent refreshes with same refresh_token into one network call', async () => {
      let releaseRefresh;
      const refreshGate = new Promise((resolve) => { releaseRefresh = resolve; });
      let initialCount = 0;

      const mockFetch = jest.fn().mockImplementation(async (url) => {
        if (url === 'https://auth.example.com/oauth/token') {
          await refreshGate;
          return { ok: true, status: 200, json: () => Promise.resolve(freshTokens) };
        }
        initialCount += 1;
        if (initialCount <= 5) {
          return { ok: false, status: 401, json: () => Promise.resolve({}) };
        }
        return { ok: true, status: 200, json: () => Promise.resolve({ user: 'alice' }) };
      });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      const results = Promise.all(
        Array.from({ length: 5 }, () =>
          client.request('/me', 'GET', 'old-access', 'refresh-tok')
        )
      );
      // Let all 5 initial 401s resolve and reach the refresh coalescing point.
      await new Promise((resolve) => setImmediate(resolve));
      releaseRefresh();

      const all = await results;
      expect(all).toHaveLength(5);
      all.forEach((r) => {
        expect(r.data).toEqual({ user: 'alice' });
        expect(r.updatedTokens).toEqual(freshTokens);
      });

      const refreshCalls = mockFetch.mock.calls.filter(
        ([u]) => u === 'https://auth.example.com/oauth/token'
      );
      expect(refreshCalls).toHaveLength(1);
    });

    it('does not coalesce refreshes for different refresh_tokens', async () => {
      let initialCount = 0;
      const mockFetch = jest.fn().mockImplementation(async (url) => {
        if (url === 'https://auth.example.com/oauth/token') {
          return { ok: true, status: 200, json: () => Promise.resolve(freshTokens) };
        }
        initialCount += 1;
        if (initialCount <= 2) {
          return { ok: false, status: 401, json: () => Promise.resolve({}) };
        }
        return { ok: true, status: 200, json: () => Promise.resolve({ ok: true }) };
      });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await Promise.all([
        client.request('/me', 'GET', 'old-access', 'refresh-A'),
        client.request('/me', 'GET', 'old-access', 'refresh-B'),
      ]);

      const refreshCalls = mockFetch.mock.calls.filter(
        ([u]) => u === 'https://auth.example.com/oauth/token'
      );
      expect(refreshCalls).toHaveLength(2);
    });

    it('clears in-flight entry after failed refresh so subsequent calls can retry', async () => {
      let refreshCount = 0;
      const mockFetch = jest.fn().mockImplementation(async (url) => {
        if (url === 'https://auth.example.com/oauth/token') {
          refreshCount += 1;
          if (refreshCount === 1) {
            return {
              ok: false, status: 400,
              json: () => Promise.resolve({ error: 'invalid_grant', error_description: 'Refresh token not found.' }),
            };
          }
          return { ok: true, status: 200, json: () => Promise.resolve(freshTokens) };
        }
        // Attempt 1 fires 2 concurrent /me calls (both 401). Attempt 2 fires a 3rd /me
        // (401 → triggers refresh) followed by a 4th /me retry (200). So calls 1-3 are
        // 401 and call 4 is 200. mockFetch.mock.calls already includes the in-flight call.
        const meCalls = mockFetch.mock.calls.filter(([u]) => u === 'https://auth.example.com/me').length;
        if (meCalls <= 3) {
          return { ok: false, status: 401, json: () => Promise.resolve({}) };
        }
        return { ok: true, status: 200, json: () => Promise.resolve({ ok: true }) };
      });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      // Two concurrent callers share the dead refresh token and both fail.
      const settled = await Promise.allSettled([
        client.request('/me', 'GET', 'old-access', 'dead-refresh'),
        client.request('/me', 'GET', 'old-access', 'dead-refresh'),
      ]);
      settled.forEach((r) => {
        expect(r.status).toBe('rejected');
        expect(r.reason).toBeInstanceOf(OAuthError);
      });

      // The in-flight entry must be cleared — a later call with a new refresh_token succeeds.
      const result = await client.request('/me', 'GET', 'old-access', 'fresh-refresh');
      expect(result.data).toEqual({ ok: true });
      expect(refreshCount).toBe(2);
    });

    it('invokes onRefreshSuccess with new tokens before retry succeeds', async () => {
      const mockFetch = jest.fn()
        .mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({}) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(freshTokens) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ user: 'alice' }) });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      const order = [];
      const onRefreshSuccess = jest.fn((tokens) => {
        order.push('callback');
        expect(tokens).toEqual(freshTokens);
        // mockFetch has been called twice (initial 401 + refresh 200) but not yet for retry.
        expect(mockFetch).toHaveBeenCalledTimes(2);
      });

      await client.request('/me', 'GET', 'old-access', 'refresh-tok', undefined, onRefreshSuccess);
      order.push('done');

      expect(onRefreshSuccess).toHaveBeenCalledTimes(1);
      expect(order).toEqual(['callback', 'done']);
    });

    it('invokes onRefreshSuccess even when retry body fails to parse as JSON', async () => {
      const mockFetch = jest.fn()
        .mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({}) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(freshTokens) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.reject(new SyntaxError('Unexpected end of JSON input')) });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      const onRefreshSuccess = jest.fn();

      await expect(
        client.request('/me', 'GET', 'old-access', 'refresh-tok', undefined, onRefreshSuccess)
      ).rejects.toBeInstanceOf(SyntaxError);

      // The rotated tokens MUST have been delivered to the caller before the parse failure.
      expect(onRefreshSuccess).toHaveBeenCalledTimes(1);
      expect(onRefreshSuccess).toHaveBeenCalledWith(freshTokens);
    });

    it('invokes onRefreshSuccess even when retry returns 5xx', async () => {
      const mockFetch = jest.fn()
        .mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({}) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(freshTokens) })
        .mockResolvedValueOnce({
          ok: false, status: 500,
          json: () => Promise.resolve({ error: 'server_error', error_description: 'oops' }),
        });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      const onRefreshSuccess = jest.fn();

      await expect(
        client.request('/me', 'GET', 'old-access', 'refresh-tok', undefined, onRefreshSuccess)
      ).rejects.toBeInstanceOf(OAuthError);

      expect(onRefreshSuccess).toHaveBeenCalledTimes(1);
      expect(onRefreshSuccess).toHaveBeenCalledWith(freshTokens);
    });

    it('does not invoke onRefreshSuccess when no refresh occurs', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true, status: 200, json: () => Promise.resolve({ user: 'alice' }),
      });
      const onRefreshSuccess = jest.fn();

      await client.request('/me', 'GET', 'access-tok', 'refresh-tok', undefined, onRefreshSuccess);

      expect(onRefreshSuccess).not.toHaveBeenCalled();
    });

    it('omitting onRefreshSuccess remains valid (backward compatible)', async () => {
      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({ ok: false, status: 401, json: () => Promise.resolve({}) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(freshTokens) })
        .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ user: 'alice' }) });

      const result = await client.request('/me', 'GET', 'old-access', 'refresh-tok');

      expect(result.data).toEqual({ user: 'alice' });
      expect(result.updatedTokens).toEqual(freshTokens);
    });

    it('sends body as JSON with Content-Type header for non-GET', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true, status: 200, json: () => Promise.resolve({ created: true }),
      });
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

      await client.request('/items', 'POST', 'access-tok', 'refresh-tok', { name: 'test' });

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
