from __future__ import annotations
import sys
sys.path.insert(0, '/home/runner/work/mediaviz_sdk/mediaviz_sdk/mediaviz_sdk/sdk/v1.0.72/python')

from oauth_sdk import OAuthClient


class _FakeResponse:
    data: dict = {}
    updated_tokens = None


class SpyOAuthClient(OAuthClient):
    def __init__(self) -> None:
        self.calls: list[dict] = []

    def request(self, url: str, method: str, access_token: str, refresh_token: str, body=None, on_refresh_success=None) -> _FakeResponse:
        self.calls.append({'url': url, 'method': method, 'access_token': access_token, 'refresh_token': refresh_token, 'body': body})
        return _FakeResponse()

    def last_call(self) -> dict | None:
        return self.calls[-1] if self.calls else None

    def reset(self) -> None:
        self.calls.clear()
