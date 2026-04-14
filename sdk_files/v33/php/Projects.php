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

    public function getProjectPrelimModelRequestTemplate(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project_outcome/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getUserProjects(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/user";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getAdminProjects(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/admin";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getAllUserProjectsAdmin(mixed $userId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/admin/user/" . rawurlencode((string)$userId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectById(mixed $projectId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectByDirectory(mixed $directory): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/directory/" . rawurlencode((string)$directory);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
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

    public function updateProjectCreateUploadReport(mixed $tableName, mixed $filesFailedCount = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project_upload_report/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($filesFailedCount !== null) $query['files_failed_count'] = $filesFailedCount;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestProjectSimilarityQueue(mixed $projectTableName, mixed $level): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_similarity_queue/" . rawurlencode((string)$projectTableName) . "/level/" . rawurlencode((string)$level);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestProjectEvidenceQueue(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_evidence_queue/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestProjectPersonhoodQueue(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_personhood_queue/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestInsightsQueue(mixed $analysisLevel, mixed $identifier): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/insights_queue/analysis_level/" . rawurlencode((string)$analysisLevel) . "/identifier/" . rawurlencode((string)$identifier);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestProjectExport(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_export/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestProjectAdminExport(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_admin_export/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectDataExportUploadStatus(mixed $projectTableName, mixed $modelName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectTableName) . "/upload_status/" . rawurlencode((string)$modelName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function addProjectEvent(mixed $projectTableName, array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectTableName) . "/event";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function deleteProject(mixed $projectId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
