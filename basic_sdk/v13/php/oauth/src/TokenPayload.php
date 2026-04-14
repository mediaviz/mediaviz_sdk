<?php

declare(strict_types=1);

namespace OAuthSdk;

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
