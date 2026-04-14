<?php

declare(strict_types=1);

namespace OAuthSdk;

class OAuthClient
{
    /** @var \Closure(string $url, string $method, list<string> $headers, ?string $body): array{int, string} */
    private \Closure $transport;

    /**
     * @param \Closure(string, string, list<string>, ?string): array{int, string}|null $transport
     */
    public function __construct(
        private readonly OAuthClientConfig $config,
        ?\Closure $transport = null,
    ) {
        $this->transport = $transport ?? self::curlTransport();
    }

    public static function registerClient(
        ClientRegistrationRequest $params,
        ?\Closure $transport = null,
    ): ClientRegistrationResponse {
        $transport ??= self::curlTransport();
        $baseUrl = rtrim($params->baseUrl, '/');
        $body = json_encode([
            'client_name' => $params->clientName,
            'client_type' => $params->clientType,
            'redirect_uris' => $params->redirectUris,
            'is_first_party' => $params->isFirstParty,
        ], JSON_THROW_ON_ERROR);

        [$status, $responseBody] = $transport(
            $baseUrl . '/oauth/clients',
            'POST',
            ['Content-Type: application/json'],
            $body,
        );

        if ($status < 200 || $status >= 300) {
            throw OAuthError::fromResponse($status, $responseBody);
        }

        $data = json_decode($responseBody, true, flags: JSON_THROW_ON_ERROR);

        return new ClientRegistrationResponse(
            clientId: $data['client_id'],
            clientName: $data['client_name'],
            clientType: $data['client_type'],
            redirectUris: $data['redirect_uris'],
            clientSecret: $data['client_secret'] ?? null,
        );
    }

    public function generateAuthorizationUrl(?string $state = null): AuthorizationUrlResult
    {
        $state ??= Pkce::generateState();
        $codeVerifier = Pkce::generateVerifier();
        $codeChallenge = Pkce::computeChallenge($codeVerifier);

        $params = http_build_query([
            'response_type'         => 'code',
            'client_id'             => $this->config->clientId,
            'redirect_uri'          => $this->config->redirectUri,
            'state'                 => $state,
            'code_challenge'        => $codeChallenge,
            'code_challenge_method' => 'S256',
        ]);

        return new AuthorizationUrlResult(
            url: $this->baseUrl() . '/oauth/authorize?' . $params,
            state: $state,
            codeVerifier: $codeVerifier,
        );
    }

    public function exchangeCode(string $code, string $codeVerifier, ?string $redirectUri = null): TokenResponse
    {
        return $this->postToken('/oauth/token', [
            'grant_type'    => 'authorization_code',
            'code'          => $code,
            'code_verifier' => $codeVerifier,
            'redirect_uri'  => $redirectUri ?? $this->config->redirectUri,
            'client_id'     => $this->config->clientId,
            'client_secret' => $this->config->clientSecret,
        ]);
    }

    public function refreshAccessToken(string $refreshToken): TokenResponse
    {
        return $this->postToken('/oauth/token', [
            'grant_type'    => 'refresh_token',
            'refresh_token' => $refreshToken,
            'client_id'     => $this->config->clientId,
            'client_secret' => $this->config->clientSecret,
        ]);
    }

    public function revokeToken(string $token, ?string $tokenTypeHint = null): void
    {
        $params = [
            'token'         => $token,
            'client_id'     => $this->config->clientId,
            'client_secret' => $this->config->clientSecret,
        ];

        if ($tokenTypeHint !== null) {
            $params['token_type_hint'] = $tokenTypeHint;
        }

        [$status, $body] = ($this->transport)(
            $this->baseUrl() . '/oauth/revoke',
            'POST',
            ['Content-Type: application/x-www-form-urlencoded'],
            http_build_query($params),
        );

        if ($status < 200 || $status >= 300) {
            throw OAuthError::fromResponse($status, $body);
        }
    }

    public function request(
        string $url,
        string $method,
        string $accessToken,
        string $refreshToken,
        mixed $body = null,
    ): AuthenticatedResponse {
        $headers = ['Authorization: Bearer ' . $accessToken];
        $encodedBody = null;

        if ($body !== null) {
            $headers[] = 'Content-Type: application/json';
            $encodedBody = json_encode($body, JSON_THROW_ON_ERROR);
        }

        [$status, $responseBody] = ($this->transport)($this->baseUrl() . $url, $method, $headers, $encodedBody);

        if ($status !== 401) {
            if ($status < 200 || $status >= 300) {
                throw OAuthError::fromResponse($status, $responseBody);
            }
            return new AuthenticatedResponse(
                data: json_decode($responseBody, true),
                updatedTokens: null,
            );
        }

        // 401: refresh and retry once; propagate OAuthError if refresh fails
        $newTokens = $this->refreshAccessToken($refreshToken);

        $headers[0] = 'Authorization: Bearer ' . $newTokens->accessToken;
        [$retryStatus, $retryBody] = ($this->transport)($this->baseUrl() . $url, $method, $headers, $encodedBody);

        if ($retryStatus < 200 || $retryStatus >= 300) {
            throw OAuthError::fromResponse($retryStatus, $retryBody);
        }

        return new AuthenticatedResponse(
            data: json_decode($retryBody, true),
            updatedTokens: $newTokens,
        );
    }

    public function decodeAccessToken(string $accessToken): TokenPayload
    {
        $parts = explode('.', $accessToken);

        if (count($parts) !== 3) {
            throw new OAuthError('invalid_token', 'Malformed JWT', 400);
        }

        $segment = $parts[1];
        $padded = $segment . str_repeat('=', (4 - strlen($segment) % 4) % 4);
        $decoded = base64_decode(strtr($padded, '-_', '+/'), strict: true);

        if ($decoded === false) {
            throw new OAuthError('invalid_token', 'Invalid JWT payload encoding', 400);
        }

        $data = json_decode($decoded, true, flags: JSON_THROW_ON_ERROR);

        return new TokenPayload(
            userId: $data['user_id'],
            clientId: $data['client_id'],
            jti: $data['jti'],
            iat: $data['iat'],
            exp: $data['exp'],
        );
    }

    private function postToken(string $path, array $params): TokenResponse
    {
        [$status, $body] = ($this->transport)(
            $this->baseUrl() . $path,
            'POST',
            ['Content-Type: application/x-www-form-urlencoded'],
            http_build_query($params),
        );

        if ($status < 200 || $status >= 300) {
            throw OAuthError::fromResponse($status, $body);
        }

        $data = json_decode($body, true, flags: JSON_THROW_ON_ERROR);

        return new TokenResponse(
            accessToken: $data['access_token'],
            tokenType: $data['token_type'],
            expiresIn: $data['expires_in'],
            refreshToken: $data['refresh_token'],
        );
    }

    private function baseUrl(): string
    {
        return rtrim($this->config->baseUrl, '/');
    }

    /**
     * @return \Closure(string, string, list<string>, ?string): array{int, string}
     */
    private static function curlTransport(): \Closure
    {
        return function (string $url, string $method, array $headers, ?string $body): array {
            $ch = curl_init($url);
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_CUSTOMREQUEST  => strtoupper($method),
                CURLOPT_HTTPHEADER     => $headers,
            ]);

            if ($body !== null) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
            }

            $responseBody = curl_exec($ch);
            $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $error = curl_error($ch);
            curl_close($ch);

            if ($responseBody === false) {
                throw new \RuntimeException('HTTP request failed: ' . $error);
            }

            return [$status, $responseBody];
        };
    }
}
