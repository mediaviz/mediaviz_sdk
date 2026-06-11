from __future__ import annotations
import pytest


def test_get_get_photo_from_project_exists(mv_client):
    assert callable(getattr(mv_client.photos, 'get_photo_from_project', None))

def test_get_get_photo_from_project_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_photo_from_project('test_value', 42, 42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_photo_from_project_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_photo_from_project('hello world', 42, 42)
    assert '/api/v1/photos/hello%20world/42' in spy_client.last_call()['url']

def test_get_get_photo_from_project_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_photo_from_project('test_value', 42, 42)
    url = spy_client.last_call()['url']
    assert 'keyword_list_id=' in url

def test_get_get_photo_face_details_from_project_exists(mv_client):
    assert callable(getattr(mv_client.photos, 'get_photo_face_details_from_project', None))

def test_get_get_photo_face_details_from_project_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_photo_face_details_from_project('test_value', 42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_photo_face_details_from_project_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_photo_face_details_from_project('hello world', 42)
    assert '/api/v1/photos/face_details/hello%20world/42' in spy_client.last_call()['url']

def test_get_get_project_photo_ids_by_table_name_exists(mv_client):
    assert callable(getattr(mv_client.photos, 'get_project_photo_ids_by_table_name', None))

def test_get_get_project_photo_ids_by_table_name_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_project_photo_ids_by_table_name('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_project_photo_ids_by_table_name_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_project_photo_ids_by_table_name('hello world', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    assert '/api/v1/photos/hello%20world/' in spy_client.last_call()['url']

def test_get_get_project_photo_ids_by_table_name_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_project_photo_ids_by_table_name('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'asc_or_desc=' in url
    assert 'last_id=' in url
    assert 'limit=' in url
    assert 'include_all=' in url
    assert 'start_date=' in url
    assert 'end_date=' in url
    assert 'no_date_taken=' in url

def test_get_get_ranked_project_photo_ids_by_table_name_exists(mv_client):
    assert callable(getattr(mv_client.photos, 'get_ranked_project_photo_ids_by_table_name', None))

def test_get_get_ranked_project_photo_ids_by_table_name_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_ranked_project_photo_ids_by_table_name('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_ranked_project_photo_ids_by_table_name_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_ranked_project_photo_ids_by_table_name('hello world', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    assert '/api/v1/photos/ranked/hello%20world/' in spy_client.last_call()['url']

def test_get_get_ranked_project_photo_ids_by_table_name_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_ranked_project_photo_ids_by_table_name('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'asc_or_desc=' in url
    assert 'last_id=' in url
    assert 'limit=' in url
    assert 'start_date=' in url
    assert 'end_date=' in url
    assert 'no_date_taken=' in url

def test_get_get_project_month_years_with_photos_exists(mv_client):
    assert callable(getattr(mv_client.photos, 'get_project_month_years_with_photos', None))

def test_get_get_project_month_years_with_photos_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_project_month_years_with_photos('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_project_month_years_with_photos_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_project_month_years_with_photos('hello world')
    assert '/api/v1/photo_month_years/hello%20world' in spy_client.last_call()['url']

def test_get_get_project_thumbnail_exists(mv_client):
    assert callable(getattr(mv_client.photos, 'get_project_thumbnail', None))

def test_get_get_project_thumbnail_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_project_thumbnail('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_project_thumbnail_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.get_project_thumbnail('hello world')
    assert '/api/v1/photos_project/hello%20world' in spy_client.last_call()['url']

def test_put_update_photo_in_project_exists(mv_client):
    assert callable(getattr(mv_client.photos, 'update_photo_in_project', None))

def test_put_update_photo_in_project_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.update_photo_in_project('test_value', 42, 'test_value')
    assert spy_client.last_call()['method'] == 'PUT'

def test_put_update_photo_in_project_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.update_photo_in_project('test_value', 42, 'test_value')
    assert '/api/v1/photos_update' in spy_client.last_call()['url']

def test_put_update_photo_in_project_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.update_photo_in_project('test_value', 42, 'test_value')
    url = spy_client.last_call()['url']
    assert 'table_name=' in url
    assert 'photo_id=' in url
    assert 'photo_data=' in url

def test_put_update_photo_ranking_exists(mv_client):
    assert callable(getattr(mv_client.photos, 'update_photo_ranking', None))

def test_put_update_photo_ranking_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.update_photo_ranking('test_value', 42, 'test_value')
    assert spy_client.last_call()['method'] == 'PUT'

def test_put_update_photo_ranking_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.update_photo_ranking('hello world', 42, 'hello world')
    assert '/api/v1/photos_update/hello%20world/id/42/rank/hello%20world' in spy_client.last_call()['url']

def test_delete_delete_photo_from_project_exists(mv_client):
    assert callable(getattr(mv_client.photos, 'delete_photo_from_project', None))

def test_delete_delete_photo_from_project_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.delete_photo_from_project('test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_delete_photo_from_project_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.delete_photo_from_project('hello world', 'test_value')
    assert '/api/v1/photos/hello%20world/delete/' in spy_client.last_call()['url']

def test_delete_delete_photo_from_project_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.photos.delete_photo_from_project('test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'photo_ids=' in url

