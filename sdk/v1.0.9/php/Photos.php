<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Photos {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function addPhotoToProject(
        mixed $photo,
        mixed $tableName,
        mixed $sourceResolutionX,
        mixed $sourceResolutionY,
        mixed $dateTaken,
        mixed $latitude,
        mixed $longitude,
        mixed $filePath,
        mixed $title,
        mixed $clientSideId
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/";
        $body = [
            'photo' => $photo,
            'table_name' => $tableName,
            'source_resolution_x' => $sourceResolutionX,
            'source_resolution_y' => $sourceResolutionY,
            'date_taken' => $dateTaken,
            'latitude' => $latitude,
            'longitude' => $longitude,
            'file_path' => $filePath,
            'title' => $title,
            'client_side_id' => $clientSideId,
        ];
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function getPhotoFromProject(
        string $tableName,
        int $photoId,
        ?int $keywordListId = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/" . rawurlencode((string)$photoId);
        $query = [];
        if ($keywordListId !== null) $query['keyword_list_id'] = $keywordListId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getPhotoFaceDetailsFromProject(string $tableName, int $photoId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/face_details/" . rawurlencode((string)$tableName) . "/" . rawurlencode((string)$photoId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getAllProjectPhotoIds(
        string $tableName,
        ?string $ascOrDesc = null,
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

    public function getTopMiddleBottomProjectPhotoIds(string $tableName, ?string $ascOrDesc = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos_top/" . rawurlencode((string)$tableName);
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getTopMiddleBottomProjectPhotosByTableNameSortedByDateRankedKeysetPaginated(
        string $tableName,
        ?string $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos_ranked/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectMonthYearsWithPhotos(string $tableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photo_month_years/" . rawurlencode((string)$tableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectPhotoIdsByMonth(
        string $tableName,
        int $month,
        int $year,
        ?string $ascOrDesc = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/month/" . rawurlencode((string)$month) . "/year/" . rawurlencode((string)$year);
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectPhotoIdsByMonthKeysetPaginated(
        string $tableName,
        int $month,
        int $year,
        ?string $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/month/" . rawurlencode((string)$month) . "/year/" . rawurlencode((string)$year) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getTopProjectPhotosByTableNameByMonth(
        string $tableName,
        int $month,
        int $year,
        ?string $ascOrDesc = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/month/" . rawurlencode((string)$month) . "/year/" . rawurlencode((string)$year) . "/top";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateRankedKeysetPaginated(
        string $tableName,
        int $month,
        int $year,
        ?string $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/month/" . rawurlencode((string)$month) . "/year/" . rawurlencode((string)$year) . "/ranked/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectPhotoIdsNoDateTakenKeysetPaginated(
        string $tableName,
        ?string $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/date_taken/none/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getTopProjectPhotosByTableNameNoDateTakenRanked(string $tableName, ?string $ascOrDesc = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/date_taken/none/ranked";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectThumbnail(string $tableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos_project/" . rawurlencode((string)$tableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updatePhotoInProject(
        ?string $tableName = null,
        ?int $photoId = null,
        mixed $photoData = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos_update";
        $query = [];
        if ($tableName !== null) $query['table_name'] = $tableName;
        if ($photoId !== null) $query['photo_id'] = $photoId;
        if ($photoData !== null) $query['photo_data'] = $photoData;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updatePhotoRanking(
        string $tableName,
        int $photoId,
        string $newCategory
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos_update/" . rawurlencode((string)$tableName) . "/id/" . rawurlencode((string)$photoId) . "/rank/" . rawurlencode((string)$newCategory);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function deletePhotoFromProject(string $tableName, mixed $photoIds = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/delete/";
        $query = [];
        if ($photoIds !== null) $query['photo_ids'] = $photoIds;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
