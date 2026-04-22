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
        string $bucketName,
        string $photoIndex,
        string $companyId,
        string $userId,
        string $projectTableName,
        string $title,
        mixed $fileContent,
        mixed $mimetype,
        mixed $filePath,
        ?string $clientSideId = null,
        ?string $blur = null,
        ?string $colors = null,
        ?string $faceRecognition = null,
        ?string $imageClassification = null,
        ?string $imageComparison = null,
        ?string $size = null,
        ?string $sourceResolutionX = null,
        ?string $sourceResolutionY = null,
        ?string $dateTaken = null,
        ?string $latitude = null,
        ?string $longitude = null,
        ?string $resizedDimensions = null
    ): mixed {
        $this->ctx->requireTokens();
        $baseUrl = $this->ctx->requireHost('photoUpload');
        $accessToken = $this->ctx->accessToken;
        $path = "/photo_upload";
        $headers = [
            'Content-Type: application/json',
            'Authorization: ' . $accessToken,
            'x-bucket-name: ' . $bucketName,
            'x-photo-index: ' . $photoIndex,
            'x-company-id: ' . $companyId,
            'x-user-id: ' . $userId,
            'x-project-table-name: ' . $projectTableName,
            'x-title: ' . $title,
        ];
        if ($clientSideId !== null) $headers[] = 'x-client-side-id: ' . $clientSideId;
        if ($blur !== null) $headers[] = 'x-blur: ' . $blur;
        if ($colors !== null) $headers[] = 'x-colors: ' . $colors;
        if ($faceRecognition !== null) $headers[] = 'x-face-recognition: ' . $faceRecognition;
        if ($imageClassification !== null) $headers[] = 'x-image-classification: ' . $imageClassification;
        if ($imageComparison !== null) $headers[] = 'x-image-comparison: ' . $imageComparison;
        if ($size !== null) $headers[] = 'x-size: ' . $size;
        if ($sourceResolutionX !== null) $headers[] = 'x-source-resolution-x: ' . $sourceResolutionX;
        if ($sourceResolutionY !== null) $headers[] = 'x-source-resolution-y: ' . $sourceResolutionY;
        if ($dateTaken !== null) $headers[] = 'x-date-taken: ' . $dateTaken;
        if ($latitude !== null) $headers[] = 'x-latitude: ' . $latitude;
        if ($longitude !== null) $headers[] = 'x-longitude: ' . $longitude;
        if ($resizedDimensions !== null) $headers[] = 'x-resized-dimensions: ' . $resizedDimensions;
        $body = [
            'file_content' => $fileContent,
            'mimetype' => $mimetype,
            'file_path' => $filePath,
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
        string $projectTableName,
        string $companyId,
        string $userId,
        int $photoIndex,
        mixed $photo
    ): array {
        $this->ctx->requireTokens();

        $_cacheKey = (string)$projectTableName;
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
            'Authorization: ' . $this->ctx->accessToken,
            'x-bucket-name: ' . $template['bucket_name'],
            'x-photo-index: ' . $photoIndex,
            'x-company-id: ' . $companyId,
            'x-user-id: ' . $userId,
            'x-project-table-name: ' . $projectTableName,
            'x-title: ' . $photo['title'],
        ];
        if (($photo['client_side_id'] ?? null) !== null) $_headers[] = 'x-client-side-id: ' . $photo['client_side_id'];
        if (($photo['blur'] ?? null) !== null) $_headers[] = 'x-blur: ' . $photo['blur'];
        if (($photo['colors'] ?? null) !== null) $_headers[] = 'x-colors: ' . $photo['colors'];
        if (($photo['face_recognition'] ?? null) !== null) $_headers[] = 'x-face-recognition: ' . $photo['face_recognition'];
        if (($photo['image_classification'] ?? null) !== null) $_headers[] = 'x-image-classification: ' . $photo['image_classification'];
        if (($photo['image_comparison'] ?? null) !== null) $_headers[] = 'x-image-comparison: ' . $photo['image_comparison'];
        if (($photo['size'] ?? null) !== null) $_headers[] = 'x-size: ' . $photo['size'];
        if (($photo['source_resolution_x'] ?? null) !== null) $_headers[] = 'x-source-resolution-x: ' . $photo['source_resolution_x'];
        if (($photo['source_resolution_y'] ?? null) !== null) $_headers[] = 'x-source-resolution-y: ' . $photo['source_resolution_y'];
        if (($photo['date_taken'] ?? null) !== null) $_headers[] = 'x-date-taken: ' . $photo['date_taken'];
        if (($photo['latitude'] ?? null) !== null) $_headers[] = 'x-latitude: ' . $photo['latitude'];
        if (($photo['longitude'] ?? null) !== null) $_headers[] = 'x-longitude: ' . $photo['longitude'];
        if (($photo['resized_dimensions'] ?? null) !== null) $_headers[] = 'x-resized-dimensions: ' . $photo['resized_dimensions'];
        $_body = [
            'file_content' => $photo['file_content'],
            'mimetype' => $photo['mimetype'],
            'file_path' => $photo['file_path'],
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
