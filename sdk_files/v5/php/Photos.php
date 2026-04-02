<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Photos {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getPhotoIds(
        string $accessToken,
        string $refreshToken,
        string $tableName,
        mixed $ascOrDesc = null,
        mixed $lastId = null,
        mixed $limit = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotoById(
        string $accessToken,
        string $refreshToken,
        string $tableName,
        mixed $id
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/" . rawurlencode((string)$id);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function deletePhotos(
        string $accessToken,
        string $refreshToken,
        string $tableName,
        mixed $photoIds = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . rawurlencode((string)$tableName) . "/delete/";
        $query = [];
        if ($photoIds !== null) $query['photo_ids'] = $photoIds;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken);
    }

    public function getProjectThumbnail(
        string $accessToken,
        string $refreshToken,
        string $projectTable
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos_project/" . rawurlencode((string)$projectTable);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getProjectMonthYears(
        string $accessToken,
        string $refreshToken,
        string $projectTable
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photo_month_years/" . rawurlencode((string)$projectTable);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotosByMonthYearSort(
        string $accessToken,
        string $refreshToken,
        string $projectTable,
        string $month,
        string $year,
        mixed $ascOrDesc = null,
        ?int $lastId = null,
        ?int $limit = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . rawurlencode((string)$projectTable) . "/month/" . rawurlencode((string)$month) . "/year/" . rawurlencode((string)$year) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotosDateTakenNone(
        string $accessToken,
        string $refreshToken,
        string $projectTable
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . rawurlencode((string)$projectTable) . "/date_taken/none";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function updatePhotosUpdateRankById(
        string $accessToken,
        string $refreshToken,
        string $projectTable,
        mixed $id,
        mixed $newCategory
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos_update/" . rawurlencode((string)$projectTable) . "/id/" . rawurlencode((string)$id) . "/rank/" . rawurlencode((string)$newCategory);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken);
    }

    public function getPhotosRanked(
        string $accessToken,
        string $refreshToken,
        string $tableName,
        mixed $ascOrDesc = null,
        ?int $lastId = null,
        ?int $limit = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos_ranked/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotosMonthYearRanked(
        string $accessToken,
        string $refreshToken,
        string $projectTable,
        string $month,
        string $year,
        mixed $ascOrDesc = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . rawurlencode((string)$projectTable) . "/month/" . rawurlencode((string)$month) . "/year/" . rawurlencode((string)$year) . "/ranked";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotosDateTakenNoneRankedSortDesc(
        string $accessToken,
        string $refreshToken,
        string $projectTable,
        mixed $ascOrDesc = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . rawurlencode((string)$projectTable) . "/date_taken/none/ranked";
        $query = [];
        if ($ascOrDesc !== null) $query['asc_or_desc'] = $ascOrDesc;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
