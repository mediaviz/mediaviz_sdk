<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Projects {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createProjectAndRun(
        string $name,
        ?bool $private = null,
        ?int $type = null,
        ?string $description = null,
        ?string $directory = null,
        ?int $photoUploadVector = null,
        ?string $thumbnail = null,
        ?string $runName = null,
        mixed $outcomes = null,
        mixed $models = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project_outcome/";
        $query = [];
        if ($outcomes !== null) $query['outcomes'] = $outcomes;
        if ($models !== null) $query['models'] = $models;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        $body = array_filter([
            'name' => $name,
            'private' => $private,
            'type' => $type,
            'description' => $description,
            'directory' => $directory,
            'photo_upload_vector' => $photoUploadVector,
            'thumbnail' => $thumbnail,
            'run_name' => $runName,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function markProjectUploadComplete(string $projectTableName, mixed $skippedFileCount = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project/" . rawurlencode((string)$projectTableName) . "/upload_complete/";
        $query = [];
        if ($skippedFileCount !== null) $query['skipped_file_count'] = $skippedFileCount;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function checkProjectStatus(string $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project/status/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectPrelimModelRequestTemplate(string $projectTableName): mixed {
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

    public function getProjectById(string $projectId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectByDirectory(string $directory): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/directory/" . rawurlencode((string)$directory);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updateProject(
        string $projectId,
        ?bool $private = null,
        ?int $type = null,
        ?string $description = null,
        ?string $directory = null,
        ?string $name = null,
        ?string $thumbnail = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        $body = array_filter([
            'private' => $private,
            'type' => $type,
            'description' => $description,
            'directory' => $directory,
            'name' => $name,
            'thumbnail' => $thumbnail,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function updateProjectPhotoCount(string $tableName, mixed $filesFailedCount = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_photos/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($filesFailedCount !== null) $query['files_failed_count'] = $filesFailedCount;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updateProjectCreateUploadReport(string $tableName, mixed $filesFailedCount = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project_upload_report/" . rawurlencode((string)$tableName) . "/";
        $query = [];
        if ($filesFailedCount !== null) $query['files_failed_count'] = $filesFailedCount;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestProjectSimilarityQueue(string $projectTableName, string $level): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_similarity_queue/" . rawurlencode((string)$projectTableName) . "/level/" . rawurlencode((string)$level);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestProjectEvidenceQueue(string $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_evidence_queue/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestProjectPersonhoodQueue(string $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_personhood_queue/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestInsightsQueue(string $analysisLevel, string $identifier): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/insights_queue/analysis_level/" . rawurlencode((string)$analysisLevel) . "/identifier/" . rawurlencode((string)$identifier);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestProjectExport(string $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_export/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectProcessStatus(string $projectTableName, string $modelName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectTableName) . "/process_status/" . rawurlencode((string)$modelName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function addProjectEvent(
        string $projectTableName,
        string $event,
        ?string $detail = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectTableName) . "/event";
        $body = array_filter([
            'event' => $event,
            'detail' => $detail,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function deleteProject(string $projectId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
