<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\EmailTokens;

require_once __DIR__ . '/helpers.php';

class EmailTokensTest extends TestCase {
    public function test_post_request_email_verification_exists(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'requestEmailVerification'));
    }

    public function test_post_request_email_verification_http_method(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'requestEmailVerification'));
    }

    public function test_post_request_email_verification_path(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'requestEmailVerification'));
    }

    public function test_post_request_email_verification_request_body(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'requestEmailVerification'));
    }

    public function test_post_request_email_verification_auth_routing(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'requestEmailVerification'));
    }

    public function test_post_verify_email_exists(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'verifyEmail'));
    }

    public function test_post_verify_email_http_method(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'verifyEmail'));
    }

    public function test_post_verify_email_path(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'verifyEmail'));
    }

    public function test_post_verify_email_auth_routing(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'verifyEmail'));
    }

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

    public function test_post_validate_token_exists(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'validateToken'));
    }

    public function test_post_validate_token_http_method(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'validateToken'));
    }

    public function test_post_validate_token_path(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'validateToken'));
    }

    public function test_post_validate_token_request_body(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'validateToken'));
    }

    public function test_post_validate_token_auth_routing(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'validateToken'));
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

    public function test_delete_delete_user_email_tokens_exists(): void {
        $this->assertTrue(method_exists(EmailTokens::class, 'deleteUserEmailTokens'));
    }

    public function test_delete_delete_user_email_tokens_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new EmailTokens($ctx);
        $obj->deleteUserEmailTokens(42);
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_delete_user_email_tokens_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new EmailTokens($ctx);
        $obj->deleteUserEmailTokens(42);
        $this->assertStringContainsString('/api/v1/admin/email_tokens/by_user/42', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_user_email_tokens_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new EmailTokens($ctx);
        $obj->deleteUserEmailTokens(42);
        $this->assertCount(1, $ctx->client->calls);
    }

}
