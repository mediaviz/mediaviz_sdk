'use strict';

const { generateCodeVerifier, generateCodeChallenge, generateState } = require('../pkce');

const VERIFIER_ALPHABET = /^[A-Za-z0-9\-._~]+$/;

describe('generateCodeVerifier', () => {
  test('returns a 64-character string', () => {
    expect(generateCodeVerifier()).toHaveLength(64);
  });

  test('only contains valid PKCE alphabet characters', () => {
    expect(generateCodeVerifier()).toMatch(VERIFIER_ALPHABET);
  });

  test('generates unique values', () => {
    expect(generateCodeVerifier()).not.toBe(generateCodeVerifier());
  });
});

describe('generateCodeChallenge', () => {
  // RFC 7636 Appendix B test vector
  const KNOWN_VERIFIER = 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk';
  const KNOWN_CHALLENGE = 'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM';

  test('matches known PKCE S256 test vector', async () => {
    expect(await generateCodeChallenge(KNOWN_VERIFIER)).toBe(KNOWN_CHALLENGE);
  });

  test('output has no base64 padding', async () => {
    const challenge = await generateCodeChallenge(generateCodeVerifier());
    expect(challenge).not.toContain('=');
  });

  test('output uses URL-safe base64 (no + or /)', async () => {
    for (let i = 0; i < 20; i++) {
      const challenge = await generateCodeChallenge(generateCodeVerifier());
      expect(challenge).not.toMatch(/[+/]/);
    }
  });
});

describe('generateState', () => {
  test('returns a 32-character string', () => {
    expect(generateState()).toHaveLength(32);
  });

  test('is lowercase hex', () => {
    expect(generateState()).toMatch(/^[0-9a-f]{32}$/);
  });

  test('generates unique values', () => {
    expect(generateState()).not.toBe(generateState());
  });
});
