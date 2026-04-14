<?php
declare(strict_types=1);
namespace MediaVizSdk;

class OauthClients {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createClient(array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/oauth/clients";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }
}
