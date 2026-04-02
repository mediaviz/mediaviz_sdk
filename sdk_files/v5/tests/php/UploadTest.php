<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Upload;

require_once __DIR__ . '/helpers.php';

class UploadTest extends TestCase {
    public function test_create_upload_exists(): void {
        $this->assertTrue(method_exists(Upload::class, 'createUpload'));
    }

    public function test_create_upload_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Upload($spy);
        $obj->createUpload('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_create_upload_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Upload($spy);
        $obj->createUpload('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/upload', $spy->lastCall()['path']);
    }

    public function test_create_upload_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Upload($spy);
        $obj->createUpload('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
        $body = $spy->lastCall()['body'];
        $this->assertArrayHasKey('file_content', $body);
        $this->assertArrayHasKey('mimetype', $body);
        $this->assertArrayHasKey('file_path', $body);
    }

    public function test_create_upload_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Upload($spy);
        $obj->createUpload('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
