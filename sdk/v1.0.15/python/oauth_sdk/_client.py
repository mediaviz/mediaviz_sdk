from __future__ import annotations

import base64
import json
import threading
from concurrent.futures import Future
from urllib.parse import urlencode

import httpx

from ._errors import OAuthError
from ._http import post_form, post_json
from ._pkce import generate_code_challenge, generate_code_verifier, generate_state
from ._types import (
    AuthenticatedResponse,
    AuthorizationUrlResult,
    ClientRegistrationRequest,
    ClientRegistrationResponse,
    OAuthClientConfig,
    TokenPayload,
    TokenResponse,
)


class OAuthClient:
    def __init__(self, config: OAuthClientConfig):
        self._config = config
        self._http_client = httpx.Client()
        self._inflight_lock = threading.Lock()
        self._inflight_refreshes: dict[str, Future[TokenResponse]] = {}

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self._http_client.close()

    @classmethod
    def register_client(cls, params: ClientRegistrationRequest) -> ClientRegistrationResponse:
        base_url = params.base_url.rstrip("/")
        with httpx.Client() as client:
            data = post_json(
                f"{base_url}/oauth/clients",
                {
                    "client_name": params.client_name,
                    "client_type": params.client_type,
                    "redirect_uris": params.redirect_uris,
                    "is_first_party": params.is_first_party,
                },
                client,
            )
        return ClientRegistrationResponse(
            client_id=data["client_id"],
            client_name=data["client_name"],
            client_type=data["client_type"],
            redirect_uris=data["redirect_uris"],
            client_secret=data.get("client_secret"),
        )

    def generate_authorization_url(self, state: str | None = None) -> AuthorizationUrlResult:
        verifier = generate_code_verifier()
        challenge = generate_code_challenge(verifier)
        if state is None:
            state = generate_state()
        params = urlencode({
            "response_type": "code",
            "client_id": self._config.client_id,
            "redirect_uri": self._config.redirect_uri,
            "state": state,
            "code_challenge": challenge,
            "code_challenge_method": "S256",
        })
        url = f"{self._config.base_url}/oauth/authorize?{params}"
        return AuthorizationUrlResult(url=url, state=state, code_verifier=verifier)

    def exchange_code(
        self,
        code: str,
        code_verifier: str,
        redirect_uri: str | None = None,
    ) -> TokenResponse:
        body = post_form(
            f"{self._config.base_url}/oauth/token",
            {
                "grant_type": "authorization_code",
                "code": code,
                "code_verifier": code_verifier,
                "client_id": self._config.client_id,
                "client_secret": self._config.client_secret,
                "redirect_uri": redirect_uri or self._config.redirect_uri,
            },
            self._http_client,
        )
        return TokenResponse(**body)

    def get_client_credentials_token(self) -> TokenResponse:
        """RFC 6749 §4.4 — machine-to-machine token exchange.

        Uses the client_id / client_secret from this client's config to
        obtain an access token directly, no user login required. The
        returned TokenResponse has no refresh_token.
        """
        body = post_form(
            f"{self._config.base_url}/oauth/token",
            {
                "grant_type": "client_credentials",
                "client_id": self._config.client_id,
                "client_secret": self._config.client_secret,
            },
            self._http_client,
        )
        return TokenResponse(**body)

    def refresh_access_token(self, refresh_token: str) -> TokenResponse:
        body = post_form(
            f"{self._config.base_url}/oauth/token",
            {
                "grant_type": "refresh_token",
                "refresh_token": refresh_token,
                "client_id": self._config.client_id,
                "client_secret": self._config.client_secret,
            },
            self._http_client,
        )
        return TokenResponse(**body)

    def revoke_token(self, token: str, token_type_hint: str | None = None) -> None:
        params: dict[str, str] = {
            "token": token,
            "client_id": self._config.client_id,
            "client_secret": self._config.client_secret,
        }
        if token_type_hint:
            params["token_type_hint"] = token_type_hint
        response = self._http_client.post(
            f"{self._config.base_url}/oauth/revoke",
            data=params,
        )
        if not response.is_success:
            raise OAuthError.from_response(response.status_code, response.json())

    def request(
        self,
        url: str,
        method: str,
        access_token: str,
        refresh_token: str,
        body: dict | None = None,
    ) -> AuthenticatedResponse:
        headers: dict[str, str] = {"Authorization": f"Bearer {access_token}"}
        if body is not None:
            headers["Content-Type"] = "application/json"

        response = self._http_client.request(method, f"{self._config.base_url}{url}", headers=headers, json=body)

        if response.status_code != 401:
            if not response.is_success:
                raise OAuthError.from_response(response.status_code, response.json())
            return AuthenticatedResponse(data=response.json(), updated_tokens=None)

        # 401 — attempt refresh; propagate OAuthError on failure.
        # Concurrent request() callers with the same refresh_token share one in-flight
        # call so the server only sees one rotation (the second would get invalid_grant).
        with self._inflight_lock:
            fut = self._inflight_refreshes.get(refresh_token)
            owner = fut is None
            if owner:
                fut = Future()
                self._inflight_refreshes[refresh_token] = fut

        if owner:
            try:
                fut.set_result(self.refresh_access_token(refresh_token))
            except BaseException as e:
                fut.set_exception(e)
            finally:
                with self._inflight_lock:
                    self._inflight_refreshes.pop(refresh_token, None)

        new_tokens = fut.result()

        headers["Authorization"] = f"Bearer {new_tokens.access_token}"
        retry = self._http_client.request(method, f"{self._config.base_url}{url}", headers=headers, json=body)

        if not retry.is_success:
            raise OAuthError.from_response(retry.status_code, retry.json())

        return AuthenticatedResponse(data=retry.json(), updated_tokens=new_tokens)

    def decode_access_token(self, access_token: str) -> TokenPayload:
        segment = access_token.split(".")[1]
        # Restore base64 padding
        segment += "=" * (-len(segment) % 4)
        payload = json.loads(base64.urlsafe_b64decode(segment))
        return TokenPayload(
            user_id=payload["user_id"],
            client_id=payload["client_id"],
            jti=payload["jti"],
            iat=payload["iat"],
            exp=payload["exp"],
            token_use=payload.get("token_use"),
            company_id=payload.get("company_id"),
        )
