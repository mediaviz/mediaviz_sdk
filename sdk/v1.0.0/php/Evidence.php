<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Evidence {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getProjectsEvidence(string $projectTable): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_evidence/" . rawurlencode((string)$projectTable);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
