export class Upload {
  constructor(ctx) { this._ctx = ctx; }

  async createUpload({ fileContent, mimetype, filePath }) {
    this._ctx.requireTokens();
    const path = `/upload`;
    const { data } = await this._ctx.client.request(path, 'POST', this._ctx.accessToken, this._ctx.refreshToken, JSON.stringify({ file_content: fileContent, mimetype, file_path: filePath }));
    return data;
  }
}
