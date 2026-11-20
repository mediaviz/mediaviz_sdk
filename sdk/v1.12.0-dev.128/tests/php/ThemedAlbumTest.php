<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\ThemedAlbum;

require_once __DIR__ . '/helpers.php';

class ThemedAlbumTest extends TestCase {
    public function test_post_create_themed_album_exists(): void {
        $this->assertTrue(method_exists(ThemedAlbum::class, 'createThemedAlbum'));
    }

    public function test_post_create_themed_album_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->createThemedAlbum('test_value', 'test_value', 'test_value', 3.14);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_themed_album_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->createThemedAlbum('hello world', 'test_value', 'test_value', 3.14);
        $this->assertStringContainsString('/api/v1/themed_album/project/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_themed_album_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->createThemedAlbum('test_value', 'test_value', 'test_value', 3.14);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('description', $body);
        $this->assertArrayHasKey('confidence_value', $body);
    }

    public function test_post_create_themed_album_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->createThemedAlbum('test_value', 'test_value', 'test_value', 3.14);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_all_project_themed_albums_exists(): void {
        $this->assertTrue(method_exists(ThemedAlbum::class, 'getAllProjectThemedAlbums'));
    }

    public function test_get_get_all_project_themed_albums_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getAllProjectThemedAlbums('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_all_project_themed_albums_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getAllProjectThemedAlbums('hello world');
        $this->assertStringContainsString('/api/v1/themed_album/project/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_all_project_themed_albums_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getAllProjectThemedAlbums('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_themed_album_photos_exists(): void {
        $this->assertTrue(method_exists(ThemedAlbum::class, 'getThemedAlbumPhotos'));
    }

    public function test_get_get_themed_album_photos_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getThemedAlbumPhotos(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_themed_album_photos_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getThemedAlbumPhotos(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/themed_album/photos/42/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_themed_album_photos_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getThemedAlbumPhotos(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
        $this->assertStringContainsString('confidence_value=', $path);
    }

    public function test_get_get_themed_album_photos_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getThemedAlbumPhotos(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_themed_album_photos_ranked_exists(): void {
        $this->assertTrue(method_exists(ThemedAlbum::class, 'getThemedAlbumPhotosRanked'));
    }

    public function test_get_get_themed_album_photos_ranked_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getThemedAlbumPhotosRanked(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_themed_album_photos_ranked_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getThemedAlbumPhotosRanked(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/themed_album/photos/ranked/42/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_themed_album_photos_ranked_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getThemedAlbumPhotosRanked(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
        $this->assertStringContainsString('confidence_value=', $path);
    }

    public function test_get_get_themed_album_photos_ranked_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getThemedAlbumPhotosRanked(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_themed_album_by_id_exists(): void {
        $this->assertTrue(method_exists(ThemedAlbum::class, 'getThemedAlbumById'));
    }

    public function test_get_get_themed_album_by_id_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getThemedAlbumById(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_themed_album_by_id_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getThemedAlbumById(42);
        $this->assertStringContainsString('/api/v1/themed_album/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_themed_album_by_id_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->getThemedAlbumById(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_themed_album_exists(): void {
        $this->assertTrue(method_exists(ThemedAlbum::class, 'updateThemedAlbum'));
    }

    public function test_put_update_themed_album_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->updateThemedAlbum(42, 'test_value', 'test_value', 3.14);
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_themed_album_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->updateThemedAlbum(42, 'test_value', 'test_value', 3.14);
        $this->assertStringContainsString('/api/v1/themed_album/42', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_themed_album_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->updateThemedAlbum(42, 'test_value', 'test_value', 3.14);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('description', $body);
        $this->assertArrayHasKey('confidence_value', $body);
    }

    public function test_put_update_themed_album_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->updateThemedAlbum(42, 'test_value', 'test_value', 3.14);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_delete_themed_album_exists(): void {
        $this->assertTrue(method_exists(ThemedAlbum::class, 'deleteThemedAlbum'));
    }

    public function test_delete_delete_themed_album_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->deleteThemedAlbum(42);
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_delete_themed_album_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->deleteThemedAlbum(42);
        $this->assertStringContainsString('/api/v1/themed_album/42', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_themed_album_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->deleteThemedAlbum(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_convert_themed_album_to_custom_exists(): void {
        $this->assertTrue(method_exists(ThemedAlbum::class, 'convertThemedAlbumToCustom'));
    }

    public function test_post_convert_themed_album_to_custom_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->convertThemedAlbumToCustom(42);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_convert_themed_album_to_custom_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->convertThemedAlbumToCustom(42);
        $this->assertStringContainsString('/api/v1/themed_album/42/convert', $ctx->client->lastCall()['path']);
    }

    public function test_post_convert_themed_album_to_custom_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new ThemedAlbum($ctx);
        $obj->convertThemedAlbumToCustom(42);
        $this->assertCount(1, $ctx->client->calls);
    }

}
