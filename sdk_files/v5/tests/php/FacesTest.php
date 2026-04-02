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
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Faces($spy);
        $obj->getPersonPhoto('access_token', 'refresh_token', 'test_value', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_person_photo_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Faces($spy);
        $obj->getPersonPhoto('access_token', 'refresh_token', 'hello world', 42);
        $this->assertStringContainsString('/api/v1/person/hello%20world/photo/42', $spy->lastCall()['path']);
    }

    public function test_get_person_photo_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Faces($spy);
        $obj->getPersonPhoto('access_token', 'refresh_token', 'test_value', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_update_person_exists(): void {
        $this->assertTrue(method_exists(Faces::class, 'updatePerson'));
    }

    public function test_update_person_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Faces($spy);
        $obj->updatePerson('access_token', 'refresh_token', 'test_value', 42, 'test_value');
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_update_person_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Faces($spy);
        $obj->updatePerson('access_token', 'refresh_token', 'hello world', 42, 'test_value');
        $this->assertStringContainsString('/api/v1/person/hello%20world/42', $spy->lastCall()['path']);
    }

    public function test_update_person_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Faces($spy);
        $obj->updatePerson('access_token', 'refresh_token', 'test_value', 42, 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('person_name=', $path);
    }

    public function test_update_person_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Faces($spy);
        $obj->updatePerson('access_token', 'refresh_token', 'test_value', 42, 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_person_exists(): void {
        $this->assertTrue(method_exists(Faces::class, 'getPerson'));
    }

    public function test_get_person_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Faces($spy);
        $obj->getPerson('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_person_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Faces($spy);
        $obj->getPerson('access_token', 'refresh_token', 'hello world');
        $this->assertStringContainsString('/api/v1/person/hello%20world/', $spy->lastCall()['path']);
    }

    public function test_get_person_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Faces($spy);
        $obj->getPerson('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
