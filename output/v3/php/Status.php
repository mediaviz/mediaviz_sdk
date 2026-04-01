<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Status {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getPhotosProjectUploadStatus(
        string $accessToken,
        string $refreshToken,
        string $tableName,
        mixed $model
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/photos_project/" . urlencode($tableName) . "/upload_status/" . urlencode($model) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
