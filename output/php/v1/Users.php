<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Users {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getUsers(
        string $accessToken,
        string $refreshToken,
        int $userId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/users/" . urlencode($userId) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }

    public function createUsersNewCompany(
        string $baseUrl,
        mixed $name,
        mixed $email,
        mixed $password,
        mixed $accountType,
        mixed $companyId,
        mixed $profilePicture,
        mixed $companyName
    ): mixed {
        $path = "/api/v1/users/new_company";
        $body = [
            'user' => ['name' => $name, 'email' => $email, 'password' => $password, 'account_type' => $accountType, 'company_id' => $companyId, 'profile_picture' => $profilePicture],
            'company' => ['name' => $companyName],
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

    public function updateUsers(
        string $accessToken,
        string $refreshToken,
        int $userId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/users/" . urlencode($userId) . ;
        return $this->client->request($path, 'PUT', $accessToken, $refreshToken);
    }

    public function deleteUsersDelete(
        string $accessToken,
        string $refreshToken,
        int $userId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/users/delete/" . urlencode($userId) . ;
        return $this->client->request($path, 'DELETE', $accessToken, $refreshToken);
    }

    public function createUserChangePassword(string $accessToken, string $refreshToken): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/user/change_password";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken);
    }

    public function createUsers(string $accessToken, string $refreshToken): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/users/";
        return $this->client->request($path, 'POST', $accessToken, $refreshToken);
    }

    public function getUsersCompany(
        string $accessToken,
        string $refreshToken,
        int $companyId
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/users/company/" . urlencode($companyId) . ;
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
