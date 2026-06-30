from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class EmailTokens:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def request_email_verification(self, email: str | None = None) -> dict[str, Any]:
        path = '/api/v1/request-email-verification'
        _q: dict[str, Any] = {}
        if email is not None:
            _q['email'] = email
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        with httpx.Client() as _client:
            _resp = _client.request('POST', self._ctx.base_url + path)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def verify_email(self, token: str) -> dict[str, Any]:
        path = '/api/v1/verify-email/' + quote(str(token), safe='')
        with httpx.Client() as _client:
            _resp = _client.request('POST', self._ctx.base_url + path)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def request_password_reset(self, email: str | None = None) -> dict[str, Any]:
        path = '/api/v1/request-password-reset'
        _q: dict[str, Any] = {}
        if email is not None:
            _q['email'] = email
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        with httpx.Client() as _client:
            _resp = _client.request('POST', self._ctx.base_url + path)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def validate_token(self, token: str) -> dict[str, Any]:
        path = '/api/v1/validate-token'
        body = {k: v for k, v in {
            'token': token,
        }.items() if v is not None}
        with httpx.Client() as _client:
            _resp = _client.request('POST', self._ctx.base_url + path, json=body)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def reset_password(self, token: str, newPassword: str) -> dict[str, Any]:
        path = '/api/v1/reset-password'
        body = {k: v for k, v in {
            'token': token,
            'new_password': newPassword,
        }.items() if v is not None}
        with httpx.Client() as _client:
            _resp = _client.request('POST', self._ctx.base_url + path, json=body)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def delete_user_email_tokens(self, user_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/email_tokens/by_user/' + quote(str(user_id), safe='')
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data
