const path = require('path');
const fs = require('fs');

const distDir = path.resolve(__dirname, '../../dist');
const umdPath = path.join(distDir, 'oauth-sdk.umd.js');
const esmPath = path.join(distDir, 'oauth-sdk.esm.js');

describe('Rollup build output', () => {
  test('dist/oauth-sdk.umd.js exists', () => {
    expect(fs.existsSync(umdPath)).toBe(true);
  });

  test('dist/oauth-sdk.esm.js exists', () => {
    expect(fs.existsSync(esmPath)).toBe(true);
  });

  test('UMD bundle is non-empty and minified (single line)', () => {
    const content = fs.readFileSync(umdPath, 'utf8').trim();
    expect(content.length).toBeGreaterThan(100);
    // terser produces a single line
    expect(content.split('\n').length).toBe(1);
  });

  test('UMD bundle registers OAuthSDK global', () => {
    const content = fs.readFileSync(umdPath, 'utf8');
    expect(content).toContain('OAuthSDK');
  });

  test('UMD bundle exports OAuthClient, OAuthError, OAuthErrorCode', () => {
    const content = fs.readFileSync(umdPath, 'utf8');
    expect(content).toContain('OAuthClient');
    expect(content).toContain('OAuthError');
    expect(content).toContain('OAuthErrorCode');
  });

  test('ESM bundle uses export syntax', () => {
    const content = fs.readFileSync(esmPath, 'utf8');
    expect(content).toMatch(/export\s*\{/);
  });

  test('UMD bundle uses Web Crypto (no require crypto)', () => {
    const content = fs.readFileSync(umdPath, 'utf8');
    expect(content).not.toContain("require('crypto')");
    expect(content).toContain('globalThis.crypto');
  });

  test('rollup.config.js exists', () => {
    const configPath = path.resolve(__dirname, '../../rollup.config.js');
    expect(fs.existsSync(configPath)).toBe(true);
  });

  test('package.json includes rollup dev dependencies', () => {
    const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8'));
    expect(pkg.devDependencies).toHaveProperty('rollup');
    expect(pkg.devDependencies).toHaveProperty('@rollup/plugin-node-resolve');
    expect(pkg.devDependencies).toHaveProperty('@rollup/plugin-terser');
  });
});
