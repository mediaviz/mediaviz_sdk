<?php

declare(strict_types=1);

namespace OAuthSdk;

readonly class ClientRegistrationResponse
{
    /**
     * @param list<string> $redirectUris
     */
    public function __construct(
        public string $clientId,
        public string $clientName,
        public string $clientType,
        public array $redirectUris,
        public ?string $clientSecret = null,
    ) {}
}
