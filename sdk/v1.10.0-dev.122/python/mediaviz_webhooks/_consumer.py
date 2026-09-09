"""Client-side counterpart of the MediaViz webhook producer, giving
photo-by-photo progress as a project upload is analyzed.

Receiver half (no auth needed): classify inbound POSTs, echo the subscription
verification challenge, verify signed `target.completed` deliveries (HMAC +
timestamp skew), dedupe on event_id, and dispatch each new event to a single
on_event callback. `handle_request` is framework-agnostic glue — adapt it to
any HTTP framework in a few lines by feeding it the raw body and headers.

API half (requires an authenticated client): subscription lifecycle
orchestration — register/confirm/rotate store the signing secret the moment
the producer issues it — plus history pulls that share the push dedupe ledger,
and out-of-band result fetches (webhooks carry a pointer, never the result
itself).
"""
from __future__ import annotations

import json
from typing import Any, Callable
from urllib.parse import quote

from ._signing import verify_webhook_signature
from ._store import InMemoryWebhookStore, WebhookStore

# Photo columns each producer model writes — used to select a model's results
# out of a fetched PhotoDisplay. Mirrors the producer vocabulary; personhood is
# predicate-based and writes no columns.
WEBHOOK_MODEL_COLUMNS: dict[str, list[str]] = {
    "blur": ["blur_value"],
    "colors": ["main_color_palette", "color_averages", "hue_values", "light_values", "saturation_values"],
    "face_recognition": ["number_of_faces", "bounding_boxes_from_faces_model"],
    "image_classification": ["labels_from_classifications_model", "feature_extraction_output"],
    "image_comparison": ["average_hash"],
    "image_describe": ["topic"],
    "ocr": ["ocr_output"],
    "similarity": ["similar_photo_ids_high", "similar_photo_ids_medium", "similar_photo_ids_low"],
    "evidence": ["evidence_score", "aesthetic_score", "face_score", "content_score", "similarity_set_ranking"],
    "personhood": [],
}

WEBHOOK_OUTCOME_MODELS: dict[str, list[str]] = {
    "curation": ["blur", "colors", "face_recognition", "image_classification", "image_comparison", "similarity", "evidence"],
    "similarity": ["image_classification", "image_comparison", "similarity"],
    "persons": ["face_recognition", "personhood"],
}


