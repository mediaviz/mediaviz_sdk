<?php

declare(strict_types=1);

namespace OAuthSdk\Tests;

use OAuthSdk\OAuthClient;
use OAuthSdk\OAuthClientConfig;
use OAuthSdk\OAuthError;
use OAuthSdk\TokenResponse;
use PHPUnit\Framework\TestCase;

class OAuthClientTest extends TestCase
{
    private OAuthClientConfig $config;

    protected function setUp(): void
    {
        $this->config = new OAuthClientConfig(
            baseUrl: 'https://auth.example.com',
            clientId: 'test-client-id',
            clientSecret: 'test-client-secret',
            redirectUri: 'https://myapp.com/callback',
        );
    }

    private function makeClient(array $responses): OAuthClient
    {
        $queue = $responses;
        $transport = function () use (&$queue): array {
            return array_shift($queue);
        };
        return new OAuthClient($this->config, $transport);
    }

    private function tokenBody(string $access = 'access-tok', string $refresh = 'refresh-tok'): string
    {
        return json_encode([
            'access_token'  => $access,
            'token_type'    => 'bearer',
            'expires_in'    => 3600,
            'refresh_token' => $refresh,
        ]);
    }

    // -------------------------------------------------------------------------
    // generateAuthorizationUrl
    // -------------------------------------------------------------------------

    public function test_generate_url_returns_url_state_and_verifier(): void
    {
        $client = new OAuthClient($this->config);
        $result = $client->generateAuthorizationUrl();

        $this->assertNotEmpty($result->url);
        $this->assertNotEmpty($result->state);
        $this->assertNotEmpty($result->codeVerifier);
    }

    public function test_generate_url_contains_required_oauth_params(): void
    {
        $client = new OAuthClient($this->config);
        $result = $client->generateAuthorizationUrl();
        parse_str(parse_url($result->url, PHP_URL_QUERY), $params);

        $this->assertSame('code', $params['response_type']);
        $this->assertSame($this->config->clientId, $params['client_id']);
        $this->assertSame($this->config->redirectUri, $params['redirect_uri']);
        $this->assertSame('S256', $params['code_challenge_method']);
        $this->assertSame($result->state, $params['state']);
        $this->assertNotEmpty($params['code_challenge']);
    }

    public function test_generate_url_base_is_base_url_plus_authorize_path(): void
    {
        $client = new OAuthClient($this->config);
        $result = $client->generateAuthorizationUrl();

        $this->assertStringStartsWith('https://auth.example.com/oauth/authorize', $result->url);
    }

    public function test_generate_url_verifier_is_64_chars(): void
    {
        $client = new OAuthClient($this->config);
        $result = $client->generateAuthorizationUrl();

        $this->assertSame(64, strlen($result->codeVerifier));
    }

    public function test_generate_url_state_is_32_chars(): void
    {
        $client = new OAuthClient($this->config);
        $result = $client->generateAuthorizationUrl();

        $this->assertSame(32, strlen($result->state));
    }

    public function test_generate_url_uses_provided_state(): void
    {
        $client = new OAuthClient($this->config);
        $result = $client->generateAuthorizationUrl('my-state');

        $this->assertSame('my-state', $result->state);
        parse_str(parse_url($result->url, PHP_URL_QUERY), $params);
        $this->assertSame('my-state', $params['state']);
    }

    // -------------------------------------------------------------------------
    // exchangeCode
    // -------------------------------------------------------------------------

    public function test_exchange_code_posts_to_token_endpoint(): void
    {
        $calls = [];
        $transport = function (string $url, string $method, array $headers, ?string $body) use (&$calls): array {
            $calls[] = compact('url', 'method', 'headers', 'body');
            return [200, $this->tokenBody()];
        };
        $client = new OAuthClient($this->config, $transport);
        $result = $client->exchangeCode('auth-code', 'verifier123');

        $this->assertSame('access-tok', $result->accessToken);
        $this->assertSame('bearer', $result->tokenType);
        $this->assertSame(3600, $result->expiresIn);
        $this->assertSame('refresh-tok', $result->refreshToken);

        $call = $calls[0];
        $this->assertSame('https://auth.example.com/oauth/token', $call['url']);
        $this->assertSame('POST', $call['method']);
        parse_str($call['body'], $params);
        $this->assertSame('authorization_code', $params['grant_type']);
        $this->assertSame('auth-code', $params['code']);
        $this->assertSame('verifier123', $params['code_verifier']);
        $this->assertSame($this->config->redirectUri, $params['redirect_uri']);
        $this->assertSame($this->config->clientId, $params['client_id']);
        $this->assertSame($this->config->clientSecret, $params['client_secret']);
    }

    public function test_exchange_code_uses_provided_redirect_uri(): void
    {
        $calls = [];
        $transport = function (string $url, string $method, array $headers, ?string $body) use (&$calls): array {
            $calls[] = $body;
            return [200, $this->tokenBody()];
        };
        $client = new OAuthClient($this->config, $transport);
        $client->exchangeCode('code', 'verifier', 'https://other.com/cb');

        parse_str($calls[0], $params);
        $this->assertSame('https://other.com/cb', $params['redirect_uri']);
    }

