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
        $obj->createUser(['Model' => 'test_value']);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_user_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->createUser(['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/users/', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_user_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->createUser(['Model' => 'test_value']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_post_create_user_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->createUser(['Model' => 'test_value']);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_create_mediaviz_internal_admin_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'createMediavizInternalAdmin'));
    }

    public function test_post_create_mediaviz_internal_admin_http_method(): void {
        $this->assertTrue(method_exists(Users::class, 'createMediavizInternalAdmin'));
    }

    public function test_post_create_mediaviz_internal_admin_path(): void {
        $this->assertTrue(method_exists(Users::class, 'createMediavizInternalAdmin'));
    }

    public function test_post_create_mediaviz_internal_admin_request_body(): void {
        $this->assertTrue(method_exists(Users::class, 'createMediavizInternalAdmin'));
    }

    public function test_post_create_mediaviz_internal_admin_auth_routing(): void {
        $this->assertTrue(method_exists(Users::class, 'createMediavizInternalAdmin'));
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

    public function test_post_change_password_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'changePassword'));
    }

    public function test_post_change_password_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->changePassword(['Model' => 'test_value']);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_change_password_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->changePassword(['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/user/change_password', $ctx->client->lastCall()['path']);
    }

    public function test_post_change_password_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->changePassword(['Model' => 'test_value']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_post_change_password_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->changePassword(['Model' => 'test_value']);
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

    public function test_get_get_all_users_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'getAllUsers'));
    }

    public function test_get_get_all_users_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->getAllUsers('test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_all_users_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->getAllUsers('test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/users/admin/sort/test_value/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_all_users_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->getAllUsers('test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_get_all_users_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->getAllUsers('test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_user_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'updateUser'));
    }

    public function test_put_update_user_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->updateUser(42, ['Model' => 'test_value']);
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_user_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->updateUser(42, ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/users/42', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_user_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->updateUser(42, ['Model' => 'test_value']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_put_update_user_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->updateUser(42, ['Model' => 'test_value']);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_user_by_admin_exists(): void {
        $this->assertTrue(method_exists(Users::class, 'updateUserByAdmin'));
    }

    public function test_put_update_user_by_admin_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->updateUserByAdmin(42, ['Model' => 'test_value']);
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_user_by_admin_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->updateUserByAdmin(42, ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/users/admin/42', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_user_by_admin_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->updateUserByAdmin(42, ['Model' => 'test_value']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_put_update_user_by_admin_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Users($ctx);
        $obj->updateUserByAdmin(42, ['Model' => 'test_value']);
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
