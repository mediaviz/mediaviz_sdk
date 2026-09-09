<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;

class ExceptionsTest extends TestCase {
    public function test_ApiException_exists(): void {
        $this->assertTrue(class_exists('MediaVizSdk\\ApiException'));
    }

    public function test_ApiException_extends_exception(): void {
        $ref = new ReflectionClass('MediaVizSdk\\ApiException');
        $this->assertTrue($ref->isSubclassOf(Exception::class));
    }

    public function test_ValidationException_exists(): void {
        $this->assertTrue(class_exists('MediaVizSdk\\ValidationException'));
    }

    public function test_ValidationException_extends_exception(): void {
        $ref = new ReflectionClass('MediaVizSdk\\ValidationException');
        $this->assertTrue($ref->isSubclassOf(Exception::class));
    }

    public function test_NotFoundException_exists(): void {
        $this->assertTrue(class_exists('MediaVizSdk\\NotFoundException'));
    }

    public function test_NotFoundException_extends_exception(): void {
        $ref = new ReflectionClass('MediaVizSdk\\NotFoundException');
        $this->assertTrue($ref->isSubclassOf(Exception::class));
    }

    public function test_RateLimitException_exists(): void {
        $this->assertTrue(class_exists('MediaVizSdk\\RateLimitException'));
    }

    public function test_RateLimitException_extends_exception(): void {
        $ref = new ReflectionClass('MediaVizSdk\\RateLimitException');
        $this->assertTrue($ref->isSubclassOf(Exception::class));
    }

    public function test_ServerException_exists(): void {
        $this->assertTrue(class_exists('MediaVizSdk\\ServerException'));
    }

    public function test_ServerException_extends_exception(): void {
        $ref = new ReflectionClass('MediaVizSdk\\ServerException');
        $this->assertTrue($ref->isSubclassOf(Exception::class));
    }

}
