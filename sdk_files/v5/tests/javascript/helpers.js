// Auto-generated — do not edit

export class SpyOAuthClient {
  constructor() { this.calls = []; }

  request(path, method, accessToken, refreshToken, body) {
    this.calls.push({ path, method, accessToken, refreshToken, body });
    return Promise.resolve({ data: null });
  }

  last_call() { return this.calls[this.calls.length - 1]; }
  reset() { this.calls = []; }
}

export function makeSpyFetch() {
  const calls = [];
  const spy = (url, options = {}) => {
    calls.push({ url, method: (options.method || 'GET'), headers: options.headers, body: options.body });
    const stubResponse = {
      ok: true,
      status: 200,
      headers: { get: () => null },
      json: () => Promise.resolve({}),
    };
    return Promise.resolve(stubResponse);
  };
  spy.calls = calls;
  spy.last_call = () => calls[calls.length - 1];
  spy.reset = () => { calls.length = 0; };
  return spy;
}
