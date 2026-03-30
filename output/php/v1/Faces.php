<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Faces {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getPersonPhoto(
        string $accessToken,
        string $refreshToken,
        string $projectTableName,
        int $photoId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/person/" . urlencode($projectTableName) . "/photo/" . urlencode($photoId) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function updatePerson(
        string $accessToken,
        string $refreshToken,
        string $projectTable,
        int $personId,
        ?string $personName = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/person/" . urlencode($projectTable) . "/" . urlencode($personId) . ;
        $query = [];
        if ($personName !== null) $query['person_name'] = $personName;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken);
    }

    public function getPerson(
        string $accessToken,
        string $refreshToken,
        string $projectTableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/person/" . urlencode($projectTableName) . "/";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
