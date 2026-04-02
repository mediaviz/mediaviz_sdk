<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Projects;

require_once __DIR__ . '/helpers.php';

class ProjectsTest extends TestCase {
    public function test_get_projects_user_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getProjectsUser'));
    }

    public function test_get_projects_user_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectsUser('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_projects_user_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectsUser('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/projects/user', $spy->lastCall()['path']);
    }

    public function test_get_projects_user_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectsUser('access_token', 'refresh_token', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('company_id=', $path);
    }

    public function test_get_projects_user_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectsUser('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_projects_directory_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getProjectsDirectory'));
    }

    public function test_get_projects_directory_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectsDirectory('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_projects_directory_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectsDirectory('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/projects/directory/test_value', $spy->lastCall()['path']);
    }

    public function test_get_projects_directory_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectsDirectory('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_projects_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getProjects'));
    }

    public function test_get_projects_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjects('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_projects_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjects('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/projects/42', $spy->lastCall()['path']);
    }

    public function test_get_projects_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjects('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_create_project_outcome_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'createProjectOutcome'));
    }

    public function test_create_project_outcome_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectOutcome('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_create_project_outcome_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectOutcome('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/project_outcome/', $spy->lastCall()['path']);
    }

    public function test_create_project_outcome_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectOutcome('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('outcomes=', $path);
        $this->assertStringContainsString('models=', $path);
    }

    public function test_create_project_outcome_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectOutcome('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $body = $spy->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('description', $body);
        $this->assertArrayHasKey('thumbnail', $body);
        $this->assertArrayHasKey('photo_upload_vector', $body);
    }

    public function test_create_project_outcome_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectOutcome('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_update_projects_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'updateProjects'));
    }

    public function test_update_projects_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjects('access_token', 'refresh_token', 42, []);
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_update_projects_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjects('access_token', 'refresh_token', 42, []);
        $this->assertStringContainsString('/api/v1/projects/42', $spy->lastCall()['path']);
    }

    public function test_update_projects_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjects('access_token', 'refresh_token', 42, []);
        $body = $spy->lastCall()['body'];
        $this->assertNotNull($body);
    }

    public function test_update_projects_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjects('access_token', 'refresh_token', 42, []);
        $this->assertCount(1, $spy->calls);
    }

    public function test_update_projects_photos_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'updateProjectsPhotos'));
    }

    public function test_update_projects_photos_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjectsPhotos('access_token', 'refresh_token', 'test_value');
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_update_projects_photos_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjectsPhotos('access_token', 'refresh_token', 'hello world');
        $this->assertStringContainsString('/api/v1/projects_photos/hello%20world', $spy->lastCall()['path']);
    }

    public function test_update_projects_photos_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjectsPhotos('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_delete_projects_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'deleteProjects'));
    }

    public function test_delete_projects_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->deleteProjects('access_token', 'refresh_token', 42);
        $this->assertSame('DELETE', $spy->lastCall()['method']);
    }

    public function test_delete_projects_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->deleteProjects('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/projects/42', $spy->lastCall()['path']);
    }

    public function test_delete_projects_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->deleteProjects('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_create_projects_event_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'createProjectsEvent'));
    }

    public function test_create_projects_event_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectsEvent('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_create_projects_event_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectsEvent('access_token', 'refresh_token', 'hello world', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/projects/hello%20world/event', $spy->lastCall()['path']);
    }

    public function test_create_projects_event_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectsEvent('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
        $body = $spy->lastCall()['body'];
        $this->assertArrayHasKey('event', $body);
        $this->assertArrayHasKey('detail', $body);
    }

    public function test_create_projects_event_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->createProjectsEvent('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
