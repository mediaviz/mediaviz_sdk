<?php
// Auto-generated — do not edit
namespace OAuthSdk;

class SpyOAuthClient extends OAuthClient {
    public array $calls = [];

    public function __construct() {}

    public function request(
        string $url,
        string $method,
        string $accessToken,
        string $refreshToken,
        mixed $body = null,
    ): AuthenticatedResponse {
        $this->calls[] = ['path' => $url, 'method' => $method, 'accessToken' => $accessToken, 'refreshToken' => $refreshToken, 'body' => $body];
        return new AuthenticatedResponse(data: null, updatedTokens: null);
    }

    public function lastCall(): array {
        return end($this->calls);
    }

    public function reset(): void {
        $this->calls = [];
    }
}
