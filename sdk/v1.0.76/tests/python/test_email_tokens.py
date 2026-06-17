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


def test_post_request_email_verification_exists(mv_client):
    assert callable(getattr(mv_client.email_tokens, 'request_email_verification', None))

def test_post_request_email_verification_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.email_tokens.request_email_verification('user@example.com')
    assert _mc.recorded[0]['method'] == 'POST'

def test_post_request_email_verification_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.email_tokens.request_email_verification('user@example.com')
    assert '/api/v1/request-email-verification' in _mc.recorded[0]['url']

def test_post_verify_email_exists(mv_client):
    assert callable(getattr(mv_client.email_tokens, 'verify_email', None))

def test_post_verify_email_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.email_tokens.verify_email('test_value')
    assert _mc.recorded[0]['method'] == 'POST'

def test_post_verify_email_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.email_tokens.verify_email('hello world')
    assert '/api/v1/verify-email/hello%20world' in _mc.recorded[0]['url']

def test_post_request_password_reset_exists(mv_client):
    assert callable(getattr(mv_client.email_tokens, 'request_password_reset', None))

def test_post_request_password_reset_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.email_tokens.request_password_reset('user@example.com')
    assert _mc.recorded[0]['method'] == 'POST'

def test_post_request_password_reset_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.email_tokens.request_password_reset('user@example.com')
    assert '/api/v1/request-password-reset' in _mc.recorded[0]['url']

def test_post_validate_token_exists(mv_client):
    assert callable(getattr(mv_client.email_tokens, 'validate_token', None))

def test_post_validate_token_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.email_tokens.validate_token('test_value')
    assert _mc.recorded[0]['method'] == 'POST'

def test_post_validate_token_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.email_tokens.validate_token('test_value')
    assert '/api/v1/validate-token' in _mc.recorded[0]['url']

def test_post_reset_password_exists(mv_client):
    assert callable(getattr(mv_client.email_tokens, 'reset_password', None))

def test_post_reset_password_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.email_tokens.reset_password('test_value', 'test_value')
    assert _mc.recorded[0]['method'] == 'POST'

def test_post_reset_password_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.email_tokens.reset_password('test_value', 'test_value')
    assert '/api/v1/reset-password' in _mc.recorded[0]['url']

def test_delete_delete_user_email_tokens_exists(mv_client):
    assert callable(getattr(mv_client.email_tokens, 'delete_user_email_tokens', None))

def test_delete_delete_user_email_tokens_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.email_tokens.delete_user_email_tokens(42)
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_delete_user_email_tokens_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.email_tokens.delete_user_email_tokens(42)
    assert '/api/v1/admin/email_tokens/by_user/42' in spy_client.last_call()['url']

