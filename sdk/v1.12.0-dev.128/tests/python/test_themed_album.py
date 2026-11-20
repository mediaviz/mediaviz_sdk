from __future__ import annotations
import pytest


def test_post_create_themed_album_exists(mv_client):
    assert callable(getattr(mv_client.themed_album, 'create_themed_album', None))

def test_post_create_themed_album_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.create_themed_album('test_value', 'test_value', 'test_value', 3.14)
    assert spy_client.last_call()['method'] == 'POST'

def test_post_create_themed_album_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.create_themed_album('hello world', 'test_value', 'test_value', 3.14)
    assert '/api/v1/themed_album/project/hello%20world' in spy_client.last_call()['url']

def test_post_create_themed_album_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.create_themed_album('test_value', 'test_value', 'test_value', 3.14)
    body = spy_client.last_call()['body']
    assert 'name' in body
    assert 'description' in body
    assert 'confidence_value' in body

def test_get_get_all_project_themed_albums_exists(mv_client):
    assert callable(getattr(mv_client.themed_album, 'get_all_project_themed_albums', None))

def test_get_get_all_project_themed_albums_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.get_all_project_themed_albums('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_all_project_themed_albums_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.get_all_project_themed_albums('hello world')
    assert '/api/v1/themed_album/project/hello%20world' in spy_client.last_call()['url']

def test_get_get_themed_album_photos_exists(mv_client):
    assert callable(getattr(mv_client.themed_album, 'get_themed_album_photos', None))

def test_get_get_themed_album_photos_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.get_themed_album_photos(42, 'test_value', 'test_value', 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_themed_album_photos_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.get_themed_album_photos(42, 'test_value', 'test_value', 'test_value', 'test_value')
    assert '/api/v1/themed_album/photos/42/' in spy_client.last_call()['url']

def test_get_get_themed_album_photos_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.get_themed_album_photos(42, 'test_value', 'test_value', 'test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'asc_or_desc=' in url
    assert 'last_id=' in url
    assert 'limit=' in url
    assert 'confidence_value=' in url

def test_get_get_themed_album_photos_ranked_exists(mv_client):
    assert callable(getattr(mv_client.themed_album, 'get_themed_album_photos_ranked', None))

def test_get_get_themed_album_photos_ranked_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.get_themed_album_photos_ranked(42, 'test_value', 'test_value', 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_themed_album_photos_ranked_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.get_themed_album_photos_ranked(42, 'test_value', 'test_value', 'test_value', 'test_value')
    assert '/api/v1/themed_album/photos/ranked/42/' in spy_client.last_call()['url']

def test_get_get_themed_album_photos_ranked_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.get_themed_album_photos_ranked(42, 'test_value', 'test_value', 'test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'asc_or_desc=' in url
    assert 'last_id=' in url
    assert 'limit=' in url
    assert 'confidence_value=' in url

def test_get_get_themed_album_by_id_exists(mv_client):
    assert callable(getattr(mv_client.themed_album, 'get_themed_album_by_id', None))

def test_get_get_themed_album_by_id_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.get_themed_album_by_id(42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_themed_album_by_id_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.get_themed_album_by_id(42)
    assert '/api/v1/themed_album/42' in spy_client.last_call()['url']

def test_put_update_themed_album_exists(mv_client):
    assert callable(getattr(mv_client.themed_album, 'update_themed_album', None))

def test_put_update_themed_album_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.update_themed_album(42, name='test_value', description='test_value', confidenceValue=3.14)
    assert spy_client.last_call()['method'] == 'PUT'

def test_put_update_themed_album_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.update_themed_album(42, name='test_value', description='test_value', confidenceValue=3.14)
    assert '/api/v1/themed_album/42' in spy_client.last_call()['url']

def test_put_update_themed_album_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.update_themed_album(42, name='test_value', description='test_value', confidenceValue=3.14)
    body = spy_client.last_call()['body']
    assert 'name' in body
    assert 'description' in body
    assert 'confidence_value' in body

def test_delete_delete_themed_album_exists(mv_client):
    assert callable(getattr(mv_client.themed_album, 'delete_themed_album', None))

def test_delete_delete_themed_album_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.delete_themed_album(42)
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_delete_themed_album_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.delete_themed_album(42)
    assert '/api/v1/themed_album/42' in spy_client.last_call()['url']

def test_post_convert_themed_album_to_custom_exists(mv_client):
    assert callable(getattr(mv_client.themed_album, 'convert_themed_album_to_custom', None))

def test_post_convert_themed_album_to_custom_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.convert_themed_album_to_custom(42)
    assert spy_client.last_call()['method'] == 'POST'

def test_post_convert_themed_album_to_custom_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.themed_album.convert_themed_album_to_custom(42)
    assert '/api/v1/themed_album/42/convert' in spy_client.last_call()['url']

