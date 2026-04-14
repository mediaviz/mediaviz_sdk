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
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getAllProjectPhotoIds('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_all_project_photo_ids_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getAllProjectPhotoIds('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/test_value/', $spy->lastCall()['path']);
    }

    public function test_get_get_all_project_photo_ids_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getAllProjectPhotoIds('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_get_all_project_photo_ids_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getAllProjectPhotoIds('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_photo_from_project_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getPhotoFromProject'));
    }

    public function test_get_get_photo_from_project_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotoFromProject('access_token', 'refresh_token', 'test_value', 42, 'test_value', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_photo_from_project_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotoFromProject('access_token', 'refresh_token', 'test_value', 42, 'test_value', 42);
        $this->assertStringContainsString('/api/v1/photos/test_value/42', $spy->lastCall()['path']);
    }

    public function test_get_get_photo_from_project_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotoFromProject('access_token', 'refresh_token', 'test_value', 42, 'test_value', 42);
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('keyword_list_id=', $path);
    }

    public function test_get_get_photo_from_project_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotoFromProject('access_token', 'refresh_token', 'test_value', 42, 'test_value', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked'));
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked('access_token', 'refresh_token', 'test_value', 42, 42, 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked('access_token', 'refresh_token', 'test_value', 42, 42, 'hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/test_value/month/42/year/42/ranked', $spy->lastCall()['path']);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked('access_token', 'refresh_token', 'test_value', 42, 42, 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked('access_token', 'refresh_token', 'test_value', 42, 42, 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
