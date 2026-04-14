<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Photos {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getAllProjectPhotoIds(
        mixed $tableName,
        mixed $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getPhotoFromProject(
        mixed $tableName,
        mixed $photoId,
        mixed $id,
        mixed $keywordListId = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/" . rawurlencode((string)$photoId);
        $query = [];
        if ($keywordListId !== null) $query['keyword_list_id'] = $keywordListId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function deletePhotoFromProject(mixed $tableName, mixed $photoIds = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/delete/";
        $query = [];
        if ($photoIds !== null) $query['photo_ids'] = $photoIds;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectThumbnail(mixed $tableName, string $projectTable): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos_project/" . rawurlencode((string)$tableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectMonthYearsWithPhotos(mixed $tableName, string $projectTable): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photo_month_years/" . rawurlencode((string)$tableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectPhotoIdsByMonth(
        mixed $tableName,
        mixed $month,
        mixed $year,
        string $projectTable,
        mixed $ascOrDesc = null,
        ?int $lastId = null,
        ?int $limit = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/month/" . rawurlencode((string)$month) . "/year/" . rawurlencode((string)$year);
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectPhotoIdsNoDateTaken(mixed $tableName, string $projectTable): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/date_taken/none";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updatePhotoRanking(
        mixed $tableName,
        mixed $photoId,
        mixed $newCategory,
        string $projectTable,
        mixed $id
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos_update/" . rawurlencode((string)$tableName) . "/id/" . rawurlencode((string)$photoId) . "/rank/" . rawurlencode((string)$newCategory);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked(
        mixed $tableName,
        mixed $ascOrDesc = null,
        ?int $lastId = null,
        ?int $limit = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos_ranked/" . rawurlencode((string)$tableName);
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked(
        mixed $tableName,
        mixed $month,
        mixed $year,
        string $projectTable,
        mixed $ascOrDesc = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/month/" . rawurlencode((string)$month) . "/year/" . rawurlencode((string)$year) . "/ranked";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getTopProjectPhotosByTableNameNoDateTakenNewRanked(
        mixed $tableName,
        string $projectTable,
        mixed $ascOrDesc = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/date_taken/none/ranked";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
