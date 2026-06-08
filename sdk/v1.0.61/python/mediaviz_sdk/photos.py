from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class Photos:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def get_photo_from_project(
        self,
        table_name: str,
        photo_id: int,
        keyword_list_id: int | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/' + quote(str(table_name), safe='') + '/' + quote(str(photo_id), safe='')
        _q: dict[str, Any] = {}
        if keyword_list_id is not None:
            _q['keyword_list_id'] = keyword_list_id
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_photo_face_details_from_project(self, table_name: str, photo_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/face_details/' + quote(str(table_name), safe='') + '/' + quote(str(photo_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_project_photo_ids_by_table_name(
        self,
        table_name: str,
        asc_or_desc: str | None = None,
        last_id: Any | None = None,
        limit: Any | None = None,
        include_all: Any | None = None,
        start_date: Any | None = None,
        end_date: Any | None = None,
        no_date_taken: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/' + quote(str(table_name), safe='') + '/'
        _q: dict[str, Any] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = asc_or_desc
        if last_id is not None:
            _q['last_id'] = last_id
        if limit is not None:
            _q['limit'] = limit
        if include_all is not None:
            _q['include_all'] = include_all
        if start_date is not None:
            _q['start_date'] = start_date
        if end_date is not None:
            _q['end_date'] = end_date
        if no_date_taken is not None:
            _q['no_date_taken'] = no_date_taken
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_ranked_project_photo_ids_by_table_name(
        self,
        table_name: str,
        asc_or_desc: str | None = None,
        last_id: Any | None = None,
        limit: Any | None = None,
        start_date: Any | None = None,
        end_date: Any | None = None,
        no_date_taken: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/ranked/' + quote(str(table_name), safe='') + '/'
        _q: dict[str, Any] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = asc_or_desc
        if last_id is not None:
            _q['last_id'] = last_id
        if limit is not None:
            _q['limit'] = limit
        if start_date is not None:
            _q['start_date'] = start_date
        if end_date is not None:
            _q['end_date'] = end_date
        if no_date_taken is not None:
            _q['no_date_taken'] = no_date_taken
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_project_month_years_with_photos(self, table_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photo_month_years/' + quote(str(table_name), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_project_thumbnail(self, table_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos_project/' + quote(str(table_name), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def update_photo_in_project(
        self,
        table_name: str | None = None,
        photo_id: int | None = None,
        photo_data: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos_update'
        _q: dict[str, Any] = {}
        if table_name is not None:
            _q['table_name'] = table_name
        if photo_id is not None:
            _q['photo_id'] = photo_id
        if photo_data is not None:
            _q['photo_data'] = photo_data
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token).data

    def update_photo_ranking(
        self,
        table_name: str,
        photo_id: int,
        new_category: str,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos_update/' + quote(str(table_name), safe='') + '/id/' + quote(str(photo_id), safe='') + '/rank/' + quote(str(new_category), safe='')
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token).data

    def delete_photo_from_project(
        self,
        table_name: str,
        photo_ids: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/' + quote(str(table_name), safe='') + '/delete/'
        _q: dict[str, Any] = {}
        if photo_ids is not None:
            _q['photo_ids'] = photo_ids
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data
