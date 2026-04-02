<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Evidence;

require_once __DIR__ . '/helpers.php';

class EvidenceTest extends TestCase {
    public function test_get_projects_evidence_exists(): void {
        $this->assertTrue(method_exists(Evidence::class, 'getProjectsEvidence'));
    }

    public function test_get_projects_evidence_http_method(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Evidence($spy);
        $obj->getProjectsEvidence('access_token', 'refresh_token', 'test_value');
        $this->assertSame('GET', $spy->lastCall()['method']);
    }

    public function test_get_projects_evidence_path(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Evidence($spy);
        $obj->getProjectsEvidence('access_token', 'refresh_token', 'hello world');
        $this->assertStringContainsString('/api/v1/projects_evidence/hello%20world', $spy->lastCall()['path']);
    }

    public function test_get_projects_evidence_auth_routing(): void {
        $spy = new \OAuthSdk\SpyOAuthClient();
        $obj = new Evidence($spy);
        $obj->getProjectsEvidence('access_token', 'refresh_token', 'test_value');
        $this->assertCount(1, $spy->calls);
    }

}
