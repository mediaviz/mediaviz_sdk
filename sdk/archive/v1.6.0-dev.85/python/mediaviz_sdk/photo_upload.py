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
        fileContent: Any,
        mimetype: Any,
        filePath: Any,
        companyId: Any,
        userId: Any,
        projectTableName: Any,
        clientSideId: Any,
        format: Any,
        size: Any,
        sourceResolutionX: Any,
        sourceResolutionY: Any,
        dateTaken: Any,
        latitude: Any,
        longitude: Any,
        blur: Any,
        colors: Any,
        faceRecognition: Any,
        imageDescribe: Any,
        imageClassification: Any,
        imageComparison: Any,
        ocr: Any,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        _base_url = self._ctx.require_host('photoUpload')
        path = '/photo_upload'
        _headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self._ctx.access_token}',
        }
        body = {
            'file_content': fileContent,
            'mimetype': mimetype,
            'file_path': filePath,
            'company_id': companyId,
            'user_id': userId,
            'project_table_name': projectTableName,
            'client_side_id': clientSideId,
            'format': format,
            'size': size,
            'source_resolution_x': sourceResolutionX,
            'source_resolution_y': sourceResolutionY,
            'date_taken': dateTaken,
            'latitude': latitude,
            'longitude': longitude,
            'blur': blur,
            'colors': colors,
            'face_recognition': faceRecognition,
            'image_describe': imageDescribe,
            'image_classification': imageClassification,
            'image_comparison': imageComparison,
            'ocr': ocr,
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
        }
        _body = {
            'file_content': (photo or {}).get('file_content'),
            'mimetype': (photo or {}).get('mimetype'),
            'file_path': (photo or {}).get('file_path'),
            'company_id': company_id,
            'user_id': user_id,
            'project_table_name': project_table_name,
            'client_side_id': (photo or {}).get('client_side_id'),
            'format': (photo or {}).get('format'),
            'size': (photo or {}).get('size'),
            'source_resolution_x': (photo or {}).get('source_resolution_x'),
            'source_resolution_y': (photo or {}).get('source_resolution_y'),
            'date_taken': (photo or {}).get('date_taken'),
            'latitude': (photo or {}).get('latitude'),
            'longitude': (photo or {}).get('longitude'),
            'blur': ('true' if ((template or {}).get('headers') or {}).get('blur') in (True, 'true') else None),
            'colors': ('true' if ((template or {}).get('headers') or {}).get('colors') in (True, 'true') else None),
            'face_recognition': ('true' if ((template or {}).get('headers') or {}).get('face_recognition') in (True, 'true') else None),
            'image_describe': ('true' if ((template or {}).get('headers') or {}).get('image_describe') in (True, 'true') else None),
            'image_classification': ('true' if ((template or {}).get('headers') or {}).get('image_classification') in (True, 'true') else None),
            'image_comparison': ('true' if ((template or {}).get('headers') or {}).get('image_comparison') in (True, 'true') else None),
            'ocr': ('true' if ((template or {}).get('headers') or {}).get('ocr') in (True, 'true') else None),
        }
        with httpx.Client() as _c:
            _resp = _c.request('POST', _base_url + '/photo_upload', headers=_headers, json=_body)
        upload_result = handle_response(_resp.text, _resp.status_code, dict(_resp.headers))

        return upload_result
