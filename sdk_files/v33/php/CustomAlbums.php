<?php
declare(strict_types=1);
namespace MediaVizSdk;

class CustomAlbums {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getCustomAlbumDetailById(mixed $customAlbumId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/custom_album/" . rawurlencode((string)$customAlbumId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getAllProjectCustomAlbums(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/custom_album/project/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getCustomAlbumPhotosById(
        mixed $customAlbumId,
        mixed $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/custom_album/photos/" . rawurlencode((string)$customAlbumId) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getTopMiddleBottomCustomAlbumById(
        mixed $customAlbumId,
        mixed $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/custom_album/photos/ranked/" . rawurlencode((string)$customAlbumId) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function createProjectCustomAlbum(mixed $projectTableName, array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/custom_album/project/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function updateCustomAlbum(mixed $albumId, array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/custom_album/" . rawurlencode((string)$albumId);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function deleteCustomAlbum(mixed $albumId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/custom_album/" . rawurlencode((string)$albumId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
