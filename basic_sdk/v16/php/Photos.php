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
        mixed $keywordListId = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/" . rawurlencode((string)$photoId);
        $query = [];
        if ($keywordListId !== null) $query['keyword_list_id'] = $keywordListId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked(
        mixed $tableName,
        mixed $month,
        mixed $year,
        mixed $ascOrDesc = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/month/" . rawurlencode((string)$month) . "/year/" . rawurlencode((string)$year) . "/ranked";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
