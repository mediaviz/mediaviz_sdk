from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class Subscription:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def create_subscription(
        self,
        projectTableName: str,
        callbackUrl: str,
        targets: list,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/subscriptions'
        body = {k: v for k, v in {
            'project_table_name': projectTableName,
            'callback_url': callbackUrl,
            'targets': targets,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token, body).data

    def verify_subscription(self, subscription_id: Any) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/subscriptions/' + quote(str(subscription_id), safe='') + '/verify'
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data

    def list_subscriptions(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/subscriptions'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def list_subscription_events(
        self,
        subscription_id: Any,
        since: Any | None = None,
        limit: int | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/subscriptions/' + quote(str(subscription_id), safe='') + '/events'
        _q: dict[str, Any] = {}
        if since is not None:
            _q['since'] = since
        if limit is not None:
            _q['limit'] = limit
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def update_subscription(
        self,
        subscription_id: Any,
        *,
        callbackUrl: str | None = None,
        targets: list | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/subscriptions/' + quote(str(subscription_id), safe='')
        body = {k: v for k, v in {
            'callback_url': callbackUrl,
            'targets': targets,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'PATCH', self._ctx.access_token, self._ctx.refresh_token, body).data

    def delete_subscription(self, subscription_id: Any) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/subscriptions/' + quote(str(subscription_id), safe='')
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data

    def rotate_subscription_secret(self, subscription_id: Any) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/subscriptions/' + quote(str(subscription_id), safe='') + '/rotate_secret'
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data
