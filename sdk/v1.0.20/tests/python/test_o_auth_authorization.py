from __future__ import annotations
import pytest
import httpx


class _MockClient:
    def __init__(self):
        self.recorded: list[dict] = []
    def __enter__(self): return self
    def __exit__(self, *a): pass
    def request(self, method, url, **kw):
        self.recorded.append({'method': method, 'url': url})
        class _R:
            text = '{}'
            status_code = 200
            headers: dict = {}
        return _R()


def test_get_authorize_exists(mv_client):
    assert callable(getattr(mv_client.o_auth_authorization, 'authorize', None))

def test_get_authorize_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.o_auth_authorization.authorize('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    assert _mc.recorded[0]['method'] == 'GET'

def test_get_authorize_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.o_auth_authorization.authorize('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    assert '/oauth/authorize' in _mc.recorded[0]['url']

def test_get_get_consent_exists(mv_client):
    assert callable(getattr(mv_client.o_auth_authorization, 'get_consent', None))

def test_get_get_consent_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.o_auth_authorization.get_consent('test_value')
    assert _mc.recorded[0]['method'] == 'GET'

def test_get_get_consent_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.o_auth_authorization.get_consent('hello world')
    assert '/oauth/consent/hello%20world' in _mc.recorded[0]['url']

def test_post_post_approve_consent_exists(mv_client):
    assert callable(getattr(mv_client.o_auth_authorization, 'post_approve_consent', None))

def test_post_post_approve_consent_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.o_auth_authorization.post_approve_consent('test_value')
    assert _mc.recorded[0]['method'] == 'POST'

def test_post_post_approve_consent_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.o_auth_authorization.post_approve_consent('hello world')
    assert '/oauth/consent/hello%20world/approve' in _mc.recorded[0]['url']

def test_post_post_deny_consent_exists(mv_client):
    assert callable(getattr(mv_client.o_auth_authorization, 'post_deny_consent', None))

def test_post_post_deny_consent_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.o_auth_authorization.post_deny_consent('test_value')
    assert _mc.recorded[0]['method'] == 'POST'

def test_post_post_deny_consent_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.o_auth_authorization.post_deny_consent('hello world')
    assert '/oauth/consent/hello%20world/deny' in _mc.recorded[0]['url']

