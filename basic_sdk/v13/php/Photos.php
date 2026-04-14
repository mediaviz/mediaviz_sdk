<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Photos {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getAllProjectPhotoIds(
        string $accessToken,
        string $refreshToken,
        mixed $tableName,
        mixed $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null
    ): mixed {
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getPhotoFromProject(
        string $accessToken,
        string $refreshToken,
        mixed $tableName,
        mixed $photoId,
        mixed $id,
        mixed $keywordListId = null
    ): mixed {
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/" . rawurlencode((string)$photoId);
        $query = [];
        if ($keywordListId !== null) $query['keyword_list_id'] = $keywordListId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked(
        string $accessToken,
        string $refreshToken,
        mixed $tableName,
        mixed $month,
        mixed $year,
        string $projectTable,
        mixed $ascOrDesc = null
    ): mixed {
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/month/" . rawurlencode((string)$month) . "/year/" . rawurlencode((string)$year) . "/ranked";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }
}
