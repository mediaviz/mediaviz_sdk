<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Moments {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createMoment(array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/moments/";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function getMoment(mixed $momentId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/moments/" . rawurlencode((string)$momentId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getUserMoments(mixed $userId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/moments/user/" . rawurlencode((string)$userId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updateMoment(mixed $momentId, array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/moments/" . rawurlencode((string)$momentId);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function deleteMoment(mixed $momentId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/moments/" . rawurlencode((string)$momentId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
