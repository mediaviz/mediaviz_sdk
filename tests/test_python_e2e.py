"""Task 38: run generate.main() with --frameworks python, verify PythonTestGenerator.run passes."""
from __future__ import annotations

import os
import sys
import textwrap

import pytest

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, REPO_ROOT)

import generate  # noqa: E402


def _write_python_oauth_stub(oauth_dir) -> None:
    """Minimal oauth_sdk stub satisfying SDK generation and generated test execution."""
    (oauth_dir / "_types.py").write_text(textwrap.dedent("""\
        from __future__ import annotations
        from dataclasses import dataclass, field
        try:
            from enum import StrEnum
        except ImportError:
            from enum import Enum
            class StrEnum(str, Enum): pass

        @dataclass(frozen=True)
        class OAuthClientConfig:
            base_url: str = ""
            client_id: str = ""
            client_secret: str = ""
            redirect_uri: str = ""

        @dataclass(frozen=True)
        class TokenResponse:
            access_token: str = ""
            token_type: str = "bearer"
            expires_in: int = 3600
            refresh_token: "str | None" = None

        @dataclass(frozen=True)
        class AuthorizationUrlResult:
            url: str = ""
            state: str = ""
            code_verifier: str = ""

        @dataclass(frozen=True)
        class AuthenticatedResponse:
            data: dict
            updated_tokens: "TokenResponse | None"

        @dataclass(frozen=True)
        class TokenPayload:
            user_id: str = ""
            client_id: str = ""
            jti: str = ""
            iat: int = 0
            exp: int = 0
            token_use: "str | None" = None
            company_id: "int | None" = None

        @dataclass(frozen=True)
        class ClientRegistrationRequest:
            base_url: str = ""
            client_name: str = ""
            client_type: str = ""
            redirect_uris: list = field(default_factory=list)
            is_first_party: bool = True

        @dataclass(frozen=True)
        class ClientRegistrationResponse:
            client_id: str = ""
            client_name: str = ""
            client_type: str = ""
            redirect_uris: list = field(default_factory=list)
            client_secret: "str | None" = None

        class OAuthErrorCode(StrEnum):
            INVALID_REQUEST = "invalid_request"
            SERVER_ERROR = "server_error"
    """))

    (oauth_dir / "_errors.py").write_text(textwrap.dedent("""\
        class OAuthError(Exception):
            def __init__(self, code="server_error", description="", http_status=500):
                super().__init__(description)
                self.code = code
                self.http_status = http_status

            @classmethod
            def from_response(cls, status, body):
                return cls(
                    code=body.get("error", "server_error"),
                    description=body.get("error_description", ""),
                    http_status=status,
                )
    """))

    (oauth_dir / "_client.py").write_text(textwrap.dedent("""\
        from __future__ import annotations
        from ._types import (
            OAuthClientConfig, AuthenticatedResponse, AuthorizationUrlResult, TokenResponse
        )

        class OAuthClient:
            def __init__(self, config: "OAuthClientConfig | None" = None) -> None:
                self._config = config or OAuthClientConfig()

            def request(self, url, method, access_token, refresh_token, body=None):
                return AuthenticatedResponse(data={}, updated_tokens=None)

            def generate_authorization_url(self, state=None):
                return AuthorizationUrlResult()

            def exchange_code(self, code, code_verifier, redirect_uri=None):
                return TokenResponse()

            def get_client_credentials_token(self):
                return TokenResponse(access_token="stub_token")
    """))

    (oauth_dir / "__init__.py").write_text(textwrap.dedent("""\
        from ._client import OAuthClient
        from ._errors import OAuthError
        from ._types import (
            AuthenticatedResponse,
            AuthorizationUrlResult,
            ClientRegistrationRequest,
            ClientRegistrationResponse,
            OAuthClientConfig,
            OAuthErrorCode,
            TokenPayload,
            TokenResponse,
        )

        __all__ = [
            "OAuthClient",
            "OAuthError",
            "AuthenticatedResponse",
            "AuthorizationUrlResult",
            "ClientRegistrationRequest",
            "ClientRegistrationResponse",
            "OAuthClientConfig",
            "OAuthErrorCode",
            "TokenPayload",
            "TokenResponse",
        ]
    """))


