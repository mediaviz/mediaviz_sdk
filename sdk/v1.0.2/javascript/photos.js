export class Photos {
  constructor(ctx) { this._ctx = ctx; }

  async addPhotoToProject({ photo, tableName, sourceResolutionX, sourceResolutionY, dateTaken, latitude, longitude, filePath, title, clientSideId }) {
    this._ctx.requireTokens();
    const path = `/api/v1/photos/`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify({ photo, table_name: tableName, source_resolution_x: sourceResolutionX, source_resolution_y: sourceResolutionY, date_taken: dateTaken, latitude, longitude, file_path: filePath, title, client_side_id: clientSideId }));
    return data;
  }

  async getPhotoFromProject(tableName, photoId, { keywordListId } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/${encodeURIComponent(photoId)}`;
    const query = new URLSearchParams();
    if (keywordListId !== undefined) query.set('keyword_list_id', keywordListId);
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

  async getAllProjectPhotoIds(tableName, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getTopMiddleBottomProjectPhotoIds(tableName, { ascOrDesc } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos_top/${encodeURIComponent(tableName)}`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getTopMiddleBottomProjectPhotosByTableNameSortedByDateRankedKeysetPaginated(tableName, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos_ranked/${encodeURIComponent(tableName)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
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

  async getProjectPhotoIdsByMonth(tableName, month, year, { ascOrDesc } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectPhotoIdsByMonthKeysetPaginated(tableName, month, year, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getTopProjectPhotosByTableNameByMonth(tableName, month, year, { ascOrDesc } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}/top`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getTopMiddleBottomProjectPhotosByTableNameByMonthSortedByDateRankedKeysetPaginated(tableName, month, year, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/month/${encodeURIComponent(month)}/year/${encodeURIComponent(year)}/ranked/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getProjectPhotoIdsNoDateTakenKeysetPaginated(tableName, { ascOrDesc, lastId, limit } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/date_taken/none/`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
    if (lastId !== undefined) query.set('last_id', lastId);
    if (limit !== undefined) query.set('limit', limit);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'GET', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }

  async getTopProjectPhotosByTableNameNoDateTakenRanked(tableName, { ascOrDesc } = {}) {
    this._ctx.requireTokens();
    let path = `/api/v1/photos/${encodeURIComponent(tableName)}/date_taken/none/ranked`;
    const query = new URLSearchParams();
    if (ascOrDesc !== undefined) query.set('asc_or_desc', ascOrDesc);
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
    if (tableName !== undefined) query.set('table_name', tableName);
    if (photoId !== undefined) query.set('photo_id', photoId);
    if (photoData !== undefined) query.set('photo_data', photoData);
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
    if (photoIds !== undefined) query.set('photo_ids', photoIds);
    const qs = query.toString();
    if (qs) path += '?' + qs;
    const { data } = await this._ctx.client.request(path, 'DELETE', this._ctx.accessToken, this._ctx.refreshToken);
    return data;
  }
}
