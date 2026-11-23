<?php
declare(strict_types=1);
namespace MediaVizSdk;

class OauthClients {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createApiCredential(string $credentialName): mixed {
        $this->ctx->requireTokens();
        $path = "/oauth/clients/api-credentials";
        $body = array_filter([
            'credential_name' => $credentialName,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function getCompanyApiCredentials(): mixed {
        $this->ctx->requireTokens();
        $path = "/oauth/clients/api-credentials";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function revokeApiCredential(string $clientId): mixed {
        $this->ctx->requireTokens();
        $path = "/oauth/clients/api-credentials/" . rawurlencode((string)$clientId) . "/revoke";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
