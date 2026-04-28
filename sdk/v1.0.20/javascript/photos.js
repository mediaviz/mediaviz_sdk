export class Photos {
  constructor(ctx) { this._ctx = ctx; }

  async addPhotoToProject({ photo, tableName, sourceResolutionX, sourceResolutionY, dateTaken, latitude, longitude, filePath, title, clientSideId }) {
    this._ctx.requireTokens();
    const path = `/api/v1/photos/`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, { photo, table_name: tableName, source_resolution_x: sourceResolutionX, source_resolution_y: sourceResolutionY, date_taken: dateTaken, latitude, longitude, file_path: filePath, title, client_side_id: clientSideId });
    return data;
  }

  async getPhotoFromProject(tableName, photoId, { keywordListId } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/${encodeURIComponent(photoId)}`;
    const query = new URLSearchParams();
    if (keywordListId !== undefined) (Array.isArray(keywordListId) ? keywordListId : [keywordListId]).forEach(v => query.append('keyword_list_id', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getPhotoFaceDetailsFromProject(tableName, photoId) {
    this._ctx.requireTokens();
    const path = `/api/v1/photos/face_details/${encodeURIComponent(tableName)}/${encodeURIComponent(photoId)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getAllProjectPhotoIds(tableName, { ascOrDesc, lastId, limit, includeAll } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
    if (includeAll !== undefined) (Array.isArray(includeAll) ? includeAll : [includeAll]).forEach(v => query.append('include_all', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getRankedProjectPhotosByTableName(tableName, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos_ranked/${encodeURIComponent(tableName)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectMonthYearsWithPhotos(tableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/photo_month_years/${encodeURIComponent(tableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectPhotoIdsByMonth(tableName, month, year, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getRankedProjectPhotosByTableNameByMonth(tableName, month, year, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}/ranked/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectPhotoIdsNoDateTaken(tableName, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/date_taken/none/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getRankedProjectPhotosByTableNameNoDateTaken(tableName, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/date_taken/none/ranked/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) (Array.isArray(ascOrDesc) ? ascOrDesc : [ascOrDesc]).forEach(v => query.append('asc_or_desc', v));
    if (lastId !== undefined) (Array.isArray(lastId) ? lastId : [lastId]).forEach(v => query.append('last_id', v));
    if (limit !== undefined) (Array.isArray(limit) ? limit : [limit]).forEach(v => query.append('limit', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectThumbnail(tableName) {
    this._ctx.requireTokens();
    const path = `/api/v1/photos_project/${encodeURIComponent(tableName)}`;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updatePhotoInProject({ tableName, photoId, photoData } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos_update`;
    const query = new URLSearchParams();
    if (tableName !== undefined) (Array.isArray(tableName) ? tableName : [tableName]).forEach(v => query.append('table_name', v));
    if (photoId !== undefined) (Array.isArray(photoId) ? photoId : [photoId]).forEach(v => query.append('photo_id', v));
    if (photoData !== undefined) (Array.isArray(photoData) ? photoData : [photoData]).forEach(v => query.append('photo_data', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async updatePhotoRanking(tableName, photoId, newCategory) {
    this._ctx.requireTokens();
    const path = `/api/v1/photos_update/${encodeURIComponent(tableName)}/id/${encodeURIComponent(photoId)}/rank/${encodeURIComponent(newCategory)}`;
    const { data } = await this._ctx.client.request(path, 'PUT', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async deletePhotoFromProject(tableName, { photoIds } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/delete/`;
    const query = new URLSearchParams();
    if (photoIds !== undefined) (Array.isArray(photoIds) ? photoIds : [photoIds]).forEach(v => query.append('photo_ids', v));
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
