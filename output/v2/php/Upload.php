<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Upload {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function createUpload(string $accessToken, string $refreshToken): \OAuthSdk\AuthenticatedResponse {
        $path = "/upload";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken);
    }
}
