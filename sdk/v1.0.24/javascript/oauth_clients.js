function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class OauthClients {
  constructor(ctx) { this._ctx = ctx; }

  async createClient(clientName, clientType, redirectUris, isFirstParty) {
    this._ctx.requireTokens();
    const path = `/oauth/clients`;
    const body = stripUndef({
      client_name: clientName,
      client_type: clientType,
      redirect_uris: redirectUris,
      is_first_party: isFirstParty,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }
}
