import { handleResponse } from './errors.js';
import { Projects } from './projects.js';

export class Photoupload {
  constructor(ctx) { this._ctx = ctx; this._caches = {}; }

  async uploadPhotoToMediaviz({ fileContent, mimetype, filePath, companyId, userId, projectTableName, clientSideId, format, size, sourceResolutionX, sourceResolutionY, dateTaken, latitude, longitude, blur, colors, faceRecognition, imageDescribe, imageClassification, imageComparison, ocr }) {
    this._ctx.requireTokens();
    const baseUrl = this._ctx.requireHost('photoUpload');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._ctx.accessToken}`,
    };
    const resp = await fetch(baseUrl + `/photo_upload`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ file_content: fileContent, mimetype, file_path: filePath, company_id: companyId, user_id: userId, project_table_name: projectTableName, client_side_id: clientSideId, format, size, source_resolution_x: sourceResolutionX, source_resolution_y: sourceResolutionY, date_taken: dateTaken, latitude, longitude, blur, colors, face_recognition: faceRecognition, image_describe: imageDescribe, image_classification: imageClassification, image_comparison: imageComparison, ocr }),
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

    const upload_result = await this.uploadPhotoToMediaviz({ fileContent: photo.fileContent, mimetype: photo.mimetype, filePath: photo.filePath, companyId: companyId, userId: userId, projectTableName: projectTableName, clientSideId: photo.clientSideId, format: photo.format, size: photo.size, sourceResolutionX: photo.sourceResolutionX, sourceResolutionY: photo.sourceResolutionY, dateTaken: photo.dateTaken, latitude: photo.latitude, longitude: photo.longitude, blur: ((template?.headers?.['blur'] === true || template?.headers?.['blur'] === 'true') ? 'true' : undefined), colors: ((template?.headers?.['colors'] === true || template?.headers?.['colors'] === 'true') ? 'true' : undefined), faceRecognition: ((template?.headers?.['face_recognition'] === true || template?.headers?.['face_recognition'] === 'true') ? 'true' : undefined), imageDescribe: ((template?.headers?.['image_describe'] === true || template?.headers?.['image_describe'] === 'true') ? 'true' : undefined), imageClassification: ((template?.headers?.['image_classification'] === true || template?.headers?.['image_classification'] === 'true') ? 'true' : undefined), imageComparison: ((template?.headers?.['image_comparison'] === true || template?.headers?.['image_comparison'] === 'true') ? 'true' : undefined), ocr: ((template?.headers?.['ocr'] === true || template?.headers?.['ocr'] === 'true') ? 'true' : undefined) });

    return upload_result;
  }
}
