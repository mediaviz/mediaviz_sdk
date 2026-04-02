<?php
declare(strict_types=1);
namespace MediaVizSdk;

class CustomAlbums {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function createCustomAlbumProject(
        string $accessToken,
        string $refreshToken,
        string $projectTableName,
        mixed $name,
        mixed $description,
        mixed $photoIdInclusionList
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/project/" . rawurlencode((string)$projectTableName);
        $body = [
            'name' => $name,
            'description' => $description,
            'photo_id_inclusion_list' => $photoIdInclusionList,
        ];
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body);
    }

    public function getCustomAlbumProject(
        string $accessToken,
        string $refreshToken,
        string $projectTableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/project/" . rawurlencode((string)$projectTableName);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getCustomAlbum(
        string $accessToken,
        string $refreshToken,
        int $customAlbumId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/" . rawurlencode((string)$customAlbumId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function deleteCustomAlbum(
        string $accessToken,
        string $refreshToken,
        int $customAlbumId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/" . rawurlencode((string)$customAlbumId);
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken);
    }

    public function updateCustomAlbum(
        string $accessToken,
        string $refreshToken,
        int $customAlbumId,
        array $body = []
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/" . rawurlencode((string)$customAlbumId);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken, $body);
    }

    public function getCustomAlbumPhotosSort(
        string $accessToken,
        string $refreshToken,
        int $customAlbumId,
        mixed $ascOrDesc = null,
        ?int $lastId = null,
        ?int $limit = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/photos/" . rawurlencode((string)$customAlbumId) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getCustomAlbumPhotosRankedSort(
        string $accessToken,
        string $refreshToken,
        int $customAlbumId,
        mixed $ascOrDesc = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/photos/ranked/" . rawurlencode((string)$customAlbumId) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
