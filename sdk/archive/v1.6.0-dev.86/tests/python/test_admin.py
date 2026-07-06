from __future__ import annotations
import pytest


def test_get_get_category_labels_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'get_category_labels', None))

def test_get_get_category_labels_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.get_category_labels('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_category_labels_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.get_category_labels('hello world')
    assert '/api/v1/admin/category_labels/hello%20world' in spy_client.last_call()['url']

