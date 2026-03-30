<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Custom Albums {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function createCustomAlbumProject(
        string $accessToken,
        string $refreshToken,
        string $projectTableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/project/" . urlencode($projectTableName) . ;
        return $this->client->request($path, 'POST', $accessToken, $refreshToken);
    }

    public function getCustomAlbumProject(
        string $accessToken,
        string $refreshToken,
        string $projectTableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/project/" . urlencode($projectTableName) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getCustomAlbum(
        string $accessToken,
        string $refreshToken,
        int $customAlbumId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/" . urlencode($customAlbumId) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function deleteCustomAlbum(
        string $accessToken,
        string $refreshToken,
        int $customAlbumId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/" . urlencode($customAlbumId) . ;
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken);
    }

    public function updateCustomAlbum(
        string $accessToken,
        string $refreshToken,
        int $customAlbumId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/" . urlencode($customAlbumId) . ;
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken);
    }

    public function getCustomAlbumPhotosSort(
        string $accessToken,
        string $refreshToken,
        int $customAlbumId,
        mixed $sortOrder,
        ?int $limit = null,
        ?int $lastId = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/photos/" . urlencode($customAlbumId) . "/sort/" . urlencode($sortOrder) . "/";
        $query = [];
        if ($limit !== null) $query['limit'] = $limit;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getCustomAlbumPhotosRankedSort(
        string $accessToken,
        string $refreshToken,
        int $customAlbumId,
        mixed $sortOrder
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/custom_album/photos/ranked/" . urlencode($customAlbumId) . "/sort/" . urlencode($sortOrder) . "/";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
