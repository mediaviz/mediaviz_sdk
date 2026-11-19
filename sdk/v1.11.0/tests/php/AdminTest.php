<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Admin;

require_once __DIR__ . '/helpers.php';

class AdminTest extends TestCase {
    public function test_get_get_category_labels_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'getCategoryLabels'));
    }

    public function test_get_get_category_labels_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->getCategoryLabels('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_category_labels_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->getCategoryLabels('hello world');
        $this->assertStringContainsString('/api/v1/admin/category_labels/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_category_labels_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->getCategoryLabels('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_patch_admin_set_company_can_manage_api_clients_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'adminSetCompanyCanManageApiClients'));
    }

    public function test_patch_admin_set_company_can_manage_api_clients_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminSetCompanyCanManageApiClients(42, true);
        $this->assertSame('PATCH', $ctx->client->lastCall()['method']);
    }

    public function test_patch_admin_set_company_can_manage_api_clients_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminSetCompanyCanManageApiClients(42, true);
        $this->assertStringContainsString('/api/v1/admin/companies/42/can_manage_api_clients', $ctx->client->lastCall()['path']);
    }

    public function test_patch_admin_set_company_can_manage_api_clients_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminSetCompanyCanManageApiClients(42, true);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('can_manage_api_clients', $body);
    }

    public function test_patch_admin_set_company_can_manage_api_clients_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminSetCompanyCanManageApiClients(42, true);
        $this->assertCount(1, $ctx->client->calls);
    }

}
