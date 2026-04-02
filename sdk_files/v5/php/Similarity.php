<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Similarity {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getProjectsSimilarityLevelMedium(
        string $accessToken,
        string $refreshToken,
        string $projectTable
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/projects_similarity/" . rawurlencode((string)$projectTable) . "/level/medium";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getProjectsSimilarityQueueLevel(
        string $accessToken,
        string $refreshToken,
        string $projectTableName,
        string $similarityLevel
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/projects_similarity_queue/" . rawurlencode((string)$projectTableName) . "/level/" . rawurlencode((string)$similarityLevel);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getProjectsPersonhoodQueue(
        string $accessToken,
        string $refreshToken,
        string $projectTableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/projects_personhood_queue/" . rawurlencode((string)$projectTableName);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
