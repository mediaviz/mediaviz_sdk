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

    def admin_dump_company_nlp_index(self, company_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/dump_company_nlp_index/' + quote(str(company_id), safe='')
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
        _q: dict[str, Any] = {}
        if subgroup is not None:
            _q['subgroup'] = subgroup
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def admin_create_company_nlp_indexes(self, company_ids: Any | None = None) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/create_company_nlp_indexes/'
        _q: dict[str, Any] = {}
        if company_ids is not None:
            _q['company_ids'] = company_ids
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data

    def admin_create_nl_hybrid_pipelines(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/search/nl_create_hybrid_pipelines'
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data

    def admin_create_label_vocab_index(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/search/create_label_vocab_index'
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data

    def admin_clear_nl_search_cache(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/clear_nl_search_cache/'
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data

    def admin_delete_company_nlp_indexes(self, company_ids: Any | None = None) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/delete_company_nlp_indexes/'
        _q: dict[str, Any] = {}
        if company_ids is not None:
            _q['company_ids'] = company_ids
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data

    def admin_delete_user_projects(self, user_ids: Any | None = None) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/delete_user_projects/'
        _q: dict[str, Any] = {}
        if user_ids is not None:
            _q['user_ids'] = user_ids
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data

    def admin_delete_user(self, user_ids: Any | None = None) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/admin/delete_user/'
        _q: dict[str, Any] = {}
        if user_ids is not None:
            _q['user_ids'] = user_ids
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data
