<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Export {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getProjectsUploadStatusDataExportService(string $tableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects/" . rawurlencode((string)$tableName) . "/upload_status/data_export_service";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getProjectsExport(string $tableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/projects_export/" . rawurlencode((string)$tableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
