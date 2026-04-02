<?php
declare(strict_types=1);
namespace MediaVizSdk;

require_once __DIR__ . '/Exceptions.php';

class Users {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getUsers(
        string $accessToken,
        string $refreshToken,
        int $userId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/users/" . rawurlencode((string)$userId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function createUsersNewCompany(
        string $baseUrl,
        mixed $user,
        mixed $company
    ): mixed {
        $path = "/api/v1/users/new_company";
        $body = [
            'user' => $user,
            'company' => $company,
        ];
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

    public function updateUsers(
        string $accessToken,
        string $refreshToken,
        int $userId,
        array $body = []
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/users/" . rawurlencode((string)$userId);
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken, $body);
    }

    public function deleteUsersDelete(
        string $accessToken,
        string $refreshToken,
        int $userId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/users/delete/" . rawurlencode((string)$userId);
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken);
    }

    public function createUserChangePassword(
        string $accessToken,
        string $refreshToken,
        mixed $oldPassword,
        mixed $newPassword
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/user/change_password";
        $body = [
            'old_password' => $oldPassword,
            'new_password' => $newPassword,
        ];
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body);
    }

    public function createUsers(
        string $accessToken,
        string $refreshToken,
        array $body = []
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/users/";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body);
    }

    public function getUsersCompany(
        string $accessToken,
        string $refreshToken,
        int $companyId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/users/company/" . rawurlencode((string)$companyId);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
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
