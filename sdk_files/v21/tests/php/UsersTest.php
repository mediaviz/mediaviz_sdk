<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Users;

require_once __DIR__ . '/helpers.php';

class UsersTest extends TestCase {
    public function test_get_get_user_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'getUser'));
    }

    public function test_get_get_user_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->getUser('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_user_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->getUser('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/users/42', $spy->lastCall()['path']);
    }

    public function test_get_get_user_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->getUser('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_post_create_user_and_company_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'createUserAndCompany'));
    }

    public function test_post_create_user_and_company_http_method(): void {
        $this->assertTrue(method_exists(Users::class, 'createUserAndCompany'));
    }

    public function test_post_create_user_and_company_path(): void {
        $this->assertTrue(method_exists(Users::class, 'createUserAndCompany'));
    }

    public function test_post_create_user_and_company_request_body(): void {
        $this->assertTrue(method_exists(Users::class, 'createUserAndCompany'));
    }

    public function test_post_create_user_and_company_auth_routing(): void {
        $this->assertTrue(method_exists(Users::class, 'createUserAndCompany'));
    }

    public function test_put_update_user_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'updateUser'));
    }

    public function test_put_update_user_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->updateUser('access_token', 'refresh_token', 42, ['Model' => 'test_value']);
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_put_update_user_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->updateUser('access_token', 'refresh_token', 42, ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/users/42', $spy->lastCall()['path']);
    }

    public function test_put_update_user_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->updateUser('access_token', 'refresh_token', 42, ['Model' => 'test_value']);
        $body = $spy->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_put_update_user_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->updateUser('access_token', 'refresh_token', 42, ['Model' => 'test_value']);
        $this->assertCount(1, $spy->calls);
    }

    public function test_delete_delete_user_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'deleteUser'));
    }

    public function test_delete_delete_user_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->deleteUser('access_token', 'refresh_token', 42, 42);
        $this->assertSame('DELETE', $spy->lastCall()['method']);
    }

    public function test_delete_delete_user_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->deleteUser('access_token', 'refresh_token', 42, 42);
        $this->assertStringContainsString('/api/v1/users/delete/42', $spy->lastCall()['path']);
    }

    public function test_delete_delete_user_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->deleteUser('access_token', 'refresh_token', 42, 42);
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('new_company_owner_id=', $path);
    }

    public function test_delete_delete_user_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->deleteUser('access_token', 'refresh_token', 42, 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_post_change_password_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'changePassword'));
    }

    public function test_post_change_password_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->changePassword('access_token', 'refresh_token', ['Model' => 'test_value']);
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_post_change_password_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->changePassword('access_token', 'refresh_token', ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/user/change_password', $spy->lastCall()['path']);
    }

    public function test_post_change_password_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->changePassword('access_token', 'refresh_token', ['Model' => 'test_value']);
        $body = $spy->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_post_change_password_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->changePassword('access_token', 'refresh_token', ['Model' => 'test_value']);
        $this->assertCount(1, $spy->calls);
    }

    public function test_post_create_user_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'createUser'));
    }

    public function test_post_create_user_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->createUser('access_token', 'refresh_token', ['Model' => 'test_value']);
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_post_create_user_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->createUser('access_token', 'refresh_token', ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/users/', $spy->lastCall()['path']);
    }

    public function test_post_create_user_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->createUser('access_token', 'refresh_token', ['Model' => 'test_value']);
        $body = $spy->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_post_create_user_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->createUser('access_token', 'refresh_token', ['Model' => 'test_value']);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_all_users_by_company_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'getAllUsersByCompany'));
    }

    public function test_get_get_all_users_by_company_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->getAllUsersByCompany('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_all_users_by_company_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->getAllUsersByCompany('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/users/company/42', $spy->lastCall()['path']);
    }

    public function test_get_get_all_users_by_company_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->getAllUsersByCompany('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

}