    public function test_exchange_code_throws_on_non_2xx(): void
    {
        $client = $this->makeClient([[400, json_encode(['error' => 'invalid_grant', 'error_description' => 'Bad code'])]]);

        $this->expectException(OAuthError::class);
        $client->exchangeCode('bad-code', 'verifier');
    }

    // -------------------------------------------------------------------------
    // refreshAccessToken
    // -------------------------------------------------------------------------

    public function test_refresh_posts_to_token_endpoint(): void
    {
        $calls = [];
        $transport = function (string $url, string $method, array $headers, ?string $body) use (&$calls): array {
            $calls[] = compact('url', 'body');
            return [200, $this->tokenBody('new-access', 'new-refresh')];
        };
        $client = new OAuthClient($this->config, $transport);
        $result = $client->refreshAccessToken('old-refresh');

        $this->assertSame('new-access', $result->accessToken);
        $this->assertSame('new-refresh', $result->refreshToken);

        parse_str($calls[0]['body'], $params);
        $this->assertSame('refresh_token', $params['grant_type']);
        $this->assertSame('old-refresh', $params['refresh_token']);
        $this->assertSame($this->config->clientId, $params['client_id']);
        $this->assertSame($this->config->clientSecret, $params['client_secret']);
    }

    public function test_refresh_throws_on_non_2xx(): void
    {
        $client = $this->makeClient([[401, json_encode(['error' => 'invalid_grant', 'error_description' => 'Expired'])]]);

        $this->expectException(OAuthError::class);
        $client->refreshAccessToken('bad-refresh');
    }

    // -------------------------------------------------------------------------
    // revokeToken
    // -------------------------------------------------------------------------

    public function test_revoke_posts_to_revoke_endpoint(): void
    {
        $calls = [];
        $transport = function (string $url, string $method, array $headers, ?string $body) use (&$calls): array {
            $calls[] = compact('url', 'body');
            return [200, '{}'];
        };
        $client = new OAuthClient($this->config, $transport);
        $client->revokeToken('some-token');

        $this->assertSame('https://auth.example.com/oauth/revoke', $calls[0]['url']);
        parse_str($calls[0]['body'], $params);
        $this->assertSame('some-token', $params['token']);
    }

    public function test_revoke_includes_token_type_hint_when_provided(): void
    {
        $calls = [];
        $transport = function (string $url, string $method, array $headers, ?string $body) use (&$calls): array {
            $calls[] = $body;
            return [200, '{}'];
        };
        $client = new OAuthClient($this->config, $transport);
        $client->revokeToken('tok', 'access_token');

        parse_str($calls[0], $params);
        $this->assertSame('access_token', $params['token_type_hint']);
    }

    public function test_revoke_omits_token_type_hint_when_not_provided(): void
    {
        $calls = [];
        $transport = function (string $url, string $method, array $headers, ?string $body) use (&$calls): array {
            $calls[] = $body;
            return [200, '{}'];
        };
        $client = new OAuthClient($this->config, $transport);
        $client->revokeToken('tok');

        parse_str($calls[0], $params);
        $this->assertArrayNotHasKey('token_type_hint', $params);
    }

    public function test_revoke_throws_on_non_2xx(): void
    {
        $client = $this->makeClient([[500, json_encode(['error' => 'server_error'])]]);

        $this->expectException(OAuthError::class);
        $client->revokeToken('tok');
    }

    // -------------------------------------------------------------------------
    // request
    // -------------------------------------------------------------------------

    private function freshTokens(): TokenResponse
    {
        return new TokenResponse('new-access', 'bearer', 3600, 'new-refresh');
    }

    public function test_request_returns_data_with_null_updated_tokens_on_2xx(): void
    {
        $client = $this->makeClient([[200, json_encode(['user' => 'alice'])]]);
        $result = $client->request('/me', 'GET', 'access-tok', 'refresh-tok');

        $this->assertSame(['user' => 'alice'], $result->data);
        $this->assertNull($result->updatedTokens);
    }

    public function test_request_attaches_authorization_header(): void
    {
        $capturedUrl = '';
        $capturedHeaders = [];
        $transport = function (string $url, string $method, array $headers, ?string $body) use (&$capturedUrl, &$capturedHeaders): array {
            $capturedUrl = $url;
            $capturedHeaders = $headers;
            return [200, json_encode(['ok' => true])];
        };
        $client = new OAuthClient($this->config, $transport);
        $client->request('/me', 'GET', 'my-token', 'refresh-tok');

        $this->assertSame('https://auth.example.com/me', $capturedUrl);
        $this->assertContains('Authorization: Bearer my-token', $capturedHeaders);
    }

