# MediaViz SDK Generator

Python utility that reads YAML endpoint specifications from `mediaviz_intelligence_hub/api-docs` and generates versioned, framework-specific SDK libraries. Each generated SDK wraps API endpoints as native functions and bundles a copy of the OAuth auth wrapper (from `oauth_library`) for authenticated requests.

Currently supports: **javascript (browser)**, **php**.

See `spec.md` for full architectural detail and `implementation_plan.json` for task-level status.

## Inputs

| Flag | Required | Description |
|------|----------|-------------|
| `--endpoints` | yes | Path to ref-list YAML file (e.g. `all_endpoints.yaml`, `top_endpoints.yaml`). Refs containing `#` are resolved as endpoints; refs without `#` are resolved as composite files. |
| `--controllers` | yes | Path to controllers directory. Parent is used as the base for resolving `$ref` file paths. |
| `--oauth-sdk` | yes | Path to OAuth SDK root (contains `javascript/`, `php/` subdirectories). |
| `--frameworks` | no | Comma-separated frameworks to generate. Default: all registered. |
| `--destination-dir` | no | Output folder name in the package root. Created if missing. Default: `sdk_files`. |

Output is written to `<destination-dir>/v{N}/<framework>/`. Previous version directories are auto-archived to `<destination-dir>/archive/v{N}/` on each run.

## Generating the Full SDK

Uses the full endpoint list (`all_endpoints.yaml`) and the default output directory (`sdk_files/`):

```bash
python generate.py \
  --endpoints ../mediaviz_intelligence_hub/api-docs/all_endpoints.yaml \
  --controllers ../mediaviz_intelligence_hub/api-docs/controllers/ \
  --oauth-sdk ../oauth_library/
```

## Generating Other Versions

Use `--destination-dir` to isolate the output from the canonical `sdk_files/` build, and point `--endpoints` at a narrower ref-list (e.g. `top_endpoints.yaml`).

### Basic SDK (top endpoints only) → `basic_sdk/`

```bash
python generate.py \
  --endpoints ../mediaviz_intelligence_hub/api-docs/top_endpoints.yaml \
  --controllers ../mediaviz_intelligence_hub/api-docs/controllers/ \
  --oauth-sdk ../oauth_library/ \
  --destination-dir basic_sdk
```

### Single-framework build

Add `--frameworks` to restrict output:

```bash
python generate.py \
  --endpoints ../mediaviz_intelligence_hub/api-docs/top_endpoints.yaml \
  --controllers ../mediaviz_intelligence_hub/api-docs/controllers/ \
  --oauth-sdk ../oauth_library/ \
  --destination-dir basic_sdk \
  --frameworks javascript
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
