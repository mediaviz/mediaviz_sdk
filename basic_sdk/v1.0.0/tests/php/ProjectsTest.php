<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Projects;

require_once __DIR__ . '/helpers.php';

class ProjectsTest extends TestCase {
    public function test_post_create_project_and_run_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'createProjectAndRun'));
    }

    public function test_post_create_project_and_run_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->createProjectAndRun('test_value', true, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_project_and_run_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->createProjectAndRun('test_value', true, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/project_outcome/', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_project_and_run_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->createProjectAndRun('test_value', true, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('outcomes=', $path);
        $this->assertStringContainsString('models=', $path);
    }

    public function test_post_create_project_and_run_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->createProjectAndRun('test_value', true, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('private', $body);
        $this->assertArrayHasKey('type', $body);
        $this->assertArrayHasKey('description', $body);
        $this->assertArrayHasKey('directory', $body);
        $this->assertArrayHasKey('photo_upload_vector', $body);
        $this->assertArrayHasKey('thumbnail', $body);
        $this->assertArrayHasKey('run_name', $body);
    }

    public function test_post_create_project_and_run_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->createProjectAndRun('test_value', true, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_mark_project_upload_complete_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'markProjectUploadComplete'));
    }

    public function test_post_mark_project_upload_complete_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->markProjectUploadComplete('test_value', 'test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_mark_project_upload_complete_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->markProjectUploadComplete('hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/project/hello%20world/upload_complete/', $ctx->client->lastCall()['path']);
    }

    public function test_post_mark_project_upload_complete_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->markProjectUploadComplete('test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('skipped_file_count=', $path);
    }

    public function test_post_mark_project_upload_complete_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->markProjectUploadComplete('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_check_project_status_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'checkProjectStatus'));
    }

    public function test_get_check_project_status_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->checkProjectStatus('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_check_project_status_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->checkProjectStatus('hello world');
        $this->assertStringContainsString('/api/v1/project/status/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_check_project_status_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->checkProjectStatus('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_delete_project_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'deleteProject'));
    }

    public function test_delete_delete_project_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->deleteProject('test_value');
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_delete_project_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->deleteProject('hello world');
        $this->assertStringContainsString('/api/v1/projects/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_project_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->deleteProject('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_project_prelim_model_request_template_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getProjectPrelimModelRequestTemplate'));
    }

    public function test_get_get_project_prelim_model_request_template_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getProjectPrelimModelRequestTemplate('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_project_prelim_model_request_template_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getProjectPrelimModelRequestTemplate('hello world');
        $this->assertStringContainsString('/api/v1/project_outcome/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_project_prelim_model_request_template_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getProjectPrelimModelRequestTemplate('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

}
