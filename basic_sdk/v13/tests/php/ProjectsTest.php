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
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectAndRun('access_token', 'refresh_token', ['Model' => 'test_value'], 'test_value', 'test_value');
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_post_create_project_and_run_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectAndRun('access_token', 'refresh_token', ['Model' => 'test_value'], 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/project_outcome/', $spy->lastCall()['path']);
    }

    public function test_post_create_project_and_run_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectAndRun('access_token', 'refresh_token', ['Model' => 'test_value'], 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('outcomes=', $path);
        $this->assertStringContainsString('models=', $path);
    }

    public function test_post_create_project_and_run_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectAndRun('access_token', 'refresh_token', ['Model' => 'test_value'], 'test_value', 'test_value');
        $body = $spy->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_post_create_project_and_run_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectAndRun('access_token', 'refresh_token', ['Model' => 'test_value'], 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_post_mark_project_upload_complete_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'markProjectUploadComplete'));
    }

    public function test_post_mark_project_upload_complete_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->markProjectUploadComplete('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_post_mark_project_upload_complete_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->markProjectUploadComplete('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/project/test_value/upload_complete/', $spy->lastCall()['path']);
    }

    public function test_post_mark_project_upload_complete_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->markProjectUploadComplete('access_token', 'refresh_token', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('skipped_file_count=', $path);
    }

    public function test_post_mark_project_upload_complete_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->markProjectUploadComplete('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_check_project_status_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'checkProjectStatus'));
    }

    public function test_get_check_project_status_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->checkProjectStatus('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_check_project_status_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->checkProjectStatus('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/project/status/test_value', $spy->lastCall()['path']);
    }

    public function test_get_check_project_status_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->checkProjectStatus('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_delete_delete_project_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'deleteProject'));
    }

    public function test_delete_delete_project_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->deleteProject('access_token', 'refresh_token', 'test_value');
        $this->assertSame('DELETE', $spy->lastCall()['method']);
    }

    public function test_delete_delete_project_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->deleteProject('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/projects/test_value', $spy->lastCall()['path']);
    }

    public function test_delete_delete_project_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->deleteProject('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_project_prelim_model_request_template_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getProjectPrelimModelRequestTemplate'));
    }

    public function test_get_get_project_prelim_model_request_template_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectPrelimModelRequestTemplate('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_project_prelim_model_request_template_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectPrelimModelRequestTemplate('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/project_outcome/test_value', $spy->lastCall()['path']);
    }

    public function test_get_get_project_prelim_model_request_template_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectPrelimModelRequestTemplate('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
