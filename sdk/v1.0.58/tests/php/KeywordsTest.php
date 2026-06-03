<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Keywords;

require_once __DIR__ . '/helpers.php';

class KeywordsTest extends TestCase {
    public function test_post_create_keyword_filtering_list_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'createKeywordFilteringList'));
    }

    public function test_post_create_keyword_filtering_list_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->createKeywordFilteringList('test_value', ['item1', 'item2']);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_keyword_filtering_list_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->createKeywordFilteringList('test_value', ['item1', 'item2']);
        $this->assertStringContainsString('/api/v1/keyword/', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_keyword_filtering_list_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->createKeywordFilteringList('test_value', ['item1', 'item2']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('project_list', $body);
    }

    public function test_post_create_keyword_filtering_list_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->createKeywordFilteringList('test_value', ['item1', 'item2']);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_user_keyword_filtering_lists_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getUserKeywordFilteringLists'));
    }

    public function test_get_get_user_keyword_filtering_lists_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getUserKeywordFilteringLists();
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_user_keyword_filtering_lists_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getUserKeywordFilteringLists();
        $this->assertStringContainsString('/api/v1/keyword/user', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_user_keyword_filtering_lists_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getUserKeywordFilteringLists();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_keyword_filtering_list_and_projects_by_id_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeywordFilteringListAndProjectsById'));
    }

    public function test_get_get_keyword_filtering_list_and_projects_by_id_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getKeywordFilteringListAndProjectsById(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_keyword_filtering_list_and_projects_by_id_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getKeywordFilteringListAndProjectsById(42);
        $this->assertStringContainsString('/api/v1/keyword/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_keyword_filtering_list_and_projects_by_id_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getKeywordFilteringListAndProjectsById(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_keyword_filtering_list_by_id_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeywordFilteringListById'));
    }

    public function test_get_get_keyword_filtering_list_by_id_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getKeywordFilteringListById(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_keyword_filtering_list_by_id_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getKeywordFilteringListById(42);
        $this->assertStringContainsString('/api/v1/keyword/list/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_keyword_filtering_list_by_id_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getKeywordFilteringListById(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_existing_keyword_filtering_list_by_project_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getExistingKeywordFilteringListByProject'));
    }

    public function test_get_get_existing_keyword_filtering_list_by_project_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getExistingKeywordFilteringListByProject('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_existing_keyword_filtering_list_by_project_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getExistingKeywordFilteringListByProject('hello world');
        $this->assertStringContainsString('/api/v1/keyword/project/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_existing_keyword_filtering_list_by_project_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getExistingKeywordFilteringListByProject('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_default_keyword_filtering_list_by_project_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getDefaultKeywordFilteringListByProject'));
    }

    public function test_get_get_default_keyword_filtering_list_by_project_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getDefaultKeywordFilteringListByProject('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_default_keyword_filtering_list_by_project_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getDefaultKeywordFilteringListByProject('hello world');
        $this->assertStringContainsString('/api/v1/keyword/project/hello%20world/default', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_default_keyword_filtering_list_by_project_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getDefaultKeywordFilteringListByProject('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_keyword_filtering_list_labels_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'updateKeywordFilteringListLabels'));
    }

    public function test_put_update_keyword_filtering_list_labels_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->updateKeywordFilteringListLabels(42, ['item1', 'item2'], ['item1', 'item2']);
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_keyword_filtering_list_labels_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->updateKeywordFilteringListLabels(42, ['item1', 'item2'], ['item1', 'item2']);
        $this->assertStringContainsString('/api/v1/keyword/42', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_keyword_filtering_list_labels_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->updateKeywordFilteringListLabels(42, ['item1', 'item2'], ['item1', 'item2']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('list_keywords_to_include', $body);
        $this->assertArrayHasKey('list_keywords_to_exclude', $body);
    }

    public function test_put_update_keyword_filtering_list_labels_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->updateKeywordFilteringListLabels(42, ['item1', 'item2'], ['item1', 'item2']);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_keyword_filtering_list_details_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'updateKeywordFilteringListDetails'));
    }

    public function test_put_update_keyword_filtering_list_details_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->updateKeywordFilteringListDetails(42, 'test_value', ['item1', 'item2']);
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_keyword_filtering_list_details_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->updateKeywordFilteringListDetails(42, 'test_value', ['item1', 'item2']);
        $this->assertStringContainsString('/api/v1/keyword/details/42', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_keyword_filtering_list_details_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->updateKeywordFilteringListDetails(42, 'test_value', ['item1', 'item2']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('project_list', $body);
    }

    public function test_put_update_keyword_filtering_list_details_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->updateKeywordFilteringListDetails(42, 'test_value', ['item1', 'item2']);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_add_projects_to_keyword_filtering_list_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'addProjectsToKeywordFilteringList'));
    }

    public function test_post_add_projects_to_keyword_filtering_list_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->addProjectsToKeywordFilteringList(42, 'test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_add_projects_to_keyword_filtering_list_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->addProjectsToKeywordFilteringList(42, 'test_value');
        $this->assertStringContainsString('/api/v1/keyword/42/projects', $ctx->client->lastCall()['path']);
    }

    public function test_post_add_projects_to_keyword_filtering_list_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->addProjectsToKeywordFilteringList(42, 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('project_ids=', $path);
    }

    public function test_post_add_projects_to_keyword_filtering_list_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->addProjectsToKeywordFilteringList(42, 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_request_keyword_list_export_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'requestKeywordListExport'));
    }

    public function test_get_request_keyword_list_export_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->requestKeywordListExport(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_request_keyword_list_export_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->requestKeywordListExport(42);
        $this->assertStringContainsString('/api/v1/keyword/export/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_request_keyword_list_export_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->requestKeywordListExport(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_request_keyword_list_export_status_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'requestKeywordListExportStatus'));
    }

    public function test_get_request_keyword_list_export_status_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->requestKeywordListExportStatus(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_request_keyword_list_export_status_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->requestKeywordListExportStatus(42);
        $this->assertStringContainsString('/api/v1/keyword/export_status/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_request_keyword_list_export_status_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->requestKeywordListExportStatus(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_keywords_and_ids_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeywordsAndIds'));
    }

    public function test_get_get_keywords_and_ids_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getKeywordsAndIds();
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_keywords_and_ids_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getKeywordsAndIds();
        $this->assertStringContainsString('/api/v1/keyword/all_keywords/id/label', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_keywords_and_ids_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->getKeywordsAndIds();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_remove_projects_from_keyword_filtering_list_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'removeProjectsFromKeywordFilteringList'));
    }

    public function test_delete_remove_projects_from_keyword_filtering_list_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->removeProjectsFromKeywordFilteringList(42, 'test_value');
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_remove_projects_from_keyword_filtering_list_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->removeProjectsFromKeywordFilteringList(42, 'test_value');
        $this->assertStringContainsString('/api/v1/keyword/42/projects', $ctx->client->lastCall()['path']);
    }

    public function test_delete_remove_projects_from_keyword_filtering_list_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->removeProjectsFromKeywordFilteringList(42, 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('project_ids=', $path);
    }

    public function test_delete_remove_projects_from_keyword_filtering_list_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->removeProjectsFromKeywordFilteringList(42, 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_delete_keyword_filtering_list_by_id_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'deleteKeywordFilteringListById'));
    }

    public function test_delete_delete_keyword_filtering_list_by_id_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->deleteKeywordFilteringListById(42);
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_delete_keyword_filtering_list_by_id_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->deleteKeywordFilteringListById(42);
        $this->assertStringContainsString('/api/v1/keyword/42', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_keyword_filtering_list_by_id_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Keywords($ctx);
        $obj->deleteKeywordFilteringListById(42);
        $this->assertCount(1, $ctx->client->calls);
    }

}
