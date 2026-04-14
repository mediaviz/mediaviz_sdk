# MediaViz SDK Generator

Python utility that reads YAML endpoint specifications from `mediaviz_intelligence_hub/api_docs` and generates versioned, framework-specific SDK libraries. Each generated SDK wraps API endpoints as native functions and bundles a copy of the OAuth auth wrapper (from `oauth_library`) for authenticated requests.

Currently supports: **javascript (browser)**, **php**.

See `spec.md` for full architectural detail and `implementation_plan.json` for task-level status.

## Prerequisites

The generator resolves source files from local sibling directories:

- `../mediaviz_intelligence_hub/api_docs/` — controllers and endpoint refs
- `../mediaviz_intelligence_hub/common_flows/sdk_endpoints/` — flow YAML files
- `../oauth_library/sdk/` — OAuth SDK (javascript/, php/ subdirectories)

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `--endpoints` | yes | Flow name in `common_flows/sdk_endpoints/` (e.g. `basic_sdk_flow_endpoints`). Refs containing `#` are resolved as endpoints; refs without `#` are resolved as composite files. |
| `--branch` | no | Git branch for source repos. Currently accepted but unused in local mode; will be used when GitHub-clone support is added. |
| `--frameworks` | no | Comma-separated frameworks to generate. Default: all registered. |
| `--destination-dir` | no | Output folder name in the package root. Created if missing. Default: `sdk_files`. |

Output is written to `<destination-dir>/v{N}/<framework>/`. Previous version directories are auto-archived to `<destination-dir>/archive/v{N}/` on each run.

## Usage

```bash
python generate.py --endpoints all_endpoints
```

### Custom output directory

```bash
python generate.py --endpoints basic_sdk_flow_endpoints --destination-dir basic_sdk
```

### Single-framework build

```bash
python generate.py --endpoints getting_started_sdk_endpoints --frameworks javascript
```

## Output Layout

```
<destination-dir>/
  v{N}/
    resolved_<ref_list>.yaml      # flattened endpoint snapshot
    resolved_composites.yaml      # if composites are present
    javascript/
    php/
    tests/
  archive/
    v{N-1}/
    ...
```

The resolved YAML inside each version directory is the immutable source-of-truth for what was generated in that run.
