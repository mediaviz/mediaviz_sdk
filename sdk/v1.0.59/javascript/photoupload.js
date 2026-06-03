import { handleResponse } from './errors.js';
import { Projects } from './projects.js';

export class Photoupload {
  constructor(ctx) { this._ctx = ctx; this._caches = {}; }

  async uploadPhotoToMediaviz({ fileContent, mimetype, filePath }, { companyId, userId, projectTableName, clientSideId, title, blur, colors, faceRecognition, imageDescribe, imageClassification, imageComparison, size, sourceResolutionX, sourceResolutionY, dateTaken, latitude, longitude, bucketName, photoIndex } = {}) {
    this._ctx.requireTokens();
    const baseUrl = this._ctx.requireHost('photoUpload');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': this._ctx.accessToken,
    };
    if (companyId !== undefined) headers['x-company-id'] = companyId;
    if (userId !== undefined) headers['x-user-id'] = userId;
    if (projectTableName !== undefined) headers['x-project-table-name'] = projectTableName;
    if (clientSideId !== undefined) headers['x-client-side-id'] = clientSideId;
    if (title !== undefined) headers['x-title'] = title;
    if (blur !== undefined) headers['x-blur'] = blur;
    if (colors !== undefined) headers['x-colors'] = colors;
    if (faceRecognition !== undefined) headers['x-face-recognition'] = faceRecognition;
    if (imageDescribe !== undefined) headers['x-image-describe'] = imageDescribe;
    if (imageClassification !== undefined) headers['x-image-classification'] = imageClassification;
    if (imageComparison !== undefined) headers['x-image-comparison'] = imageComparison;
    if (size !== undefined) headers['x-size'] = size;
    if (sourceResolutionX !== undefined) headers['x-source-resolution-x'] = sourceResolutionX;
    if (sourceResolutionY !== undefined) headers['x-source-resolution-y'] = sourceResolutionY;
    if (dateTaken !== undefined) headers['x-date-taken'] = dateTaken;
    if (latitude !== undefined) headers['x-latitude'] = latitude;
    if (longitude !== undefined) headers['x-longitude'] = longitude;
    if (bucketName !== undefined) headers['x-bucket-name'] = bucketName;
    if (photoIndex !== undefined) headers['x-photo-index'] = photoIndex;
    const resp = await fetch(baseUrl + `/photo_upload`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ file_content: fileContent, mimetype, file_path: filePath }),
    });
    return handleResponse(resp);
  }

  async uploadPhoto(projectTableName, companyId, userId, photoIndex, photo) {
    this._ctx.requireTokens();

    if (!this._caches['_get_template']) this._caches['_get_template'] = new Map();
    const _cacheKey_get_template = `upload_template:${projectTableName}`;
    let template = this._caches['_get_template'].get(_cacheKey_get_template);
    if (template === undefined) {
      template = (await this._ctx.client.request(`/api/v1/project_outcome/${encodeURIComponent(projectTableName)}`, 'GET', this._ctx.accessToken, this._ctx.refreshToken)).data;
      this._caches['_get_template'].set(_cacheKey_get_template, template);
    }

    const upload_result = await this.uploadPhotoToMediaviz({ fileContent: photo.fileContent, mimetype: photo.mimetype, filePath: photo.filePath }, { companyId: companyId, userId: userId, projectTableName: projectTableName, clientSideId: photo.clientSideId, title: photo.title, blur: photo.blur, colors: photo.colors, faceRecognition: photo.faceRecognition, imageDescribe: photo.imageDescribe, imageClassification: photo.imageClassification, imageComparison: photo.imageComparison, size: photo.size, sourceResolutionX: photo.sourceResolutionX, sourceResolutionY: photo.sourceResolutionY, dateTaken: photo.dateTaken, latitude: photo.latitude, longitude: photo.longitude, bucketName: template.bucket_name, photoIndex: photoIndex });

    return upload_result;
  }
}
