from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class Admin:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def insert_label_category_matrix(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/insert_label_category_matrix'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def generate_mid_level_category_keyword_alignment(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/generate_mid_level_category_keyword_alignment'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_category_labels(self, category: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/category_labels/' + quote(str(category), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_all_keyword_groups_and_subgroups(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/keyword_group'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_keyword_groups_labels_by_keyword_group(
        self,
        keyword_group: str,
        subgroup: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/keyword_group/' + quote(str(keyword_group), safe='') + '/'
        _q: dict[str, str] = {}
        if subgroup is not None:
            _q['subgroup'] = str(subgroup)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_google_sheets_credentials(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/get_google_sheets_credentials'
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data

    def request_album_curation(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/request_album_curation'
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data

    def admin_delete_user_projects(self, user_ids: Any | None = None) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/delete_user_projects/'
        _q: dict[str, str] = {}
        if user_ids is not None:
            _q['user_ids'] = str(user_ids)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data

    def admin_delete_user(self, user_ids: Any | None = None) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/delete_user/'
        _q: dict[str, str] = {}
        if user_ids is not None:
            _q['user_ids'] = str(user_ids)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data
