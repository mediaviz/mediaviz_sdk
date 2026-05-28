<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\OauthClients;

require_once __DIR__ . '/helpers.php';

class OauthClientsTest extends TestCase {
    public function test_post_create_client_exists(): void {
        $this->assertTrue(method_exists(OauthClients::class, 'createClient'));
    }

    public function test_post_create_client_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->createClient('test_value', 'test_value', ['item1', 'item2'], true);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_client_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->createClient('test_value', 'test_value', ['item1', 'item2'], true);
        $this->assertStringContainsString('/oauth/clients', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_client_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->createClient('test_value', 'test_value', ['item1', 'item2'], true);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('client_name', $body);
        $this->assertArrayHasKey('client_type', $body);
        $this->assertArrayHasKey('redirect_uris', $body);
        $this->assertArrayHasKey('is_first_party', $body);
    }

    public function test_post_create_client_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->createClient('test_value', 'test_value', ['item1', 'item2'], true);
        $this->assertCount(1, $ctx->client->calls);
    }

}
