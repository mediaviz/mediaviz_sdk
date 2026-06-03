from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class Health:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def health_check(self) -> dict[str, Any]:
        path = '/api/v1/health/'
        with httpx.Client() as _client:
            _resp = _client.request('GET', self._ctx.base_url + path)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def liveness_check(self) -> dict[str, Any]:
        path = '/api/v1/health/live/'
        with httpx.Client() as _client:
            _resp = _client.request('GET', self._ctx.base_url + path)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def readiness_check(self) -> dict[str, Any]:
        path = '/api/v1/health/ready'
        with httpx.Client() as _client:
            _resp = _client.request('GET', self._ctx.base_url + path)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))
