<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Admin {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getCategoryLabels(mixed $category): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/category_labels/" . rawurlencode((string)$category);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getAllKeywordGroupsAndSubgroups(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/keyword_group";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getKeywordGroupsLabelsByKeywordGroup(mixed $keywordGroup, mixed $subgroup = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/keyword_group/" . rawurlencode((string)$keywordGroup) . "/";
        $query = [];
        if ($subgroup !== null) $query['subgroup'] = $subgroup;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getGoogleSheetsCredentials(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/get_google_sheets_credentials";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
