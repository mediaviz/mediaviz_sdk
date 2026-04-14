<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Photos;

require_once __DIR__ . '/helpers.php';

class PhotosTest extends TestCase {
    public function test_get_get_all_project_photo_ids_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getAllProjectPhotoIds'));
    }

    public function test_get_get_all_project_photo_ids_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getAllProjectPhotoIds('test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_all_project_photo_ids_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getAllProjectPhotoIds('test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/test_value/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_all_project_photo_ids_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getAllProjectPhotoIds('test_value', 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_get_all_project_photo_ids_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getAllProjectPhotoIds('test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_photo_from_project_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getPhotoFromProject'));
    }

    public function test_get_get_photo_from_project_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getPhotoFromProject('test_value', 42, 42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_photo_from_project_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getPhotoFromProject('test_value', 42, 42);
        $this->assertStringContainsString('/api/v1/photos/test_value/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_photo_from_project_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getPhotoFromProject('test_value', 42, 42);
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('keyword_list_id=', $path);
    }

    public function test_get_get_photo_from_project_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getPhotoFromProject('test_value', 42, 42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked'));
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked('test_value', 42, 42, 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked('test_value', 42, 42, 'test_value');
        $this->assertStringContainsString('/api/v1/photos/test_value/month/42/year/42/ranked', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked('test_value', 42, 42, 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked('test_value', 42, 42, 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

}
