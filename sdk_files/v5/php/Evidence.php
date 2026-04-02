<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Evidence {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getProjectsEvidence(
        string $accessToken,
        string $refreshToken,
        string $projectTable
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/projects_evidence/" . rawurlencode((string)$projectTable);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
