# MediaViz SDK Generator — Implementation Status

## Framework Generators

| Framework | Generator | Test Generator | Status |
|-----------|-----------|----------------|--------|
| javascript_browser | `generators/javascript_browser.py` | `test_generators/javascript.py` | complete |
| php | `generators/php.py` | `test_generators/php.py` | complete |
| python | `generators/python.py` | `test_generators/python.py` | complete |

## Cross-framework Carry-forward

- `generate.carry_forward_missing_frameworks()` fills in any framework missing from `--frameworks` by copying the framework dir and `tests/{framework}/` from the most recent archived version that shipped it.
- Runs after the generate loop, before test generation. Carried-forward tests are not re-run (they were validated at their original version).
- Summary output annotates carried frameworks with `(carried from vX.Y.Z)`.

## Utilities

- Config lives in `../mediaviz_intelligence_hub/api_docs/utilities/` (one YAML per source module). Resolved via `github_sources.SourcePaths.utilities_dir` and consumed by `utilities_resolver.load_utilities()`. Permissively absent: missing dir yields an empty list, no error.
- Two emission forms per utility: `target` (pass-through wrapper around an inner-client method — only `source_module: oauth` is wired today) and `snippets` (per-framework body files inlined verbatim by the generator). Mutually exclusive.
- Snippet bodies live under `<utilities_dir>/snippets/<module>/<id>.{py,php,js}`. Paths in YAML are resolved relative to the YAML file. Bodies are loaded at resolve time and embedded into `resolved_utilities.yaml` for reproducibility.
- Optional per-utility fields: `imports.<fw>` (hoisted to the client file header, deduplicated across utilities) and `async.<fw>` (currently only honored by the JS generator).
- Shipped utilities:
  - `oauth.yaml` — currently empty placeholder.
  - `photos.yaml` — `downscale_photos(image_bytes, max_dimension)` via snippets. **All three frameworks return JPEG bytes (quality 90)** for cross-runtime consistency. Python uses PIL — `ImageOps.exif_transpose`, `Image.resize` w/ LANCZOS, `convert("RGB")`, `save(format="JPEG")`. PHP uses GD — `imagecreatefromstring` → `imagecopyresampled` → `imagejpeg`. JS is **dual-runtime**: it detects browser vs Node at call time. Browser path uses `createImageBitmap(blob, { imageOrientation: 'from-image' })` + `OffscreenCanvas`/`<canvas>` and `convertToBlob({ type: 'image/jpeg' })`. Node path (Electron main, server) lazy-loads `sharp` via an indirect-specifier dynamic `import()` so bundlers cannot resolve it at build time, then runs `.rotate().resize({fit:'inside', withoutEnlargement:true}).jpeg({quality:90})`. Both JS paths return `Uint8Array`. `sharp` is declared as `optionalDependencies` in the generated `package.json` (`emit_package_json` in `generators/javascript_browser.py`) and surfaces a clear error if the Node path is invoked without it installed.

## Composite Steps that Reference Utilities

- Composite step refs can target utilities (`utilities/<module>.yaml#<id>`) alongside endpoint refs (`controllers/<file>.yaml#<id>`). Distinguished in the resolved step by `step["utility"]` vs `step["endpoint"]`.
- Utility refs are auto-included from `load_utilities(sources.utilities_dir)` — they do **not** need to be enumerated in the `--endpoints` ref-list. `validate_composite_endpoints` skips utility steps.
- Resolved snapshot inlines the full utility (including `snippet_body.<fw>` and `async.<fw>`) into each step. `resolved_composites.yaml` is self-contained.
- Each framework's composite emitter dispatches on `"utility" in step`, calls through a new `_Context.utils` accessor (emitted only when at least one utility is registered), and supports `once` / `for_each` / `cache` / `on_error` symmetrically with endpoint steps. JS prefixes the call with `await` when `async.javascript: true`.

## Failure Recovery

