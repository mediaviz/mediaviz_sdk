<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Projects {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getProjectDataExportUploadStatus(
        string $accessToken,
        string $refreshToken,
        mixed $projectTableName,
        mixed $modelName
    ): mixed {
        $path = "/api/v1/projects/" . rawurlencode((string)$projectTableName) . "/upload_status/" . rawurlencode((string)$modelName);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function requestProjectExport(
        string $accessToken,
        string $refreshToken,
        mixed $projectTableName
    ): mixed {
        $path = "/api/v1/projects_export/" . rawurlencode((string)$projectTableName);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getUserProjects(string $accessToken, string $refreshToken): mixed {
        $path = "/api/v1/projects/user";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getProjectByDirectory(
        string $accessToken,
        string $refreshToken,
        mixed $directory
    ): mixed {
        $path = "/api/v1/projects/directory/" . rawurlencode((string)$directory);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getProjectById(
        string $accessToken,
        string $refreshToken,
        mixed $projectId
    ): mixed {
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
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

    public function updateProject(
        string $accessToken,
        string $refreshToken,
        mixed $projectId,
        array $body
    ): mixed {
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken, $body)->data;
    }

    public function updateProjectPhotoCount(
        string $accessToken,
        string $refreshToken,
        mixed $tableName,
        mixed $filesFailedCount = null
    ): mixed {
        $path = "/api/v1/projects_photos/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($filesFailedCount !== null) $query['files_failed_count'] = $filesFailedCount;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken)->data;
    }

    public function deleteProject(
        string $accessToken,
        string $refreshToken,
        mixed $projectId
    ): mixed {
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken)->data;
    }

    public function addProjectEvent(
        string $accessToken,
        string $refreshToken,
        mixed $projectTableName,
        array $body
    ): mixed {
        $path = "/api/v1/projects/" . rawurlencode((string)$projectTableName) . "/event";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body)->data;
    }

    public function updateProjectCreateUploadReport(
        string $accessToken,
        string $refreshToken,
        mixed $tableName,
        mixed $filesFailedCount = null
    ): mixed {
        $path = "/api/v1/project_upload_report/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($filesFailedCount !== null) $query['files_failed_count'] = $filesFailedCount;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken)->data;
    }
}
