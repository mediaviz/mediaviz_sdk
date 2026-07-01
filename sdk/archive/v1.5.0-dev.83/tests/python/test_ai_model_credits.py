from __future__ import annotations
import pytest


def test_get_get_model_credit_relationship_exists(mv_client):
    assert callable(getattr(mv_client.ai_model_credits, 'get_model_credit_relationship', None))

def test_get_get_model_credit_relationship_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.ai_model_credits.get_model_credit_relationship('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_model_credit_relationship_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.ai_model_credits.get_model_credit_relationship('hello world')
    assert '/api/v1/model_credit/hello%20world' in spy_client.last_call()['url']

