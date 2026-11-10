from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class Admin:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def get_category_labels(self, category: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/category_labels/' + quote(str(category), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def admin_set_company_can_manage_api_clients(
        self,
        company_id: int,
        canManageApiClients: bool,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/companies/' + quote(str(company_id), safe='') + '/can_manage_api_clients'
        body = {k: v for k, v in {
            'can_manage_api_clients': canManageApiClients,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'PATCH', self._ctx.access_token, self._ctx.refresh_token, body).data
