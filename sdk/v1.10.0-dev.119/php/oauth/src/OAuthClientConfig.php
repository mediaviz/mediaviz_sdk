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
