// Auto-generated — do not edit
import { OAuthClient } from './_oauth.js';
import { AiModelCredits } from './ai_model_credits.js';
import { Admin } from './admin.js';
import { Authentication } from './authentication.js';
import { Company } from './company.js';
import { CuratedAlbums } from './curated_albums.js';
import { CustomAlbums } from './custom_albums.js';
import { EmailTokens } from './email_tokens.js';
import { Evidence } from './evidence.js';
import { Export } from './export.js';
import { Faces } from './faces.js';
import { Health } from './health.js';
import { Keywords } from './keywords.js';
import { Moments } from './moments.js';
import { OauthAuthorization } from './oauth_authorization.js';
import { OauthClients } from './oauth_clients.js';
import { OauthToken } from './oauth_token.js';
import { OauthLogin } from './oauth_login.js';
import { Person } from './person.js';
import { Photos } from './photos.js';
import { Projects } from './projects.js';
import { Reporting } from './reporting.js';
import { Run } from './run.js';
import { Search } from './search.js';
import { Similarity } from './similarity.js';
import { Status } from './status.js';
import { Token } from './token.js';
import { Upload } from './upload.js';
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
    this.aiModelCredits = new AiModelCredits(_ctx);
    this.admin = new Admin(_ctx);
    this.authentication = new Authentication(_ctx);
    this.company = new Company(_ctx);
    this.curatedAlbums = new CuratedAlbums(_ctx);
    this.customAlbums = new CustomAlbums(_ctx);
    this.emailTokens = new EmailTokens(_ctx);
    this.evidence = new Evidence(_ctx);
    this.export = new Export(_ctx);
    this.faces = new Faces(_ctx);
    this.health = new Health(_ctx);
    this.keywords = new Keywords(_ctx);
    this.moments = new Moments(_ctx);
    this.oAuthAuthorization = new OauthAuthorization(_ctx);
    this.oAuthClients = new OauthClients(_ctx);
    this.oAuthToken = new OauthToken(_ctx);
    this.oauthLogin = new OauthLogin(_ctx);
    this.person = new Person(_ctx);
    this.photos = new Photos(_ctx);
    this.projects = new Projects(_ctx);
    this.reporting = new Reporting(_ctx);
    this.run = new Run(_ctx);
    this.search = new Search(_ctx);
    this.similarity = new Similarity(_ctx);
    this.status = new Status(_ctx);
    this.token = new Token(_ctx);
    this.upload = new Upload(_ctx);
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
