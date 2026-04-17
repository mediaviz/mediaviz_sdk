<?php
declare(strict_types=1);
namespace MediaVizSdk;

class _Context {
    public object $client;
    private MediaVizClient $_mv;

    public function __construct(MediaVizClient $mv) {
        $this->_mv = $mv;
        $this->client = $mv->getTrackingClient();
    }

    public function __get(string $name): mixed {
        return match($name) {
            'accessToken' => $this->_mv->getAccessToken(),
            'refreshToken' => $this->_mv->getRefreshToken(),
            'baseUrl' => $this->_mv->getBaseUrl(),
            default => null,
        };
    }

    public function requireHost(string $key): string {
        $url = $this->_mv->getHost($key);
        if ($url === null) throw new \RuntimeException("Host '{$key}' not configured.");
        return $url;
    }

    public function requireTokens(): void {
        if ($this->_mv->getAccessToken() === null) {
            throw new \RuntimeException('Not authenticated. Call authenticate(), handleCallback(), or setTokens() first.');
        }
    }
}

class _TokenTrackingClient {
    private MediaVizClient $mv;
    private object $inner;

    public function __construct(MediaVizClient $mv, object $inner) {
        $this->mv = $mv;
        $this->inner = $inner;
    }

    public function request(string $url, string $method, string $accessToken, string $refreshToken, mixed $body = null): mixed {
        $result = $this->inner->request($url, $method, $accessToken, $refreshToken, $body);
        if (isset($result->updatedTokens) && $result->updatedTokens !== null) {
            $this->mv->setTokens($result->updatedTokens->accessToken, $result->updatedTokens->refreshToken);
            $cb = $this->mv->getOnTokenRefresh();
            if ($cb !== null) ($cb)($result->updatedTokens);
        }
        return $result;
    }

    public function __call(string $method, array $args): mixed {
        return $this->inner->$method(...$args);
    }
}

class MediaVizClient {
    private array $config;
    private array $hosts;
    private ?string $accessToken;
    private ?string $refreshToken;
    private ?\Closure $onTokenRefresh;
    private object $oauthClient;
    private _TokenTrackingClient $trackingClient;

    public readonly Photoupload $photoUpload;
    public readonly Photos $photos;
    public readonly Projects $projects;
    public readonly Users $users;

    public function __construct(array $config = []) {
        $this->config = [
            'clientId' => $config['clientId'] ?? (getenv('MEDIAVIZ_CLIENT_ID') ?: null),
            'clientSecret' => $config['clientSecret'] ?? (getenv('MEDIAVIZ_CLIENT_SECRET') ?: null),
            'baseUrl' => $config['baseUrl'] ?? (getenv('MEDIAVIZ_BASE_URL') ?: 'https://api.mediaviz.com'),
            'redirectUri' => $config['redirectUri'] ?? (getenv('MEDIAVIZ_REDIRECT_URI') ?: null),
        ];
        $this->hosts = [
            'photoUpload' => $config['hosts']['photoUpload'] ?? (getenv('MEDIAVIZ_PHOTO_UPLOAD_URL') ?: null),
        ] + ($config['hosts'] ?? []);
        $this->accessToken = $config['accessToken'] ?? null;
        $this->refreshToken = $config['refreshToken'] ?? null;
        $this->onTokenRefresh = $config['onTokenRefresh'] ?? null;

        $this->oauthClient = new \OAuthSdk\OAuthClient(
            new \OAuthSdk\OAuthClientConfig(
                clientId: $this->config['clientId'],
                clientSecret: $this->config['clientSecret'],
                baseUrl: $this->config['baseUrl'],
                redirectUri: $this->config['redirectUri'],
            )
        );
        $this->trackingClient = new _TokenTrackingClient($this, $this->oauthClient);

        $ctx = new _Context($this);
        $this->photoUpload = new Photoupload($ctx);
        $this->photos = new Photos($ctx);
        $this->projects = new Projects($ctx);
        $this->users = new Users($ctx);
    }

    public function authenticate(): mixed {
        $tokens = $this->oauthClient->getClientCredentialsToken();
        $this->accessToken = $tokens->accessToken;
        $this->refreshToken = $tokens->refreshToken ?? null;
        return $tokens;
    }

    public function getAuthorizationUrl(?string $state = null): mixed {
        return $this->oauthClient->generateAuthorizationUrl($state);
    }

    public function handleCallback(string $code, string $codeVerifier): mixed {
        $tokens = $this->oauthClient->exchangeCode($code, $codeVerifier);
        $this->accessToken = $tokens->accessToken;
        $this->refreshToken = $tokens->refreshToken;
        return $tokens;
    }

    public function setTokens(string $accessToken, string $refreshToken): void {
        $this->accessToken = $accessToken;
        $this->refreshToken = $refreshToken;
    }

    public function getAccessToken(): ?string { return $this->accessToken; }
    public function getRefreshToken(): ?string { return $this->refreshToken; }
    public function getBaseUrl(): string { return $this->config['baseUrl']; }
    public function getHost(string $key): ?string { return $this->hosts[$key] ?? null; }
    public function getTrackingClient(): _TokenTrackingClient { return $this->trackingClient; }
    public function getOnTokenRefresh(): ?\Closure { return $this->onTokenRefresh; }
}
