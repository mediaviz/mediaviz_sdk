<?php
declare(strict_types=1);
namespace MediaVizWebhooks;

/**
 * Persistence seam for the webhook consumer: dedupe ledger, signing secrets,
 * and pull cursors. PHP handles each webhook in its own request, so production
 * consumers must back this with shared storage (Redis, database) — the bundled
 * InMemoryWebhookStore only survives a single process and suits tests and
 * long-running workers.
 */
interface WebhookStore {
    /** Atomically claim an event id. True if new, false if already seen. */
    public function markSeen(string $eventId, int $ttlS): bool;

    /** Release a claim so the producer's retry redelivers (callback failed). */
    public function unmarkSeen(string $eventId): void;

    public function saveSecret(string $subscriptionId, string $secret): void;

    /** Move current -> previous (accepted for $windowS), install $newSecret as current. */
    public function rotateSecret(string $subscriptionId, string $newSecret, int $windowS): void;

    /** @return array{0: ?string, 1: ?string} [current, previous] — previous null once its window closed. */
    public function getSecrets(string $subscriptionId): array;

    public function getCursor(string $subscriptionId): ?string;

    public function setCursor(string $subscriptionId, string $cursor): void;
}
