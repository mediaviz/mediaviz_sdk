'use strict';

// PKCE crypto for Hermes, which ships no SubtleCrypto and no
// crypto.getRandomValues. The native implementation is injected rather than
// required here: expo-crypto and react-native-quick-crypto are alternatives,
// neither is a hard dependency, and a static require of one would break Metro
// for apps that installed the other.

/**
 * Builds a provider for the OAuth SDK's configureCrypto().
 * @param {{getRandomValues: (bytes: Uint8Array) => unknown, digest: (bytes: Uint8Array) => unknown}} impl
 */
function createCryptoProvider(impl) {
  const { getRandomValues, digest } = impl ?? {};
  if (typeof getRandomValues !== 'function') {
    throw new TypeError('createCryptoProvider requires getRandomValues(bytes)');
  }
  if (typeof digest !== 'function') {
    throw new TypeError('createCryptoProvider requires digest(bytes) => SHA-256 bytes');
  }
  return {
    // expo-crypto fills in place and returns undefined; quick-crypto returns the
    // array. Normalising here means callers never have to care which they have.
    getRandomValues: (bytes) => {
      const filled = getRandomValues(bytes);
      return filled instanceof Uint8Array ? filled : bytes;
    },
    sha256: async (bytes) => toBytes(await digest(bytes)),
  };
}

// helpers
function toBytes(digest) {
  if (digest instanceof Uint8Array) return digest;
  if (digest instanceof ArrayBuffer) return new Uint8Array(digest);
  if (ArrayBuffer.isView(digest)) return new Uint8Array(digest.buffer, digest.byteOffset, digest.byteLength);
  if (Array.isArray(digest)) return Uint8Array.from(digest);
  throw new TypeError('digest must resolve to a Uint8Array, ArrayBuffer, typed array, or byte array');
}

module.exports = { createCryptoProvider };
