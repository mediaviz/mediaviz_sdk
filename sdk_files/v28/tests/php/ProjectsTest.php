<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Projects;

require_once __DIR__ . '/helpers.php';

class ProjectsTest extends TestCase {
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

    public function test_get_get_project_data_export_upload_status_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getProjectDataExportUploadStatus'));
    }

    public function test_get_get_project_data_export_upload_status_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectDataExportUploadStatus('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_project_data_export_upload_status_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectDataExportUploadStatus('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/projects/test_value/upload_status/test_value', $spy->lastCall()['path']);
    }

    public function test_get_get_project_data_export_upload_status_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectDataExportUploadStatus('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_request_project_export_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'requestProjectExport'));
    }

    public function test_get_request_project_export_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->requestProjectExport('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_request_project_export_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->requestProjectExport('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/projects_export/test_value', $spy->lastCall()['path']);
    }

    public function test_get_request_project_export_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->requestProjectExport('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_user_projects_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getUserProjects'));
    }

    public function test_get_get_user_projects_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getUserProjects('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_user_projects_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getUserProjects('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/projects/user', $spy->lastCall()['path']);
    }

    public function test_get_get_user_projects_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getUserProjects('access_token', 'refresh_token', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('company_id=', $path);
    }

    public function test_get_get_user_projects_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getUserProjects('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_project_by_directory_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getProjectByDirectory'));
    }

    public function test_get_get_project_by_directory_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectByDirectory('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_project_by_directory_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectByDirectory('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/projects/directory/test_value', $spy->lastCall()['path']);
    }

    public function test_get_get_project_by_directory_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectByDirectory('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_project_by_id_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getProjectById'));
    }

    public function test_get_get_project_by_id_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectById('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_project_by_id_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectById('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/projects/test_value', $spy->lastCall()['path']);
    }

    public function test_get_get_project_by_id_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->getProjectById('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

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

    public function test_put_update_project_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'updateProject'));
    }

    public function test_put_update_project_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProject('access_token', 'refresh_token', 'test_value', ['Model' => 'test_value']);
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_put_update_project_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProject('access_token', 'refresh_token', 'test_value', ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/projects/test_value', $spy->lastCall()['path']);
    }

    public function test_put_update_project_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProject('access_token', 'refresh_token', 'test_value', ['Model' => 'test_value']);
        $body = $spy->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_put_update_project_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProject('access_token', 'refresh_token', 'test_value', ['Model' => 'test_value']);
        $this->assertCount(1, $spy->calls);
    }

    public function test_put_update_project_photo_count_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'updateProjectPhotoCount'));
    }

    public function test_put_update_project_photo_count_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjectPhotoCount('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_put_update_project_photo_count_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjectPhotoCount('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/projects_photos/test_value/', $spy->lastCall()['path']);
    }

    public function test_put_update_project_photo_count_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjectPhotoCount('access_token', 'refresh_token', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('files_failed_count=', $path);
    }

    public function test_put_update_project_photo_count_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjectPhotoCount('access_token', 'refresh_token', 'test_value', 'test_value');
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

    public function test_post_add_project_event_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'addProjectEvent'));
    }

    public function test_post_add_project_event_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->addProjectEvent('access_token', 'refresh_token', 'test_value', ['Model' => 'test_value']);
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_post_add_project_event_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->addProjectEvent('access_token', 'refresh_token', 'test_value', ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/projects/test_value/event', $spy->lastCall()['path']);
    }

    public function test_post_add_project_event_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->addProjectEvent('access_token', 'refresh_token', 'test_value', ['Model' => 'test_value']);
        $body = $spy->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_post_add_project_event_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->addProjectEvent('access_token', 'refresh_token', 'test_value', ['Model' => 'test_value']);
        $this->assertCount(1, $spy->calls);
    }

    public function test_put_update_project_create_upload_report_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'updateProjectCreateUploadReport'));
    }

    public function test_put_update_project_create_upload_report_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjectCreateUploadReport('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_put_update_project_create_upload_report_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjectCreateUploadReport('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/project_upload_report/test_value/', $spy->lastCall()['path']);
    }

    public function test_put_update_project_create_upload_report_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjectCreateUploadReport('access_token', 'refresh_token', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('files_failed_count=', $path);
    }

    public function test_put_update_project_create_upload_report_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Projects($spy);
        $obj->updateProjectCreateUploadReport('access_token', 'refresh_token', 'test_value', 'test_value');
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
