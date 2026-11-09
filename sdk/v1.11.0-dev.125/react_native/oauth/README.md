# @yourorg/oauth-sdk

JavaScript SDK for the OAuth 2.0 Authorization Server. Implements Authorization Code + PKCE flow, token refresh, token revocation, and JWT payload decoding for confidential (server-side) clients.

## Installation

```sh
npm install @yourorg/oauth-sdk
```

## Quick start

```js
const { OAuthClient } = require('@yourorg/oauth-sdk');

const oauthClient = new OAuthClient({
  baseUrl: 'https://api.example.com',
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  redirectUri: 'https://myapp.com/callback',
});

// Step 1: initiate login
app.get('/login', (req, res) => {
  const { url, state, code_verifier } = oauthClient.generateAuthorizationUrl();
  req.session.oauthState = state;
  req.session.codeVerifier = code_verifier;
  res.redirect(url);
});

// Step 2: handle callback
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  if (state !== req.session.oauthState) throw new Error('State mismatch');

  const tokens = await oauthClient.exchangeCode(code, req.session.codeVerifier);
  const payload = oauthClient.decodeAccessToken(tokens.access_token);

  req.session.userId = payload.user_id;
  req.session.accessToken = tokens.access_token;
  req.session.refreshToken = tokens.refresh_token;
  res.redirect('/dashboard');
});

// Step 3: make authenticated requests
app.get('/dashboard', async (req, res) => {
  const { data, updated_tokens } = await oauthClient.request(
    'https://api.example.com/me',
    'GET',
    req.session.accessToken,
    req.session.refreshToken,
  );

  if (updated_tokens) {
    req.session.accessToken = updated_tokens.access_token;
    req.session.refreshToken = updated_tokens.refresh_token;
  }

  res.json(data);
});
```

> **Important:** `generateAuthorizationUrl()` returns `{ url, state, code_verifier }`. You **must** persist `state` and `code_verifier` (e.g. in an encrypted server-side session or short-lived encrypted cookie) and pass `code_verifier` back to `exchangeCode()` in the callback handler. The SDK does not store any state between calls.

## Method reference

| Method | Description | Returns |
|--------|-------------|---------|
| `generateAuthorizationUrl(state?)` | Generates PKCE verifier + challenge, builds `/oauth/authorize` URL | `AuthorizationUrlResult` |
| `exchangeCode(code, codeVerifier, redirectUri?)` | Exchanges authorization code for tokens | `Promise<TokenResponse>` |
| `refreshAccessToken(refreshToken)` | Issues new tokens using a refresh token | `Promise<TokenResponse>` |
| `revokeToken(token, tokenTypeHint?)` | Revokes an access or refresh token (RFC 7009) | `Promise<void>` |
| `decodeAccessToken(accessToken)` | Decodes JWT payload without signature verification | `TokenPayload` |
| `request(url, method, accessToken, refreshToken, body?)` | Authenticated request with automatic 401 retry | `Promise<AuthenticatedResponse>` |

See [spec.md](../../spec.md) for full API documentation.
