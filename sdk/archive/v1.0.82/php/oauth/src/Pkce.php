<?php

declare(strict_types=1);

namespace OAuthSdk;

final class Pkce
{
    private const VERIFIER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    private const VERIFIER_LENGTH = 64;

    public static function generateVerifier(): string
    {
        $chars = self::VERIFIER_CHARS;
        $len = strlen($chars);
        $verifier = '';

        for ($i = 0; $i < self::VERIFIER_LENGTH; $i++) {
            $verifier .= $chars[random_int(0, $len - 1)];
        }

        return $verifier;
    }

    public static function computeChallenge(string $verifier): string
    {
        $hash = hash('sha256', $verifier, true);
        return rtrim(strtr(base64_encode($hash), '+/', '-_'), '=');
    }

    public static function generateState(): string
    {
        return bin2hex(random_bytes(16));
    }
}
