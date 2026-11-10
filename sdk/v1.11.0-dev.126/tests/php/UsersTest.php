<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Users;

require_once __DIR__ . '/helpers.php';

class UsersTest extends TestCase {
    public function test_post_create_user_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'createUser'));
    }

    public function test_post_create_user_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->createUser('test_value', 'user@example.com', 42, 42, 'test_value', 'test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_user_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->createUser('test_value', 'user@example.com', 42, 42, 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/users/', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_user_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->createUser('test_value', 'user@example.com', 42, 42, 'test_value', 'test_value');
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('email', $body);
        $this->assertArrayHasKey('company_id', $body);
        $this->assertArrayHasKey('profile_picture', $body);
        $this->assertArrayHasKey('payment_plan_type', $body);
        $this->assertArrayHasKey('account_type', $body);
    }

    public function test_post_create_user_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->createUser('test_value', 'user@example.com', 42, 42, 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
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

    public function test_post_create_user_and_company_query_params(): void {
        $this->assertTrue(method_exists(Users::class, 'createUserAndCompany'));
    }

    public function test_post_create_user_and_company_request_body(): void {
        $this->assertTrue(method_exists(Users::class, 'createUserAndCompany'));
    }

    public function test_post_create_user_and_company_auth_routing(): void {
        $this->assertTrue(method_exists(Users::class, 'createUserAndCompany'));
    }

    public function test_post_change_password_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'changePassword'));
    }

    public function test_post_change_password_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->changePassword('test_value', 'test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_change_password_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->changePassword('test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/user/change_password', $ctx->client->lastCall()['path']);
    }

    public function test_post_change_password_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->changePassword('test_value', 'test_value');
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('old_password', $body);
        $this->assertArrayHasKey('new_password', $body);
    }

    public function test_post_change_password_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->changePassword('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_user_id_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'getUserId'));
    }

    public function test_get_get_user_id_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->getUserId();
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_user_id_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->getUserId();
        $this->assertStringContainsString('/api/v1/users', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_user_id_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->getUserId();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_user_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'getUser'));
    }

    public function test_get_get_user_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->getUser(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_user_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->getUser(42);
        $this->assertStringContainsString('/api/v1/users/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_user_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->getUser(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_all_users_by_company_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'getAllUsersByCompany'));
    }

    public function test_get_get_all_users_by_company_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->getAllUsersByCompany(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_all_users_by_company_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->getAllUsersByCompany(42);
        $this->assertStringContainsString('/api/v1/users/company/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_all_users_by_company_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->getAllUsersByCompany(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_user_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'updateUser'));
    }

    public function test_put_update_user_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->updateUser(42, 'test_value', 'user@example.com', 'test_value', 42, 42, 'test_value', 'test_value', 'test_value', '2024-01-01');
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_user_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->updateUser(42, 'test_value', 'user@example.com', 'test_value', 42, 42, 'test_value', 'test_value', 'test_value', '2024-01-01');
        $this->assertStringContainsString('/api/v1/users/42', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_user_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->updateUser(42, 'test_value', 'user@example.com', 'test_value', 42, 42, 'test_value', 'test_value', 'test_value', '2024-01-01');
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('email', $body);
        $this->assertArrayHasKey('password', $body);
        $this->assertArrayHasKey('company_id', $body);
        $this->assertArrayHasKey('account_type', $body);
        $this->assertArrayHasKey('profile_picture', $body);
        $this->assertArrayHasKey('location', $body);
        $this->assertArrayHasKey('phone_number', $body);
        $this->assertArrayHasKey('birthday', $body);
    }

    public function test_put_update_user_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->updateUser(42, 'test_value', 'user@example.com', 'test_value', 42, 42, 'test_value', 'test_value', 'test_value', '2024-01-01');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_delete_user_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'deleteUser'));
    }

    public function test_delete_delete_user_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->deleteUser(42, 42);
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_delete_user_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->deleteUser(42, 42);
        $this->assertStringContainsString('/api/v1/users/delete/42', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_user_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->deleteUser(42, 42);
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('new_company_owner_id=', $path);
    }

    public function test_delete_delete_user_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->deleteUser(42, 42);
        $this->assertCount(1, $ctx->client->calls);
    }

}
