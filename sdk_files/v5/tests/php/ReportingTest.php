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
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Reporting($spy);
        $obj->updateProjectUploadReport('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_update_project_upload_report_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Reporting($spy);
        $obj->updateProjectUploadReport('access_token', 'refresh_token', 'hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/project_upload_report/hello%20world/', $spy->lastCall()['path']);
    }

    public function test_update_project_upload_report_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Reporting($spy);
        $obj->updateProjectUploadReport('access_token', 'refresh_token', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('skipped_file_count=', $path);
    }

    public function test_update_project_upload_report_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Reporting($spy);
        $obj->updateProjectUploadReport('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
