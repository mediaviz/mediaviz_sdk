from __future__ import annotations
import json
from typing import Any


class ApiError(Exception):
    def __init__(self, message: str, status: int, request_id: str | None, body: Any) -> None:
        super().__init__(message)
        self.status = status
        self.request_id = request_id
        self.body = body


class ValidationError(ApiError):
    field_errors: list[dict]

    def __init__(self, body: Any, status: int, request_id: str | None) -> None:
        detail = body.get("detail", []) if isinstance(body, dict) else []
        if isinstance(detail, list) and detail:
            message = "; ".join(
                ".".join(str(loc) for loc in d.get("loc", [])) + ": " + d.get("msg", "")
                for d in detail
            )
            self.field_errors = [
                {"loc": d.get("loc", []), "msg": d.get("msg", ""), "type": d.get("type", "")}
                for d in detail
            ]
        else:
            message = detail if isinstance(detail, str) else "Validation failed"
            self.field_errors = []
        super().__init__(message, status, request_id, body)


class NotFoundError(ApiError):
    def __init__(self, body: Any, status: int, request_id: str | None) -> None:
        detail = body.get("detail", "Resource not found") if isinstance(body, dict) else "Resource not found"
        super().__init__(detail, status, request_id, body)


class RateLimitError(ApiError):
    retry_after: int | None

    def __init__(self, body: Any, status: int, request_id: str | None, retry_after: int | None) -> None:
        detail = body.get("detail", "Rate limited") if isinstance(body, dict) else "Rate limited"
        self.retry_after = retry_after
        super().__init__(detail, status, request_id, body)


class ServerError(ApiError):
    def __init__(self, body: Any, status: int, request_id: str | None) -> None:
        detail = body.get("detail", "Internal server error") if isinstance(body, dict) else "Internal server error"
        super().__init__(detail, status, request_id, body)


def handle_response(raw: str, status: int, headers: dict[str, str]) -> Any:
    request_id = headers.get("x-request-id")
    body: Any = json.loads(raw) if raw else {}
    if 200 <= status < 300:
        return body
    if status == 422:
        raise ValidationError(body, status, request_id)
    if status == 404:
        raise NotFoundError(body, status, request_id)
    if status == 429:
        retry_after = int(headers["retry-after"]) if "retry-after" in headers else None
        raise RateLimitError(body, status, request_id, retry_after)
    if status >= 500:
        raise ServerError(body, status, request_id)
    detail = body.get("detail", "Unknown error") if isinstance(body, dict) else "Unknown error"
    raise ApiError(detail, status, request_id, body)
