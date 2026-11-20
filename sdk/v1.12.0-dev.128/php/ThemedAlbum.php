<?php
declare(strict_types=1);
namespace MediaVizSdk;

class ThemedAlbum {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createThemedAlbum(
        string $projectTableName,
        string $name,
        ?string $description = null,
        ?float $confidenceValue = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/themed_album/project/" . rawurlencode((string)$projectTableName);
        $body = array_filter([
            'name' => $name,
            'description' => $description,
            'confidence_value' => $confidenceValue,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function getAllProjectThemedAlbums(string $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/themed_album/project/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getThemedAlbumPhotos(
        int $albumId,
        ?string $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null,
        mixed $confidenceValue = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/themed_album/photos/" . rawurlencode((string)$albumId) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($confidenceValue !== null) $query['confidence_value'] = $confidenceValue;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getThemedAlbumPhotosRanked(
        int $albumId,
        ?string $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null,
        mixed $confidenceValue = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/themed_album/photos/ranked/" . rawurlencode((string)$albumId) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($confidenceValue !== null) $query['confidence_value'] = $confidenceValue;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getThemedAlbumById(int $albumId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/themed_album/" . rawurlencode((string)$albumId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updateThemedAlbum(
        int $albumId,
        ?string $name = null,
        ?string $description = null,
        ?float $confidenceValue = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/themed_album/" . rawurlencode((string)$albumId);
        $body = array_filter([
            'name' => $name,
            'description' => $description,
            'confidence_value' => $confidenceValue,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function deleteThemedAlbum(int $albumId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/themed_album/" . rawurlencode((string)$albumId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function convertThemedAlbumToCustom(int $albumId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/themed_album/" . rawurlencode((string)$albumId) . "/convert";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
