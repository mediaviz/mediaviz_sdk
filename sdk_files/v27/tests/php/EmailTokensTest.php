<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\EmailTokens;

require_once __DIR__ . '/helpers.php';

class EmailTokensTest extends TestCase {
    public function test_post_request_password_reset_exists(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'requestPasswordReset'));
    }

    public function test_post_request_password_reset_http_method(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'requestPasswordReset'));
    }

    public function test_post_request_password_reset_path(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'requestPasswordReset'));
    }

    public function test_post_request_password_reset_request_body(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'requestPasswordReset'));
    }

    public function test_post_request_password_reset_auth_routing(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'requestPasswordReset'));
    }

    public function test_post_reset_password_exists(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'resetPassword'));
    }

    public function test_post_reset_password_http_method(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'resetPassword'));
    }

    public function test_post_reset_password_path(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'resetPassword'));
    }

    public function test_post_reset_password_request_body(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'resetPassword'));
    }

    public function test_post_reset_password_auth_routing(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'resetPassword'));
    }

}
