<?php

declare(strict_types=1);

namespace OAuthSdk;

readonly class AuthenticatedResponse
{
    public function __construct(
        public mixed $data,
        public ?TokenResponse $updatedTokens,
    ) {}
}
