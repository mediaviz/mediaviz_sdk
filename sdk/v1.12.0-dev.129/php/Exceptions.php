<?php
declare(strict_types=1);
namespace MediaVizSdk;

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
        if (is_array($detail) && isset($detail[0])) {
            $message = implode('; ', array_map(
                fn($d) => implode('.', $d['loc']) . ': ' . $d['msg'],
                $detail
            ));
            $this->fieldErrors = array_map(
                fn($d) => ['loc' => $d['loc'], 'msg' => $d['msg'], 'type' => $d['type']],
                $detail
            );
        } else {
            $message = is_string($detail) ? $detail : 'Validation failed';
            $this->fieldErrors = [];
        }
        parent::__construct($message, $status, $requestId, $body);
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
