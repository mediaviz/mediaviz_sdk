'use strict';

// Authorization Code + PKCE on device.
//
// The app injects openAuthSession (expo-web-browser's openAuthSessionAsync, or
// anything with the same contract), keeping this file free of native
// dependencies. The verifier never leaves this function, so there is nothing to
// persist across the redirect the way a web app must.

class AuthSessionError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'AuthSessionError';
    this.code = code;
  }
}

/**
 * Runs the full interactive login and leaves *mv* authenticated.
 * @param {object} mv - a MediaViz client
 * @param {{openAuthSession: Function, redirectUri: string, state?: string, sessionOptions?: object}} options
 * @returns {Promise<object>} the token response
 */
async function startAuthSession(mv, options) {
  const { openAuthSession, redirectUri, state: requestedState, sessionOptions } = options ?? {};
  if (typeof openAuthSession !== 'function') {
    throw new TypeError('startAuthSession requires openAuthSession(url, redirectUri, options)');
  }
  if (!redirectUri) {
    throw new TypeError('startAuthSession requires redirectUri');
  }

  const { url, state, code_verifier: codeVerifier } = await mv.getAuthorizationUrl(requestedState);
  const result = await openAuthSession(url, redirectUri, sessionOptions);

  const type = result?.type;
  if (type === 'cancel' || type === 'dismiss') {
    throw new AuthSessionError('cancelled', 'The user dismissed the sign-in screen.');
  }
  if (type !== 'success' || !result?.url) {
    throw new AuthSessionError('failed', `Sign-in did not complete (result type: ${type ?? 'none'}).`);
  }

  const params = parseRedirectUrl(result.url);
  if (params.error) {
    throw new AuthSessionError(params.error, params.error_description ?? `Authorization failed: ${params.error}`);
  }
  // Rejecting a mismatched state is the CSRF defence the whole flow rests on —
  // it must fail closed, including when the server returns no state at all.
  if (params.state !== state) {
    throw new AuthSessionError('state_mismatch', 'Authorization state did not match the request; discarding the response.');
  }
  if (!params.code) {
    throw new AuthSessionError('no_code', 'Authorization redirect carried no code.');
  }

  return mv.handleCallback(params.code, codeVerifier);
}

/**
 * Extracts query and fragment params from a redirect URL.
 *
 * Hand-rolled because React Native's URL polyfill mis-parses custom schemes
 * (mediaviz://callback) — the very shape every native redirect URI takes.
 * @param {string} url
 * @returns {Record<string, string>}
 */
function parseRedirectUrl(url) {
  const out = {};
  const text = String(url ?? '');
  const queryStart = text.indexOf('?');
  const hashStart = text.indexOf('#');
  if (queryStart !== -1) {
    const end = hashStart > queryStart ? hashStart : text.length;
    assign(out, text.slice(queryStart + 1, end));
  }
  if (hashStart !== -1) assign(out, text.slice(hashStart + 1));
  return out;
}

// helpers
function assign(out, segment) {
  for (const pair of segment.split('&')) {
    if (!pair) continue;
    const eq = pair.indexOf('=');
    const key = decode(eq === -1 ? pair : pair.slice(0, eq));
    if (!key) continue;
    out[key] = eq === -1 ? '' : decode(pair.slice(eq + 1));
  }
}

function decode(value) {
  try {
    return decodeURIComponent(value.replace(/\+/g, ' '));
  } catch {
    // A malformed escape must not take down the whole redirect parse; the
    // caller's state/code checks still reject anything unusable.
    return value;
  }
}

module.exports = { startAuthSession, parseRedirectUrl, AuthSessionError };
