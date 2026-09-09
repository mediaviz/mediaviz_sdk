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


def test_post_token_exists(mv_client):
    assert callable(getattr(mv_client.o_auth_token, 'token', None))

def test_post_token_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.o_auth_token.token('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    assert _mc.recorded[0]['method'] == 'POST'

def test_post_token_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.o_auth_token.token('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value')
    assert '/oauth/token' in _mc.recorded[0]['url']

def test_delete_admin_revoke_user_tokens_exists(mv_client):
    assert callable(getattr(mv_client.o_auth_token, 'admin_revoke_user_tokens', None))

def test_delete_admin_revoke_user_tokens_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.o_auth_token.admin_revoke_user_tokens(42)
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_admin_revoke_user_tokens_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.o_auth_token.admin_revoke_user_tokens(42)
    assert '/oauth/admin/users/42/revoke-tokens' in spy_client.last_call()['url']

def test_post_revoke_exists(mv_client):
    assert callable(getattr(mv_client.o_auth_token, 'revoke', None))

def test_post_revoke_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.o_auth_token.revoke('test_value', 'test_value', 'test_value')
    assert _mc.recorded[0]['method'] == 'POST'

def test_post_revoke_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.o_auth_token.revoke('test_value', 'test_value', 'test_value')
    assert '/oauth/revoke' in _mc.recorded[0]['url']

