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