@pytest.fixture
def python_e2e(fake_sources, monkeypatch, capsys):
    """Run generate.main() for --frameworks python; yield the vX.Y.Z dir."""
    py_oauth_dir = fake_sources.oauth / "sdk" / "python" / "oauth_sdk"
    py_oauth_dir.mkdir(parents=True, exist_ok=True)
    _write_python_oauth_stub(py_oauth_dir)

    flow_name = "test_py_e2e"
    (fake_sources.flows / f"{flow_name}.yaml").write_text(textwrap.dedent("""\
        refs:
          - ref: "controllers/projects.yaml#list_projects"
          - ref: "controllers/auth.yaml#register"
    """))
    (fake_sources.controllers / "projects.yaml").write_text(textwrap.dedent("""\
        controller: Projects
        base_path: /api/v1
        endpoints:
          - id: list_projects
            method: GET
            path: /api/v1/projects
            auth: required
            params:
              - name: page
                in: query
                type: integer
                required: false
    """))
    (fake_sources.controllers / "auth.yaml").write_text(textwrap.dedent("""\
        controller: Auth
        base_path: /api/v1
        endpoints:
          - id: register
            method: POST
            path: /api/v1/auth/register
            auth: none
            params: []
            request_body:
              email: {type: string, required: true}
            content_type: application/json
    """))

    output_dir = fake_sources.hub.parent / "py_e2e_out"
    monkeypatch.setattr(sys, "argv", [
        "generate.py",
        "--endpoints", flow_name,
        "--frameworks", "python",
        "--destination-dir", str(output_dir),
    ])
    generate.main()
    capsys.readouterr()
    return str(output_dir / "v1.0.0")


# ── SDK structure ─────────────────────────────────────────────────────────────


def test_python_dir_created(python_e2e):
    assert os.path.isdir(os.path.join(python_e2e, "python"))


def test_required_sdk_files_present(python_e2e):
    python_dir = os.path.join(python_e2e, "python")
    for rel in (
        "mediaviz_sdk/__init__.py",
        "mediaviz_sdk/client.py",
        "mediaviz_sdk/errors.py",
        "mediaviz_sdk/projects.py",
        "mediaviz_sdk/auth.py",
        "oauth_sdk/__init__.py",
        "pyproject.toml",
    ):
        assert os.path.isfile(os.path.join(python_dir, rel)), f"missing: {rel}"


def test_controller_files_are_snake_case(python_e2e):
    pkg_dir = os.path.join(python_e2e, "python", "mediaviz_sdk")
    controller_files = [
        f for f in os.listdir(pkg_dir)
        if f.endswith(".py") and f not in ("__init__.py", "client.py", "errors.py")
    ]
    assert controller_files, "no controller files generated"
    for fname in controller_files:
        assert fname == fname.lower(), f"PascalCase controller file: {fname}"


def test_no_requests_import_in_generated_sdk(python_e2e):
    for dirpath, _, files in os.walk(os.path.join(python_e2e, "python", "mediaviz_sdk")):
        for fname in files:
            if fname.endswith(".py"):
                src = open(os.path.join(dirpath, fname)).read()
                assert "import requests" not in src, f"requests found in {fname}"


def test_init_re_exports_mediaviz_client(python_e2e):
    init = open(os.path.join(python_e2e, "python", "mediaviz_sdk", "__init__.py")).read()
    assert "MediaVizClient" in init
    assert "OAuthClient" in init


# ── test suite structure ──────────────────────────────────────────────────────


def test_test_suite_dir_created(python_e2e):
    test_dir = os.path.join(python_e2e, "tests", "python")
    assert os.path.isdir(test_dir)


def test_test_suite_files_present(python_e2e):
    test_dir = os.path.join(python_e2e, "tests", "python")
    for fname in ("test_helpers.py", "conftest.py", "pyproject.toml",
                  "test_errors.py", "test_projects.py", "test_auth.py"):
        assert os.path.isfile(os.path.join(test_dir, fname)), f"missing: {fname}"


# ── PythonTestGenerator.run verification (core of task 38) ───────────────────


def test_test_generator_run_returns_success(python_e2e):
    """PythonTestGenerator.run() must report success=True on the generated suite."""
    from test_generators.python import PythonTestGenerator
    test_dir = os.path.join(python_e2e, "tests", "python")
    result = PythonTestGenerator().run(test_dir)
    assert result.success, (
        f"Generated test suite had failures: {result.failed}/{result.total} failed\n"
        f"{result.output[-3000:]}"
    )
    assert result.passed > 0, "no tests ran in the generated suite"
    assert result.failed == 0
