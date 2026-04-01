# SDK Error Handling — Standard Pattern Across Languages

## 1. API Returns Structured Errors

All requests include a header x-request-id that is the UUID identifier for the request for use in tracing on the backend.

API error envelope (FastAPI default):

Non-422 errors return `detail` as a string:
```json
{
  "detail": "Something happened."
}
```

422 validation errors return `detail` as an array of field-level issues:
```json
{
    "detail": [
        {
            "type": "missing",
            "loc": [
                "body",
                "event"
            ],
            "msg": "Field required",
            "input": {
                "field1": "value1"
            },
            "url": "https://errors.pydantic.dev/2.5/v/missing"
        }
    ]
}
```

---

## 2. JavaScript / TypeScript (Browser + Node)

```javascript
// --- Error hierarchy ---

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

// --- Central response handler ---

export async function handleResponse(response) {
  const requestId = response.headers.get('x-request-id');

  if (response.ok) {
    return response.status === 204 ? null : response.json();
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

// --- Consumer usage ---

try {
  const user = await sdk.users.create({ email: 'bad', age: 12 });
} catch (e) {
  if (e instanceof ValidationError) {
    for (const fe of e.fieldErrors) {
      console.log(`${fe.loc.join('.')}: ${fe.msg}`);
    }
  } else if (e instanceof RateLimitError) {
    await sleep(e.retryAfter ?? 5000);
  } else if (e instanceof ApiError) {
    console.error(`API error ${e.status}: ${e.message}`);
  }
  // Network errors (fetch failures) propagate as native errors
}
```

---

## 3. PHP

```php
// --- Error hierarchy ---

class ApiException extends \Exception {
    public function __construct(
        string $message,
        public readonly int $status,
        public readonly ?string $requestId,
        public readonly mixed $body,
    ) {
        parent::__construct($message, $status);
    }
}

class ValidationException extends ApiException {
    /** @var array<array{loc: string[], msg: string, type: string}> */
    public readonly array $fieldErrors;

    public function __construct(array $body, int $status, ?string $requestId) {
        $detail = $body['detail'] ?? [];
        if (is_array($detail)) {
            $message = implode('; ', array_map(
                fn($d) => implode('.', $d['loc']) . ': ' . $d['msg'],
                $detail
            ));
            $this->fieldErrors = array_map(
                fn($d) => ['loc' => $d['loc'], 'msg' => $d['msg'], 'type' => $d['type']],
                $detail
            );
        } else {
            $message = (string)$detail;
            $this->fieldErrors = [];
        }
        parent::__construct($message ?: 'Validation failed', $status, $requestId, $body);
    }
}

class NotFoundException extends ApiException {
    public function __construct(array $body, int $status, ?string $requestId) {
        parent::__construct($body['detail'] ?? 'Resource not found', $status, $requestId, $body);
    }
}

class RateLimitException extends ApiException {
    public function __construct(
        array $body,
        int $status,
        ?string $requestId,
        public readonly ?int $retryAfter,
    ) {
        parent::__construct($body['detail'] ?? 'Rate limited', $status, $requestId, $body);
    }
}

class ServerException extends ApiException {
    public function __construct(array $body, int $status, ?string $requestId) {
        parent::__construct($body['detail'] ?? 'Internal server error', $status, $requestId, $body);
    }
}

// --- Central response handler ---

function handleResponse(string $rawResponse, int $statusCode, array $headers): mixed {
    $requestId = $headers['x-request-id'] ?? null;
    $body = json_decode($rawResponse, true) ?? [];

    if ($statusCode >= 200 && $statusCode < 300) {
        return $body;
    }

    match(true) {
        $statusCode === 422
            => throw new ValidationException($body, $statusCode, $requestId),
        $statusCode === 404
            => throw new NotFoundException($body, $statusCode, $requestId),
        $statusCode === 429
            => throw new RateLimitException($body, $statusCode, $requestId, isset($headers['retry-after']) ? (int)$headers['retry-after'] : null),
        $statusCode >= 500
            => throw new ServerException($body, $statusCode, $requestId),
        default
            => throw new ApiException($body['detail'] ?? 'Unknown error', $statusCode, $requestId, $body),
    };
}

// --- Consumer usage ---

try {
    $user = $sdk->users()->create(['email' => 'bad', 'age' => 12]);
} catch (ValidationException $e) {
    foreach ($e->fieldErrors as $fe) {
        echo implode('.', $fe['loc']) . ": {$fe['msg']}\n";
    }
} catch (RateLimitException $e) {
    sleep($e->retryAfter ?? 5);
} catch (ApiException $e) {
    echo "API error {$e->status}: {$e->getMessage()}\n";
}
```

---

## 4. Key Design Decisions

### What the SDK should do automatically:
- Parse the error body into typed exceptions using FastAPI's `detail` field
- Attach request_id from `x-request-id` header for support/debugging
- Retry on 429 and 5xx (with exponential backoff) — configurable
- Normalize network/timeout errors into a consistent type

### What the SDK should NOT do:
- Silently swallow errors
- Retry on 4xx (other than 429) — those are caller bugs
- Throw generic exceptions that lose the structured detail
- Validate inputs client-side (mirror server validation) — server is source of truth

### Retry strategy (built into the SDK HTTP layer):
- 429 → respect Retry-After header, else exponential backoff
- 500/502/503/504 → retry up to N times with jitter
- 400/401/403/404/409/422 → never retry, throw immediately
- Network errors → retry with backoff (configurable)
