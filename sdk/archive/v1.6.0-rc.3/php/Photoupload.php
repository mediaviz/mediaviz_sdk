<?php
declare(strict_types=1);
namespace MediaVizSdk;

require_once __DIR__ . '/Exceptions.php';

class Photoupload {
    private object $ctx;
    private array $_get_templateCache = [];

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function uploadPhotoToMediaviz(
        mixed $fileContent,
        mixed $filePath,
        mixed $mimetype,
        mixed $companyId,
        mixed $userId,
        mixed $projectTableName,
        mixed $blur,
        mixed $colors,
        mixed $faceRecognition,
        mixed $imageClassification,
        mixed $imageComparison,
        mixed $imageDescribe,
        mixed $ocr,
        array $options = []
    ): mixed {
        $this->ctx->requireTokens();
        $baseUrl = $this->ctx->requireHost('photoUpload');
        $accessToken = $this->ctx->accessToken;
        $path = "/photo_upload";
        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $accessToken,
        ];
        $body = array_filter([
            'file_content' => $fileContent,
            'file_path' => $filePath,
            'mimetype' => $mimetype,
            'company_id' => $companyId,
            'user_id' => $userId,
            'project_table_name' => $projectTableName,
            'blur' => $blur,
            'colors' => $colors,
            'face_recognition' => $faceRecognition,
            'image_classification' => $imageClassification,
            'image_comparison' => $imageComparison,
            'image_describe' => $imageDescribe,
            'ocr' => $ocr,
            'client_side_id' => $options['clientSideId'] ?? null,
            'format' => $options['format'] ?? null,
            'size' => $options['size'] ?? null,
            'source_resolution_x' => $options['sourceResolutionX'] ?? null,
            'source_resolution_y' => $options['sourceResolutionY'] ?? null,
            'date_taken' => $options['dateTaken'] ?? null,
            'latitude' => $options['latitude'] ?? null,
            'longitude' => $options['longitude'] ?? null,
        ], fn($v) => $v !== null);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $baseUrl . $path);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_HEADER, true);
        $raw = curl_exec($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        curl_close($ch);
        $headers = self::parseHeaders(substr($raw, 0, $headerSize));
        $body = substr($raw, $headerSize);
        return handleResponse($body, $statusCode, $headers);
    }

    public function uploadPhoto(
        string $companyId,
        string $userId,
        string $projectTableName,
        mixed $photo
    ): array {
        $this->ctx->requireTokens();

        $_cacheKey = 'upload_template:' . $projectTableName;
        if (isset($this->_get_templateCache[$_cacheKey])) {
            $template = $this->_get_templateCache[$_cacheKey];
        } else {
            $_path = "/api/v1/project_outcome/" . rawurlencode((string)$projectTableName);
            $template = $this->ctx->client->request($_path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
            $this->_get_templateCache[$_cacheKey] = $template;
        }

        $_baseUrl = $this->ctx->requireHost('photoUpload');
        $_headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $this->ctx->accessToken,
        ];
        $_body = array_filter([
            'file_content' => ($photo['file_content']) ?? null,
            'file_path' => ($photo['file_path']) ?? null,
            'mimetype' => ($photo['mimetype']) ?? null,
            'company_id' => ($companyId) ?? null,
            'user_id' => ($userId) ?? null,
            'project_table_name' => ($projectTableName) ?? null,
            'blur' => (((($template['body']['blur'] ?? $template['headers']['x-blur'] ?? null) === true || ($template['body']['blur'] ?? $template['headers']['x-blur'] ?? null) === 'true') ? 'true' : null)) ?? null,
            'colors' => (((($template['body']['colors'] ?? $template['headers']['x-colors'] ?? null) === true || ($template['body']['colors'] ?? $template['headers']['x-colors'] ?? null) === 'true') ? 'true' : null)) ?? null,
            'face_recognition' => (((($template['body']['face_recognition'] ?? $template['headers']['x-face-recognition'] ?? null) === true || ($template['body']['face_recognition'] ?? $template['headers']['x-face-recognition'] ?? null) === 'true') ? 'true' : null)) ?? null,
            'image_classification' => (((($template['body']['image_classification'] ?? $template['headers']['x-image-classification'] ?? null) === true || ($template['body']['image_classification'] ?? $template['headers']['x-image-classification'] ?? null) === 'true') ? 'true' : null)) ?? null,
            'image_comparison' => (((($template['body']['image_comparison'] ?? $template['headers']['x-image-comparison'] ?? null) === true || ($template['body']['image_comparison'] ?? $template['headers']['x-image-comparison'] ?? null) === 'true') ? 'true' : null)) ?? null,
            'image_describe' => (((($template['body']['image_describe'] ?? $template['headers']['x-image-describe'] ?? null) === true || ($template['body']['image_describe'] ?? $template['headers']['x-image-describe'] ?? null) === 'true') ? 'true' : null)) ?? null,
            'ocr' => (((($template['body']['ocr'] ?? $template['headers']['x-ocr'] ?? null) === true || ($template['body']['ocr'] ?? $template['headers']['x-ocr'] ?? null) === 'true') ? 'true' : null)) ?? null,
            'client_side_id' => ($photo['client_side_id']) ?? null,
            'format' => ($photo['format']) ?? null,
            'size' => ($photo['size']) ?? null,
            'source_resolution_x' => ($photo['source_resolution_x']) ?? null,
            'source_resolution_y' => ($photo['source_resolution_y']) ?? null,
            'date_taken' => ($photo['date_taken']) ?? null,
            'latitude' => ($photo['latitude']) ?? null,
            'longitude' => ($photo['longitude']) ?? null,
        ], fn($v) => $v !== null);
        $_ch = curl_init();
        curl_setopt($_ch, CURLOPT_URL, $_baseUrl . "/photo_upload");
        curl_setopt($_ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($_ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($_ch, CURLOPT_POSTFIELDS, json_encode($_body));
        curl_setopt($_ch, CURLOPT_HTTPHEADER, $_headers);
        curl_setopt($_ch, CURLOPT_HEADER, true);
        $_raw = curl_exec($_ch);
        $_statusCode = curl_getinfo($_ch, CURLINFO_HTTP_CODE);
        $_headerSize = curl_getinfo($_ch, CURLINFO_HEADER_SIZE);
        curl_close($_ch);
        $_respHeaders = self::parseHeaders(substr($_raw, 0, $_headerSize));
        $_respBody = substr($_raw, $_headerSize);
        $upload_result = handleResponse($_respBody, $_statusCode, $_respHeaders);

        return $upload_result;
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
