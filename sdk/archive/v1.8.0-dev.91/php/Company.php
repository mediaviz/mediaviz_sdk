<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Company {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
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

    public function updateCompanyPhotoUrlAllowlist(int $companyId, array $photoUrlAllowlist): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/company/" . rawurlencode((string)$companyId) . "/photo_url_allowlist/";
        $body = array_filter([
            'photo_url_allowlist' => $photoUrlAllowlist,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }
}
