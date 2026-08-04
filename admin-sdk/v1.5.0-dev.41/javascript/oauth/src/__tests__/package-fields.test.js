const path = require('path');
const pkg = require('../../package.json');

describe('package.json build fields (task 5)', () => {
  test('main points to CJS entry', () => {
    expect(pkg.main).toBe('src/index.js');
  });

  test('module field points to ESM dist', () => {
    expect(pkg.module).toBe('dist/oauth-sdk.esm.js');
  });

  test('browser field points to UMD dist', () => {
    expect(pkg.browser).toBe('dist/oauth-sdk.umd.js');
  });

  test('files includes src/ and dist/', () => {
    expect(pkg.files).toContain('src/');
    expect(pkg.files).toContain('dist/');
  });

  test('build script runs rollup', () => {
    expect(pkg.scripts.build).toBe('rollup -c');
  });

  test('prepublishOnly runs build', () => {
    expect(pkg.scripts.prepublishOnly).toBe('npm run build');
  });
});
