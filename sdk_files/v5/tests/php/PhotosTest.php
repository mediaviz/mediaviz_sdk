<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Photos;

require_once __DIR__ . '/helpers.php';

class PhotosTest extends TestCase {
    public function test_get_photo_ids_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getPhotoIds'));
    }

    public function test_get_photo_ids_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotoIds('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_photo_ids_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotoIds('access_token', 'refresh_token', 'hello world', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/', $spy->lastCall()['path']);
    }

    public function test_get_photo_ids_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotoIds('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_photo_ids_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotoIds('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_photo_by_id_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getPhotoById'));
    }

    public function test_get_photo_by_id_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotoById('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_photo_by_id_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotoById('access_token', 'refresh_token', 'hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/test_value', $spy->lastCall()['path']);
    }

    public function test_get_photo_by_id_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotoById('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_delete_photos_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'deletePhotos'));
    }

    public function test_delete_photos_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->deletePhotos('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertSame('DELETE', $spy->lastCall()['method']);
    }

    public function test_delete_photos_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->deletePhotos('access_token', 'refresh_token', 'hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/delete/', $spy->lastCall()['path']);
    }

    public function test_delete_photos_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->deletePhotos('access_token', 'refresh_token', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('photo_ids=', $path);
    }

    public function test_delete_photos_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->deletePhotos('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_project_thumbnail_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getProjectThumbnail'));
    }

    public function test_get_project_thumbnail_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getProjectThumbnail('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_project_thumbnail_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getProjectThumbnail('access_token', 'refresh_token', 'hello world');
        $this->assertStringContainsString('/api/v1/photos_project/hello%20world', $spy->lastCall()['path']);
    }

    public function test_get_project_thumbnail_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getProjectThumbnail('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_project_month_years_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getProjectMonthYears'));
    }

    public function test_get_project_month_years_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getProjectMonthYears('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_project_month_years_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getProjectMonthYears('access_token', 'refresh_token', 'hello world');
        $this->assertStringContainsString('/api/v1/photo_month_years/hello%20world', $spy->lastCall()['path']);
    }

    public function test_get_project_month_years_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getProjectMonthYears('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_photos_by_month_year_sort_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getPhotosByMonthYearSort'));
    }

    public function test_get_photos_by_month_year_sort_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosByMonthYearSort('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value', 42, 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_photos_by_month_year_sort_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosByMonthYearSort('access_token', 'refresh_token', 'hello world', 'hello world', 'hello world', 'test_value', 42, 42);
        $this->assertStringContainsString('/api/v1/photos/hello%20world/month/hello%20world/year/hello%20world/', $spy->lastCall()['path']);
    }

    public function test_get_photos_by_month_year_sort_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosByMonthYearSort('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value', 42, 42);
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_photos_by_month_year_sort_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosByMonthYearSort('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value', 42, 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_photos_date_taken_none_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getPhotosDateTakenNone'));
    }

    public function test_get_photos_date_taken_none_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosDateTakenNone('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_photos_date_taken_none_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosDateTakenNone('access_token', 'refresh_token', 'hello world');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/date_taken/none', $spy->lastCall()['path']);
    }

    public function test_get_photos_date_taken_none_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosDateTakenNone('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_update_photos_update_rank_by_id_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'updatePhotosUpdateRankById'));
    }

    public function test_update_photos_update_rank_by_id_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->updatePhotosUpdateRankById('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_update_photos_update_rank_by_id_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->updatePhotosUpdateRankById('access_token', 'refresh_token', 'hello world', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/photos_update/hello%20world/id/test_value/rank/test_value', $spy->lastCall()['path']);
    }

    public function test_update_photos_update_rank_by_id_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->updatePhotosUpdateRankById('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_photos_ranked_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getPhotosRanked'));
    }

    public function test_get_photos_ranked_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosRanked('access_token', 'refresh_token', 'test_value', 'test_value', 42, 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_photos_ranked_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosRanked('access_token', 'refresh_token', 'hello world', 'test_value', 42, 42);
        $this->assertStringContainsString('/api/v1/photos_ranked/hello%20world/', $spy->lastCall()['path']);
    }

    public function test_get_photos_ranked_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosRanked('access_token', 'refresh_token', 'test_value', 'test_value', 42, 42);
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_photos_ranked_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosRanked('access_token', 'refresh_token', 'test_value', 'test_value', 42, 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_photos_month_year_ranked_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getPhotosMonthYearRanked'));
    }

    public function test_get_photos_month_year_ranked_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosMonthYearRanked('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_photos_month_year_ranked_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosMonthYearRanked('access_token', 'refresh_token', 'hello world', 'hello world', 'hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/month/hello%20world/year/hello%20world/ranked', $spy->lastCall()['path']);
    }

    public function test_get_photos_month_year_ranked_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosMonthYearRanked('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
    }

    public function test_get_photos_month_year_ranked_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosMonthYearRanked('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_photos_date_taken_none_ranked_sort_desc_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getPhotosDateTakenNoneRankedSortDesc'));
    }

    public function test_get_photos_date_taken_none_ranked_sort_desc_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosDateTakenNoneRankedSortDesc('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_photos_date_taken_none_ranked_sort_desc_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosDateTakenNoneRankedSortDesc('access_token', 'refresh_token', 'hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/date_taken/none/ranked', $spy->lastCall()['path']);
    }

    public function test_get_photos_date_taken_none_ranked_sort_desc_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosDateTakenNoneRankedSortDesc('access_token', 'refresh_token', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
    }

    public function test_get_photos_date_taken_none_ranked_sort_desc_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Photos($spy);
        $obj->getPhotosDateTakenNoneRankedSortDesc('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
