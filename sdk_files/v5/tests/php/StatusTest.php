<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Status;

require_once __DIR__ . '/helpers.php';

class StatusTest extends TestCase {
    public function test_get_photos_project_upload_status_exists(): void {
        $this->assertTrue(method_exists(Status::class, 'getPhotosProjectUploadStatus'));
    }

    public function test_get_photos_project_upload_status_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Status($spy);
        $obj->getPhotosProjectUploadStatus('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_photos_project_upload_status_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Status($spy);
        $obj->getPhotosProjectUploadStatus('access_token', 'refresh_token', 'hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/photos_project/hello%20world/upload_status/test_value', $spy->lastCall()['path']);
    }

    public function test_get_photos_project_upload_status_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Status($spy);
        $obj->getPhotosProjectUploadStatus('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
