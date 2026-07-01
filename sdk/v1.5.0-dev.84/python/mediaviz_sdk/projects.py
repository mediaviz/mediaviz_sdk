from __future__ import annotations
from typing import Any
from urllib.parse import quote, urlencode
import httpx

from .errors import handle_response


class Projects:
    def __init__(self, ctx) -> None:
        self._ctx = ctx

    def create_project_and_run(
        self,
        name: str,
        private: bool | None = None,
        type: int | None = None,
        description: str | None = None,
        directory: str | None = None,
        photoUploadVector: int | None = None,
        thumbnail: str | None = None,
        runName: str | None = None,
        outcomes: Any | None = None,
        models: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/project_outcome/'
        _q: dict[str, Any] = {}
        if outcomes is not None:
            _q['outcomes'] = outcomes
        if models is not None:
            _q['models'] = models
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        body = {k: v for k, v in {
            'name': name,
            'private': private,
            'type': type,
            'description': description,
            'directory': directory,
            'photo_upload_vector': photoUploadVector,
            'thumbnail': thumbnail,
            'run_name': runName,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token, body).data

    def mark_project_upload_complete(
        self,
        project_table_name: str,
        skipped_file_count: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/project/' + quote(str(project_table_name), safe='') + '/upload_complete/'
        _q: dict[str, Any] = {}
        if skipped_file_count is not None:
            _q['skipped_file_count'] = skipped_file_count
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token).data

    def check_project_status(self, project_table_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/project/status/' + quote(str(project_table_name), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_project_prelim_model_request_template(self, project_table_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/project_outcome/' + quote(str(project_table_name), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_user_projects(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/projects/user'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_admin_projects(self) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/projects/admin'
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_project_by_id(self, project_id: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/projects/' + quote(str(project_id), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_project_by_directory(self, directory: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/projects/directory/' + quote(str(directory), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def update_project(
        self,
        project_id: str,
        *,
        private: bool | None = None,
        type: int | None = None,
        description: str | None = None,
        directory: str | None = None,
        name: str | None = None,
        thumbnail: str | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/projects/' + quote(str(project_id), safe='')
        body = {k: v for k, v in {
            'private': private,
            'type': type,
            'description': description,
            'directory': directory,
            'name': name,
            'thumbnail': thumbnail,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token, body).data

    def update_project_photo_count(
        self,
        table_name: str,
        files_failed_count: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/projects_photos/' + quote(str(table_name), safe='') + '/'
        _q: dict[str, Any] = {}
        if files_failed_count is not None:
            _q['files_failed_count'] = files_failed_count
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token).data

    def update_project_create_upload_report(
        self,
        table_name: str,
        files_failed_count: Any | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/project_upload_report/' + quote(str(table_name), safe='') + '/'
        _q: dict[str, Any] = {}
        if files_failed_count is not None:
            _q['files_failed_count'] = files_failed_count
        if _q:
            path += '?' + urlencode(_q, doseq=True)
        return self._ctx.client.request(path, 'PUT', self._ctx.access_token, self._ctx.refresh_token).data

    def request_project_similarity_queue(
        self,
        project_table_name: str,
        level: str,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/projects_similarity_queue/' + quote(str(project_table_name), safe='') + '/level/' + quote(str(level), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def request_project_evidence_queue(self, project_table_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/projects_evidence_queue/' + quote(str(project_table_name), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def request_project_personhood_queue(self, project_table_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/projects_personhood_queue/' + quote(str(project_table_name), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def request_insights_queue(self, analysis_level: str, identifier: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/insights_queue/analysis_level/' + quote(str(analysis_level), safe='') + '/identifier/' + quote(str(identifier), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def request_project_export(self, project_table_name: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/projects_export/' + quote(str(project_table_name), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def get_project_process_status(
        self,
        project_table_name: str,
        model_name: str,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/projects/' + quote(str(project_table_name), safe='') + '/process_status/' + quote(str(model_name), safe='')
        return self._ctx.client.request(path, 'GET', self._ctx.access_token, self._ctx.refresh_token).data

    def add_project_event(
        self,
        project_table_name: str,
        event: str,
        detail: str | None = None,
    ) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/projects/' + quote(str(project_table_name), safe='') + '/event'
        body = {k: v for k, v in {
            'event': event,
            'detail': detail,
        }.items() if v is not None}
        return self._ctx.client.request(path, 'POST', self._ctx.access_token, self._ctx.refresh_token, body).data

    def delete_project(self, project_id: str) -> dict[str, Any]:
        self._ctx.require_tokens()
        path = '/api/v1/projects/' + quote(str(project_id), safe='')
        return self._ctx.client.request(path, 'DELETE', self._ctx.access_token, self._ctx.refresh_token).data
