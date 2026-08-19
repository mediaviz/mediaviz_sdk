'use strict';

const { createHash, randomFillSync } = require('crypto');
const { createCryptoProvider } = require('../crypto');

const SHA256_ABC = createHash('sha256').update('abc').digest();

describe('createCryptoProvider', () => {
  test.each([
    ['nothing', undefined],
    ['no digest', { getRandomValues: () => {} }],
    ['no getRandomValues', { digest: () => {} }],
  ])('rejects an incomplete impl (%s)', (_label, impl) => {
    expect(() => createCryptoProvider(impl)).toThrow(TypeError);
  });

  test('returns the buffer when the native fill returns undefined (expo-crypto shape)', () => {
    const provider = createCryptoProvider({ getRandomValues: (b) => { b.fill(3); }, digest: async (b) => b });
    const out = provider.getRandomValues(new Uint8Array(4));
    expect(Array.from(out)).toEqual([3, 3, 3, 3]);
  });

  test('returns the native array when the fill returns one (quick-crypto shape)', () => {
    const provider = createCryptoProvider({
      getRandomValues: () => Uint8Array.from([9, 9]),
      digest: async (b) => b,
    });
    expect(Array.from(provider.getRandomValues(new Uint8Array(2)))).toEqual([9, 9]);
  });

  describe('digest normalisation', () => {
    const cases = {
      Uint8Array: new Uint8Array(SHA256_ABC),
      ArrayBuffer: new Uint8Array(SHA256_ABC).buffer,
      'typed array view': new Int8Array(new Uint8Array(SHA256_ABC).buffer),
      'plain byte array': Array.from(SHA256_ABC),
    };
    test.each(Object.entries(cases))('accepts %s', async (_label, value) => {
      const provider = createCryptoProvider({ getRandomValues: (b) => b, digest: async () => value });
      const out = await provider.sha256(new Uint8Array([1]));
      expect(out).toBeInstanceOf(Uint8Array);
      expect(Array.from(out)).toEqual(Array.from(SHA256_ABC));
    });

    test('rejects an unusable digest result', async () => {
      const provider = createCryptoProvider({ getRandomValues: (b) => b, digest: async () => 'deadbeef' });
      await expect(provider.sha256(new Uint8Array([1]))).rejects.toThrow(TypeError);
    });
  });

  test('satisfies the OAuth SDK provider contract end to end', async () => {
    const provider = createCryptoProvider({
      getRandomValues: (b) => randomFillSync(b),
      digest: async (b) => createHash('sha256').update(b).digest(),
    });
    const filled = provider.getRandomValues(new Uint8Array(16));
    expect(filled).toHaveLength(16);
    expect(Array.from(await provider.sha256(new Uint8Array(Buffer.from('abc'))))).toEqual(Array.from(SHA256_ABC));
  });
});
