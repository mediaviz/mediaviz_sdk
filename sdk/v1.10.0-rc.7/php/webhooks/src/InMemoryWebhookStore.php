<?php
declare(strict_types=1);
namespace MediaVizWebhooks;

class InMemoryWebhookStore implements WebhookStore {
    private const MAX_SEEN_ENTRIES = 100000;

    /** @var array<string, int> eventId -> expiresAt (unix seconds) */
    private array $seen = [];
    /** @var array<string, array{current: string, previous: ?string, previousExpiresAt: int}> */
    private array $secrets = [];
    /** @var array<string, string> */
    private array $cursors = [];

    public function markSeen(string $eventId, int $ttlS): bool {
        $now = time();
        if (isset($this->seen[$eventId]) && $this->seen[$eventId] > $now) return false;
        unset($this->seen[$eventId]);
        $this->seen[$eventId] = $now + $ttlS;
        $this->prune($now);
        return true;
    }

    public function unmarkSeen(string $eventId): void {
        unset($this->seen[$eventId]);
    }

    public function saveSecret(string $subscriptionId, string $secret): void {
        $this->secrets[$subscriptionId] = ['current' => $secret, 'previous' => null, 'previousExpiresAt' => 0];
    }

    public function rotateSecret(string $subscriptionId, string $newSecret, int $windowS): void {
        $entry = $this->secrets[$subscriptionId] ?? null;
        $this->secrets[$subscriptionId] = [
            'current' => $newSecret,
            'previous' => $entry['current'] ?? null,
            'previousExpiresAt' => time() + $windowS,
        ];
    }

    public function getSecrets(string $subscriptionId): array {
        $entry = $this->secrets[$subscriptionId] ?? null;
        if ($entry === null) return [null, null];
        $previous = ($entry['previous'] !== null && $entry['previousExpiresAt'] > time())
            ? $entry['previous'] : null;
        return [$entry['current'], $previous];
    }

    public function getCursor(string $subscriptionId): ?string {
        return $this->cursors[$subscriptionId] ?? null;
    }

    public function setCursor(string $subscriptionId, string $cursor): void {
        $this->cursors[$subscriptionId] = $cursor;
    }

    private function prune(int $now): void {
        if (count($this->seen) <= self::MAX_SEEN_ENTRIES) return;
        foreach ($this->seen as $id => $expiresAt) {
            if ($expiresAt <= $now) unset($this->seen[$id]);
            if (count($this->seen) <= self::MAX_SEEN_ENTRIES) return;
        }
        // still over the cap: evict oldest insertions
        foreach ($this->seen as $id => $_) {
            unset($this->seen[$id]);
            if (count($this->seen) <= self::MAX_SEEN_ENTRIES) return;
        }
    }
}
