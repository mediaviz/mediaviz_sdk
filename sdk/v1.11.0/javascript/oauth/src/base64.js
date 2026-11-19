'use strict';

// Base64URL codec, used by PKCE (encode) and JWT payload decoding (decode).
// Hand-rolled rather than delegating to atob/btoa, Buffer, or TextDecoder:
// none of those is present on every target runtime — React Native's Hermes has
// no Buffer and does not guarantee atob — and the alphabet here is URL-safe and
// unpadded, which the standard helpers do not produce.

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/**
 * @param {Uint8Array} bytes
 * @returns {string} unpadded base64url
 */
function base64urlEncode(bytes) {
  let result = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    result += ALPHABET[b0 >> 2];
    result += ALPHABET[((b0 & 3) << 4) | (b1 >> 4)];
    if (i + 1 < bytes.length) result += ALPHABET[((b1 & 0xf) << 2) | (b2 >> 6)];
    if (i + 2 < bytes.length) result += ALPHABET[b2 & 0x3f];
  }
  return result;
}

/**
 * Decodes base64url or standard base64, padded or not.
 * @param {string} str
 * @returns {Uint8Array}
 */
function base64urlDecode(str) {
  const clean = String(str).replace(/=+$/, '');
  const out = new Uint8Array((clean.length * 3) >> 2);
  let acc = 0;
  let bits = 0;
  let i = 0;
  for (const ch of clean) {
    const value = decodeChar(ch);
    if (value < 0) throw new TypeError(`Invalid base64url character: ${JSON.stringify(ch)}`);
    acc = (acc << 6) | value;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out[i++] = (acc >> bits) & 0xff;
    }
  }
  return out.subarray(0, i);
}

/**
 * @param {Uint8Array} bytes
 * @returns {string}
 */
function utf8Decode(bytes) {
  let out = '';
  let i = 0;
  while (i < bytes.length) {
    const b0 = bytes[i++];
    let codePoint;
    if (b0 < 0x80) codePoint = b0;
    else if ((b0 & 0xe0) === 0xc0) codePoint = ((b0 & 0x1f) << 6) | (bytes[i++] & 0x3f);
    else if ((b0 & 0xf0) === 0xe0)
      codePoint = ((b0 & 0x0f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f);
    else
      codePoint =
        ((b0 & 0x07) << 18) | ((bytes[i++] & 0x3f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f);
    out += String.fromCodePoint(codePoint);
  }
  return out;
}

// helpers
function decodeChar(ch) {
  // '+' and '/' map onto the URL-safe alphabet's '-' and '_' slots, so standard
  // base64 decodes through the same table.
  if (ch === '+') return 62;
  if (ch === '/') return 63;
  return ALPHABET.indexOf(ch);
}

module.exports = { base64urlEncode, base64urlDecode, utf8Decode };
