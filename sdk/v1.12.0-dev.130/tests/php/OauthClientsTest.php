<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\OauthClients;

require_once __DIR__ . '/helpers.php';

class OauthClientsTest extends TestCase {
    public function test_post_create_api_credential_exists(): void {
        $this->assertTrue(method_exists(OauthClients::class, 'createApiCredential'));
    }

    public function test_post_create_api_credential_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->createApiCredential('test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_api_credential_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->createApiCredential('test_value');
        $this->assertStringContainsString('/oauth/clients/api-credentials', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_api_credential_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->createApiCredential('test_value');
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('credential_name', $body);
    }

    public function test_post_create_api_credential_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->createApiCredential('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_company_api_credentials_exists(): void {
        $this->assertTrue(method_exists(OauthClients::class, 'getCompanyApiCredentials'));
    }

    public function test_get_get_company_api_credentials_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->getCompanyApiCredentials();
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_company_api_credentials_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->getCompanyApiCredentials();
        $this->assertStringContainsString('/oauth/clients/api-credentials', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_company_api_credentials_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->getCompanyApiCredentials();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_revoke_api_credential_exists(): void {
        $this->assertTrue(method_exists(OauthClients::class, 'revokeApiCredential'));
    }

    public function test_post_revoke_api_credential_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->revokeApiCredential('test_value');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_revoke_api_credential_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->revokeApiCredential('hello world');
        $this->assertStringContainsString('/oauth/clients/api-credentials/hello%20world/revoke', $ctx->client->lastCall()['path']);
    }

    public function test_post_revoke_api_credential_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new OauthClients($ctx);
        $obj->revokeApiCredential('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

}
