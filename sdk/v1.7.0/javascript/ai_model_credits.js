export class AiModelCredits {
  constructor(ctx) { this._ctx = ctx; }

  async getModelCreditRelationship(modelName) {
    this._ctx.requireTokens();
    const path = `/api/v1/model_credit/${encodeURIComponent(modelName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
