from __future__ import annotations
import pytest


def test_post_create_api_credential_exists(mv_client):
    assert callable(getattr(mv_client.o_auth_clients, 'create_api_credential', None))

def test_post_create_api_credential_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.o_auth_clients.create_api_credential('test_value')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_create_api_credential_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.o_auth_clients.create_api_credential('test_value')
    assert '/oauth/clients/api-credentials' in spy_client.last_call()['url']

def test_post_create_api_credential_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.o_auth_clients.create_api_credential('test_value')
    body = spy_client.last_call()['body']
    assert 'credential_name' in body

def test_get_get_company_api_credentials_exists(mv_client):
    assert callable(getattr(mv_client.o_auth_clients, 'get_company_api_credentials', None))

def test_get_get_company_api_credentials_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.o_auth_clients.get_company_api_credentials()
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_company_api_credentials_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.o_auth_clients.get_company_api_credentials()
    assert '/oauth/clients/api-credentials' in spy_client.last_call()['url']

def test_post_revoke_api_credential_exists(mv_client):
    assert callable(getattr(mv_client.o_auth_clients, 'revoke_api_credential', None))

def test_post_revoke_api_credential_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.o_auth_clients.revoke_api_credential('test_value')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_revoke_api_credential_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.o_auth_clients.revoke_api_credential('hello world')
    assert '/oauth/clients/api-credentials/hello%20world/revoke' in spy_client.last_call()['url']

