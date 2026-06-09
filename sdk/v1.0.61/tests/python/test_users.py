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


def test_post_create_user_exists(mv_client):
    assert callable(getattr(mv_client.users, 'create_user', None))

def test_post_create_user_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.create_user('test_value', 'user@example.com', 42, 42, 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_create_user_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.create_user('test_value', 'user@example.com', 42, 42, 'test_value', 'test_value')
    assert '/api/v1/users/' in spy_client.last_call()['url']

def test_post_create_user_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.create_user('test_value', 'user@example.com', 42, 42, 'test_value', 'test_value')
    body = spy_client.last_call()['body']
    assert 'name' in body
    assert 'email' in body
    assert 'company_id' in body
    assert 'profile_picture' in body
    assert 'payment_plan_type' in body
    assert 'account_type' in body

def test_post_create_user_and_company_exists(mv_client):
    assert callable(getattr(mv_client.users, 'create_user_and_company', None))

def test_post_create_user_and_company_http_method(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.users.create_user_and_company('test_value', 'user@example.com', 'test_value', 42, 'test_value', 'test_value', 'test_value', 42, 'test_value')
    assert _mc.recorded[0]['method'] == 'POST'

def test_post_create_user_and_company_path(mv_client, monkeypatch):
    _mc = _MockClient()
    monkeypatch.setattr(httpx, 'Client', lambda *a, **kw: _mc)
    mv_client.users.create_user_and_company('test_value', 'user@example.com', 'test_value', 42, 'test_value', 'test_value', 'test_value', 42, 'test_value')
    assert '/api/v1/users/new_company/' in _mc.recorded[0]['url']

def test_post_change_password_exists(mv_client):
    assert callable(getattr(mv_client.users, 'change_password', None))

def test_post_change_password_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.change_password('test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_change_password_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.change_password('test_value', 'test_value')
    assert '/api/v1/user/change_password' in spy_client.last_call()['url']

def test_post_change_password_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.change_password('test_value', 'test_value')
    body = spy_client.last_call()['body']
    assert 'old_password' in body
    assert 'new_password' in body

def test_get_get_user_id_exists(mv_client):
    assert callable(getattr(mv_client.users, 'get_user_id', None))

def test_get_get_user_id_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.get_user_id()
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_user_id_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.get_user_id()
    assert '/api/v1/users' in spy_client.last_call()['url']

def test_get_get_user_exists(mv_client):
    assert callable(getattr(mv_client.users, 'get_user', None))

def test_get_get_user_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.get_user(42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_user_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.get_user(42)
    assert '/api/v1/users/42' in spy_client.last_call()['url']

def test_get_get_all_users_by_company_exists(mv_client):
    assert callable(getattr(mv_client.users, 'get_all_users_by_company', None))

def test_get_get_all_users_by_company_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.get_all_users_by_company(42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_all_users_by_company_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.get_all_users_by_company(42)
    assert '/api/v1/users/company/42' in spy_client.last_call()['url']

def test_put_update_user_exists(mv_client):
    assert callable(getattr(mv_client.users, 'update_user', None))

def test_put_update_user_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.update_user(42, name='test_value', email='user@example.com', password='test_value', companyId=42, accountType=42, profilePicture='test_value', location='test_value', phoneNumber='test_value', birthday='2024-01-01')
    assert spy_client.last_call()['method'] == 'PUT'

def test_put_update_user_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.update_user(42, name='test_value', email='user@example.com', password='test_value', companyId=42, accountType=42, profilePicture='test_value', location='test_value', phoneNumber='test_value', birthday='2024-01-01')
    assert '/api/v1/users/42' in spy_client.last_call()['url']

def test_put_update_user_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.users.update_user(42, name='test_value', email='user@example.com', password='test_value', companyId=42, accountType=42, profilePicture='test_value', location='test_value', phoneNumber='test_value', birthday='2024-01-01')
    body = spy_client.last_call()['body']
    assert 'name' in body
    assert 'email' in body
    assert 'password' in body
    assert 'company_id' in body
    assert 'account_type' in body
    assert 'profile_picture' in body
    assert 'location' in body
    assert 'phone_number' in body
    assert 'birthday' in body

