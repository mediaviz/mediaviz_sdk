<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Keywords {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getUserKeywordFilteringLists(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/user";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function createKeywordFilteringList(array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function getKeywordFilteringListById(mixed $keywordListId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/list/" . rawurlencode((string)$keywordListId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getDefaultKeywordFilteringListByProject(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/project/" . rawurlencode((string)$projectTableName) . "/default";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getExistingKeywordFilteringListByProject(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/project/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getKeywordsAndIds(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/all_keywords/id/label";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updateKeywordFilteringListLabels(
        mixed $keywordListId,
        int $keywordsListId,
        array $body
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function updateKeywordFilteringListDetails(
        mixed $keywordListId,
        int $keywordsListId,
        array $body
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/details/" . rawurlencode((string)$keywordListId);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function addProjectToKeywordFilteringList(
        mixed $keywordListId,
        array $body = [],
        mixed $projectIds = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId) . "/projects";
        $query = [];
        if ($projectIds !== null) $query['project_ids'] = $projectIds;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function getKeywordFilteringListAndProjectsById(mixed $keywordListId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function removeProjectsFromKeywordFilteringList(
        mixed $keywordListId,
        array $body = [],
        mixed $projectIds = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId) . "/projects";
        $query = [];
        if ($projectIds !== null) $query['project_ids'] = $projectIds;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function deleteKeywordFilteringListById(mixed $keywordListId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestKeywordListExport(mixed $keywordListId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/export/" . rawurlencode((string)$keywordListId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestKeywordListExportStatus(mixed $keywordListId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/export_status/" . rawurlencode((string)$keywordListId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
