from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class Company:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def admin_get_companies(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/companies/admin'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_all_companies(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/company/'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_company_by_id(self, company_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/company/' + quote(str(company_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def confirm_company_credit_balance(
        self,
        company_id: int,
        photo_count: int | None = None,
        models_list: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/company/credit_balance/' + quote(str(company_id), safe='')
        _q: dict[str, Any] = {}
        if photo_count is not None:
            _q['photo_count'] = photo_count
        if models_list is not None:
            _q['models_list'] = models_list if isinstance(models_list, (list, tuple)) else [models_list]
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def admin_list_active_company_tokens(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/company/admin_create/'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def admin_create_company_token(self, email: str | None = None) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/company/admin_create/'
        _q: dict[str, Any] = {}
        if email is not None:
            _q['email'] = email
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data

    def admin_revoke_company_token(self, token_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/company/admin_create/' + quote(str(token_id), safe='') + '/revoke/'
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data
