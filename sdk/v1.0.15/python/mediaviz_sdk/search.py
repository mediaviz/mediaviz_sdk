from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class Search:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def search_project_photos(
        self,
        project_table_name: str,
        and_params: Any | None = None,
        and_string_params: Any | None = None,
        or_params: Any | None = None,
        or_string_params: Any | None = None,
        not_params: Any | None = None,
        not_string_params: Any | None = None,
        date_min: Any | None = None,
        date_max: Any | None = None,
        date_null_and: Any | None = None,
        date_null_or: Any | None = None,
        date_order: Any | None = None,
        custom_album_id: Any | None = None,
        best_of_similar_sets_only: Any | None = None,
        curated_album_id: Any | None = None,
        split_by_tier: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/search/' + quote(str(project_table_name), safe='') + '/'
        _q: dict[str, str] = {}
        if and_params is not None:
            _q['and_params'] = str(and_params)
        if and_string_params is not None:
            _q['and_string_params'] = str(and_string_params)
        if or_params is not None:
            _q['or_params'] = str(or_params)
        if or_string_params is not None:
            _q['or_string_params'] = str(or_string_params)
        if not_params is not None:
            _q['not_params'] = str(not_params)
        if not_string_params is not None:
            _q['not_string_params'] = str(not_string_params)
        if date_min is not None:
            _q['date_min'] = str(date_min)
        if date_max is not None:
            _q['date_max'] = str(date_max)
        if date_null_and is not None:
            _q['date_null_and'] = str(date_null_and)
        if date_null_or is not None:
            _q['date_null_or'] = str(date_null_or)
        if date_order is not None:
            _q['date_order'] = str(date_order)
        if custom_album_id is not None:
            _q['custom_album_id'] = str(custom_album_id)
        if best_of_similar_sets_only is not None:
            _q['best_of_similar_sets_only'] = str(best_of_similar_sets_only)
        if curated_album_id is not None:
            _q['curated_album_id'] = str(curated_album_id)
        if split_by_tier is not None:
            _q['split_by_tier'] = str(split_by_tier)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_project_saved_searches(self, project_table_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/search/saved/' + quote(str(project_table_name), safe='') + '/'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_saved_search_by_id(self, search_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/search/' + quote(str(search_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def save_project_photos_search(
        self,
        project_table_name: str,
        search_name: str | None = None,
        and_params: Any | None = None,
        and_string_params: Any | None = None,
        or_params: Any | None = None,
        or_string_params: Any | None = None,
        not_params: Any | None = None,
        not_string_params: Any | None = None,
        date_min: Any | None = None,
        date_max: Any | None = None,
        date_null_and: Any | None = None,
        date_null_or: Any | None = None,
        date_order: Any | None = None,
        custom_album_id: Any | None = None,
        best_of_similar_sets_only: Any | None = None,
        curated_album_id: Any | None = None,
        split_by_tier: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/search/' + quote(str(project_table_name), safe='') + '/'
        _q: dict[str, str] = {}
        if search_name is not None:
            _q['search_name'] = str(search_name)
        if and_params is not None:
            _q['and_params'] = str(and_params)
        if and_string_params is not None:
            _q['and_string_params'] = str(and_string_params)
        if or_params is not None:
            _q['or_params'] = str(or_params)
        if or_string_params is not None:
            _q['or_string_params'] = str(or_string_params)
        if not_params is not None:
            _q['not_params'] = str(not_params)
        if not_string_params is not None:
            _q['not_string_params'] = str(not_string_params)
        if date_min is not None:
            _q['date_min'] = str(date_min)
        if date_max is not None:
            _q['date_max'] = str(date_max)
        if date_null_and is not None:
            _q['date_null_and'] = str(date_null_and)
        if date_null_or is not None:
            _q['date_null_or'] = str(date_null_or)
        if date_order is not None:
            _q['date_order'] = str(date_order)
        if custom_album_id is not None:
            _q['custom_album_id'] = str(custom_album_id)
        if best_of_similar_sets_only is not None:
            _q['best_of_similar_sets_only'] = str(best_of_similar_sets_only)
        if curated_album_id is not None:
            _q['curated_album_id'] = str(curated_album_id)
        if split_by_tier is not None:
            _q['split_by_tier'] = str(split_by_tier)
        if _q:
            path += '?' + urlencode(_q)
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data

    def delete_saved_search_by_id(self, search_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/search/' + quote(str(search_id), safe='')
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data
