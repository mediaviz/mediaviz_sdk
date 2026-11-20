# JavaScript SDK Spec

## Overview

OAuth 2.0 client SDK targeting both browsers and Node.js (>=18). Implements the Authorization Code flow with PKCE (RFC 7636). No runtime dependencies.

---

## Module Outputs

| File | Format | Use case |
|---|---|---|
| `src/index.js` | CJS (`require`) | Node.js |
| `dist/oauth-sdk.umd.js` | UMD (minified) | `<script>` tag, AMD loaders |
| `dist/oauth-sdk.esm.js` | ESM | Bundler (`import`) |

`dist/` is produced by `npm run build` and excluded from version control.

### Browser `<script>` usage

```html
<script src="dist/oauth-sdk.umd.js"></script>
<script>
  const { OAuthClient } = OAuthSDK;
  const client = new OAuthClient({ ... });
</script>
```

### ESM usage

```js
import { OAuthClient } from '@yourorg/oauth-sdk/dist/oauth-sdk.esm.js';
```

---

## Public API

### `new OAuthClient(config)`

| Field | Type | Description |
|---|---|---|
| `config.baseUrl` | `string` | Base URL of the OAuth server |
| `config.clientId` | `string` | Registered client_id |
| `config.clientSecret` | `string` | Registered client_secret |
| `config.redirectUri` | `string` | Registered redirect URI |

### Methods

```js
// Start the auth flow; persist state and code_verifier across the redirect
async generateAuthorizationUrl(state?: string): Promise<AuthorizationUrlResult>

// Exchange the auth code returned by the server for tokens
async exchangeCode(code, codeVerifier, redirectUri?: string): Promise<TokenResponse>

// Get a fresh access token using a refresh token
async refreshAccessToken(refreshToken): Promise<TokenResponse>

// Revoke a token (access or refresh)
async revokeToken(token, tokenTypeHint?: string): Promise<void>

// Authenticated fetch with automatic 401-intercept-and-refresh
async request(url, method, accessToken, refreshToken, body?: object): Promise<AuthenticatedResponse>

// Decode JWT payload without signature verification
decodeAccessToken(accessToken): TokenPayload
```

### Types

**`AuthorizationUrlResult`**

| Field | Type | Notes |
|---|---|---|
| `url` | `string` | Full authorization URL |
| `state` | `string` | CSRF state; persist until callback |
| `code_verifier` | `string` | PKCE verifier; persist until callback |

**`TokenResponse`**

| Field | Type | Notes |
|---|---|---|
| `access_token` | `string` | Signed JWT |
| `token_type` | `string` | Always `"bearer"` |
| `expires_in` | `number` | Seconds until expiry |
| `refresh_token` | `string` | Opaque refresh token |

**`TokenPayload`** (decoded JWT)

| Field | Type |
|---|---|
| `user_id` | `string` |
| `client_id` | `string` |
| `jti` | `string` |
| `iat` | `number` |
| `exp` | `number` |

**`AuthenticatedResponse`**

| Field | Type | Notes |
|---|---|---|
| `data` | `object` | Parsed JSON from resource server |
| `updatedTokens` | `TokenResponse \| null` | Non-null only when refresh occurred |

### `OAuthError`

Extends `Error`. Thrown on all OAuth and HTTP errors.

| Property | Type |
|---|---|
| `code` | `string` (RFC 6749 error code) |
| `description` | `string` |
| `httpStatus` | `number` |

### `OAuthErrorCode`

Frozen object with RFC 6749 error code constants:

```
INVALID_REQUEST, INVALID_CLIENT, INVALID_GRANT, UNAUTHORIZED_CLIENT,
UNSUPPORTED_GRANT_TYPE, ACCESS_DENIED, SERVER_ERROR
```

---

## Crypto

All cryptographic operations use `globalThis.crypto` (Web Crypto API). No Node.js built-ins.

- `generateCodeVerifier()` — 64-char base64url string from 48 random bytes via `crypto.getRandomValues`
- `generateCodeChallenge(verifier)` — `async`; returns `Base64URL(SHA-256(verifier))` via `crypto.subtle.digest`
- `generateState()` — 32-char lowercase hex from 16 random bytes via `crypto.getRandomValues`

`crypto.subtle` is async, which is why `generateAuthorizationUrl` is also async.

---

## Build

```sh
npm run build        # produces dist/oauth-sdk.umd.js and dist/oauth-sdk.esm.js
npm run prepublishOnly  # runs build automatically before npm publish
```

Rollup config (`rollup.config.js`):
- Input: `src/index.js`
- UMD output: minified via `@rollup/plugin-terser`, global name `OAuthSDK`
- ESM output: unminified
- Plugins: `@rollup/plugin-node-resolve`, `@rollup/plugin-commonjs`

---

## Testing

```sh
npm test   # runs Jest
```

| Test file | Covers |
|---|---|
| `client.test.js` | All `OAuthClient` methods, 401-retry flow, JWT decode |
| `pkce.test.js` | RFC 7636 test vector, verifier/challenge/state generation |
| `errors.test.js` | `OAuthError` constructor, `fromResponse` parsing |
| `http.test.js` | `postForm`, `getJson`, error propagation |
| `index.test.js` | Barrel exports, `OAuthErrorCode` completeness |
| `types.test.js` | `OAuthErrorCode` values and immutability |
| `rollup-build.test.js` | Dist files exist, UMD is minified, no `require('crypto')` in bundle |
| `package-fields.test.js` | `main`, `module`, `browser`, `files`, build scripts present |
| `smoke-test.test.js` | `node smoke-test.js` exits 0 |
| `browser-smoke-test.test.js` | `browser-smoke-test.html` references UMD bundle and `OAuthSDK` global |

`browser-smoke-test.html` loads the UMD bundle via `<script>` and calls `generateAuthorizationUrl` to verify the bundle works end-to-end in a browser context.

---

## Constraints

- No runtime dependencies
- Plain JS — no TypeScript compilation, no Babel
- ES2020+ only — no IE11, no polyfills
- Node.js >=18 required (Web Crypto API availability)
- Public API surface (`OAuthClient`, `OAuthError`, `OAuthErrorCode`) is stable

## Browser Compatibility

Chrome 80+, Firefox 75+, Safari 13.1+, Edge 80+
