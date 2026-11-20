<?php
declare(strict_types=1);
namespace MediaVizWebhooks;

/**
 * HMAC scheme shared with the MediaViz producer: X-Signature = 'sha256=' .
 * hex(HMAC-SHA256(secret, "{X-Timestamp}." . rawBody)). The signing string is
 * the timestamp joined to the *raw request body bytes* — never re-serialized
 * JSON. Verification accepts the current and (during rotation) previous
 * secret, rejects timestamps outside the skew window, and compares digests in
 * constant time.
 */
class WebhookSigning {
    public static function sign(string $secret, string $timestamp, string $rawBody): string {
        return 'sha256=' . hash_hmac('sha256', $timestamp . '.' . $rawBody, $secret);
    }

    public static function verify(
        ?string $secretCurrent,
        ?string $secretPrevious,
        array $headers,
        string $rawBody,
        int $skewToleranceS = 300,
        ?int $now = null,
    ): bool {
        $h = self::lowerHeaders($headers);
        $timestamp = $h['x-timestamp'] ?? null;
        $signature = $h['x-signature'] ?? null;
        if (!$timestamp || !$signature) return false;
        if (!preg_match('/^-?\d+$/', $timestamp)) return false;
        if (abs(($now ?? time()) - (int)$timestamp) > $skewToleranceS) return false;
        foreach ([$secretCurrent, $secretPrevious] as $secret) {
            if ($secret !== null && $secret !== ''
                && hash_equals(self::sign($secret, $timestamp, $rawBody), $signature)) {
                return true;
            }
        }
        return false;
    }

    /** Lowercase header keys; frameworks that hand back value arrays are flattened to the first value. */
    public static function lowerHeaders(array $headers): array {
        $out = [];
        foreach ($headers as $key => $value) {
            $out[strtolower((string)$key)] = is_array($value) ? (string)($value[0] ?? '') : (string)$value;
        }
        return $out;
    }
}
