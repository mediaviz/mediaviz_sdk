<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Photos {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getPhotosSort(
        string $accessToken,
        string $refreshToken,
        string $tableName,
        mixed $sortOrder,
        ?mixed $limit = null,
        ?mixed $lastId = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . urlencode($tableName) . "/sort/" . urlencode($sortOrder) . "/";
        $query = [];
        if ($limit !== null) $query['limit'] = $limit;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotos(
        string $accessToken,
        string $refreshToken,
        string $tableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . urlencode($tableName) . "/";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotos1(
        string $accessToken,
        string $refreshToken,
        string $tableName,
        mixed $id
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . urlencode($tableName) . "/" . urlencode($id) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function deletePhotosDelete(
        string $accessToken,
        string $refreshToken,
        string $tableName,
        ?mixed $photoIds = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . urlencode($tableName) . "/delete/";
        $query = [];
        if ($photoIds !== null) $query['photo_ids'] = $photoIds;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken);
    }

    public function getPhotosProject(
        string $accessToken,
        string $refreshToken,
        string $projectTable
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos_project/" . urlencode($projectTable) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotoMonthYears(
        string $accessToken,
        string $refreshToken,
        string $projectTable
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photo_month_years/" . urlencode($projectTable) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotosMonthYearSort(
        string $accessToken,
        string $refreshToken,
        string $projectTable,
        string $month,
        string $year,
        mixed $sortOrder,
        ?int $limit = null,
        ?int $lastId = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . urlencode($projectTable) . "/month/" . urlencode($month) . "/year/" . urlencode($year) . "/sort/" . urlencode($sortOrder) . "/";
        $query = [];
        if ($limit !== null) $query['limit'] = $limit;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotosDateTakenNone(
        string $accessToken,
        string $refreshToken,
        string $projectTable
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . urlencode($projectTable) . "/date_taken/none";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function updatePhotosUpdateIdRank(
        string $accessToken,
        string $refreshToken,
        string $projectTable,
        mixed $id,
        mixed $newCategory
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos_update/" . urlencode($projectTable) . "/id/" . urlencode($id) . "/rank/" . urlencode($newCategory) . ;
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken);
    }

    public function getPhotosRankedSort(
        string $accessToken,
        string $refreshToken,
        string $tableName,
        mixed $sortOrder,
        ?int $limit = null,
        ?int $lastId = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos_ranked/" . urlencode($tableName) . "/sort/" . urlencode($sortOrder) . "/";
        $query = [];
        if ($limit !== null) $query['limit'] = $limit;
        if ($lastId !== null) $query['last_id'] = $lastId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotosMonthYearRankedSort(
        string $accessToken,
        string $refreshToken,
        string $projectTable,
        string $month,
        string $year,
        string $sortOrder
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . urlencode($projectTable) . "/month/" . urlencode($month) . "/year/" . urlencode($year) . "/ranked/sort/" . urlencode($sortOrder) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getPhotosDateTakenNoneRankedSortDesc(
        string $accessToken,
        string $refreshToken,
        string $projectTable
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos/" . urlencode($projectTable) . "/date_taken/none/ranked/sort/desc";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
