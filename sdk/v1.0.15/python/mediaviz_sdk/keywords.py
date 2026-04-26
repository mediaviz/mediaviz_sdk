from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class Keywords:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def create_keyword_filtering_list(
        self,
        name: str,
        projectList: list | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/'
        body = {k: v for k, v in {
            'name': name,
            'project_list': projectList,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token, body).data

    def get_user_keyword_filtering_lists(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/user'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_keyword_filtering_list_and_projects_by_id(self, keyword_list_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/' + quote(str(keyword_list_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_keyword_filtering_list_by_id(self, keyword_list_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/list/' + quote(str(keyword_list_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_existing_keyword_filtering_list_by_project(
        self,
        project_table_name: str,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/project/' + quote(str(project_table_name), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_default_keyword_filtering_list_by_project(
        self,
        project_table_name: str,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/project/' + quote(str(project_table_name), safe='') + '/default'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def update_keyword_filtering_list_labels(
        self,
        keyword_list_id: int,
        listKeywordsToInclude: list,
        listKeywordsToExclude: list,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/' + quote(str(keyword_list_id), safe='')
        body = {k: v for k, v in {
            'list_keywords_to_include': listKeywordsToInclude,
            'list_keywords_to_exclude': listKeywordsToExclude,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token, body).data

    def update_keyword_filtering_list_details(
        self,
        keyword_list_id: int,
        name: str | None = None,
        projectList: list | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/details/' + quote(str(keyword_list_id), safe='')
        body = {k: v for k, v in {
            'name': name,
            'project_list': projectList,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token, body).data

    def add_project_to_keyword_filtering_list(
        self,
        keyword_list_id: int,
        project_ids: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/' + quote(str(keyword_list_id), safe='') + '/projects'
        _q: dict[str, str] = {}
        if project_ids is not None:
            _q['project_ids'] = str(project_ids)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data

    def request_keyword_list_export(self, keyword_list_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/export/' + quote(str(keyword_list_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def request_keyword_list_export_status(self, keyword_list_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/export_status/' + quote(str(keyword_list_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_keywords_and_ids(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/all_keywords/id/label'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def remove_projects_from_keyword_filtering_list(
        self,
        keyword_list_id: int,
        project_ids: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/' + quote(str(keyword_list_id), safe='') + '/projects'
        _q: dict[str, str] = {}
        if project_ids is not None:
            _q['project_ids'] = str(project_ids)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data

    def delete_keyword_filtering_list_by_id(self, keyword_list_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/keyword/' + quote(str(keyword_list_id), safe='')
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data
