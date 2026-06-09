from __future__ import annotations
import pytest


def test_get_insert_label_category_matrix_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'insert_label_category_matrix', None))

def test_get_insert_label_category_matrix_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.insert_label_category_matrix()
    assert spy_client.last_call()['method'] == 'GET'

def test_get_insert_label_category_matrix_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.insert_label_category_matrix()
    assert '/api/v1/admin/insert_label_category_matrix' in spy_client.last_call()['url']

def test_get_generate_mid_level_category_keyword_alignment_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'generate_mid_level_category_keyword_alignment', None))

def test_get_generate_mid_level_category_keyword_alignment_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.generate_mid_level_category_keyword_alignment()
    assert spy_client.last_call()['method'] == 'GET'

def test_get_generate_mid_level_category_keyword_alignment_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.generate_mid_level_category_keyword_alignment()
    assert '/api/v1/admin/generate_mid_level_category_keyword_alignment' in spy_client.last_call()['url']

def test_get_get_category_labels_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'get_category_labels', None))

def test_get_get_category_labels_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.get_category_labels('test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_category_labels_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.get_category_labels('hello world')
    assert '/api/v1/admin/category_labels/hello%20world' in spy_client.last_call()['url']

def test_get_admin_dump_company_nlp_index_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'admin_dump_company_nlp_index', None))

def test_get_admin_dump_company_nlp_index_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_dump_company_nlp_index(42)
    assert spy_client.last_call()['method'] == 'GET'

def test_get_admin_dump_company_nlp_index_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_dump_company_nlp_index(42)
    assert '/api/v1/admin/dump_company_nlp_index/42' in spy_client.last_call()['url']

def test_get_get_all_keyword_groups_and_subgroups_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'get_all_keyword_groups_and_subgroups', None))

def test_get_get_all_keyword_groups_and_subgroups_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.get_all_keyword_groups_and_subgroups()
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_all_keyword_groups_and_subgroups_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.get_all_keyword_groups_and_subgroups()
    assert '/api/v1/admin/keyword_group' in spy_client.last_call()['url']

def test_get_get_keyword_groups_labels_by_keyword_group_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'get_keyword_groups_labels_by_keyword_group', None))

def test_get_get_keyword_groups_labels_by_keyword_group_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.get_keyword_groups_labels_by_keyword_group('test_value', 'test_value')
    assert spy_client.last_call()['method'] == 'GET'

def test_get_get_keyword_groups_labels_by_keyword_group_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.get_keyword_groups_labels_by_keyword_group('hello world', 'test_value')
    assert '/api/v1/admin/keyword_group/hello%20world/' in spy_client.last_call()['url']

def test_get_get_keyword_groups_labels_by_keyword_group_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.get_keyword_groups_labels_by_keyword_group('test_value', 'test_value')
    url = spy_client.last_call()['url']
    assert 'subgroup=' in url

def test_post_admin_create_company_nlp_indexes_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'admin_create_company_nlp_indexes', None))

def test_post_admin_create_company_nlp_indexes_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_create_company_nlp_indexes('test_value')
    assert spy_client.last_call()['method'] == 'POST'

def test_post_admin_create_company_nlp_indexes_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_create_company_nlp_indexes('test_value')
    assert '/api/v1/admin/create_company_nlp_indexes/' in spy_client.last_call()['url']

def test_post_admin_create_company_nlp_indexes_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_create_company_nlp_indexes('test_value')
    url = spy_client.last_call()['url']
    assert 'company_ids=' in url

def test_post_admin_create_nl_hybrid_pipelines_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'admin_create_nl_hybrid_pipelines', None))

def test_post_admin_create_nl_hybrid_pipelines_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_create_nl_hybrid_pipelines()
    assert spy_client.last_call()['method'] == 'POST'

def test_post_admin_create_nl_hybrid_pipelines_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_create_nl_hybrid_pipelines()
    assert '/api/v1/admin/search/nl_create_hybrid_pipelines' in spy_client.last_call()['url']

def test_post_admin_create_label_vocab_index_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'admin_create_label_vocab_index', None))

def test_post_admin_create_label_vocab_index_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_create_label_vocab_index()
    assert spy_client.last_call()['method'] == 'POST'

def test_post_admin_create_label_vocab_index_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_create_label_vocab_index()
    assert '/api/v1/admin/search/create_label_vocab_index' in spy_client.last_call()['url']

def test_delete_admin_clear_nl_search_cache_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'admin_clear_nl_search_cache', None))

def test_delete_admin_clear_nl_search_cache_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_clear_nl_search_cache()
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_admin_clear_nl_search_cache_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_clear_nl_search_cache()
    assert '/api/v1/admin/clear_nl_search_cache/' in spy_client.last_call()['url']

def test_delete_admin_delete_company_nlp_indexes_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'admin_delete_company_nlp_indexes', None))

def test_delete_admin_delete_company_nlp_indexes_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_delete_company_nlp_indexes('test_value')
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_admin_delete_company_nlp_indexes_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_delete_company_nlp_indexes('test_value')
    assert '/api/v1/admin/delete_company_nlp_indexes/' in spy_client.last_call()['url']

def test_delete_admin_delete_company_nlp_indexes_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_delete_company_nlp_indexes('test_value')
    url = spy_client.last_call()['url']
    assert 'company_ids=' in url

def test_delete_admin_delete_user_projects_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'admin_delete_user_projects', None))

def test_delete_admin_delete_user_projects_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_delete_user_projects('test_value')
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_admin_delete_user_projects_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_delete_user_projects('test_value')
    assert '/api/v1/admin/delete_user_projects/' in spy_client.last_call()['url']

def test_delete_admin_delete_user_projects_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_delete_user_projects('test_value')
    url = spy_client.last_call()['url']
    assert 'user_ids=' in url

def test_delete_admin_delete_user_exists(mv_client):
    assert callable(getattr(mv_client.admin, 'admin_delete_user', None))

def test_delete_admin_delete_user_http_method(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_delete_user('test_value')
    assert spy_client.last_call()['method'] == 'DELETE'

def test_delete_admin_delete_user_path(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_delete_user('test_value')
    assert '/api/v1/admin/delete_user/' in spy_client.last_call()['url']

def test_delete_admin_delete_user_query_params(mv_client, spy_client):
    spy_client.reset()
    mv_client.admin.admin_delete_user('test_value')
    url = spy_client.last_call()['url']
    assert 'user_ids=' in url

