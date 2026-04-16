<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Moments {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createMoment(
        int $userId,
        ?string $userDefinedName = null,
        ?string $guessedName = null,
        ?string $description = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/moments/";
        $body = array_filter([
            'user_defined_name' => $userDefinedName,
            'guessed_name' => $guessedName,
            'description' => $description,
            'user_id' => $userId,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function getMoment(int $momentId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/moments/" . rawurlencode((string)$momentId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getUserMoments(int $userId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/moments/user/" . rawurlencode((string)$userId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updateMoment(
        int $momentId,
        ?string $userDefinedName = null,
        ?string $guessedName = null,
        ?string $description = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/moments/" . rawurlencode((string)$momentId);
        $body = array_filter([
            'user_defined_name' => $userDefinedName,
            'guessed_name' => $guessedName,
            'description' => $description,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function deleteMoment(int $momentId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/moments/" . rawurlencode((string)$momentId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
