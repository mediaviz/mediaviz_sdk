<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Projects {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function createProjectAndRun(
        string $accessToken,
        string $refreshToken,
        array $body,
        mixed $outcomes = null,
        mixed $models = null
    ): mixed {
        $path = "/api/v1/project_outcome/";
        $query = [];
        if ($outcomes !== null) $query['outcomes'] = $outcomes;
        if ($models !== null) $query['models'] = $models;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body)->data;
    }

    public function markProjectUploadComplete(
        string $accessToken,
        string $refreshToken,
        mixed $projectTableName,
        mixed $skippedFileCount = null
    ): mixed {
        $path = "/api/v1/project/" . rawurlencode((string)$projectTableName) . "/upload_complete/";
        $query = [];
        if ($skippedFileCount !== null) $query['skipped_file_count'] = $skippedFileCount;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'POST', $accessToken, $refreshToken)->data;
    }

    public function checkProjectStatus(
        string $accessToken,
        string $refreshToken,
        mixed $projectTableName
    ): mixed {
        $path = "/api/v1/project/status/" . rawurlencode((string)$projectTableName);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function deleteProject(
        string $accessToken,
        string $refreshToken,
        mixed $projectId
    ): mixed {
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken)->data;
    }

    public function getProjectPrelimModelRequestTemplate(
        string $accessToken,
        string $refreshToken,
        mixed $projectTableName
    ): mixed {
        $path = "/api/v1/project_outcome/" . rawurlencode((string)$projectTableName);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }
}
