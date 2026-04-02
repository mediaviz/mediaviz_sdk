<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Export;

require_once __DIR__ . '/helpers.php';

class ExportTest extends TestCase {
    public function test_get_projects_upload_status_data_export_service_exists(): void {
        $this->assertTrue(method_exists(Export::class, 'getProjectsUploadStatusDataExportService'));
    }

    public function test_get_projects_upload_status_data_export_service_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Export($spy);
        $obj->getProjectsUploadStatusDataExportService('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_projects_upload_status_data_export_service_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Export($spy);
        $obj->getProjectsUploadStatusDataExportService('access_token', 'refresh_token', 'hello world');
        $this->assertStringContainsString('/api/v1/projects/hello%20world/upload_status/data_export_service', $spy->lastCall()['path']);
    }

    public function test_get_projects_upload_status_data_export_service_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Export($spy);
        $obj->getProjectsUploadStatusDataExportService('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_projects_export_exists(): void {
        $this->assertTrue(method_exists(Export::class, 'getProjectsExport'));
    }

    public function test_get_projects_export_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Export($spy);
        $obj->getProjectsExport('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_projects_export_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Export($spy);
        $obj->getProjectsExport('access_token', 'refresh_token', 'hello world');
        $this->assertStringContainsString('/api/v1/projects_export/hello%20world', $spy->lastCall()['path']);
    }

    public function test_get_projects_export_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Export($spy);
        $obj->getProjectsExport('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
