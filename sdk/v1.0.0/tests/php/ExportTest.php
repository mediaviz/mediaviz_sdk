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
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Export($ctx);
        $obj->getProjectsUploadStatusDataExportService('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_projects_upload_status_data_export_service_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Export($ctx);
        $obj->getProjectsUploadStatusDataExportService('hello world');
        $this->assertStringContainsString('/api/v1/projects/hello%20world/upload_status/data_export_service', $ctx->client->lastCall()['path']);
    }

    public function test_get_projects_upload_status_data_export_service_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Export($ctx);
        $obj->getProjectsUploadStatusDataExportService('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_projects_export_exists(): void {
        $this->assertTrue(method_exists(Export::class, 'getProjectsExport'));
    }

    public function test_get_projects_export_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Export($ctx);
        $obj->getProjectsExport('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_projects_export_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Export($ctx);
        $obj->getProjectsExport('hello world');
        $this->assertStringContainsString('/api/v1/projects_export/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_projects_export_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Export($ctx);
        $obj->getProjectsExport('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

}
