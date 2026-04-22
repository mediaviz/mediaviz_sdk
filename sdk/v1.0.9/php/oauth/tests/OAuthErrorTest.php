<?php

declare(strict_types=1);

namespace OAuthSdk\Tests;

use OAuthSdk\OAuthError;
use PHPUnit\Framework\TestCase;

class OAuthErrorTest extends TestCase
{
    public function test_constructs_with_code_description_and_status(): void
    {
        $e = new OAuthError('invalid_grant', 'Bad code', 400);

        $this->assertSame('invalid_grant', $e->errorCode);
        $this->assertSame('Bad code', $e->description);
        $this->assertSame(400, $e->httpStatus);
    }

    public function test_from_response_parses_rfc6749_body(): void
    {
        $body = json_encode(['error' => 'invalid_grant', 'error_description' => 'Token expired']);
        $e = OAuthError::fromResponse(400, $body);

        $this->assertSame('invalid_grant', $e->errorCode);
        $this->assertSame('Token expired', $e->description);
        $this->assertSame(400, $e->httpStatus);
    }

    public function test_from_response_uses_empty_description_when_absent(): void
    {
        $body = json_encode(['error' => 'access_denied']);
        $e = OAuthError::fromResponse(403, $body);

        $this->assertSame('access_denied', $e->errorCode);
        $this->assertSame('', $e->description);
    }

    public function test_from_response_falls_back_on_non_rfc_body(): void
    {
        $e = OAuthError::fromResponse(500, 'Internal Server Error');

        $this->assertSame('server_error', $e->errorCode);
        $this->assertSame('Unexpected server response', $e->description);
        $this->assertSame(500, $e->httpStatus);
    }

    public function test_from_response_falls_back_on_missing_error_key(): void
    {
        $body = json_encode(['message' => 'something went wrong']);
        $e = OAuthError::fromResponse(503, $body);

        $this->assertSame('server_error', $e->errorCode);
    }

    public function test_is_runtime_exception(): void
    {
        $e = new OAuthError('server_error', 'boom', 500);
        $this->assertInstanceOf(\RuntimeException::class, $e);
    }
}
