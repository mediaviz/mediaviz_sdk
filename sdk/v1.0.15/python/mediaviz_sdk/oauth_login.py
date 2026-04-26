from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class OauthLogin:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def get_login(self, next: str | None = None) -> dict[str, Any]:
        path = '/api/v1/oauth/login'
        _q: dict[str, str] = {}
        if next is not None:
            _q['next'] = str(next)
        if _q:
            path += '?' + urlencode(_q)
        with httpx.Client() as _client:
            _resp = _client.request('GET', self._ctx.base_url + path)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def post_login(self, email: Any, password: Any, next: Any) -> dict[str, Any]:
        path = '/api/v1/oauth/login'
        body = {
            'email': email,
            'password': password,
            'next': next,
        }
        with httpx.Client() as _client:
            _resp = _client.request('POST', self._ctx.base_url + path, data=body)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))
