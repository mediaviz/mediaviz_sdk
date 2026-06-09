<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Company {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function adminGetCompanies(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/companies/admin";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getAllCompanies(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/company/";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getCompanyById(int $companyId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/company/" . rawurlencode((string)$companyId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function confirmCompanyCreditBalance(
        int $companyId,
        ?int $photoCount = null,
        mixed $modelsList = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/company/credit_balance/" . rawurlencode((string)$companyId);
        $query = [];
        if ($photoCount !== null) $query['photo_count'] = $photoCount;
        if ($modelsList !== null) $query['models_list'] = $modelsList;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function adminListActiveCompanyTokens(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/company/admin_create/";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function adminCreateCompanyToken(?string $email = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/company/admin_create/";
        $query = [];
        if ($email !== null) $query['email'] = $email;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function adminRevokeCompanyToken(int $tokenId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/company/admin_create/" . rawurlencode((string)$tokenId) . "/revoke/";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
