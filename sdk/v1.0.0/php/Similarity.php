<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Similarity {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getProjectsSimilarityLevelMedium(string $projectTable): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_similarity/" . rawurlencode((string)$projectTable) . "/level/medium";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectsSimilarityQueueLevel(string $projectTableName, string $similarityLevel): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_similarity_queue/" . rawurlencode((string)$projectTableName) . "/level/" . rawurlencode((string)$similarityLevel);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectsPersonhoodQueue(string $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_personhood_queue/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
