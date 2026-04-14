export class Moments {
  constructor(ctx) { this._ctx = ctx; }

  async createMoment(body) {
    this._ctx.requireTokens();
    const path = `/api/v1/moments/`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async getMoment(momentId) {
    this._ctx.requireTokens();
    const path = `/api/v1/moments/${encodeURIComponent(momentId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getUserMoments(userId) {
    this._ctx.requireTokens();
    const path = `/api/v1/moments/user/${encodeURIComponent(userId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updateMoment(momentId, body) {
    this._ctx.requireTokens();
    const path = `/api/v1/moments/${encodeURIComponent(momentId)}`;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify(body));
    return data;
  }

  async deleteMoment(momentId) {
    this._ctx.requireTokens();
    const path = `/api/v1/moments/${encodeURIComponent(momentId)}`;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
