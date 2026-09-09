from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class OAuthToken:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def token(
        self,
        grantType: Any,
        code: Any,
        redirectUri: Any,
        clientId: Any,
        codeVerifier: Any,
        refreshToken: Any,
        clientSecret: Any,
    ) -> dict[str, Any]:
        path = '/oauth/token'
        body = {
            'grant_type': grantType,
            'code': code,
            'redirect_uri': redirectUri,
            'client_id': clientId,
            'code_verifier': codeVerifier,
            'refresh_token': refreshToken,
            'client_secret': clientSecret,
        }
        with httpx.Client() as _client:
            _resp = _client.request('POST', self._ctx.base_url + path, data=body)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def admin_revoke_user_tokens(self, user_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/oauth/admin/users/' + quote(str(user_id), safe='') + '/revoke-tokens'
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data

    def revoke(self, token: Any, tokenTypeHint: Any, clientId: Any) -> dict[str, Any]:
        path = '/oauth/revoke'
        body = {
            'token': token,
            'token_type_hint': tokenTypeHint,
            'client_id': clientId,
        }
        with httpx.Client() as _client:
            _resp = _client.request('POST', self._ctx.base_url + path, data=body)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))
