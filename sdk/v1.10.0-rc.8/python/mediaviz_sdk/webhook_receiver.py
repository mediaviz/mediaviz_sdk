from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class WebhookReceiver:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def list_subscription_events(
        self,
        subscription_id: Any,
        since: Any | None = None,
        limit: int | None = None,
        wait: Any | None = None,
        include_heavy: bool | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        _base_url = self._ctx.require_host('webhookReceiver')
        path = '/api/v1/subscriptions/' + quote(str(subscription_id), safe='') + '/events'
        _q: dict[str, Any] = {}
        if since is not None:
            _q['since'] = since
        if limit is not None:
            _q['limit'] = limit
        if wait is not None:
            _q['wait'] = wait
        if include_heavy is not None:
            _q['include_heavy'] = include_heavy
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        _headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self._ctx.access_token}',
        }
        with httpx.Client() as _client:
            _resp = _client.request('GET', _base_url + path, headers=_headers)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))
