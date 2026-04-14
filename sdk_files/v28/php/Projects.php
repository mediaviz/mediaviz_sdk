<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Projects {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function checkProjectStatus(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project/status/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectDataExportUploadStatus(mixed $projectTableName, mixed $modelName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectTableName) . "/upload_status/" . rawurlencode((string)$modelName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestProjectExport(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_export/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getUserProjects(mixed $companyId = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/user";
        $query = [];
        if ($companyId !== null) $query['company_id'] = $companyId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectByDirectory(mixed $directory, mixed $directoryPath): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/directory/" . rawurlencode((string)$directory);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectById(mixed $projectId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
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

    public function updateProject(mixed $projectId, array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function updateProjectPhotoCount(mixed $tableName, mixed $filesFailedCount = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_photos/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($filesFailedCount !== null) $query['files_failed_count'] = $filesFailedCount;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function deleteProject(mixed $projectId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function markProjectUploadComplete(mixed $projectTableName, mixed $skippedFileCount = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project/" . rawurlencode((string)$projectTableName) . "/upload_complete/";
        $query = [];
        if ($skippedFileCount !== null) $query['skipped_file_count'] = $skippedFileCount;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function addProjectEvent(mixed $projectTableName, array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectTableName) . "/event";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function updateProjectCreateUploadReport(mixed $tableName, mixed $filesFailedCount = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project_upload_report/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($filesFailedCount !== null) $query['files_failed_count'] = $filesFailedCount;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectPrelimModelRequestTemplate(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project_outcome/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
