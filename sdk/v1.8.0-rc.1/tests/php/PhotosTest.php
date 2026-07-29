<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Photos;

require_once __DIR__ . '/helpers.php';

class PhotosTest extends TestCase {
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

    public function test_get_get_project_photo_ids_by_table_name_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getProjectPhotoIdsByTableName'));
    }

    public function test_get_get_project_photo_ids_by_table_name_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsByTableName('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_project_photo_ids_by_table_name_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsByTableName('hello world', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_project_photo_ids_by_table_name_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsByTableName('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
        $this->assertStringContainsString('include_all=', $path);
        $this->assertStringContainsString('start_date=', $path);
        $this->assertStringContainsString('end_date=', $path);
        $this->assertStringContainsString('no_date_taken=', $path);
    }

    public function test_get_get_project_photo_ids_by_table_name_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getProjectPhotoIdsByTableName('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_ranked_project_photo_ids_by_table_name_exists(): void {
        $this->assertTrue(method_exists(Photos::class, 'getRankedProjectPhotoIdsByTableName'));
    }

    public function test_get_get_ranked_project_photo_ids_by_table_name_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getRankedProjectPhotoIdsByTableName('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_ranked_project_photo_ids_by_table_name_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getRankedProjectPhotoIdsByTableName('hello world', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/photos/ranked/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_ranked_project_photo_ids_by_table_name_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getRankedProjectPhotoIdsByTableName('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
        $this->assertStringContainsString('start_date=', $path);
        $this->assertStringContainsString('end_date=', $path);
        $this->assertStringContainsString('no_date_taken=', $path);
    }

    public function test_get_get_ranked_project_photo_ids_by_table_name_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Photos($ctx);
        $obj->getRankedProjectPhotoIdsByTableName('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
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
