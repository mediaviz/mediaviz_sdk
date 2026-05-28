<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Admin;

require_once __DIR__ . '/helpers.php';

class AdminTest extends TestCase {
    public function test_get_insert_label_category_matrix_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'insertLabelCategoryMatrix'));
    }

    public function test_get_insert_label_category_matrix_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->insertLabelCategoryMatrix();
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_insert_label_category_matrix_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->insertLabelCategoryMatrix();
        $this->assertStringContainsString('/api/v1/admin/insert_label_category_matrix', $ctx->client->lastCall()['path']);
    }

    public function test_get_insert_label_category_matrix_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->insertLabelCategoryMatrix();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_generate_mid_level_category_keyword_alignment_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'generateMidLevelCategoryKeywordAlignment'));
    }

    public function test_get_generate_mid_level_category_keyword_alignment_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->generateMidLevelCategoryKeywordAlignment();
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_generate_mid_level_category_keyword_alignment_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->generateMidLevelCategoryKeywordAlignment();
        $this->assertStringContainsString('/api/v1/admin/generate_mid_level_category_keyword_alignment', $ctx->client->lastCall()['path']);
    }

    public function test_get_generate_mid_level_category_keyword_alignment_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->generateMidLevelCategoryKeywordAlignment();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_category_labels_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'getCategoryLabels'));
    }

    public function test_get_get_category_labels_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->getCategoryLabels('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_category_labels_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->getCategoryLabels('hello world');
        $this->assertStringContainsString('/api/v1/admin/category_labels/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_category_labels_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->getCategoryLabels('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_admin_dump_company_nlp_index_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'adminDumpCompanyNlpIndex'));
    }

    public function test_get_admin_dump_company_nlp_index_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminDumpCompanyNlpIndex(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_admin_dump_company_nlp_index_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminDumpCompanyNlpIndex(42);
        $this->assertStringContainsString('/api/v1/admin/dump_company_nlp_index/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_admin_dump_company_nlp_index_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminDumpCompanyNlpIndex(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_all_keyword_groups_and_subgroups_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'getAllKeywordGroupsAndSubgroups'));
    }

    public function test_get_get_all_keyword_groups_and_subgroups_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->getAllKeywordGroupsAndSubgroups();
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_all_keyword_groups_and_subgroups_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->getAllKeywordGroupsAndSubgroups();
        $this->assertStringContainsString('/api/v1/admin/keyword_group', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_all_keyword_groups_and_subgroups_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->getAllKeywordGroupsAndSubgroups();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_keyword_groups_labels_by_keyword_group_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'getKeywordGroupsLabelsByKeywordGroup'));
    }

    public function test_get_get_keyword_groups_labels_by_keyword_group_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->getKeywordGroupsLabelsByKeywordGroup('test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_keyword_groups_labels_by_keyword_group_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->getKeywordGroupsLabelsByKeywordGroup('hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/admin/keyword_group/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_keyword_groups_labels_by_keyword_group_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->getKeywordGroupsLabelsByKeywordGroup('test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('subgroup=', $path);
    }

    public function test_get_get_keyword_groups_labels_by_keyword_group_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->getKeywordGroupsLabelsByKeywordGroup('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_admin_delete_user_projects_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'adminDeleteUserProjects'));
    }

    public function test_delete_admin_delete_user_projects_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminDeleteUserProjects('test_value');
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_admin_delete_user_projects_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminDeleteUserProjects('test_value');
        $this->assertStringContainsString('/api/v1/admin/delete_user_projects/', $ctx->client->lastCall()['path']);
    }

    public function test_delete_admin_delete_user_projects_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminDeleteUserProjects('test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('user_ids=', $path);
    }

    public function test_delete_admin_delete_user_projects_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminDeleteUserProjects('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_admin_delete_user_exists(): void {
        $this->assertTrue(method_exists(Admin::class, 'adminDeleteUser'));
    }

    public function test_delete_admin_delete_user_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminDeleteUser('test_value');
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_admin_delete_user_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminDeleteUser('test_value');
        $this->assertStringContainsString('/api/v1/admin/delete_user/', $ctx->client->lastCall()['path']);
    }

    public function test_delete_admin_delete_user_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminDeleteUser('test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('user_ids=', $path);
    }

    public function test_delete_admin_delete_user_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Admin($ctx);
        $obj->adminDeleteUser('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

}
