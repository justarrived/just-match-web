export class Document {
  id: string;
  oneTimeToken: string;
  documentUrl: string;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }
    this.id = jsonObject.id;
    this.oneTimeToken = jsonObject.one_time_token;
    this.documentUrl = jsonObject.document_url;
  }
}
