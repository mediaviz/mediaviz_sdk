<?php
declare(strict_types=1);
namespace MediaVizSdk;

class AiModelCredits {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getModelCreditRelationship(string $modelName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/model_credit/" . rawurlencode((string)$modelName);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
