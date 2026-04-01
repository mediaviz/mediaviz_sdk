// Auto-generated — do not edit

export class ApiError extends Error {
  constructor(message, status, requestId, body) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.requestId = requestId;
    this.body = body;
  }
}

export class ValidationError extends ApiError {
  constructor(body, status, requestId) {
    const detail = body.detail ?? [];
    const message = Array.isArray(detail)
      ? detail.map(d => `${d.loc.join('.')}: ${d.msg}`).join('; ')
      : String(detail);
    super(message, status, requestId, body);
    this.name = 'ValidationError';
    this.fieldErrors = Array.isArray(detail)
      ? detail.map(d => ({ loc: d.loc, msg: d.msg, type: d.type }))
      : [];
  }
}

export class NotFoundError extends ApiError {
  constructor(body, status, requestId) {
    super(body.detail ?? 'Resource not found', status, requestId, body);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends ApiError {
  constructor(body, status, requestId, headers) {
    super(body.detail ?? 'Rate limited', status, requestId, body);
    this.name = 'RateLimitError';
    this.retryAfter = parseInt(headers.get('retry-after') ?? '', 10) || null;
  }
}

export class ServerError extends ApiError {
  constructor(body, status, requestId) {
    super(body.detail ?? 'Internal server error', status, requestId, body);
    this.name = 'ServerError';
  }
}

export async function handleResponse(response) {
  const requestId = response.headers.get('x-request-id');

  if (response.ok) {
    return response.json();
  }

  let body;
  try {
    body = await response.json();
  } catch {
    body = { detail: response.statusText };
  }

  switch (response.status) {
    case 422:
      throw new ValidationError(body, response.status, requestId);
    case 404:
      throw new NotFoundError(body, response.status, requestId);
    case 429:
      throw new RateLimitError(body, response.status, requestId, response.headers);
    default:
      if (response.status >= 500) {
        throw new ServerError(body, response.status, requestId);
      }
      throw new ApiError(
        body.detail ?? 'Unknown error',
        response.status,
        requestId,
        body
      );
  }
}
