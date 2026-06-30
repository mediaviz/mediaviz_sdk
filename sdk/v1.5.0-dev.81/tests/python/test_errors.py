from __future__ import annotations
import pytest
from mediaviz_sdk.errors import handle_response, ApiError, ValidationError, NotFoundError, RateLimitError, ServerError

def test_error_validation():
    with pytest.raises(ValidationError):
        handle_response('{"detail": "err"}', 422, {})

def test_error_not_found():
    with pytest.raises(NotFoundError):
        handle_response('{"detail": "err"}', 404, {})

def test_error_rate_limit():
    with pytest.raises(RateLimitError):
        handle_response('{"detail": "err"}', 429, {})

def test_error_server_error():
    with pytest.raises(ServerError):
        handle_response('{"detail": "err"}', 500, {})

def test_error_generic_api():
    with pytest.raises(ApiError):
        handle_response('{"detail": "err"}', 400, {})

