<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Person;

require_once __DIR__ . '/helpers.php';

class PersonTest extends TestCase {
    public function test_get_get_all_persons_from_photo_exists(): void {
        $this->assertTrue(method_exists(Person::class, 'getAllPersonsFromPhoto'));
    }

    public function test_get_get_all_persons_from_photo_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Person($spy);
        $obj->getAllPersonsFromPhoto('access_token', 'refresh_token', 'test_value', 42);
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_all_persons_from_photo_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Person($spy);
        $obj->getAllPersonsFromPhoto('access_token', 'refresh_token', 'test_value', 42);
        $this->assertStringContainsString('/api/v1/person/test_value/photo/42', $spy->lastCall()['path']);
    }

    public function test_get_get_all_persons_from_photo_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Person($spy);
        $obj->getAllPersonsFromPhoto('access_token', 'refresh_token', 'test_value', 42);
        $this->assertCount(1, $spy->calls);
    }

    public function test_put_update_person_exists(): void {
        $this->assertTrue(method_exists(Person::class, 'updatePerson'));
    }

    public function test_put_update_person_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Person($spy);
        $obj->updatePerson('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
        $this->assertSame('PUT', $spy->lastCall()['method']);
    }

    public function test_put_update_person_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Person($spy);
        $obj->updatePerson('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/person/test_value/test_value', $spy->lastCall()['path']);
    }

    public function test_put_update_person_query_params(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Person($spy);
        $obj->updatePerson('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
        $path = $spy->lastCall()['path'];
        $this->assertStringContainsString('person_name=', $path);
    }

    public function test_put_update_person_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Person($spy);
        $obj->updatePerson('access_token', 'refresh_token', 'test_value', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_get_all_persons_from_project_exists(): void {
        $this->assertTrue(method_exists(Person::class, 'getAllPersonsFromProject'));
    }

    public function test_get_get_all_persons_from_project_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Person($spy);
        $obj->getAllPersonsFromProject('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_get_all_persons_from_project_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Person($spy);
        $obj->getAllPersonsFromProject('access_token', 'refresh_token', 'test_value');
        $this->assertStringContainsString('/api/v1/person/test_value/', $spy->lastCall()['path']);
    }

    public function test_get_get_all_persons_from_project_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Person($spy);
        $obj->getAllPersonsFromProject('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
