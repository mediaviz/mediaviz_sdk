<?php
declare(strict_types=1);
namespace MediaVizSdk;

require_once __DIR__ . '/Exceptions.php';

class Photoupload {

    public function postUploadPhoto(
        string $baseUrl,
        string $accessToken,
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
