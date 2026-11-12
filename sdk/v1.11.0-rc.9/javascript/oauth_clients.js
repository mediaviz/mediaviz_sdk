function stripUndef(o) { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; }

export class OauthClients {
  constructor(ctx) { this._ctx = ctx; }

  async createApiCredential(credentialName) {
    this._ctx.requireTokens();
    const path = `/oauth/clients/api-credentials`;
    const body = stripUndef({
      credential_name: credentialName,
    });
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, body);
    return data;
  }

  async getCompanyApiCredentials() {
    this._ctx.requireTokens();
    const path = `/oauth/clients/api-credentials`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async revokeApiCredential(clientId) {
    this._ctx.requireTokens();
    const path = `/oauth/clients/api-credentials/${encodeURIComponent(clientId)}/revoke`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
