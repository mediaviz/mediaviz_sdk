'use strict';

const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../../browser-smoke-test.html');

describe('browser-smoke-test.html', () => {
  let html;

  beforeAll(() => {
    html = fs.readFileSync(htmlPath, 'utf8');
  });

  test('file exists', () => {
    expect(fs.existsSync(htmlPath)).toBe(true);
  });

  test('loads dist/oauth-sdk.umd.js via script tag', () => {
    expect(html).toContain('src="dist/oauth-sdk.umd.js"');
  });

  test('references OAuthSDK global', () => {
    expect(html).toContain('OAuthSDK');
  });

  test('awaits generateAuthorizationUrl', () => {
    expect(html).toContain('await client.generateAuthorizationUrl()');
  });

  test('asserts response_type=code in url', () => {
    expect(html).toContain('response_type=code');
  });

  test('logs PASS on success', () => {
    expect(html).toContain('PASS');
  });
});
