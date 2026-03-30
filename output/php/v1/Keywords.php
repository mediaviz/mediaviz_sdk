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

    public function createKeyword(string $accessToken, string $refreshToken): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken);
    }

    public function getKeywordList(
        string $accessToken,
        string $refreshToken,
        int $keywordListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/list/" . urlencode($keywordListId) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getKeywordProjectDefault(
        string $accessToken,
        string $refreshToken,
        string $projectTableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/project/" . urlencode($projectTableName) . "/default";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getKeywordProject(
        string $accessToken,
        string $refreshToken,
        string $projectTableName
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/project/" . urlencode($projectTableName) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getKeywordAllKeywordsIdLabel(string $accessToken, string $refreshToken): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/all_keywords/id/label";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function updateKeyword(
        string $accessToken,
        string $refreshToken,
        int $keywordsListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/" . urlencode($keywordsListId) . ;
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken);
    }

    public function updateKeywordDetails(
        string $accessToken,
        string $refreshToken,
        int $keywordsListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/details/" . urlencode($keywordsListId) . ;
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken);
    }

    public function createKeywordProjects(
        string $accessToken,
        string $refreshToken,
        int $keywordListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/" . urlencode($keywordListId) . "/projects";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken);
    }

    public function getKeyword(
        string $accessToken,
        string $refreshToken,
        int $keywordListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/" . urlencode($keywordListId) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function deleteKeywordProjects(
        string $accessToken,
        string $refreshToken,
        int $keywordListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/" . urlencode($keywordListId) . "/projects";
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken);
    }

    public function deleteKeyword(
        string $accessToken,
        string $refreshToken,
        int $keywordListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/" . urlencode($keywordListId) . ;
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken);
    }

    public function getKeywordExport(
        string $accessToken,
        string $refreshToken,
        int $keywordListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/export/" . urlencode($keywordListId) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getKeywordExportStatus(
        string $accessToken,
        string $refreshToken,
        int $keywordListId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/keyword/export_status/" . urlencode($keywordListId) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
