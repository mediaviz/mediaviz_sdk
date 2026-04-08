<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Admin {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getCategoryLabels(
        string $accessToken,
        string $refreshToken,
        mixed $category
    ): mixed {
        $path = "/api/v1/admin/category_labels/" . rawurlencode((string)$category);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getAllKeywordGroupsAndSubgroups(string $accessToken, string $refreshToken): mixed {
        $path = "/api/v1/admin/keyword_group";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getKeywordGroupsLabelsByKeywordGroup(
        string $accessToken,
        string $refreshToken,
        mixed $keywordGroup,
        mixed $subgroup = null
    ): mixed {
        $path = "/api/v1/admin/keyword_group/" . rawurlencode((string)$keywordGroup) . "/";
        $query = [];
        if ($subgroup !== null) $query['subgroup'] = $subgroup;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function getGoogleSheetsCredentials(string $accessToken, string $refreshToken): mixed {
        $path = "/api/v1/admin/get_google_sheets_credentials";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken)->data;
    }
}
