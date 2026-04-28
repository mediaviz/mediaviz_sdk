import os
import sys
from types import SimpleNamespace

import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))


@pytest.fixture
def fake_sources(tmp_path, monkeypatch):
    """Build the sibling-repo layout github_sources expects, under tmp_path, and patch the constants."""
    hub = tmp_path / "mediaviz_intelligence_hub"
    oauth = tmp_path / "oauth_library"
    api_docs = hub / "api_docs"
    controllers = api_docs / "controllers"
    flows = hub / "common_flows" / "sdk_endpoints"
    endpoint_list = api_docs / "endpoint_list"
    js_oauth = oauth / "sdk" / "javascript"
    php_oauth = oauth / "sdk" / "php"
    for d in (controllers, flows, endpoint_list, js_oauth, php_oauth):
        d.mkdir(parents=True)
    (api_docs / "api_schemas.yaml").write_text("schemas: {}\n")
    (js_oauth / "index.js").write_text("// oauth js stub\n")
    (php_oauth / "OAuthClient.php").write_text("<?php\nnamespace OAuthSdk;\nclass OAuthClient {}\n")

    import github_sources
    monkeypatch.setattr(github_sources, "_HUB_LOCAL", str(hub))
    monkeypatch.setattr(github_sources, "_OAUTH_LOCAL", str(oauth))

    return SimpleNamespace(
        hub=hub,
        oauth=oauth,
        api_docs=api_docs,
        controllers=controllers,
        flows=flows,
        endpoint_list=endpoint_list,
    )
