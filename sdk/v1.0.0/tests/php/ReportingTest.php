<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Reporting;

require_once __DIR__ . '/helpers.php';

class ReportingTest extends TestCase {
    public function test_update_project_upload_report_exists(): void {
        $this->assertTrue(method_exists(Reporting::class, 'updateProjectUploadReport'));
    }

    public function test_update_project_upload_report_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Reporting($ctx);
        $obj->updateProjectUploadReport('test_value', 'test_value');
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_update_project_upload_report_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Reporting($ctx);
        $obj->updateProjectUploadReport('hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/project_upload_report/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_update_project_upload_report_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Reporting($ctx);
        $obj->updateProjectUploadReport('test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('skipped_file_count=', $path);
    }

    public function test_update_project_upload_report_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Reporting($ctx);
        $obj->updateProjectUploadReport('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

}
