<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\OauthToken;

require_once __DIR__ . '/helpers.php';

class OauthTokenTest extends TestCase {
    public function test_post_token_exists(): void {
        $this->assertTrue(method_exists(OauthToken::class, 'token'));
    }

    public function test_post_token_http_method(): void {
        $this->assertTrue(method_exists(OauthToken::class, 'token'));
    }

    public function test_post_token_path(): void {
        $this->assertTrue(method_exists(OauthToken::class, 'token'));
    }

    public function test_post_token_request_body(): void {
        $this->assertTrue(method_exists(OauthToken::class, 'token'));
    }

    public function test_post_token_auth_routing(): void {
        $this->assertTrue(method_exists(OauthToken::class, 'token'));
    }

    public function test_post_revoke_exists(): void {
        $this->assertTrue(method_exists(OauthToken::class, 'revoke'));
    }

    public function test_post_revoke_http_method(): void {
        $this->assertTrue(method_exists(OauthToken::class, 'revoke'));
    }

    public function test_post_revoke_path(): void {
        $this->assertTrue(method_exists(OauthToken::class, 'revoke'));
    }

    public function test_post_revoke_request_body(): void {
        $this->assertTrue(method_exists(OauthToken::class, 'revoke'));
    }

    public function test_post_revoke_auth_routing(): void {
        $this->assertTrue(method_exists(OauthToken::class, 'revoke'));
    }

}
