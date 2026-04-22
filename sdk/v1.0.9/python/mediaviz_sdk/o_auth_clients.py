from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class OAuthClients:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def create_client(
        self,
        clientName: str,
        clientType: str,
        redirectUris: list,
        isFirstParty: bool,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/oauth/clients'
        body = {k: v for k, v in {
            'client_name': clientName,
            'client_type': clientType,
            'redirect_uris': redirectUris,
            'is_first_party': isFirstParty,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token, body).data
