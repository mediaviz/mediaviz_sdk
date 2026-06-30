'use strict';

const { postForm, getJson } = require('../http');
const { OAuthError } = require('../errors');

describe('postForm', () => {
  afterEach(() => jest.restoreAllMocks());

  it('sends urlencoded POST and returns parsed JSON on 2xx', async () => {
    const mockResponse = { access_token: 'tok', token_type: 'bearer', expires_in: 3600, refresh_token: 'ref' };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const result = await postForm('https://example.com/token', { grant_type: 'authorization_code', code: 'abc' });

    expect(result).toEqual(mockResponse);
    const [url, init] = global.fetch.mock.calls[0];
    expect(url).toBe('https://example.com/token');
    expect(init.method).toBe('POST');
    expect(init.headers['Content-Type']).toBe('application/x-www-form-urlencoded');
    expect(init.body).toContain('grant_type=authorization_code');
    expect(init.body).toContain('code=abc');
  });

  it('throws OAuthError on non-2xx with RFC 6749 body', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ error: 'invalid_grant', error_description: 'Code expired' }),
    });

    await expect(postForm('https://example.com/token', {})).rejects.toThrow(OAuthError);

    try {
      await postForm('https://example.com/token', {});
    } catch (err) {
      expect(err.code).toBe('invalid_grant');
      expect(err.description).toBe('Code expired');
      expect(err.httpStatus).toBe(400);
    }
  });

  it('throws OAuthError with server_error fallback for non-RFC body', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Something broke' }),
    });

    await expect(postForm('https://example.com/token', {})).rejects.toMatchObject({
      code: 'server_error',
      httpStatus: 500,
    });
  });

  it('merges extra headers', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    await postForm('https://example.com/token', {}, { 'X-Custom': 'value' });
    const [, init] = global.fetch.mock.calls[0];
    expect(init.headers['X-Custom']).toBe('value');
  });
});

describe('getJson', () => {
  afterEach(() => jest.restoreAllMocks());

  it('sends GET and returns parsed JSON on 2xx', async () => {
    const mockData = { user_id: 'u1' };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    const result = await getJson('https://example.com/me', { Authorization: 'Bearer tok' });
    expect(result).toEqual(mockData);
    const [url, init] = global.fetch.mock.calls[0];
    expect(url).toBe('https://example.com/me');
    expect(init.headers['Authorization']).toBe('Bearer tok');
  });

  it('throws OAuthError on non-2xx', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: 'invalid_token', error_description: 'Expired' }),
    });

    await expect(getJson('https://example.com/me')).rejects.toMatchObject({
      code: 'invalid_token',
      httpStatus: 401,
    });
  });
});
