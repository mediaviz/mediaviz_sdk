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

    public function test_get_get_user_projects_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getUserProjects'));
    }

    public function test_get_get_user_projects_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getUserProjects();
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_user_projects_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getUserProjects();
        $this->assertStringContainsString('/api/v1/projects/user', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_user_projects_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getUserProjects();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_admin_projects_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getAdminProjects'));
    }

    public function test_get_get_admin_projects_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getAdminProjects();
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_admin_projects_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getAdminProjects();
        $this->assertStringContainsString('/api/v1/projects/admin', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_admin_projects_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getAdminProjects();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_all_user_projects_admin_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getAllUserProjectsAdmin'));
    }

    public function test_get_get_all_user_projects_admin_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getAllUserProjectsAdmin(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_all_user_projects_admin_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getAllUserProjectsAdmin(42);
        $this->assertStringContainsString('/api/v1/projects/admin/user/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_all_user_projects_admin_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getAllUserProjectsAdmin(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_project_by_id_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getProjectById'));
    }

    public function test_get_get_project_by_id_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getProjectById('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_project_by_id_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getProjectById('hello world');
        $this->assertStringContainsString('/api/v1/projects/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_project_by_id_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getProjectById('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_project_by_directory_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getProjectByDirectory'));
    }

    public function test_get_get_project_by_directory_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getProjectByDirectory('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_project_by_directory_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getProjectByDirectory('hello world');
        $this->assertStringContainsString('/api/v1/projects/directory/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_project_by_directory_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getProjectByDirectory('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_project_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'updateProject'));
    }

    public function test_put_update_project_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProject('test_value', true, 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_project_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProject('hello world', true, 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/projects/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_project_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProject('test_value', true, 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('private', $body);
        $this->assertArrayHasKey('type', $body);
        $this->assertArrayHasKey('description', $body);
        $this->assertArrayHasKey('directory', $body);
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('thumbnail', $body);
    }

    public function test_put_update_project_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProject('test_value', true, 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_project_photo_count_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'updateProjectPhotoCount'));
    }

    public function test_put_update_project_photo_count_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProjectPhotoCount('test_value', 'test_value');
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_project_photo_count_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProjectPhotoCount('hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/projects_photos/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_project_photo_count_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProjectPhotoCount('test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('files_failed_count=', $path);
    }

    public function test_put_update_project_photo_count_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProjectPhotoCount('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_project_create_upload_report_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'updateProjectCreateUploadReport'));
    }

    public function test_put_update_project_create_upload_report_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProjectCreateUploadReport('test_value', 'test_value');
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_project_create_upload_report_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProjectCreateUploadReport('hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/project_upload_report/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_project_create_upload_report_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProjectCreateUploadReport('test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('files_failed_count=', $path);
    }

    public function test_put_update_project_create_upload_report_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProjectCreateUploadReport('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_request_project_similarity_queue_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'requestProjectSimilarityQueue'));
    }

    public function test_get_request_project_similarity_queue_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectSimilarityQueue('test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_request_project_similarity_queue_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectSimilarityQueue('hello world', 'hello world');
        $this->assertStringContainsString('/api/v1/projects_similarity_queue/hello%20world/level/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_request_project_similarity_queue_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectSimilarityQueue('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_request_project_evidence_queue_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'requestProjectEvidenceQueue'));
    }

    public function test_get_request_project_evidence_queue_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectEvidenceQueue('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_request_project_evidence_queue_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectEvidenceQueue('hello world');
        $this->assertStringContainsString('/api/v1/projects_evidence_queue/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_request_project_evidence_queue_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectEvidenceQueue('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_request_project_personhood_queue_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'requestProjectPersonhoodQueue'));
    }

    public function test_get_request_project_personhood_queue_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectPersonhoodQueue('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_request_project_personhood_queue_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectPersonhoodQueue('hello world');
        $this->assertStringContainsString('/api/v1/projects_personhood_queue/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_request_project_personhood_queue_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectPersonhoodQueue('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_request_insights_queue_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'requestInsightsQueue'));
    }

    public function test_get_request_insights_queue_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestInsightsQueue('test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_request_insights_queue_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestInsightsQueue('hello world', 'hello world');
        $this->assertStringContainsString('/api/v1/insights_queue/analysis_level/hello%20world/identifier/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_request_insights_queue_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestInsightsQueue('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_request_project_export_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'requestProjectExport'));
    }

    public function test_get_request_project_export_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectExport('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_request_project_export_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectExport('hello world');
        $this->assertStringContainsString('/api/v1/projects_export/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_request_project_export_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectExport('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_request_project_admin_export_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'requestProjectAdminExport'));
    }

    public function test_get_request_project_admin_export_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectAdminExport('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_request_project_admin_export_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectAdminExport('hello world');
        $this->assertStringContainsString('/api/v1/projects_admin_export/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_request_project_admin_export_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->requestProjectAdminExport('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_project_data_export_upload_status_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'getProjectDataExportUploadStatus'));
    }

    public function test_get_get_project_data_export_upload_status_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getProjectDataExportUploadStatus('test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_project_data_export_upload_status_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getProjectDataExportUploadStatus('hello world', 'hello world');
        $this->assertStringContainsString('/api/v1/projects/hello%20world/upload_status/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_project_data_export_upload_status_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->getProjectDataExportUploadStatus('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_add_project_event_exists(): void {
        $this->assertTrue(method_exists(Projects::class, 'addProjectEvent'));
    }

    public function test_post_add_project_event_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->addProjectEvent('test_value', 'test_value', 'test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_add_project_event_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->addProjectEvent('hello world', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/projects/hello%20world/event', $ctx->client->lastCall()['path']);
    }

    public function test_post_add_project_event_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->addProjectEvent('test_value', 'test_value', 'test_value');
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('event', $body);
        $this->assertArrayHasKey('detail', $body);
    }

    public function test_post_add_project_event_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->addProjectEvent('test_value', 'test_value', 'test_value');
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

}
