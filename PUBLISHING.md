# SDK Publishing Pipeline

High-level operator guide to the CI workflow that regenerates and publishes the MediaViz SDKs. For implementation-level detail see `spec.md` → "CI / Automation Pipeline".

## Where it lives

`.github/workflows/update-sdk.yml` (in this repo, `mediaviz_sdk`). It is the single workflow that regenerates the SDK and pushes the artifacts to npm, PyPI, and Packagist.

## What it produces

| Artifact | Registry | Visibility | Branches |
|----------|----------|------------|----------|
| `@mediaviz/sdk` | npm | public | dev, qa, main (dist-tags `dev`/`qa`/`latest`) |
| `@mediaviz/admin-sdk` | npm | **private** (`--access restricted`) | dev, qa, main |
| `mediaviz-sdk` | PyPI | public | dev, qa, main (PEP 440 pre-releases) |
| `mediaviz/mediaviz-php-sdk` | Packagist | public | **main only** |

PHP/Packagist publishes only on `main`; the admin package is JavaScript-only.

### PyPI branching — pre-releases, not dist-tags

PyPI has no dist-tag concept, so the three branches cannot share one package the way npm does. Instead all three publish to the single `mediaviz-sdk` package as [PEP 440](https://peps.python.org/pep-0440/) versions that pip orders for us:

| Branch | Emitted version | `pip install` behaviour |
|--------|-----------------|-------------------------|
| `main` | `X.Y.Z` (final) | `pip install mediaviz-sdk` |
| `qa` | `X.Y.ZrcN` (release candidate) | `pip install --pre mediaviz-sdk` or pin |
| `dev` | `X.Y.Z.devN` (dev release) | pin exact version, e.g. `mediaviz-sdk==1.6.0.dev0` |

The channel is chosen in the **Decide Python pre-release channel** step (branch → `--prerelease dev`/`rc`/none) and baked into the generated `pyproject.toml` version by the Python generator. The suffix is constant (`.dev0`/`rc0`); uniqueness comes from the version base, which auto-increments every run. A plain `pip install mediaviz-sdk` always resolves to the latest **final** (main) release and never to a dev/rc build.

## What triggers it

The workflow runs in one of two modes, decided by the trigger event:

- **`propagate`** — fired by `repository_dispatch: hub-updated`, sent automatically by `mediaviz_intelligence_hub` when upstream API specs change. This is the real publish path: regenerate → commit to the branch → publish to npm/Packagist.
- **`verify`** — fired by `pull_request` against `dev`, `qa`, or `main`. A smoke-test gate that regenerates and runs the test suite against the **PR's** code; it never commits or publishes.

Runs are serialized per branch so a publish is never torn in half (concurrency group keyed on branch + mode; propagate runs are never cancelled).

Publishing is also gated on **content actually changing** — a per-package content hash skips no-op republishes, with a registry-liveness check that forces a publish if a prior run committed but failed to publish.

## Tokens, secrets & accounts required

All secrets are configured as GitHub **Actions secrets** on the `mediaviz_sdk` repo (or at the `mediaviz` org level). Where a refresh cadence is not enforced by the provider, **rotate every 60 days** as a hygiene baseline.

### 1. GitHub App — `mediaviz-pipeline-bot`
- **Secrets:** `MEDIAVIZ_PIPELINE_BOT_APP_ID`, `MEDIAVIZ_PIPELINE_BOT_PRIVATE_KEY`
- **Purpose:** clones the source repos and pushes the regenerated SDK to `mediaviz_sdk` and the PHP companion repo `mediaviz-php-sdk`.
- **Created by:** a `mediaviz` GitHub **org owner/admin** (registered under org → Developer settings → GitHub Apps; installed on `mediaviz_sdk`, `mediaviz_intelligence_hub`, `oauth_library`, `mediaviz-php-sdk`; permissions `contents:write`, `metadata:read`, `actions:write`).
- **Refresh:**
  - The **per-run installation token** is minted fresh each run by `actions/create-github-app-token@v1` and expires in ~1 hour — fully automatic, nothing to manage.
  - The **App private key** does **not** auto-expire. Rotate manually; treat **60 days** as the rotation target. Regenerate the key in the App settings and update `MEDIAVIZ_PIPELINE_BOT_PRIVATE_KEY`.

### 2. npm — Trusted Publishing (OIDC)
- **Secrets:** none. Auth uses GitHub OIDC (`permissions: id-token: write`); there is **no long-lived npm token** and nothing to refresh.
- **Set up by:** an **npm org admin / package maintainer**, who registers a **Trusted Publisher** entry *per package* (`@mediaviz/sdk` and `@mediaviz/admin-sdk` each need their own), scoped to org `mediaviz`, repo `mediaviz_sdk`, workflow `update-sdk.yml`. Bootstrap once per package: a manual `npm publish` from a laptop with a temporary classic token, register the trusted publisher, then revoke the token.
- **Paid npm plan — required.** `@mediaviz/admin-sdk` is published `--access restricted` (private). **Private npm packages are a paid feature**, so the `mediaviz` npm org needs a **paid plan** (npm Teams/org) with a seat for the publishing account. The public `@mediaviz/sdk` needs no paid plan. This is a billing/seat requirement, not a token — managed by the npm org owner.

### 3. PyPI — Trusted Publishing (OIDC)
- **Secrets:** none. Auth uses GitHub OIDC (`permissions: id-token: write`, already set on the job) via `pypa/gh-action-pypi-publish`; there is **no long-lived PyPI token** and nothing to refresh.
- **Set up by:** a **PyPI project owner** for `mediaviz-sdk`, who registers a [Trusted Publisher](https://docs.pypi.org/trusted-publishers/) scoped to owner `mediaviz`, repo `mediaviz_sdk`, workflow `update-sdk.yml`. PyPI supports **pending publishers**, so this can be registered *before* the first publish — no manual-token bootstrap is needed (unlike npm). The project is public/free; no paid plan required.
- **Refresh:** nothing — OIDC tokens are minted per run.

### 4. Packagist — `mediaviz/mediaviz-php-sdk`
- **Secrets:** `PACKAGIST_USERNAME`, `PACKAGIST_API_TOKEN`
- **Purpose:** after pushing a release tag to the `mediaviz-php-sdk` repo, the workflow POSTs to the Packagist update API to force a re-crawl.
- **Created by:** a **Packagist account that maintains the package** (token from packagist.org → Profile → Show API Token). The package itself is public/free; the token user must be a package maintainer.
- **Refresh:** Packagist API tokens do **not** auto-expire. Rotate manually; treat **60 days** as the rotation target (regenerate on Packagist, update `PACKAGIST_API_TOKEN`).

## Token summary

| Token / account | Secret name(s) | Owner who creates it | Auto-expiry | Rotate target |
|---|---|---|---|---|
| GitHub App install token | (minted per run) | `actions/create-github-app-token` | ~1 hour | n/a (automatic) |
| GitHub App private key | `MEDIAVIZ_PIPELINE_BOT_APP_ID`, `MEDIAVIZ_PIPELINE_BOT_PRIVATE_KEY` | mediaviz GitHub org owner | none | 60 days |
| npm publish auth | none (OIDC) | npm org admin (Trusted Publisher per package) | per run | n/a |
| npm paid plan (private pkg) | n/a (billing) | npm org owner | n/a | n/a |
| PyPI publish auth | none (OIDC) | PyPI project owner (Trusted Publisher) | per run | n/a |
| Packagist API token | `PACKAGIST_USERNAME`, `PACKAGIST_API_TOKEN` | Packagist package maintainer | none | 60 days |
