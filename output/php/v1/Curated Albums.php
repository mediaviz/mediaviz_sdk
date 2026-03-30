<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Curated Albums {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getPhotosAlbum(
        string $accessToken,
        string $refreshToken,
        string $projectTable
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos_album/" . urlencode($projectTable) . "/";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotosAlbumTypeSort(
        string $accessToken,
        string $refreshToken,
        string $projectTable,
        string $formattedAlbum,
        mixed $sortOrder,
        ?int $limit = null,
        ?int $lastId = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos_album/" . urlencode($projectTable) . "/type/" . urlencode($formattedAlbum) . "/sort/" . urlencode($sortOrder) . ;
        $query = [];
        if ($limit !== null) $query['limit'] = $limit;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotosAlbumTypeRankedSort(
        string $accessToken,
        string $refreshToken,
        string $projectTable,
        string $formattedAlbum,
        mixed $sortOrder
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos_album/" . urlencode($projectTable) . "/type/" . urlencode($formattedAlbum) . "/ranked/sort/" . urlencode($sortOrder) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
