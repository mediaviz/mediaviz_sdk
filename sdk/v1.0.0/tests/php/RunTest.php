<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Run;

require_once __DIR__ . '/helpers.php';

class RunTest extends TestCase {
    public function test_post_create_run_exists(): void {
        $this->assertTrue(method_exists(Run::class, 'createRun'));
    }

    public function test_post_create_run_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->createRun('00000000-0000-0000-0000-000000000000', true, true, true, true, true, true, true, true, true, 'test_value', 'test_value', true);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_run_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->createRun('00000000-0000-0000-0000-000000000000', true, true, true, true, true, true, true, true, true, 'test_value', 'test_value', true);
        $this->assertStringContainsString('/api/v1/runs/', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_run_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->createRun('00000000-0000-0000-0000-000000000000', true, true, true, true, true, true, true, true, true, 'test_value', 'test_value', true);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('project_id', $body);
        $this->assertArrayHasKey('active', $body);
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('similarity_level', $body);
        $this->assertArrayHasKey('normalize', $body);
        $this->assertArrayHasKey('colors_model', $body);
        $this->assertArrayHasKey('blur_model', $body);
        $this->assertArrayHasKey('face_recognition_model', $body);
        $this->assertArrayHasKey('image_classification_model', $body);
        $this->assertArrayHasKey('image_comparison_model', $body);
        $this->assertArrayHasKey('personhood_model', $body);
        $this->assertArrayHasKey('similarity_model', $body);
        $this->assertArrayHasKey('evidence_model', $body);
    }

    public function test_post_create_run_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->createRun('00000000-0000-0000-0000-000000000000', true, true, true, true, true, true, true, true, true, 'test_value', 'test_value', true);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_run_exists(): void {
        $this->assertTrue(method_exists(Run::class, 'getRun'));
    }

    public function test_get_get_run_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->getRun(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_run_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->getRun(42);
        $this->assertStringContainsString('/api/v1/runs/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_run_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->getRun(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_project_runs_exists(): void {
        $this->assertTrue(method_exists(Run::class, 'getProjectRuns'));
    }

    public function test_get_get_project_runs_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->getProjectRuns('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_project_runs_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->getProjectRuns('hello world');
        $this->assertStringContainsString('/api/v1/runs/project/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_project_runs_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->getProjectRuns('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_run_exists(): void {
        $this->assertTrue(method_exists(Run::class, 'updateRun'));
    }

    public function test_put_update_run_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->updateRun(42, 42, ['item1', 'item2'], true, 'test_value', 'test_value');
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_run_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->updateRun(42, 42, ['item1', 'item2'], true, 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/runs/42', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_run_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->updateRun(42, 42, ['item1', 'item2'], true, 'test_value', 'test_value');
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('project_run_index', $body);
        $this->assertArrayHasKey('models', $body);
        $this->assertArrayHasKey('active', $body);
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('similarity_level', $body);
    }

    public function test_put_update_run_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->updateRun(42, 42, ['item1', 'item2'], true, 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_delete_run_exists(): void {
        $this->assertTrue(method_exists(Run::class, 'deleteRun'));
    }

    public function test_delete_delete_run_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->deleteRun(42);
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_delete_run_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->deleteRun(42);
        $this->assertStringContainsString('/api/v1/runs/42', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_run_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Run($ctx);
        $obj->deleteRun(42);
        $this->assertCount(1, $ctx->client->calls);
    }

}
