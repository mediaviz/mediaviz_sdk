<?php
declare(strict_types=1);
namespace MediaVizSdk;

class CuratedAlbums {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getAllProjectCuratedAlbums(
        string $accessToken,
        string $refreshToken,
        string $projectTableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/curated_album/project/" . rawurlencode((string)$projectTableName);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getCuratedAlbumPhotos(
        string $accessToken,
        string $refreshToken,
        int $albumId,
        mixed $ascOrDesc = null,
        ?int $lastId = null,
        ?int $limit = null,
        mixed $confidenceValue = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/curated_album/photos/" . rawurlencode((string)$albumId) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($confidenceValue !== null) $query['confidence_value'] = $confidenceValue;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getCuratedAlbumPhotosRanked(
        string $accessToken,
        string $refreshToken,
        int $albumId,
        mixed $ascOrDesc = null,
        ?int $lastId = null,
        ?int $limit = null,
        mixed $confidenceValue = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/curated_album/photos/ranked/" . rawurlencode((string)$albumId) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($confidenceValue !== null) $query['confidence_value'] = $confidenceValue;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
