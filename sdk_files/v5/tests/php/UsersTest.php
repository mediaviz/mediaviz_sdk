<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Users;

require_once __DIR__ . '/helpers.php';

class UsersTest extends TestCase {
    public function test_get_users_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'getUsers'));
    }

    public function test_get_users_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->getUsers('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_users_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->getUsers('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/users/42', $spy->lastCall()['path']);
    }

    public function test_get_users_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->getUsers('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_create_users_new_company_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'createUsersNewCompany'));
    }

    public function test_create_users_new_company_http_method(): void {
        $this->assertTrue(method_exists(Users::class, 'createUsersNewCompany'));
    }

    public function test_create_users_new_company_path(): void {
        $this->assertTrue(method_exists(Users::class, 'createUsersNewCompany'));
    }

    public function test_create_users_new_company_request_body(): void {
        $this->assertTrue(method_exists(Users::class, 'createUsersNewCompany'));
    }

    public function test_create_users_new_company_auth_routing(): void {
        $this->assertTrue(method_exists(Users::class, 'createUsersNewCompany'));
    }

    public function test_update_users_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'updateUsers'));
    }

    public function test_update_users_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->updateUsers('access_token', 'refresh_token', 42, []);
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_update_users_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->updateUsers('access_token', 'refresh_token', 42, []);
        $this->assertStringContainsString('/api/v1/users/42', $spy->lastCall()['path']);
    }

    public function test_update_users_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->updateUsers('access_token', 'refresh_token', 42, []);
        $body = $spy->lastCall()['body'];
        $this->assertNotNull($body);
    }

    public function test_update_users_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->updateUsers('access_token', 'refresh_token', 42, []);
        $this->assertCount(1, $spy->calls);
    }

    public function test_delete_users_delete_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'deleteUsersDelete'));
    }

    public function test_delete_users_delete_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->deleteUsersDelete('access_token', 'refresh_token', 42);
        $this->assertSame('DELETE', $spy->lastCall()['method']);
    }

    public function test_delete_users_delete_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->deleteUsersDelete('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/users/delete/42', $spy->lastCall()['path']);
    }

    public function test_delete_users_delete_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->deleteUsersDelete('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_create_user_change_password_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'createUserChangePassword'));
    }

    public function test_create_user_change_password_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->createUserChangePassword('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_create_user_change_password_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->createUserChangePassword('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/user/change_password', $spy->lastCall()['path']);
    }

    public function test_create_user_change_password_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->createUserChangePassword('access_token', 'refresh_token', 'test_value', 'test_value');
        $body = $spy->lastCall()['body'];
        $this->assertArrayHasKey('old_password', $body);
        $this->assertArrayHasKey('new_password', $body);
    }

    public function test_create_user_change_password_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->createUserChangePassword('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_create_users_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'createUsers'));
    }

    public function test_create_users_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->createUsers('access_token', 'refresh_token', []);
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_create_users_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->createUsers('access_token', 'refresh_token', []);
        $this->assertStringContainsString('/api/v1/users/', $spy->lastCall()['path']);
    }

    public function test_create_users_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->createUsers('access_token', 'refresh_token', []);
        $body = $spy->lastCall()['body'];
        $this->assertNotNull($body);
    }

    public function test_create_users_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->createUsers('access_token', 'refresh_token', []);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_users_company_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'getUsersCompany'));
    }

    public function test_get_users_company_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->getUsersCompany('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_users_company_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->getUsersCompany('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/users/company/42', $spy->lastCall()['path']);
    }

    public function test_get_users_company_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Users($spy);
        $obj->getUsersCompany('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

}
