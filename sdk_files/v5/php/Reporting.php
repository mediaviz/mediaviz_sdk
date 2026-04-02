<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Reporting {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function updateProjectUploadReport(
        string $accessToken,
        string $refreshToken,
        string $projectTableName,
        mixed $skippedFileCount = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/project_upload_report/" . rawurlencode((string)$projectTableName) . "/";
        $query = [];
        if ($skippedFileCount !== null) $query['skipped_file_count'] = $skippedFileCount;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken);
    }
}
