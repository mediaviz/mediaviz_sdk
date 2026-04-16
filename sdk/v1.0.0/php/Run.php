<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Run {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createRun(
        mixed $projectId,
        bool $colorsModel,
        bool $blurModel,
        bool $faceRecognitionModel,
        bool $imageClassificationModel,
        bool $imageComparisonModel,
        bool $personhoodModel,
        bool $similarityModel,
        bool $evidenceModel,
        ?bool $active = null,
        ?string $name = null,
        ?string $similarityLevel = null,
        ?bool $normalize = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/runs/";
        $body = array_filter([
            'project_id' => $projectId,
            'active' => $active,
            'name' => $name,
            'similarity_level' => $similarityLevel,
            'normalize' => $normalize,
            'colors_model' => $colorsModel,
            'blur_model' => $blurModel,
            'face_recognition_model' => $faceRecognitionModel,
            'image_classification_model' => $imageClassificationModel,
            'image_comparison_model' => $imageComparisonModel,
            'personhood_model' => $personhoodModel,
            'similarity_model' => $similarityModel,
            'evidence_model' => $evidenceModel,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function getRun(int $runId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/runs/" . rawurlencode((string)$runId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectRuns(string $projectId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/runs/project/" . rawurlencode((string)$projectId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updateRun(
        int $runId,
        ?int $projectRunIndex = null,
        ?array $models = null,
        ?bool $active = null,
        ?string $name = null,
        mixed $similarityLevel = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/runs/" . rawurlencode((string)$runId);
        $body = array_filter([
            'project_run_index' => $projectRunIndex,
            'models' => $models,
            'active' => $active,
            'name' => $name,
            'similarity_level' => $similarityLevel,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function deleteRun(int $runId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/runs/" . rawurlencode((string)$runId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
