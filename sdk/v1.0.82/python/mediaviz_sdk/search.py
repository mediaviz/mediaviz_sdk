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
        _q: dict[str, Any] = {}
        if and_params is not None:
            _q['and_params'] = and_params
        if and_string_params is not None:
            _q['and_string_params'] = and_string_params
        if or_params is not None:
            _q['or_params'] = or_params
        if or_string_params is not None:
            _q['or_string_params'] = or_string_params
        if not_params is not None:
            _q['not_params'] = not_params
        if not_string_params is not None:
            _q['not_string_params'] = not_string_params
        if date_min is not None:
            _q['date_min'] = date_min
        if date_max is not None:
            _q['date_max'] = date_max
        if date_null_and is not None:
            _q['date_null_and'] = date_null_and
        if date_null_or is not None:
            _q['date_null_or'] = date_null_or
        if date_order is not None:
            _q['date_order'] = date_order
        if custom_album_id is not None:
            _q['custom_album_id'] = custom_album_id
        if best_of_similar_sets_only is not None:
            _q['best_of_similar_sets_only'] = best_of_similar_sets_only
        if curated_album_id is not None:
            _q['curated_album_id'] = curated_album_id
        if split_by_tier is not None:
            _q['split_by_tier'] = split_by_tier
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def search_project_photos_parametrized(
        self,
        project_table_name: str,
        and_search_text: Any | None = None,
        or_search_text: Any | None = None,
        not_search_text: Any | None = None,
        city: Any | None = None,
        country: Any | None = None,
        state: Any | None = None,
        albums: Any | None = None,
        date_min: Any | None = None,
        date_max: Any | None = None,
        date_null_and: Any | None = None,
        date_null_or: Any | None = None,
        asc_or_desc: str | None = None,
        best_of_similar_sets_only: Any | None = None,
        split_by_tier: Any | None = None,
        last_id: Any | None = None,
        limit: int | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/search/parametrized/' + quote(str(project_table_name), safe='') + '/'
        _q: dict[str, Any] = {}
        if and_search_text is not None:
            _q['and_search_text'] = and_search_text
        if or_search_text is not None:
            _q['or_search_text'] = or_search_text
        if not_search_text is not None:
            _q['not_search_text'] = not_search_text
        if city is not None:
            _q['city'] = city
        if country is not None:
            _q['country'] = country
        if state is not None:
            _q['state'] = state
        if albums is not None:
            _q['albums'] = albums
        if date_min is not None:
            _q['date_min'] = date_min
        if date_max is not None:
            _q['date_max'] = date_max
        if date_null_and is not None:
            _q['date_null_and'] = date_null_and
        if date_null_or is not None:
            _q['date_null_or'] = date_null_or
        if asc_or_desc is not None:
            _q['asc_or_desc'] = asc_or_desc
        if best_of_similar_sets_only is not None:
            _q['best_of_similar_sets_only'] = best_of_similar_sets_only
        if split_by_tier is not None:
            _q['split_by_tier'] = split_by_tier
        if last_id is not None:
            _q['last_id'] = last_id
        if limit is not None:
            _q['limit'] = limit
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def recall_project_photos(
        self,
        project_table_name: str,
        asc_or_desc: str | None = None,
        best_of_similar_sets_only: Any | None = None,
        last_id: Any | None = None,
        limit: int | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/search/recall/' + quote(str(project_table_name), safe='') + '/'
        _q: dict[str, Any] = {}
        if asc_or_desc is not None:
            _q['asc_or_desc'] = asc_or_desc
        if best_of_similar_sets_only is not None:
            _q['best_of_similar_sets_only'] = best_of_similar_sets_only
        if last_id is not None:
            _q['last_id'] = last_id
        if limit is not None:
            _q['limit'] = limit
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def search_project_photos_natural_language(
        self,
        project_table_name: str,
        searchText: str,
        size: int | None = None,
        min_cosine: float | None = None,
        label_min_cosine: float | None = None,
        label_top_k: int | None = None,
        label_delta: float | None = None,
        best_of_similar_sets_only: Any | None = None,
        split_by_tier: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/search/natural_language/' + quote(str(project_table_name), safe='') + '/'
        _q: dict[str, Any] = {}
        if min_cosine is not None:
            _q['min_cosine'] = min_cosine
        if label_min_cosine is not None:
            _q['label_min_cosine'] = label_min_cosine
        if label_top_k is not None:
            _q['label_top_k'] = label_top_k
        if label_delta is not None:
            _q['label_delta'] = label_delta
        if best_of_similar_sets_only is not None:
            _q['best_of_similar_sets_only'] = best_of_similar_sets_only
        if split_by_tier is not None:
            _q['split_by_tier'] = split_by_tier
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        body = {k: v for k, v in {
            'search_text': searchText,
            'size': size,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token, body).data

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
        _q: dict[str, Any] = {}
        if search_name is not None:
            _q['search_name'] = search_name
        if and_params is not None:
            _q['and_params'] = and_params
        if and_string_params is not None:
            _q['and_string_params'] = and_string_params
        if or_params is not None:
            _q['or_params'] = or_params
        if or_string_params is not None:
            _q['or_string_params'] = or_string_params
        if not_params is not None:
            _q['not_params'] = not_params
        if not_string_params is not None:
            _q['not_string_params'] = not_string_params
        if date_min is not None:
            _q['date_min'] = date_min
        if date_max is not None:
            _q['date_max'] = date_max
        if date_null_and is not None:
            _q['date_null_and'] = date_null_and
        if date_null_or is not None:
            _q['date_null_or'] = date_null_or
        if date_order is not None:
            _q['date_order'] = date_order
        if custom_album_id is not None:
            _q['custom_album_id'] = custom_album_id
        if best_of_similar_sets_only is not None:
            _q['best_of_similar_sets_only'] = best_of_similar_sets_only
        if curated_album_id is not None:
            _q['curated_album_id'] = curated_album_id
        if split_by_tier is not None:
            _q['split_by_tier'] = split_by_tier
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data

    def delete_saved_search_by_id(self, search_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/search/' + quote(str(search_id), safe='')
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data
