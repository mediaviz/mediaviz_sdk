<?php
declare(strict_types=1);
namespace MediaVizWebhooks;

/**
 * Client-side counterpart of the MediaViz webhook producer, giving
 * photo-by-photo progress as a project upload is analyzed.
 *
 * Receiver half (no auth needed): classify inbound POSTs, echo the
 * subscription verification challenge, verify signed `target.completed`
 * deliveries (HMAC + timestamp skew), dedupe on event_id, and dispatch each
 * new event to a single onEvent callback. `handleRequest` is
 * framework-agnostic glue — adapt it to any HTTP framework in a few lines by
 * feeding it the raw body and headers.
 *
 * API half (requires an authenticated client): subscription lifecycle
 * orchestration — register/confirm/rotate store the signing secret the moment
 * the producer issues it — plus history pulls that share the push dedupe
 * ledger, and out-of-band result fetches (webhooks carry a pointer, never the
 * result itself).
 */
class WebhookConsumer {
    public const MODEL_COLUMNS = [
        'blur' => ['blur_value'],
        'colors' => ['main_color_palette', 'color_averages', 'hue_values', 'light_values', 'saturation_values'],
        'face_recognition' => ['number_of_faces', 'bounding_boxes_from_faces_model'],
        'image_classification' => ['labels_from_classifications_model', 'feature_extraction_output'],
        'image_comparison' => ['average_hash'],
        'image_describe' => ['topic'],
        'ocr' => ['ocr_output'],
        'similarity' => ['similar_photo_ids_high', 'similar_photo_ids_medium', 'similar_photo_ids_low'],
        'evidence' => ['evidence_score', 'aesthetic_score', 'face_score', 'content_score', 'similarity_set_ranking'],
        'personhood' => [],
    ];

    public const OUTCOME_MODELS = [
        'curation' => ['blur', 'colors', 'face_recognition', 'image_classification', 'image_comparison', 'similarity', 'evidence'],
        'similarity' => ['image_classification', 'image_comparison', 'similarity'],
        'persons' => ['face_recognition', 'personhood'],
    ];

    public WebhookStore $store;
    public int $skewToleranceS = 300;
    public int $rotationWindowS = 86400;
    public int $dedupeTtlS = 604800;
    public int $pageLimit = 100;

    private object $ctx;
    private object $api;
    private mixed $onEvent = null;

    public function __construct(object $ctx, object $subscriptionApi, ?WebhookStore $store = null) {
        $this->ctx = $ctx;
        $this->api = $subscriptionApi;
        $this->store = $store ?? new InMemoryWebhookStore();
    }

    // ── receiver half ─────────────────────────────────────────────────────────

    public function onEvent(callable $fn): void {
        $this->onEvent = $fn;
    }

    public function useStore(WebhookStore $store): void {
        $this->store = $store;
    }

    public function classifyMessage(array $body): string {
        return match ($body['event_type'] ?? null) {
            'subscription.verification' => 'verification',
            'target.completed' => 'delivery',
            default => 'unknown',
        };
    }

    /** @return array{challenge: mixed} the 200 response body to echo back */
    public function handleChallenge(array $body): array {
        return ['challenge' => $body['challenge'] ?? null];
    }

    /** @return string 'handled' | 'duplicate' | 'bad_signature' */
    public function handleDelivery(array $headers, string $rawBody): string {
        $event = $this->parseDelivery($rawBody);
        if ($event === null) return 'bad_signature';
        [$current, $previous] = $this->store->getSecrets((string)$event['subscription_id']);
        if (!WebhookSigning::verify($current, $previous, $headers, $rawBody, $this->skewToleranceS)) {
            return 'bad_signature';
        }
        return $this->dispatch($event);
    }

    /** @return array{status: int, body: array} framework-agnostic response to send back */
    public function handleRequest(array $headers, string $rawBody): array {
        $body = json_decode($rawBody, true);
        if (!is_array($body)) return ['status' => 400, 'body' => ['detail' => 'invalid JSON']];
        return match ($this->classifyMessage($body)) {
            'verification' => ['status' => 200, 'body' => $this->handleChallenge($body)],
            'delivery' => ($ack = $this->handleDelivery($headers, $rawBody)) === 'bad_signature'
                ? ['status' => 401, 'body' => ['detail' => 'bad signature']]
                : ['status' => 200, 'body' => ['status' => $ack]],
            default => ['status' => 400, 'body' => ['detail' => 'unrecognized event_type']],
        };
    }

    // ── API half ──────────────────────────────────────────────────────────────

    public function register(string $projectTableName, string $callbackUrl, array $targets): mixed {
        $res = $this->api->createSubscription($projectTableName, $callbackUrl, $targets);
        $this->saveSecretFrom($res);
        return $res;
    }

    public function confirm(mixed $subscriptionId): mixed {
        $res = $this->api->verifySubscription($subscriptionId);
        $this->saveSecretFrom($res);
        return $res;
    }

    public function rotateSecret(mixed $subscriptionId): string {
        $res = $this->api->rotateSubscriptionSecret($subscriptionId);
        $secret = is_array($res) ? ($res['signing_secret'] ?? null) : ($res->signing_secret ?? null);
        if (!is_string($secret) || $secret === '') {
            throw new \RuntimeException('rotate_secret response carried no signing_secret');
        }
        $this->store->rotateSecret((string)$subscriptionId, $secret, $this->rotationWindowS);
        return $secret;
    }

