<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Person {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getAllPersonsFromPhoto(
        string $accessToken,
        string $refreshToken,
        mixed $projectTableName,
        mixed $photoId
    ): mixed {
        $path = "/api/v1/person/" . rawurlencode((string)$projectTableName) . "/photo/" . rawurlencode((string)$photoId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function updatePerson(
        string $accessToken,
        string $refreshToken,
        mixed $projectTableName,
        mixed $personId,
        mixed $personName = null
    ): mixed {
        $path = "/api/v1/person/" . rawurlencode((string)$projectTableName) . "/" . rawurlencode((string)$personId);
        $query = [];
        if ($personName !== null) $query['person_name'] = $personName;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken)->data;
    }

    public function getAllPersonsFromProject(
        string $accessToken,
        string $refreshToken,
        mixed $projectTableName
    ): mixed {
        $path = "/api/v1/person/" . rawurlencode((string)$projectTableName) . "/";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }
}
