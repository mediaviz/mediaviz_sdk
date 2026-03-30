<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Authentication {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function createToken(
        string $baseUrl,
        mixed $type,
        mixed $required,
        mixed $passwordType,
        mixed $passwordRequired
    ): mixed {
        $path = "/api/v1/token/";
        $body = [
            'username' => ['type' => $type, 'required' => $required],
            'password' => ['type' => $passwordType, 'required' => $passwordRequired],
        ];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $baseUrl . $path);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true);
    }

    public function createRequestPasswordReset(
        string $accessToken,
        string $refreshToken,
        ?string $email = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/request-password-reset";
        $query = [];
        if ($email !== null) $query['email'] = $email;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'POST', $accessToken, $refreshToken);
    }

    public function createResetPassword(
        string $baseUrl,
        mixed $type,
        mixed $required,
        mixed $newPasswordType,
        mixed $newPasswordRequired
    ): mixed {
        $path = "/api/v1/reset-password";
        $body = [
            'token' => ['type' => $type, 'required' => $required],
            'new_password' => ['type' => $newPasswordType, 'required' => $newPasswordRequired],
        ];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $baseUrl . $path);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true);
    }

    public function createLogout(string $accessToken, string $refreshToken): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/logout";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken);
    }

    public function getShareauthPhp(string $baseUrl): mixed {
        $path = "/shareAuth.php";
        $ch = curl_init($baseUrl . $path);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true);
    }
}
