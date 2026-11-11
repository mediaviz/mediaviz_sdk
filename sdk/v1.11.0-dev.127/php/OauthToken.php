<?php
declare(strict_types=1);
namespace MediaVizSdk;

require_once __DIR__ . '/Exceptions.php';

class OauthToken {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function token(
        mixed $grantType,
        mixed $code,
        mixed $redirectUri,
        mixed $clientId,
        mixed $codeVerifier,
        mixed $refreshToken,
        mixed $clientSecret
    ): mixed {
        $baseUrl = $this->ctx->baseUrl;
        $path = "/oauth/token";
        $body = [
            'grant_type' => $grantType,
            'code' => $code,
            'redirect_uri' => $redirectUri,
            'client_id' => $clientId,
            'code_verifier' => $codeVerifier,
            'refresh_token' => $refreshToken,
            'client_secret' => $clientSecret,
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

    public function adminRevokeUserTokens(int $userId): mixed {
        $this->ctx->requireTokens();
        $path = "/oauth/admin/users/" . rawurlencode((string)$userId) . "/revoke-tokens";
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function revoke(
        mixed $token,
        mixed $tokenTypeHint,
        mixed $clientId
    ): mixed {
        $baseUrl = $this->ctx->baseUrl;
        $path = "/oauth/revoke";
        $body = [
            'token' => $token,
            'token_type_hint' => $tokenTypeHint,
            'client_id' => $clientId,
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
