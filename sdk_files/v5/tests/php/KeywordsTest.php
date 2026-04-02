<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Keywords;

require_once __DIR__ . '/helpers.php';

class KeywordsTest extends TestCase {
    public function test_get_keyword_user_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeywordUser'));
    }

    public function test_get_keyword_user_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordUser('access_token', 'refresh_token');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_keyword_user_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordUser('access_token', 'refresh_token');
        $this->assertStringContainsString('/api/v1/keyword/user', $spy->lastCall()['path']);
    }

    public function test_get_keyword_user_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordUser('access_token', 'refresh_token');
        $this->assertCount(1, $spy->calls);
    }

    public function test_create_keyword_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'createKeyword'));
    }

    public function test_create_keyword_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->createKeyword('access_token', 'refresh_token', 'test_value', ['item1', 'item2']);
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_create_keyword_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->createKeyword('access_token', 'refresh_token', 'test_value', ['item1', 'item2']);
        $this->assertStringContainsString('/api/v1/keyword/', $spy->lastCall()['path']);
    }

    public function test_create_keyword_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->createKeyword('access_token', 'refresh_token', 'test_value', ['item1', 'item2']);
        $body = $spy->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('project_list', $body);
    }

    public function test_create_keyword_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->createKeyword('access_token', 'refresh_token', 'test_value', ['item1', 'item2']);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_keyword_list_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeywordList'));
    }

    public function test_get_keyword_list_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordList('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_keyword_list_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordList('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/keyword/list/42', $spy->lastCall()['path']);
    }

    public function test_get_keyword_list_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordList('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_keyword_project_default_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeywordProjectDefault'));
    }

    public function test_get_keyword_project_default_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordProjectDefault('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_keyword_project_default_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordProjectDefault('access_token', 'refresh_token', 'hello world');
        $this->assertStringContainsString('/api/v1/keyword/project/hello%20world/default', $spy->lastCall()['path']);
    }

    public function test_get_keyword_project_default_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordProjectDefault('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_keyword_project_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeywordProject'));
    }

    public function test_get_keyword_project_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordProject('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_keyword_project_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordProject('access_token', 'refresh_token', 'hello world');
        $this->assertStringContainsString('/api/v1/keyword/project/hello%20world', $spy->lastCall()['path']);
    }

    public function test_get_keyword_project_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordProject('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_keyword_all_keywords_id_label_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeywordAllKeywordsIdLabel'));
    }

    public function test_get_keyword_all_keywords_id_label_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordAllKeywordsIdLabel('access_token', 'refresh_token');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_keyword_all_keywords_id_label_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordAllKeywordsIdLabel('access_token', 'refresh_token');
        $this->assertStringContainsString('/api/v1/keyword/all_keywords/id/label', $spy->lastCall()['path']);
    }

    public function test_get_keyword_all_keywords_id_label_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordAllKeywordsIdLabel('access_token', 'refresh_token');
        $this->assertCount(1, $spy->calls);
    }

    public function test_update_keyword_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'updateKeyword'));
    }

    public function test_update_keyword_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeyword('access_token', 'refresh_token', 42, ['item1', 'item2'], ['item1', 'item2']);
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_update_keyword_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeyword('access_token', 'refresh_token', 42, ['item1', 'item2'], ['item1', 'item2']);
        $this->assertStringContainsString('/api/v1/keyword/42', $spy->lastCall()['path']);
    }

    public function test_update_keyword_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeyword('access_token', 'refresh_token', 42, ['item1', 'item2'], ['item1', 'item2']);
        $body = $spy->lastCall()['body'];
        $this->assertArrayHasKey('list_keywords_to_include', $body);
        $this->assertArrayHasKey('list_keywords_to_exclude', $body);
    }

    public function test_update_keyword_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeyword('access_token', 'refresh_token', 42, ['item1', 'item2'], ['item1', 'item2']);
        $this->assertCount(1, $spy->calls);
    }

    public function test_update_keyword_details_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'updateKeywordDetails'));
    }

    public function test_update_keyword_details_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeywordDetails('access_token', 'refresh_token', 42, 'test_value');
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_update_keyword_details_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeywordDetails('access_token', 'refresh_token', 42, 'test_value');
        $this->assertStringContainsString('/api/v1/keyword/details/42', $spy->lastCall()['path']);
    }

    public function test_update_keyword_details_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeywordDetails('access_token', 'refresh_token', 42, 'test_value');
        $body = $spy->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
    }

    public function test_update_keyword_details_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->updateKeywordDetails('access_token', 'refresh_token', 42, 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_create_keyword_projects_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'createKeywordProjects'));
    }

    public function test_create_keyword_projects_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->createKeywordProjects('access_token', 'refresh_token', 42, []);
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_create_keyword_projects_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->createKeywordProjects('access_token', 'refresh_token', 42, []);
        $this->assertStringContainsString('/api/v1/keyword/42/projects', $spy->lastCall()['path']);
    }

    public function test_create_keyword_projects_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->createKeywordProjects('access_token', 'refresh_token', 42, []);
        $body = $spy->lastCall()['body'];
        $this->assertNotNull($body);
    }

    public function test_create_keyword_projects_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->createKeywordProjects('access_token', 'refresh_token', 42, []);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_keyword_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeyword'));
    }

    public function test_get_keyword_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeyword('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_keyword_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeyword('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/keyword/42', $spy->lastCall()['path']);
    }

    public function test_get_keyword_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeyword('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_delete_keyword_projects_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'deleteKeywordProjects'));
    }

    public function test_delete_keyword_projects_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->deleteKeywordProjects('access_token', 'refresh_token', 42, []);
        $this->assertSame('DELETE', $spy->lastCall()['method']);
    }

    public function test_delete_keyword_projects_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->deleteKeywordProjects('access_token', 'refresh_token', 42, []);
        $this->assertStringContainsString('/api/v1/keyword/42/projects', $spy->lastCall()['path']);
    }

    public function test_delete_keyword_projects_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->deleteKeywordProjects('access_token', 'refresh_token', 42, []);
        $body = $spy->lastCall()['body'];
        $this->assertNotNull($body);
    }

    public function test_delete_keyword_projects_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->deleteKeywordProjects('access_token', 'refresh_token', 42, []);
        $this->assertCount(1, $spy->calls);
    }

    public function test_delete_keyword_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'deleteKeyword'));
    }

    public function test_delete_keyword_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->deleteKeyword('access_token', 'refresh_token', 42);
        $this->assertSame('DELETE', $spy->lastCall()['method']);
    }

    public function test_delete_keyword_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->deleteKeyword('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/keyword/42', $spy->lastCall()['path']);
    }

    public function test_delete_keyword_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->deleteKeyword('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_keyword_export_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeywordExport'));
    }

    public function test_get_keyword_export_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordExport('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_keyword_export_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordExport('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/keyword/export/42', $spy->lastCall()['path']);
    }

    public function test_get_keyword_export_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordExport('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_keyword_export_status_exists(): void {
        $this->assertTrue(method_exists(Keywords::class, 'getKeywordExportStatus'));
    }

    public function test_get_keyword_export_status_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordExportStatus('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_keyword_export_status_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordExportStatus('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/keyword/export_status/42', $spy->lastCall()['path']);
    }

    public function test_get_keyword_export_status_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Keywords($spy);
        $obj->getKeywordExportStatus('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

}
