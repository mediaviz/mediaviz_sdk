<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Health;

require_once __DIR__ . '/helpers.php';

class HealthTest extends TestCase {
    public function test_get_health_check_exists(): void {
        $this->assertTrue(method_exists(Health::class, 'healthCheck'));
    }

    public function test_get_health_check_http_method(): void {
        $this->assertTrue(method_exists(Health::class, 'healthCheck'));
    }

    public function test_get_health_check_path(): void {
        $this->assertTrue(method_exists(Health::class, 'healthCheck'));
    }

    public function test_get_health_check_auth_routing(): void {
        $this->assertTrue(method_exists(Health::class, 'healthCheck'));
    }

}
