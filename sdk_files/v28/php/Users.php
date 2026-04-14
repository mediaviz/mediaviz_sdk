<?php
declare(strict_types=1);
namespace MediaVizSdk;

require_once __DIR__ . '/Exceptions.php';

class Users {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function getUser(mixed $userId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/users/" . rawurlencode((string)$userId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function createUserAndCompany(
        array $body
    ): mixed {
        $baseUrl = $this->ctx->baseUrl;
        $path = "/api/v1/users/new_company";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $baseUrl . $path);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_HEADER, true);
        $raw = curl_exec($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        curl_close($ch);
        $headers = self::parseHeaders(substr($raw, 0, $headerSize));
        $body = substr($raw, $headerSize);
        return handleResponse($body, $statusCode, $headers);
    }

    public function updateUser(mixed $userId, array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/users/" . rawurlencode((string)$userId);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function deleteUser(mixed $userId, mixed $newCompanyOwnerId = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/users/delete/" . rawurlencode((string)$userId);
        $query = [];
        if ($newCompanyOwnerId !== null) $query['new_company_owner_id'] = $newCompanyOwnerId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function changePassword(array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/user/change_password";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function createUser(array $body): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/users/";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function getAllUsersByCompany(mixed $companyId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/users/company/" . rawurlencode((string)$companyId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    private static function parseHeaders(string $raw): array {
        $headers = [];
        foreach (explode("\r\n", $raw) as $line) {
            $parts = explode(':', $line, 2);
            if (count($parts) === 2) {
                $headers[strtolower(trim($parts[0]))] = trim($parts[1]);
            }
        }
        return $headers;
    }
}
