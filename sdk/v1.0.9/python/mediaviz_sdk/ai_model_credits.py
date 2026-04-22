from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class AiModelCredits:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def get_model_credit_relationship(self, model_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/model_credit/' + quote(str(model_name), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def upsert_model_credit_relationship(
        self,
        model_name: str | None = None,
        new_credit_value: int | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/model_credit/upsert'
        _q: dict[str, str] = {}
        if model_name is not None:
            _q['model_name'] = str(model_name)
        if new_credit_value is not None:
            _q['new_credit_value'] = str(new_credit_value)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data
