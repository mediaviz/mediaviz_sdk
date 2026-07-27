'use strict';

// base64url-encode a Uint8Array without padding
function base64urlEncode(bytes) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let result = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    result += chars[b0 >> 2];
    result += chars[((b0 & 3) << 4) | (b1 >> 4)];
    if (i + 1 < bytes.length) result += chars[((b1 & 0xf) << 2) | (b2 >> 6)];
    if (i + 2 < bytes.length) result += chars[b2 & 0x3f];
  }
  return result;
}

/**
 * Generates a 64-character PKCE code verifier from [A-Za-z0-9-._~].
 * @returns {string}
 */
function generateCodeVerifier() {
  const bytes = new Uint8Array(48);
  globalThis.crypto.getRandomValues(bytes);
  return base64urlEncode(bytes).slice(0, 64);
}

/**
 * Computes Base64URL(SHA256(verifier)) with no padding.
 * @param {string} verifier
 * @returns {Promise<string>}
 */
async function generateCodeChallenge(verifier) {
  const encoded = new TextEncoder().encode(verifier);
  const hashBuf = await globalThis.crypto.subtle.digest('SHA-256', encoded);
  return base64urlEncode(new Uint8Array(hashBuf));
}

/**
 * Generates a cryptographically random 32-char hex state value.
 * @returns {string}
 */
function generateState() {
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

module.exports = { generateCodeVerifier, generateCodeChallenge, generateState };
