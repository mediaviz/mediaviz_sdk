<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Faces {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getPersonPhoto(string $projectTableName, int $photoId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/person/" . rawurlencode((string)$projectTableName) . "/photo/" . rawurlencode((string)$photoId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updatePerson(
        string $projectTable,
        int $personId,
        ?string $personName = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/person/" . rawurlencode((string)$projectTable) . "/" . rawurlencode((string)$personId);
        $query = [];
        if ($personName !== null) $query['person_name'] = $personName;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getPerson(string $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/person/" . rawurlencode((string)$projectTableName) . "/";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
