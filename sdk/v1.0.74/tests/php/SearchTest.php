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
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->searchProjectPhotos('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_search_project_photos_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->searchProjectPhotos('hello world', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/search/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_get_search_project_photos_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->searchProjectPhotos('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
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
        $this->assertStringContainsString('curated_album_id=', $path);
        $this->assertStringContainsString('split_by_tier=', $path);
    }

    public function test_get_search_project_photos_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->searchProjectPhotos('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_search_project_photos_parametrized_exists(): void {
        $this->assertTrue(method_exists(Search::class, 'searchProjectPhotosParametrized'));
    }

    public function test_get_search_project_photos_parametrized_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->searchProjectPhotosParametrized('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_search_project_photos_parametrized_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->searchProjectPhotosParametrized('hello world', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 42);
        $this->assertStringContainsString('/api/v1/search/parametrized/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_get_search_project_photos_parametrized_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->searchProjectPhotosParametrized('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 42);
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('and_params=', $path);
        $this->assertStringContainsString('or_params=', $path);
        $this->assertStringContainsString('not_params=', $path);
        $this->assertStringContainsString('date_min=', $path);
        $this->assertStringContainsString('date_max=', $path);
        $this->assertStringContainsString('date_null_and=', $path);
        $this->assertStringContainsString('date_null_or=', $path);
        $this->assertStringContainsString('date_order=', $path);
        $this->assertStringContainsString('albums=', $path);
        $this->assertStringContainsString('best_of_similar_sets_only=', $path);
        $this->assertStringContainsString('split_by_tier=', $path);
        $this->assertStringContainsString('size=', $path);
    }

    public function test_get_search_project_photos_parametrized_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->searchProjectPhotosParametrized('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_search_project_photos_natural_language_auto_exists(): void {
        $this->assertTrue(method_exists(Search::class, 'searchProjectPhotosNaturalLanguageAuto'));
    }

    public function test_post_search_project_photos_natural_language_auto_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->searchProjectPhotosNaturalLanguageAuto('test_value', 'test_value', 42, 3.14, 3.14, 42, 3.14, true);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_search_project_photos_natural_language_auto_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->searchProjectPhotosNaturalLanguageAuto('hello world', 'test_value', 42, 3.14, 3.14, 42, 3.14, true);
        $this->assertStringContainsString('/api/v1/search/auto/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_post_search_project_photos_natural_language_auto_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->searchProjectPhotosNaturalLanguageAuto('test_value', 'test_value', 42, 3.14, 3.14, 42, 3.14, true);
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('min_cosine=', $path);
        $this->assertStringContainsString('label_min_cosine=', $path);
        $this->assertStringContainsString('label_top_k=', $path);
        $this->assertStringContainsString('label_delta=', $path);
        $this->assertStringContainsString('debug_scores=', $path);
    }

    public function test_post_search_project_photos_natural_language_auto_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->searchProjectPhotosNaturalLanguageAuto('test_value', 'test_value', 42, 3.14, 3.14, 42, 3.14, true);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('search_text', $body);
        $this->assertArrayHasKey('size', $body);
    }

    public function test_post_search_project_photos_natural_language_auto_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->searchProjectPhotosNaturalLanguageAuto('test_value', 'test_value', 42, 3.14, 3.14, 42, 3.14, true);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_project_saved_searches_exists(): void {
        $this->assertTrue(method_exists(Search::class, 'getProjectSavedSearches'));
    }

    public function test_get_get_project_saved_searches_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->getProjectSavedSearches('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_project_saved_searches_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->getProjectSavedSearches('hello world');
        $this->assertStringContainsString('/api/v1/search/saved/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_project_saved_searches_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->getProjectSavedSearches('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_saved_search_by_id_exists(): void {
        $this->assertTrue(method_exists(Search::class, 'getSavedSearchById'));
    }

    public function test_get_get_saved_search_by_id_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->getSavedSearchById(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_saved_search_by_id_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->getSavedSearchById(42);
        $this->assertStringContainsString('/api/v1/search/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_saved_search_by_id_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->getSavedSearchById(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_save_project_photos_search_exists(): void {
        $this->assertTrue(method_exists(Search::class, 'saveProjectPhotosSearch'));
    }

    public function test_post_save_project_photos_search_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->saveProjectPhotosSearch('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_save_project_photos_search_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->saveProjectPhotosSearch('hello world', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/search/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_post_save_project_photos_search_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->saveProjectPhotosSearch('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('search_name=', $path);
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
        $this->assertStringContainsString('curated_album_id=', $path);
        $this->assertStringContainsString('split_by_tier=', $path);
    }

    public function test_post_save_project_photos_search_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->saveProjectPhotosSearch('test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_delete_saved_search_by_id_exists(): void {
        $this->assertTrue(method_exists(Search::class, 'deleteSavedSearchById'));
    }

    public function test_delete_delete_saved_search_by_id_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->deleteSavedSearchById(42);
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_delete_saved_search_by_id_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->deleteSavedSearchById(42);
        $this->assertStringContainsString('/api/v1/search/42', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_saved_search_by_id_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Search($ctx);
        $obj->deleteSavedSearchById(42);
        $this->assertCount(1, $ctx->client->calls);
    }

}
