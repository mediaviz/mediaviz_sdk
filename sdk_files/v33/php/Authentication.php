<?php
declare(strict_types=1);
namespace MediaVizSdk;

require_once __DIR__ . '/Exceptions.php';

class Authentication {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createToken(
        mixed $username,
        mixed $password
    ): mixed {
        $baseUrl = $this->ctx->baseUrl;
        $path = "/api/v1/token/";
        $body = [
            'username' => $username,
            'password' => $password,
        ];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $baseUrl . $path);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($body));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
        curl_setopt($ch, CURLOPT_HEADER, true);
        $raw = curl_exec($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        curl_close($ch);
        $headers = self::parseHeaders(substr($raw, 0, $headerSize));
        $body = substr($raw, $headerSize);
        return handleResponse($body, $statusCode, $headers);
    }

    public function createRequestPasswordReset(?string $email = null): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/request-password-reset";
        $query = [];
        if ($email !== null) $query['email'] = $email;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function createResetPassword(
        mixed $token,
        mixed $newPassword
    ): mixed {
        $baseUrl = $this->ctx->baseUrl;
        $path = "/api/v1/reset-password";
        $body = [
            'token' => $token,
            'new_password' => $newPassword,
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

    public function refreshToken(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/token/refresh";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function createLogout(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/logout";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function deleteAdminRevokeUserTokens(int $userId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/admin/users/" . rawurlencode((string)$userId) . "/revoke-tokens";
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getShareauthPhp(): mixed {
        $baseUrl = $this->ctx->baseUrl;
        $path = "/shareAuth.php";
        $ch = curl_init($baseUrl . $path);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_HEADER, true);
        $raw = curl_exec($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        curl_close($ch);
        $headers = self::parseHeaders(substr($raw, 0, $headerSize));
        $body = substr($raw, $headerSize);
        return handleResponse($body, $statusCode, $headers);
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