    public function updateCallback(mixed $subscriptionId, string $callbackUrl): mixed {
        // A callback change resets the subscription to pending_verification and
        // pauses push until the new URL passes the challenge — confirm right away.
        $this->api->updateSubscription($subscriptionId, $callbackUrl);
        return $this->confirm($subscriptionId);
    }

    public function disable(mixed $subscriptionId): mixed {
        return $this->api->deleteSubscription($subscriptionId);
    }

    public function listSubscriptions(): mixed {
        return $this->api->listSubscriptions();
    }

    public function pullEvents(mixed $subscriptionId, ?string $since = null, ?int $limit = null): mixed {
        return $this->api->listSubscriptionEvents($subscriptionId, $since, $limit ?? $this->pageLimit);
    }

    /** @return array{pulled: int, dispatched: int} */
    public function reconcile(mixed $subscriptionId, string $projectTableName): array {
        $id = (string)$subscriptionId;
        $cursor = $this->store->getCursor($id);
        $pulled = 0;
        $dispatched = 0;
        while (true) {
            $page = $this->api->listSubscriptionEvents($id, $cursor, $this->pageLimit);
            $events = is_array($page) ? ($page['events'] ?? []) : [];
            $pulled += count($events);
            foreach ($events as $ev) {
                $ack = $this->dispatch([
                    'event_id' => $ev['event_id'],
                    'event_type' => 'target.completed',
                    'schema_version' => '1',
                    'subscription_id' => $id,
                    'project_table_name' => $projectTableName,
                    'photo_id' => $ev['photo_id'],
                    'target' => $ev['target'],
                    'completed_at' => $ev['completed_at'] ?? null,
                    'result_location' => $this->ctx->baseUrl . self::photoPath($projectTableName, $ev['photo_id']),
                ]);
                if ($ack === 'handled') $dispatched++;
            }
            $nextCursor = is_array($page) ? ($page['next_cursor'] ?? null) : null;
            if ($nextCursor !== null && $nextCursor !== $cursor) {
                $cursor = $nextCursor;
                $this->store->setCursor($id, $cursor);
            }
            if (count($events) === 0 || count($events) < $this->pageLimit) break;
        }
        return ['pulled' => $pulled, 'dispatched' => $dispatched];
    }

    /** @return array{photo: mixed, selected: ?array} */
    public function fetchResult(array $event): array {
        $this->ctx->requireTokens();
        $path = self::photoPath((string)$event['project_table_name'], $event['photo_id']);
        $photo = $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
        return ['photo' => $photo, 'selected' => self::selectResultColumns($photo, (string)$event['target'])];
    }

    public function saveSecret(mixed $subscriptionId, string $secret): void {
        $this->store->saveSecret((string)$subscriptionId, $secret);
    }

    /** Columns a target writes, pulled out of a fetched PhotoDisplay; null for target 'all' (whole photo is the result). */
    public static function selectResultColumns(mixed $photo, string $target): ?array {
        if ($target === 'all') return null;
        [$kind, $name] = array_pad(explode(':', $target, 2), 2, '');
        if ($kind === 'model') {
            $columns = self::MODEL_COLUMNS[$name] ?? null;
            if ($columns === null) throw new \InvalidArgumentException("unknown model '{$name}'");
        } elseif ($kind === 'outcome') {
            $models = self::OUTCOME_MODELS[$name] ?? null;
            if ($models === null) throw new \InvalidArgumentException("unknown outcome '{$name}'");
            $columns = array_values(array_unique(array_merge(...array_map(fn($m) => self::MODEL_COLUMNS[$m], $models))));
        } else {
            throw new \InvalidArgumentException("unknown target grammar '{$target}' (expected 'model:<name>', 'outcome:<name>', or 'all')");
        }
        $selected = [];
        foreach ($columns as $column) {
            $selected[$column] = is_array($photo) ? ($photo[$column] ?? null) : ($photo->$column ?? null);
        }
        return $selected;
    }

    // ── internal ──────────────────────────────────────────────────────────────

    private function saveSecretFrom(mixed $res): void {
        $secret = is_array($res) ? ($res['signing_secret'] ?? null) : ($res->signing_secret ?? null);
        $id = is_array($res) ? ($res['subscription_id'] ?? null) : ($res->subscription_id ?? null);
        if (is_string($secret) && $secret !== '' && $id !== null) {
            $this->store->saveSecret((string)$id, $secret);
        }
    }

    private function parseDelivery(string $rawBody): ?array {
        $event = json_decode($rawBody, true);
        if (!is_array($event)) return null;
        foreach (['event_id', 'subscription_id', 'target'] as $key) {
            if (!is_string($event[$key] ?? null) || $event[$key] === '') return null;
        }
        if (!is_int($event['photo_id'] ?? null)) return null;
        return $event;
    }

    private function dispatch(array $event): string {
        $eventId = (string)$event['event_id'];
        if (!$this->store->markSeen($eventId, $this->dedupeTtlS)) return 'duplicate';
        if ($this->onEvent !== null) {
            try {
                ($this->onEvent)($event);
            } catch (\Throwable $e) {
                // release the dedupe claim so the producer's retry redelivers
                $this->store->unmarkSeen($eventId);
                throw $e;
            }
        }
        return 'handled';
    }

    private static function photoPath(string $projectTableName, mixed $photoId): string {
        return '/api/v1/photos/' . rawurlencode($projectTableName) . '/' . rawurlencode((string)$photoId);
    }
}
