export class AiModelCredits {
  constructor(ctx) { this._ctx = ctx; }

  async getModelCreditRelationship(modelName) {
    this._ctx.requireTokens();
    const path = `/api/v1/model_credit/${encodeURIComponent(modelName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async upsertModelCreditRelationship({ modelName, newCreditValue } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/model_credit/upsert`;
    const query = new URLSearchParams();
    if (modelName !== undefined) query.set('model_name', modelName);
    if (newCreditValue !== undefined) query.set('new_credit_value', newCreditValue);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
