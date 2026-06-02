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

    public function upsertModelCreditRelationship(?string $modelName = null, ?int $newCreditValue = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/model_credit/upsert";
        $query = [];
        if ($modelName !== null) $query['model_name'] = $modelName;
        if ($newCreditValue !== null) $query['new_credit_value'] = $newCreditValue;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
