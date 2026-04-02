<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Upload {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function createUpload(
        string $accessToken,
        string $refreshToken,
        mixed $fileContent,
        mixed $mimetype,
        mixed $filePath
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/upload";
        $body = [
            'file_content' => $fileContent,
            'mimetype' => $mimetype,
            'file_path' => $filePath,
        ];
        return $this->client->request($path, 'POST', $accessToken, $refreshToken, $body);
    }
}
