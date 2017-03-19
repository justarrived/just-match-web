export class Document {
  public documentUrl: string;
  public id: string;
  public oneTimeToken: string;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.documentUrl = jsonObject.document_url;
    this.id = jsonObject.id;
    this.oneTimeToken = jsonObject.one_time_token;
  }
}
