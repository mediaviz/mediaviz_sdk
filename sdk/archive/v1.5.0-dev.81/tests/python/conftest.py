from __future__ import annotations
import sys
sys.path.insert(0, '/home/runner/work/mediaviz_sdk/mediaviz_sdk/mediaviz_sdk/sdk/v1.5.0-dev.81/python')

import pytest
from mediaviz_sdk import MediaVizClient
from test_helpers import SpyOAuthClient


@pytest.fixture
def spy_client() -> SpyOAuthClient:
    return SpyOAuthClient()


@pytest.fixture
def mv_client(spy_client: SpyOAuthClient) -> MediaVizClient:
    mv = MediaVizClient(client_id='test', client_secret='test', base_url='https://api.test.com')
    mv._tracking_client._inner = spy_client
    mv._access_token = 'access_token'
    mv._refresh_token = 'refresh_token'
    for key in mv._hosts:
        mv._hosts[key] = 'https://upload.example.com'
    return mv
