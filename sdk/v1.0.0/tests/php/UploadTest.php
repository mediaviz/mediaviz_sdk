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
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Upload($ctx);
        $obj->createUpload('test_value', 'test_value', 'test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_create_upload_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Upload($ctx);
        $obj->createUpload('test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/upload', $ctx->client->lastCall()['path']);
    }

    public function test_create_upload_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Upload($ctx);
        $obj->createUpload('test_value', 'test_value', 'test_value');
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('file_content', $body);
        $this->assertArrayHasKey('mimetype', $body);
        $this->assertArrayHasKey('file_path', $body);
    }

    public function test_create_upload_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Upload($ctx);
        $obj->createUpload('test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

}
