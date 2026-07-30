"""Persistence seam for the webhook consumer: dedupe ledger, signing secrets,
and pull cursors. The default in-memory store suits a single long-lived
process; multi-process consumers supply their own WebhookStore backed by
Redis or a database.
"""
from __future__ import annotations

import time
from abc import ABC, abstractmethod

_MAX_SEEN_ENTRIES = 100000


class WebhookStore(ABC):
    @abstractmethod
    def mark_seen(self, event_id: str, ttl_s: int) -> bool:
        """Atomically claim an event id. True if new, False if already seen."""

    @abstractmethod
    def unmark_seen(self, event_id: str) -> None:
        """Release a claim so the producer's retry redelivers (callback failed)."""

    @abstractmethod
    def save_secret(self, subscription_id: str, secret: str) -> None: ...

    @abstractmethod
    def rotate_secret(self, subscription_id: str, new_secret: str, window_s: int) -> None:
        """Move current -> previous (accepted for window_s), install new_secret as current."""

    @abstractmethod
    def get_secrets(self, subscription_id: str) -> tuple[str | None, str | None]:
        """(current, previous) — previous is None once its window closed."""

    @abstractmethod
    def get_cursor(self, subscription_id: str) -> str | None: ...

    @abstractmethod
    def set_cursor(self, subscription_id: str, cursor: str) -> None: ...


class InMemoryWebhookStore(WebhookStore):
    def __init__(self) -> None:
        self._seen: dict[str, float] = {}      # event_id -> expires_at
        self._secrets: dict[str, tuple[str, str | None, float]] = {}  # id -> (current, previous, prev_expires_at)
        self._cursors: dict[str, str] = {}

    def mark_seen(self, event_id: str, ttl_s: int) -> bool:
        now = time.time()
        expires_at = self._seen.get(event_id)
        if expires_at is not None and expires_at > now:
            return False
        self._seen.pop(event_id, None)
        self._seen[event_id] = now + ttl_s
        self._prune(now)
        return True

    def unmark_seen(self, event_id: str) -> None:
        self._seen.pop(event_id, None)

    def save_secret(self, subscription_id: str, secret: str) -> None:
        self._secrets[subscription_id] = (secret, None, 0.0)

    def rotate_secret(self, subscription_id: str, new_secret: str, window_s: int) -> None:
        current = self._secrets.get(subscription_id, (None, None, 0.0))[0]
        self._secrets[subscription_id] = (new_secret, current, time.time() + window_s)

    def get_secrets(self, subscription_id: str) -> tuple[str | None, str | None]:
        entry = self._secrets.get(subscription_id)
        if entry is None:
            return None, None
        current, previous, prev_expires_at = entry
        return current, (previous if previous and prev_expires_at > time.time() else None)

    def get_cursor(self, subscription_id: str) -> str | None:
        return self._cursors.get(subscription_id)

    def set_cursor(self, subscription_id: str, cursor: str) -> None:
        self._cursors[subscription_id] = cursor

    def _prune(self, now: float) -> None:
        if len(self._seen) <= _MAX_SEEN_ENTRIES:
            return
        for event_id in [k for k, exp in self._seen.items() if exp <= now]:
            del self._seen[event_id]
        while len(self._seen) > _MAX_SEEN_ENTRIES:
            del self._seen[next(iter(self._seen))]  # evict oldest insertion
