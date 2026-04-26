from __future__ import annotations
import pytest


def test_post_create_project_and_run_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'create_project_and_run', None))

def test_post_create_project_and_run_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.create_project_and_run('test_value', True, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_create_project_and_run_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.create_project_and_run('test_value', True, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', 'test_value', 'test_value')
    assert '/api/v1/project_outcome/' in spy_client.last_call()['url']

def test_post_create_project_and_run_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.create_project_and_run('test_value', True, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', 'test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'outcomes=' in url
    assert 'models=' in url

def test_post_create_project_and_run_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.create_project_and_run('test_value', True, 42, 'test_value', 'test_value', 42, 'test_value', 'test_value', 'test_value', 'test_value')
    body = spy_client.last_call()['body']
    assert 'name' in body
    assert 'private' in body
    assert 'type' in body
    assert 'description' in body
    assert 'directory' in body
    assert 'photo_upload_vector' in body
    assert 'thumbnail' in body
    assert 'run_name' in body

def test_post_mark_project_upload_complete_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'mark_project_upload_complete', None))

def test_post_mark_project_upload_complete_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.mark_project_upload_complete('test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_mark_project_upload_complete_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.mark_project_upload_complete('hello world', 'test_value')
    assert '/api/v1/project/hello%20world/upload_complete/' in spy_client.last_call()['url']

def test_post_mark_project_upload_complete_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.mark_project_upload_complete('test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'skipped_file_count=' in url

def test_get_check_project_status_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'check_project_status', None))

def test_get_check_project_status_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.check_project_status('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_check_project_status_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.check_project_status('hello world')
    assert '/api/v1/project/status/hello%20world' in spy_client.last_call()['url']

def test_get_get_project_prelim_model_request_template_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'get_project_prelim_model_request_template', None))

def test_get_get_project_prelim_model_request_template_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_project_prelim_model_request_template('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_project_prelim_model_request_template_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_project_prelim_model_request_template('hello world')
    assert '/api/v1/project_outcome/hello%20world' in spy_client.last_call()['url']

def test_get_get_user_projects_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'get_user_projects', None))

def test_get_get_user_projects_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_user_projects()
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_user_projects_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_user_projects()
    assert '/api/v1/projects/user' in spy_client.last_call()['url']

def test_get_get_admin_projects_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'get_admin_projects', None))

def test_get_get_admin_projects_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_admin_projects()
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_admin_projects_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_admin_projects()
    assert '/api/v1/projects/admin' in spy_client.last_call()['url']

def test_get_get_all_user_projects_admin_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'get_all_user_projects_admin', None))

def test_get_get_all_user_projects_admin_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_all_user_projects_admin(42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_all_user_projects_admin_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_all_user_projects_admin(42)
    assert '/api/v1/projects/admin/user/42' in spy_client.last_call()['url']

def test_get_get_project_by_id_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'get_project_by_id', None))

def test_get_get_project_by_id_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_project_by_id('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_project_by_id_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_project_by_id('hello world')
    assert '/api/v1/projects/hello%20world' in spy_client.last_call()['url']

def test_get_get_project_by_directory_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'get_project_by_directory', None))

def test_get_get_project_by_directory_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_project_by_directory('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_project_by_directory_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_project_by_directory('hello world')
    assert '/api/v1/projects/directory/hello%20world' in spy_client.last_call()['url']

def test_put_update_project_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'update_project', None))

def test_put_update_project_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.update_project('test_value', True, 42, 'test_value', 'test_value', 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'PUT'

def test_put_update_project_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.update_project('hello world', True, 42, 'test_value', 'test_value', 'test_value', 'test_value')
    assert '/api/v1/projects/hello%20world' in spy_client.last_call()['url']

def test_put_update_project_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.update_project('test_value', True, 42, 'test_value', 'test_value', 'test_value', 'test_value')
    body = spy_client.last_call()['body']
    assert 'private' in body
    assert 'type' in body
    assert 'description' in body
    assert 'directory' in body
    assert 'name' in body
    assert 'thumbnail' in body

def test_put_update_project_photo_count_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'update_project_photo_count', None))

