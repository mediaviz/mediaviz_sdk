<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Search;

require_once __DIR__ . '/helpers.php';

class SearchTest extends TestCase {
    public function test_get_search_exists(): void {
        $this->assertTrue(method_exists(Search::class, 'getSearch'));
    }

    public function test_get_search_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Search($spy);
        $obj->getSearch('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', true, 'test_value', 'test_value', 42, 'test_value', 'test_value', true);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_search_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Search($spy);
        $obj->getSearch('access_token', 'refresh_token', 'hello world', 'test_value', 'test_value', true, 'test_value', 'test_value', 42, 'test_value', 'test_value', true);
        $this->assertStringContainsString('/api/v1/search/hello%20world/', $spy->lastCall()['path']);
    }

    public function test_get_search_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Search($spy);
        $obj->getSearch('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', true, 'test_value', 'test_value', 42, 'test_value', 'test_value', true);
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('and_params=', $path);
        $this->assertStringContainsString('or_params=', $path);
        $this->assertStringContainsString('date_null_and=', $path);
        $this->assertStringContainsString('date_min=', $path);
        $this->assertStringContainsString('date_max=', $path);
        $this->assertStringContainsString('custom_album_id=', $path);
        $this->assertStringContainsString('curated_album_name=', $path);
        $this->assertStringContainsString('date_order=', $path);
        $this->assertStringContainsString('best_of_similar_sets_only=', $path);
    }

    public function test_get_search_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Search($spy);
        $obj->getSearch('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', true, 'test_value', 'test_value', 42, 'test_value', 'test_value', true);
        $this->assertCount(1, $spy->calls);
    }

}
