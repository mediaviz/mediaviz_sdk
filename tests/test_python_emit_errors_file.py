"""Tests for Task 7: PythonGenerator.emit_errors_file."""
from __future__ import annotations
import importlib.util
import json
import os
import sys
import types

import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from generators.python import PythonGenerator


# ── helpers ───────────────────────────────────────────────────────────────────


def _load_errors(tmp_path) -> types.ModuleType:
    g = PythonGenerator()
    g.emit_errors_file(str(tmp_path))
    path = os.path.join(str(tmp_path), "errors.py")
    spec = importlib.util.spec_from_file_location("_errors_gen", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


# ── file emission ─────────────────────────────────────────────────────────────


def test_creates_errors_py(tmp_path):
    PythonGenerator().emit_errors_file(str(tmp_path))
    assert (tmp_path / "errors.py").exists()


def test_file_is_syntactically_valid(tmp_path):
    g = PythonGenerator()
    g.emit_errors_file(str(tmp_path))
    src = (tmp_path / "errors.py").read_text()
    compile(src, "errors.py", "exec")  # raises SyntaxError on bad code


def test_all_public_names_present(tmp_path):
    mod = _load_errors(tmp_path)
    for name in ("ApiError", "ValidationError", "NotFoundError", "RateLimitError", "ServerError", "handle_response"):
        assert hasattr(mod, name), f"errors.py missing: {name}"


def test_hierarchy(tmp_path):
    mod = _load_errors(tmp_path)
    assert issubclass(mod.ValidationError, mod.ApiError)
    assert issubclass(mod.NotFoundError, mod.ApiError)
    assert issubclass(mod.RateLimitError, mod.ApiError)
    assert issubclass(mod.ServerError, mod.ApiError)
    assert issubclass(mod.ApiError, Exception)


# ── ApiError ──────────────────────────────────────────────────────────────────


def test_api_error_stores_attributes(tmp_path):
    mod = _load_errors(tmp_path)
    err = mod.ApiError("oops", 400, "req-1", {"detail": "x"})
    assert str(err) == "oops"
    assert err.status == 400
    assert err.request_id == "req-1"
    assert err.body == {"detail": "x"}


def test_api_error_request_id_none(tmp_path):
    mod = _load_errors(tmp_path)
    err = mod.ApiError("msg", 400, None, {})
    assert err.request_id is None


# ── ValidationError ───────────────────────────────────────────────────────────


def test_validation_error_parses_detail_list(tmp_path):
    mod = _load_errors(tmp_path)
    body = {"detail": [{"loc": ["field", "name"], "msg": "too short", "type": "min_length"}]}
    err = mod.ValidationError(body, 422, "rid")
    assert err.status == 422
    assert "field.name: too short" in str(err)
    assert len(err.field_errors) == 1
    assert err.field_errors[0] == {"loc": ["field", "name"], "msg": "too short", "type": "min_length"}


def test_validation_error_string_detail(tmp_path):
    mod = _load_errors(tmp_path)
    body = {"detail": "bad input"}
    err = mod.ValidationError(body, 422, None)
    assert str(err) == "bad input"
    assert err.field_errors == []


def test_validation_error_empty_detail(tmp_path):
    mod = _load_errors(tmp_path)
    err = mod.ValidationError({}, 422, None)
    assert str(err) == "Validation failed"
    assert err.field_errors == []


# ── NotFoundError ─────────────────────────────────────────────────────────────


def test_not_found_uses_detail(tmp_path):
    mod = _load_errors(tmp_path)
    err = mod.NotFoundError({"detail": "Project not found"}, 404, None)
    assert str(err) == "Project not found"
    assert err.status == 404


def test_not_found_fallback_message(tmp_path):
    mod = _load_errors(tmp_path)
    err = mod.NotFoundError({}, 404, None)
    assert str(err) == "Resource not found"


# ── RateLimitError ────────────────────────────────────────────────────────────


def test_rate_limit_stores_retry_after(tmp_path):
    mod = _load_errors(tmp_path)
    err = mod.RateLimitError({"detail": "slow down"}, 429, None, 30)
    assert err.retry_after == 30
    assert str(err) == "slow down"


def test_rate_limit_retry_after_none(tmp_path):
    mod = _load_errors(tmp_path)
    err = mod.RateLimitError({}, 429, None, None)
    assert err.retry_after is None


# ── ServerError ───────────────────────────────────────────────────────────────


def test_server_error_message(tmp_path):
    mod = _load_errors(tmp_path)
    err = mod.ServerError({"detail": "crash"}, 500, None)
    assert str(err) == "crash"
    assert err.status == 500


def test_server_error_fallback(tmp_path):
    mod = _load_errors(tmp_path)
    err = mod.ServerError({}, 503, None)
    assert str(err) == "Internal server error"


# ── handle_response ───────────────────────────────────────────────────────────


def test_handle_response_2xx_returns_parsed_json(tmp_path):
    mod = _load_errors(tmp_path)
    result = mod.handle_response('{"id": 1}', 200, {})
    assert result == {"id": 1}


def test_handle_response_201_returns_body(tmp_path):
    mod = _load_errors(tmp_path)
    result = mod.handle_response('{"created": true}', 201, {})
    assert result["created"] is True


def test_handle_response_422_raises_validation(tmp_path):
    mod = _load_errors(tmp_path)
    body = {"detail": [{"loc": ["x"], "msg": "bad", "type": "t"}]}
    with pytest.raises(mod.ValidationError) as exc:
        mod.handle_response(json.dumps(body), 422, {})
    assert exc.value.status == 422


def test_handle_response_404_raises_not_found(tmp_path):
    mod = _load_errors(tmp_path)
    with pytest.raises(mod.NotFoundError) as exc:
        mod.handle_response('{"detail": "gone"}', 404, {})
    assert exc.value.status == 404


def test_handle_response_429_raises_rate_limit_no_header(tmp_path):
    mod = _load_errors(tmp_path)
    with pytest.raises(mod.RateLimitError) as exc:
        mod.handle_response('{}', 429, {})
    assert exc.value.retry_after is None


def test_handle_response_429_parses_retry_after_header(tmp_path):
    mod = _load_errors(tmp_path)
    with pytest.raises(mod.RateLimitError) as exc:
        mod.handle_response('{}', 429, {"retry-after": "60"})
    assert exc.value.retry_after == 60


def test_handle_response_500_raises_server_error(tmp_path):
    mod = _load_errors(tmp_path)
    with pytest.raises(mod.ServerError) as exc:
        mod.handle_response('{"detail": "boom"}', 500, {})
    assert exc.value.status == 500


def test_handle_response_503_raises_server_error(tmp_path):
    mod = _load_errors(tmp_path)
    with pytest.raises(mod.ServerError):
        mod.handle_response('{}', 503, {})


def test_handle_response_400_raises_api_error(tmp_path):
    mod = _load_errors(tmp_path)
    with pytest.raises(mod.ApiError) as exc:
        mod.handle_response('{"detail": "bad req"}', 400, {})
    assert not isinstance(exc.value, (mod.ValidationError, mod.NotFoundError,
                                       mod.RateLimitError, mod.ServerError))
    assert exc.value.status == 400


def test_handle_response_request_id_from_header(tmp_path):
    mod = _load_errors(tmp_path)
    with pytest.raises(mod.NotFoundError) as exc:
        mod.handle_response('{}', 404, {"x-request-id": "abc-123"})
    assert exc.value.request_id == "abc-123"


def test_handle_response_empty_body(tmp_path):
    mod = _load_errors(tmp_path)
    result = mod.handle_response("", 200, {})
    assert result == {}
