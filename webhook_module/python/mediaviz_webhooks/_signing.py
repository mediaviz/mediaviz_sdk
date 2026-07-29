"""HMAC scheme shared with the MediaViz producer.

X-Signature = 'sha256=' + hex(HMAC-SHA256(secret, f"{X-Timestamp}." + raw_body)).
The signing string is the timestamp joined to the *raw request body bytes* —
never re-serialized JSON. Verification accepts the current and (during
rotation) previous secret, rejects timestamps outside the skew window, and
compares digests in constant time.
"""
from __future__ import annotations

import hashlib
import hmac
import time


def sign_webhook_payload(secret: str, timestamp: str, raw_body: bytes | str) -> str:
    digest = hmac.new(secret.encode(), f"{timestamp}.".encode() + _to_bytes(raw_body), hashlib.sha256)
    return "sha256=" + digest.hexdigest()


def verify_webhook_signature(
    secret_current: str | None,
    secret_previous: str | None,
    headers: dict,
    raw_body: bytes | str,
    *,
    skew_tolerance_s: int = 300,
    now: float | None = None,
) -> bool:
    h = {str(k).lower(): v for k, v in dict(headers).items()}
    timestamp, signature = h.get("x-timestamp"), h.get("x-signature")
    if not timestamp or not signature:
        return False
    try:
        ts = int(timestamp)
    except (TypeError, ValueError):
        return False
    if abs((time.time() if now is None else now) - ts) > skew_tolerance_s:
        return False
    for secret in (secret_current, secret_previous):
        if secret and hmac.compare_digest(sign_webhook_payload(secret, str(timestamp), raw_body), str(signature)):
            return True
    return False


def _to_bytes(raw_body: bytes | str) -> bytes:
    if isinstance(raw_body, bytes):
        return raw_body
    if isinstance(raw_body, str):
        return raw_body.encode()
    raise TypeError("raw_body must be bytes or str")
