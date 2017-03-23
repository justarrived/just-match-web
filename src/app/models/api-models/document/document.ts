export class Document {
  // API fields
  public documentUrl: string;
  public id: string;
  public oneTimeToken: string;
  public oneTimeTokenExpiresAt: Date;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.documentUrl = jsonObject.document_url;
    this.id = jsonObject.id;
    this.oneTimeToken = jsonObject.one_time_token;
    this.oneTimeTokenExpiresAt = new Date(jsonObject.one_time_token_expires_at);
  }
}
