from __future__ import annotations
import pytest


def test_get_search_project_photos_exists(mv_client):
    assert callable(getattr(mv_client.search, 'search_project_photos', None))

def test_get_search_project_photos_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.search_project_photos('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_search_project_photos_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.search_project_photos('hello world', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    assert '/api/v1/search/hello%20world/' in spy_client.last_call()['url']

def test_get_search_project_photos_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.search_project_photos('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'and_params=' in url
    assert 'and_string_params=' in url
    assert 'or_params=' in url
    assert 'or_string_params=' in url
    assert 'not_params=' in url
    assert 'not_string_params=' in url
    assert 'date_min=' in url
    assert 'date_max=' in url
    assert 'date_null_and=' in url
    assert 'date_null_or=' in url
    assert 'date_order=' in url
    assert 'custom_album_id=' in url
    assert 'best_of_similar_sets_only=' in url
    assert 'curated_album_id=' in url
    assert 'split_by_tier=' in url

def test_get_search_project_photos_parametrized_exists(mv_client):
    assert callable(getattr(mv_client.search, 'search_project_photos_parametrized', None))

def test_get_search_project_photos_parametrized_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.search_project_photos_parametrized('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_search_project_photos_parametrized_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.search_project_photos_parametrized('hello world', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 42)
    assert '/api/v1/search/parametrized/hello%20world/' in spy_client.last_call()['url']

def test_get_search_project_photos_parametrized_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.search_project_photos_parametrized('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 42)
    url = spy_client.last_call()['url']
    assert 'and_search_text=' in url
    assert 'or_search_text=' in url
    assert 'not_search_text=' in url
    assert 'city=' in url
    assert 'country=' in url
    assert 'state=' in url
    assert 'albums=' in url
    assert 'date_min=' in url
    assert 'date_max=' in url
    assert 'date_null_and=' in url
    assert 'date_null_or=' in url
    assert 'asc_or_desc=' in url
    assert 'best_of_similar_sets_only=' in url
    assert 'split_by_tier=' in url
    assert 'last_id=' in url
    assert 'limit=' in url

def test_get_recall_project_photo_ids_exists(mv_client):
    assert callable(getattr(mv_client.search, 'recall_project_photo_ids', None))

def test_get_recall_project_photo_ids_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.recall_project_photo_ids('test_value', 'test_value', 'test_value', 'test_value', 42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_recall_project_photo_ids_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.recall_project_photo_ids('hello world', 'test_value', 'test_value', 'test_value', 42)
    assert '/api/v1/search/recall/hello%20world/' in spy_client.last_call()['url']

def test_get_recall_project_photo_ids_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.recall_project_photo_ids('test_value', 'test_value', 'test_value', 'test_value', 42)
    url = spy_client.last_call()['url']
    assert 'asc_or_desc=' in url
    assert 'best_of_similar_sets_only=' in url
    assert 'last_id=' in url
    assert 'limit=' in url

def test_post_search_project_photos_natural_language_exists(mv_client):
    assert callable(getattr(mv_client.search, 'search_project_photos_natural_language', None))

def test_post_search_project_photos_natural_language_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.search_project_photos_natural_language('test_value', 'test_value', 42, 3.14, 3.14, 42, 3.14, 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_search_project_photos_natural_language_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.search_project_photos_natural_language('hello world', 'test_value', 42, 3.14, 3.14, 42, 3.14, 'test_value', 'test_value')
    assert '/api/v1/search/natural_language/hello%20world/' in spy_client.last_call()['url']

def test_post_search_project_photos_natural_language_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.search_project_photos_natural_language('test_value', 'test_value', 42, 3.14, 3.14, 42, 3.14, 'test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'min_cosine=' in url
    assert 'label_min_cosine=' in url
    assert 'label_top_k=' in url
    assert 'label_delta=' in url
    assert 'best_of_similar_sets_only=' in url
    assert 'split_by_tier=' in url

def test_post_search_project_photos_natural_language_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.search_project_photos_natural_language('test_value', 'test_value', 42, 3.14, 3.14, 42, 3.14, 'test_value', 'test_value')
    body = spy_client.last_call()['body']
    assert 'search_text' in body
    assert 'size' in body

def test_get_get_project_saved_searches_exists(mv_client):
    assert callable(getattr(mv_client.search, 'get_project_saved_searches', None))

def test_get_get_project_saved_searches_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.get_project_saved_searches('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_project_saved_searches_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.get_project_saved_searches('hello world')
    assert '/api/v1/search/saved/hello%20world/' in spy_client.last_call()['url']

def test_get_get_saved_search_by_id_exists(mv_client):
    assert callable(getattr(mv_client.search, 'get_saved_search_by_id', None))

def test_get_get_saved_search_by_id_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.get_saved_search_by_id(42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_saved_search_by_id_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.get_saved_search_by_id(42)
    assert '/api/v1/search/42' in spy_client.last_call()['url']

def test_post_save_project_photos_search_exists(mv_client):
    assert callable(getattr(mv_client.search, 'save_project_photos_search', None))

def test_post_save_project_photos_search_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.save_project_photos_search('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_save_project_photos_search_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.save_project_photos_search('hello world', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    assert '/api/v1/search/hello%20world/' in spy_client.last_call()['url']

def test_post_save_project_photos_search_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.save_project_photos_search('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'search_name=' in url
    assert 'and_params=' in url
    assert 'and_string_params=' in url
    assert 'or_params=' in url
    assert 'or_string_params=' in url
    assert 'not_params=' in url
    assert 'not_string_params=' in url
    assert 'date_min=' in url
    assert 'date_max=' in url
    assert 'date_null_and=' in url
    assert 'date_null_or=' in url
    assert 'date_order=' in url
    assert 'custom_album_id=' in url
    assert 'best_of_similar_sets_only=' in url
    assert 'curated_album_id=' in url
    assert 'split_by_tier=' in url

def test_delete_delete_saved_search_by_id_exists(mv_client):
    assert callable(getattr(mv_client.search, 'delete_saved_search_by_id', None))

def test_delete_delete_saved_search_by_id_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.delete_saved_search_by_id(42)
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_delete_saved_search_by_id_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.search.delete_saved_search_by_id(42)
    assert '/api/v1/search/42' in spy_client.last_call()['url']

