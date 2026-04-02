<?php
declare(strict_types=1);
namespace MediaVizSdk;

require_once __DIR__ . '/Exceptions.php';

class Authentication {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function createToken(
        string $baseUrl,
        mixed $username,
        mixed $password
    ): mixed {
        $path = "/api/v1/token/";
        $body = [
            'username' => $username,
            'password' => $password,
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

    public function createRequestPasswordReset(
        string $accessToken,
        string $refreshToken,
        ?string $email = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/request-password-reset";
        $query = [];
        if ($email !== null) $query['email'] = $email;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'POST', $accessToken, $refreshToken);
    }

    public function createResetPassword(
        string $baseUrl,
        mixed $token,
        mixed $newPassword
    ): mixed {
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

    public function createLogout(string $accessToken, string $refreshToken): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/logout";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken);
    }

    public function getShareauthPhp(string $baseUrl): mixed {
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
