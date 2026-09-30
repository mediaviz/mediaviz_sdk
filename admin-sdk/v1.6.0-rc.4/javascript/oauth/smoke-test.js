'use strict';

const { OAuthClient } = require('./src/index');

const client = new OAuthClient({
  baseUrl: 'https://example.com',
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
  redirectUri: 'https://example.com/callback',
});

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

(async () => {
  const result = await client.generateAuthorizationUrl();

  assert(result.url.includes('response_type=code'), `url must contain 'response_type=code', got: ${result.url}`);
  assert(result.code_verifier.length === 64, `code_verifier must be 64 chars, got: ${result.code_verifier.length}`);
  assert(result.state.length === 32, `state must be 32 chars, got: ${result.state.length}`);

  console.log('OK');
})();
