<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Person {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function updatePerson(
        mixed $projectTableName,
        mixed $personId,
        mixed $personName = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/person/" . rawurlencode((string)$projectTableName) . "/" . rawurlencode((string)$personId);
        $query = [];
        if ($personName !== null) $query['person_name'] = $personName;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function combinePersons(
        mixed $projectTableName,
        mixed $destinationPersonId,
        mixed $oldPersonId
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/person/" . rawurlencode((string)$projectTableName) . "/combine/" . rawurlencode((string)$destinationPersonId) . "/" . rawurlencode((string)$oldPersonId);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function splitPersons(
        mixed $projectTableName,
        mixed $id,
        mixed $newName = null,
        mixed $destinationPersonId = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/person/" . rawurlencode((string)$projectTableName) . "/split/" . rawurlencode((string)$id) . "/";
        $query = [];
        if ($newName !== null) $query['new_name'] = $newName;
        if ($destinationPersonId !== null) $query['destination_person_id'] = $destinationPersonId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getAllPersonsFromProject(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/person/" . rawurlencode((string)$projectTableName) . "/";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getAllPersonNamesFromProject(mixed $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/person/" . rawurlencode((string)$projectTableName) . "/names";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getAllPersonsFromPhoto(mixed $projectTableName, mixed $photoId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/person/" . rawurlencode((string)$projectTableName) . "/photo/" . rawurlencode((string)$photoId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
