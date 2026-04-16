<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Upload {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function createUpload(
        mixed $fileContent,
        mixed $mimetype,
        mixed $filePath
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/upload";
        $body = [
            'file_content' => $fileContent,
            'mimetype' => $mimetype,
            'file_path' => $filePath,
        ];
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }
}
