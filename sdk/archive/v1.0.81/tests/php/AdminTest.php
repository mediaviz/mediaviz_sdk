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

}
