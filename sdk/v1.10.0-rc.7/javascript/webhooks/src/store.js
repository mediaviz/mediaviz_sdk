'use strict';

// Persistence seam for the webhook consumer: dedupe ledger, signing secrets,
// and pull cursors. The default in-memory store suits a single long-lived
// process (worker, dev server); multi-process consumers supply an object with
// the same shape backed by Redis or a database.

const MAX_SEEN_ENTRIES = 100000;

class InMemoryWebhookStore {
  constructor() {
    this._seen = new Map();     // eventId -> expiresAt (ms)
    this._secrets = new Map();  // subscriptionId -> {current, previous, previousExpiresAt}
    this._cursors = new Map();  // subscriptionId -> cursor
  }

  markSeen(eventId, ttlS) {
    const now = Date.now();
    const expiresAt = this._seen.get(eventId);
    if (expiresAt !== undefined && expiresAt > now) return false;
    this._seen.delete(eventId);
    this._seen.set(eventId, now + ttlS * 1000);
    this._prune(now);
    return true;
  }

  unmarkSeen(eventId) {
    this._seen.delete(eventId);
  }

  saveSecret(subscriptionId, secret) {
    this._secrets.set(subscriptionId, { current: secret, previous: null, previousExpiresAt: 0 });
  }

  rotateSecret(subscriptionId, newSecret, windowS) {
    const entry = this._secrets.get(subscriptionId);
    this._secrets.set(subscriptionId, {
      current: newSecret,
      previous: entry?.current ?? null,
      previousExpiresAt: Date.now() + windowS * 1000,
    });
  }

  getSecrets(subscriptionId) {
    const entry = this._secrets.get(subscriptionId);
    if (!entry) return [null, null];
    const previous = entry.previous && entry.previousExpiresAt > Date.now() ? entry.previous : null;
    return [entry.current, previous];
  }

  getCursor(subscriptionId) {
    return this._cursors.get(subscriptionId) ?? null;
  }

  setCursor(subscriptionId, cursor) {
    this._cursors.set(subscriptionId, cursor);
  }

  _prune(now) {
    if (this._seen.size <= MAX_SEEN_ENTRIES) return;
    for (const [id, expiresAt] of this._seen) {
      if (expiresAt <= now) this._seen.delete(id);
      if (this._seen.size <= MAX_SEEN_ENTRIES) return;
    }
    // still over the cap: evict oldest insertions
    for (const id of this._seen.keys()) {
      this._seen.delete(id);
      if (this._seen.size <= MAX_SEEN_ENTRIES) return;
    }
  }
}

module.exports = { InMemoryWebhookStore };
