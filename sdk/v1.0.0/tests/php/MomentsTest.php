<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Moments;

require_once __DIR__ . '/helpers.php';

class MomentsTest extends TestCase {
    public function test_post_create_moment_exists(): void {
        $this->assertTrue(method_exists(Moments::class, 'createMoment'));
    }

    public function test_post_create_moment_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->createMoment(42, 'test_value', 'test_value', 'test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_moment_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->createMoment(42, 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/moments/', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_moment_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->createMoment(42, 'test_value', 'test_value', 'test_value');
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('user_defined_name', $body);
        $this->assertArrayHasKey('guessed_name', $body);
        $this->assertArrayHasKey('description', $body);
        $this->assertArrayHasKey('user_id', $body);
    }

    public function test_post_create_moment_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->createMoment(42, 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_moment_exists(): void {
        $this->assertTrue(method_exists(Moments::class, 'getMoment'));
    }

    public function test_get_get_moment_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->getMoment(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_moment_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->getMoment(42);
        $this->assertStringContainsString('/api/v1/moments/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_moment_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->getMoment(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_user_moments_exists(): void {
        $this->assertTrue(method_exists(Moments::class, 'getUserMoments'));
    }

    public function test_get_get_user_moments_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->getUserMoments(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_user_moments_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->getUserMoments(42);
        $this->assertStringContainsString('/api/v1/moments/user/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_user_moments_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->getUserMoments(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_update_moment_exists(): void {
        $this->assertTrue(method_exists(Moments::class, 'updateMoment'));
    }

    public function test_put_update_moment_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->updateMoment(42, 'test_value', 'test_value', 'test_value');
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_moment_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->updateMoment(42, 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/moments/42', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_moment_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->updateMoment(42, 'test_value', 'test_value', 'test_value');
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('user_defined_name', $body);
        $this->assertArrayHasKey('guessed_name', $body);
        $this->assertArrayHasKey('description', $body);
    }

    public function test_put_update_moment_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->updateMoment(42, 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_delete_moment_exists(): void {
        $this->assertTrue(method_exists(Moments::class, 'deleteMoment'));
    }

    public function test_delete_delete_moment_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->deleteMoment(42);
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_delete_moment_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->deleteMoment(42);
        $this->assertStringContainsString('/api/v1/moments/42', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_moment_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Moments($ctx);
        $obj->deleteMoment(42);
        $this->assertCount(1, $ctx->client->calls);
    }

}
