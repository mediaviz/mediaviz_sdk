import { OAuthClient } from './_oauth.js';
import { handleResponse } from './errors.js';
import { getProjectPrelimModelRequestTemplate } from './projects.js';

export async function uploadPhotoToMediaviz(baseUrl, accessToken, bucketName, photoIndex, companyId, userId, projectTableName, title, { fileContent, mimetype, filePath }, { clientSideId, blur, colors, faceRecognition, imageClassification, imageComparison, size, sourceResolutionX, sourceResolutionY, dateTaken, latitude, longitude, resizedDimensions } = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': accessToken,
    'x-bucket-name': bucketName,
    'x-photo-index': photoIndex,
    'x-company-id': companyId,
    'x-user-id': userId,
    'x-project-table-name': projectTableName,
    'x-title': title,
  };
  if (clientSideId !== undefined) headers['x-client-side-id'] = clientSideId;
  if (blur !== undefined) headers['x-blur'] = blur;
  if (colors !== undefined) headers['x-colors'] = colors;
  if (faceRecognition !== undefined) headers['x-face-recognition'] = faceRecognition;
  if (imageClassification !== undefined) headers['x-image-classification'] = imageClassification;
  if (imageComparison !== undefined) headers['x-image-comparison'] = imageComparison;
  if (size !== undefined) headers['x-size'] = size;
  if (sourceResolutionX !== undefined) headers['x-source-resolution-x'] = sourceResolutionX;
  if (sourceResolutionY !== undefined) headers['x-source-resolution-y'] = sourceResolutionY;
  if (dateTaken !== undefined) headers['x-date-taken'] = dateTaken;
  if (latitude !== undefined) headers['x-latitude'] = latitude;
  if (longitude !== undefined) headers['x-longitude'] = longitude;
  if (resizedDimensions !== undefined) headers['x-resized-dimensions'] = resizedDimensions;
  const resp = await fetch(baseUrl + `/photo_upload`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ file_content: fileContent, mimetype, file_path: filePath }),
  });
  return handleResponse(resp);
}

export async function uploadPhoto(client, accessToken, refreshToken, baseUrl, projectTableName, companyId, userId, photoIndex, photo) {

  const _cacheKey_get_template = String(projectTableName);
  let template = uploadPhoto._cache.get(_cacheKey_get_template);
  if (template === undefined) {
    template = await getProjectPrelimModelRequestTemplate(client, accessToken, refreshToken, projectTableName);
    uploadPhoto._cache.set(_cacheKey_get_template, template);
  }

  const _headers_upload_result = {
    'Content-Type': 'application/json',
    'Authorization': accessToken,
    'x-bucket-name': String(template.bucket_name),
    'x-photo-index': String(photoIndex),
    'x-company-id': String(companyId),
    'x-user-id': String(userId),
    'x-project-table-name': String(projectTableName),
    'x-title': String(photo.title),
  };
  if (photo.clientSideId !== undefined) _headers_upload_result['x-client-side-id'] = String(photo.clientSideId);
  if (photo.blur !== undefined) _headers_upload_result['x-blur'] = String(photo.blur);
  if (photo.colors !== undefined) _headers_upload_result['x-colors'] = String(photo.colors);
  if (photo.faceRecognition !== undefined) _headers_upload_result['x-face-recognition'] = String(photo.faceRecognition);
  if (photo.imageClassification !== undefined) _headers_upload_result['x-image-classification'] = String(photo.imageClassification);
  if (photo.imageComparison !== undefined) _headers_upload_result['x-image-comparison'] = String(photo.imageComparison);
  if (photo.size !== undefined) _headers_upload_result['x-size'] = String(photo.size);
  if (photo.sourceResolutionX !== undefined) _headers_upload_result['x-source-resolution-x'] = String(photo.sourceResolutionX);
  if (photo.sourceResolutionY !== undefined) _headers_upload_result['x-source-resolution-y'] = String(photo.sourceResolutionY);
  if (photo.dateTaken !== undefined) _headers_upload_result['x-date-taken'] = String(photo.dateTaken);
  if (photo.latitude !== undefined) _headers_upload_result['x-latitude'] = String(photo.latitude);
  if (photo.longitude !== undefined) _headers_upload_result['x-longitude'] = String(photo.longitude);
  if (photo.resizedDimensions !== undefined) _headers_upload_result['x-resized-dimensions'] = String(photo.resizedDimensions);
  const _resp_upload_result = await fetch(baseUrl + `/photo_upload`, {
    method: 'POST',
    headers: _headers_upload_result,
    body: JSON.stringify({ file_content: photo.fileContent, mimetype: photo.mimetype, file_path: photo.filePath }),
  });
  const upload_result = await handleResponse(_resp_upload_result);

  return upload_result;
}
uploadPhoto._cache = new Map();
