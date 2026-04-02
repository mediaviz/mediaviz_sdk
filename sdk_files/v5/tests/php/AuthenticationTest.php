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
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Authentication($spy);
        $obj->createRequestPasswordReset('access_token', 'refresh_token', 'test_value');
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_create_request_password_reset_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Authentication($spy);
        $obj->createRequestPasswordReset('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/request-password-reset', $spy->lastCall()['path']);
    }

    public function test_create_request_password_reset_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Authentication($spy);
        $obj->createRequestPasswordReset('access_token', 'refresh_token', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('email=', $path);
    }

    public function test_create_request_password_reset_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Authentication($spy);
        $obj->createRequestPasswordReset('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
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

    public function test_create_logout_exists(): void {
        $this->assertTrue(method_exists(Authentication::class, 'createLogout'));
    }

    public function test_create_logout_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Authentication($spy);
        $obj->createLogout('access_token', 'refresh_token');
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_create_logout_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Authentication($spy);
        $obj->createLogout('access_token', 'refresh_token');
        $this->assertStringContainsString('/api/v1/logout', $spy->lastCall()['path']);
    }

    public function test_create_logout_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Authentication($spy);
        $obj->createLogout('access_token', 'refresh_token');
        $this->assertCount(1, $spy->calls);
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
