<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\CustomAlbums;

require_once __DIR__ . '/helpers.php';

class CustomAlbumsTest extends TestCase {
    public function test_create_custom_album_project_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'createCustomAlbumProject'));
    }

    public function test_create_custom_album_project_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->createCustomAlbumProject('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_create_custom_album_project_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->createCustomAlbumProject('access_token', 'refresh_token', 'hello world', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/custom_album/project/hello%20world', $spy->lastCall()['path']);
    }

    public function test_create_custom_album_project_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->createCustomAlbumProject('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value');
        $body = $spy->lastCall()['body'];
        $this->assertArrayHasKey('name', $body);
        $this->assertArrayHasKey('description', $body);
        $this->assertArrayHasKey('photo_id_inclusion_list', $body);
    }

    public function test_create_custom_album_project_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->createCustomAlbumProject('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_custom_album_project_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'getCustomAlbumProject'));
    }

    public function test_get_custom_album_project_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumProject('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_custom_album_project_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumProject('access_token', 'refresh_token', 'hello world');
        $this->assertStringContainsString('/api/v1/custom_album/project/hello%20world', $spy->lastCall()['path']);
    }

    public function test_get_custom_album_project_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumProject('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_custom_album_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'getCustomAlbum'));
    }

    public function test_get_custom_album_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbum('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_custom_album_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbum('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/custom_album/42', $spy->lastCall()['path']);
    }

    public function test_get_custom_album_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbum('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_delete_custom_album_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'deleteCustomAlbum'));
    }

    public function test_delete_custom_album_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->deleteCustomAlbum('access_token', 'refresh_token', 42);
        $this->assertSame('DELETE', $spy->lastCall()['method']);
    }

    public function test_delete_custom_album_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->deleteCustomAlbum('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/custom_album/42', $spy->lastCall()['path']);
    }

    public function test_delete_custom_album_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->deleteCustomAlbum('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_update_custom_album_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'updateCustomAlbum'));
    }

    public function test_update_custom_album_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->updateCustomAlbum('access_token', 'refresh_token', 42, []);
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_update_custom_album_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->updateCustomAlbum('access_token', 'refresh_token', 42, []);
        $this->assertStringContainsString('/api/v1/custom_album/42', $spy->lastCall()['path']);
    }

    public function test_update_custom_album_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->updateCustomAlbum('access_token', 'refresh_token', 42, []);
        $body = $spy->lastCall()['body'];
        $this->assertNotNull($body);
    }

    public function test_update_custom_album_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->updateCustomAlbum('access_token', 'refresh_token', 42, []);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_custom_album_photos_sort_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'getCustomAlbumPhotosSort'));
    }

    public function test_get_custom_album_photos_sort_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumPhotosSort('access_token', 'refresh_token', 42, 'test_value', 42, 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_custom_album_photos_sort_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumPhotosSort('access_token', 'refresh_token', 42, 'test_value', 42, 42);
        $this->assertStringContainsString('/api/v1/custom_album/photos/42/', $spy->lastCall()['path']);
    }

    public function test_get_custom_album_photos_sort_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumPhotosSort('access_token', 'refresh_token', 42, 'test_value', 42, 42);
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_custom_album_photos_sort_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumPhotosSort('access_token', 'refresh_token', 42, 'test_value', 42, 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_custom_album_photos_ranked_sort_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'getCustomAlbumPhotosRankedSort'));
    }

    public function test_get_custom_album_photos_ranked_sort_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumPhotosRankedSort('access_token', 'refresh_token', 42, 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_custom_album_photos_ranked_sort_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumPhotosRankedSort('access_token', 'refresh_token', 42, 'test_value');
        $this->assertStringContainsString('/api/v1/custom_album/photos/ranked/42/', $spy->lastCall()['path']);
    }

    public function test_get_custom_album_photos_ranked_sort_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumPhotosRankedSort('access_token', 'refresh_token', 42, 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
    }

    public function test_get_custom_album_photos_ranked_sort_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumPhotosRankedSort('access_token', 'refresh_token', 42, 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
