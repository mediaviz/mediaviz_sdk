<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Faces;

require_once __DIR__ . '/helpers.php';

class FacesTest extends TestCase {
    public function test_get_person_photo_exists(): void {
        $this->assertTrue(method_exists(Faces::class, 'getPersonPhoto'));
    }

    public function test_get_person_photo_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Faces($ctx);
        $obj->getPersonPhoto('test_value', 42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_person_photo_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Faces($ctx);
        $obj->getPersonPhoto('hello world', 42);
        $this->assertStringContainsString('/api/v1/person/hello%20world/photo/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_person_photo_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Faces($ctx);
        $obj->getPersonPhoto('test_value', 42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_update_person_exists(): void {
        $this->assertTrue(method_exists(Faces::class, 'updatePerson'));
    }

    public function test_update_person_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Faces($ctx);
        $obj->updatePerson('test_value', 42, 'test_value');
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_update_person_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Faces($ctx);
        $obj->updatePerson('hello world', 42, 'test_value');
        $this->assertStringContainsString('/api/v1/person/hello%20world/42', $ctx->client->lastCall()['path']);
    }

    public function test_update_person_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Faces($ctx);
        $obj->updatePerson('test_value', 42, 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('person_name=', $path);
    }

    public function test_update_person_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Faces($ctx);
        $obj->updatePerson('test_value', 42, 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_person_exists(): void {
        $this->assertTrue(method_exists(Faces::class, 'getPerson'));
    }

    public function test_get_person_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Faces($ctx);
        $obj->getPerson('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_person_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Faces($ctx);
        $obj->getPerson('hello world');
        $this->assertStringContainsString('/api/v1/person/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_get_person_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Faces($ctx);
        $obj->getPerson('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

}
