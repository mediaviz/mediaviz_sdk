from __future__ import annotations
import pytest


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