class WebhookConsumer:
    def __init__(self, ctx: Any, subscription_api: Any, store: WebhookStore | None = None,
                 on_event: Callable[[dict], None] | None = None) -> None:
        self._ctx = ctx
        self._api = subscription_api
        self.store: WebhookStore = store or InMemoryWebhookStore()
        self.skew_tolerance_s = 300
        self.rotation_window_s = 86400
        self.dedupe_ttl_s = 604800
        self.page_limit = 100
        self._on_event = on_event

    # ── receiver half ─────────────────────────────────────────────────────────

    def on_event(self, fn: Callable[[dict], None]) -> Callable[[dict], None]:
        """Register the callback invoked once per new event (push or pull). Decorator-friendly."""
        self._on_event = fn
        return fn

    def use_store(self, store: WebhookStore) -> None:
        self.store = store

    def classify_message(self, body: dict) -> str:
        event_type = body.get("event_type") if isinstance(body, dict) else None
        if event_type == "subscription.verification":
            return "verification"
        if event_type == "target.completed":
            return "delivery"
        return "unknown"

    def handle_challenge(self, body: dict) -> dict:
        """The 200 response body to echo back."""
        return {"challenge": body.get("challenge")}

    def handle_delivery(self, headers: dict, raw_body: bytes | str) -> str:
        """'handled' | 'duplicate' | 'bad_signature'"""
        event = self._parse_delivery(raw_body)
        if event is None:
            return "bad_signature"
        current, previous = self.store.get_secrets(str(event["subscription_id"]))
        if not verify_webhook_signature(current, previous, headers, raw_body,
                                        skew_tolerance_s=self.skew_tolerance_s):
            return "bad_signature"
        return self._dispatch(event)

    def handle_request(self, headers: dict, raw_body: bytes | str) -> tuple[int, dict]:
        """(status, body) — framework-agnostic response to send back."""
        try:
            body = json.loads(raw_body)
        except (ValueError, TypeError):
            return 400, {"detail": "invalid JSON"}
        kind = self.classify_message(body)
        if kind == "verification":
            return 200, self.handle_challenge(body)
        if kind == "delivery":
            ack = self.handle_delivery(headers, raw_body)
            if ack == "bad_signature":
                return 401, {"detail": "bad signature"}
            return 200, {"status": ack}
        return 400, {"detail": "unrecognized event_type"}

    # ── API half ──────────────────────────────────────────────────────────────

    def register(self, project_table_name: str, callback_url: str, targets: list[str]) -> Any:
        res = self._api.create_subscription(project_table_name, callback_url, targets)
        self._save_secret_from(res)
        return res

    def confirm(self, subscription_id: Any) -> Any:
        res = self._api.verify_subscription(subscription_id)
        self._save_secret_from(res)
        return res

    def rotate_secret(self, subscription_id: Any) -> str:
        res = self._api.rotate_subscription_secret(subscription_id)
        secret = res.get("signing_secret") if isinstance(res, dict) else None
        if not secret:
            raise RuntimeError("rotate_secret response carried no signing_secret")
        self.store.rotate_secret(str(subscription_id), secret, self.rotation_window_s)
        return secret

    def update_callback(self, subscription_id: Any, callback_url: str) -> Any:
        # A callback change resets the subscription to pending_verification and
        # pauses push until the new URL passes the challenge — confirm right away.
        self._api.update_subscription(subscription_id, callbackUrl=callback_url)
        return self.confirm(subscription_id)

    def disable(self, subscription_id: Any) -> Any:
        return self._api.delete_subscription(subscription_id)

    def list_subscriptions(self) -> Any:
        return self._api.list_subscriptions()

    def pull_events(self, subscription_id: Any, since: str | None = None, limit: int | None = None) -> Any:
        return self._api.list_subscription_events(subscription_id, since=since, limit=limit or self.page_limit)

    def reconcile(self, subscription_id: Any, project_table_name: str) -> dict:
        """Pull history through the same dedupe+dispatch path as push.

        Returns {'pulled': n, 'dispatched': m} where dispatched counts only
        newly-handled (non-duplicate) events.
        """
        sub_id = str(subscription_id)
        cursor = self.store.get_cursor(sub_id)
        pulled = dispatched = 0
        while True:
            page = self._api.list_subscription_events(sub_id, since=cursor, limit=self.page_limit)
            events = page.get("events", []) if isinstance(page, dict) else []
            pulled += len(events)
            for ev in events:
                ack = self._dispatch({
                    "event_id": ev["event_id"],
                    "event_type": "target.completed",
                    "schema_version": "1",
                    "subscription_id": sub_id,
                    "project_table_name": project_table_name,
                    "photo_id": ev["photo_id"],
                    "target": ev["target"],
                    "completed_at": ev.get("completed_at"),
                    "result_location": self._ctx.base_url + _photo_path(project_table_name, ev["photo_id"]),
                })
                if ack == "handled":
                    dispatched += 1
            next_cursor = page.get("next_cursor") if isinstance(page, dict) else None
            if next_cursor and next_cursor != cursor:
                cursor = next_cursor
                self.store.set_cursor(sub_id, cursor)
            if not events or len(events) < self.page_limit:
                break
        return {"pulled": pulled, "dispatched": dispatched}

    def fetch_result(self, event: dict) -> dict:
        """{'photo': PhotoDisplay, 'selected': columns-for-target-or-None}"""
        self._ctx.require_tokens()
        path = _photo_path(str(event["project_table_name"]), event["photo_id"])
        photo = self._ctx.client.request(path, "GET", self._ctx.access_token, self._ctx.refresh_token).data
        return {"photo": photo, "selected": select_result_columns(photo, str(event["target"]))}

    def save_secret(self, subscription_id: Any, secret: str) -> None:
        self.store.save_secret(str(subscription_id), secret)

    # ── internal ──────────────────────────────────────────────────────────────

    def _save_secret_from(self, res: Any) -> None:
        if not isinstance(res, dict):
            return
        secret, sub_id = res.get("signing_secret"), res.get("subscription_id")
        if secret and sub_id is not None:
            self.store.save_secret(str(sub_id), secret)

    def _parse_delivery(self, raw_body: bytes | str) -> dict | None:
        try:
            event = json.loads(raw_body)
        except (ValueError, TypeError):
            return None
        if not isinstance(event, dict):
            return None
        for key in ("event_id", "subscription_id", "target"):
            if not isinstance(event.get(key), str) or not event[key]:
                return None
        if not isinstance(event.get("photo_id"), int) or isinstance(event.get("photo_id"), bool):
            return None
        return event

    def _dispatch(self, event: dict) -> str:
        event_id = str(event["event_id"])
        if not self.store.mark_seen(event_id, self.dedupe_ttl_s):
            return "duplicate"
        if self._on_event is not None:
            try:
                self._on_event(event)
            except Exception:
                # release the dedupe claim so the producer's retry redelivers
                self.store.unmark_seen(event_id)
                raise
        return "handled"


def select_result_columns(photo: Any, target: str) -> dict | None:
    """Columns a target writes, pulled out of a fetched PhotoDisplay; None for
    target 'all' (the whole photo is the result)."""
    if target == "all":
        return None
    kind, _, name = target.partition(":")
    if kind == "model":
        if name not in WEBHOOK_MODEL_COLUMNS:
            raise ValueError(f"unknown model '{name}'")
        columns = WEBHOOK_MODEL_COLUMNS[name]
    elif kind == "outcome":
        if name not in WEBHOOK_OUTCOME_MODELS:
            raise ValueError(f"unknown outcome '{name}'")
        columns = list(dict.fromkeys(
            column for model in WEBHOOK_OUTCOME_MODELS[name] for column in WEBHOOK_MODEL_COLUMNS[model]
        ))
    else:
        raise ValueError(f"unknown target grammar '{target}' (expected 'model:<name>', 'outcome:<name>', or 'all')")
    get = photo.get if isinstance(photo, dict) else lambda c, d=None: getattr(photo, c, d)
    return {column: get(column) for column in columns}


def _photo_path(project_table_name: str, photo_id: Any) -> str:
    return f"/api/v1/photos/{quote(project_table_name, safe='')}/{quote(str(photo_id), safe='')}"
