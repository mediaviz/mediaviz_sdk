from __future__ import annotations
import pytest


def test_get_get_all_companies_exists(mv_client):
    assert callable(getattr(mv_client.company, 'get_all_companies', None))

def test_get_get_all_companies_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.get_all_companies()
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_all_companies_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.get_all_companies()
    assert '/api/v1/company/' in spy_client.last_call()['url']

def test_get_get_company_by_id_exists(mv_client):
    assert callable(getattr(mv_client.company, 'get_company_by_id', None))

def test_get_get_company_by_id_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.get_company_by_id(42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_company_by_id_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.get_company_by_id(42)
    assert '/api/v1/company/42' in spy_client.last_call()['url']

def test_get_confirm_company_credit_balance_exists(mv_client):
    assert callable(getattr(mv_client.company, 'confirm_company_credit_balance', None))

def test_get_confirm_company_credit_balance_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.confirm_company_credit_balance(42, 42, 'test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_confirm_company_credit_balance_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.confirm_company_credit_balance(42, 42, 'test_value')
    assert '/api/v1/company/credit_balance/42' in spy_client.last_call()['url']

def test_get_confirm_company_credit_balance_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.confirm_company_credit_balance(42, 42, 'test_value')
    url = spy_client.last_call()['url']
    assert 'photo_count=' in url
    assert 'models_list=' in url

def test_get_admin_list_active_company_tokens_exists(mv_client):
    assert callable(getattr(mv_client.company, 'admin_list_active_company_tokens', None))

def test_get_admin_list_active_company_tokens_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.admin_list_active_company_tokens()
    assert spy_client.last_call()['method'] == 'GET'

def test_get_admin_list_active_company_tokens_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.admin_list_active_company_tokens()
    assert '/api/v1/company/admin_create/' in spy_client.last_call()['url']

def test_post_admin_create_company_token_exists(mv_client):
    assert callable(getattr(mv_client.company, 'admin_create_company_token', None))

def test_post_admin_create_company_token_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.admin_create_company_token('user@example.com')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_admin_create_company_token_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.admin_create_company_token('user@example.com')
    assert '/api/v1/company/admin_create/' in spy_client.last_call()['url']

def test_post_admin_create_company_token_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.admin_create_company_token('user@example.com')
    url = spy_client.last_call()['url']
    assert 'email=' in url

def test_post_admin_revoke_company_token_exists(mv_client):
    assert callable(getattr(mv_client.company, 'admin_revoke_company_token', None))

def test_post_admin_revoke_company_token_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.admin_revoke_company_token(42)
    assert spy_client.last_call()['method'] == 'POST'

def test_post_admin_revoke_company_token_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.company.admin_revoke_company_token(42)
    assert '/api/v1/company/admin_create/42/revoke/' in spy_client.last_call()['url']

