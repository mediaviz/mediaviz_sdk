from __future__ import annotations
import pytest


def test_post_create_subscription_exists(mv_client):
    assert callable(getattr(mv_client.subscription, 'create_subscription', None))

def test_post_create_subscription_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.create_subscription('test_value', 'test_value', ['item1', 'item2'])
    assert spy_client.last_call()['method'] == 'POST'

def test_post_create_subscription_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.create_subscription('test_value', 'test_value', ['item1', 'item2'])
    assert '/api/v1/subscriptions' in spy_client.last_call()['url']

def test_post_create_subscription_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.create_subscription('test_value', 'test_value', ['item1', 'item2'])
    body = spy_client.last_call()['body']
    assert 'project_table_name' in body
    assert 'callback_url' in body
    assert 'targets' in body

def test_post_verify_subscription_exists(mv_client):
    assert callable(getattr(mv_client.subscription, 'verify_subscription', None))

def test_post_verify_subscription_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.verify_subscription('00000000-0000-0000-0000-000000000000')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_verify_subscription_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.verify_subscription('00000000-0000-0000-0000-000000000000')
    assert '/api/v1/subscriptions/00000000-0000-0000-0000-000000000000/verify' in spy_client.last_call()['url']

def test_get_list_subscriptions_exists(mv_client):
    assert callable(getattr(mv_client.subscription, 'list_subscriptions', None))

def test_get_list_subscriptions_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.list_subscriptions()
    assert spy_client.last_call()['method'] == 'GET'

def test_get_list_subscriptions_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.list_subscriptions()
    assert '/api/v1/subscriptions' in spy_client.last_call()['url']

def test_get_list_subscription_events_exists(mv_client):
    assert callable(getattr(mv_client.subscription, 'list_subscription_events', None))

def test_get_list_subscription_events_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.list_subscription_events('00000000-0000-0000-0000-000000000000', 'test_value', 42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_list_subscription_events_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.list_subscription_events('00000000-0000-0000-0000-000000000000', 'test_value', 42)
    assert '/api/v1/subscriptions/00000000-0000-0000-0000-000000000000/events' in spy_client.last_call()['url']

def test_get_list_subscription_events_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.list_subscription_events('00000000-0000-0000-0000-000000000000', 'test_value', 42)
    url = spy_client.last_call()['url']
    assert 'since=' in url
    assert 'limit=' in url

def test_patch_update_subscription_exists(mv_client):
    assert callable(getattr(mv_client.subscription, 'update_subscription', None))

def test_patch_update_subscription_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.update_subscription('00000000-0000-0000-0000-000000000000', callbackUrl='test_value', targets=['item1', 'item2'])
    assert spy_client.last_call()['method'] == 'PATCH'

def test_patch_update_subscription_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.update_subscription('00000000-0000-0000-0000-000000000000', callbackUrl='test_value', targets=['item1', 'item2'])
    assert '/api/v1/subscriptions/00000000-0000-0000-0000-000000000000' in spy_client.last_call()['url']

def test_patch_update_subscription_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.update_subscription('00000000-0000-0000-0000-000000000000', callbackUrl='test_value', targets=['item1', 'item2'])
    body = spy_client.last_call()['body']
    assert 'callback_url' in body
    assert 'targets' in body

def test_delete_delete_subscription_exists(mv_client):
    assert callable(getattr(mv_client.subscription, 'delete_subscription', None))

def test_delete_delete_subscription_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.delete_subscription('00000000-0000-0000-0000-000000000000')
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_delete_subscription_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.delete_subscription('00000000-0000-0000-0000-000000000000')
    assert '/api/v1/subscriptions/00000000-0000-0000-0000-000000000000' in spy_client.last_call()['url']

def test_post_rotate_subscription_secret_exists(mv_client):
    assert callable(getattr(mv_client.subscription, 'rotate_subscription_secret', None))

def test_post_rotate_subscription_secret_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.rotate_subscription_secret('00000000-0000-0000-0000-000000000000')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_rotate_subscription_secret_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.subscription.rotate_subscription_secret('00000000-0000-0000-0000-000000000000')
    assert '/api/v1/subscriptions/00000000-0000-0000-0000-000000000000/rotate_secret' in spy_client.last_call()['url']

