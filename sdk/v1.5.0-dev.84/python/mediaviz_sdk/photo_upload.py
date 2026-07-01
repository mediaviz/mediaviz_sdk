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
        ocr: str | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        _base_url = self._ctx.require_host('photoUpload')
        path = '/photo_upload'
        _headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self._ctx.access_token}',
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
        if ocr is not None:
            _headers['x-ocr'] = ocr
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
        company_id: str,
        user_id: str,
        project_table_name: str,
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
            'x-company-id': company_id,
            'x-user-id': user_id,
            'x-project-table-name': project_table_name,
            'x-title': (photo or {}).get('title'),
        }
        if (photo or {}).get('client_side_id') is not None:
            _headers['x-client-side-id'] = (photo or {}).get('client_side_id')
        if ('true' if ((template or {}).get('headers') or {}).get('x-blur') in (True, 'true') else None) is not None:
            _headers['x-blur'] = ('true' if ((template or {}).get('headers') or {}).get('x-blur') in (True, 'true') else None)
        if ('true' if ((template or {}).get('headers') or {}).get('x-colors') in (True, 'true') else None) is not None:
            _headers['x-colors'] = ('true' if ((template or {}).get('headers') or {}).get('x-colors') in (True, 'true') else None)
        if ('true' if ((template or {}).get('headers') or {}).get('x-face-recognition') in (True, 'true') else None) is not None:
            _headers['x-face-recognition'] = ('true' if ((template or {}).get('headers') or {}).get('x-face-recognition') in (True, 'true') else None)
        if ('true' if ((template or {}).get('headers') or {}).get('x-image-describe') in (True, 'true') else None) is not None:
            _headers['x-image-describe'] = ('true' if ((template or {}).get('headers') or {}).get('x-image-describe') in (True, 'true') else None)
        if ('true' if ((template or {}).get('headers') or {}).get('x-image-classification') in (True, 'true') else None) is not None:
            _headers['x-image-classification'] = ('true' if ((template or {}).get('headers') or {}).get('x-image-classification') in (True, 'true') else None)
        if ('true' if ((template or {}).get('headers') or {}).get('x-image-comparison') in (True, 'true') else None) is not None:
            _headers['x-image-comparison'] = ('true' if ((template or {}).get('headers') or {}).get('x-image-comparison') in (True, 'true') else None)
        if (photo or {}).get('size') is not None:
            _headers['x-size'] = (photo or {}).get('size')
        if (photo or {}).get('source_resolution_x') is not None:
            _headers['x-source-resolution-x'] = (photo or {}).get('source_resolution_x')
        if (photo or {}).get('source_resolution_y') is not None:
            _headers['x-source-resolution-y'] = (photo or {}).get('source_resolution_y')
        if (photo or {}).get('date_taken') is not None:
            _headers['x-date-taken'] = (photo or {}).get('date_taken')
        if (photo or {}).get('latitude') is not None:
            _headers['x-latitude'] = (photo or {}).get('latitude')
        if (photo or {}).get('longitude') is not None:
            _headers['x-longitude'] = (photo or {}).get('longitude')
        if ('true' if ((template or {}).get('headers') or {}).get('x-ocr') in (True, 'true') else None) is not None:
            _headers['x-ocr'] = ('true' if ((template or {}).get('headers') or {}).get('x-ocr') in (True, 'true') else None)
        _body = {
            'file_content': (photo or {}).get('file_content'),
            'mimetype': (photo or {}).get('mimetype'),
            'file_path': (photo or {}).get('file_path'),
        }
        with httpx.Client() as _c:
            _resp = _c.request('POST', _base_url + '/photo_upload', headers=_headers, json=_body)
        upload_result = handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

        return upload_result
