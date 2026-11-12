<?php

declare(strict_types=1);

namespace OAuthSdk;

class OAuthError extends \RuntimeException
{
    public function __construct(
        public readonly string $errorCode,
        public readonly string $description,
        public readonly int $httpStatus,
        public readonly ?string $body = null,
    ) {
        parent::__construct("OAuth error [{$errorCode}]: {$description}");
    }

    public static function fromResponse(int $httpStatus, string $body): self
    {
        $data = json_decode($body, true);

        if (is_array($data) && isset($data['error']) && is_string($data['error'])) {
            return new self(
                $data['error'],
                $data['error_description'] ?? '',
                $httpStatus,
                $body,
            );
        }

        return new self('server_error', 'Unexpected server response', $httpStatus, $body);
    }
}
