from dataclasses import dataclass

try:
    from enum import StrEnum
except ImportError:
    from enum import Enum

    class StrEnum(str, Enum):  # type: ignore[no-redef]
        pass


@dataclass(frozen=True)
class OAuthClientConfig:
    base_url: str
    client_id: str
    client_secret: str
    redirect_uri: str


@dataclass(frozen=True)
class TokenResponse:
    access_token: str
    token_type: str
    expires_in: int
    refresh_token: "str | None" = None


@dataclass(frozen=True)
class TokenPayload:
    user_id: str
    client_id: str
    jti: str
    iat: int
    exp: int
    token_use: "str | None" = None
    company_id: "int | None" = None


@dataclass(frozen=True)
class AuthorizationUrlResult:
    url: str
    state: str
    code_verifier: str


@dataclass(frozen=True)
class AuthenticatedResponse:
    data: dict
    updated_tokens: "TokenResponse | None"


@dataclass(frozen=True)
class ClientRegistrationRequest:
    base_url: str
    client_name: str
    client_type: str
    redirect_uris: list[str]
    is_first_party: bool


@dataclass(frozen=True)
class ClientRegistrationResponse:
    client_id: str
    client_name: str
    client_type: str
    redirect_uris: list[str]
    client_secret: "str | None" = None


class OAuthErrorCode(StrEnum):
    INVALID_REQUEST = "invalid_request"
    INVALID_CLIENT = "invalid_client"
    INVALID_GRANT = "invalid_grant"
    UNAUTHORIZED_CLIENT = "unauthorized_client"
    UNSUPPORTED_GRANT_TYPE = "unsupported_grant_type"
    ACCESS_DENIED = "access_denied"
    SERVER_ERROR = "server_error"
