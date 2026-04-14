export class Faces {
  constructor(ctx) { this._ctx = ctx; }

  async getPersonPhoto(projectTableName, photoId) {
    this._ctx.requireTokens();
    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/photo/${encodeURIComponent(photoId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updatePerson(projectTable, personId, { personName } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/person/${encodeURIComponent(projectTable)}/${encodeURIComponent(personId)}`;
    const query = new URLSearchParams();
    if (personName !== undefined) query.set('person_name', personName);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getPerson(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
