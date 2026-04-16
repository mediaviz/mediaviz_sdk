<?php
declare(strict_types=1);
namespace MediaVizSdk;

class CustomAlbums {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getCustomAlbumDetailById(int $customAlbumId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/custom_album/" . rawurlencode((string)$customAlbumId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getAllProjectCustomAlbums(string $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/custom_album/project/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getCustomAlbumPhotosById(
        int $customAlbumId,
        ?string $ascOrDesc = null,
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
        int $customAlbumId,
        ?string $ascOrDesc = null,
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

    public function createProjectCustomAlbum(
        string $projectTableName,
        ?string $name = null,
        ?string $description = null,
        ?array $photoIdInclusionList = null,
        ?array $photoIdRemovalList = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/custom_album/project/" . rawurlencode((string)$projectTableName);
        $body = array_filter([
            'name' => $name,
            'description' => $description,
            'photo_id_inclusion_list' => $photoIdInclusionList,
            'photo_id_removal_list' => $photoIdRemovalList,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function updateCustomAlbum(
        int $albumId,
        ?string $name = null,
        ?string $description = null,
        ?array $photoIdInclusionList = null,
        ?array $photoIdRemovalList = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/custom_album/" . rawurlencode((string)$albumId);
        $body = array_filter([
            'name' => $name,
            'description' => $description,
            'photo_id_inclusion_list' => $photoIdInclusionList,
            'photo_id_removal_list' => $photoIdRemovalList,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function deleteCustomAlbum(int $albumId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/custom_album/" . rawurlencode((string)$albumId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
