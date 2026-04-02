<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Keywords {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getKeywordUser(string $accessToken, string $refreshToken): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/user";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function createKeyword(
        string $accessToken,
        string $refreshToken,
        mixed $name,
        mixed $projectList
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/";
        $body = [
            'name' => $name,
            'project_list' => $projectList,
        ];
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body);
    }

    public function getKeywordList(
        string $accessToken,
        string $refreshToken,
        int $keywordListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/list/" . rawurlencode((string)$keywordListId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getKeywordProjectDefault(
        string $accessToken,
        string $refreshToken,
        string $projectTableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/project/" . rawurlencode((string)$projectTableName) . "/default";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getKeywordProject(
        string $accessToken,
        string $refreshToken,
        string $projectTableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/project/" . rawurlencode((string)$projectTableName);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getKeywordAllKeywordsIdLabel(string $accessToken, string $refreshToken): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/all_keywords/id/label";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function updateKeyword(
        string $accessToken,
        string $refreshToken,
        int $keywordsListId,
        mixed $listKeywordsToInclude,
        mixed $listKeywordsToExclude
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordsListId);
        $body = [
            'list_keywords_to_include' => $listKeywordsToInclude,
            'list_keywords_to_exclude' => $listKeywordsToExclude,
        ];
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken, $body);
    }

    public function updateKeywordDetails(
        string $accessToken,
        string $refreshToken,
        int $keywordsListId,
        mixed $name
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/details/" . rawurlencode((string)$keywordsListId);
        $body = [
            'name' => $name,
        ];
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken, $body);
    }

    public function createKeywordProjects(
        string $accessToken,
        string $refreshToken,
        int $keywordListId,
        array $body = []
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId) . "/projects";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body);
    }

    public function getKeyword(
        string $accessToken,
        string $refreshToken,
        int $keywordListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function deleteKeywordProjects(
        string $accessToken,
        string $refreshToken,
        int $keywordListId,
        array $body = []
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId) . "/projects";
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken, $body);
    }

    public function deleteKeyword(
        string $accessToken,
        string $refreshToken,
        int $keywordListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId);
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken);
    }

    public function getKeywordExport(
        string $accessToken,
        string $refreshToken,
        int $keywordListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/export/" . rawurlencode((string)$keywordListId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getKeywordExportStatus(
        string $accessToken,
        string $refreshToken,
        int $keywordListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/export_status/" . rawurlencode((string)$keywordListId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
