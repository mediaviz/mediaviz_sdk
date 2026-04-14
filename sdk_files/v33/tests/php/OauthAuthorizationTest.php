<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\OauthAuthorization;

require_once __DIR__ . '/helpers.php';

class OauthAuthorizationTest extends TestCase {
    public function test_get_authorize_exists(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'authorize'));
    }

    public function test_get_authorize_http_method(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'authorize'));
    }

    public function test_get_authorize_path(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'authorize'));
    }

    public function test_get_authorize_query_params(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'authorize'));
    }

    public function test_get_authorize_auth_routing(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'authorize'));
    }

    public function test_get_get_consent_exists(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'getConsent'));
    }

    public function test_get_get_consent_http_method(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'getConsent'));
    }

    public function test_get_get_consent_path(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'getConsent'));
    }

    public function test_get_get_consent_auth_routing(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'getConsent'));
    }

    public function test_post_post_approve_consent_exists(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'postApproveConsent'));
    }

    public function test_post_post_approve_consent_http_method(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'postApproveConsent'));
    }

    public function test_post_post_approve_consent_path(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'postApproveConsent'));
    }

    public function test_post_post_approve_consent_auth_routing(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'postApproveConsent'));
    }

    public function test_post_post_deny_consent_exists(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'postDenyConsent'));
    }

    public function test_post_post_deny_consent_http_method(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'postDenyConsent'));
    }

    public function test_post_post_deny_consent_path(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'postDenyConsent'));
    }

    public function test_post_post_deny_consent_auth_routing(): void {
        $this->assertTrue(method_exists(OauthAuthorization::class, 'postDenyConsent'));
    }

}
