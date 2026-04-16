<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Photos;

require_once __DIR__ . '/helpers.php';

class PhotosTest extends TestCase {
    public function test_post_add_photo_to_project_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'addPhotoToProject'));
    }

    public function test_post_add_photo_to_project_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->addPhotoToProject('test_value', 'test_value', 42, 42, 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_add_photo_to_project_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->addPhotoToProject('test_value', 'test_value', 42, 42, 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/', $ctx->client->lastCall()['path']);
    }

    public function test_post_add_photo_to_project_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->addPhotoToProject('test_value', 'test_value', 42, 42, 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('photo', $body);
        $this->assertArrayHasKey('table_name', $body);
        $this->assertArrayHasKey('source_resolution_x', $body);
        $this->assertArrayHasKey('source_resolution_y', $body);
        $this->assertArrayHasKey('date_taken', $body);
        $this->assertArrayHasKey('latitude', $body);
        $this->assertArrayHasKey('longitude', $body);
        $this->assertArrayHasKey('file_path', $body);
        $this->assertArrayHasKey('title', $body);
        $this->assertArrayHasKey('client_side_id', $body);
    }

    public function test_post_add_photo_to_project_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->addPhotoToProject('test_value', 'test_value', 42, 42, 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
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
        $obj->getPhotoFromProject('hello world', 42, 42);
        $this->assertStringContainsString('/api/v1/photos/hello%20world/42', $ctx->client->lastCall()['path']);
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

    public function test_get_get_photo_face_details_from_project_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getPhotoFaceDetailsFromProject'));
    }

    public function test_get_get_photo_face_details_from_project_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getPhotoFaceDetailsFromProject('test_value', 42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_photo_face_details_from_project_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getPhotoFaceDetailsFromProject('hello world', 42);
        $this->assertStringContainsString('/api/v1/photos/face_details/hello%20world/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_photo_face_details_from_project_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getPhotoFaceDetailsFromProject('test_value', 42);
        $this->assertCount(1, $ctx->client->calls);
    }

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
        $obj->getAllProjectPhotoIds('hello world', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/', $ctx->client->lastCall()['path']);
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

    public function test_get_get_top_middle_bottom_project_photo_ids_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getTopMiddleBottomProjectPhotoIds'));
    }

    public function test_get_get_top_middle_bottom_project_photo_ids_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotoIds('test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_top_middle_bottom_project_photo_ids_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotoIds('hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/photos_top/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_top_middle_bottom_project_photo_ids_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotoIds('test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
    }

    public function test_get_get_top_middle_bottom_project_photo_ids_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotoIds('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_sorted_by_date_new_ranked_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked'));
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_sorted_by_date_new_ranked_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked('test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_sorted_by_date_new_ranked_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked('hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/photos_ranked/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_sorted_by_date_new_ranked_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked('test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_sorted_by_date_new_ranked_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRanked('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_sorted_by_date_new_ranked_keyset_paginated_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRankedKeysetPaginated'));
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_sorted_by_date_new_ranked_keyset_paginated_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRankedKeysetPaginated('test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_sorted_by_date_new_ranked_keyset_paginated_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRankedKeysetPaginated('hello world', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/photos_ranked/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_sorted_by_date_new_ranked_keyset_paginated_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRankedKeysetPaginated('test_value', 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_sorted_by_date_new_ranked_keyset_paginated_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameSortedByDateNewRankedKeysetPaginated('test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_project_month_years_with_photos_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getProjectMonthYearsWithPhotos'));
    }

    public function test_get_get_project_month_years_with_photos_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectMonthYearsWithPhotos('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_project_month_years_with_photos_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectMonthYearsWithPhotos('hello world');
        $this->assertStringContainsString('/api/v1/photo_month_years/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_project_month_years_with_photos_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectMonthYearsWithPhotos('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_project_photo_ids_by_month_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getProjectPhotoIdsByMonth'));
    }

    public function test_get_get_project_photo_ids_by_month_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsByMonth('test_value', 42, 42, 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_project_photo_ids_by_month_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsByMonth('hello world', 42, 42, 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/month/42/year/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_project_photo_ids_by_month_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsByMonth('test_value', 42, 42, 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
    }

    public function test_get_get_project_photo_ids_by_month_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsByMonth('test_value', 42, 42, 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_project_photo_ids_by_month_keyset_paginated_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getProjectPhotoIdsByMonthKeysetPaginated'));
    }

    public function test_get_get_project_photo_ids_by_month_keyset_paginated_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsByMonthKeysetPaginated('test_value', 42, 42, 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_project_photo_ids_by_month_keyset_paginated_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsByMonthKeysetPaginated('hello world', 42, 42, 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/month/42/year/42/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_project_photo_ids_by_month_keyset_paginated_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsByMonthKeysetPaginated('test_value', 42, 42, 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_get_project_photo_ids_by_month_keyset_paginated_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsByMonthKeysetPaginated('test_value', 42, 42, 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_top_project_photos_by_table_name_by_month_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getTopProjectPhotosByTableNameByMonth'));
    }

    public function test_get_get_top_project_photos_by_table_name_by_month_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopProjectPhotosByTableNameByMonth('test_value', 42, 42, 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_top_project_photos_by_table_name_by_month_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopProjectPhotosByTableNameByMonth('hello world', 42, 42, 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/month/42/year/42/top', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_top_project_photos_by_table_name_by_month_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopProjectPhotosByTableNameByMonth('test_value', 42, 42, 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
    }

    public function test_get_get_top_project_photos_by_table_name_by_month_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopProjectPhotosByTableNameByMonth('test_value', 42, 42, 'test_value');
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
        $obj->getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRanked('hello world', 42, 42, 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/month/42/year/42/ranked', $ctx->client->lastCall()['path']);
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

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_keyset_paginated_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRankedKeysetPaginated'));
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_keyset_paginated_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRankedKeysetPaginated('test_value', 42, 42, 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_keyset_paginated_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRankedKeysetPaginated('hello world', 42, 42, 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/month/42/year/42/ranked/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_keyset_paginated_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRankedKeysetPaginated('test_value', 42, 42, 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_get_top_middle_bottom_project_photos_by_table_name_by_month_sorted_by_date_new_ranked_keyset_paginated_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateNewRankedKeysetPaginated('test_value', 42, 42, 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_project_photo_ids_no_date_taken_keyset_paginated_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getProjectPhotoIdsNoDateTakenKeysetPaginated'));
    }

    public function test_get_get_project_photo_ids_no_date_taken_keyset_paginated_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsNoDateTakenKeysetPaginated('test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_project_photo_ids_no_date_taken_keyset_paginated_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsNoDateTakenKeysetPaginated('hello world', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/date_taken/none/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_project_photo_ids_no_date_taken_keyset_paginated_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsNoDateTakenKeysetPaginated('test_value', 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_get_project_photo_ids_no_date_taken_keyset_paginated_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsNoDateTakenKeysetPaginated('test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_top_project_photos_by_table_name_no_date_taken_ranked_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getTopProjectPhotosByTableNameNoDateTakenRanked'));
    }

    public function test_get_get_top_project_photos_by_table_name_no_date_taken_ranked_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopProjectPhotosByTableNameNoDateTakenRanked('test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_top_project_photos_by_table_name_no_date_taken_ranked_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopProjectPhotosByTableNameNoDateTakenRanked('hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/date_taken/none/ranked', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_top_project_photos_by_table_name_no_date_taken_ranked_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopProjectPhotosByTableNameNoDateTakenRanked('test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
    }

    public function test_get_get_top_project_photos_by_table_name_no_date_taken_ranked_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getTopProjectPhotosByTableNameNoDateTakenRanked('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_project_thumbnail_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getProjectThumbnail'));
    }

    public function test_get_get_project_thumbnail_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectThumbnail('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_project_thumbnail_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectThumbnail('hello world');
        $this->assertStringContainsString('/api/v1/photos_project/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_project_thumbnail_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectThumbnail('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_photo_in_project_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'updatePhotoInProject'));
    }

    public function test_put_update_photo_in_project_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->updatePhotoInProject('test_value', 42, 'test_value');
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_photo_in_project_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->updatePhotoInProject('test_value', 42, 'test_value');
        $this->assertStringContainsString('/api/v1/photos_update', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_photo_in_project_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->updatePhotoInProject('test_value', 42, 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('table_name=', $path);
        $this->assertStringContainsString('photo_id=', $path);
        $this->assertStringContainsString('photo_data=', $path);
    }

    public function test_put_update_photo_in_project_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->updatePhotoInProject('test_value', 42, 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_photo_ranking_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'updatePhotoRanking'));
    }

    public function test_put_update_photo_ranking_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->updatePhotoRanking('test_value', 42, 'test_value');
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_photo_ranking_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->updatePhotoRanking('hello world', 42, 'hello world');
        $this->assertStringContainsString('/api/v1/photos_update/hello%20world/id/42/rank/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_photo_ranking_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->updatePhotoRanking('test_value', 42, 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_delete_photo_from_project_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'deletePhotoFromProject'));
    }

    public function test_delete_delete_photo_from_project_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->deletePhotoFromProject('test_value', 'test_value');
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_delete_photo_from_project_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->deletePhotoFromProject('hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/delete/', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_photo_from_project_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->deletePhotoFromProject('test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('photo_ids=', $path);
    }

    public function test_delete_delete_photo_from_project_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->deletePhotoFromProject('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

}
