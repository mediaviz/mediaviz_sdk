export class OauthClients {
  constructor(ctx) { this._ctx = ctx; }

  async createClient(body) {
    this._ctx.requireTokens();
    const path = `/oauth/clients`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }
}
