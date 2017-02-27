export class UserDocument {
  id: string;
  oneTimeToken: string;
  documentUrl: string;
  category: string;
  createdAt: Date;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }
    this.id = jsonObject.id;
    this.oneTimeToken = jsonObject.oneTimeToken;
    this.documentUrl = jsonObject.document.document_url;
    this.category = jsonObject.category;
    this.createdAt = new Date(jsonObject.created_at);
  }
}
