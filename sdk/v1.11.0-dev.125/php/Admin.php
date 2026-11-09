<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Admin {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getCategoryLabels(string $category): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/category_labels/" . rawurlencode((string)$category);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function adminSetCompanyCanManageApiClients(int $companyId, bool $canManageApiClients): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/companies/" . rawurlencode((string)$companyId) . "/can_manage_api_clients";
        $body = array_filter([
            'can_manage_api_clients' => $canManageApiClients,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'PATCH', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }
}
