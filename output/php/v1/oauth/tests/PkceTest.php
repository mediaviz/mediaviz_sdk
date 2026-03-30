<?php

declare(strict_types=1);

namespace OAuthSdk\Tests;

use OAuthSdk\Pkce;
use PHPUnit\Framework\TestCase;

class PkceTest extends TestCase
{
    private const VERIFIER_ALPHABET = '/^[A-Za-z0-9\-._~]+$/';

    // RFC 7636 Appendix B test vector
    private const KNOWN_VERIFIER = 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk';
    private const KNOWN_CHALLENGE = 'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM';

    public function test_verifier_is_64_chars(): void
    {
        $this->assertSame(64, strlen(Pkce::generateVerifier()));
    }

    public function test_verifier_uses_valid_alphabet(): void
    {
        $this->assertMatchesRegularExpression(self::VERIFIER_ALPHABET, Pkce::generateVerifier());
    }

    public function test_verifier_is_unique(): void
    {
        $this->assertNotSame(Pkce::generateVerifier(), Pkce::generateVerifier());
    }

    public function test_challenge_matches_rfc7636_test_vector(): void
    {
        $this->assertSame(self::KNOWN_CHALLENGE, Pkce::computeChallenge(self::KNOWN_VERIFIER));
    }

    public function test_challenge_has_no_base64_padding(): void
    {
        $challenge = Pkce::computeChallenge(Pkce::generateVerifier());
        $this->assertStringNotContainsString('=', $challenge);
    }

    public function test_challenge_is_url_safe_base64(): void
    {
        for ($i = 0; $i < 20; $i++) {
            $challenge = Pkce::computeChallenge(Pkce::generateVerifier());
            $this->assertDoesNotMatchRegularExpression('/[+\/]/', $challenge);
        }
    }

    public function test_state_is_32_chars(): void
    {
        $this->assertSame(32, strlen(Pkce::generateState()));
    }

    public function test_state_is_lowercase_hex(): void
    {
        $this->assertMatchesRegularExpression('/^[0-9a-f]{32}$/', Pkce::generateState());
    }

    public function test_state_is_unique(): void
    {
        $this->assertNotSame(Pkce::generateState(), Pkce::generateState());
    }
}