- `generate.archive_existing_versions()` returns the list of `(original_path, archived_path)` pairs it moved into `sdk/archive/`.
- `main()` wraps the resolve / generate / test phases in a single try/except. On any uncaught exception, `restore_archived_versions()` removes the partial `sdk/v{next}/` directory and moves the previously-active version back from `sdk/archive/` to `sdk/`, then exits non-zero with the error message.
- This guarantees the working tree always contains a valid SDK — either the new one (if generation succeeds end-to-end) or the previous one (if it doesn't). Never a partial/malformed mix.

## Composite Cache Keys

- `steps[].cache.key` is a template string with `{...}` placeholders; each placeholder is a dot-path expression (`params.*`, `params.<obj>.<prop>`, `steps.<id>.*`) and the surrounding literals namespace the entry. Bare dot-paths (no `{}`) are rejected in `resolver._resolve_step` with `ValueError`.
- Per-framework emission via `_resolve_{python,js,php}_cache_key`: Python emits an `f"…"` string, JS emits a backtick template literal, PHP emits `'…' . $var . '…'` string concatenation. Each resolver delegates per-placeholder resolution to the existing `_resolve_*_expr` so path-expression logic is not duplicated.
- Current usage: `composites/upload_photos.yaml` step `get_template` uses `"upload_template:{params.project_table_name}"`.

## Python Framework Notes

- Runtime: Python 3.12+, `httpx` (sync only; async out of scope)
- Output package: `mediaviz_sdk/` + bundled `oauth_sdk/` as sibling package
- Installed via `pyproject.toml` (PEP 621, setuptools backend)
- Test suite generated by `PythonTestGenerator`; `run()` installs the package's `pyproject.toml` deps (single source of truth — no hardcoded deps in CI) then runs `python -m pytest`
- Detailed spec: `plans/python_generator_spec.md`
- Detailed implementation plan: `plans/python_generator_implementation_plan.json`

## CI Automation

- `.github/workflows/update-sdk.yml` — triggers on `repository_dispatch: [hub-updated]` (propagate) and `pull_request: [dev, qa, main]` (verify). Propagate mode auto-bumps via `--minor-version` only on main; dev/qa iterate. Auth via `mediaviz-pipeline-bot` GitHub App. Full pipeline shape documented in `spec.md` → "CI / Automation Pipeline".
- **Concurrency**: group keyed on branch AND mode (`update-sdk-<branch>-<propagate|verify>`); `cancel-in-progress` is an expression — `true` for verify, `false` for propagate. Prevents a PR-verify or a second dispatch from cancelling an in-flight propagate mid-publish-tail (which is non-transactional and would leave a partial publish). Propagate runs serialize per branch.
- **Verify checks out the PR head** (`ctx.sdk_ref` = `pull_request.head.sha` in verify, branch in propagate) for the `mediaviz_sdk` checkout, so the gate exercises the proposed generator/`generate.py` changes rather than the base branch. Hub + oauth stay on `base_ref`.
- **Push is non-fast-forward-safe**: the commit step fetches + rebases onto `origin/<branch>` and retries (3×) before pushing, failing loudly on a real conflict — a PR merge / out-of-order dispatch advancing the branch mid-run no longer silently drops the regenerated commit.
- **Versioning is channel-local** (documented, not changed): dev/qa iterate, main minors, so versions are per-channel monotonic counters with no cross-channel semver meaning — consumers pin exact per dist-tag; traceability is via the `intelligence_hub@<sha>` commit message. See `spec.md` → "Version-bump rule".
- Companion workflows in upstream repos:
  - `mediaviz_intelligence_hub/.github/workflows/update-intelligence-hub.yml`
  - `mediaviz_external_api/.github/workflows/docker-image.yml` (existing file, extended with `verify_hub`, `verify_sdk`, `notify_downstream` jobs)
- Required org-level secrets: `MEDIAVIZ_PIPELINE_BOT_APP_ID`, `MEDIAVIZ_PIPELINE_BOT_PRIVATE_KEY`.

## Publishing

- **`generate.py`** — `--endpoints` is unset by default; resolved post-parse to `all_endpoints` when `--admin` is passed, else `public_sdk_endpoints`. Explicit `--endpoints X` always wins. New `--admin` boolean flag switches the JS generator into private-package mode (`@mediaviz/admin-sdk`, `publishConfig.access: restricted`) AND implies `--endpoints all_endpoints`; intended companion flags are `--frameworks javascript --destination-dir admin-sdk`. The flag is threaded through `BaseGenerator.generate(..., admin=False)` and consumed only by the JS generator's `emit_package_json`; PHP/Python accept and ignore it.
- **`generators/licenses.py`** — shared MIT license text + `emit_license(output_dir)` + `extract_sdk_version(output_dir)`. JS/PHP/Python generators all import these.
- **`generators/javascript_browser.py:emit_package_json`** — emits live version (via regex), `license: MIT`, `repository`, `publishConfig.access: public`, `types: "./dist/sdk.d.ts"` + `types`-first `exports["."]` condition, `files: ["dist", "LICENSE", "README.md"]`. JS generator's `generate()` calls `emit_license()` after manifest. `typescript` is in `devDependencies` (for the `.d.ts` type-check only) and pruned before publish.
- **TypeScript declarations** — `generators/typescript_dts.py:build_dts(gen, endpoints, composites, utilities, schemas, *, admin)` emits the consolidated declarations from the resolved metadata, written to three byte-identical files: `dist/sdk.d.ts` (top-level `types`), `dist/sdk.esm.d.ts` (sibling to `sdk.esm.js` so ESM/`module`-field resolution finds types by adjacency; `exports.import.types` points at it), and `dist/sdk.d.cts` (CJS declaration — `.d.cts` extension makes TS treat it as CommonJS so `require()` resolves under node16/nodenext; `exports.require.types` points at it). `schemas` is threaded in via `BaseGenerator.generate(..., schemas=None)` from `generate.py` (PHP/Python accept and ignore). `emit_dts_file` (after `build_dist`) writes all three and `_typecheck_dts` runs the local `tsc --noEmit --strict --skipLibCheck` on both `sdk.d.ts` (ESM) and `sdk.d.cts` (CJS), aborting generation on failure (skipped gracefully when `tsc` is absent). Method signatures mirror the JS arg order in lockstep; response types come from `response.body` (`$ref`→`Promise<Schema>`, `List[Schema]`→`Promise<Schema[]>`, `dict`→`Record<string, any>`, else `any`); response interfaces are the transitive closure of reachable schemas (`resolver._resolved_fields`), members kept snake_case. Composite returns are `Promise<any>` (cross-step dataflow not inferred). Deterministic output. Applies to both `@mediaviz/sdk` and `@mediaviz/admin-sdk`.
- **`generators/javascript_browser.py:prune_package_json_for_publish`** — called by `generate()` right after `emit_dts_file`. Strips build-only fields (`scripts`, `devDependencies` — the Rollup toolchain + `typescript`) from the manifest so the published package carries no build deps; keeps `optionalDependencies` (`sharp`) and `types`. Consumers `npm install`ing the SDK never pull Rollup or TypeScript.
- **`generators/php.py:emit_autoload_config`** — emits live `version`, `license: MIT`, `type: library`, `description`. PHP generator's `generate()` calls `emit_license()` after manifest.
- **`generators/python.py:generate()`** — calls `emit_license()` for symmetry; `pyproject.toml` already carries its own version.
- **`update-sdk.yml`** propagate-mode publish steps:
  - **Generate twice**: public (`python generate.py $BUMP`) then admin (`python generate.py --frameworks javascript --destination-dir admin-sdk --admin $BUMP` — `--admin` implies `--endpoints all_endpoints`). Both runs honor `--minor-version` on main so versions stay roughly aligned.
  - **Content-hash gate (`changes` step)**: sha256-hashes the new `<dir>/javascript/dist/` (sorted-file concat) against the most-recent `<dir>/archive/v*/javascript/dist/` per package. Emits `public_changed` + `admin_changed`. Unchanged sides are reverted via `git restore <dir>/ + git clean -fd <dir>/` (clears the deleted `vN/` and the untracked `vN+1/` + gitignored `archive/vN/`). The commit, npm publish, and Packagist steps are gated on these flags — publish only runs for sides that actually moved. Prevents no-op `@mediaviz/sdk` republishes on admin-only upstream changes. **Depends on Rollup output being deterministic** (current toolchain — Rollup 4 + `@rollup/plugin-node-resolve` + `@rollup/plugin-commonjs`, no timestamp/banner plugins — satisfies this). If `emit_rollup_config` ever adds a plugin that injects build timestamps or random nonces into `dist/*`, the gate degrades to "always publish" (safe failure, but defeats the optimization); verify with `diff -r` between consecutive runs.
  - **Registry-liveness gate (public only)**: commit precedes publish, so a publish that fails after the commit leaves the repo bumped but the registry behind, and the content gate would mask it on the next identical-content run. When the public `dist/` is unchanged, the `changes` step also runs `npm view @mediaviz/sdk@<tag> version` and `sort -V`-compares the live dist-tag against the expected (most-recent archive) version; if behind/missing it forces `public_changed=true`, republishing the byte-identical content under a fresh version number to reconcile. Requires `Determine npm dist-tag` to run *before* the `changes` step (moved to right after `Locate`, gated only on `mode == propagate`). **Admin caveat**: `@mediaviz/admin-sdk` is restricted; `npm view` needs a read token the OIDC flow doesn't carry, so admin stays content-only — a post-commit admin publish failure is not self-healed (documented in a YAML comment; fix-forward = add `NPM_READ_TOKEN` and mirror the check).
  - **Verify TypeScript declarations** (`Verify TypeScript declarations present` step, after both generator runs): fails the run if either `sdk/v*/javascript` or `admin-sdk/v*/javascript` lacks `dist/sdk.d.ts` or its `package.json` `types` field. The content-hash gate hashes `dist/` so `sdk.d.ts` is included — its first appearance triggers one publish per package, then stays stable (deterministic output).
  - **Commit step** stages whichever of `sdk/` and `admin-sdk/` survived the content gate.
  - **npm public** (every dev/qa/main, gated on `public_changed`): via Trusted Publishing (OIDC). `permissions: id-token: write`, `npm install -g npm@latest`, `npm publish --access public --tag <dev|qa|latest> --provenance` from `sdk/v*/javascript/`. No `NPM_TOKEN` secret.
  - **npm admin** (every dev/qa/main, gated on `admin_changed`): same dist-tag logic, `npm publish --access restricted --tag <dev|qa|latest> --provenance` from `admin-sdk/v*/javascript/`. Requires a **separate** Trusted Publisher entry at the npm package level for `@mediaviz/admin-sdk` (same org/repo/workflow).
  - **Packagist** (main only, gated on `public_changed`): checkout `mediaviz/mediaviz_php_sdk` → rsync php-sdk contents → commit + tag `vX.Y.Z` → push → POST to Packagist `/api/update-package`. Requires `PACKAGIST_USERNAME` + `PACKAGIST_API_TOKEN` secrets.
- **Companion repo (manual setup)**: `mediaviz/mediaviz_php_sdk` is a dedicated repo with composer.json at the root, the only way Packagist can find the PHP SDK. Workflow syncs into it on every main run; tag history on that repo = release history visible on Packagist.
