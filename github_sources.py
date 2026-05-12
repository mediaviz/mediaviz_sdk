"""Resolve source paths for SDK generation.

Currently uses local sibling directories. Designed to be swapped
to shallow-clone from GitHub when ready.
"""
from __future__ import annotations

import os
import sys
from contextlib import contextmanager
from typing import NamedTuple

# Repo-relative subpaths
HUB_API_DOCS = "api_docs"
FLOW_SUBPATH = "common_flows/sdk_endpoints"
ENDPOINT_LIST_SUBPATH = "api_docs/endpoint_list"
UTILITIES_SUBPATH = "api_docs/utilities"
OAUTH_SDK_SUBPATH = "sdk"

# Local sibling directory names (relative to this file's parent's parent)
_CODE_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_HUB_LOCAL = os.path.join(_CODE_ROOT, "mediaviz_intelligence_hub")
_OAUTH_LOCAL = os.path.join(_CODE_ROOT, "oauth_library")


class SourcePaths(NamedTuple):
    controllers_dir: str       # api_docs/ root — refs like controllers/photo.yaml resolve from here
    oauth_sdk_root: str        # oauth SDK root with javascript/, php/ subdirs
    flows_dir: str             # hand-authored SDK flow YAML files (common_flows/sdk_endpoints/)
    endpoint_list_dir: str     # generated endpoint registries (api_docs/endpoint_list/, e.g. all_endpoints.yaml)
    schemas_path: str          # api_docs/api_schemas.yaml — Pydantic schema registry
    utilities_dir: str         # api_docs/utilities/ — non-endpoint helpers exposed on mv.utils


@contextmanager
def fetch_sources(branch: str | None = None):
    """Yield SourcePaths from local sibling directories.

    The ``branch`` parameter is accepted but currently unused (reserved
    for future GitHub-clone integration where each repo will be checked
    out at the requested branch, falling back to main if it doesn't exist).
    """
    if branch:
        print(f"Note: --branch '{branch}' accepted but local-mode ignores it (GitHub fetch not yet enabled).")

    controllers_dir = os.path.join(_HUB_LOCAL, HUB_API_DOCS)
    oauth_sdk_root = os.path.join(_OAUTH_LOCAL, OAUTH_SDK_SUBPATH)
    flows_dir = os.path.join(_HUB_LOCAL, FLOW_SUBPATH)
    endpoint_list_dir = os.path.join(_HUB_LOCAL, ENDPOINT_LIST_SUBPATH)
    utilities_dir = os.path.join(_HUB_LOCAL, UTILITIES_SUBPATH)
    schemas_path = os.path.join(controllers_dir, "api_schemas.yaml")

    required_dirs = [
        ("controllers", controllers_dir),
        ("oauth SDK", oauth_sdk_root),
        ("flows", flows_dir),
        ("endpoint list", endpoint_list_dir),
    ]
    for label, path in required_dirs:
        if not os.path.isdir(path):
            print(f"Error: {label} directory not found: {path}", file=sys.stderr)
            sys.exit(1)
    if not os.path.isfile(schemas_path):
        print(f"Error: schemas file not found: {schemas_path}", file=sys.stderr)
        sys.exit(1)

    yield SourcePaths(
        controllers_dir=controllers_dir,
        oauth_sdk_root=oauth_sdk_root,
        flows_dir=flows_dir,
        endpoint_list_dir=endpoint_list_dir,
        schemas_path=schemas_path,
        utilities_dir=utilities_dir,
    )


def resolve_flow_path(flow_name: str, flows_dir: str, endpoint_list_dir: str) -> str:
    """Return absolute path to ``{dir}/{flow_name}.yaml`` from the first dir that has it.

    Searches ``flows_dir`` (hand-authored SDK flows) first, then ``endpoint_list_dir``
    (generated registries like ``all_endpoints.yaml``). Exits with the union of
    available flow names if not found.
    """
    for d in (flows_dir, endpoint_list_dir):
        path = os.path.join(d, f"{flow_name}.yaml")
        if os.path.isfile(path):
            return path

    available: set[str] = set()
    for d in (flows_dir, endpoint_list_dir):
        if not os.path.isdir(d):
            continue
        for f in os.listdir(d):
            if f.endswith(".yaml") or f.endswith(".yml"):
                available.add(os.path.splitext(f)[0])
    avail_str = ", ".join(sorted(available)) if available else "(none)"
    print(f"Error: flow '{flow_name}' not found. Available flows: {avail_str}", file=sys.stderr)
    sys.exit(1)
