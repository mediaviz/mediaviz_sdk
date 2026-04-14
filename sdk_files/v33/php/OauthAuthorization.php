<?php
declare(strict_types=1);
namespace MediaVizSdk;

require_once __DIR__ . '/Exceptions.php';

class OauthAuthorization {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function authorize(mixed $responseType = null, mixed $clientId = null, mixed $redirectUri = null, mixed $state = null, mixed $codeChallenge = null, mixed $codeChallengeMethod = null): mixed {
        $baseUrl = $this->ctx->baseUrl;
        $path = "/oauth/authorize";
        $query = [];
        if ($responseType !== null) $query['response_type'] = $responseType;
        if ($clientId !== null) $query['client_id'] = $clientId;
        if ($redirectUri !== null) $query['redirect_uri'] = $redirectUri;
        if ($state !== null) $query['state'] = $state;
        if ($codeChallenge !== null) $query['code_challenge'] = $codeChallenge;
        if ($codeChallengeMethod !== null) $query['code_challenge_method'] = $codeChallengeMethod;
        if ($query) $path .= '?' . http_build_query($query);
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

    public function getConsent(mixed $sessionId): mixed {
        $baseUrl = $this->ctx->baseUrl;
        $path = "/oauth/consent/" . rawurlencode((string)$sessionId);
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

    public function postApproveConsent(mixed $sessionId): mixed {
        $baseUrl = $this->ctx->baseUrl;
        $path = "/oauth/consent/" . rawurlencode((string)$sessionId) . "/approve";
        $ch = curl_init($baseUrl . $path);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_HEADER, true);
        $raw = curl_exec($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        curl_close($ch);
        $headers = self::parseHeaders(substr($raw, 0, $headerSize));
        $body = substr($raw, $headerSize);
        return handleResponse($body, $statusCode, $headers);
    }

    public function postDenyConsent(mixed $sessionId): mixed {
        $baseUrl = $this->ctx->baseUrl;
        $path = "/oauth/consent/" . rawurlencode((string)$sessionId) . "/deny";
        $ch = curl_init($baseUrl . $path);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
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
