from __future__ import annotations
import pytest


def test_put_update_person_exists(mv_client):
    assert callable(getattr(mv_client.person, 'update_person', None))

def test_put_update_person_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.update_person('test_value', 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'PUT'

def test_put_update_person_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.update_person('hello world', 'hello world', 'test_value')
    assert '/api/v1/person/hello%20world/hello%20world' in spy_client.last_call()['url']

def test_put_update_person_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.update_person('test_value', 'test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'person_name=' in url

def test_put_combine_persons_exists(mv_client):
    assert callable(getattr(mv_client.person, 'combine_persons', None))

def test_put_combine_persons_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.combine_persons('test_value', 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'PUT'

def test_put_combine_persons_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.combine_persons('hello world', 'hello world', 'hello world')
    assert '/api/v1/person/hello%20world/combine/hello%20world/hello%20world' in spy_client.last_call()['url']

def test_put_split_persons_exists(mv_client):
    assert callable(getattr(mv_client.person, 'split_persons', None))

def test_put_split_persons_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.split_persons('test_value', 42, 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'PUT'

def test_put_split_persons_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.split_persons('hello world', 42, 'test_value', 'test_value')
    assert '/api/v1/person/hello%20world/split/42/' in spy_client.last_call()['url']

def test_put_split_persons_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.split_persons('test_value', 42, 'test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'new_name=' in url
    assert 'destination_person_id=' in url

def test_get_get_all_persons_from_project_exists(mv_client):
    assert callable(getattr(mv_client.person, 'get_all_persons_from_project', None))

def test_get_get_all_persons_from_project_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.get_all_persons_from_project('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_all_persons_from_project_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.get_all_persons_from_project('hello world')
    assert '/api/v1/person/hello%20world/' in spy_client.last_call()['url']

def test_get_get_all_person_names_from_project_exists(mv_client):
    assert callable(getattr(mv_client.person, 'get_all_person_names_from_project', None))

def test_get_get_all_person_names_from_project_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.get_all_person_names_from_project('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_all_person_names_from_project_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.get_all_person_names_from_project('hello world')
    assert '/api/v1/person/hello%20world/names' in spy_client.last_call()['url']

def test_get_get_all_persons_from_photo_exists(mv_client):
    assert callable(getattr(mv_client.person, 'get_all_persons_from_photo', None))

def test_get_get_all_persons_from_photo_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.get_all_persons_from_photo('test_value', 42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_all_persons_from_photo_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.person.get_all_persons_from_photo('hello world', 42)
    assert '/api/v1/person/hello%20world/photo/42' in spy_client.last_call()['url']

