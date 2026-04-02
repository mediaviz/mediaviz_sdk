<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Projects {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getProjectsUser(
        string $accessToken,
        string $refreshToken,
        mixed $companyId = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/projects/user";
        $query = [];
        if ($companyId !== null) $query['company_id'] = $companyId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getProjectsDirectory(
        string $accessToken,
        string $refreshToken,
        mixed $directoryPath
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/projects/directory/" . rawurlencode((string)$directoryPath);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getProjects(
        string $accessToken,
        string $refreshToken,
        int $projectId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function createProjectOutcome(
        string $accessToken,
        string $refreshToken,
        mixed $name,
        mixed $description,
        mixed $thumbnail,
        mixed $photoUploadVector,
        mixed $outcomes = null,
        mixed $models = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/project_outcome/";
        $query = [];
        if ($outcomes !== null) $query['outcomes'] = $outcomes;
        if ($models !== null) $query['models'] = $models;
        if ($query) $path .= '?' . http_build_query($query);
        $body = [
            'name' => $name,
            'description' => $description,
            'thumbnail' => $thumbnail,
            'photo_upload_vector' => $photoUploadVector,
        ];
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body);
    }

    public function updateProjects(
        string $accessToken,
        string $refreshToken,
        int $projectId,
        array $body = []
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken, $body);
    }

    public function updateProjectsPhotos(
        string $accessToken,
        string $refreshToken,
        string $tableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/projects_photos/" . rawurlencode((string)$tableName);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken);
    }

    public function deleteProjects(
        string $accessToken,
        string $refreshToken,
        int $projectId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/projects/" . rawurlencode((string)$projectId);
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken);
    }

    public function createProjectsEvent(
        string $accessToken,
        string $refreshToken,
        string $projectTableName,
        mixed $event,
        mixed $detail
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/projects/" . rawurlencode((string)$projectTableName) . "/event";
        $body = [
            'event' => $event,
            'detail' => $detail,
        ];
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body);
    }
}
