<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Photos {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
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
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getPhotoFaceDetailsFromProject(string $tableName, int $photoId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/face_details/" . rawurlencode((string)$tableName) . "/" . rawurlencode((string)$photoId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectPhotoIdsByTableName(
        string $tableName,
        ?string $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null,
        mixed $includeAll = null,
        mixed $startDate = null,
        mixed $endDate = null,
        mixed $noDateTaken = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($includeAll !== null) $query['include_all'] = $includeAll;
        if ($startDate !== null) $query['start_date'] = $startDate;
        if ($endDate !== null) $query['end_date'] = $endDate;
        if ($noDateTaken !== null) $query['no_date_taken'] = $noDateTaken;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getRankedProjectPhotoIdsByTableName(
        string $tableName,
        ?string $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null,
        mixed $startDate = null,
        mixed $endDate = null,
        mixed $noDateTaken = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/ranked/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($startDate !== null) $query['start_date'] = $startDate;
        if ($endDate !== null) $query['end_date'] = $endDate;
        if ($noDateTaken !== null) $query['no_date_taken'] = $noDateTaken;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectMonthYearsWithPhotos(string $tableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photo_month_years/" . rawurlencode((string)$tableName);
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
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
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
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
