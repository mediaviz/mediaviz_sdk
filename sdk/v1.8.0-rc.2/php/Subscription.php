<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Subscription {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createSubscription(
        string $projectTableName,
        string $callbackUrl,
        array $targets
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/subscriptions";
        $body = array_filter([
            'project_table_name' => $projectTableName,
            'callback_url' => $callbackUrl,
            'targets' => $targets,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function verifySubscription(mixed $subscriptionId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/subscriptions/" . rawurlencode((string)$subscriptionId) . "/verify";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function listSubscriptions(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/subscriptions";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function listSubscriptionEvents(
        mixed $subscriptionId,
        mixed $since = null,
        ?int $limit = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/subscriptions/" . rawurlencode((string)$subscriptionId) . "/events";
        $query = [];
        if ($since !== null) $query['since'] = $since;
        if ($limit !== null) $query['limit'] = $limit;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updateSubscription(
        mixed $subscriptionId,
        ?string $callbackUrl = null,
        ?array $targets = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/subscriptions/" . rawurlencode((string)$subscriptionId);
        $body = array_filter([
            'callback_url' => $callbackUrl,
            'targets' => $targets,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'PATCH', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function deleteSubscription(mixed $subscriptionId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/subscriptions/" . rawurlencode((string)$subscriptionId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function rotateSubscriptionSecret(mixed $subscriptionId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/subscriptions/" . rawurlencode((string)$subscriptionId) . "/rotate_secret";
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
