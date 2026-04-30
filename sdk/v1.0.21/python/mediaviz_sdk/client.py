from __future__ import annotations
import os
from typing import Any

from oauth_sdk import OAuthClient, OAuthClientConfig
from .admin import Admin
from .ai_model_credits import AiModelCredits
from .company import Company
from .curated_albums import CuratedAlbums
from .custom_albums import CustomAlbums
from .email_tokens import EmailTokens
from .health import Health
from .keywords import Keywords
from .o_auth_authorization import OAuthAuthorization
from .o_auth_clients import OAuthClients
from .o_auth_token import OAuthToken
from .oauth_login import OauthLogin
from .person import Person
from .photo_upload import PhotoUpload
from .photos import Photos
from .projects import Projects
from .search import Search
from .users import Users


class _Context:
    def __init__(self, mv: "MediaVizClient") -> None:
        self._mv = mv
        self.client = mv._tracking_client

    @property
    def access_token(self) -> str | None: return self._mv._access_token
    @property
    def refresh_token(self) -> str | None: return self._mv._refresh_token
    @property
    def base_url(self) -> str: return self._mv._config['base_url']

    def require_host(self, key: str) -> str:
        url = self._mv._hosts.get(key)
        if url is None:
            raise RuntimeError(f"Host '{key}' not configured.")
        return url

    def require_tokens(self) -> None:
        if self._mv._access_token is None:
            raise RuntimeError(
                'Not authenticated. Call authenticate(), handle_callback(), or set_tokens() first.'
            )


class _TokenTrackingClient:
    def __init__(self, mv: "MediaVizClient", inner: Any) -> None:
        self._mv = mv
        self._inner = inner

    def request(self, url: str, method: str, access_token: str, refresh_token: str, body: Any = None) -> Any:
        result = self._inner.request(url, method, access_token, refresh_token, body)
        if result.updated_tokens is not None:
            self._mv.set_tokens(result.updated_tokens.access_token, result.updated_tokens.refresh_token)
            if self._mv._on_token_refresh:
                self._mv._on_token_refresh(result.updated_tokens)
        return result

    def __getattr__(self, name: str) -> Any:
        return getattr(self._inner, name)


class MediaVizClient:
    def __init__(
        self,
        *,
        client_id: str | None = None,
        client_secret: str | None = None,
        base_url: str | None = None,
        redirect_uri: str | None = None,
        hosts: dict[str, str] | None = None,
        access_token: str | None = None,
        refresh_token: str | None = None,
        on_token_refresh=None,
    ) -> None:
        self._config = {
            'client_id': client_id or os.environ.get('MEDIAVIZ_CLIENT_ID'),
            'client_secret': client_secret or os.environ.get('MEDIAVIZ_CLIENT_SECRET'),
            'base_url': base_url or os.environ.get('MEDIAVIZ_BASE_URL') or 'https://api.mediaviz.com',
            'redirect_uri': redirect_uri or os.environ.get('MEDIAVIZ_REDIRECT_URI'),
        }
        _h = hosts or {}
        self._hosts: dict[str, str | None] = {
            'photoUpload': _h.get('photoUpload') or os.environ.get('MEDIAVIZ_PHOTO_UPLOAD_URL'),
        }
        self._hosts.update(_h)
        self._access_token: str | None = access_token
        self._refresh_token: str | None = refresh_token
        self._on_token_refresh = on_token_refresh

        _inner = OAuthClient(OAuthClientConfig(
            base_url=self._config['base_url'],
            client_id=self._config['client_id'] or '',
            client_secret=self._config['client_secret'] or '',
            redirect_uri=self._config['redirect_uri'] or '',
        ))
        self._tracking_client = _TokenTrackingClient(self, _inner)

        _ctx = _Context(self)
        self.admin = Admin(_ctx)
        self.ai_model_credits = AiModelCredits(_ctx)
        self.company = Company(_ctx)
        self.curated_albums = CuratedAlbums(_ctx)
        self.custom_albums = CustomAlbums(_ctx)
        self.email_tokens = EmailTokens(_ctx)
        self.health = Health(_ctx)
        self.keywords = Keywords(_ctx)
        self.o_auth_authorization = OAuthAuthorization(_ctx)
        self.o_auth_clients = OAuthClients(_ctx)
        self.o_auth_token = OAuthToken(_ctx)
        self.oauth_login = OauthLogin(_ctx)
        self.person = Person(_ctx)
        self.photo_upload = PhotoUpload(_ctx)
        self.photos = Photos(_ctx)
        self.projects = Projects(_ctx)
        self.search = Search(_ctx)
        self.users = Users(_ctx)

    def authenticate(self) -> Any:
        tokens = self._tracking_client._inner.get_client_credentials_token()
        self._access_token = tokens.access_token
        self._refresh_token = getattr(tokens, 'refresh_token', None)
        return tokens

    def get_authorization_url(self, state: str | None = None) -> Any:
        return self._tracking_client._inner.generate_authorization_url(state)

    def handle_callback(self, code: str, code_verifier: str) -> Any:
        tokens = self._tracking_client._inner.exchange_code(code, code_verifier)
        self._access_token = tokens.access_token
        self._refresh_token = tokens.refresh_token
        return tokens

    def set_tokens(self, access_token: str, refresh_token: str) -> None:
        self._access_token = access_token
        self._refresh_token = refresh_token
