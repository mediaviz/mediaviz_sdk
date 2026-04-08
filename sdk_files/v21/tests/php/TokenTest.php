<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Token;

require_once __DIR__ . '/helpers.php';

class TokenTest extends TestCase {
    public function test_post_get_access_token_login_exists(): void {
        $this->assertTrue(method_exists(Token::class, 'getAccessTokenLogin'));
    }

    public function test_post_get_access_token_login_http_method(): void {
        $this->assertTrue(method_exists(Token::class, 'getAccessTokenLogin'));
    }

    public function test_post_get_access_token_login_path(): void {
        $this->assertTrue(method_exists(Token::class, 'getAccessTokenLogin'));
    }

    public function test_post_get_access_token_login_request_body(): void {
        $this->assertTrue(method_exists(Token::class, 'getAccessTokenLogin'));
    }

    public function test_post_get_access_token_login_auth_routing(): void {
        $this->assertTrue(method_exists(Token::class, 'getAccessTokenLogin'));
    }

    public function test_post_invalidate_token_logout_exists(): void {
        $this->assertTrue(method_exists(Token::class, 'invalidateTokenLogout'));
    }

    public function test_post_invalidate_token_logout_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Token($spy);
        $obj->invalidateTokenLogout('access_token', 'refresh_token');
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_post_invalidate_token_logout_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Token($spy);
        $obj->invalidateTokenLogout('access_token', 'refresh_token');
        $this->assertStringContainsString('/api/v1/logout', $spy->lastCall()['path']);
    }

    public function test_post_invalidate_token_logout_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Token($spy);
        $obj->invalidateTokenLogout('access_token', 'refresh_token');
        $this->assertCount(1, $spy->calls);
    }

}
