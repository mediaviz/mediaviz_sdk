<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Status {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getPhotosProjectUploadStatus(string $tableName, mixed $model): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/photos_project/" . rawurlencode((string)$tableName) . "/upload_status/" . rawurlencode((string)$model);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
