<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Keywords {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createKeywordFilteringList(string $name, ?array $projectList = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/";
        $body = array_filter([
            'name' => $name,
            'project_list' => $projectList,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function getUserKeywordFilteringLists(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/user";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getKeywordFilteringListAndProjectsById(int $keywordListId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getKeywordFilteringListById(int $keywordListId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/list/" . rawurlencode((string)$keywordListId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getExistingKeywordFilteringListByProject(string $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/project/" . rawurlencode((string)$projectTableName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getDefaultKeywordFilteringListByProject(string $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/project/" . rawurlencode((string)$projectTableName) . "/default";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updateKeywordFilteringListLabels(
        int $keywordListId,
        array $listKeywordsToInclude,
        array $listKeywordsToExclude
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId);
        $body = array_filter([
            'list_keywords_to_include' => $listKeywordsToInclude,
            'list_keywords_to_exclude' => $listKeywordsToExclude,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function updateKeywordFilteringListDetails(
        int $keywordListId,
        ?string $name = null,
        ?array $projectList = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/details/" . rawurlencode((string)$keywordListId);
        $body = array_filter([
            'name' => $name,
            'project_list' => $projectList,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function addProjectToKeywordFilteringList(int $keywordListId, mixed $projectIds = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId) . "/projects";
        $query = [];
        if ($projectIds !== null) $query['project_ids'] = $projectIds;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestKeywordListExport(int $keywordListId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/export/" . rawurlencode((string)$keywordListId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function requestKeywordListExportStatus(int $keywordListId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/export_status/" . rawurlencode((string)$keywordListId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getKeywordsAndIds(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/all_keywords/id/label";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function removeProjectsFromKeywordFilteringList(int $keywordListId, mixed $projectIds = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId) . "/projects";
        $query = [];
        if ($projectIds !== null) $query['project_ids'] = $projectIds;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function deleteKeywordFilteringListById(int $keywordListId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/keyword/" . rawurlencode((string)$keywordListId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
