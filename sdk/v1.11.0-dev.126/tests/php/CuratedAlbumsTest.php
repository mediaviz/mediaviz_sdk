<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\CuratedAlbums;

require_once __DIR__ . '/helpers.php';

class CuratedAlbumsTest extends TestCase {
    public function test_post_create_curated_album_exists(): void {
        $this->assertTrue(method_exists(CuratedAlbums::class, 'createCuratedAlbum'));
    }

    public function test_post_create_curated_album_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->createCuratedAlbum('test_value', 'test_value', 'test_value', 3.14);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_curated_album_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->createCuratedAlbum('hello world', 'test_value', 'test_value', 3.14);
        $this->assertStringContainsString('/api/v1/curated_album/project/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_curated_album_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->createCuratedAlbum('test_value', 'test_value', 'test_value', 3.14);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('description', $body);
        $this->assertArrayHasKey('confidence_value', $body);
    }

    public function test_post_create_curated_album_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->createCuratedAlbum('test_value', 'test_value', 'test_value', 3.14);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_all_project_curated_albums_exists(): void {
        $this->assertTrue(method_exists(CuratedAlbums::class, 'getAllProjectCuratedAlbums'));
    }

    public function test_get_get_all_project_curated_albums_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getAllProjectCuratedAlbums('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_all_project_curated_albums_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getAllProjectCuratedAlbums('hello world');
        $this->assertStringContainsString('/api/v1/curated_album/project/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_all_project_curated_albums_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getAllProjectCuratedAlbums('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_curated_album_photos_exists(): void {
        $this->assertTrue(method_exists(CuratedAlbums::class, 'getCuratedAlbumPhotos'));
    }

    public function test_get_get_curated_album_photos_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getCuratedAlbumPhotos(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_curated_album_photos_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getCuratedAlbumPhotos(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/curated_album/photos/42/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_curated_album_photos_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getCuratedAlbumPhotos(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
        $this->assertStringContainsString('confidence_value=', $path);
    }

    public function test_get_get_curated_album_photos_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getCuratedAlbumPhotos(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_curated_album_photos_ranked_exists(): void {
        $this->assertTrue(method_exists(CuratedAlbums::class, 'getCuratedAlbumPhotosRanked'));
    }

    public function test_get_get_curated_album_photos_ranked_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getCuratedAlbumPhotosRanked(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_curated_album_photos_ranked_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getCuratedAlbumPhotosRanked(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/curated_album/photos/ranked/42/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_curated_album_photos_ranked_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getCuratedAlbumPhotosRanked(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
        $this->assertStringContainsString('confidence_value=', $path);
    }

    public function test_get_get_curated_album_photos_ranked_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getCuratedAlbumPhotosRanked(42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_curated_album_by_id_exists(): void {
        $this->assertTrue(method_exists(CuratedAlbums::class, 'getCuratedAlbumById'));
    }

    public function test_get_get_curated_album_by_id_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getCuratedAlbumById(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_curated_album_by_id_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getCuratedAlbumById(42);
        $this->assertStringContainsString('/api/v1/curated_album/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_curated_album_by_id_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->getCuratedAlbumById(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_curated_album_exists(): void {
        $this->assertTrue(method_exists(CuratedAlbums::class, 'updateCuratedAlbum'));
    }

    public function test_put_update_curated_album_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->updateCuratedAlbum(42, 'test_value', 'test_value', 3.14);
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_curated_album_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->updateCuratedAlbum(42, 'test_value', 'test_value', 3.14);
        $this->assertStringContainsString('/api/v1/curated_album/42', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_curated_album_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->updateCuratedAlbum(42, 'test_value', 'test_value', 3.14);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('description', $body);
        $this->assertArrayHasKey('confidence_value', $body);
    }

    public function test_put_update_curated_album_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->updateCuratedAlbum(42, 'test_value', 'test_value', 3.14);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_delete_curated_album_exists(): void {
        $this->assertTrue(method_exists(CuratedAlbums::class, 'deleteCuratedAlbum'));
    }

    public function test_delete_delete_curated_album_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->deleteCuratedAlbum(42);
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_delete_curated_album_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->deleteCuratedAlbum(42);
        $this->assertStringContainsString('/api/v1/curated_album/42', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_curated_album_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->deleteCuratedAlbum(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_convert_curated_album_to_custom_exists(): void {
        $this->assertTrue(method_exists(CuratedAlbums::class, 'convertCuratedAlbumToCustom'));
    }

    public function test_post_convert_curated_album_to_custom_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->convertCuratedAlbumToCustom(42);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_convert_curated_album_to_custom_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->convertCuratedAlbumToCustom(42);
        $this->assertStringContainsString('/api/v1/curated_album/42/convert', $ctx->client->lastCall()['path']);
    }

    public function test_post_convert_curated_album_to_custom_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CuratedAlbums($ctx);
        $obj->convertCuratedAlbumToCustom(42);
        $this->assertCount(1, $ctx->client->calls);
    }

}
