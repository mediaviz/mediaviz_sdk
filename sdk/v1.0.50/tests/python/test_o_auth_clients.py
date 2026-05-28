from __future__ import annotations
import pytest


def test_post_create_client_exists(mv_client):
    assert callable(getattr(mv_client.o_auth_clients, 'create_client', None))

def test_post_create_client_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.o_auth_clients.create_client('test_value', 'test_value', ['item1', 'item2'], True)
    assert spy_client.last_call()['method'] == 'POST'

def test_post_create_client_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.o_auth_clients.create_client('test_value', 'test_value', ['item1', 'item2'], True)
    assert '/oauth/clients' in spy_client.last_call()['url']

def test_post_create_client_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.o_auth_clients.create_client('test_value', 'test_value', ['item1', 'item2'], True)
    body = spy_client.last_call()['body']
    assert 'client_name' in body
    assert 'client_type' in body
    assert 'redirect_uris' in body
    assert 'is_first_party' in body

