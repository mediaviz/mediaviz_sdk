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
        $obj->createProjectAndRun(['Model' => 'test_value'], 'test_value', 'test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_project_and_run_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->createProjectAndRun(['Model' => 'test_value'], 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/project_outcome/', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_project_and_run_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->createProjectAndRun(['Model' => 'test_value'], 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('outcomes=', $path);
        $this->assertStringContainsString('models=', $path);
    }

    public function test_post_create_project_and_run_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->createProjectAndRun(['Model' => 'test_value'], 'test_value', 'test_value');
        $body = $ctx->client->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_post_create_project_and_run_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->createProjectAndRun(['Model' => 'test_value'], 'test_value', 'test_value');
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
        $obj->markProjectUploadComplete('test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/project/test_value/upload_complete/', $ctx->client->lastCall()['path']);
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
        $obj->checkProjectStatus('test_value');
        $this->assertStringContainsString('/api/v1/project/status/test_value', $ctx->client->lastCall()['path']);
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
        $obj->getProjectPrelimModelRequestTemplate('test_value');
        $this->assertStringContainsString('/api/v1/project_outcome/test_value', $ctx->client->lastCall()['path']);
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
        $obj->getProjectById('test_value');
        $this->assertStringContainsString('/api/v1/projects/test_value', $ctx->client->lastCall()['path']);
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
        $obj->getProjectByDirectory('test_value');
        $this->assertStringContainsString('/api/v1/projects/directory/test_value', $ctx->client->lastCall()['path']);
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
        $obj->updateProject('test_value', ['Model' => 'test_value']);
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_project_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProject('test_value', ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/projects/test_value', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_project_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProject('test_value', ['Model' => 'test_value']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_put_update_project_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->updateProject('test_value', ['Model' => 'test_value']);
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
        $obj->updateProjectPhotoCount('test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/projects_photos/test_value/', $ctx->client->lastCall()['path']);
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
        $obj->updateProjectCreateUploadReport('test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/project_upload_report/test_value/', $ctx->client->lastCall()['path']);
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
        $obj->requestProjectSimilarityQueue('test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/projects_similarity_queue/test_value/level/test_value', $ctx->client->lastCall()['path']);
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
        $obj->requestProjectEvidenceQueue('test_value');
        $this->assertStringContainsString('/api/v1/projects_evidence_queue/test_value', $ctx->client->lastCall()['path']);
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
        $obj->requestProjectPersonhoodQueue('test_value');
        $this->assertStringContainsString('/api/v1/projects_personhood_queue/test_value', $ctx->client->lastCall()['path']);
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
        $obj->requestInsightsQueue('test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/insights_queue/analysis_level/test_value/identifier/test_value', $ctx->client->lastCall()['path']);
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
        $obj->requestProjectExport('test_value');
        $this->assertStringContainsString('/api/v1/projects_export/test_value', $ctx->client->lastCall()['path']);
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
        $obj->requestProjectAdminExport('test_value');
        $this->assertStringContainsString('/api/v1/projects_admin_export/test_value', $ctx->client->lastCall()['path']);
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
        $obj->getProjectDataExportUploadStatus('test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/projects/test_value/upload_status/test_value', $ctx->client->lastCall()['path']);
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
        $obj->addProjectEvent('test_value', ['Model' => 'test_value']);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_add_project_event_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->addProjectEvent('test_value', ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/projects/test_value/event', $ctx->client->lastCall()['path']);
    }

    public function test_post_add_project_event_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->addProjectEvent('test_value', ['Model' => 'test_value']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_post_add_project_event_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->addProjectEvent('test_value', ['Model' => 'test_value']);
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
        $obj->deleteProject('test_value');
        $this->assertStringContainsString('/api/v1/projects/test_value', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_project_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Projects($ctx);
        $obj->deleteProject('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

}
