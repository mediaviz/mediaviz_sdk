<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Reporting {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function updateProjectUploadReport(string $projectTableName, mixed $skippedFileCount = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/project_upload_report/" . rawurlencode((string)$projectTableName) . "/";
        $query = [];
        if ($skippedFileCount !== null) $query['skipped_file_count'] = $skippedFileCount;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
