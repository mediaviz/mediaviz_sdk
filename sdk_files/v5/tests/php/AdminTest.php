<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Admin;

require_once __DIR__ . '/helpers.php';

class AdminTest extends TestCase {
    public function test_get_admin_google_sheets_credentials_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'getAdminGoogleSheetsCredentials'));
    }

    public function test_get_admin_google_sheets_credentials_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getAdminGoogleSheetsCredentials('access_token', 'refresh_token');
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_get_admin_google_sheets_credentials_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getAdminGoogleSheetsCredentials('access_token', 'refresh_token');
        $this->assertStringContainsString('/api/v1/admin/get_google_sheets_credentials', $spy->lastCall()['path']);
    }

    public function test_get_admin_google_sheets_credentials_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getAdminGoogleSheetsCredentials('access_token', 'refresh_token');
        $this->assertCount(1, $spy->calls);
    }

}
