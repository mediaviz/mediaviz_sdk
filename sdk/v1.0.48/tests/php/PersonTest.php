<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Person;

require_once __DIR__ . '/helpers.php';

class PersonTest extends TestCase {
    public function test_put_update_person_exists(): void {
        $this->assertTrue(method_exists(Person::class, 'updatePerson'));
    }

    public function test_put_update_person_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->updatePerson('test_value', 'test_value', 'test_value');
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_update_person_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->updatePerson('hello world', 'hello world', 'test_value');
        $this->assertStringContainsString('/api/v1/person/hello%20world/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_put_update_person_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->updatePerson('test_value', 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('person_name=', $path);
    }

    public function test_put_update_person_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->updatePerson('test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_combine_persons_exists(): void {
        $this->assertTrue(method_exists(Person::class, 'combinePersons'));
    }

    public function test_put_combine_persons_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->combinePersons('test_value', 'test_value', 'test_value');
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_combine_persons_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->combinePersons('hello world', 'hello world', 'hello world');
        $this->assertStringContainsString('/api/v1/person/hello%20world/combine/hello%20world/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_put_combine_persons_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->combinePersons('test_value', 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_put_split_persons_exists(): void {
        $this->assertTrue(method_exists(Person::class, 'splitPersons'));
    }

    public function test_put_split_persons_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->splitPersons('test_value', 42, 'test_value', 'test_value');
        $this->assertSame('PUT', $ctx->client->lastCall()['method']);
    }

    public function test_put_split_persons_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->splitPersons('hello world', 42, 'test_value', 'test_value');
        $this->assertStringContainsString('/api/v1/person/hello%20world/split/42/', $ctx->client->lastCall()['path']);
    }

    public function test_put_split_persons_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->splitPersons('test_value', 42, 'test_value', 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('new_name=', $path);
        $this->assertStringContainsString('destination_person_id=', $path);
    }

    public function test_put_split_persons_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->splitPersons('test_value', 42, 'test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_all_persons_from_project_exists(): void {
        $this->assertTrue(method_exists(Person::class, 'getAllPersonsFromProject'));
    }

    public function test_get_get_all_persons_from_project_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->getAllPersonsFromProject('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_all_persons_from_project_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->getAllPersonsFromProject('hello world');
        $this->assertStringContainsString('/api/v1/person/hello%20world/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_all_persons_from_project_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->getAllPersonsFromProject('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_all_person_names_from_project_exists(): void {
        $this->assertTrue(method_exists(Person::class, 'getAllPersonNamesFromProject'));
    }

    public function test_get_get_all_person_names_from_project_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->getAllPersonNamesFromProject('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_all_person_names_from_project_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->getAllPersonNamesFromProject('hello world');
        $this->assertStringContainsString('/api/v1/person/hello%20world/names', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_all_person_names_from_project_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->getAllPersonNamesFromProject('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_all_persons_from_photo_exists(): void {
        $this->assertTrue(method_exists(Person::class, 'getAllPersonsFromPhoto'));
    }

    public function test_get_get_all_persons_from_photo_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->getAllPersonsFromPhoto('test_value', 42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_all_persons_from_photo_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->getAllPersonsFromPhoto('hello world', 42);
        $this->assertStringContainsString('/api/v1/person/hello%20world/photo/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_all_persons_from_photo_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Person($ctx);
        $obj->getAllPersonsFromPhoto('test_value', 42);
        $this->assertCount(1, $ctx->client->calls);
    }

}
