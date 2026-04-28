from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class CuratedAlbums:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def create_curated_album(
        self,
        project_table_name: str,
        name: str,
        description: str | None = None,
        confidenceValue: float | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/curated_album/project/' + quote(str(project_table_name), safe='')
        body = {k: v for k, v in {
            'name': name,
            'description': description,
            'confidence_value': confidenceValue,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token, body).data

    def get_all_project_curated_albums(self, project_table_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/curated_album/project/' + quote(str(project_table_name), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_curated_album_photos(
        self,
        album_id: int,
        asc_or_desc: str | None = None,
        last_id: Any | None = None,
        limit: Any | None = None,
        confidence_value: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/curated_album/photos/' + quote(str(album_id), safe='') + '/'
        _q: dict[str, Any] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = asc_or_desc
        if last_id is not None:
            _q['last_id'] = last_id
        if limit is not None:
            _q['limit'] = limit
        if confidence_value is not None:
            _q['confidence_value'] = confidence_value
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_curated_album_photos_ranked(
        self,
        album_id: int,
        asc_or_desc: str | None = None,
        last_id: Any | None = None,
        limit: Any | None = None,
        confidence_value: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/curated_album/photos/ranked/' + quote(str(album_id), safe='') + '/'
        _q: dict[str, Any] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = asc_or_desc
        if last_id is not None:
            _q['last_id'] = last_id
        if limit is not None:
            _q['limit'] = limit
        if confidence_value is not None:
            _q['confidence_value'] = confidence_value
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_curated_album_by_id(self, album_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/curated_album/' + quote(str(album_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def update_curated_album(
        self,
        album_id: int,
        name: str | None = None,
        description: str | None = None,
        confidenceValue: float | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/curated_album/' + quote(str(album_id), safe='')
        body = {k: v for k, v in {
            'name': name,
            'description': description,
            'confidence_value': confidenceValue,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token, body).data

    def delete_curated_album(self, album_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/curated_album/' + quote(str(album_id), safe='')
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data

    def convert_curated_album_to_custom(self, album_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/curated_album/' + quote(str(album_id), safe='') + '/convert'
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data
