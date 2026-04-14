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
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Status($ctx);
        $obj->getPhotosProjectUploadStatus('test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_photos_project_upload_status_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Status($ctx);
        $obj->getPhotosProjectUploadStatus('hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/photos_project/hello%20world/upload_status/test_value', $ctx->client->lastCall()['path']);
    }

    public function test_get_photos_project_upload_status_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Status($ctx);
        $obj->getPhotosProjectUploadStatus('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

}
