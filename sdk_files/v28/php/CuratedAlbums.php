<?php
declare(strict_types=1);
namespace MediaVizSdk;

class CuratedAlbums {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getAllProjectCuratedAlbums(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/curated_album/project/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getCuratedAlbumPhotos(
        mixed $albumId,
        mixed $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null,
        mixed $confidenceValue = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/curated_album/photos/" . rawurlencode((string)$albumId) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($confidenceValue !== null) $query['confidence_value'] = $confidenceValue;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getCuratedAlbumPhotosRanked(
        mixed $albumId,
        mixed $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null,
        mixed $confidenceValue = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/curated_album/photos/ranked/" . rawurlencode((string)$albumId) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($confidenceValue !== null) $query['confidence_value'] = $confidenceValue;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
