from __future__ import annotations

import httpx

from ._errors import OAuthError


def post_form(
    url: str,
    params: dict[str, str],
    client: httpx.Client,
    headers: dict[str, str] | None = None,
) -> dict:
    response = client.post(url, data=params, headers=headers or {})
    body = response.json()
    if not response.is_success:
        raise OAuthError.from_response(response.status_code, body)
    return body


def post_json(
    url: str,
    body: dict,
    client: httpx.Client,
    headers: dict[str, str] | None = None,
) -> dict:
    response = client.post(url, json=body, headers=headers or {})
    data = response.json()
    if not response.is_success:
        raise OAuthError.from_response(response.status_code, data)
    return data


def get_json(
    url: str,
    client: httpx.Client,
    headers: dict[str, str] | None = None,
) -> dict:
    response = client.get(url, headers=headers or {})
    body = response.json()
    if not response.is_success:
        raise OAuthError.from_response(response.status_code, body)
    return body
