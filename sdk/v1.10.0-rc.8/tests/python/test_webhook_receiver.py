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


def test_get_list_subscription_events_exists(mv_client):
    assert callable(getattr(mv_client.webhook_receiver, 'list_subscription_events', None))

def test_get_list_subscription_events_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.webhook_receiver.list_subscription_events('00000000-0000-0000-0000-000000000000', 'test_value', 42, 'test_value', True)
    assert _mc.recorded[0]['method'] == 'GET'

def test_get_list_subscription_events_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.webhook_receiver.list_subscription_events('00000000-0000-0000-0000-000000000000', 'test_value', 42, 'test_value', True)
    assert '/api/v1/subscriptions/00000000-0000-0000-0000-000000000000/events' in _mc.recorded[0]['url']

