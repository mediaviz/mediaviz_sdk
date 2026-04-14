<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\CustomAlbums;

require_once __DIR__ . '/helpers.php';

class CustomAlbumsTest extends TestCase {
    public function test_post_create_project_custom_album_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'createProjectCustomAlbum'));
    }

    public function test_post_create_project_custom_album_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->createProjectCustomAlbum('access_token', 'refresh_token', 'test_value', ['Model' => 'test_value']);
        $this->assertSame('POST', $spy->lastCall()['method']);
    }

    public function test_post_create_project_custom_album_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->createProjectCustomAlbum('access_token', 'refresh_token', 'test_value', ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/custom_album/project/test_value', $spy->lastCall()['path']);
    }

    public function test_post_create_project_custom_album_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->createProjectCustomAlbum('access_token', 'refresh_token', 'test_value', ['Model' => 'test_value']);
        $body = $spy->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_post_create_project_custom_album_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->createProjectCustomAlbum('access_token', 'refresh_token', 'test_value', ['Model' => 'test_value']);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_all_project_custom_albums_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'getAllProjectCustomAlbums'));
    }

    public function test_get_get_all_project_custom_albums_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getAllProjectCustomAlbums('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_all_project_custom_albums_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getAllProjectCustomAlbums('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/custom_album/project/test_value', $spy->lastCall()['path']);
    }

    public function test_get_get_all_project_custom_albums_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getAllProjectCustomAlbums('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_custom_album_detail_by_id_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'getCustomAlbumDetailById'));
    }

    public function test_get_get_custom_album_detail_by_id_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumDetailById('access_token', 'refresh_token', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_custom_album_detail_by_id_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumDetailById('access_token', 'refresh_token', 42);
        $this->assertStringContainsString('/api/v1/custom_album/42', $spy->lastCall()['path']);
    }

    public function test_get_get_custom_album_detail_by_id_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumDetailById('access_token', 'refresh_token', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_delete_delete_custom_album_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'deleteCustomAlbum'));
    }

    public function test_delete_delete_custom_album_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->deleteCustomAlbum('access_token', 'refresh_token', 42, 42);
        $this->assertSame('DELETE', $spy->lastCall()['method']);
    }

    public function test_delete_delete_custom_album_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->deleteCustomAlbum('access_token', 'refresh_token', 42, 42);
        $this->assertStringContainsString('/api/v1/custom_album/42', $spy->lastCall()['path']);
    }

    public function test_delete_delete_custom_album_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->deleteCustomAlbum('access_token', 'refresh_token', 42, 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_put_update_custom_album_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'updateCustomAlbum'));
    }

    public function test_put_update_custom_album_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->updateCustomAlbum('access_token', 'refresh_token', 42, 42, ['Model' => 'test_value']);
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_put_update_custom_album_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->updateCustomAlbum('access_token', 'refresh_token', 42, 42, ['Model' => 'test_value']);
        $this->assertStringContainsString('/api/v1/custom_album/42', $spy->lastCall()['path']);
    }

    public function test_put_update_custom_album_request_body(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->updateCustomAlbum('access_token', 'refresh_token', 42, 42, ['Model' => 'test_value']);
        $body = $spy->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_put_update_custom_album_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->updateCustomAlbum('access_token', 'refresh_token', 42, 42, ['Model' => 'test_value']);
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_custom_album_photos_by_id_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'getCustomAlbumPhotosById'));
    }

    public function test_get_get_custom_album_photos_by_id_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumPhotosById('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_custom_album_photos_by_id_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumPhotosById('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/custom_album/photos/42/', $spy->lastCall()['path']);
    }

    public function test_get_get_custom_album_photos_by_id_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumPhotosById('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_get_custom_album_photos_by_id_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getCustomAlbumPhotosById('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_top_middle_bottom_custom_album_by_id_exists(): void {
        $this->assertTrue(method_exists(CustomAlbums::class, 'getTopMiddleBottomCustomAlbumById'));
    }

    public function test_get_get_top_middle_bottom_custom_album_by_id_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getTopMiddleBottomCustomAlbumById('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_top_middle_bottom_custom_album_by_id_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getTopMiddleBottomCustomAlbumById('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/custom_album/photos/ranked/42/', $spy->lastCall()['path']);
    }

    public function test_get_get_top_middle_bottom_custom_album_by_id_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getTopMiddleBottomCustomAlbumById('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_get_top_middle_bottom_custom_album_by_id_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CustomAlbums($spy);
        $obj->getTopMiddleBottomCustomAlbumById('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