def test_put_update_project_photo_count_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.update_project_photo_count('test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'PUT'

def test_put_update_project_photo_count_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.update_project_photo_count('hello world', 'test_value')
    assert '/api/v1/projects_photos/hello%20world/' in spy_client.last_call()['url']

def test_put_update_project_photo_count_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.update_project_photo_count('test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'files_failed_count=' in url

def test_put_update_project_create_upload_report_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'update_project_create_upload_report', None))

def test_put_update_project_create_upload_report_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.update_project_create_upload_report('test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'PUT'

def test_put_update_project_create_upload_report_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.update_project_create_upload_report('hello world', 'test_value')
    assert '/api/v1/project_upload_report/hello%20world/' in spy_client.last_call()['url']

def test_put_update_project_create_upload_report_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.update_project_create_upload_report('test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'files_failed_count=' in url

def test_get_request_project_similarity_queue_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'request_project_similarity_queue', None))

def test_get_request_project_similarity_queue_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.request_project_similarity_queue('test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_request_project_similarity_queue_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.request_project_similarity_queue('hello world', 'hello world')
    assert '/api/v1/projects_similarity_queue/hello%20world/level/hello%20world' in spy_client.last_call()['url']

def test_get_request_project_evidence_queue_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'request_project_evidence_queue', None))

def test_get_request_project_evidence_queue_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.request_project_evidence_queue('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_request_project_evidence_queue_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.request_project_evidence_queue('hello world')
    assert '/api/v1/projects_evidence_queue/hello%20world' in spy_client.last_call()['url']

def test_get_request_project_personhood_queue_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'request_project_personhood_queue', None))

def test_get_request_project_personhood_queue_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.request_project_personhood_queue('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_request_project_personhood_queue_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.request_project_personhood_queue('hello world')
    assert '/api/v1/projects_personhood_queue/hello%20world' in spy_client.last_call()['url']

def test_get_request_insights_queue_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'request_insights_queue', None))

def test_get_request_insights_queue_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.request_insights_queue('test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_request_insights_queue_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.request_insights_queue('hello world', 'hello world')
    assert '/api/v1/insights_queue/analysis_level/hello%20world/identifier/hello%20world' in spy_client.last_call()['url']

def test_get_request_project_export_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'request_project_export', None))

def test_get_request_project_export_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.request_project_export('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_request_project_export_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.request_project_export('hello world')
    assert '/api/v1/projects_export/hello%20world' in spy_client.last_call()['url']

def test_get_request_project_admin_export_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'request_project_admin_export', None))

def test_get_request_project_admin_export_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.request_project_admin_export('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_request_project_admin_export_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.request_project_admin_export('hello world')
    assert '/api/v1/projects_admin_export/hello%20world' in spy_client.last_call()['url']

def test_get_get_project_data_export_upload_status_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'get_project_data_export_upload_status', None))

def test_get_get_project_data_export_upload_status_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_project_data_export_upload_status('test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_project_data_export_upload_status_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.get_project_data_export_upload_status('hello world', 'hello world')
    assert '/api/v1/projects/hello%20world/upload_status/hello%20world' in spy_client.last_call()['url']

def test_post_add_project_event_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'add_project_event', None))

def test_post_add_project_event_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.add_project_event('test_value', 'test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_add_project_event_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.add_project_event('hello world', 'test_value', 'test_value')
    assert '/api/v1/projects/hello%20world/event' in spy_client.last_call()['url']

def test_post_add_project_event_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.add_project_event('test_value', 'test_value', 'test_value')
    body = spy_client.last_call()['body']
    assert 'event' in body
    assert 'detail' in body

def test_delete_delete_project_exists(mv_client):
    assert callable(getattr(mv_client.projects, 'delete_project', None))

def test_delete_delete_project_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.delete_project('test_value')
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_delete_project_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.projects.delete_project('hello world')
    assert '/api/v1/projects/hello%20world' in spy_client.last_call()['url']

