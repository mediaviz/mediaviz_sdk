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
}
