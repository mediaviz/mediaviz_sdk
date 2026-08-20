# React Native SDK — verification status

Status as of 2026-08-20: **the React Native SDK has never run on a device or simulator.** Everything below was verified on Node with globals removed to imitate Hermes. That harness is a good proxy for *missing* globals and a poor one for *partially implemented* globals — which is where the remaining risk sits.

Companion to [`REACT_NATIVE_PROMOTION.md`](./REACT_NATIVE_PROMOTION.md). This document should be deleted, not amended, once an on-device run passes.

## Verified

| Area | How | Where |
|---|---|---|
| Generator packaging, module bundling, `/react` subpath | 22 pytest cases | `tests/test_react_native.py` |
| Runtime adapters (crypto, storage, auth session, session lifecycle) | 71 jest cases | `react_native_module/javascript/src/__tests__/` |
| Generated endpoint surface | 20/20 generated suite | `sdk/v*/tests/react_native/` |
| OAuth wrapper on a runtime with no WebCrypto | 128 jest cases + RFC 7636 Appendix B vector | `oauth_library/sdk/javascript/src/__tests__/` |
| Built bundle end-to-end | 11-assertion harness on a stripped runtime | see below |

The stripped-runtime harness deletes `crypto`, `atob`, `btoa`, `TextEncoder`, `TextDecoder` and `Buffer` **before** requiring `dist/sdk.cjs`, then drives PKCE fail-closed → provider install → public-client login → authenticated endpoint call → token restore → rotation persistence → unicode JWT decode. It is what caught the module-scope `TextEncoder` in `webhook_module/signing.js` that made merely *importing* the SDK crash.

## Not verified — `URLSearchParams`

**The single largest open risk.** React Native ships a *partial* `URLSearchParams` polyfill. The stripped-runtime harness left Node's complete implementation in place, so none of this is exercised.

Actual usage, counted against the generated RN output at `v1.9.0-dev.107`:

| Form | Count | Scope |
|---|---|---|
| `new URLSearchParams()` — empty ctor | 33 | generated controllers |
| `.append(k, v)` on those instances | 115 | generated controllers |
| `.toString()` on those instances | 33 | generated controllers |
| `new URLSearchParams({...})` — **object ctor** | 5 | generated controllers |
| `new URLSearchParams({...})` — **object ctor** | 2 | bundled OAuth wrapper (`oauth/src/http.js:12`, `oauth/src/client.js:53`) |
| implicit `${params}` string coercion | 1 | authorize-URL construction |

38 `URLSearchParams` references across the generated controllers, plus 2 in the bundled OAuth wrapper. The `append`/`toString` figures are method calls on those instances, not additional references.

**The object constructor is the dangerous one and it sits on the auth path.** `postForm` builds every token-endpoint body as `new URLSearchParams(params).toString()` (`oauth_library/sdk/javascript/src/http.js:12`). If RN's polyfill does not accept a plain object, **login fails outright** — not a degraded query string, no tokens at all. The empty-ctor + `append` + `toString` path used by generated endpoints is the more widely supported shape and is likelier to survive.

An earlier note in this repo described this as "five places". That count was wrong; it is the number of *generator* call sites, not emitted ones.

### If it fails

Replace the global with a small internal `_qs()` helper emitted by `generators/javascript_browser.py`, plus a hand-rolled form encoder in the OAuth wrapper's `postForm`.

**Blast radius:** `javascript_browser.py` is the parent of `react_native.py`, so that edit changes emitted output for **every** JavaScript target — the browser SDK and the admin SDK regenerate too. Encoding differences (space as `+` vs `%20`, ordering, empty values) must be diffed against current output before shipping, or query strings change for existing consumers. Do not scope the fix to React Native by branching on framework: that forks the endpoint surface, which the subclass design exists to prevent.

## Not verified — everything native

None of these have run against a real native module; all are covered only by injected fakes:

- **`expo-secure-store`** — `createSecureTokenStore` assumes `getItemAsync`/`setItemAsync`/`deleteItemAsync` and the 2048-byte value cap that motivated splitting the two tokens across separate keys.
- **`react-native-keychain`** — `createKeychainTokenStore` assumes `getGenericPassword` returns `false` (not `null`) when empty. Tested against a fake that mimics this; unconfirmed against the real module.
- **`expo-web-browser`** — `startAuthSession` keys on `result.type` being `success`/`cancel`/`dismiss` and `result.url` carrying the redirect. Version-sensitive.
- **`expo-crypto` / `react-native-quick-crypto`** — `createCryptoProvider` normalises both fill conventions and four digest return shapes precisely because the real signatures were not confirmed.
- **Custom-scheme redirects** — `parseRedirectUrl` is hand-rolled because RN's `URL` polyfill mis-parses `mediaviz://callback`. Verified against strings, not against a real redirect delivered by the OS.
- **`TextEncoder`** — believed present in current Hermes. All SDK paths were made independent of it anyway, so this is now a non-issue rather than a verified fact.

## How to close this out

A minimal Expo app is enough; it does not need to be a real product surface.

```bash
npx create-expo-app@latest mv-rn-smoke && cd mv-rn-smoke
npm i @mediaviz/react-native-sdk@dev expo-crypto expo-secure-store expo-web-browser
```

```js
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { openAuthSessionAsync } from 'expo-web-browser';
import { MediaViz, configureCrypto, createCryptoProvider,
         createSecureTokenStore, createSession } from '@mediaviz/react-native-sdk';

configureCrypto(createCryptoProvider({
  getRandomValues: (b) => Crypto.getRandomValues(b),
  digest: (b) => Crypto.digest(Crypto.CryptoDigestAlgorithm.SHA256, b),
}));

const session = createSession({
  MediaViz,
  config: { clientId: '<public client id>', baseUrl: 'https://api.mediaviz.ai',
            redirectUri: 'mvsmoke://callback' },
  store: createSecureTokenStore(SecureStore),
  openAuthSession: openAuthSessionAsync,
});
```

Then assert, in order — each step gates the next:

1. The app **imports** without throwing. (Catches any remaining module-scope global.)
2. `session.signIn()` opens the system browser and returns tokens. (Catches the `URLSearchParams` object-ctor risk and the redirect-parsing risk.)
3. An endpoint call **with query parameters** returns correct data — not merely a 200. A partial polyfill degrades silently here: the call succeeds while the filter, limit or sort is dropped. Pick an endpoint whose response visibly changes with its query, and assert on the response, not the status.
4. Kill and relaunch the app; `session.restore()` returns the persisted tokens. (Exercises real Keychain/Keystore.)
5. Force a 401 (expire the access token) and confirm the retry succeeds **and** the rotated pair is persisted. Single-use refresh tokens mean a dropped write logs the user out at the next refresh.

Use a **public** OAuth client. The server rejects a public client that sends a `client_secret`, and `client_credentials` is confidential-only by server rule — so the only valid mobile path is Authorization Code + PKCE.