    public function test_request_returns_data_and_updated_tokens_on_401_refresh_retry_success(): void
    {
        $calls = 0;
        $transport = function () use (&$calls): array {
            $calls++;
            return match ($calls) {
                1 => [401, '{}'],                                        // initial request → 401
                2 => [200, $this->tokenBody('new-access', 'new-refresh')], // refresh
                3 => [200, json_encode(['user' => 'alice'])],            // retry
            };
        };
        $client = new OAuthClient($this->config, $transport);
        $result = $client->request('/me', 'GET', 'old-access', 'refresh-tok');

        $this->assertSame(['user' => 'alice'], $result->data);
        $this->assertNotNull($result->updatedTokens);
        $this->assertSame('new-access', $result->updatedTokens->accessToken);
        $this->assertSame('new-refresh', $result->updatedTokens->refreshToken);
    }

    public function test_request_propagates_oauth_error_when_refresh_fails_on_401(): void
    {
        $calls = 0;
        $transport = function () use (&$calls): array {
            $calls++;
            return match ($calls) {
                1 => [401, '{}'],
                2 => [400, json_encode(['error' => 'invalid_grant', 'error_description' => 'Token expired'])],
            };
        };
        $client = new OAuthClient($this->config, $transport);

        $this->expectException(OAuthError::class);
        $client->request('/me', 'GET', 'old-access', 'bad-refresh');
    }

    public function test_request_throws_when_retry_after_refresh_also_fails(): void
    {
        $calls = 0;
        $transport = function () use (&$calls): array {
            $calls++;
            return match ($calls) {
                1 => [401, '{}'],
                2 => [200, $this->tokenBody('new-access', 'new-refresh')],
                3 => [401, json_encode(['error' => 'invalid_token', 'error_description' => 'Token invalid'])],
            };
        };
        $client = new OAuthClient($this->config, $transport);

        $this->expectException(OAuthError::class);
        $client->request('/me', 'GET', 'old-access', 'refresh-tok');
    }

    public function test_request_uses_new_access_token_in_authorization_header_on_retry(): void
    {
        $capturedHeaders = [];
        $calls = 0;
        $transport = function (string $url, string $method, array $headers, ?string $body) use (&$capturedHeaders, &$calls): array {
            $calls++;
            $capturedHeaders[$calls] = $headers;
            return match ($calls) {
                1 => [401, '{}'],
                2 => [200, $this->tokenBody('new-access', 'new-refresh')],
                3 => [200, '{}'],
            };
        };
        $client = new OAuthClient($this->config, $transport);
        $client->request('/me', 'GET', 'old-access', 'refresh-tok');

        $this->assertContains('Authorization: Bearer old-access', $capturedHeaders[1]);
        $this->assertContains('Authorization: Bearer new-access', $capturedHeaders[3]);
    }

    public function test_request_sends_body_as_json_with_content_type_header(): void
    {
        $capturedHeaders = [];
        $capturedBody = null;
        $transport = function (string $url, string $method, array $headers, ?string $body) use (&$capturedHeaders, &$capturedBody): array {
            $capturedHeaders = $headers;
            $capturedBody = $body;
            return [200, json_encode(['created' => true])];
        };
        $client = new OAuthClient($this->config, $transport);
        $client->request('/items', 'POST', 'access-tok', 'refresh-tok', ['name' => 'test']);

        $this->assertContains('Content-Type: application/json', $capturedHeaders);
        $this->assertSame(json_encode(['name' => 'test']), $capturedBody);
    }

    // -------------------------------------------------------------------------
    // decodeAccessToken
    // -------------------------------------------------------------------------

    public function test_decode_access_token_returns_payload_without_signature_verification(): void
    {
        $payload = ['user_id' => 'u1', 'client_id' => 'c1', 'jti' => 'j1', 'iat' => 1000, 'exp' => 2000];
        $encoded = rtrim(strtr(base64_encode(json_encode($payload)), '+/', '-_'), '=');
        $jwt = "header.{$encoded}.signature";

        $client = new OAuthClient($this->config);
        $result = $client->decodeAccessToken($jwt);

        $this->assertSame('u1', $result->userId);
        $this->assertSame('c1', $result->clientId);
        $this->assertSame('j1', $result->jti);
        $this->assertSame(1000, $result->iat);
        $this->assertSame(2000, $result->exp);
    }

    public function test_decode_access_token_throws_on_malformed_jwt(): void
    {
        $client = new OAuthClient($this->config);

        $this->expectException(OAuthError::class);
        $client->decodeAccessToken('notajwt');
    }

    public function test_decode_access_token_handles_payload_needing_padding(): void
    {
        $payload = ['user_id' => 'user-abc', 'client_id' => 'c', 'jti' => 'j', 'iat' => 1, 'exp' => 2];
        $encoded = rtrim(strtr(base64_encode(json_encode($payload)), '+/', '-_'), '=');
        $jwt = "h.{$encoded}.s";

        $client = new OAuthClient($this->config);
        $result = $client->decodeAccessToken($jwt);

        $this->assertSame('user-abc', $result->userId);
    }
}
