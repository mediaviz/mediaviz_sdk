<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\CustomAlbums;

require_once __DIR__ . '/helpers.php';

class CustomAlbumsTest extends TestCase {
    public function test_get_get_custom_album_detail_by_id_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'getCustomAlbumDetailById'));
    }

    public function test_get_get_custom_album_detail_by_id_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getCustomAlbumDetailById(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_custom_album_detail_by_id_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getCustomAlbumDetailById(42);
        $this->assertStringContainsString('/api/v1/custom_album/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_custom_album_detail_by_id_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getCustomAlbumDetailById(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_all_project_custom_albums_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'getAllProjectCustomAlbums'));
    }

    public function test_get_get_all_project_custom_albums_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getAllProjectCustomAlbums('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_all_project_custom_albums_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getAllProjectCustomAlbums('hello world');
        $this->assertStringContainsString('/api/v1/custom_album/project/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_all_project_custom_albums_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getAllProjectCustomAlbums('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_custom_album_photos_by_id_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'getCustomAlbumPhotosById'));
    }

    public function test_get_get_custom_album_photos_by_id_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getCustomAlbumPhotosById(42, 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_custom_album_photos_by_id_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getCustomAlbumPhotosById(42, 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/custom_album/photos/42/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_custom_album_photos_by_id_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getCustomAlbumPhotosById(42, 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_get_custom_album_photos_by_id_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getCustomAlbumPhotosById(42, 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_ranked_custom_album_by_id_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'getRankedCustomAlbumById'));
    }

    public function test_get_get_ranked_custom_album_by_id_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getRankedCustomAlbumById(42, 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_ranked_custom_album_by_id_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getRankedCustomAlbumById(42, 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/custom_album/photos/ranked/42/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_ranked_custom_album_by_id_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getRankedCustomAlbumById(42, 'test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_get_ranked_custom_album_by_id_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->getRankedCustomAlbumById(42, 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_create_project_custom_album_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'createProjectCustomAlbum'));
    }

    public function test_post_create_project_custom_album_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->createProjectCustomAlbum('test_value', 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2']);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_project_custom_album_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->createProjectCustomAlbum('hello world', 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2']);
        $this->assertStringContainsString('/api/v1/custom_album/project/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_project_custom_album_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->createProjectCustomAlbum('test_value', 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('description', $body);
        $this->assertArrayHasKey('photo_id_inclusion_list', $body);
        $this->assertArrayHasKey('photo_id_removal_list', $body);
    }

    public function test_post_create_project_custom_album_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->createProjectCustomAlbum('test_value', 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2']);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_custom_album_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'updateCustomAlbum'));
    }

    public function test_put_update_custom_album_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->updateCustomAlbum(42, 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2']);
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_custom_album_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->updateCustomAlbum(42, 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2']);
        $this->assertStringContainsString('/api/v1/custom_album/42', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_custom_album_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->updateCustomAlbum(42, 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('description', $body);
        $this->assertArrayHasKey('photo_id_inclusion_list', $body);
        $this->assertArrayHasKey('photo_id_removal_list', $body);
    }

    public function test_put_update_custom_album_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->updateCustomAlbum(42, 'test_value', 'test_value', ['item1', 'item2'], ['item1', 'item2']);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_delete_custom_album_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'deleteCustomAlbum'));
    }

    public function test_delete_delete_custom_album_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->deleteCustomAlbum(42);
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_delete_custom_album_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->deleteCustomAlbum(42);
        $this->assertStringContainsString('/api/v1/custom_album/42', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_custom_album_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new CustomAlbums($ctx);
        $obj->deleteCustomAlbum(42);
        $this->assertCount(1, $ctx->client->calls);
    }

}
