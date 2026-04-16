<?php
declare(strict_types=1);
namespace MediaVizSdk;

class OauthClients {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createClient(
        string $clientName,
        string $clientType,
        array $redirectUris,
        bool $isFirstParty
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/oauth/clients";
        $body = array_filter([
            'client_name' => $clientName,
            'client_type' => $clientType,
            'redirect_uris' => $redirectUris,
            'is_first_party' => $isFirstParty,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }
}
