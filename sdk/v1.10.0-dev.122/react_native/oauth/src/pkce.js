'use strict';

const { base64urlEncode } = require('./base64');
const { getCrypto } = require('./crypto');

/**
 * Generates a 64-character PKCE code verifier from [A-Za-z0-9-._~].
 * @returns {string}
 */
function generateCodeVerifier() {
  const bytes = new Uint8Array(48);
  getCrypto().getRandomValues(bytes);
  return base64urlEncode(bytes).slice(0, 64);
}

/**
 * Computes Base64URL(SHA256(verifier)) with no padding.
 * @param {string} verifier
 * @returns {Promise<string>}
 */
async function generateCodeChallenge(verifier) {
  const hash = await getCrypto().sha256(asciiEncode(verifier));
  return base64urlEncode(hash);
}

/**
 * Generates a cryptographically random 32-char hex state value.
 * @returns {string}
 */
function generateState() {
  const bytes = new Uint8Array(16);
  getCrypto().getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// helpers

// The RFC 7636 §4.1 verifier alphabet is ASCII-only, so a byte-per-char encode
// is exact and keeps TextEncoder — absent on some React Native versions — off
// the PKCE path entirely. A non-ASCII verifier is invalid input, not something
// to silently re-encode.
function asciiEncode(str) {
  const out = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code > 0x7f) throw new TypeError('PKCE code_verifier must be ASCII (RFC 7636 §4.1)');
    out[i] = code;
  }
  return out;
}

module.exports = { generateCodeVerifier, generateCodeChallenge, generateState };
