<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Similarity;

require_once __DIR__ . '/helpers.php';

class SimilarityTest extends TestCase {
    public function test_get_projects_similarity_level_medium_exists(): void {
        $this->assertTrue(method_exists(Similarity::class, 'getProjectsSimilarityLevelMedium'));
    }

    public function test_get_projects_similarity_level_medium_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Similarity($ctx);
        $obj->getProjectsSimilarityLevelMedium('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_projects_similarity_level_medium_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Similarity($ctx);
        $obj->getProjectsSimilarityLevelMedium('hello world');
        $this->assertStringContainsString('/api/v1/projects_similarity/hello%20world/level/medium', $ctx->client->lastCall()['path']);
    }

    public function test_get_projects_similarity_level_medium_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Similarity($ctx);
        $obj->getProjectsSimilarityLevelMedium('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_projects_similarity_queue_level_exists(): void {
        $this->assertTrue(method_exists(Similarity::class, 'getProjectsSimilarityQueueLevel'));
    }

    public function test_get_projects_similarity_queue_level_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Similarity($ctx);
        $obj->getProjectsSimilarityQueueLevel('test_value', 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_projects_similarity_queue_level_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Similarity($ctx);
        $obj->getProjectsSimilarityQueueLevel('hello world', 'hello world');
        $this->assertStringContainsString('/api/v1/projects_similarity_queue/hello%20world/level/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_projects_similarity_queue_level_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Similarity($ctx);
        $obj->getProjectsSimilarityQueueLevel('test_value', 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_projects_personhood_queue_exists(): void {
        $this->assertTrue(method_exists(Similarity::class, 'getProjectsPersonhoodQueue'));
    }

    public function test_get_projects_personhood_queue_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Similarity($ctx);
        $obj->getProjectsPersonhoodQueue('test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_projects_personhood_queue_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Similarity($ctx);
        $obj->getProjectsPersonhoodQueue('hello world');
        $this->assertStringContainsString('/api/v1/projects_personhood_queue/hello%20world', $ctx->client->lastCall()['path']);
    }

    public function test_get_projects_personhood_queue_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Similarity($ctx);
        $obj->getProjectsPersonhoodQueue('test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

}
