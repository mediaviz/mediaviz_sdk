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


def test_get_health_check_exists(mv_client):
    assert callable(getattr(mv_client.health, 'health_check', None))

def test_get_health_check_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.health.health_check()
    assert _mc.recorded[0]['method'] == 'GET'

def test_get_health_check_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.health.health_check()
    assert '/api/v1/health/' in _mc.recorded[0]['url']

def test_get_liveness_check_exists(mv_client):
    assert callable(getattr(mv_client.health, 'liveness_check', None))

def test_get_liveness_check_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.health.liveness_check()
    assert _mc.recorded[0]['method'] == 'GET'

def test_get_liveness_check_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.health.liveness_check()
    assert '/api/v1/health/live/' in _mc.recorded[0]['url']

def test_get_readiness_check_exists(mv_client):
    assert callable(getattr(mv_client.health, 'readiness_check', None))

def test_get_readiness_check_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.health.readiness_check()
    assert _mc.recorded[0]['method'] == 'GET'

def test_get_readiness_check_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.health.readiness_check()
    assert '/api/v1/health/ready' in _mc.recorded[0]['url']

