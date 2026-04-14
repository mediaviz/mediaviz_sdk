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
        $obj->createClient(['Model' => 'test_value']);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_client_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->createClient(['Model' => 'test_value']);
        $this->assertStringContainsString('/oauth/clients', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_client_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->createClient(['Model' => 'test_value']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertIsArray($body);
    }

    public function test_post_create_client_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->createClient(['Model' => 'test_value']);
        $this->assertCount(1, $ctx->client->calls);
    }

}
