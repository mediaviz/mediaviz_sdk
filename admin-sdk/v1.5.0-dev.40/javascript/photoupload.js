import { handleResponse } from './errors.js';
import { Projects } from './projects.js';

export class Photoupload {
  constructor(ctx) { this._ctx = ctx; this._caches = {}; }

  async uploadPhotoToMediaviz(fileContent, filePath, mimetype, companyId, userId, projectTableName, blur, colors, faceRecognition, imageClassification, imageComparison, imageDescribe, ocr, judgment, { clientSideId, format, size, sourceResolutionX, sourceResolutionY, dateTaken, latitude, longitude } = {}) {
    this._ctx.requireTokens();
    const baseUrl = this._ctx.requireHost('photoUpload');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._ctx.accessToken}`,
    };
    const resp = await fetch(baseUrl + `/photo_upload`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ file_content: fileContent, file_path: filePath, mimetype, company_id: companyId, user_id: userId, project_table_name: projectTableName, blur, colors, face_recognition: faceRecognition, image_classification: imageClassification, image_comparison: imageComparison, image_describe: imageDescribe, ocr, judgment, client_side_id: clientSideId, format, size, source_resolution_x: sourceResolutionX, source_resolution_y: sourceResolutionY, date_taken: dateTaken, latitude, longitude }),
    });
    return handleResponse(resp);
  }

  async uploadPhoto(companyId, userId, projectTableName, photo) {
    this._ctx.requireTokens();

    if (!this._caches['_get_template']) this._caches['_get_template'] = new Map();
    const _cacheKey_get_template = `upload_template:${projectTableName}`;
    let template = this._caches['_get_template'].get(_cacheKey_get_template);
    if (template === undefined) {
      template = (await this._ctx.client.request(`/api/v1/project_outcome/${encodeURIComponent(projectTableName)}`, 'GET', this._ctx.accessToken, this._ctx.refreshToken)).data;
      this._caches['_get_template'].set(_cacheKey_get_template, template);
    }

    const upload_result = await this.uploadPhotoToMediaviz(photo.fileContent, photo.filePath, photo.mimetype, companyId, userId, projectTableName, (((template?.body?.['blur'] ?? template?.headers?.['x-blur']) === true || (template?.body?.['blur'] ?? template?.headers?.['x-blur']) === 'true') ? 'true' : undefined), (((template?.body?.['colors'] ?? template?.headers?.['x-colors']) === true || (template?.body?.['colors'] ?? template?.headers?.['x-colors']) === 'true') ? 'true' : undefined), (((template?.body?.['face_recognition'] ?? template?.headers?.['x-face-recognition']) === true || (template?.body?.['face_recognition'] ?? template?.headers?.['x-face-recognition']) === 'true') ? 'true' : undefined), (((template?.body?.['image_classification'] ?? template?.headers?.['x-image-classification']) === true || (template?.body?.['image_classification'] ?? template?.headers?.['x-image-classification']) === 'true') ? 'true' : undefined), (((template?.body?.['image_comparison'] ?? template?.headers?.['x-image-comparison']) === true || (template?.body?.['image_comparison'] ?? template?.headers?.['x-image-comparison']) === 'true') ? 'true' : undefined), (((template?.body?.['image_describe'] ?? template?.headers?.['x-image-describe']) === true || (template?.body?.['image_describe'] ?? template?.headers?.['x-image-describe']) === 'true') ? 'true' : undefined), (((template?.body?.['ocr'] ?? template?.headers?.['x-ocr']) === true || (template?.body?.['ocr'] ?? template?.headers?.['x-ocr']) === 'true') ? 'true' : undefined), undefined, { clientSideId: photo.clientSideId, format: photo.format, size: photo.size, sourceResolutionX: photo.sourceResolutionX, sourceResolutionY: photo.sourceResolutionY, dateTaken: photo.dateTaken, latitude: photo.latitude, longitude: photo.longitude });

    return upload_result;
  }
}
