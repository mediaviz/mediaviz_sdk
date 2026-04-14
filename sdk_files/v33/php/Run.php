<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Run {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createRun(array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/runs/";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function getRun(mixed $runId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/runs/" . rawurlencode((string)$runId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectRuns(mixed $projectId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/runs/project/" . rawurlencode((string)$projectId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updateRun(mixed $runId, array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/runs/" . rawurlencode((string)$runId);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function deleteRun(mixed $runId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/runs/" . rawurlencode((string)$runId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
