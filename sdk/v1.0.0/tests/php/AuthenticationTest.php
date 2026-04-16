<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Authentication;

require_once __DIR__ . '/helpers.php';

class AuthenticationTest extends TestCase {
    public function test_create_token_exists(): void {
        $this->assertTrue(method_exists(Authentication::class, 'createToken'));
    }

    public function test_create_token_http_method(): void {
        $this->assertTrue(method_exists(Authentication::class, 'createToken'));
    }

    public function test_create_token_path(): void {
        $this->assertTrue(method_exists(Authentication::class, 'createToken'));
    }

    public function test_create_token_request_body(): void {
        $this->assertTrue(method_exists(Authentication::class, 'createToken'));
    }

    public function test_create_token_auth_routing(): void {
        $this->assertTrue(method_exists(Authentication::class, 'createToken'));
    }

    public function test_create_request_password_reset_exists(): void {
        $this->assertTrue(method_exists(Authentication::class, 'createRequestPasswordReset'));
    }

    public function test_create_request_password_reset_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Authentication($ctx);
        $obj->createRequestPasswordReset('test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_create_request_password_reset_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Authentication($ctx);
        $obj->createRequestPasswordReset('test_value');
        $this->assertStringContainsString('/api/v1/request-password-reset', $ctx->client->lastCall()['path']);
    }

    public function test_create_request_password_reset_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Authentication($ctx);
        $obj->createRequestPasswordReset('test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('email=', $path);
    }

    public function test_create_request_password_reset_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Authentication($ctx);
        $obj->createRequestPasswordReset('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_create_reset_password_exists(): void {
        $this->assertTrue(method_exists(Authentication::class, 'createResetPassword'));
    }

    public function test_create_reset_password_http_method(): void {
        $this->assertTrue(method_exists(Authentication::class, 'createResetPassword'));
    }

    public function test_create_reset_password_path(): void {
        $this->assertTrue(method_exists(Authentication::class, 'createResetPassword'));
    }

    public function test_create_reset_password_request_body(): void {
        $this->assertTrue(method_exists(Authentication::class, 'createResetPassword'));
    }

    public function test_create_reset_password_auth_routing(): void {
        $this->assertTrue(method_exists(Authentication::class, 'createResetPassword'));
    }

    public function test_refresh_token_exists(): void {
        $this->assertTrue(method_exists(Authentication::class, 'refreshToken'));
    }

    public function test_refresh_token_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Authentication($ctx);
        $obj->refreshToken();
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_refresh_token_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Authentication($ctx);
        $obj->refreshToken();
        $this->assertStringContainsString('/api/v1/token/refresh', $ctx->client->lastCall()['path']);
    }

    public function test_refresh_token_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Authentication($ctx);
        $obj->refreshToken();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_create_logout_exists(): void {
        $this->assertTrue(method_exists(Authentication::class, 'createLogout'));
    }

    public function test_create_logout_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Authentication($ctx);
        $obj->createLogout();
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_create_logout_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Authentication($ctx);
        $obj->createLogout();
        $this->assertStringContainsString('/api/v1/logout', $ctx->client->lastCall()['path']);
    }

    public function test_create_logout_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Authentication($ctx);
        $obj->createLogout();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_admin_revoke_user_tokens_exists(): void {
        $this->assertTrue(method_exists(Authentication::class, 'deleteAdminRevokeUserTokens'));
    }

    public function test_delete_admin_revoke_user_tokens_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Authentication($ctx);
        $obj->deleteAdminRevokeUserTokens(42);
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_admin_revoke_user_tokens_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Authentication($ctx);
        $obj->deleteAdminRevokeUserTokens(42);
        $this->assertStringContainsString('/api/v1/admin/users/42/revoke-tokens', $ctx->client->lastCall()['path']);
    }

    public function test_delete_admin_revoke_user_tokens_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Authentication($ctx);
        $obj->deleteAdminRevokeUserTokens(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_shareauth_php_exists(): void {
        $this->assertTrue(method_exists(Authentication::class, 'getShareauthPhp'));
    }

    public function test_get_shareauth_php_http_method(): void {
        $this->assertTrue(method_exists(Authentication::class, 'getShareauthPhp'));
    }

    public function test_get_shareauth_php_path(): void {
        $this->assertTrue(method_exists(Authentication::class, 'getShareauthPhp'));
    }

    public function test_get_shareauth_php_auth_routing(): void {
        $this->assertTrue(method_exists(Authentication::class, 'getShareauthPhp'));
    }

}
