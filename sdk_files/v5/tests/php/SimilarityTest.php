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
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Similarity($spy);
        $obj->getProjectsSimilarityLevelMedium('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_projects_similarity_level_medium_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Similarity($spy);
        $obj->getProjectsSimilarityLevelMedium('access_token', 'refresh_token', 'hello world');
        $this->assertStringContainsString('/api/v1/projects_similarity/hello%20world/level/medium', $spy->lastCall()['path']);
    }

    public function test_get_projects_similarity_level_medium_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Similarity($spy);
        $obj->getProjectsSimilarityLevelMedium('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_projects_similarity_queue_level_exists(): void {
        $this->assertTrue(method_exists(Similarity::class, 'getProjectsSimilarityQueueLevel'));
    }

    public function test_get_projects_similarity_queue_level_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Similarity($spy);
        $obj->getProjectsSimilarityQueueLevel('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_projects_similarity_queue_level_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Similarity($spy);
        $obj->getProjectsSimilarityQueueLevel('access_token', 'refresh_token', 'hello world', 'hello world');
        $this->assertStringContainsString('/api/v1/projects_similarity_queue/hello%20world/level/hello%20world', $spy->lastCall()['path']);
    }

    public function test_get_projects_similarity_queue_level_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Similarity($spy);
        $obj->getProjectsSimilarityQueueLevel('access_token', 'refresh_token', 'test_value', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

    public function test_get_projects_personhood_queue_exists(): void {
        $this->assertTrue(method_exists(Similarity::class, 'getProjectsPersonhoodQueue'));
    }

    public function test_get_projects_personhood_queue_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Similarity($spy);
        $obj->getProjectsPersonhoodQueue('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_projects_personhood_queue_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Similarity($spy);
        $obj->getProjectsPersonhoodQueue('access_token', 'refresh_token', 'hello world');
        $this->assertStringContainsString('/api/v1/projects_personhood_queue/hello%20world', $spy->lastCall()['path']);
    }

    public function test_get_projects_personhood_queue_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Similarity($spy);
        $obj->getProjectsPersonhoodQueue('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
