<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Projects {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createProjectAndRun(
        array $body,
        mixed $outcomes = null,
        mixed $models = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project_outcome/";
        $query = [];
        if ($outcomes !== null) $query['outcomes'] = $outcomes;
        if ($models !== null) $query['models'] = $models;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function markProjectUploadComplete(mixed $projectTableName, mixed $skippedFileCount = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project/" . rawurlencode((string)$projectTableName) . "/upload_complete/";
        $query = [];
        if ($skippedFileCount !== null) $query['skipped_file_count'] = $skippedFileCount;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function checkProjectStatus(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project/status/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function deleteProject(mixed $projectId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectPrelimModelRequestTemplate(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project_outcome/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
