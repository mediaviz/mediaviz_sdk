<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Admin {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function insertLabelCategoryMatrix(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/insert_label_category_matrix";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function generateMidLevelCategoryKeywordAlignment(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/generate_mid_level_category_keyword_alignment";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getCategoryLabels(string $category): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/category_labels/" . rawurlencode((string)$category);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function adminDumpCompanyNlpIndex(int $companyId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/dump_company_nlp_index/" . rawurlencode((string)$companyId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getAllKeywordGroupsAndSubgroups(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/keyword_group";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getKeywordGroupsLabelsByKeywordGroup(string $keywordGroup, mixed $subgroup = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/keyword_group/" . rawurlencode((string)$keywordGroup) . "/";
        $query = [];
        if ($subgroup !== null) $query['subgroup'] = $subgroup;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getGoogleSheetsCredentials(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/get_google_sheets_credentials";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function adminCreateCompanyNlpIndexes(mixed $companyIds = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/create_company_nlp_indexes/";
        $query = [];
        if ($companyIds !== null) $query['company_ids'] = $companyIds;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function adminDeleteCompanyNlpIndexes(mixed $companyIds = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/delete_company_nlp_indexes/";
        $query = [];
        if ($companyIds !== null) $query['company_ids'] = $companyIds;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function adminDeleteUserProjects(mixed $userIds = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/delete_user_projects/";
        $query = [];
        if ($userIds !== null) $query['user_ids'] = $userIds;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function adminDeleteUser(mixed $userIds = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/delete_user/";
        $query = [];
        if ($userIds !== null) $query['user_ids'] = $userIds;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
