'use strict';

// HMAC scheme shared with the MediaViz producer: X-Signature = 'sha256=' +
// hex(HMAC-SHA256(secret, `${X-Timestamp}.` + rawBody)). The signing string is
// the timestamp joined to the *raw request body bytes* — never re-serialized
// JSON. Verification accepts the current and (during rotation) previous
// secret, rejects timestamps outside the skew window, and compares digests in
// constant time. Web Crypto only, so the same code runs in Node >= 18 and
// browsers.

const _encoder = new TextEncoder();

async function signWebhookPayload(secret, timestamp, rawBody) {
  const key = await globalThis.crypto.subtle.importKey(
    'raw', _encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const payload = _concat(_encoder.encode(`${timestamp}.`), toBytes(rawBody));
  const digest = await globalThis.crypto.subtle.sign('HMAC', key, payload);
  return 'sha256=' + _hex(new Uint8Array(digest));
}

async function verifyWebhookSignature(secretCurrent, secretPrevious, headers, rawBody, options = {}) {
  const h = lowerHeaders(headers);
  const timestamp = h['x-timestamp'];
  const signature = h['x-signature'];
  if (!timestamp || !signature) return false;
  if (!/^-?\d+$/.test(String(timestamp))) return false;
  const skewToleranceS = options.skewToleranceS ?? 300;
  const now = options.now ?? Math.floor(Date.now() / 1000);
  if (Math.abs(now - Number(timestamp)) > skewToleranceS) return false;
  for (const secret of [secretCurrent, secretPrevious]) {
    if (!secret) continue;
    const expected = await signWebhookPayload(secret, String(timestamp), rawBody);
    if (_constantTimeEqual(expected, String(signature))) return true;
  }
  return false;
}

// helpers
function toBytes(rawBody) {
  if (typeof rawBody === 'string') return _encoder.encode(rawBody);
  if (rawBody instanceof Uint8Array) return rawBody;
  if (rawBody instanceof ArrayBuffer) return new Uint8Array(rawBody);
  throw new TypeError('rawBody must be a string, Uint8Array, or ArrayBuffer');
}

function lowerHeaders(headers) {
  const out = {};
  const entries = typeof headers?.entries === 'function' ? headers.entries() : Object.entries(headers ?? {});
  for (const [k, v] of entries) out[String(k).toLowerCase()] = v;
  return out;
}

function _concat(a, b) {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

function _hex(bytes) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function _constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

module.exports = { signWebhookPayload, verifyWebhookSignature, toBytes, lowerHeaders };
