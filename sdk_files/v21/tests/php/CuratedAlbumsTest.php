<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\CuratedAlbums;

require_once __DIR__ . '/helpers.php';

class CuratedAlbumsTest extends TestCase {
    public function test_get_get_all_project_curated_albums_exists(): void {
        $this->assertTrue(method_exists(CuratedAlbums::class, 'getAllProjectCuratedAlbums'));
    }

    public function test_get_get_all_project_curated_albums_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CuratedAlbums($spy);
        $obj->getAllProjectCuratedAlbums('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_all_project_curated_albums_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CuratedAlbums($spy);
        $obj->getAllProjectCuratedAlbums('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/curated_album/project/test_value', $spy->lastCall()['path']);
    }

    public function test_get_get_all_project_curated_albums_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CuratedAlbums($spy);
        $obj->getAllProjectCuratedAlbums('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_curated_album_photos_exists(): void {
        $this->assertTrue(method_exists(CuratedAlbums::class, 'getCuratedAlbumPhotos'));
    }

    public function test_get_get_curated_album_photos_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CuratedAlbums($spy);
        $obj->getCuratedAlbumPhotos('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_curated_album_photos_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CuratedAlbums($spy);
        $obj->getCuratedAlbumPhotos('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/curated_album/photos/42/', $spy->lastCall()['path']);
    }

    public function test_get_get_curated_album_photos_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CuratedAlbums($spy);
        $obj->getCuratedAlbumPhotos('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
        $this->assertStringContainsString('confidence_value=', $path);
    }

    public function test_get_get_curated_album_photos_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CuratedAlbums($spy);
        $obj->getCuratedAlbumPhotos('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_curated_album_photos_ranked_exists(): void {
        $this->assertTrue(method_exists(CuratedAlbums::class, 'getCuratedAlbumPhotosRanked'));
    }

    public function test_get_get_curated_album_photos_ranked_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CuratedAlbums($spy);
        $obj->getCuratedAlbumPhotosRanked('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_curated_album_photos_ranked_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CuratedAlbums($spy);
        $obj->getCuratedAlbumPhotosRanked('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/curated_album/photos/ranked/42/', $spy->lastCall()['path']);
    }

    public function test_get_get_curated_album_photos_ranked_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CuratedAlbums($spy);
        $obj->getCuratedAlbumPhotosRanked('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('asc_or_desc=', $path);
        $this->assertStringContainsString('last_id=', $path);
        $this->assertStringContainsString('limit=', $path);
        $this->assertStringContainsString('confidence_value=', $path);
    }

    public function test_get_get_curated_album_photos_ranked_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new CuratedAlbums($spy);
        $obj->getCuratedAlbumPhotosRanked('access_token', 'refresh_token', 42, 'test_value', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
