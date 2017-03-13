import {Document} from '../document';

export class UserDocument {
  id: string;
  document: Document;
  category: string;
  createdAt: Date;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }
    this.id = jsonObject.id;
    this.document = new Document(jsonObject.document);
    this.category = jsonObject.category;
    this.createdAt = new Date(jsonObject.created_at);
  }
}
