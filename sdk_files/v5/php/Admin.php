<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Admin {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getAdminGoogleSheetsCredentials(string $accessToken, string $refreshToken): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/admin/get_google_sheets_credentials";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken);
    }
}
