<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Admin;

require_once __DIR__ . '/helpers.php';

class AdminTest extends TestCase {
    public function test_get_get_category_labels_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'getCategoryLabels'));
    }

    public function test_get_get_category_labels_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getCategoryLabels('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_category_labels_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getCategoryLabels('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/admin/category_labels/test_value', $spy->lastCall()['path']);
    }

    public function test_get_get_category_labels_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getCategoryLabels('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_all_keyword_groups_and_subgroups_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'getAllKeywordGroupsAndSubgroups'));
    }

    public function test_get_get_all_keyword_groups_and_subgroups_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getAllKeywordGroupsAndSubgroups('access_token', 'refresh_token');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_all_keyword_groups_and_subgroups_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getAllKeywordGroupsAndSubgroups('access_token', 'refresh_token');
        $this->assertStringContainsString('/api/v1/admin/keyword_group', $spy->lastCall()['path']);
    }

    public function test_get_get_all_keyword_groups_and_subgroups_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getAllKeywordGroupsAndSubgroups('access_token', 'refresh_token');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_keyword_groups_labels_by_keyword_group_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'getKeywordGroupsLabelsByKeywordGroup'));
    }

    public function test_get_get_keyword_groups_labels_by_keyword_group_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getKeywordGroupsLabelsByKeywordGroup('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_keyword_groups_labels_by_keyword_group_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getKeywordGroupsLabelsByKeywordGroup('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/admin/keyword_group/test_value/', $spy->lastCall()['path']);
    }

    public function test_get_get_keyword_groups_labels_by_keyword_group_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getKeywordGroupsLabelsByKeywordGroup('access_token', 'refresh_token', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('subgroup=', $path);
    }

    public function test_get_get_keyword_groups_labels_by_keyword_group_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getKeywordGroupsLabelsByKeywordGroup('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_post_get_google_sheets_credentials_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'getGoogleSheetsCredentials'));
    }

    public function test_post_get_google_sheets_credentials_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getGoogleSheetsCredentials('access_token', 'refresh_token');
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_post_get_google_sheets_credentials_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getGoogleSheetsCredentials('access_token', 'refresh_token');
        $this->assertStringContainsString('/api/v1/admin/get_google_sheets_credentials', $spy->lastCall()['path']);
    }

    public function test_post_get_google_sheets_credentials_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Admin($spy);
        $obj->getGoogleSheetsCredentials('access_token', 'refresh_token');
        $this->assertCount(1, $spy->calls);
    }

}
