from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class OAuthAuthorization:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def authorize(
        self,
        response_type: str | None = None,
        client_id: str | None = None,
        redirect_uri: str | None = None,
        state: str | None = None,
        code_challenge: str | None = None,
        code_challenge_method: str | None = None,
    ) -> dict[str, Any]:
        path = '/oauth/authorize'
        _q: dict[str, Any] = {}
        if response_type is not None:
            _q['response_type'] = response_type
        if client_id is not None:
            _q['client_id'] = client_id
        if redirect_uri is not None:
            _q['redirect_uri'] = redirect_uri
        if state is not None:
            _q['state'] = state
        if code_challenge is not None:
            _q['code_challenge'] = code_challenge
        if code_challenge_method is not None:
            _q['code_challenge_method'] = code_challenge_method
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        with httpx.Client() as _client:
            _resp = _client.request('GET', self._ctx.base_url + path)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def get_consent(self, session_id: str) -> dict[str, Any]:
        path = '/oauth/consent/' + quote(str(session_id), safe='')
        with httpx.Client() as _client:
            _resp = _client.request('GET', self._ctx.base_url + path)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def post_approve_consent(self, session_id: str, restartUrl: Any) -> dict[str, Any]:
        path = '/oauth/consent/' + quote(str(session_id), safe='') + '/approve'
        body = {
            'restart_url': restartUrl,
        }
        with httpx.Client() as _client:
            _resp = _client.request('POST', self._ctx.base_url + path, data=body)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def post_deny_consent(self, session_id: str, restartUrl: Any) -> dict[str, Any]:
        path = '/oauth/consent/' + quote(str(session_id), safe='') + '/deny'
        body = {
            'restart_url': restartUrl,
        }
        with httpx.Client() as _client:
            _resp = _client.request('POST', self._ctx.base_url + path, data=body)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def get_switch_user(self, session_id: str, restart_url: str | None = None) -> dict[str, Any]:
        path = '/oauth/consent/' + quote(str(session_id), safe='') + '/switch-user'
        _q: dict[str, Any] = {}
        if restart_url is not None:
            _q['restart_url'] = restart_url
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        with httpx.Client() as _client:
            _resp = _client.request('GET', self._ctx.base_url + path)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))
