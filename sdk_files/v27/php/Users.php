<?php
declare(strict_types=1);
namespace MediaVizSdk;

require_once __DIR__ . '/Exceptions.php';

class Users {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getUser(
        string $accessToken,
        string $refreshToken,
        mixed $userId
    ): mixed {
        $path = "/api/v1/users/" . rawurlencode((string)$userId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
    }

    public function createUserAndCompany(
        string $baseUrl,
        array $body
    ): mixed {
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

    public function updateUser(
        string $accessToken,
        string $refreshToken,
        mixed $userId,
        array $body
    ): mixed {
        $path = "/api/v1/users/" . rawurlencode((string)$userId);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken, $body)->data;
    }

    public function deleteUser(
        string $accessToken,
        string $refreshToken,
        mixed $userId,
        mixed $newCompanyOwnerId = null
    ): mixed {
        $path = "/api/v1/users/delete/" . rawurlencode((string)$userId);
        $query = [];
        if ($newCompanyOwnerId !== null) $query['new_company_owner_id'] = $newCompanyOwnerId;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken)->data;
    }

    public function changePassword(
        string $accessToken,
        string $refreshToken,
        array $body
    ): mixed {
        $path = "/api/v1/user/change_password";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body)->data;
    }

    public function createUser(
        string $accessToken,
        string $refreshToken,
        array $body
    ): mixed {
        $path = "/api/v1/users/";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body)->data;
    }

    public function getAllUsersByCompany(
        string $accessToken,
        string $refreshToken,
        mixed $companyId
    ): mixed {
        $path = "/api/v1/users/company/" . rawurlencode((string)$companyId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken)->data;
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
