<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Export {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getProjectsUploadStatusDataExportService(
        string $accessToken,
        string $refreshToken,
        string $tableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/projects/" . rawurlencode((string)$tableName) . "/upload_status/data_export_service";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getProjectsExport(
        string $accessToken,
        string $refreshToken,
        string $tableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/projects_export/" . rawurlencode((string)$tableName);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
