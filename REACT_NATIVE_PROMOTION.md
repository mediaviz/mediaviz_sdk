# Promoting the React Native SDK to `main`

Status as of 2026-08-20: **`@mediaviz/react-native-sdk` generates and publishes only by hand.** The CI wiring that would automate it exists on `dev` and does not execute. This document is the runbook for closing that gap.

For the general pipeline see [`PUBLISHING.md`](./PUBLISHING.md); for implementation detail see `spec.md` → "React Native SDK".

## Why a `dev` push is not enough

`update-sdk.yml` has no `push` trigger. It runs on:

| Event | Mode | Effect |
|---|---|---|
| `repository_dispatch: hub-updated` | propagate | regenerate, commit, publish |
| `pull_request` → dev/qa/main | verify | regenerate + test only, no publish |

**`repository_dispatch` always executes the workflow file from the repository's default branch (`main`)** — never from the branch named in `client_payload.branch`. That payload only selects which *source ref* gets checked out and which channel is targeted.

So a dispatch today reads `main`'s `update-sdk.yml`, which contains **zero** React Native steps:

```
$ git show origin/dev:.github/workflows/update-sdk.yml  | grep -c 'react_native\|react-native'   # 12
$ git show origin/main:.github/workflows/update-sdk.yml | grep -c 'react_native\|react-native'   # 0
```

Confirmed empirically on run `32372100846` (2026-08-20, success): grepping its logs for RN-specific step names returns **0 matches**.

### What that run still managed to do

React Native *was* generated and committed — 540 files at `v1.9.0-dev.107`, suite `20/20` — because `generate.py` with no `--frameworks` argument auto-discovers every `BaseGenerator` subclass in `generators/` from the **checked-out `dev` source**. Generation follows the source ref; only the *workflow steps* come from `main`.

The practical split:

| Concern | Comes from | Works today |
|---|---|---|
| Which frameworks generate | `generators/` on the source ref (`dev`) | yes |
| Type-declaration guard, dir location, change gate, publish | `update-sdk.yml` on `main` | **no** |

## What is stranded on `dev`

All of this is inert until merged to `main`:

- `Test bundled React Native adapters` — runs the 71 jest tests in `react_native_module/`. Nothing else exercises that code; it is copied verbatim into the SDK, so the generated suites cannot reach it.
- RN arm of `Verify TypeScript declarations present` — asserts `sdk.d.ts`/`.esm.d.ts`/`.d.cts` plus the subpath's `react.d.ts`/`.d.cts`.
- `rn_dir` in `Locate freshly-generated SDK dirs`.
- `rn_changed` content-hash + registry-liveness gate. Without it an RN-only adapter change cannot trigger a publish, and the `Discard unchanged generator output` step can revert `sdk/` out from under an RN-only diff.
- `Publish @mediaviz/react-native-sdk to npm`, deliberately ordered **after** every established package — see below.

## Two blockers to clear first

### 1. `latest` currently points at a dev prerelease

npm forces the `latest` tag onto a package's **first** publish regardless of `--tag`. The manual bootstrap therefore left:

```
@mediaviz/react-native-sdk   dev: 1.9.0-dev.116   latest: 1.9.0-dev.116
@mediaviz/sdk                dev: 1.9.0-dev.107   latest: 1.8.0          <- correct shape
```

`npm i @mediaviz/react-native-sdk` today installs an **unreleased dev build**. npm does not permit deleting the `latest` tag, so the only clean resolution is to publish a stable release from `main` (matching `@mediaviz/sdk`'s `1.8.0` line) and let `latest` move to it. Promoting to `main` *is* the fix for this — it is not a separate task.

### 2. Trusted Publishing must be registered

The package now exists, so the chicken-and-egg is broken, but the trusted publisher still has to be registered against `@mediaviz/react-native-sdk` at the npm package level — separate from `@mediaviz/sdk`. Until it is, the CI publish step fails with an OIDC error even once the step exists.

This is why the publish step is ordered last in `dev`'s workflow. Positioned where it originally sat (between `@mediaviz/sdk` and `@mediaviz/admin-sdk`), a failure there aborts the job and skips the admin, PyPI, PHP and Packagist publishes queued behind it — a brand-new package taking down four working ones.

## Runbook

1. **Register the trusted publisher** for `@mediaviz/react-native-sdk` (npm → package → Settings → Trusted Publishing), pointing at `mediaviz/mediaviz_sdk` / `update-sdk.yml`.
2. **Merge `dev` → `main`.** This is what puts the RN steps where dispatches read them. Review the `update-sdk.yml` diff specifically; the rest of the diff is generator source and generated output.
3. **Dispatch a `main` propagate run:**
   ```bash
   gh api repos/mediaviz/mediaviz_sdk/dispatches \
     -f event_type=hub-updated -f 'client_payload[branch]=main'
   ```
4. **Verify** the RN steps actually ran:
   ```bash
   gh run view <id> --repo mediaviz/mediaviz_sdk --log | grep -c 'React Native'   # expect > 0
   npm view @mediaviz/react-native-sdk dist-tags --json                            # latest -> stable
   ```
5. **Re-check the version floor.** `sdk/VERSION.dev` was raised to `1.9.0-dev.116` so the dev counter cannot walk the `dev` tag backwards past the hand-published build (see `ff33bfe65`). `VERSION.main` governs the `main` channel independently — confirm it produces a version above anything already on the registry.

## Rollback

The RN package is additive: no other artifact imports it, and `@mediaviz/sdk` is unaffected by its presence. To stop publishing it without unwinding the merge, delete the `Publish @mediaviz/react-native-sdk to npm` step — generation continues, and the package simply stops receiving new versions. Published versions cannot be unpublished after 72 hours; use `npm deprecate` instead.
