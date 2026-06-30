from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class Person:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def update_person(
        self,
        project_table_name: str,
        person_id: str,
        person_name: str | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/person/' + quote(str(project_table_name), safe='') + '/' + quote(str(person_id), safe='')
        _q: dict[str, Any] = {}
        if person_name is not None:
            _q['person_name'] = person_name
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token).data

    def combine_persons(
        self,
        project_table_name: str,
        destination_person_id: str,
        old_person_id: str,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/person/' + quote(str(project_table_name), safe='') + '/combine/' + quote(str(destination_person_id), safe='') + '/' + quote(str(old_person_id), safe='')
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token).data

    def split_persons(
        self,
        project_table_name: str,
        id: int,
        new_name: Any | None = None,
        destination_person_id: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/person/' + quote(str(project_table_name), safe='') + '/split/' + quote(str(id), safe='') + '/'
        _q: dict[str, Any] = {}
        if new_name is not None:
            _q['new_name'] = new_name
        if destination_person_id is not None:
            _q['destination_person_id'] = destination_person_id
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token).data

    def get_all_persons_from_project(self, project_table_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/person/' + quote(str(project_table_name), safe='') + '/'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_all_person_names_from_project(self, project_table_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/person/' + quote(str(project_table_name), safe='') + '/names'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_photo_ids_by_persons(
        self,
        project_table_name: str,
        person_id: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/person/' + quote(str(project_table_name), safe='') + '/photos'
        _q: dict[str, Any] = {}
        if person_id is not None:
            _q['person_id'] = person_id if isinstance(person_id, (list, tuple)) else [person_id]
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_all_persons_from_photo(self, project_table_name: str, photo_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/person/' + quote(str(project_table_name), safe='') + '/photo/' + quote(str(photo_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data
