<?php

declare(strict_types=1);

namespace OAuthSdk;

readonly class OAuthClientConfig
{
    public function __construct(
        public string $baseUrl,
        public string $clientId,
        public string $clientSecret,
        public string $redirectUri,
    ) {}
}

readonly class TokenResponse
{
    public function __construct(
        public string $accessToken,
        public string $tokenType,
        public int $expiresIn,
        public string $refreshToken,
    ) {}
}

readonly class TokenPayload
{
    public function __construct(
        public string $userId,
        public string $clientId,
        public string $jti,
        public int $iat,
        public int $exp,
    ) {}
}

readonly class AuthorizationUrlResult
{
    public function __construct(
        public string $url,
        public string $state,
        public string $codeVerifier,
    ) {}
}

readonly class AuthenticatedResponse
{
    public function __construct(
        public mixed $data,
        public ?TokenResponse $updatedTokens,
    ) {}
}
