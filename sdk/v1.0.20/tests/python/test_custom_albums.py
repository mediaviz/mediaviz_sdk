from __future__ import annotations
import pytest


def test_get_get_custom_album_detail_by_id_exists(mv_client):
    assert callable(getattr(mv_client.custom_albums, 'get_custom_album_detail_by_id', None))

def test_get_get_custom_album_detail_by_id_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.get_custom_album_detail_by_id(42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_custom_album_detail_by_id_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.get_custom_album_detail_by_id(42)
    assert '/api/v1/custom_album/42' in spy_client.last_call()['url']

def test_get_get_all_project_custom_albums_exists(mv_client):
    assert callable(getattr(mv_client.custom_albums, 'get_all_project_custom_albums', None))

def test_get_get_all_project_custom_albums_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.get_all_project_custom_albums('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_all_project_custom_albums_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.get_all_project_custom_albums('hello world')
    assert '/api/v1/custom_album/project/hello%20world' in spy_client.last_call()['url']

def test_get_get_custom_album_photos_by_id_exists(mv_client):
    assert callable(getattr(mv_client.custom_albums, 'get_custom_album_photos_by_id', None))

def test_get_get_custom_album_photos_by_id_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.get_custom_album_photos_by_id(42, 'test_value', 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_custom_album_photos_by_id_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.get_custom_album_photos_by_id(42, 'test_value', 'test_value', 'test_value')
    assert '/api/v1/custom_album/photos/42/' in spy_client.last_call()['url']

def test_get_get_custom_album_photos_by_id_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.get_custom_album_photos_by_id(42, 'test_value', 'test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'asc_or_desc=' in url
    assert 'last_id=' in url
    assert 'limit=' in url

def test_get_get_ranked_custom_album_by_id_exists(mv_client):
    assert callable(getattr(mv_client.custom_albums, 'get_ranked_custom_album_by_id', None))

def test_get_get_ranked_custom_album_by_id_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.get_ranked_custom_album_by_id(42, 'test_value', 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_ranked_custom_album_by_id_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.get_ranked_custom_album_by_id(42, 'test_value', 'test_value', 'test_value')
    assert '/api/v1/custom_album/photos/ranked/42/' in spy_client.last_call()['url']

def test_get_get_ranked_custom_album_by_id_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.get_ranked_custom_album_by_id(42, 'test_value', 'test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'asc_or_desc=' in url
    assert 'last_id=' in url
    assert 'limit=' in url

def test_post_create_project_custom_album_exists(mv_client):
    assert callable(getattr(mv_client.custom_albums, 'create_project_custom_album', None))

def test_post_create_project_custom_album_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.create_project_custom_album('test_value', 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2'])
    assert spy_client.last_call()['method'] == 'POST'

def test_post_create_project_custom_album_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.create_project_custom_album('hello world', 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2'])
    assert '/api/v1/custom_album/project/hello%20world' in spy_client.last_call()['url']

def test_post_create_project_custom_album_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.create_project_custom_album('test_value', 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2'])
    body = spy_client.last_call()['body']
    assert 'name' in body
    assert 'description' in body
    assert 'photo_id_inclusion_list' in body
    assert 'photo_id_removal_list' in body

def test_put_update_custom_album_exists(mv_client):
    assert callable(getattr(mv_client.custom_albums, 'update_custom_album', None))

def test_put_update_custom_album_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.update_custom_album(42, 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2'])
    assert spy_client.last_call()['method'] == 'PUT'

def test_put_update_custom_album_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.update_custom_album(42, 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2'])
    assert '/api/v1/custom_album/42' in spy_client.last_call()['url']

def test_put_update_custom_album_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.update_custom_album(42, 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2'])
    body = spy_client.last_call()['body']
    assert 'name' in body
    assert 'description' in body
    assert 'photo_id_inclusion_list' in body
    assert 'photo_id_removal_list' in body

def test_delete_delete_custom_album_exists(mv_client):
    assert callable(getattr(mv_client.custom_albums, 'delete_custom_album', None))

def test_delete_delete_custom_album_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.delete_custom_album(42)
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_delete_custom_album_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.custom_albums.delete_custom_album(42)
    assert '/api/v1/custom_album/42' in spy_client.last_call()['url']

