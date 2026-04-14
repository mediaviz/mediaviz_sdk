export class Person {
  constructor(ctx) { this._ctx = ctx; }

  async updatePerson(projectTableName, personId, { personName } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/person/${encodeURIComponent(projectTableName)}/${encodeURIComponent(personId)}`;
    const query = new URLSearchParams();
    if (personName !== undefined) query.set('person_name', personName);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async combinePersons(projectTableName, destinationPersonId, oldPersonId) {
    this._ctx.requireTokens();
    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/combine/${encodeURIComponent(destinationPersonId)}/${encodeURIComponent(oldPersonId)}`;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async splitPersons(projectTableName, id, { newName, destinationPersonId } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/person/${encodeURIComponent(projectTableName)}/split/${encodeURIComponent(id)}/`;
    const query = new URLSearchParams();
    if (newName !== undefined) query.set('new_name', newName);
    if (destinationPersonId !== undefined) query.set('destination_person_id', destinationPersonId);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getAllPersonsFromProject(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getAllPersonNamesFromProject(projectTableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/names`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getAllPersonsFromPhoto(projectTableName, photoId) {
    this._ctx.requireTokens();
    const path = `/api/v1/person/${encodeURIComponent(projectTableName)}/photo/${encodeURIComponent(photoId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
