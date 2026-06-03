<?php
declare(strict_types=1);
namespace MediaVizSdk;

require_once __DIR__ . '/Exceptions.php';

class Users {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createUser(
        string $name,
        string $email,
        int $accountType,
        ?int $companyId = null,
        ?string $profilePicture = null,
        ?string $paymentPlanType = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/users/";
        $body = array_filter([
            'name' => $name,
            'email' => $email,
            'company_id' => $companyId,
            'profile_picture' => $profilePicture,
            'payment_plan_type' => $paymentPlanType,
            'account_type' => $accountType,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function createUserAndCompany(
        string $name,
        string $email,
        string $password,
        ?int $companyId = null,
        ?string $profilePicture = null,
        ?string $paymentPlanType = null,
        ?string $companyName = null,
        ?int $credits = null,
        mixed $inviteToken = null
    ): mixed {
        $baseUrl = $this->ctx->baseUrl;
        $path = "/api/v1/users/new_company/";
        $query = [];
        if ($inviteToken !== null) $query['invite_token'] = $inviteToken;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        $body = array_filter([
            'name' => $name,
            'email' => $email,
            'company_id' => $companyId,
            'profile_picture' => $profilePicture,
            'payment_plan_type' => $paymentPlanType,
            'password' => $password,
            'company_name' => $companyName,
            'credits' => $credits,
        ], fn($v) => $v !== null);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $baseUrl . $path);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_HEADER, true);
        $raw = curl_exec($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        curl_close($ch);
        $headers = self::parseHeaders(substr($raw, 0, $headerSize));
        $body = substr($raw, $headerSize);
        return handleResponse($body, $statusCode, $headers);
    }

    public function changePassword(string $oldPassword, string $newPassword): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/user/change_password";
        $body = array_filter([
            'old_password' => $oldPassword,
            'new_password' => $newPassword,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function getUserId(): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/users";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getUser(int $userId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/users/" . rawurlencode((string)$userId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getAllUsersByCompany(int $companyId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/users/company/" . rawurlencode((string)$companyId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function updateUser(
        int $userId,
        ?string $name = null,
        ?string $email = null,
        ?string $password = null,
        ?int $companyId = null,
        ?int $accountType = null,
        ?string $profilePicture = null,
        ?string $location = null,
        ?string $phoneNumber = null,
        mixed $birthday = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/users/" . rawurlencode((string)$userId);
        $body = array_filter([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'company_id' => $companyId,
            'account_type' => $accountType,
            'profile_picture' => $profilePicture,
            'location' => $location,
            'phone_number' => $phoneNumber,
            'birthday' => $birthday,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'PUT', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    private static function parseHeaders(string $raw): array {
        $headers = [];
        foreach (explode("\r\n", $raw) as $line) {
            $parts = explode(':', $line, 2);
            if (count($parts) === 2) {
                $headers[strtolower(trim($parts[0]))] = trim($parts[1]);
            }
        }
        return $headers;
    }
}
