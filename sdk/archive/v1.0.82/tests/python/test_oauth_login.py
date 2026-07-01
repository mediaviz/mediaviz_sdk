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


def test_get_get_login_exists(mv_client):
    assert callable(getattr(mv_client.oauth_login, 'get_login', None))

def test_get_get_login_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.oauth_login.get_login('test_value')
    assert _mc.recorded[0]['method'] == 'GET'

def test_get_get_login_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.oauth_login.get_login('test_value')
    assert '/api/v1/oauth/login' in _mc.recorded[0]['url']

def test_post_post_login_exists(mv_client):
    assert callable(getattr(mv_client.oauth_login, 'post_login', None))

def test_post_post_login_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.oauth_login.post_login('test_value', 'test_value', 'test_value')
    assert _mc.recorded[0]['method'] == 'POST'

def test_post_post_login_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.oauth_login.post_login('test_value', 'test_value', 'test_value')
    assert '/api/v1/oauth/login' in _mc.recorded[0]['url']

