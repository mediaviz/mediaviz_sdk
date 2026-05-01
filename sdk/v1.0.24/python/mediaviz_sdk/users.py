from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class Users:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def create_user(
        self,
        name: str,
        email: str,
        accountType: int,
        companyId: int | None = None,
        profilePicture: str | None = None,
        paymentPlanType: str | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/users/'
        body = {k: v for k, v in {
            'name': name,
            'email': email,
            'company_id': companyId,
            'profile_picture': profilePicture,
            'payment_plan_type': paymentPlanType,
            'account_type': accountType,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token, body).data

    def create_mediaviz_internal_admin(
        self,
        name: str,
        email: str,
        accountType: int,
        password: str,
        companyId: int | None = None,
        profilePicture: str | None = None,
        paymentPlanType: str | None = None,
    ) -> dict[str, Any]:
        path = '/api/v1/users/new_internal_admin'
        body = {k: v for k, v in {
            'name': name,
            'email': email,
            'company_id': companyId,
            'profile_picture': profilePicture,
            'payment_plan_type': paymentPlanType,
            'account_type': accountType,
            'password': password,
        }.items() if v is not None}
        with httpx.Client() as _client:
            _resp = _client.request('POST', self._ctx.base_url + path, json=body)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def create_user_and_company(
        self,
        name: str,
        email: str,
        password: str,
        companyId: int | None = None,
        profilePicture: str | None = None,
        paymentPlanType: str | None = None,
        companyName: str | None = None,
        credits: int | None = None,
    ) -> dict[str, Any]:
        path = '/api/v1/users/new_company'
        body = {k: v for k, v in {
            'name': name,
            'email': email,
            'company_id': companyId,
            'profile_picture': profilePicture,
            'payment_plan_type': paymentPlanType,
            'password': password,
            'company_name': companyName,
            'credits': credits,
        }.items() if v is not None}
        with httpx.Client() as _client:
            _resp = _client.request('POST', self._ctx.base_url + path, json=body)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def change_password(self, oldPassword: str, newPassword: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/user/change_password'
        body = {k: v for k, v in {
            'old_password': oldPassword,
            'new_password': newPassword,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token, body).data

    def get_user_id(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/users'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_user(self, user_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/users/' + quote(str(user_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_all_users_by_company(self, company_id: int) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/users/company/' + quote(str(company_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_all_users(
        self,
        asc_or_desc: str,
        last_id: Any | None = None,
        limit: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/users/admin/sort/' + quote(str(asc_or_desc), safe='') + '/'
        _q: dict[str, Any] = {}
        if last_id is not None:
            _q['last_id'] = last_id
        if limit is not None:
            _q['limit'] = limit
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def update_user(
        self,
        user_id: int,
        *,
        name: str | None = None,
        email: str | None = None,
        password: str | None = None,
        companyId: int | None = None,
        accountType: int | None = None,
        profilePicture: str | None = None,
        location: str | None = None,
        phoneNumber: str | None = None,
        birthday: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/users/' + quote(str(user_id), safe='')
        body = {k: v for k, v in {
            'name': name,
            'email': email,
            'password': password,
            'company_id': companyId,
            'account_type': accountType,
            'profile_picture': profilePicture,
            'location': location,
            'phone_number': phoneNumber,
            'birthday': birthday,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token, body).data

    def update_user_by_admin(
        self,
        user_id: int,
        *,
        name: str | None = None,
        email: str | None = None,
        password: str | None = None,
        companyId: int | None = None,
        accountType: int | None = None,
        profilePicture: str | None = None,
        location: str | None = None,
        phoneNumber: str | None = None,
        birthday: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/users/admin/' + quote(str(user_id), safe='')
        body = {k: v for k, v in {
            'name': name,
            'email': email,
            'password': password,
            'company_id': companyId,
            'account_type': accountType,
            'profile_picture': profilePicture,
            'location': location,
            'phone_number': phoneNumber,
            'birthday': birthday,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token, body).data

    def delete_user(self, user_id: int, new_company_owner_id: int | None = None) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/users/delete/' + quote(str(user_id), safe='')
        _q: dict[str, Any] = {}
        if new_company_owner_id is not None:
            _q['new_company_owner_id'] = new_company_owner_id
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data
