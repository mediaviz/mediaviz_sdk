from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class PhotoUpload:
    def __init__(self, ctx) -> None:
        self._ctx = ctx
        self._get_template_cache: dict[str, Any] = {}

    def upload_photo_to_mediaviz(
        self,
        bucketName: str,
        photoIndex: str,
        companyId: str,
        userId: str,
        projectTableName: str,
        title: str,
        fileContent: Any,
        mimetype: Any,
        filePath: Any,
        clientSideId: str | None = None,
        blur: str | None = None,
        colors: str | None = None,
        faceRecognition: str | None = None,
        imageDescribe: str | None = None,
        imageClassification: str | None = None,
        imageComparison: str | None = None,
        size: str | None = None,
        sourceResolutionX: str | None = None,
        sourceResolutionY: str | None = None,
        dateTaken: str | None = None,
        latitude: str | None = None,
        longitude: str | None = None,
        resizedDimensions: str | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        _base_url = self._ctx.require_host('photoUpload')
        path = '/photo_upload'
        _headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self._ctx.access_token}',
            'x-bucket-name': bucketName,
            'x-photo-index': photoIndex,
            'x-company-id': companyId,
            'x-user-id': userId,
            'x-project-table-name': projectTableName,
            'x-title': title,
        }
        if clientSideId is not None:
            _headers['x-client-side-id'] = clientSideId
        if blur is not None:
            _headers['x-blur'] = blur
        if colors is not None:
            _headers['x-colors'] = colors
        if faceRecognition is not None:
            _headers['x-face-recognition'] = faceRecognition
        if imageDescribe is not None:
            _headers['x-image-describe'] = imageDescribe
        if imageClassification is not None:
            _headers['x-image-classification'] = imageClassification
        if imageComparison is not None:
            _headers['x-image-comparison'] = imageComparison
        if size is not None:
            _headers['x-size'] = size
        if sourceResolutionX is not None:
            _headers['x-source-resolution-x'] = sourceResolutionX
        if sourceResolutionY is not None:
            _headers['x-source-resolution-y'] = sourceResolutionY
        if dateTaken is not None:
            _headers['x-date-taken'] = dateTaken
        if latitude is not None:
            _headers['x-latitude'] = latitude
        if longitude is not None:
            _headers['x-longitude'] = longitude
        if resizedDimensions is not None:
            _headers['x-resized-dimensions'] = resizedDimensions
        body = {
            'file_content': fileContent,
            'mimetype': mimetype,
            'file_path': filePath,
        }
        with httpx.Client() as _client:
            _resp = _client.request('POST', _base_url + path, json=body, headers=_headers)
        return handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

    def upload_photo(
        self,
        project_table_name: str,
        company_id: str,
        user_id: str,
        photo_index: int,
        photo: Any,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()

        _cache_key = f"upload_template:{project_table_name}"
        if _cache_key in self._get_template_cache:
            template = self._get_template_cache[_cache_key]
        else:
            _path = '/api/v1/project_outcome/' + quote(str(project_table_name), safe='')
            template = self._ctx.client.request(_path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data
            self._get_template_cache[_cache_key] = template

        _base_url = self._ctx.require_host('photoUpload')
        _headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self._ctx.access_token}',
            'x-bucket-name': template['bucket_name'],
            'x-photo-index': photo_index,
            'x-company-id': company_id,
            'x-user-id': user_id,
            'x-project-table-name': project_table_name,
            'x-title': photo['title'],
        }
        if photo['client_side_id'] is not None:
            _headers['x-client-side-id'] = photo['client_side_id']
        if photo['blur'] is not None:
            _headers['x-blur'] = photo['blur']
        if photo['colors'] is not None:
            _headers['x-colors'] = photo['colors']
        if photo['face_recognition'] is not None:
            _headers['x-face-recognition'] = photo['face_recognition']
        if photo['image_describe'] is not None:
            _headers['x-image-describe'] = photo['image_describe']
        if photo['image_classification'] is not None:
            _headers['x-image-classification'] = photo['image_classification']
        if photo['image_comparison'] is not None:
            _headers['x-image-comparison'] = photo['image_comparison']
        if photo['size'] is not None:
            _headers['x-size'] = photo['size']
        if photo['source_resolution_x'] is not None:
            _headers['x-source-resolution-x'] = photo['source_resolution_x']
        if photo['source_resolution_y'] is not None:
            _headers['x-source-resolution-y'] = photo['source_resolution_y']
        if photo['date_taken'] is not None:
            _headers['x-date-taken'] = photo['date_taken']
        if photo['latitude'] is not None:
            _headers['x-latitude'] = photo['latitude']
        if photo['longitude'] is not None:
            _headers['x-longitude'] = photo['longitude']
        if photo['resized_dimensions'] is not None:
            _headers['x-resized-dimensions'] = photo['resized_dimensions']
        _body = {
            'file_content': photo['file_content'],
            'mimetype': photo['mimetype'],
            'file_path': photo['file_path'],
        }
        with httpx.Client() as _c:
            _resp = _c.request('POST', _base_url + '/photo_upload', headers=_headers, json=_body)
        upload_result = handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

        return upload_result
