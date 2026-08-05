<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Subscription;

require_once __DIR__ . '/helpers.php';

class SubscriptionTest extends TestCase {
    public function test_post_create_subscription_exists(): void {
        $this->assertTrue(method_exists(Subscription::class, 'createSubscription'));
    }

    public function test_post_create_subscription_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->createSubscription('test_value', 'test_value', ['item1', 'item2']);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_create_subscription_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->createSubscription('test_value', 'test_value', ['item1', 'item2']);
        $this->assertStringContainsString('/api/v1/subscriptions', $ctx->client->lastCall()['path']);
    }

    public function test_post_create_subscription_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->createSubscription('test_value', 'test_value', ['item1', 'item2']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('project_table_name', $body);
        $this->assertArrayHasKey('callback_url', $body);
        $this->assertArrayHasKey('targets', $body);
    }

    public function test_post_create_subscription_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->createSubscription('test_value', 'test_value', ['item1', 'item2']);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_verify_subscription_exists(): void {
        $this->assertTrue(method_exists(Subscription::class, 'verifySubscription'));
    }

    public function test_post_verify_subscription_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->verifySubscription('00000000-0000-0000-0000-000000000000');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_verify_subscription_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->verifySubscription('00000000-0000-0000-0000-000000000000');
        $this->assertStringContainsString('/api/v1/subscriptions/00000000-0000-0000-0000-000000000000/verify', $ctx->client->lastCall()['path']);
    }

    public function test_post_verify_subscription_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->verifySubscription('00000000-0000-0000-0000-000000000000');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_list_subscriptions_exists(): void {
        $this->assertTrue(method_exists(Subscription::class, 'listSubscriptions'));
    }

    public function test_get_list_subscriptions_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->listSubscriptions();
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_list_subscriptions_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->listSubscriptions();
        $this->assertStringContainsString('/api/v1/subscriptions', $ctx->client->lastCall()['path']);
    }

    public function test_get_list_subscriptions_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->listSubscriptions();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_list_subscription_events_exists(): void {
        $this->assertTrue(method_exists(Subscription::class, 'listSubscriptionEvents'));
    }

    public function test_get_list_subscription_events_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->listSubscriptionEvents('00000000-0000-0000-0000-000000000000', 'test_value', 42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_list_subscription_events_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->listSubscriptionEvents('00000000-0000-0000-0000-000000000000', 'test_value', 42);
        $this->assertStringContainsString('/api/v1/subscriptions/00000000-0000-0000-0000-000000000000/events', $ctx->client->lastCall()['path']);
    }

    public function test_get_list_subscription_events_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->listSubscriptionEvents('00000000-0000-0000-0000-000000000000', 'test_value', 42);
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('since=', $path);
        $this->assertStringContainsString('limit=', $path);
    }

    public function test_get_list_subscription_events_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->listSubscriptionEvents('00000000-0000-0000-0000-000000000000', 'test_value', 42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_patch_update_subscription_exists(): void {
        $this->assertTrue(method_exists(Subscription::class, 'updateSubscription'));
    }

    public function test_patch_update_subscription_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->updateSubscription('00000000-0000-0000-0000-000000000000', 'test_value', ['item1', 'item2']);
        $this->assertSame('PATCH', $ctx->client->lastCall()['method']);
    }

    public function test_patch_update_subscription_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->updateSubscription('00000000-0000-0000-0000-000000000000', 'test_value', ['item1', 'item2']);
        $this->assertStringContainsString('/api/v1/subscriptions/00000000-0000-0000-0000-000000000000', $ctx->client->lastCall()['path']);
    }

    public function test_patch_update_subscription_request_body(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->updateSubscription('00000000-0000-0000-0000-000000000000', 'test_value', ['item1', 'item2']);
        $body = $ctx->client->lastCall()['body'];
        $this->assertArrayHasKey('callback_url', $body);
        $this->assertArrayHasKey('targets', $body);
    }

    public function test_patch_update_subscription_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->updateSubscription('00000000-0000-0000-0000-000000000000', 'test_value', ['item1', 'item2']);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_delete_delete_subscription_exists(): void {
        $this->assertTrue(method_exists(Subscription::class, 'deleteSubscription'));
    }

    public function test_delete_delete_subscription_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->deleteSubscription('00000000-0000-0000-0000-000000000000');
        $this->assertSame('DELETE', $ctx->client->lastCall()['method']);
    }

    public function test_delete_delete_subscription_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->deleteSubscription('00000000-0000-0000-0000-000000000000');
        $this->assertStringContainsString('/api/v1/subscriptions/00000000-0000-0000-0000-000000000000', $ctx->client->lastCall()['path']);
    }

    public function test_delete_delete_subscription_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->deleteSubscription('00000000-0000-0000-0000-000000000000');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_rotate_subscription_secret_exists(): void {
        $this->assertTrue(method_exists(Subscription::class, 'rotateSubscriptionSecret'));
    }

    public function test_post_rotate_subscription_secret_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->rotateSubscriptionSecret('00000000-0000-0000-0000-000000000000');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_rotate_subscription_secret_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->rotateSubscriptionSecret('00000000-0000-0000-0000-000000000000');
        $this->assertStringContainsString('/api/v1/subscriptions/00000000-0000-0000-0000-000000000000/rotate_secret', $ctx->client->lastCall()['path']);
    }

    public function test_post_rotate_subscription_secret_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Subscription($ctx);
        $obj->rotateSubscriptionSecret('00000000-0000-0000-0000-000000000000');
        $this->assertCount(1, $ctx->client->calls);
    }

}
