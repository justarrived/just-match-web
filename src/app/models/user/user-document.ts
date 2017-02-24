export class UserDocument {
  id: string;
  oneTimeToken: string;
  documentUrl: string;
  category: string;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }
    this.id = jsonObject.id;
    this.oneTimeToken = jsonObject.oneTimeToken;
    this.documentUrl = jsonObject.documentUrl;
    this.category = jsonObject.category;
  }
}
