// Auto-generated — do not edit
import { OAuthClient } from './_oauth.js';
import { Photoupload } from './photoupload.js';
import { Photos } from './photos.js';
import { Projects } from './projects.js';
import { Users } from './users.js';

function _env(key) {
  if (typeof process !== 'undefined' && process.env) return process.env[key];
  return undefined;
}

class _Context {
  constructor(mv) { this._mv = mv; }
  get client() { return this._mv._oauthClient; }
  get accessToken() { return this._mv._accessToken; }
  get refreshToken() { return this._mv._refreshToken; }
  get baseUrl() { return this._mv._config.baseUrl; }
  get hosts() { return this._mv._hosts; }
  requireHost(key) {
    const url = this._mv._hosts[key];
    if (!url) throw new Error(`Host '${key}' not configured. Pass hosts.${key} in MediaViz constructor or set the corresponding env var.`);
    return url;
  }
  requireTokens() {
    if (!this._mv._accessToken) throw new Error('Not authenticated. Call authenticate(), handleCallback(), or setTokens() first.');
  }
}

class _TokenTrackingClient {
  constructor(mv, inner) { this._mv = mv; this._inner = inner; }
  async request(url, method, accessToken, refreshToken, body) {
    const result = await this._inner.request(url, method, accessToken, refreshToken, body);
    if (result.updatedTokens) {
      this._mv._accessToken = result.updatedTokens.access_token;
      this._mv._refreshToken = result.updatedTokens.refresh_token;
      if (this._mv._onTokenRefresh) this._mv._onTokenRefresh(result.updatedTokens);
    }
    return result;
  }
}

export class MediaViz {
  constructor(config = {}) {
    this._config = {
      clientId: config.clientId ?? _env('MEDIAVIZ_CLIENT_ID'),
      clientSecret: config.clientSecret ?? _env('MEDIAVIZ_CLIENT_SECRET'),
      baseUrl: config.baseUrl ?? _env('MEDIAVIZ_BASE_URL') ?? 'https://api.mediaviz.com',
      redirectUri: config.redirectUri ?? _env('MEDIAVIZ_REDIRECT_URI'),
    };
    this._hosts = {
      photoUpload: config.hosts?.photoUpload ?? _env('MEDIAVIZ_PHOTO_UPLOAD_URL'),
      ...(config.hosts || {}),
    };
    this._accessToken = config.accessToken ?? null;
    this._refreshToken = config.refreshToken ?? null;
    this._onTokenRefresh = config.onTokenRefresh ?? null;

    const _inner = new OAuthClient({
      clientId: this._config.clientId,
      clientSecret: this._config.clientSecret,
      baseUrl: this._config.baseUrl,
      redirectUri: this._config.redirectUri,
    });
    this._oauthClient = new _TokenTrackingClient(this, _inner);

    const _ctx = new _Context(this);
    this.photoUpload = new Photoupload(_ctx);
    this.photos = new Photos(_ctx);
    this.projects = new Projects(_ctx);
    this.users = new Users(_ctx);
  }

  async authenticate() {
    const tokens = await this._oauthClient._inner.getClientCredentialsToken();
    this._accessToken = tokens.access_token;
    this._refreshToken = tokens.refresh_token ?? null;
    return tokens;
  }

  async getAuthorizationUrl(state) {
    return this._oauthClient._inner.generateAuthorizationUrl(state);
  }

  async handleCallback(code, codeVerifier) {
    const tokens = await this._oauthClient._inner.exchangeCode(code, codeVerifier);
    this._accessToken = tokens.access_token;
    this._refreshToken = tokens.refresh_token;
    return tokens;
  }

  setTokens(accessToken, refreshToken) {
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
  }

  get accessToken() { return this._accessToken; }
  get refreshToken() { return this._refreshToken; }
}
