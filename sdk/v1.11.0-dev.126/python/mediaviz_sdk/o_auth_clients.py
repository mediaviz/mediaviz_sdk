from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class OAuthClients:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def create_api_credential(self, credentialName: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/oauth/clients/api-credentials'
        body = {k: v for k, v in {
            'credential_name': credentialName,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token, body).data

    def get_company_api_credentials(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/oauth/clients/api-credentials'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def revoke_api_credential(self, client_id: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/oauth/clients/api-credentials/' + quote(str(client_id), safe='') + '/revoke'
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data
