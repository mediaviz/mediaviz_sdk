<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Search;

require_once __DIR__ . '/helpers.php';

class SearchTest extends TestCase {
    public function test_get_search_project_photos_exists(): void {
        $this->assertTrue(method_exists(Search::class, 'searchProjectPhotos'));
    }

    public function test_get_search_project_photos_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Search($spy);
        $obj->searchProjectPhotos('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_search_project_photos_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Search($spy);
        $obj->searchProjectPhotos('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/search/test_value/', $spy->lastCall()['path']);
    }

    public function test_get_search_project_photos_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Search($spy);
        $obj->searchProjectPhotos('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('and_params=', $path);
        $this->assertStringContainsString('and_string_params=', $path);
        $this->assertStringContainsString('or_params=', $path);
        $this->assertStringContainsString('or_string_params=', $path);
        $this->assertStringContainsString('not_params=', $path);
        $this->assertStringContainsString('not_string_params=', $path);
        $this->assertStringContainsString('date_min=', $path);
        $this->assertStringContainsString('date_max=', $path);
        $this->assertStringContainsString('date_null_and=', $path);
        $this->assertStringContainsString('date_null_or=', $path);
        $this->assertStringContainsString('date_order=', $path);
        $this->assertStringContainsString('custom_album_id=', $path);
        $this->assertStringContainsString('best_of_similar_sets_only=', $path);
        $this->assertStringContainsString('curated_album_name=', $path);
        $this->assertStringContainsString('split_by_tier=', $path);
    }

    public function test_get_search_project_photos_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Search($spy);
        $obj->searchProjectPhotos('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
