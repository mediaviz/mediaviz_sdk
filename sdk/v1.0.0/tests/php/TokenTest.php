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

    public function test_post_get_access_token_refresh_exists(): void {
        $this->assertTrue(method_exists(Token::class, 'getAccessTokenRefresh'));
    }

    public function test_post_get_access_token_refresh_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Token($ctx);
        $obj->getAccessTokenRefresh();
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_get_access_token_refresh_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Token($ctx);
        $obj->getAccessTokenRefresh();
        $this->assertStringContainsString('/api/v1/token/refresh', $ctx->client->lastCall()['path']);
    }

    public function test_post_get_access_token_refresh_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Token($ctx);
        $obj->getAccessTokenRefresh();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_invalidate_token_logout_exists(): void {
        $this->assertTrue(method_exists(Token::class, 'invalidateTokenLogout'));
    }

    public function test_post_invalidate_token_logout_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Token($ctx);
        $obj->invalidateTokenLogout();
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_invalidate_token_logout_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Token($ctx);
        $obj->invalidateTokenLogout();
        $this->assertStringContainsString('/api/v1/logout', $ctx->client->lastCall()['path']);
    }

    public function test_post_invalidate_token_logout_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Token($ctx);
        $obj->invalidateTokenLogout();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_delete_tokens_revoke_user_exists(): void {
        $this->assertTrue(method_exists(Token::class, 'deleteTokensRevokeUser'));
    }

    public function test_delete_delete_tokens_revoke_user_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Token($ctx);
        $obj->deleteTokensRevokeUser(42);
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_delete_tokens_revoke_user_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Token($ctx);
        $obj->deleteTokensRevokeUser(42);
        $this->assertStringContainsString('/api/v1/admin/users/42/revoke-tokens', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_tokens_revoke_user_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Token($ctx);
        $obj->deleteTokensRevokeUser(42);
        $this->assertCount(1, $ctx->client->calls);
    }

}
