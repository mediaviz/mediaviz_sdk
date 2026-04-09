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
        mixed $keywordListId = null
    ): mixed {
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/" . rawurlencode((string)$photoId);
        $query = [];
        if ($keywordListId !== null) $query['keyword_list_id'] = $keywordListId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function deletePhotoFromProject(
        string $accessToken,
        string $refreshToken,
        mixed $tableName,
        mixed $photoIds = null
    ): mixed {
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/delete/";
        $query = [];
        if ($photoIds !== null) $query['photo_ids'] = $photoIds;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken)->data;
    }

    public function getProjectThumbnail(
        string $accessToken,
        string $refreshToken,
        mixed $tableName
    ): mixed {
        $path = "/api/v1/photos_project/" . rawurlencode((string)$tableName);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getProjectMonthYearsWithPhotos(
        string $accessToken,
        string $refreshToken,
        mixed $tableName
    ): mixed {
        $path = "/api/v1/photo_month_years/" . rawurlencode((string)$tableName);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getProjectPhotoIdsByMonth(
        string $accessToken,
        string $refreshToken,
        mixed $tableName,
        mixed $month,
        mixed $year,
        mixed $ascOrDesc = null
    ): mixed {
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/month/" . rawurlencode((string)$month) . "/year/" . rawurlencode((string)$year);
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getProjectPhotoIdsNoDateTaken(
        string $accessToken,
        string $refreshToken,
        mixed $tableName
    ): mixed {
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/date_taken/none";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function updatePhotoRanking(
        string $accessToken,
        string $refreshToken,
        mixed $tableName,
        mixed $photoId,
        mixed $newCategory
    ): mixed {
        $path = "/api/v1/photos_update/" . rawurlencode((string)$tableName) . "/id/" . rawurlencode((string)$photoId) . "/rank/" . rawurlencode((string)$newCategory);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken)->data;
    }

    public function getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked(
        string $accessToken,
        string $refreshToken,
        mixed $tableName,
        mixed $ascOrDesc = null
    ): mixed {
        $path = "/api/v1/photos_ranked/" . rawurlencode((string)$tableName);
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked(
        string $accessToken,
        string $refreshToken,
        mixed $tableName,
        mixed $month,
        mixed $year,
        mixed $ascOrDesc = null
    ): mixed {
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/month/" . rawurlencode((string)$month) . "/year/" . rawurlencode((string)$year) . "/ranked";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getTopProjectPhotosByTableNameNoDateTakenNewRanked(
        string $accessToken,
        string $refreshToken,
        mixed $tableName,
        mixed $ascOrDesc = null
    ): mixed {
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/date_taken/none/ranked";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }
}
