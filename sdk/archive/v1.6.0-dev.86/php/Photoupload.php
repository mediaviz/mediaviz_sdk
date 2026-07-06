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
        mixed $mimetype,
        mixed $filePath,
        mixed $companyId,
        mixed $userId,
        mixed $projectTableName,
        mixed $clientSideId,
        mixed $format,
        mixed $size,
        mixed $sourceResolutionX,
        mixed $sourceResolutionY,
        mixed $dateTaken,
        mixed $latitude,
        mixed $longitude,
        mixed $blur,
        mixed $colors,
        mixed $faceRecognition,
        mixed $imageDescribe,
        mixed $imageClassification,
        mixed $imageComparison,
        mixed $ocr
    ): mixed {
        $this->ctx->requireTokens();
        $baseUrl = $this->ctx->requireHost('photoUpload');
        $accessToken = $this->ctx->accessToken;
        $path = "/photo_upload";
        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $accessToken,
        ];
        $body = [
            'file_content' => $fileContent,
            'mimetype' => $mimetype,
            'file_path' => $filePath,
            'company_id' => $companyId,
            'user_id' => $userId,
            'project_table_name' => $projectTableName,
            'client_side_id' => $clientSideId,
            'format' => $format,
            'size' => $size,
            'source_resolution_x' => $sourceResolutionX,
            'source_resolution_y' => $sourceResolutionY,
            'date_taken' => $dateTaken,
            'latitude' => $latitude,
            'longitude' => $longitude,
            'blur' => $blur,
            'colors' => $colors,
            'face_recognition' => $faceRecognition,
            'image_describe' => $imageDescribe,
            'image_classification' => $imageClassification,
            'image_comparison' => $imageComparison,
            'ocr' => $ocr,
        ];
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
        $_body = [
            'file_content' => $photo['file_content'],
            'mimetype' => $photo['mimetype'],
            'file_path' => $photo['file_path'],
            'company_id' => $companyId,
            'user_id' => $userId,
            'project_table_name' => $projectTableName,
            'client_side_id' => $photo['client_side_id'],
            'format' => $photo['format'],
            'size' => $photo['size'],
            'source_resolution_x' => $photo['source_resolution_x'],
            'source_resolution_y' => $photo['source_resolution_y'],
            'date_taken' => $photo['date_taken'],
            'latitude' => $photo['latitude'],
            'longitude' => $photo['longitude'],
            'blur' => ((($template['headers']['blur'] ?? null) === true || ($template['headers']['blur'] ?? null) === 'true') ? 'true' : null),
            'colors' => ((($template['headers']['colors'] ?? null) === true || ($template['headers']['colors'] ?? null) === 'true') ? 'true' : null),
            'face_recognition' => ((($template['headers']['face_recognition'] ?? null) === true || ($template['headers']['face_recognition'] ?? null) === 'true') ? 'true' : null),
            'image_describe' => ((($template['headers']['image_describe'] ?? null) === true || ($template['headers']['image_describe'] ?? null) === 'true') ? 'true' : null),
            'image_classification' => ((($template['headers']['image_classification'] ?? null) === true || ($template['headers']['image_classification'] ?? null) === 'true') ? 'true' : null),
            'image_comparison' => ((($template['headers']['image_comparison'] ?? null) === true || ($template['headers']['image_comparison'] ?? null) === 'true') ? 'true' : null),
            'ocr' => ((($template['headers']['ocr'] ?? null) === true || ($template['headers']['ocr'] ?? null) === 'true') ? 'true' : null),
        ];
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
