<?php

declare(strict_types=1);

namespace OAuthSdk;

readonly class ClientRegistrationRequest
{
    /**
     * @param list<string> $redirectUris
     */
    public function __construct(
        public string $baseUrl,
        public string $clientName,
        public string $clientType,
        public array $redirectUris,
        public bool $isFirstParty,
    ) {}
}
