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
OAUTH_SDK_SUBPATH = "sdk"

# Local sibling directory names (relative to this file's parent's parent)
_CODE_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_HUB_LOCAL = os.path.join(_CODE_ROOT, "mediaviz_intelligence_hub")
_OAUTH_LOCAL = os.path.join(_CODE_ROOT, "oauth_library")


class SourcePaths(NamedTuple):
    controllers_dir: str   # api_docs/ root — refs like controllers/photo.yaml resolve from here
    oauth_sdk_root: str    # oauth SDK root with javascript/, php/ subdirs
    flows_dir: str         # directory containing flow YAML files


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

    for label, path in [("controllers", controllers_dir), ("oauth SDK", oauth_sdk_root), ("flows", flows_dir)]:
        if not os.path.isdir(path):
            print(f"Error: {label} directory not found: {path}", file=sys.stderr)
            sys.exit(1)

    yield SourcePaths(controllers_dir=controllers_dir, oauth_sdk_root=oauth_sdk_root, flows_dir=flows_dir)


def resolve_flow_path(flow_name: str, flows_dir: str) -> str:
    """Return absolute path to ``{flows_dir}/{flow_name}.yaml``, or exit with available flows."""
    path = os.path.join(flows_dir, f"{flow_name}.yaml")
    if os.path.isfile(path):
        return path

    available = sorted(
        os.path.splitext(f)[0]
        for f in os.listdir(flows_dir)
        if f.endswith(".yaml") or f.endswith(".yml")
    )
    avail_str = ", ".join(available) if available else "(none)"
    print(f"Error: flow '{flow_name}' not found. Available flows: {avail_str}", file=sys.stderr)
    sys.exit(1)
