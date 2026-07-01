from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class CustomAlbums:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def get_custom_album_detail_by_id(self, custom_album_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/custom_album/' + quote(str(custom_album_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_all_project_custom_albums(self, project_table_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/custom_album/project/' + quote(str(project_table_name), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_custom_album_photos_by_id(
        self,
        custom_album_id: int,
        asc_or_desc: str | None = None,
        last_id: Any | None = None,
        limit: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/custom_album/photos/' + quote(str(custom_album_id), safe='') + '/'
        _q: dict[str, Any] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = asc_or_desc
        if last_id is not None:
            _q['last_id'] = last_id
        if limit is not None:
            _q['limit'] = limit
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_ranked_custom_album_by_id(
        self,
        custom_album_id: int,
        asc_or_desc: str | None = None,
        last_id: Any | None = None,
        limit: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/custom_album/photos/ranked/' + quote(str(custom_album_id), safe='') + '/'
        _q: dict[str, Any] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = asc_or_desc
        if last_id is not None:
            _q['last_id'] = last_id
        if limit is not None:
            _q['limit'] = limit
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def create_project_custom_album(
        self,
        project_table_name: str,
        *,
        name: str | None = None,
        description: str | None = None,
        photoIdInclusionList: list | None = None,
        photoIdRemovalList: list | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/custom_album/project/' + quote(str(project_table_name), safe='')
        body = {k: v for k, v in {
            'name': name,
            'description': description,
            'photo_id_inclusion_list': photoIdInclusionList,
            'photo_id_removal_list': photoIdRemovalList,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token, body).data

    def update_custom_album(
        self,
        album_id: int,
        *,
        name: str | None = None,
        description: str | None = None,
        photoIdInclusionList: list | None = None,
        photoIdRemovalList: list | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/custom_album/' + quote(str(album_id), safe='')
        body = {k: v for k, v in {
            'name': name,
            'description': description,
            'photo_id_inclusion_list': photoIdInclusionList,
            'photo_id_removal_list': photoIdRemovalList,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token, body).data

    def delete_custom_album(self, album_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/custom_album/' + quote(str(album_id), safe='')
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data
