from __future__ import annotations
import pytest


def test_post_create_keyword_filtering_list_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'create_keyword_filtering_list', None))

def test_post_create_keyword_filtering_list_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.create_keyword_filtering_list('test_value', ['item1', 'item2'])
    assert spy_client.last_call()['method'] == 'POST'

def test_post_create_keyword_filtering_list_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.create_keyword_filtering_list('test_value', ['item1', 'item2'])
    assert '/api/v1/keyword/' in spy_client.last_call()['url']

def test_post_create_keyword_filtering_list_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.create_keyword_filtering_list('test_value', ['item1', 'item2'])
    body = spy_client.last_call()['body']
    assert 'name' in body
    assert 'project_list' in body

def test_get_get_user_keyword_filtering_lists_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'get_user_keyword_filtering_lists', None))

def test_get_get_user_keyword_filtering_lists_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.get_user_keyword_filtering_lists()
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_user_keyword_filtering_lists_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.get_user_keyword_filtering_lists()
    assert '/api/v1/keyword/user' in spy_client.last_call()['url']

def test_get_get_keyword_filtering_list_and_projects_by_id_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'get_keyword_filtering_list_and_projects_by_id', None))

def test_get_get_keyword_filtering_list_and_projects_by_id_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.get_keyword_filtering_list_and_projects_by_id(42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_keyword_filtering_list_and_projects_by_id_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.get_keyword_filtering_list_and_projects_by_id(42)
    assert '/api/v1/keyword/42' in spy_client.last_call()['url']

def test_get_get_keyword_filtering_list_by_id_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'get_keyword_filtering_list_by_id', None))

def test_get_get_keyword_filtering_list_by_id_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.get_keyword_filtering_list_by_id(42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_keyword_filtering_list_by_id_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.get_keyword_filtering_list_by_id(42)
    assert '/api/v1/keyword/list/42' in spy_client.last_call()['url']

def test_get_get_existing_keyword_filtering_list_by_project_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'get_existing_keyword_filtering_list_by_project', None))

def test_get_get_existing_keyword_filtering_list_by_project_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.get_existing_keyword_filtering_list_by_project('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_existing_keyword_filtering_list_by_project_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.get_existing_keyword_filtering_list_by_project('hello world')
    assert '/api/v1/keyword/project/hello%20world' in spy_client.last_call()['url']

def test_get_get_default_keyword_filtering_list_by_project_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'get_default_keyword_filtering_list_by_project', None))

def test_get_get_default_keyword_filtering_list_by_project_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.get_default_keyword_filtering_list_by_project('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_default_keyword_filtering_list_by_project_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.get_default_keyword_filtering_list_by_project('hello world')
    assert '/api/v1/keyword/project/hello%20world/default' in spy_client.last_call()['url']

def test_put_update_keyword_filtering_list_labels_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'update_keyword_filtering_list_labels', None))

def test_put_update_keyword_filtering_list_labels_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.update_keyword_filtering_list_labels(42, ['item1', 'item2'], ['item1', 'item2'])
    assert spy_client.last_call()['method'] == 'PUT'

def test_put_update_keyword_filtering_list_labels_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.update_keyword_filtering_list_labels(42, ['item1', 'item2'], ['item1', 'item2'])
    assert '/api/v1/keyword/42' in spy_client.last_call()['url']

def test_put_update_keyword_filtering_list_labels_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.update_keyword_filtering_list_labels(42, ['item1', 'item2'], ['item1', 'item2'])
    body = spy_client.last_call()['body']
    assert 'list_keywords_to_include' in body
    assert 'list_keywords_to_exclude' in body

def test_put_update_keyword_filtering_list_details_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'update_keyword_filtering_list_details', None))

def test_put_update_keyword_filtering_list_details_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.update_keyword_filtering_list_details(42, 'test_value', ['item1', 'item2'])
    assert spy_client.last_call()['method'] == 'PUT'

def test_put_update_keyword_filtering_list_details_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.update_keyword_filtering_list_details(42, 'test_value', ['item1', 'item2'])
    assert '/api/v1/keyword/details/42' in spy_client.last_call()['url']

def test_put_update_keyword_filtering_list_details_request_body(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.update_keyword_filtering_list_details(42, 'test_value', ['item1', 'item2'])
    body = spy_client.last_call()['body']
    assert 'name' in body
    assert 'project_list' in body

def test_post_add_project_to_keyword_filtering_list_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'add_project_to_keyword_filtering_list', None))

def test_post_add_project_to_keyword_filtering_list_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.add_project_to_keyword_filtering_list(42, 'test_value')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_add_project_to_keyword_filtering_list_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.add_project_to_keyword_filtering_list(42, 'test_value')
    assert '/api/v1/keyword/42/projects' in spy_client.last_call()['url']

def test_post_add_project_to_keyword_filtering_list_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.add_project_to_keyword_filtering_list(42, 'test_value')
    url = spy_client.last_call()['url']
    assert 'project_ids=' in url

def test_get_request_keyword_list_export_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'request_keyword_list_export', None))

def test_get_request_keyword_list_export_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.request_keyword_list_export(42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_request_keyword_list_export_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.request_keyword_list_export(42)
    assert '/api/v1/keyword/export/42' in spy_client.last_call()['url']

def test_get_request_keyword_list_export_status_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'request_keyword_list_export_status', None))

def test_get_request_keyword_list_export_status_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.request_keyword_list_export_status(42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_request_keyword_list_export_status_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.request_keyword_list_export_status(42)
    assert '/api/v1/keyword/export_status/42' in spy_client.last_call()['url']

def test_get_get_keywords_and_ids_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'get_keywords_and_ids', None))

def test_get_get_keywords_and_ids_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.get_keywords_and_ids()
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_keywords_and_ids_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.get_keywords_and_ids()
    assert '/api/v1/keyword/all_keywords/id/label' in spy_client.last_call()['url']

def test_delete_remove_projects_from_keyword_filtering_list_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'remove_projects_from_keyword_filtering_list', None))

def test_delete_remove_projects_from_keyword_filtering_list_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.remove_projects_from_keyword_filtering_list(42, 'test_value')
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_remove_projects_from_keyword_filtering_list_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.remove_projects_from_keyword_filtering_list(42, 'test_value')
    assert '/api/v1/keyword/42/projects' in spy_client.last_call()['url']

def test_delete_remove_projects_from_keyword_filtering_list_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.remove_projects_from_keyword_filtering_list(42, 'test_value')
    url = spy_client.last_call()['url']
    assert 'project_ids=' in url

def test_delete_delete_keyword_filtering_list_by_id_exists(mv_client):
    assert callable(getattr(mv_client.keywords, 'delete_keyword_filtering_list_by_id', None))

def test_delete_delete_keyword_filtering_list_by_id_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.delete_keyword_filtering_list_by_id(42)
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_delete_keyword_filtering_list_by_id_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.keywords.delete_keyword_filtering_list_by_id(42)
    assert '/api/v1/keyword/42' in spy_client.last_call()['url']

