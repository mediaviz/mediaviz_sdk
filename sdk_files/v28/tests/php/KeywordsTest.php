<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Keywords;

require_once __DIR__ . '/helpers.php';

class KeywordsTest extends TestCase {
    public function test_get_get_user_keyword_filtering_lists_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getUserKeywordFilteringLists'));
    }

    public function test_get_get_user_keyword_filtering_lists_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getUserKeywordFilteringLists('access_token', 'refresh_token');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_user_keyword_filtering_lists_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getUserKeywordFilteringLists('access_token', 'refresh_token');
        $this->assertStringContainsString('/api/v1/keyword/user', $spy->lastCall()['path']);
    }

    public function test_get_get_user_keyword_filtering_lists_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getUserKeywordFilteringLists('access_token', 'refresh_token');
        $this->assertCount(1, $spy->calls);
    }

    public function test_post_create_keyword_filtering_list_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'createKeywordFilteringList'));
    }

    public function test_post_create_keyword_filtering_list_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->createKeywordFilteringList('access_token', 'refresh_token', ['Model' => 'test_value']);
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_post_create_keyword_filtering_list_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->createKeywordFilteringList('access_token', 'refresh_token', ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/keyword/', $spy->lastCall()['path']);
    }

    public function test_post_create_keyword_filtering_list_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->createKeywordFilteringList('access_token', 'refresh_token', ['Model' => 'test_value']);
        $body = $spy->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_post_create_keyword_filtering_list_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->createKeywordFilteringList('access_token', 'refresh_token', ['Model' => 'test_value']);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_keyword_filtering_list_by_id_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeywordFilteringListById'));
    }

    public function test_get_get_keyword_filtering_list_by_id_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordFilteringListById('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_keyword_filtering_list_by_id_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordFilteringListById('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/keyword/list/42', $spy->lastCall()['path']);
    }

    public function test_get_get_keyword_filtering_list_by_id_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordFilteringListById('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_default_keyword_filtering_list_by_project_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getDefaultKeywordFilteringListByProject'));
    }

    public function test_get_get_default_keyword_filtering_list_by_project_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getDefaultKeywordFilteringListByProject('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_default_keyword_filtering_list_by_project_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getDefaultKeywordFilteringListByProject('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/keyword/project/test_value/default', $spy->lastCall()['path']);
    }

    public function test_get_get_default_keyword_filtering_list_by_project_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getDefaultKeywordFilteringListByProject('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_existing_keyword_filtering_list_by_project_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getExistingKeywordFilteringListByProject'));
    }

    public function test_get_get_existing_keyword_filtering_list_by_project_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getExistingKeywordFilteringListByProject('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_existing_keyword_filtering_list_by_project_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getExistingKeywordFilteringListByProject('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/keyword/project/test_value', $spy->lastCall()['path']);
    }

    public function test_get_get_existing_keyword_filtering_list_by_project_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getExistingKeywordFilteringListByProject('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_keywords_and_ids_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeywordsAndIds'));
    }

    public function test_get_get_keywords_and_ids_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordsAndIds('access_token', 'refresh_token');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_keywords_and_ids_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordsAndIds('access_token', 'refresh_token');
        $this->assertStringContainsString('/api/v1/keyword/all_keywords/id/label', $spy->lastCall()['path']);
    }

    public function test_get_get_keywords_and_ids_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordsAndIds('access_token', 'refresh_token');
        $this->assertCount(1, $spy->calls);
    }

    public function test_put_update_keyword_filtering_list_labels_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'updateKeywordFilteringListLabels'));
    }

    public function test_put_update_keyword_filtering_list_labels_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeywordFilteringListLabels('access_token', 'refresh_token', 42, 42, ['Model' => 'test_value']);
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_put_update_keyword_filtering_list_labels_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeywordFilteringListLabels('access_token', 'refresh_token', 42, 42, ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/keyword/42', $spy->lastCall()['path']);
    }

    public function test_put_update_keyword_filtering_list_labels_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeywordFilteringListLabels('access_token', 'refresh_token', 42, 42, ['Model' => 'test_value']);
        $body = $spy->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_put_update_keyword_filtering_list_labels_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeywordFilteringListLabels('access_token', 'refresh_token', 42, 42, ['Model' => 'test_value']);
        $this->assertCount(1, $spy->calls);
    }

    public function test_put_update_keyword_filtering_list_details_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'updateKeywordFilteringListDetails'));
    }

    public function test_put_update_keyword_filtering_list_details_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeywordFilteringListDetails('access_token', 'refresh_token', 42, 42, ['Model' => 'test_value']);
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_put_update_keyword_filtering_list_details_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeywordFilteringListDetails('access_token', 'refresh_token', 42, 42, ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/keyword/details/42', $spy->lastCall()['path']);
    }

    public function test_put_update_keyword_filtering_list_details_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeywordFilteringListDetails('access_token', 'refresh_token', 42, 42, ['Model' => 'test_value']);
        $body = $spy->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_put_update_keyword_filtering_list_details_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeywordFilteringListDetails('access_token', 'refresh_token', 42, 42, ['Model' => 'test_value']);
        $this->assertCount(1, $spy->calls);
    }

    public function test_post_add_project_to_keyword_filtering_list_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'addProjectToKeywordFilteringList'));
    }

    public function test_post_add_project_to_keyword_filtering_list_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->addProjectToKeywordFilteringList('access_token', 'refresh_token', 42, [], 'test_value');
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_post_add_project_to_keyword_filtering_list_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->addProjectToKeywordFilteringList('access_token', 'refresh_token', 42, [], 'test_value');
        $this->assertStringContainsString('/api/v1/keyword/42/projects', $spy->lastCall()['path']);
    }

    public function test_post_add_project_to_keyword_filtering_list_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->addProjectToKeywordFilteringList('access_token', 'refresh_token', 42, [], 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('project_ids=', $path);
    }

    public function test_post_add_project_to_keyword_filtering_list_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->addProjectToKeywordFilteringList('access_token', 'refresh_token', 42, [], 'test_value');
        $body = $spy->lastCall()['body'];
        $this->assertNotNull($body);
    }

    public function test_post_add_project_to_keyword_filtering_list_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->addProjectToKeywordFilteringList('access_token', 'refresh_token', 42, [], 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_keyword_filtering_list_and_projects_by_id_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeywordFilteringListAndProjectsById'));
    }

    public function test_get_get_keyword_filtering_list_and_projects_by_id_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordFilteringListAndProjectsById('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_keyword_filtering_list_and_projects_by_id_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordFilteringListAndProjectsById('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/keyword/42', $spy->lastCall()['path']);
    }

    public function test_get_get_keyword_filtering_list_and_projects_by_id_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordFilteringListAndProjectsById('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_delete_remove_projects_from_keyword_filtering_list_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'removeProjectsFromKeywordFilteringList'));
    }

    public function test_delete_remove_projects_from_keyword_filtering_list_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->removeProjectsFromKeywordFilteringList('access_token', 'refresh_token', 42, [], 'test_value');
        $this->assertSame('DELETE', $spy->lastCall()['method']);
    }

    public function test_delete_remove_projects_from_keyword_filtering_list_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->removeProjectsFromKeywordFilteringList('access_token', 'refresh_token', 42, [], 'test_value');
        $this->assertStringContainsString('/api/v1/keyword/42/projects', $spy->lastCall()['path']);
    }

    public function test_delete_remove_projects_from_keyword_filtering_list_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->removeProjectsFromKeywordFilteringList('access_token', 'refresh_token', 42, [], 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('project_ids=', $path);
    }

    public function test_delete_remove_projects_from_keyword_filtering_list_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->removeProjectsFromKeywordFilteringList('access_token', 'refresh_token', 42, [], 'test_value');
        $body = $spy->lastCall()['body'];
        $this->assertNotNull($body);
    }

    public function test_delete_remove_projects_from_keyword_filtering_list_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->removeProjectsFromKeywordFilteringList('access_token', 'refresh_token', 42, [], 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_delete_delete_keyword_filtering_list_by_id_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'deleteKeywordFilteringListById'));
    }

    public function test_delete_delete_keyword_filtering_list_by_id_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->deleteKeywordFilteringListById('access_token', 'refresh_token', 42);
        $this->assertSame('DELETE', $spy->lastCall()['method']);
    }

    public function test_delete_delete_keyword_filtering_list_by_id_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->deleteKeywordFilteringListById('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/keyword/42', $spy->lastCall()['path']);
    }

    public function test_delete_delete_keyword_filtering_list_by_id_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->deleteKeywordFilteringListById('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_request_keyword_list_export_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'requestKeywordListExport'));
    }

    public function test_get_request_keyword_list_export_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->requestKeywordListExport('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_request_keyword_list_export_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->requestKeywordListExport('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/keyword/export/42', $spy->lastCall()['path']);
    }

    public function test_get_request_keyword_list_export_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->requestKeywordListExport('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_request_keyword_list_export_status_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'requestKeywordListExportStatus'));
    }

    public function test_get_request_keyword_list_export_status_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->requestKeywordListExportStatus('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_request_keyword_list_export_status_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->requestKeywordListExportStatus('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/keyword/export_status/42', $spy->lastCall()['path']);
    }

    public function test_get_request_keyword_list_export_status_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->requestKeywordListExportStatus('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

}
