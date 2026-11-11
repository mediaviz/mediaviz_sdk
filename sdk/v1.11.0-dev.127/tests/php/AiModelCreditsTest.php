<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\AiModelCredits;

require_once __DIR__ . '/helpers.php';

class AiModelCreditsTest extends TestCase {
    public function test_get_get_model_credit_relationship_exists(): void {
        $this->assertTrue(method_exists(AiModelCredits::class, 'getModelCreditRelationship'));
    }

    public function test_get_get_model_credit_relationship_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new AiModelCredits($ctx);
        $obj->getModelCreditRelationship('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_model_credit_relationship_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new AiModelCredits($ctx);
        $obj->getModelCreditRelationship('hello world');
        $this->assertStringContainsString('/api/v1/model_credit/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_model_credit_relationship_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new AiModelCredits($ctx);
        $obj->getModelCreditRelationship('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

}
