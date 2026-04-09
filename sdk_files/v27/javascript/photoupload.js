import { handleResponse } from './errors.js';

export async function postUploadPhoto(baseUrl, accessToken, bucketName, photoIndex, companyId, userId, projectTableName, title, { fileContent, mimetype, filePath }, { clientSideId, blur, colors, faceRecognition, imageClassification, imageComparison, size, sourceResolutionX, sourceResolutionY, dateTaken, latitude, longitude, resizedDimensions } = {}) {
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
