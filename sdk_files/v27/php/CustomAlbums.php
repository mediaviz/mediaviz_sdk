<?php
declare(strict_types=1);
namespace MediaVizSdk;

class CustomAlbums {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function createProjectCustomAlbum(
        string $accessToken,
        string $refreshToken,
        mixed $projectTableName,
        array $body
    ): mixed {
        $path = "/api/v1/custom_album/project/" . rawurlencode((string)$projectTableName);
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body)->data;
    }

    public function getAllProjectCustomAlbums(
        string $accessToken,
        string $refreshToken,
        mixed $projectTableName
    ): mixed {
        $path = "/api/v1/custom_album/project/" . rawurlencode((string)$projectTableName);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getCustomAlbumDetailById(
        string $accessToken,
        string $refreshToken,
        mixed $customAlbumId
    ): mixed {
        $path = "/api/v1/custom_album/" . rawurlencode((string)$customAlbumId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function deleteCustomAlbum(
        string $accessToken,
        string $refreshToken,
        mixed $albumId
    ): mixed {
        $path = "/api/v1/custom_album/" . rawurlencode((string)$albumId);
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken)->data;
    }

    public function updateCustomAlbum(
        string $accessToken,
        string $refreshToken,
        mixed $albumId,
        array $body
    ): mixed {
        $path = "/api/v1/custom_album/" . rawurlencode((string)$albumId);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken, $body)->data;
    }

    public function getCustomAlbumPhotosById(
        string $accessToken,
        string $refreshToken,
        mixed $customAlbumId,
        mixed $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null
    ): mixed {
        $path = "/api/v1/custom_album/photos/" . rawurlencode((string)$customAlbumId) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getTopMiddleBottomCustomAlbumById(
        string $accessToken,
        string $refreshToken,
        mixed $customAlbumId,
        mixed $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null
    ): mixed {
        $path = "/api/v1/custom_album/photos/ranked/" . rawurlencode((string)$customAlbumId) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }
}
