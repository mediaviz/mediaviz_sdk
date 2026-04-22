from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class Photos:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def add_photo_to_project(
        self,
        photo: Any,
        tableName: Any,
        sourceResolutionX: Any,
        sourceResolutionY: Any,
        dateTaken: Any,
        latitude: Any,
        longitude: Any,
        filePath: Any,
        title: Any,
        clientSideId: Any,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/'
        body = {
            'photo': photo,
            'table_name': tableName,
            'source_resolution_x': sourceResolutionX,
            'source_resolution_y': sourceResolutionY,
            'date_taken': dateTaken,
            'latitude': latitude,
            'longitude': longitude,
            'file_path': filePath,
            'title': title,
            'client_side_id': clientSideId,
        }
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token, body).data

    def get_photo_from_project(
        self,
        table_name: str,
        photo_id: int,
        keyword_list_id: int | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/' + quote(str(table_name), safe='') + '/' + quote(str(photo_id), safe='')
        _q: dict[str, str] = {}
        if keyword_list_id is not None:
            _q['keyword_list_id'] = str(keyword_list_id)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_photo_face_details_from_project(self, table_name: str, photo_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/face_details/' + quote(str(table_name), safe='') + '/' + quote(str(photo_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_all_project_photo_ids(
        self,
        table_name: str,
        asc_or_desc: str | None = None,
        last_id: Any | None = None,
        limit: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/' + quote(str(table_name), safe='') + '/'
        _q: dict[str, str] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = str(asc_or_desc)
        if last_id is not None:
            _q['last_id'] = str(last_id)
        if limit is not None:
            _q['limit'] = str(limit)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_top_middle_bottom_project_photo_ids(
        self,
        table_name: str,
        asc_or_desc: str | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos_top/' + quote(str(table_name), safe='')
        _q: dict[str, str] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = str(asc_or_desc)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_top_middle_bottom_project_photos_by_table_name_sorted_by_date_ranked_keyset_paginated(
        self,
        table_name: str,
        asc_or_desc: str | None = None,
        last_id: Any | None = None,
        limit: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos_ranked/' + quote(str(table_name), safe='') + '/'
        _q: dict[str, str] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = str(asc_or_desc)
        if last_id is not None:
            _q['last_id'] = str(last_id)
        if limit is not None:
            _q['limit'] = str(limit)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_project_month_years_with_photos(self, table_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photo_month_years/' + quote(str(table_name), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_project_photo_ids_by_month(
        self,
        table_name: str,
        month: int,
        year: int,
        asc_or_desc: str | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/' + quote(str(table_name), safe='') + '/month/' + quote(str(month), safe='') + '/year/' + quote(str(year), safe='')
        _q: dict[str, str] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = str(asc_or_desc)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_project_photo_ids_by_month_keyset_paginated(
        self,
        table_name: str,
        month: int,
        year: int,
        asc_or_desc: str | None = None,
        last_id: Any | None = None,
        limit: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/' + quote(str(table_name), safe='') + '/month/' + quote(str(month), safe='') + '/year/' + quote(str(year), safe='') + '/'
        _q: dict[str, str] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = str(asc_or_desc)
        if last_id is not None:
            _q['last_id'] = str(last_id)
        if limit is not None:
            _q['limit'] = str(limit)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_top_project_photos_by_table_name_by_month(
        self,
        table_name: str,
        month: int,
        year: int,
        asc_or_desc: str | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/' + quote(str(table_name), safe='') + '/month/' + quote(str(month), safe='') + '/year/' + quote(str(year), safe='') + '/top'
        _q: dict[str, str] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = str(asc_or_desc)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_ranked_keyset_paginated(
        self,
        table_name: str,
        month: int,
        year: int,
        asc_or_desc: str | None = None,
        last_id: Any | None = None,
        limit: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/' + quote(str(table_name), safe='') + '/month/' + quote(str(month), safe='') + '/year/' + quote(str(year), safe='') + '/ranked/'
        _q: dict[str, str] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = str(asc_or_desc)
        if last_id is not None:
            _q['last_id'] = str(last_id)
        if limit is not None:
            _q['limit'] = str(limit)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_project_photo_ids_no_date_taken_keyset_paginated(
        self,
        table_name: str,
        asc_or_desc: str | None = None,
        last_id: Any | None = None,
        limit: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/' + quote(str(table_name), safe='') + '/date_taken/none/'
        _q: dict[str, str] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = str(asc_or_desc)
        if last_id is not None:
            _q['last_id'] = str(last_id)
        if limit is not None:
            _q['limit'] = str(limit)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_top_project_photos_by_table_name_no_date_taken_ranked(
        self,
        table_name: str,
        asc_or_desc: str | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/photos/' + quote(str(table_name), safe='') + '/date_taken/none/ranked'
        _q: dict[str, str] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = str(asc_or_desc)
        if _q:
            path += '?' + urlencode(_q)
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
        _q: dict[str, str] = {}
        if table_name is not None:
            _q['table_name'] = str(table_name)
        if photo_id is not None:
            _q['photo_id'] = str(photo_id)
        if photo_data is not None:
            _q['photo_data'] = str(photo_data)
        if _q:
            path += '?' + urlencode(_q)
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
        _q: dict[str, str] = {}
        if photo_ids is not None:
            _q['photo_ids'] = str(photo_ids)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data
