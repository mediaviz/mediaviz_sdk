<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Admin {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getAdminCategoryLabels(
        string $accessToken,
        string $refreshToken,
        string $category
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/admin/category_labels/" . urlencode($category) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getAdminKeywordGroup(
        string $accessToken,
        string $refreshToken,
        string $keywordGroup,
        ?mixed $subgroup = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/admin/keyword_group/" . urlencode($keywordGroup) . "/";
        $query = [];
        if ($subgroup !== null) $query['subgroup'] = $subgroup;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function getAdminKeywordGroup1(string $accessToken, string $refreshToken): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/admin/keyword_group";
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function createAdminGetGoogleSheetsCredentials(string $accessToken, string $refreshToken): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/admin/get_google_sheets_credentials";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken);
    }
}
