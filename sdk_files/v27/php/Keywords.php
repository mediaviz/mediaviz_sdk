<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Keywords {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getUserKeywordFilteringLists(string $accessToken, string $refreshToken): mixed {
        $path = "/api/v1/keyword/user";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function createKeywordFilteringList(
        string $accessToken,
        string $refreshToken,
        array $body
    ): mixed {
        $path = "/api/v1/keyword/";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body)->data;
    }

    public function getKeywordFilteringListById(
        string $accessToken,
        string $refreshToken,
        mixed $keywordListId
    ): mixed {
        $path = "/api/v1/keyword/list/" . rawurlencode((string)$keywordListId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getDefaultKeywordFilteringListByProject(
        string $accessToken,
        string $refreshToken,
        mixed $projectTableName
    ): mixed {
        $path = "/api/v1/keyword/project/" . rawurlencode((string)$projectTableName) . "/default";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getExistingKeywordFilteringListByProject(
        string $accessToken,
        string $refreshToken,
        mixed $projectTableName
    ): mixed {
        $path = "/api/v1/keyword/project/" . rawurlencode((string)$projectTableName);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getKeywordsAndIds(string $accessToken, string $refreshToken): mixed {
        $path = "/api/v1/keyword/all_keywords/id/label";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function updateKeywordFilteringListLabels(
        string $accessToken,
        string $refreshToken,
        mixed $keywordListId,
        array $body
    ): mixed {
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken, $body)->data;
    }

    public function updateKeywordFilteringListDetails(
        string $accessToken,
        string $refreshToken,
        mixed $keywordListId,
        array $body
    ): mixed {
        $path = "/api/v1/keyword/details/" . rawurlencode((string)$keywordListId);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken, $body)->data;
    }

    public function addProjectToKeywordFilteringList(
        string $accessToken,
        string $refreshToken,
        mixed $keywordListId,
        mixed $projectIds = null
    ): mixed {
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId) . "/projects";
        $query = [];
        if ($projectIds !== null) $query['project_ids'] = $projectIds;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'POST', $accessToken, $refreshToken)->data;
    }

    public function getKeywordFilteringListAndProjectsById(
        string $accessToken,
        string $refreshToken,
        mixed $keywordListId
    ): mixed {
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function removeProjectsFromKeywordFilteringList(
        string $accessToken,
        string $refreshToken,
        mixed $keywordListId,
        mixed $projectIds = null
    ): mixed {
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId) . "/projects";
        $query = [];
        if ($projectIds !== null) $query['project_ids'] = $projectIds;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken)->data;
    }

    public function deleteKeywordFilteringListById(
        string $accessToken,
        string $refreshToken,
        mixed $keywordListId
    ): mixed {
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId);
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken)->data;
    }

    public function requestKeywordListExport(
        string $accessToken,
        string $refreshToken,
        mixed $keywordListId
    ): mixed {
        $path = "/api/v1/keyword/export/" . rawurlencode((string)$keywordListId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function requestKeywordListExportStatus(
        string $accessToken,
        string $refreshToken,
        mixed $keywordListId
    ): mixed {
        $path = "/api/v1/keyword/export_status/" . rawurlencode((string)$keywordListId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }
}
